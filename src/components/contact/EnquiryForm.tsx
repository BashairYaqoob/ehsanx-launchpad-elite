import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { CONTACT_EMAIL, MAILTO_URL, WHATSAPP_CONVERSATION_URL } from "@/lib/contact";
import {
  ENQUIRY_TOPICS,
  MESSAGE_MAX,
  emptyEnquiry,
  firstInvalidField,
  sendEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/enquiry";

type Status = "idle" | "sending" | "sent" | "failed";

const id = (f: EnquiryField | "website") => `enquiry-${f}`;
const control =
  "w-full rounded-xl border border-navy/20 bg-paper px-4 font-[Inter] text-[16px] text-ink transition-colors placeholder:text-ink/45 hover:border-navy/40 focus:border-teal focus:outline-2 focus:outline-offset-1 focus:outline-gold aria-[invalid=true]:border-destructive aria-[invalid=true]:bg-destructive/[0.03]";

const FIELD_LABELS: Record<EnquiryField, string> = {
  name: "Full name",
  email: "Email address",
  organization: "Organization",
  topic: "What is your enquiry about?",
  message: "Message",
};

function Field({
  field,
  required = false,
  hint,
  error,
  children,
}: {
  field: EnquiryField;
  required?: boolean;
  hint?: ReactNode;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id(field)}
        className="mb-2 flex items-baseline gap-2 font-[Montserrat] text-[14px] font-semibold text-navy"
      >
        {FIELD_LABELS[field]}
        {required ? (
          <span aria-hidden="true" className="text-teal">
            *
          </span>
        ) : (
          <span className="font-[Inter] text-[13px] font-normal text-ink/60">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id(field)}-error`}
          className="mt-2 flex items-start gap-1.5 font-[Inter] text-[14px] leading-[1.45] text-destructive"
        >
          <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : (
        hint && <div className="mt-2 font-[Inter] text-[13px] text-ink/60">{hint}</div>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [website, setWebsite] = useState("");
  const openedAt = useRef(0);
  const inFlight = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    openedAt.current = performance.now();
  }, []);
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const set = (field: EnquiryField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const showErrors = (found: EnquiryErrors, message: string) => {
    setErrors(found);
    setSummary(message);
    const first = firstInvalidField(found);
    if (first) document.getElementById(id(first))?.focus();
  };

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inFlight.current) return; // one request at a time, however fast the clicks
    const found = validateEnquiry(values);
    if (Object.keys(found).length) {
      const count = Object.keys(found).length;
      showErrors(
        found,
        count === 1 ? "One field needs your attention." : `${count} fields need your attention.`,
      );
      return;
    }
    setErrors({});
    setSummary("");
    setFailure("");
    inFlight.current = true;
    setStatus("sending");
    const result = await sendEnquiry(values, {
      website,
      elapsed: performance.now() - openedAt.current,
    });
    inFlight.current = false;
    if (result.kind === "sent") {
      setStatus("sent");
    } else if (result.kind === "invalid") {
      setStatus("idle");
      showErrors(result.errors, result.message);
    } else {
      setFailure(result.message);
      setStatus("failed");
    }
  };

  const startOver = () => {
    setValues(emptyEnquiry);
    setErrors({});
    setStatus("idle");
    openedAt.current = performance.now();
    requestAnimationFrame(() => document.getElementById(id("name"))?.focus());
  };

  const describe = (field: EnquiryField, hint?: string) =>
    [errors[field] ? `${id(field)}-error` : undefined, hint].filter(Boolean).join(" ") || undefined;
  const sending = status === "sending";
  const firstName = values.name.trim().split(/\s+/)[0] ?? "";

  // Sent: a short confirmation in place of the form. Shown only after the server confirmed acceptance.
  if (status === "sent") {
    return (
      <div className="rounded-[24px] bg-teal-wash p-6 sm:p-8 md:p-10" role="status">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal text-paper">
            <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div>
            <h2
              ref={successRef}
              tabIndex={-1}
              className="font-[Montserrat] text-[22px] font-bold leading-[1.25] text-navy outline-none md:text-[24px]"
            >
              Thank you{firstName ? `, ${firstName}` : ""}. We've received your enquiry.
            </h2>
            <p className="mt-2 font-[Inter] text-[15px] leading-[1.6] text-ink/80">
              A member of our team will be in touch soon.
            </p>
            <button
              type="button"
              onClick={startOver}
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center font-[Montserrat] text-[15px] font-semibold text-teal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="enquiry-title"
      aria-describedby="enquiry-intro"
      aria-busy={sending}
      className="relative rounded-[24px] bg-teal-wash p-6 sm:p-8 md:p-10"
    >
      <h2
        id="enquiry-title"
        className="font-[Montserrat] text-[clamp(1.6rem,2.6vw,2rem)] font-bold leading-[1.2] text-navy"
      >
        Send us an enquiry
      </h2>
      <p
        id="enquiry-intro"
        className="mt-3 max-w-[56ch] font-[Inter] text-[15px] leading-[1.6] text-ink/80"
      >
        Your message goes straight to our team. Fields marked{" "}
        <span aria-hidden="true" className="font-semibold text-teal">
          *
        </span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {/* Error summary for validation problems: announced, and each item moves focus to its field. */}
      <div role="alert" aria-live="assertive">
        {summary && (
          <div className="mt-6 rounded-xl border border-destructive/40 bg-paper p-4">
            <p className="flex items-center gap-2 font-[Montserrat] text-[15px] font-semibold text-destructive">
              <AlertCircle aria-hidden="true" className="h-[18px] w-[18px]" />
              {summary}
            </p>
            <ul className="mt-2 space-y-1 pl-[26px]">
              {(Object.keys(errors) as EnquiryField[])
                .filter((f) => errors[f])
                .map((f) => (
                  <li key={f}>
                    <a
                      href={`#${id(f)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id(f))?.focus();
                      }}
                      className="font-[Inter] text-[14px] text-ink underline decoration-destructive/50 underline-offset-4 hover:decoration-destructive"
                    >
                      {FIELD_LABELS[f]}: {errors[f]}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Honeypot: invisible to people and assistive technology; a bot that fills it is dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field field="name" required error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={`${control} h-12`}
          />
        </Field>
        <Field field="email" required error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={254}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${control} h-12`}
          />
        </Field>
        <Field field="organization" error={errors.organization}>
          <input
            id={id("organization")}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={!!errors.organization}
            aria-describedby={describe("organization")}
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            className={`${control} h-12`}
          />
        </Field>
        <Field field="topic" required error={errors.topic}>
          <div className="relative">
            <select
              id={id("topic")}
              name="topic"
              required
              aria-required="true"
              aria-invalid={!!errors.topic}
              aria-describedby={describe("topic")}
              value={values.topic}
              onChange={(e) => set("topic", e.target.value)}
              className={`${control} h-12 cursor-pointer appearance-none pr-11 ${values.topic ? "" : "text-ink/55"}`}
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {ENQUIRY_TOPICS.map((t) => (
                <option key={t.value} value={t.value} className="text-ink">
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/60"
            />
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field
          field="message"
          required
          error={errors.message}
          hint={
            <span id="enquiry-message-count" className="flex justify-between gap-4">
              <span>Tell us about your organization and what you would like to explore.</span>
              <span className="shrink-0 tabular-nums">
                {values.message.length.toLocaleString("en-US")} /{" "}
                {MESSAGE_MAX.toLocaleString("en-US")}
              </span>
            </span>
          }
        >
          <textarea
            id={id("message")}
            name="message"
            rows={6}
            maxLength={MESSAGE_MAX}
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={describe(
              "message",
              errors.message ? undefined : "enquiry-message-count",
            )}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${control} min-h-[168px] resize-y py-3 leading-[1.6]`}
          />
        </Field>
      </div>

      {/* Delivery failure: keeps every field as typed and offers a retry plus direct alternatives. */}
      <div role="alert" aria-live="assertive">
        {status === "failed" && failure && (
          <div className="mt-6 rounded-xl border-l-[3px] border-destructive bg-paper p-4 md:p-5">
            <p className="font-[Montserrat] text-[15px] font-semibold text-navy">
              Your enquiry was not sent.
            </p>
            <p className="mt-1.5 font-[Inter] text-[15px] leading-[1.6] text-ink">{failure}</p>
            <p className="mt-2 font-[Inter] text-[14px] leading-[1.6] text-ink/75">
              You can also email{" "}
              <a href={MAILTO_URL} className="font-semibold text-teal underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>{" "}
              or{" "}
              <a
                href={WHATSAPP_CONVERSATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal underline underline-offset-4"
              >
                message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          aria-disabled={sending}
          className="group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-navy px-8 font-[Montserrat] text-[15px] font-semibold text-paper transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold aria-disabled:cursor-progress aria-disabled:opacity-80 sm:w-auto"
        >
          {sending ? (
            <>
              <Loader2
                aria-hidden="true"
                className="h-[18px] w-[18px] animate-spin motion-reduce:animate-none"
              />
              Sending your enquiry…
            </>
          ) : status === "failed" ? (
            <>
              <RotateCcw aria-hidden="true" className="h-[18px] w-[18px]" />
              Try again
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight
                aria-hidden="true"
                className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </>
          )}
        </button>
        <a
          href={WHATSAPP_CONVERSATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 font-[Inter] text-[15px] font-semibold text-teal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
          Prefer WhatsApp?
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <p role="status" className="sr-only">
        {sending ? "Sending your enquiry." : ""}
      </p>
    </form>
  );
}
