import { ArrowUpRight } from "lucide-react";
import { degreeName, type Director } from "@/data/team";
import { Affiliations, Portrait, ProfileLinks, SectionTitle, body, container, lead } from "./parts";

/**
 * Dr Ambreen's profile is organised around what she builds rather than a chronology: her role and
 * learning design practice first, then the breadth of organisations she has designed and delivered
 * programmes for, the ventures she founded, and the academic and practical expertise behind them.
 */
export function DirectorProfile({ leader, portrait }: { leader: Director; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-20">
      <Opener leader={leader} portrait={portrait} />
      <Practice leader={leader} />
      <Engagements leader={leader} />
      <Ventures leader={leader} />
      <Foundations leader={leader} />
    </section>
  );
}

function Opener({ leader, portrait }: { leader: Director; portrait: string }) {
  return (
    <div className="border-t-[6px] border-teal bg-teal-wash">
      <div className={`${container} py-16 md:py-24`}>
        {/* Portrait on the right, mirroring the founder's profile so the two read as a pair. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <header className="min-w-0 lg:order-1">
            <p className="font-[Montserrat] text-[15px] font-semibold text-teal">{leader.title}</p>
            <h2
              id={`${leader.id}-name`}
              className="mt-4 max-w-[16ch] font-[Montserrat] text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.06] tracking-[-0.02em] text-navy [text-wrap:balance]"
            >
              {leader.name}
            </h2>
            <p className="mt-7 max-w-[54ch] font-[Inter] text-[17px] leading-[1.7] text-ink md:text-[19px]">
              {leader.overview}
            </p>
            <div className="mt-7">
              <ProfileLinks links={leader.links} tone="light" />
            </div>
            <div className="mt-8">
              <Affiliations items={leader.affiliations} tone="light" />
            </div>
          </header>
          <Portrait
            src={portrait}
            alt={leader.portraitAlt}
            className="order-first w-full max-w-[420px] lg:order-2 lg:max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function Practice({ leader }: { leader: Director }) {
  return (
    <div className="bg-paper py-16 md:py-24">
      <div
        className={`${container} grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16`}
      >
        <div>
          <SectionTitle>{leader.role.label}</SectionTitle>
          <p className={`${lead} mt-8 max-w-[34ch] text-navy`}>{leader.role.text}</p>
        </div>
        <div className="border-l-[3px] border-gold pl-6 md:pl-8">
          <h3 className="font-[Montserrat] text-[19px] font-bold text-navy">
            {leader.learningDesign.label}
          </h3>
          <p className={`${body} mt-4 text-ink`}>{leader.learningDesign.text}</p>
        </div>
      </div>
    </div>
  );
}

function Engagements({ leader }: { leader: Director }) {
  const { engagements } = leader;
  return (
    <div className="bg-navy py-16 text-paper md:py-24">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionTitle tone="dark">{engagements.label}</SectionTitle>
          <p className={`${body} text-paper/90`}>{engagements.intro}</p>
        </div>
        {/* The names carry the breadth, so they are set large in an even grid that scans in rows. */}
        <ul className="mt-12 grid grid-cols-1 gap-x-8 border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-5">
          {engagements.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-b border-paper/20 py-4 font-[Montserrat] text-[clamp(1.2rem,2vw,1.45rem)] font-bold leading-[1.25] md:py-5"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Ventures({ leader }: { leader: Director }) {
  const { ventures } = leader;
  return (
    <div className="bg-paper py-16 md:py-24">
      <div className={container}>
        <SectionTitle>{ventures.label}</SectionTitle>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {ventures.items.map((v) => (
            <li key={v.name} className="border-t-[3px] border-teal pt-6">
              <p className="font-[Montserrat] text-[15px] font-semibold text-teal">{v.role}</p>
              <a
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-2 block w-fit focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span className="block font-[Montserrat] text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy decoration-gold decoration-[3px] underline-offset-[6px] transition-colors group-hover:text-teal group-hover:underline [overflow-wrap:anywhere]">
                  {v.name}
                </span>
                <span className="mt-3 inline-flex min-h-11 items-center gap-2 font-[Inter] text-[15px] font-semibold text-teal underline decoration-gold/70 underline-offset-4">
                  {v.site}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Foundations({ leader }: { leader: Director }) {
  const { background, expertise } = leader;
  return (
    <div className="bg-teal-wash py-16 md:py-24">
      <div className={container}>
        <SectionTitle>{background.label}</SectionTitle>
        {/* Listed in the order earned, so the three steps read as a progression. */}
        <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {background.degrees.map((d) => (
            <li key={d.level} className="bg-paper p-6 md:p-7">
              <p
                aria-hidden="true"
                className="font-[Montserrat] text-[clamp(2.4rem,4vw,3.25rem)] font-bold leading-none text-teal"
              >
                {d.level}
              </p>
              <p className="mt-5 font-[Montserrat] text-[17px] font-semibold leading-[1.4] text-navy">
                <span className="sr-only">{degreeName(d)}</span>
                <span aria-hidden="true">in {d.field}</span>
              </p>
              <p className="mt-2 font-[Inter] text-[15px] leading-[1.55] text-ink/80">
                {d.institution}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-8 border-t border-navy/15 pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h3 className="font-[Montserrat] text-[clamp(1.35rem,2.2vw,1.75rem)] font-bold text-navy">
            {expertise.label}
          </h3>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {expertise.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-navy/15 py-3.5 font-[Inter] text-[16px] leading-[1.5] text-ink md:text-[17px]"
              >
                <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
