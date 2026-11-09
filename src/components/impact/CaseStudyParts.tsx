import type { ReactNode } from "react";
import type { Metric } from "@/data/clientImpact";

export const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
export const eyebrow = "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal md:text-[13px]";
export const h2 = "font-[Montserrat] text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.15] text-navy [text-wrap:balance]";
export const label = "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-navy";
export const body = "max-w-[62ch] font-[Inter] text-[17px] leading-[1.7] text-ink";

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-navy/15 pt-6">
      <h3 className={label}>{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 border-b border-navy/10 py-3.5">
          <span className="w-7 shrink-0 font-[Montserrat] text-[15px] font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-[Inter] text-[16px] leading-[1.5] text-ink">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-[Inter] text-[16px] leading-[1.6] text-ink">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A figure reads as a numeral only when it is one; descriptive values (an industry, an approach) are set smaller. */
const isFigure = (value: string) => /^[~≈]?\d/.test(value);

/** Impact snapshot as a full-width colour band: amber numerals on navy or teal. */
export function Metrics({ items, caption, tone = "navy" }: { items: Metric[]; caption: string; tone?: "navy" | "teal" }) {
  return (
    <div className={tone === "teal" ? "bg-teal text-paper" : "bg-navy text-paper"}>
      <div className={`${container} py-12 md:py-16`}>
        <h3 className="flex items-center gap-3 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-paper md:text-[13px]">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {caption}
        </h3>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          {items.map((m) => (
            <div key={m.label} className="flex min-w-0 flex-col-reverse justify-end gap-3 border-t border-paper/25 pt-5">
              <dt className="font-[Inter] text-[15px] leading-[1.45] text-paper/90">
                {m.label}
                {m.note && <span className="mt-1.5 block text-[13px] leading-[1.45] text-paper/75">{m.note}</span>}
              </dt>
              <dd
                className={
                  isFigure(m.value)
                    ? "font-[Montserrat] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-gold"
                    : "font-[Montserrat] text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-[1.15] text-paper [overflow-wrap:anywhere]"
                }
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function Takeaway({ labelText, text }: { labelText: string; text: string }) {
  return (
    <figure className="border-l-2 border-gold pl-6 md:pl-8">
      <figcaption className={eyebrow}>{labelText}</figcaption>
      <blockquote className="mt-4 font-[Montserrat] text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-[1.4] text-navy">“{text}”</blockquote>
    </figure>
  );
}
