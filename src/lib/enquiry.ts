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

export function buildEnquiryMailto(v: Enquiry): string {
  const subject = `Enquiry from ${v.name.trim()} — ${v.organization.trim()}`;
  const body = [
    `Name: ${v.name.trim()}`,
    `Organization: ${v.organization.trim()}`,
    `Email: ${v.email.trim()}`,
    "",
    v.message.trim(),
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
