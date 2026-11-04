import type { Leader } from "@/data/team";

const label = "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal";
const body = "max-w-[64ch] font-[Inter] text-[17px] leading-[1.7] text-ink";

type Props = { leader: Leader; portrait: string; reverse?: boolean; tone: "white" | "wash" };

export function LeaderProfile({ leader, portrait, reverse, tone }: Props) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className={`py-16 md:py-24 ${tone === "wash" ? "bg-wash" : "bg-white"}`}>
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
          <div className="lg:sticky lg:top-28">
            <img src={portrait} alt={leader.portraitAlt} width={1200} height={1500} loading="lazy" decoding="async" className="aspect-[4/5] w-full max-w-[520px] object-cover object-top" />
          </div>
        </div>
        <div className={`min-w-0 lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
          <h2 id={`${leader.id}-name`} className="font-[Montserrat] text-[clamp(1.75rem,3vw,2.6rem)] font-bold leading-[1.15] text-navy [text-wrap:balance]">{leader.name}</h2>
          <p className="mt-3 font-[Montserrat] text-[17px] font-semibold text-teal">{leader.title}</p>
          <div aria-hidden="true" className="mt-6 h-px w-16 bg-gold" />
          {leader.expertise && (
            <div className="mt-6">
              <h3 className={label}>Expertise</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {leader.expertise.map((e) => <li key={e} className="rounded-full border border-navy/20 px-4 py-1.5 font-[Inter] text-[14px] text-navy">{e}</li>)}
              </ul>
            </div>
          )}
          <p className="mt-8 font-[Inter] text-[19px] leading-[1.65] text-ink">{leader.overview}</p>
          <div className="mt-10 space-y-10">
            {leader.blocks.map((b) => (
              <div key={b.label} className="border-t border-navy/15 pt-6">
                <h3 className={label}>{b.label}</h3>
                {b.kind === "text" ? (
                  <div className="mt-4 space-y-4">{b.paragraphs.map((p) => <p key={p} className={body}>{p}</p>)}</div>
                ) : (
                  <div className="mt-4">
                    {b.intro && <p className={`${body} mb-4`}>{b.intro}</p>}
                    <ul className={`grid grid-cols-1 gap-x-8 ${b.columns === 2 ? "sm:grid-cols-2" : ""}`}>
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-3 border-b border-navy/10 py-2.5 font-[Inter] text-[16px] leading-[1.55] text-ink">
                          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-gold" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    {b.after && <div className="mt-5 space-y-4">{b.after.map((p) => <p key={p} className={body}>{p}</p>)}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
