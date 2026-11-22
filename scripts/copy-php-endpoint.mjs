// Copies the PHP enquiry endpoint into the Hostinger build (.output/public/contact.php).
//
// Only `build:hostinger` runs this, so the Vercel preview never serves PHP source. The private
// SMTP config is NOT copied: it lives on the server outside public_html (docs/contact-form.md).
import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const from = resolve(root, "server/hostinger/contact.php");
const to = resolve(root, ".output/public/contact.php");
await copyFile(from, to);
console.log(`copy-php-endpoint: wrote ${to}`);
