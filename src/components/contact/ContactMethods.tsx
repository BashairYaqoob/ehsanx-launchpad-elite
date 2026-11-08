import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Globe, Mail, MessageCircle } from "lucide-react";
import { copyText } from "@/lib/clipboard";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  MAILTO_URL,
  WHATSAPP_CONVERSATION_URL,
} from "@/lib/contact";

const methods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT_PHONE_DISPLAY,
    href: WHATSAPP_CONVERSATION_URL,
    external: true,
    copy: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: MAILTO_URL,
    external: false,
    copy: true,
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.ehsanx.com",
    href: "https://www.ehsanx.com",
    external: true,
    copy: false,
  },
];

/** Copy control for the email address: mailto does nothing on devices without an email app. */
function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onCopy = async () => {
    setState((await copyText(CONTACT_EMAIL)) ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2500);
  };
  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-navy/20 px-4 font-[Inter] text-[14px] font-semibold text-navy transition-colors hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {state === "copied" ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" />
        )}
        {state === "copied" ? "Copied" : "Copy"}
        <span className="sr-only"> email address</span>
      </button>
      <span role="status" className="sr-only">
        {state === "copied"
          ? "Email address copied."
          : state === "failed"
            ? `Copy failed. The address is ${CONTACT_EMAIL}.`
            : ""}
      </span>
    </>
  );
}

export function ContactMethods() {
  return (
    <ul className="border-t border-navy/15">
      {methods.map(({ icon: Icon, label, value, href, external, copy }) => (
        <li key={label} className="flex items-center gap-3 border-b border-navy/15">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex min-h-[64px] min-w-0 flex-1 items-center gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/20 text-teal transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal">
                {label}
              </span>
              <span className="mt-0.5 block [overflow-wrap:anywhere] font-[Montserrat] text-[17px] font-semibold text-navy group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                {value}
              </span>
            </span>
            {!copy &&
              (external ? (
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-auto h-5 w-5 shrink-0 text-teal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              ) : (
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto h-5 w-5 shrink-0 text-teal transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              ))}
            {external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
          {copy && <CopyEmail />}
        </li>
      ))}
    </ul>
  );
}
