// Contact page enquiry: field rules, topics and the request to the PHP endpoint that delivers it
// to info@ehsanx.com (server/hostinger/contact.php). Browser-safe and DOM-free so it can be tested.
// The server repeats every check; these exist so visitors see problems before sending.

export type Enquiry = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
};
export type EnquiryField = keyof Enquiry;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Same-origin PHP endpoint, deployed beside the static site by `npm run build:hostinger`. */
export const ENQUIRY_ENDPOINT = "/contact.php";

export const MESSAGE_MAX = 2000;
const MESSAGE_MIN = 10;

/** The topics the form offers; the server accepts only these keys. */
export const ENQUIRY_TOPICS = [
  { value: "executive-dialogues", label: "Executive Leadership Dialogues" },
  { value: "leadership-programmes", label: "Leadership Development & Transformation Programmes" },
  { value: "transformation-partnerships", label: "Organizational Transformation Partnerships" },
  { value: "other", label: "Something else" },
] as const;

/** Field order, used to focus the first field that needs attention. */
export const ENQUIRY_FIELDS: EnquiryField[] = ["name", "email", "organization", "topic", "message"];

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  organization: "",
  topic: "",
  message: "",
};

const EMAIL_RE = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]{2,}$/;

export function validateEnquiry(v: Enquiry): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();
  if (!name) e.name = "Please enter your full name.";
  else if (name.length > 100) e.name = "Please keep your name under 100 characters.";
  if (!email) e.email = "Please enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    e.email = "Please enter a valid email address, like name@organization.com.";
  if (v.organization.trim().length > 150)
    e.organization = "Please keep your organization under 150 characters.";
  if (!ENQUIRY_TOPICS.some((t) => t.value === v.topic))
    e.topic = "Please choose what your enquiry is about.";
  if (!message) e.message = "Please enter your message.";
  else if (message.length < MESSAGE_MIN)
    e.message = "Please tell us a little more (at least 10 characters).";
  else if (message.length > MESSAGE_MAX)
    e.message = "Please keep your message under 2,000 characters.";
  return e;
}

/** The first field, in form order, that has an error. */
export function firstInvalidField(errors: EnquiryErrors): EnquiryField | undefined {
  return ENQUIRY_FIELDS.find((f) => errors[f]);
}

export type EnquiryResult =
  | { kind: "sent"; reference: string }
  | { kind: "invalid"; errors: EnquiryErrors; message: string }
  | { kind: "failed"; message: string };

const FAILED =
  "Your enquiry could not be sent just now. Your details are still in the form, so please try again in a moment.";
const OFFLINE =
  "Your enquiry could not be sent. Please check your connection and try again — your details are still in the form.";

type Fetch = typeof fetch;

/**
 * Posts the enquiry. Only a 200 with `ok: true` from the server counts as sent: the server returns
 * that after the mail server has accepted the message, never before.
 * `website` is the hidden honeypot; `elapsed` is how long the form was open (a bot check).
 */
export async function sendEnquiry(
  v: Enquiry,
  {
    website = "",
    elapsed,
    fetcher = fetch,
    timeoutMs = 25000,
  }: { website?: string; elapsed: number; fetcher?: Fetch; timeoutMs?: number },
): Promise<EnquiryResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetcher(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-EhsanX-Enquiry": "1",
      },
      body: JSON.stringify({
        name: v.name.trim(),
        email: v.email.trim(),
        organization: v.organization.trim(),
        topic: v.topic,
        message: v.message.trim(),
        website,
        elapsed: Math.round(elapsed),
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as {
      ok?: boolean;
      reference?: string;
      message?: string;
      errors?: EnquiryErrors;
    } | null;
    if (res.status === 200 && data?.ok === true)
      return { kind: "sent", reference: data.reference ?? "" };
    if (res.status === 422 && data?.errors) {
      return {
        kind: "invalid",
        errors: data.errors,
        message: data.message ?? "Please check the highlighted fields.",
      };
    }
    return { kind: "failed", message: data?.message ?? FAILED };
  } catch {
    return { kind: "failed", message: OFFLINE };
  } finally {
    clearTimeout(timer);
  }
}
