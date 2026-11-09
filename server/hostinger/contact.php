<?php
/**
 * EhsanX enquiry endpoint for Hostinger (PREPARED, NOT ACTIVE).
 *
 * Receives the Contact page form as JSON and delivers it to info@ehsanx.com through
 * authenticated SMTP. No third-party libraries: a small SMTP client over TLS is included below.
 *
 * Activation (see docs/contact-form.md):
 *   1. Upload this file to public_html/contact.php.
 *   2. Upload contact-config.sample.php OUTSIDE public_html as
 *      <home>/ehsanx-private/contact-config.php and fill in the mailbox password there.
 *   3. Set ENQUIRY_ENDPOINT = "/contact.php" in src/lib/enquiry.ts and redeploy the site.
 * Secrets never live in the repository or in public_html.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message = ''): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

$configPath = dirname(__DIR__) . '/ehsanx-private/contact-config.php';
if (!is_file($configPath)) {
    respond(503, false, 'The enquiry form is not available at the moment. Please email us directly.');
}
/** @var array{host:string,port:int,encryption:string,username:string,password:string,from:string,from_name:string,to:string,allowed_origins:array<int,string>,rate_limit_per_hour:int} $config */
$config = require $configPath;

// Same-origin only: the browser sends Origin on POST fetches.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, false, 'Request not allowed.');
}

$raw = file_get_contents('php://input', false, null, 0, 16384);
$data = json_decode($raw === false ? '' : $raw, true);
if (!is_array($data)) {
    respond(400, false, 'Your enquiry could not be read. Please try again.');
}

// Honeypot: a filled hidden field means a bot. Pretend success so it does not retry.
if (trim((string)($data['website'] ?? '')) !== '') {
    respond(200, true);
}

$clean = static fn($v): string => trim(str_replace("\0", '', (string)$v));
$name = $clean($data['name'] ?? '');
$organization = $clean($data['organization'] ?? '');
$email = $clean($data['email'] ?? '');
$message = $clean($data['message'] ?? '');

// Mirrors validateEnquiry() in src/lib/enquiry.ts.
if ($name === '' || mb_strlen($name) > 100
    || $organization === '' || mb_strlen($organization) > 150
    || $email === '' || mb_strlen($email) > 255 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || $message === '' || mb_strlen($message) > 2000) {
    respond(422, false, 'Please check the form: every field is required, with a valid email address.');
}
// Header values must be single-line.
foreach ([$name, $organization, $email] as $field) {
    if (preg_match('/[\r\n]/', $field)) {
        respond(422, false, 'Please check the form and try again.');
    }
}

// Simple per-IP rate limit, stored beside the private config (not web-accessible).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = dirname($configPath) . '/rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$hits = is_file($rateFile) ? array_filter((array)json_decode((string)file_get_contents($rateFile), true), static fn($t) => is_int($t) && $t > $now - 3600) : [];
if (count($hits) >= (int)$config['rate_limit_per_hour']) {
    respond(429, false, 'Too many enquiries from this connection. Please try again later or email us directly.');
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

$encodeHeader = static fn(string $s): string => '=?UTF-8?B?' . base64_encode($s) . '?=';
$subject = 'Website enquiry from ' . $name . ' — ' . $organization;
$body = "Name: {$name}\nOrganization: {$organization}\nEmail: {$email}\n\n" . str_replace(["\r\n", "\r"], "\n", $message);
$body = str_replace("\n", "\r\n", $body);

$headers = [
    'Date: ' . date('r'),
    'From: ' . $encodeHeader($config['from_name']) . ' <' . $config['from'] . '>',
    'To: <' . $config['to'] . '>',
    'Reply-To: ' . $encodeHeader($name) . ' <' . $email . '>',
    'Subject: ' . $encodeHeader($subject),
    'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr(strrchr($config['from'], '@') ?: '@ehsanx.com', 1) . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];
$mime = implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($body)));

try {
    smtp_send($config, $config['from'], $config['to'], $mime);
} catch (Throwable $e) {
    error_log('EhsanX contact form SMTP error: ' . $e->getMessage());
    respond(502, false, 'Your enquiry could not be sent just now. Please try again or email us directly.');
}
respond(200, true);

/**
 * Minimal authenticated SMTP client: implicit TLS (port 465) or STARTTLS (port 587), AUTH LOGIN.
 *
 * @param array{host:string,port:int,encryption:string,username:string,password:string} $c
 */
function smtp_send(array $c, string $from, string $to, string $mime): void
{
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $c['host']]]);
    // 'none' (no TLS) exists only for local testing against a loopback server.
    if ($c['encryption'] === 'none' && !in_array($c['host'], ['127.0.0.1', 'localhost'], true)) {
        throw new RuntimeException('unencrypted SMTP is only allowed on loopback');
    }
    $scheme = $c['encryption'] === 'ssl' ? 'ssl://' : 'tcp://';
    $socket = stream_socket_client($scheme . $c['host'] . ':' . $c['port'], $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new RuntimeException("connect failed: {$errstr} ({$errno})");
    }
    stream_set_timeout($socket, 15);

    $read = static function () use ($socket): array {
        $text = '';
        while (($line = fgets($socket, 1024)) !== false) {
            $text .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return [(int)substr($text, 0, 3), $text];
    };
    $cmd = static function (string $line, array $expect) use ($socket, $read): string {
        fwrite($socket, $line . "\r\n");
        [$code, $text] = $read();
        if (!in_array($code, $expect, true)) {
            throw new RuntimeException('unexpected reply to ' . strtok($line, ' ') . ": {$text}");
        }
        return $text;
    };

    [$code, $text] = $read();
    if ($code !== 220) {
        throw new RuntimeException("greeting: {$text}");
    }
    $ehlo = 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'ehsanx.com');
    $cmd($ehlo, [250]);
    if ($c['encryption'] === 'tls') {
        $cmd('STARTTLS', [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
            throw new RuntimeException('STARTTLS negotiation failed');
        }
        $cmd($ehlo, [250]);
    }
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode($c['username']), [334]);
    $cmd(base64_encode($c['password']), [235]);
    $cmd('MAIL FROM:<' . $from . '>', [250]);
    $cmd('RCPT TO:<' . $to . '>', [250, 251]);
    $cmd('DATA', [354]);
    // Dot-stuffing: a line starting with "." gets an extra ".".
    $payload = preg_replace('/^\./m', '..', $mime);
    $cmd($payload . "\r\n.", [250]);
    $cmd('QUIT', [221]);
    fclose($socket);
}
