import { CONTACT_EMAIL } from "./contact";

export type Enquiry = { name: string; organization: string; email: string; message: string };
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(v: Enquiry): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.length > 100) e.name = "Name must be under 100 characters.";
  if (!v.organization.trim()) e.organization = "Please enter your organization.";
  else if (v.organization.length > 150) e.organization = "Organization must be under 150 characters.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 255) e.email = "Please enter a valid email address.";
  if (!v.message.trim()) e.message = "Please enter your message.";
  else if (v.message.length > 2000) e.message = "Message must be under 2,000 characters.";
  return e;
}

export type EnquiryDraft = { to: string; subject: string; body: string };

/** The email the form prepares; shared by the mailto link and the copy-to-clipboard fallback. */
export function buildEnquiryDraft(v: Enquiry): EnquiryDraft {
  const subject = `Enquiry from ${v.name.trim()} — ${v.organization.trim()}`;
  const body = [
    `Name: ${v.name.trim()}`,
    `Organization: ${v.organization.trim()}`,
    `Email: ${v.email.trim()}`,
    "",
    v.message.trim(),
  ].join("\n");
  return { to: CONTACT_EMAIL, subject, body };
}

export function buildEnquiryMailto(v: Enquiry): string {
  const { to, subject, body } = buildEnquiryDraft(v);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Plain-text version for visitors without an email app: paste it into any mail client or webmail. */
export function enquiryDraftText(v: Enquiry): string {
  const { to, subject, body } = buildEnquiryDraft(v);
  return `To: ${to}\nSubject: ${subject}\n\n${body}`;
}

/**
 * Server delivery for the enquiry form (PREPARED, NOT ACTIVE).
 * While this is null the form opens an email draft (mailto). To activate delivery to
 * info@ehsanx.com through authenticated SMTP, upload server/hostinger/contact.php as
 * /contact.php, create its private config, then set this to "/contact.php"
 * (see docs/contact-form.md). CSP connect-src 'self' already allows the same-origin request.
 */
export const ENQUIRY_ENDPOINT: string | null = null;

export type EnquirySendResult = { ok: true } | { ok: false; message: string };

/** Posts the enquiry to the PHP endpoint; `website` is the hidden honeypot field. */
export async function sendEnquiry(endpoint: string, v: Enquiry, website = ""): Promise<EnquirySendResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...v, website }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
    if (res.ok && data?.ok) return { ok: true };
    return { ok: false, message: data?.message ?? "Your enquiry could not be sent. Please try again or email us directly." };
  } catch {
    return { ok: false, message: "Your enquiry could not be sent. Please check your connection, or email us directly." };
  }
}
