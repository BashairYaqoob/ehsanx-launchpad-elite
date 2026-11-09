# Contact form: server delivery (prepared, not active)

The Contact page form currently opens an email draft (mailto) addressed to the public
contact address. Server delivery to **info@ehsanx.com** through authenticated SMTP is prepared
but switched off. Nothing in the live build calls it.

## What is prepared

| File | Purpose |
|---|---|
| `server/hostinger/contact.php` | PHP endpoint (no libraries): validates the enquiry, checks the origin, drops honeypot bots, rate-limits per IP (5 an hour by default) and sends one plain-text email over SMTP with TLS and `AUTH LOGIN`. The visitor's address goes in `Reply-To`. |
| `server/hostinger/contact-config.sample.php` | Template for the private config: SMTP host, port, mailbox, password, recipient and allowed origins. |
| `src/lib/enquiry.ts` → `ENQUIRY_ENDPOINT` | `null` keeps the mailto flow. Set it to `"/contact.php"` to post the form to the endpoint instead. |
| `src/components/contact/EnquiryForm.tsx` | Handles both modes: "Open Email Draft" while inactive, "Send Enquiry" with sending, sent and error states once active. |

`server/` is outside `public/`, so the PHP file is **not** copied into `.output/public` and is not
deployed by a normal upload.

## Activating it on Hostinger

1. In hPanel → Emails, make sure the mailbox `info@ehsanx.com` exists and you know its password.
2. In File Manager, create a folder **next to** `public_html` (not inside it):
   `ehsanx-private/`.
3. Upload `server/hostinger/contact-config.sample.php` into it, rename it to
   `contact-config.php` and replace `REPLACE_WITH_MAILBOX_PASSWORD` with the mailbox password.
   Hostinger's SMTP server is `smtp.hostinger.com`, port 465 with `ssl` (or 587 with `tls`).
4. Upload `server/hostinger/contact.php` to `public_html/contact.php`.
5. In `src/lib/enquiry.ts`, set `ENQUIRY_ENDPOINT = "/contact.php"`, then rebuild with
   `bun run build:hostinger` and upload `.output/public` as usual (see `deployment.md`).
6. Send a test enquiry from https://ehsanx.com/contact and confirm it arrives at info@ehsanx.com.

The site's Content-Security-Policy already allows this (`connect-src 'self'`), and the
`.htaccess` rewrite rules only touch directories, so `/contact.php` is served directly.

## Notes

- The password lives only in `ehsanx-private/contact-config.php` on the server. Never commit it.
- The endpoint answers JSON: `{ "ok": true }` or `{ "ok": false, "message": "…" }` with a 4xx/5xx
  status. SMTP errors are written to the PHP error log, never shown to visitors.
- To return to the mailto flow, set `ENQUIRY_ENDPOINT` back to `null` and redeploy; the PHP file
  can stay or be deleted.
- Encryption `none` is accepted only for a loopback host and exists for local testing.
