<?php
/**
 * Private configuration for contact.php — TEMPLATE ONLY.
 *
 * On Hostinger, save a copy as   domains/ehsanx.com/ehsanx-private/contact-config.php
 * i.e. in a folder NEXT TO public_html (never inside it), and type the mailbox password there.
 * Never commit the real file and never put it in public_html. See docs/contact-form.md.
 */
return [
    // Outgoing server of the provider that hosts info@ehsanx.com — use ONE of these:
    //   GoDaddy Professional Email (Titan): smtpout.secureserver.net, port 465, 'ssl'
    //   Hostinger Email:                    smtp.hostinger.com,      port 465, 'ssl' (or 587, 'tls')
    'host' => 'smtpout.secureserver.net',
    'port' => 465,
    'encryption' => 'ssl',
    // The full mailbox address and its password.
    'username' => 'info@ehsanx.com',
    'password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
    // Both emails are sent From this authenticated mailbox.
    'from' => 'info@ehsanx.com',
    'from_name' => 'EhsanX Website',       // on the enquiry the team receives
    'confirm_from_name' => 'Team EhsanX',  // on the thank-you the visitor receives
    // The team's inbox(es) for new enquiries. Add more addresses to the list if needed,
    // e.g. ['info@ehsanx.com', 'ehsanx.transform@gmail.com'].
    'to' => ['info@ehsanx.com'],
    // Where a visitor's reply to the thank-you goes.
    'confirm_reply_to' => 'info@ehsanx.com',
    // Exact origins allowed to post the form. Keep the staging origin only while testing.
    'allowed_origins' => ['https://ehsanx.com', 'https://www.ehsanx.com', 'https://staging.ehsanx.com'],
    // Accepted enquiries per connection per hour, and for the whole site per hour.
    'rate_limit_per_hour' => 5,
    'rate_limit_global_per_hour' => 60,
];
