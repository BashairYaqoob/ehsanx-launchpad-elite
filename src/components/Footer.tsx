import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png";
import { WHATSAPP_CONVERSATION_URL } from "@/lib/hero-controls";

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
              Entrepreneurial Leadership. Innovation. Institutional Transformation.
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
            <h2 className="font-display text-xl font-semibold">Get in Touch</h2>
            <p className="mt-4 text-paper/80">Let's begin a conversation about developing your people and transforming your organization.</p>
            <ul className="mt-4 space-y-3 text-paper/80">
              <li><a className="inline-flex min-h-11 items-center link-underline" href="https://wa.me/923018226596" target="_blank" rel="noopener noreferrer">+92 301 822 6596</a></li>
              <li><a className="inline-flex min-h-11 items-center break-all link-underline" href="mailto:ehsanx.transform@gmail.com">ehsanx.transform@gmail.com</a></li>
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
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry?.isIntersecting ?? false));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return (
    <a
      href={WHATSAPP_CONVERSATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EhsanX on WhatsApp"
      className={`eh-whatsapp fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-paper shadow-lift transition-transform duration-300 hover:-translate-y-1 ${footerVisible ? "eh-whatsapp-footer" : ""}`}
      title="Chat with EhsanX on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.47 0 .11 5.36.1 11.95c0 2.11.55 4.17 1.6 6L0 24l6.18-1.62a11.9 11.9 0 0 0 5.88 1.5h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.5-8.45ZM12.06 21.86a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.67.96.98-3.58-.24-.37a9.88 9.88 0 0 1-1.52-5.33c0-5.48 4.46-9.93 9.95-9.93a9.87 9.87 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.91 7.02c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
    </a>
  );
}
