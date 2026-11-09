<?php
/**
 * Private configuration for contact.php. Copy to <home>/ehsanx-private/contact-config.php on
 * Hostinger (one level ABOVE public_html, never inside it) and fill in the password there.
 * Never commit the real file.
 */
return [
    // Hostinger mail: smtp.hostinger.com, 465 with 'ssl' (or 587 with 'tls').
    'host' => 'smtp.hostinger.com',
    'port' => 465,
    'encryption' => 'ssl',
    // The mailbox that sends the enquiry (must exist in Hostinger Emails).
    'username' => 'info@ehsanx.com',
    'password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
    'from' => 'info@ehsanx.com',
    'from_name' => 'EhsanX website',
    // Where enquiries are delivered.
    'to' => 'info@ehsanx.com',
    // Origins allowed to post the form.
    'allowed_origins' => ['https://ehsanx.com', 'https://www.ehsanx.com'],
    'rate_limit_per_hour' => 5,
];
