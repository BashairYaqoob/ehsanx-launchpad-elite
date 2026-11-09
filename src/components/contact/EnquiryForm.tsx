import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { copyText } from "@/lib/clipboard";
import { CONTACT_EMAIL, MAILTO_URL, WHATSAPP_CONVERSATION_URL } from "@/lib/contact";
import { ENQUIRY_ENDPOINT, buildEnquiryMailto, enquiryDraftText, sendEnquiry, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";

const fields: { name: keyof Enquiry; label: string; type: string; placeholder: string; autoComplete: string }[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { name: "organization", label: "Organization", type: "text", placeholder: "Your organization", autoComplete: "organization" },
  { name: "email", label: "Email Address", type: "email", placeholder: "name@organization.com", autoComplete: "email" },
];

const input =
  "w-full rounded-lg border border-navy/25 bg-white px-4 font-[Inter] text-[16px] text-ink placeholder:text-ink/45 focus:border-teal focus:outline-2 focus:outline-offset-1 focus:outline-gold aria-[invalid=true]:border-destructive";

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>({ name: "", organization: "", email: "", message: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [drafted, setDrafted] = useState(false);
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
  // Only used once ENQUIRY_ENDPOINT is set (server delivery); the mailto flow ignores them.
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [website, setWebsite] = useState("");

  const set = (k: keyof Enquiry, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setCopied("idle");
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    if (ENQUIRY_ENDPOINT) {
      setSending(true);
      setSendError("");
      const result = await sendEnquiry(ENQUIRY_ENDPOINT, values, website);
      setSending(false);
      if (result.ok) setSent(true);
      else setSendError(result.message);
      return;
    }
    // No submission service is active: open a prefilled draft in the visitor's email app.
    window.location.href = buildEnquiryMailto(values);
    setDrafted(true);
  };

  // Fallback for visitors whose device has no email app: paste the prepared message anywhere.
  const onCopyDraft = async () => {
    setCopied((await copyText(enquiryDraftText(values))) ? "copied" : "failed");
  };

  const err = (k: keyof Enquiry) => errors[k] && (
    <p id={`enquiry-${k}-error`} className="mt-2 font-[Inter] text-[14px] text-destructive">{errors[k]}</p>
  );

  const field = (f: (typeof fields)[number]) => (
    <div key={f.name}>
      <label htmlFor={`enquiry-${f.name}`} className="mb-2 block font-[Inter] text-[14px] font-semibold text-navy">
        {f.label} <span aria-hidden="true" className="text-teal">*</span>
      </label>
      <input
        id={`enquiry-${f.name}`}
        name={f.name}
        type={f.type}
        required
        autoComplete={f.autoComplete}
        placeholder={f.placeholder}
        value={values[f.name]}
        onChange={(e) => set(f.name, e.target.value)}
        aria-invalid={!!errors[f.name]}
        aria-describedby={errors[f.name] ? `enquiry-${f.name}-error` : undefined}
        className={`${input} h-12`}
      />
      {err(f.name)}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="relative" aria-labelledby="enquiry-title">
      <h2 id="enquiry-title" className="font-[Montserrat] text-[28px] font-bold leading-[1.2] text-navy md:text-[32px]">Send an Enquiry</h2>
      {ENQUIRY_ENDPOINT ? (
        <p id="enquiry-how" className="mt-3 max-w-[60ch] font-[Inter] text-[15px] leading-[1.6] text-ink/80">
          Your enquiry is sent directly to the EhsanX team.
        </p>
      ) : (
        <p id="enquiry-how" className="mt-3 max-w-[60ch] font-[Inter] text-[15px] leading-[1.6] text-ink/80">
          This form does not send your enquiry by itself. It opens a draft in your email application, addressed to{" "}
          <span className="font-semibold text-navy">{CONTACT_EMAIL}</span>, ready for you to review and send.
        </p>
      )}
      <div className="mt-8 space-y-6">
        {ENQUIRY_ENDPOINT && (
          // Honeypot: hidden from people and assistive technology; bots that fill it are dropped server-side.
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="enquiry-website">Website</label>
            <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">{fields.slice(0, 2).map((f) => field(f))}</div>
        {fields.slice(2).map((f) => field(f))}
        <div>
          <label htmlFor="enquiry-message" className="mb-2 block font-[Inter] text-[14px] font-semibold text-navy">
            Message <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            required
            rows={6}
            placeholder="Tell us about your organization and what you would like to explore."
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "enquiry-message-error" : undefined}
            className={`${input} min-h-[160px] resize-y py-3 leading-[1.6]`}
          />
          {err("message")}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          disabled={sending || sent}
          aria-describedby="enquiry-how"
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-navy px-8 font-[Montserrat] text-[15px] font-semibold text-white transition-colors hover:bg-teal disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:w-auto"
        >
          <Mail aria-hidden="true" className="h-[18px] w-[18px]" />
          {ENQUIRY_ENDPOINT ? (sending ? "Sending…" : sent ? "Enquiry sent" : "Send Enquiry") : "Open Email Draft"}
        </button>
        <a
          href={WHATSAPP_CONVERSATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 font-[Inter] text-[15px] font-semibold text-teal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
          Or message us on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <div role="status" aria-live="polite">
        {sent && (
          <p className="mt-6 border-l-2 border-gold pl-4 font-[Inter] text-[15px] leading-[1.6] text-ink">
            Thank you. Your enquiry has been sent to the EhsanX team.
          </p>
        )}
        {sendError && (
          <p className="mt-6 border-l-2 border-destructive pl-4 font-[Inter] text-[15px] leading-[1.6] text-ink">
            {sendError}{" "}
            <a href={MAILTO_URL} className="font-semibold text-teal underline underline-offset-4">{CONTACT_EMAIL}</a>
          </p>
        )}
        {drafted && (
          <div className="mt-6 border-l-2 border-gold pl-4">
            <p className="font-[Inter] text-[15px] leading-[1.6] text-ink">
              Your email application should now open with your enquiry. Please press send there to complete it. If nothing opened, your details are still here — copy the enquiry below, or email us directly at{" "}
              <a href={MAILTO_URL} className="font-semibold text-teal underline underline-offset-4">{CONTACT_EMAIL}</a>.
            </p>
            <button
              type="button"
              onClick={onCopyDraft}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/20 px-5 font-[Inter] text-[14px] font-semibold text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {copied === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              {copied === "copied" ? "Enquiry copied" : "Copy enquiry"}
            </button>
            {copied === "failed" && (
              <p className="mt-2 font-[Inter] text-[14px] text-destructive">Copy did not work in this browser. Please email us directly at {CONTACT_EMAIL}.</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
