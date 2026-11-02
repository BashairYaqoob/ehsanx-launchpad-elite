import type { Offering } from "@/data/solutions";

export const strandColor: Record<Offering["color"], string> = {
  navy: "#344A6A",
  teal: "#116065",
  gold: "#FAB74C",
};
// Gold is too light for text on white, so the subtitle uses navy for that strand.
const subtitleColor: Record<Offering["color"], string> = { navy: "#344A6A", teal: "#116065", gold: "#344A6A" };

function LearnLine({ text }: { text: string }) {
  const parts = text.split("→");
  return (
    <p className="mt-8 font-display text-[22px] font-semibold text-navy md:text-[28px]">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="text-gold">→</span>}
        </span>
      ))}
    </p>
  );
}

export function OfferingContent({ offering, stacked = false }: { offering: Offering; stacked?: boolean }) {
  return (
    <div>
      <div className={stacked ? "flex flex-col gap-8" : "grid grid-cols-[55fr_45fr] gap-12"}>
        <div>
          <p className="font-display text-[19px] font-medium italic md:text-[22px]" style={{ color: subtitleColor[offering.color] }}>
            {offering.subtitle}
          </p>
          {offering.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 font-sans text-[17px] leading-[1.75] text-ink">{p}</p>
          ))}
        </div>
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-navy">{offering.listLabel}</p>
          <ul className="mt-4">
            {offering.list.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-navy/15 py-3 font-sans text-[16px] leading-snug text-ink first:border-t">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-10 font-sans text-[17px] leading-[1.75] text-ink">{offering.closing}</p>
      {offering.learnLine && <LearnLine text={offering.learnLine} />}
    </div>
  );
}
