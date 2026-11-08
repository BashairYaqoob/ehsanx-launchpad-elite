import type { MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import kfcLogo from "@/assets/impact/kfc-logo.png";
import pciLogo from "@/assets/impact/pci-logo.png";
import ajLogo from "@/assets/impact/aj-logo.webp";
import { engagementIndex } from "@/data/clientImpact";
import { container, eyebrow } from "./CaseStudyParts";

const logos = {
  kfc: { src: kfcLogo, w: 1983, h: 2000, cls: "h-14" },
  pci: { src: pciLogo, w: 246, h: 67, cls: "h-auto max-h-8 max-w-full" },
  aj: { src: ajLogo, w: 690, h: 362, cls: "h-auto max-h-12 max-w-full" },
} as const;

export function EngagementIndex() {
  const reduce = useReducedMotion();
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };
  return (
    <nav aria-label="Client engagements" className="border-b border-navy/10 bg-white">
      <div className={`${container} py-10 md:py-12`}>
        <p className={eyebrow}>Engagement Index</p>
        <ol className="mt-6 grid grid-cols-1 border-t border-navy/15 md:grid-cols-3">
          {engagementIndex.map((item, i) => {
            const logo = logos[item.logo];
            return (
              <li key={item.id} className="border-b border-navy/15 md:border-b-0 md:border-r md:last:border-r-0">
                <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="group flex min-h-[44px] items-center gap-5 py-6 md:px-6 md:first:pl-0">
                  <span className="flex h-16 w-28 shrink-0 items-center justify-center">
                    <img src={logo.src} alt="" width={logo.w} height={logo.h} loading="lazy" className={`${logo.cls} w-auto object-contain`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-[Montserrat] text-[12px] font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-1 block font-[Montserrat] text-[17px] font-semibold leading-snug text-navy group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{item.name}</span>
                    <span className="mt-1 block font-[Inter] text-[14px] text-ink/75">{item.descriptor}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
