import type { ReactNode } from "react";

export const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
export const eyebrow =
  "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal md:text-[13px]";

// Type for the case study spreads. Sizes in the horizontal mode also follow the window height, so a
// panel's content fits between the navigation pill above and the chapter guide below.
export const caseTitle =
  "font-[Montserrat] text-[clamp(2.1rem,6.5vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.015em] [text-wrap:balance] hz:text-[min(4.4vw,8.4vh)]";
export const lead =
  "font-[Montserrat] text-[clamp(1.3rem,3.6vw,1.75rem)] font-medium leading-[1.35] [text-wrap:pretty] hz:text-[clamp(18px,min(1.9vw,3.6vh),28px)]";
export const body =
  "max-w-[60ch] font-[Inter] text-[17px] leading-[1.7] hz:text-[clamp(15px,min(1.2vw,2.3vh),19px)]";
export const quote =
  "font-[Montserrat] text-[clamp(1.5rem,4.4vw,2.6rem)] font-semibold leading-[1.25] [text-wrap:pretty] hz:text-[min(2.6vw,5vh)]";

/** Names a part of the story (challenge, programme, impact). Sentence case, with a short gold rule. */
export function Kicker({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "paper";
}) {
  return (
    <p
      className={`flex items-center gap-3 font-[Montserrat] text-[14px] font-semibold ${tone === "paper" ? "text-paper" : "text-teal"}`}
    >
      <span aria-hidden="true" className="h-[2px] w-8 bg-gold" />
      {children}
    </p>
  );
}

/** Client name and programme type, above each case title. */
export function CaseMeta({ name, kind }: { name: string; kind: string }) {
  return (
    <p className="font-[Montserrat] text-[15px] font-semibold text-navy">
      {name}
      <span className="mt-1 block font-[Inter] text-[14px] font-normal text-ink/70">{kind}</span>
    </p>
  );
}

/** A plain list with gold lead-in rules. */
export function RuleList({
  items,
  tone = "ink",
}: {
  items: readonly string[];
  tone?: "ink" | "paper";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 font-[Inter] text-[16px] leading-[1.55] hz:text-[clamp(14px,min(1.15vw,2.2vh),18px)] ${tone === "paper" ? "text-paper/90" : "text-ink"}`}
        >
          <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Learning areas as a two-column grid of ruled rows; the heading carries the count. */
export function AreaGrid({ items, columns = 2 }: { items: readonly string[]; columns?: 1 | 2 }) {
  return (
    <ul
      className={`grid grid-cols-1 border-t border-navy/15 ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-8" : ""}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-navy/15 py-3 font-[Montserrat] text-[16px] font-semibold leading-[1.35] text-navy hz:py-[1.4vh] hz:text-[clamp(14px,min(1.15vw,2.2vh),18px)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
