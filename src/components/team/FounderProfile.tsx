import type { Founder } from "@/data/team";
import { Affiliations, Portrait, ProfileLinks, SectionTitle, body, container, lead } from "./parts";

/**
 * Dr Shahid's profile reads as a career arc: the opener with the facts that establish him, the
 * career as a real timeline, the credentials behind it, the international teaching, then the
 * corporate and research work and what he brings to EhsanX clients.
 */
export function FounderProfile({ leader, portrait }: { leader: Founder; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-20">
      <Opener leader={leader} portrait={portrait} />
      <Career leader={leader} />
      <Credentials leader={leader} />
      <Teaching leader={leader} />
      <CorporateAndResearch leader={leader} />
      <FocusAreas leader={leader} />
    </section>
  );
}

function Opener({ leader, portrait }: { leader: Founder; portrait: string }) {
  return (
    <div className="bg-paper text-navy">
      <div className={`${container} pb-14 pt-16 md:pb-16 md:pt-24`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16">
          <Portrait
            src={portrait}
            alt={leader.portraitAlt}
            className="w-full max-w-[420px] lg:max-w-none"
          />
          <header className="min-w-0 lg:pb-2">
            <p className="font-[Montserrat] text-[15px] font-semibold text-teal">{leader.title}</p>
            <h2
              id={`${leader.id}-name`}
              className="mt-4 font-[Montserrat] text-[clamp(2.1rem,4.4vw,3.75rem)] font-bold leading-[1.06] tracking-[-0.02em] [text-wrap:balance]"
            >
              {leader.name}
            </h2>
            <p className="mt-7 max-w-[56ch] font-[Inter] text-[17px] leading-[1.7] text-ink md:text-[19px]">
              {leader.overview}
            </p>
            <ul
              aria-label="Areas of expertise"
              className="mt-7 flex flex-wrap gap-x-2 gap-y-2 font-[Montserrat] text-[15px] font-semibold text-navy"
            >
              {leader.expertise.map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />}
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ProfileLinks links={leader.links} tone="light" />
            </div>
          </header>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-navy/15 pt-8 md:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {leader.highlights.map((h) => (
            <div key={h.value} className="flex min-w-0 flex-col-reverse justify-end gap-2">
              <dt className="font-[Inter] text-[14px] leading-[1.5] text-ink/80 md:text-[15px]">
                {h.label}
              </dt>
              <dd className="font-[Montserrat] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-none tracking-[-0.02em] text-teal">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Affiliations items={leader.affiliations} tone="light" />
        </div>
      </div>
    </div>
  );
}

function Career({ leader }: { leader: Founder }) {
  return (
    <div className="bg-teal-wash py-16 md:py-24">
      <div
        className={`${container} grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle>Career Milestones</SectionTitle>
          <p className={`${body} mt-5 text-ink/80`}>Institutional Leadership & Advisory</p>
        </div>
        {/* Chronological, so a timeline: one line with a stop for each appointment. */}
        <ol className="relative border-l-2 border-navy/15 pl-7 md:pl-10">
          {leader.milestones.map((m) => (
            <li key={m.role} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-[3px] border-teal-wash bg-teal md:-left-[49px]"
              />
              <p className="font-[Montserrat] text-[15px] font-semibold text-teal">{m.period}</p>
              <h4 className="mt-2 font-[Montserrat] text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-[1.3] text-navy">
                {m.role}
              </h4>
              <p className="mt-1 font-[Inter] text-[15px] font-medium text-navy/75">
                {m.institution}
              </p>
              <div className="mt-4 space-y-4">
                {m.paragraphs.map((p) => (
                  <p key={p} className={`${body} text-ink`}>
                    {p}
                  </p>
                ))}
              </div>
              {m.award && (
                <div className="mt-6 max-w-[64ch] border-l-[3px] border-gold bg-gold/15 px-5 py-4 md:px-6">
                  <p className="font-[Montserrat] text-[14px] font-semibold text-navy">
                    {m.award.period}
                  </p>
                  <h5 className="mt-1 font-[Montserrat] text-[17px] font-bold leading-[1.35] text-navy">
                    {m.award.title}
                  </h5>
                  <p className="mt-2 font-[Inter] text-[15px] leading-[1.65] text-ink">
                    {m.award.text}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Credentials({ leader }: { leader: Founder }) {
  const { credentials } = leader;
  return (
    <div className="bg-paper py-16 md:py-24">
      <div className={container}>
        <SectionTitle>{credentials.label}</SectionTitle>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          {/* Highest degree first, as in the biography; the level is set large so the ladder scans. */}
          <ul className="border-t border-navy/15">
            {credentials.degrees.map((d) => (
              <li
                key={d.level}
                className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-navy/15 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)] md:py-6"
              >
                <span
                  aria-hidden="true"
                  className="font-[Montserrat] text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-none text-teal"
                >
                  {d.level}
                </span>
                <div>
                  <p className="font-[Montserrat] text-[17px] font-semibold leading-[1.4] text-navy md:text-[19px]">
                    <span className="sr-only">{d.level} </span>
                    {d.field ? `in ${d.field}` : d.institution}
                  </p>
                  {d.field && (
                    <p className="mt-1 font-[Inter] text-[15px] leading-[1.55] text-ink/80">
                      {d.institution}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h4 className="font-[Montserrat] text-[17px] font-semibold text-navy">
              Distinctions and professional development
            </h4>
            <ul className="mt-5 space-y-4">
              {credentials.distinctions.map((item) => (
                <li
                  key={item}
                  className="border-l-[3px] border-gold bg-teal-wash px-5 py-4 font-[Inter] text-[16px] leading-[1.6] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Teaching({ leader }: { leader: Founder }) {
  const { teaching } = leader;
  return (
    <div className="bg-navy-deep py-16 text-paper md:py-24">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-16">
          <SectionTitle tone="dark">{teaching.label}</SectionTitle>
          <p className={`${body} text-paper/90`}>{teaching.intro}</p>
        </div>
        <div className="mt-12 grid gap-10 border-t border-paper/20 pt-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          {teaching.regions.map((r) => (
            <div key={r.region}>
              <h4 className="font-[Montserrat] text-[14px] font-semibold text-gold">{r.region}</h4>
              <ul className="mt-4 space-y-3">
                {r.institutions.map((inst) => (
                  <li
                    key={inst}
                    className="font-[Montserrat] text-[clamp(1.1rem,1.6vw,1.35rem)] font-semibold leading-[1.3] text-paper"
                  >
                    {inst}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 border-t border-paper/20 pt-10 md:grid-cols-2 md:gap-12">
          <p className={`${body} text-paper/90`}>{teaching.areas}</p>
          <p className={`${body} text-paper/90`}>{teaching.executive}</p>
        </div>
      </div>
    </div>
  );
}

function CorporateAndResearch({ leader }: { leader: Founder }) {
  return (
    <div className="bg-paper py-16 md:py-24">
      <div
        className={`${container} grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16`}
      >
        <div>
          <SectionTitle>{leader.corporate.label}</SectionTitle>
          <p className={`${lead} mt-8 max-w-[40ch] text-navy`}>{leader.corporate.paragraphs[0]}</p>
          <p className={`${body} mt-6 text-ink`}>{leader.corporate.paragraphs[1]}</p>
        </div>
        <div className="lg:border-l lg:border-navy/15 lg:pl-12">
          <h3 className="font-[Montserrat] text-[19px] font-bold leading-[1.35] text-navy">
            {leader.research.label}
          </h3>
          <p className={`${body} mt-4 text-ink`}>{leader.research.text}</p>
        </div>
      </div>
    </div>
  );
}

function FocusAreas({ leader }: { leader: Founder }) {
  return (
    <div className="bg-teal py-16 text-paper md:py-20">
      <div
        className={`${container} grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16`}
      >
        <SectionTitle tone="dark">{leader.focusAreas.label}</SectionTitle>
        <ul className="border-t border-paper/25">
          {leader.focusAreas.items.map((item) => (
            <li
              key={item}
              className="border-b border-paper/25 py-4 font-[Montserrat] text-[clamp(1.2rem,2.2vw,1.7rem)] font-semibold leading-[1.3]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
