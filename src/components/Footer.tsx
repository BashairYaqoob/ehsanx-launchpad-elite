import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { WHATSAPP_URL } from "@/lib/site";

const COL_A = [
  { to: "/", label: "Home" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/solutions", label: "Solutions" },
  { to: "/our-approach", label: "Our Approach" },
] as const;
const COL_B = [
  { to: "/client-impact", label: "Client Impact" },
  { to: "/meet-the-team", label: "Meet the Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="container-x pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={logoWhite} alt="EhsanX" width={457} height={77} loading="lazy" className="h-8 w-auto" />
            <p className="mt-6 max-w-sm text-paper/75">
              Developing People. Strengthening Institutions. Creating Meaningful Impact.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4">
            {[COL_A, COL_B].map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline text-paper/80 transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
          <div className="md:col-span-3">
            <p className="eyebrow-dark">Contact</p>
            <ul className="mt-4 space-y-3 text-paper/80">
              <li>[WhatsApp number]</li>
              <li>[email address]</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 h-px bg-gold/60" />
        <p className="mt-6 text-sm text-paper/60">© 2026 EhsanX. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EhsanX on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-paper shadow-lift transition-transform duration-300 hover:-translate-y-1"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
