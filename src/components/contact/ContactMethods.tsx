import { Globe, Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, MAILTO_URL, WHATSAPP_CONVERSATION_URL } from "@/lib/contact";

const methods = [
  { icon: MessageCircle, label: "WhatsApp", value: CONTACT_PHONE_DISPLAY, href: WHATSAPP_CONVERSATION_URL, external: true },
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: MAILTO_URL, external: false },
  { icon: Globe, label: "Website", value: "www.ehsanx.com", href: "https://www.ehsanx.com", external: true },
];

export function ContactMethods() {
  return (
    <ul className="border-t border-navy/15">
      {methods.map(({ icon: Icon, label, value, href, external }) => (
        <li key={label} className="border-b border-navy/15">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex min-h-[64px] items-center gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/20 text-teal transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal">{label}</span>
              <span className="mt-0.5 block break-words font-[Montserrat] text-[17px] font-semibold text-navy group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{value}</span>
            </span>
            {external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
