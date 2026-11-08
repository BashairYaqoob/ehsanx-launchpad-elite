# Deploying to Hostinger

Production is **https://ehsanx.com** on Hostinger Single Web Hosting, which serves
static files and PHP but cannot run Node.js. The site is therefore built as
static files: every page is rendered to HTML at build time and the browser then
takes over (hydration), so all interactions, animations, the preloader and
client-side navigation work exactly as in development. GoDaddy remains the
domain registrar.

## Build

```sh
bun install                 # once, from bun.lock
bun run build:hostinger     # or: npm run build:hostinger
```

`build:hostinger` runs `vite build`, which:

1. bundles the site into `.output/public/assets/` (file names carry a content
   hash), and builds a Node server in `.output/server/` that is used **only
   during the build**;
2. prerenders every route found in `src/routes/` (and every internal link it
   finds) to `index.html` files; any page that fails to render fails the build.

It then runs `scripts/render-404.mjs`, which starts that build server on a
private port, renders the not-found page, saves it as `404.html` and stops the
server. The build needs Node 22+ (or Bun); the host does not.

Plain `bun run build` still works for the temporary Vercel preview, where Nitro
detects Vercel and builds in Vercel's format.

## What to upload

Upload the **contents** of `.output/public/` (not the folder itself) into
`public_html/`. Do not upload `.output/server/`, `node_modules/` or the source.

```
public_html/
├── .htaccess                 rewrites, 404, caching, security headers
├── index.html                /
├── philosophy/index.html     /philosophy
├── solutions/index.html      /solutions
├── our-approach/index.html   /our-approach
├── client-impact/index.html  /client-impact
├── meet-the-team/index.html  /meet-the-team
├── contact/index.html        /contact
├── 404.html                  not-found page (served with status 404)
├── assets/                   hashed JS, CSS, images (~93 files, ~8 MB)
│   └── .htaccess             one-year caching for hashed files
├── preloader.mp4             logo-forming preloader video
├── og-image.png              social sharing image (1200 × 630)
├── favicon.png, apple-touch-icon.png
├── robots.txt, sitemap.xml
```

Total ≈ 14 MB. The two `.htaccess` files start with a dot: turn on "show hidden
files" in the File Manager or FTP client and make sure both are uploaded.
Uploading a zip of the folder and extracting it in `public_html` keeps them.

On each new deploy, replace everything. Old files in `assets/` are harmless but
can be deleted, since every build references only its own hashed files.

## URL rules (`public/.htaccess`)

Written for the layout above and tested against Apache 2.4 (Hostinger's
LiteSpeed reads the same `.htaccess` directives):

| Request | Result |
| --- | --- |
| `/philosophy` | 200, served from `philosophy/index.html` |
| `/philosophy/` | 301 → `/philosophy` |
| `/philosophy/index.html`, `/index.html` | 301 → `/philosophy`, `/` |
| `/anything-else`, `/a/b/c` | 404 status with the branded not-found page |
| `http://ehsanx.com/…`, `www.ehsanx.com/…` | 301 → `https://ehsanx.com/…` |
| Hostinger's temporary/preview domain | served as-is (no host or HTTPS redirect) |

Canonical URLs have no trailing slash, matching the router and the
`<link rel="canonical">` tags. `DirectorySlash Off` stops the server from
adding a slash that the router would immediately remove again.

## Caching

- `assets/*`: `public, max-age=31536000, immutable` (names change when content does).
- HTML: `no-cache` (always revalidated, so a deploy is visible at once).
- `preloader.mp4`, icons, share image: one day. `robots.txt`, `sitemap.xml`: one hour.
- Text responses are gzip-compressed (LiteSpeed may also apply Brotli).

## Security headers

Set in `.htaccess`: `Content-Security-Policy`, `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`.

The policy allows inline scripts and styles because each page carries inline
`<script>` data that TanStack Start hydrates from, plus inline style attributes,
and a static host cannot add per-request nonces. Everything else is limited to
this origin and Google Fonts. `connect-src 'self'` and `form-action 'self'`
already allow the future PHP contact endpoint on the same domain. If a new
external service is added (analytics, maps, a captcha), extend the policy or it
will be blocked.

