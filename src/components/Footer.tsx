import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/logo-white.png";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, MAILTO_URL, WHATSAPP_CONVERSATION_URL, WHATSAPP_URL } from "@/lib/contact";
import { scrollToTop } from "@/lib/scroll-top";
import { fabIsObstructed, nextHidden } from "@/lib/fab-avoidance";

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

export function Footer({ embedded = false }: { embedded?: boolean }) {
  return (
    <footer className={embedded ? "closing-footer [position:relative] [background:var(--closing-footer-shade)] [border-top:1px_solid_var(--gold)] [min-height:40svh] [@media(max-width:767.98px)]:[min-height:0] text-paper" : "standalone-footer [body:has(.advisory-page)_&]:[display:none] bg-navy-deep text-paper"}>
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 footer-inner [padding-block:40px_24px] [@media(max-width:767.98px)]:[padding-block:32px_24px] [.standalone-footer_&]:[padding-top:56px]">
        <div className="footer-columns [display:grid] [grid-template-columns:1fr_1.05fr_1.1fr] [gap:40px] [align-items:start] [@media(max-width:767.98px)]:[grid-template-columns:1fr] [@media(min-width:768px)_and_(max-width:1023.98px)]:[grid-template-columns:1fr_1fr] [@media(max-width:767.98px)]:[gap:28px] [@media(min-width:768px)_and_(max-width:1023.98px)]:[gap:24px] [&_p]:[font-size:14px] [&_p]:[line-height:1.6] [&>*]:min-w-0">
          <div className="footer-brand [@media(max-width:767.98px)]:[&_p]:[margin-top:16px]">
            <img src={logoWhite} alt="EhsanX" width={457} height={77} loading="lazy" className="h-8 w-auto" />
            <p className="mt-6 max-w-sm text-paper/75">
              Entrepreneurial Leadership. Innovation. Institutional Transformation.
            </p>
          </div>
          <nav aria-label="Footer" className="footer-links [&_a]:[font-size:13px] [&_a]:[display:inline-flex] [&_a]:[align-items:center] [&_a]:[min-height:44px] grid grid-cols-2 gap-8">
            {[COL_A, COL_B].map((col, i) => (
              <ul key={i} className="space-y-3 [.footer-links_&]:[display:grid] [.footer-links_&]:[gap:0]">
                {col.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[left:0] [&::after]:[right:0] [&::after]:[bottom:-6px] [&::after]:[height:2px] [&::after]:[background:var(--gold)] [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:left] [&::after]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [&:hover::after]:[transform:scaleX(1)] [&[data-status='active']::after]:[transform:scaleX(1)] [position:relative] text-paper/80 transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
          <div className="footer-contact [&_a]:[gap:10px] [&_a]:[font-size:13px] [&_a_svg]:[flex-shrink:0] [@media(max-width:767.98px)]:[grid-column:auto] [@media(min-width:768px)_and_(max-width:1023.98px)]:[grid-column:1/-1] [@media(max-width:767.98px)]:[&_p]:[margin-top:12px] max-xl:[&_a]:!inline-grid max-xl:[&_a]:!grid-cols-[16px_minmax(0,1fr)] max-xl:[&_a]:!break-all">
            <h2 className="font-display text-xl font-semibold">Get in Touch</h2>
            <p className="mt-4 text-paper/80">Let’s begin a conversation about developing your people and transforming your organization.</p>
            <ul className="mt-4 space-y-3 [.footer-links_&]:[display:grid] [.footer-links_&]:[gap:0] text-paper/80">
              <li><a className="inline-flex min-h-11 items-center link-underline [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[left:0] [&::after]:[right:0] [&::after]:[bottom:-6px] [&::after]:[height:2px] [&::after]:[background:var(--gold)] [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:left] [&::after]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [&:hover::after]:[transform:scaleX(1)] [&[data-status='active']::after]:[transform:scaleX(1)] [position:relative]" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />{CONTACT_PHONE_DISPLAY}</a></li>
              <li><a className="inline-flex min-h-11 items-center break-all link-underline [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[left:0] [&::after]:[right:0] [&::after]:[bottom:-6px] [&::after]:[height:2px] [&::after]:[background:var(--gold)] [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:left] [&::after]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [&:hover::after]:[transform:scaleX(1)] [&[data-status='active']::after]:[transform:scaleX(1)] [position:relative]" href={MAILTO_URL}><Mail size={16} aria-hidden="true" />{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom [display:flex] [justify-content:space-between] [align-items:center] [gap:24px] [margin-top:24px] [@media(max-width:767.98px)]:[gap:12px] [@media(max-width:767.98px)]:[margin-top:28px] [@media(max-width:767.98px)]:[flex-wrap:wrap] max-sm:!grid max-sm:!grid-cols-[minmax(0,1fr)_auto]"><p className="text-sm text-paper/60">© 2026 EhsanX. All rights reserved.</p><Button variant="ghost" className="back-to-top [color:var(--paper)] [background:transparent] [&:hover]:[color:var(--paper)] [&:hover]:[background:transparent]" onClick={scrollToTop}>Back to top<ArrowUp size={16} aria-hidden="true" /></Button></div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const fab = ref.current;
    if (!fab) return;
    let frame = 0;
    let raf = 0;
    let lastRun = 0;
    let isHidden = false;
    let clearSince: number | null = null;
    const evaluate = () => {
      frame = 0;
      lastRun = performance.now();
      // Never pull the button away from a keyboard user who is on it.
      const blocked = document.activeElement !== fab && fabIsObstructed(fab);
      const next = nextHidden({ hidden: isHidden, blocked, clearSince, now: lastRun, delay: 300 });
      clearSince = next.clearSince;
      if (next.hidden !== isHidden) {
        isHidden = next.hidden;
        setHidden(next.hidden);
      }
    };
    // At most every 100ms while scrolling, plus a slow poll for content that moves on its own
    // (slideshow text, pinned scenes settling, the reveal-after-clear delay).
    const schedule = () => {
      if (frame) return;
      const wait = Math.max(0, 100 - (performance.now() - lastRun));
      frame = window.setTimeout(() => {
        raf = requestAnimationFrame(evaluate);
      }, wait);
    };
    const poll = window.setInterval(schedule, 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.clearTimeout(frame);
      cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <a
      ref={ref}
      href={WHATSAPP_CONVERSATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EhsanX on WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      data-hidden={hidden}
      // One position rule: a 16px inset (24px from 768px), never inside the device safe area.
      // It steps aside (fade, no clicks) while a control or text sits beneath it.
      className="eh-whatsapp fixed z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-paper shadow-lift [--fab-inset:16px] md:[--fab-inset:24px] [right:max(var(--fab-inset),env(safe-area-inset-right))] [bottom:max(var(--fab-inset),env(safe-area-inset-bottom))] [box-shadow:var(--shadow-lift)] transition-[opacity,translate] duration-300 hover:-translate-y-1 xl:h-14 xl:w-14 data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-2 data-[hidden=true]:opacity-0 motion-reduce:transition-none"
      title="Chat with EhsanX on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.47 0 .11 5.36.1 11.95c0 2.11.55 4.17 1.6 6L0 24l6.18-1.62a11.9 11.9 0 0 0 5.88 1.5h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.5-8.45ZM12.06 21.86a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.67.96.98-3.58-.24-.37a9.88 9.88 0 0 1-1.52-5.33c0-5.48 4.46-9.93 9.95-9.93a9.87 9.87 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.91 7.02c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
    </a>
  );
}
