import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProfileLink } from "@/data/team";

export const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
export const body = "max-w-[64ch] font-[Inter] text-[16px] leading-[1.75] md:text-[17px]";
export const lead =
  "font-[Montserrat] text-[clamp(1.3rem,2.4vw,1.85rem)] font-medium leading-[1.4] [text-wrap:pretty]";
export const sectionTitle =
  "font-[Montserrat] text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.015em] [text-wrap:balance]";

type Tone = "light" | "dark";

/** A section heading with a short gold rule; sentence content stays in the approved labels. */
export function SectionTitle({
  children,
  tone = "light",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span aria-hidden="true" className="block h-[3px] w-10 bg-gold" />
      <h3
        id={id}
        className={`${sectionTitle} mt-5 ${tone === "dark" ? "text-paper" : "text-navy"}`}
      >
        {children}
      </h3>
    </div>
  );
}

export function ProfileLinks({ links, tone }: { links: ProfileLink[]; tone: Tone }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Professional profiles">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[15px] font-semibold underline decoration-gold/70 underline-offset-4 transition-colors ${
              tone === "dark" ? "text-paper hover:text-gold" : "text-navy hover:text-teal"
            }`}
          >
            {link.label}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Affiliations({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <div className={`border-t pt-5 ${tone === "dark" ? "border-paper/25" : "border-navy/15"}`}>
      <h3
        className={`font-[Montserrat] text-[14px] font-semibold ${tone === "dark" ? "text-paper/75" : "text-teal"}`}
      >
        Institutional affiliations
      </h3>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-center gap-2 font-[Inter] text-[15px] font-medium ${tone === "dark" ? "text-paper" : "text-navy"}`}
          >
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The portrait in a fixed 4:5 frame so the layout holds while it loads. */
export function Portrait({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`aspect-[4/5] overflow-hidden rounded-[20px] bg-navy/10 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={1500}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