HSTS is written but commented out: enable it only after HTTPS has worked on
ehsanx.com for a few days.

## Metadata

`SITE_URL` in `src/lib/site.ts` (`https://ehsanx.com`) drives canonical URLs,
`og:url`, `og:image` and `twitter:image` on every page. `public/sitemap.xml` and
`public/robots.txt` use the same origin; `src/test/production-metadata.test.ts`
fails if they drift.

## Deployment checklist

Before go-live:

- [ ] DNS approach decided (nameservers vs individual records) after exporting
      the existing GoDaddy zone; email/verification records preserved.
- [ ] Website on ehsanx.com created in hPanel (PHP/HTML website).
- [ ] `bun run build:hostinger` succeeds; tests pass (`bun run test`).
- [ ] Contents of `.output/public/` uploaded to `public_html/`, including both
      `.htaccess` files.
- [ ] Site checked on Hostinger's preview/temporary address: all seven pages,
      a refresh on each page, `/does-not-exist` shows the 404 page.
- [ ] DNS pointed at Hostinger; `ehsanx.com` and `www.ehsanx.com` resolve.
- [ ] SSL certificate active in hPanel **before** relying on the HTTPS redirect
      in `.htaccess` (until then `http://ehsanx.com` would redirect to a
      certificate error).
- [ ] `https://ehsanx.com` and `https://www.ehsanx.com` → `https://ehsanx.com`;
      `http://` → `https://`.
- [ ] Preloader video plays on first visit; hero slider, scroll scenes, mobile
      menu and contact form validation work on a phone and a desktop.
- [ ] Share preview checked (e.g. LinkedIn Post Inspector, Facebook Sharing
      Debugger) and the sitemap submitted in Google Search Console.

After go-live:

- [ ] HSTS enabled in `.htaccess` once HTTPS has been stable for a few days.

## Contact form (prepared, not active)

The enquiry form currently validates in the browser and then opens the
visitor's email app (`mailto:`). It stays that way until the `info@ehsanx.com`
mailbox exists and sending and receiving have been tested. The planned
replacement, which needs no change to the page design:

```
public_html/
├── api/contact.php        POST endpoint, JSON in and out
└── (outside public_html)  config file with SMTP host, port, username and
                           password, readable only by the account; never in Git
```

- **Request checks:** POST only; `Content-Type: application/json`; `Origin`
  must be `https://ehsanx.com`; a custom request header the browser sends from
  the site; body size limit.
- **Validation (server side, mirroring `src/lib/enquiry.ts`):** name ≤ 100,
  organization ≤ 150, valid email ≤ 255, message ≤ 2000 characters; trimmed;
  control characters and line breaks removed from anything used in a header.
- **Spam protection:** a hidden honeypot field, a minimum time between page
  load and submit, and per-IP rate limiting (file or MySQL based). A captcha
  (e.g. Cloudflare Turnstile) is optional and would need the CSP extended.
- **Sending:** authenticated SMTP via PHPMailer. From and To are
  `info@ehsanx.com`; the visitor's address goes only in Reply-To, after
  validation. Never use the visitor's address as From (it would fail SPF/DMARC).
- **Responses:** `200 {"ok":true}` only after the SMTP server accepts the
  message; `422` with per-field errors; `429` when rate-limited; `500` with a
  generic message (details only in the server log). The form shows success or
  failure inside its existing design and keeps the WhatsApp and email
  alternatives that are already on the page.

Waiting for the mailbox and hPanel:

- SMTP host, port and encryption for the Hostinger mailbox (read from hPanel,
  not assumed), and the mailbox password stored only in the server-side config.
- SPF, DKIM and DMARC records for ehsanx.com (part of the DNS decision).
- A real test: messages from the endpoint arrive at `info@ehsanx.com`, with
  SPF/DKIM/DMARC passing, before the form is switched over.
- Changing `CONTACT_EMAIL` in `src/lib/contact.ts` from the Gmail address.
