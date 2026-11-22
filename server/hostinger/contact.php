<?php
/**
 * EhsanX enquiry endpoint for Hostinger shared hosting (PHP, no libraries).
 *
 * Receives the Contact page form as JSON and sends two emails through authenticated SMTP, both From
 * the authenticated mailbox (so SPF/DKIM/DMARC align): the enquiry to the team (Reply-To: visitor),
 * then a thank-you with a copy of the enquiry to the visitor (Reply-To: the team).
 *
 * Deployed by `npm run build:hostinger` as public_html/contact.php. The SMTP credentials live in a
 * private config OUTSIDE public_html (see docs/contact-form.md); nothing secret is in this file,
 * the repository or the built site.
 *
 * Responses (JSON):
 *   200 {ok:true, reference}            accepted by the SMTP server for delivery
 *   422 {ok:false, errors:{field:msg}}   validation failed; nothing sent
 *   400/403/405/413/415                  malformed or disallowed request
 *   429 {ok:false, message}              rate limited
 *   502 {ok:false, message}              SMTP refused or unreachable; nothing was accepted
 *   503 {ok:false, message}              not configured on this server
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

const MAX_BODY_BYTES = 16384;
const MIN_FILL_MS = 2500; // a form filled faster than this is almost certainly automated
const DEDUPE_SECONDS = 900; // an identical enquiry within 15 minutes is not sent twice

// Topics offered by the form; anything else is rejected, so the topic is never free text.
const TOPICS = [
    'executive-dialogues' => 'Executive Leadership Dialogues',
    'leadership-programmes' => 'Leadership Development & Transformation Programmes',
    'transformation-partnerships' => 'Organizational Transformation Partnerships',
    'other' => 'Something else',
];

/** @param array<string,mixed> $extra */
function respond(int $status, array $extra = []): void
{
    http_response_code($status);
    echo json_encode(['ok' => $status === 200] + $extra, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $message): void
{
    respond($status, ['message' => $message]);
}

/** Private config: one level above public_html (also found from a subdomain folder inside it). */
function config_path(): string
{
    $override = getenv('EHSANX_CONTACT_CONFIG');
    if (is_string($override) && $override !== '') {
        return $override;
    }
    $dir = __DIR__;
    while ($dir !== dirname($dir)) {
        if (basename($dir) === 'public_html') {
            return dirname($dir) . '/ehsanx-private/contact-config.php';
        }
        $dir = dirname($dir);
    }
    return dirname(__DIR__) . '/ehsanx-private/contact-config.php';
}

/** Operational log beside the private config: status, codes and IDs only, never form contents. */
function log_event(string $dir, string $line): void
{
    $file = $dir . '/contact.log';
    if (is_file($file) && filesize($file) > 262144) {
        @rename($file, $file . '.1');
    }
    @file_put_contents($file, gmdate('c') . ' ' . $line . "\n", FILE_APPEND | LOCK_EX);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

$configPath = config_path();
if (!is_file($configPath)) {
    fail(503, 'The enquiry form is not available at the moment. Please email or WhatsApp us instead.');
}
/** @var array{host:string,port:int,encryption:string,username:string,password:string,from:string,from_name:string,to:string,allowed_origins:array<int,string>,rate_limit_per_hour:int,rate_limit_global_per_hour?:int} $config */
$config = require $configPath;
$privateDir = dirname($configPath);

// Same-site requests only: the page sends Origin and a custom header (which a cross-site form
// cannot add without a CORS preflight that this endpoint never approves).
$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin === '' || !in_array($origin, $config['allowed_origins'], true)
    || ($_SERVER['HTTP_X_EHSANX_ENQUIRY'] ?? '') !== '1') {
    fail(403, 'Request not allowed.');
}
if (stripos((string)($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) {
    fail(415, 'Unsupported request.');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    fail(413, 'Your message is too long.');
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
$data = json_decode($raw === false ? '' : $raw, true);
if (!is_array($data) || strlen((string)$raw) > MAX_BODY_BYTES) {
    fail(400, 'Your enquiry could not be read. Please try again.');
}

// Honeypot: people never see this field. Answer as if accepted so a bot does not retry.
if (trim((string)($data['website'] ?? '')) !== '') {
    log_event($privateDir, 'dropped honeypot');
    respond(200, ['reference' => strtoupper(bin2hex(random_bytes(4)))]);
}

/** Trims, removes NUL and other control characters (keeping line breaks where allowed). */
$text = static function ($value, bool $multiline = false): string {
    $s = str_replace("\0", '', is_string($value) ? $value : '');
    if (!mb_check_encoding($s, 'UTF-8')) {
        return '';
    }
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace($multiline ? '/[^\P{C}\n\t]/u' : '/\p{C}/u', '', $s) ?? '';
    return trim($s);
};

$rawName = is_string($data['name'] ?? null) ? $data['name'] : '';
$name = $text($rawName);
$email = $text($data['email'] ?? '');
$organization = $text($data['organization'] ?? '');
$topicKey = $text($data['topic'] ?? '');
$message = $text($data['message'] ?? '', true);

// Mirrors validateEnquiry() in src/lib/enquiry.ts; messages are shown beside each field.
$errors = [];
if ($name === '') {
    $errors['name'] = 'Please enter your full name.';
} elseif (mb_strlen($name) > 100) {
    $errors['name'] = 'Please keep your name under 100 characters.';
} elseif (preg_match('/[\r\n]/', $rawName)) {
    $errors['name'] = 'Please enter your name on one line.';
}
if ($email === '') {
    $errors['email'] = 'Please enter your email address.';
} elseif (mb_strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\s<>,;"]/', $email)) {
    $errors['email'] = 'Please enter a valid email address, like name@organization.com.';
}
if (mb_strlen($organization) > 150) {
    $errors['organization'] = 'Please keep your organization under 150 characters.';
}
if (!array_key_exists($topicKey, TOPICS)) {
    $errors['topic'] = 'Please choose what your enquiry is about.';
}
if ($message === '') {
    $errors['message'] = 'Please enter your message.';
} elseif (mb_strlen($message) < 10) {
    $errors['message'] = 'Please tell us a little more (at least 10 characters).';
} elseif (mb_strlen($message) > 2000) {
    $errors['message'] = 'Please keep your message under 2,000 characters.';
}
if ($errors) {
    respond(422, ['message' => 'Please check the highlighted fields.', 'errors' => $errors]);
}

// Time trap: the page sends how long the form was open before submitting.
$elapsed = (int)($data['elapsed'] ?? 0);
if ($elapsed < MIN_FILL_MS) {
    log_event($privateDir, 'rejected too fast');
    fail(429, 'That was very quick. Please wait a moment and send your enquiry again.');
}

// Rate limits: per connection and overall, stored privately as keyed hashes (no raw IPs kept).
$now = time();
$rateDir = $privateDir . '/rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$key = hash_hmac('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'), $config['password']);
/** @return array<int,int> */
$recent = static function (string $file) use ($now): array {
    if (!is_file($file)) {
        return [];
    }
    $list = json_decode((string)file_get_contents($file), true);
    return array_values(array_filter(is_array($list) ? $list : [], static fn($t) => is_int($t) && $t > $now - 3600));
};
$ipFile = $rateDir . '/' . $key . '.json';
$allFile = $rateDir . '/_all.json';
$ipHits = $recent($ipFile);
$allHits = $recent($allFile);
if (count($ipHits) >= (int)$config['rate_limit_per_hour']
    || count($allHits) >= (int)($config['rate_limit_global_per_hour'] ?? 60)) {
    log_event($privateDir, 'rejected rate limit');
    fail(429, 'We have received several enquiries from this connection. Please try again later, or email or WhatsApp us.');
}

// An identical enquiry (same address and message) inside the window is acknowledged, not resent.
$dedupeFile = $rateDir . '/_dedupe.json';
$fingerprint = hash_hmac('sha256', mb_strtolower($email) . "\n" . $message, $config['password']);
$seen = is_file($dedupeFile) ? json_decode((string)file_get_contents($dedupeFile), true) : [];
$seen = array_filter(is_array($seen) ? $seen : [], static fn($v) => is_array($v) && ($v['t'] ?? 0) > $now - DEDUPE_SECONDS);
if (isset($seen[$fingerprint])) {
    log_event($privateDir, 'duplicate acknowledged ref=' . $seen[$fingerprint]['r']);
    respond(200, ['reference' => $seen[$fingerprint]['r'], 'duplicate' => true]);
}

// ---- Compose -------------------------------------------------------------------------------

date_default_timezone_set('Asia/Karachi');
$reference = strtoupper(bin2hex(random_bytes(4)));
$domain = substr((string)strrchr($config['from'], '@'), 1) ?: 'ehsanx.com';
$isLive = in_array($origin, ['https://ehsanx.com', 'https://www.ehsanx.com'], true);
$source = parse_url($origin, PHP_URL_HOST) ?: 'website';
$topic = TOPICS[$topicKey];
$received = date('j F Y, g:i a') . ' (Pakistan time)';
$test = $isLive ? '' : '[Test] ';
$teamTo = array_values((array)$config['to']);
$teamReplyTo = (string)($config['confirm_reply_to'] ?? $config['from']);

/** RFC 2047 encoded words, folded so no header line exceeds the limit. */
$encodeHeader = static function (string $s): string {
    if (preg_match('/^[\x20-\x7E]*$/', $s) && strlen($s) < 60) {
        return $s;
    }
    $words = [];
    $chunk = '';
    foreach (mb_str_split($s) as $char) {
        if (strlen($chunk . $char) > 45) {
            $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
            $chunk = '';
        }
        $chunk .= $char;
    }
    if ($chunk !== '') {
        $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    }
    return implode("\r\n ", $words);
};
$mailbox = static fn(string $displayName, string $address): string =>
    $encodeHeader(str_replace(['"', '\\'], '', $displayName)) . ' <' . $address . '>';

$h = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$row = static fn(string $label, string $value): string =>
    '<tr><td style="padding:8px 16px 8px 0;color:#5b6b84;font-size:14px;white-space:nowrap;vertical-align:top">' . $label
    . '</td><td style="padding:8px 0;color:#0d0d0d;font-size:15px">' . $value . '</td></tr>';
$detailsHtml = '<table role="presentation" cellpadding="0" cellspacing="0">'
    . $row('Name', '<strong>' . $h($name) . '</strong>')
    . $row('Email', '<a href="mailto:' . $h($email) . '" style="color:#116065">' . $h($email) . '</a>')
    . $row('Organization', $organization !== '' ? $h($organization) : '<span style="color:#5b6b84">Not provided</span>')
    . $row('Enquiry about', $h($topic))
    . $row('Received', $h($received))
    . $row('Reference', $h($reference))
    . '</table>'
    . '<div style="border-top:1px solid #e3e8ef;margin-top:12px;padding-top:16px;color:#5b6b84;font-size:14px">Message</div>'
    . '<div style="margin-top:8px;color:#0d0d0d;font-size:15px;line-height:1.6">' . nl2br($h($message)) . '</div>';
$detailsText = implode("\n", [
    'Name:          ' . $name,
    'Email:         ' . $email,
    'Organization:  ' . ($organization !== '' ? $organization : 'Not provided'),
    'Enquiry about: ' . $topic,
    'Received:      ' . $received,
    'Reference:     ' . $reference,
    '',
    'Message:',
    $message,
]);
/** The shared branded frame: navy title bar, amber rule, content, teal footer. */
$frame = static fn(string $title, string $content, string $footer): string =>
    '<!doctype html><html><body style="margin:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px"><tr><td align="center">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">'
    . '<tr><td style="background:#1f2e45;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold">' . $title . '</td></tr>'
    . '<tr><td style="height:4px;background:#fab74c;line-height:4px;font-size:0">&nbsp;</td></tr>'
    . '<tr><td style="padding:24px 28px">' . $content . '</td></tr>'
    . '<tr><td style="padding:16px 28px;background:#ecf2f3;color:#344a6a;font-size:13px">' . $footer . '</td></tr>'
    . '</table></td></tr></table></body></html>';

// 1. To the team: every field, Reply-To the visitor.
$teamMime = build_mime(
    [
        'From: ' . $mailbox((string)$config['from_name'], $config['from']),
        'To: ' . implode(', ', array_map(static fn($a) => '<' . $a . '>', $teamTo)),
        'Reply-To: ' . $mailbox($name, $email),
        'Subject: ' . $encodeHeader($test . 'New Website Enquiry — ' . $name),
        'Message-ID: <' . $reference . '.team.' . bin2hex(random_bytes(6)) . '@' . $domain . '>',
    ],
    "New website enquiry\n\n" . $detailsText . "\n\n—\nReply to this email to answer " . $name
        . " directly.\nSent from the contact form on " . $source . '.',
    $frame(
        'New website enquiry' . ($isLive ? '' : ' <span style="color:#fab74c">(test)</span>'),
        $detailsHtml,
        'Reply to this email to answer ' . $h($name) . ' directly. Sent from the contact form on ' . $h($source) . '.',
    ),
);

// 2. To the visitor: a thank-you with a copy of what they sent; replies reach the team.
$confirmMime = build_mime(
    [
        'From: ' . $mailbox((string)($config['confirm_from_name'] ?? 'Team EhsanX'), $config['from']),
        'To: ' . $mailbox($name, $email),
        'Reply-To: <' . $teamReplyTo . '>',
        'Subject: ' . $encodeHeader($test . 'Thank you for contacting us — ' . $name),
        'Message-ID: <' . $reference . '.thanks.' . bin2hex(random_bytes(6)) . '@' . $domain . '>',
        'Auto-Submitted: auto-replied',
    ],
    "Dear " . $name . ",\n\nThank you for contacting EhsanX. We have received your enquiry, and a member of our team"
        . " will be in touch with you soon.\n\nFor your records, here is a copy of what you sent:\n\n" . $detailsText
        . "\n\nWarm regards,\nTeam EhsanX\nhttps://ehsanx.com",
    $frame(
        'Thank you for contacting EhsanX',
        '<p style="margin:0 0 14px;color:#0d0d0d;font-size:16px;line-height:1.6">Dear ' . $h($name) . ',</p>'
        . '<p style="margin:0 0 14px;color:#0d0d0d;font-size:16px;line-height:1.6">Thank you for contacting EhsanX. We have received your enquiry, and a member of our team will be in touch with you soon.</p>'
        . '<p style="margin:0 0 20px;color:#0d0d0d;font-size:16px;line-height:1.6">For your records, here is a copy of what you sent:</p>'
        . '<div style="background:#f4f6f9;border-radius:8px;padding:12px 18px">' . $detailsHtml . '</div>'
        . '<p style="margin:24px 0 0;color:#0d0d0d;font-size:16px;line-height:1.6">Warm regards,<br><strong>Team EhsanX</strong></p>',
        'Developing People. Strengthening Institutions. Creating Meaningful Impact. · <a href="https://ehsanx.com" style="color:#116065">ehsanx.com</a>',
    ),
);

// ---- Send ----------------------------------------------------------------------------------

// The team email decides success: the visitor sees "received" only once the mail server accepted it.
try {
    $accepted = smtp_send($config, $config['from'], $teamTo, $teamMime);
} catch (Throwable $e) {
    // The exception text is the SMTP server's reply or a connection error: no form contents, no password.
    log_event($privateDir, 'smtp failed ref=' . $reference . ' ' . preg_replace('/\s+/', ' ', $e->getMessage()));
    fail(502, 'Your enquiry could not be sent just now. Your details are still in the form, so please try again in a moment.');
}
log_event($privateDir, 'team email accepted ref=' . $reference . ' reply="' . $accepted . '"');

// Only accepted enquiries count towards the limits, so a mail-server hiccup never locks anyone out.
$ipHits[] = $now;
$allHits[] = $now;
@file_put_contents($ipFile, json_encode($ipHits), LOCK_EX);
@file_put_contents($allFile, json_encode($allHits), LOCK_EX);
$seen[$fingerprint] = ['t' => $now, 'r' => $reference];
@file_put_contents($dedupeFile, json_encode($seen), LOCK_EX);

// The thank-you is a courtesy: if it fails, the enquiry has still reached the team.
try {
    $thanks = smtp_send($config, $config['from'], [$email], $confirmMime);
    log_event($privateDir, 'thank-you accepted ref=' . $reference . ' reply="' . $thanks . '"');
} catch (Throwable $e) {
    log_event($privateDir, 'thank-you failed ref=' . $reference . ' ' . preg_replace('/\s+/', ' ', $e->getMessage()));
}
respond(200, ['reference' => $reference]);

/**
 * A multipart/alternative message (plain text and HTML, both base64) with the given headers.
 *
 * @param array<int,string> $headers
 */
function build_mime(array $headers, string $plain, string $html): string
{
    $crlf = static fn(string $s): string => str_replace("\n", "\r\n", str_replace(["\r\n", "\r"], "\n", $s));
    $boundary = 'ehx-' . bin2hex(random_bytes(12));
    array_unshift($headers, 'Date: ' . date('r'));
    array_push($headers, 'MIME-Version: 1.0', 'Content-Type: multipart/alternative; boundary="' . $boundary . '"');
    return implode("\r\n", $headers) . "\r\n\r\n"
        . '--' . $boundary . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . rtrim(chunk_split(base64_encode($crlf($plain)))) . "\r\n"
        . '--' . $boundary . "\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . rtrim(chunk_split(base64_encode($html))) . "\r\n"
        . '--' . $boundary . '--';
}

/**
 * Minimal authenticated SMTP client: implicit TLS (port 465, 'ssl') or STARTTLS (port 587, 'tls'),
 * AUTH LOGIN. Returns the server's final reply to DATA, which confirms it accepted the message.
 *
 * @param array{host:string,port:int,encryption:string,username:string,password:string} $c
 * @param array<int,string> $to
 */
function smtp_send(array $c, string $from, array $to, string $mime): string
{
    // 'none' (no TLS) exists only for local testing against a loopback server.
    if ($c['encryption'] === 'none' && !in_array($c['host'], ['127.0.0.1', 'localhost'], true)) {
        throw new RuntimeException('unencrypted SMTP is only allowed on loopback');
    }
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $c['host']]]);
    $scheme = $c['encryption'] === 'ssl' ? 'ssl://' : 'tcp://';
    $socket = @stream_socket_client($scheme . $c['host'] . ':' . $c['port'], $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new RuntimeException("connect failed: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 20);

    $read = static function () use ($socket): array {
        $text = '';
        while (($line = fgets($socket, 1024)) !== false) {
            $text .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        if ($text === '') {
            throw new RuntimeException('connection closed or timed out');
        }
        return [(int)substr($text, 0, 3), trim($text)];
    };
    $cmd = static function (string $line, array $expect, string $label) use ($socket, $read): string {
        fwrite($socket, $line . "\r\n");
        [$code, $text] = $read();
        if (!in_array($code, $expect, true)) {
            throw new RuntimeException("{$label} refused: {$text}");
        }
        return $text;
    };

    try {
        [$code, $text] = $read();
        if ($code !== 220) {
            throw new RuntimeException("greeting: {$text}");
        }
        $ehlo = 'EHLO ' . preg_replace('/[^A-Za-z0-9.-]/', '', (string)($_SERVER['SERVER_NAME'] ?? 'ehsanx.com'));
        $cmd($ehlo, [250], 'EHLO');
        if ($c['encryption'] === 'tls') {
            $cmd('STARTTLS', [220], 'STARTTLS');
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
                throw new RuntimeException('STARTTLS negotiation failed');
            }
            $cmd($ehlo, [250], 'EHLO');
        }
        $cmd('AUTH LOGIN', [334], 'AUTH');
        $cmd(base64_encode($c['username']), [334], 'AUTH username');
        $cmd(base64_encode($c['password']), [235], 'AUTH password');
        $cmd('MAIL FROM:<' . $from . '>', [250], 'MAIL FROM');
        foreach ($to as $recipient) {
            $cmd('RCPT TO:<' . $recipient . '>', [250, 251], 'RCPT TO');
        }
        $cmd('DATA', [354], 'DATA');
        // Dot-stuffing: a line starting with "." gets an extra ".".
        $accepted = $cmd(preg_replace('/^\./m', '..', $mime) . "\r\n.", [250], 'message');
        @fwrite($socket, "QUIT\r\n");
        return preg_replace('/\s+/', ' ', $accepted) ?? $accepted;
    } finally {
        fclose($socket);
    }
}
