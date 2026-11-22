# Contact form: delivery through info@ehsanx.com

The Contact page form posts JSON to `/contact.php` on the same domain. That PHP endpoint validates
the enquiry and sends it through the info@ehsanx.com mailbox's SMTP server, authenticated as
`info@ehsanx.com`. No Node.js, no libraries, nothing secret in the repository or the built site.

| File | Purpose |
|---|---|
| `server/hostinger/contact.php` | The endpoint. Copied to `.output/public/contact.php` by `npm run build:hostinger`. |
| `server/hostinger/contact-config.sample.php` | Template for the private SMTP config (no real password). |
| `src/lib/enquiry.ts` | Field rules (mirrored on the server), topics and the request. Tested in `enquiry.test.ts`. |
| `src/components/contact/EnquiryForm.tsx` | The form: idle, sending, sent, field errors and delivery failure. |

## The emails

Each accepted enquiry sends two emails, both From the authenticated `info@ehsanx.com` mailbox
(so SPF/DKIM/DMARC align). The visitor's address is never used as the sender.

| | To the team | To the visitor |
|---|---|---|
| From | `EhsanX Website <info@ehsanx.com>` | `Team EhsanX <info@ehsanx.com>` |
| To | `to` in the config (default `info@ehsanx.com`) | the visitor |
| Reply-To | the visitor, so *Reply* answers them | `confirm_reply_to` (the team) |
| Subject | `New Website Enquiry — <name>` | `Thank you for contacting us — <name>` |
| Body | every field, time received, reference | a thank-you, "a member of our team will be in touch soon", and a copy of every field |

Messages from any address other than https://ehsanx.com (e.g. staging) start with `[Test]`.
The page says "received" only after the team email was accepted by the mail server; if the
thank-you then fails, that is logged and the enquiry still counts as received.

## Protection

- Same-site only: the request must carry an allowed `Origin` and the `X-EhsanX-Enquiry` header.
- POST, `application/json`, at most 16 KB.
- Server-side validation of every field; the topic must be one of the four offered; names and
  addresses with line breaks or `<>,;"` are rejected, so headers cannot be injected. Header values
  are RFC 2047-encoded, the body is base64.
- Spam: a hidden honeypot field (bots get a fake success and nothing is sent) and a time check
  (forms sent within 2.5 s of opening are refused with a retry message).
- Rate limits: 5 accepted enquiries per connection per hour, 60 for the whole site. Only accepted
  enquiries count. An identical enquiry within 15 minutes is acknowledged but not sent twice.
- `contact.log` (next to the private config) records only status, reference, Message-ID and the
  mail server's reply. No names, addresses, messages, IPs or passwords.

## SMTP settings

Use the provider whose mailbox actually receives info@ehsanx.com (the domain's MX records decide
this; only one provider can receive mail for the address).

| Provider | Host | Port / encryption | Username |
|---|---|---|---|
| GoDaddy Professional Email (Titan) | `smtpout.secureserver.net` | `465`, `ssl` | `info@ehsanx.com` |
| Hostinger Email | `smtp.hostinger.com` | `465`, `ssl` (or `587`, `tls`) | `info@ehsanx.com` |

The password is that mailbox's password. The website itself stays on Hostinger either way.

## One-time setup on Hostinger: the private config

The password goes in one file, **next to** `public_html`, never inside it.

1. hPanel → **Files → File Manager** for ehsanx.com. Go one level **above** `public_html`
   (usually `domains/ehsanx.com/`).
2. Create a folder `ehsanx-private`.
3. Inside it create a file `contact-config.php` and paste the contents of
   `server/hostinger/contact-config.sample.php`.
4. Replace `REPLACE_WITH_MAILBOX_PASSWORD` with the mailbox password, typed directly in the File
   Manager editor. Save. Do not paste it into chat, email, Git or any other file.
5. Optional hardening: set the folder's permissions to `700` and the file's to `600`.

The endpoint finds this file from `public_html` and from any subdomain folder inside it, so one
config serves both the live site and staging. It also creates `ehsanx-private/rate/` and
`ehsanx-private/contact.log` itself.

## Testing on staging (without touching the live site)

1. **Subdomain:** hPanel → Domains → Subdomains → create `staging` for ehsanx.com (folder
   `public_html/staging`). If ehsanx.com's DNS is managed at GoDaddy, add an **A** record
   `staging` → the same IP as `@`. Wait until https://staging.ehsanx.com shows Hostinger's
   placeholder, and until SSL is active (hPanel → Security → SSL).
2. **Origin:** the config's `allowed_origins` must include `https://staging.ehsanx.com`.
3. **Upload** `ehsanx-staging.zip` into `public_html/staging` and extract it there. It is the normal
   build plus `noindex` headers and a `robots.txt` that blocks indexing.
4. **Test** at https://staging.ehsanx.com/contact (see the checklist below). The email subject
   starts with `[Test]`.
5. **Clean up** afterwards: delete the subdomain and its folder, and remove the staging origin
   from `allowed_origins`.

### Test checklist

| Step | Expected | Where to check |
|---|---|---|
| Send a valid enquiry | "Thank you, <name>. We've received your enquiry." | the page |
| Mail server accepted both | `team email accepted ref=…` and `thank-you accepted ref=…`, each with `reply="250 …"` | `ehsanx-private/contact.log` |
| Inbox delivery | `[Test] New Website Enquiry — <name>` arrives (check Spam too) | the info@ehsanx.com webmail |
| Thank-you | `[Test] Thank you for contacting us — <name>` arrives at the test address | the tester's inbox |
| Reply-To | *Reply* addresses the visitor's email, not info@ | the received email |
| Empty submit | error summary + messages beside each field, nothing sent | the page |
| Invalid email | "Please enter a valid email address…" | the page |
| Six quick enquiries | the sixth is refused for an hour | the page / `contact.log` |

"Accepted" (log line with `250`) means Hostinger's server took the message for delivery. Only the
message appearing in the mailbox confirms delivery.

## Troubleshooting

| Log line / message | Cause | Fix |
|---|---|---|
| "The enquiry form is not available" (503) | config file not found | check the folder name and location (step 1–3 above) |
| `AUTH password refused: 535 …` | wrong password (or a temporary one that was never changed) | sign in to webmail once, set the password, retype it in the config |
| `connect failed …` | wrong host or port, or the port is blocked | check the host for your provider; for Hostinger Email try `587` / `tls`; otherwise ask Hostinger support whether outgoing SMTP to that host is allowed |
| "Request not allowed" (403) | the page's address is not in `allowed_origins` | add the exact origin, e.g. `https://staging.ehsanx.com` |
| accepted but not in the inbox | spam filtering or DNS | check Spam; in hPanel → Emails → DNS, make sure MX, SPF, DKIM and DMARC show as correct |
