import { ArrowUpRight } from "lucide-react";
import type { CareerMilestone, Director, Founder, ProfileBlock, ProfileLink } from "@/data/team";

const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
const eyebrow = "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal md:text-[13px]";
const body = "max-w-[68ch] font-[Inter] text-[16px] leading-[1.75] text-ink md:text-[17px]";
const blockLabel = "font-[Montserrat] text-[17px] font-semibold leading-[1.4] text-navy";

function ProfileLinks({ links }: { links: ProfileLink[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1" aria-label="Professional profiles">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[14px] font-semibold text-navy underline decoration-navy/25 underline-offset-4 transition-colors hover:text-teal hover:decoration-gold"
          >
            {link.label}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Affiliations({ items }: { items: string[] }) {
  return (
    <div className="mt-7 border-y border-navy/15 py-4">
      <p className={eyebrow}>Institutional affiliations</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 font-[Inter] text-[13px] font-medium text-navy">
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeHeading({ title, index }: { title: string; index?: string }) {
  return (
    <div>
      {index && <span aria-hidden="true" className="mb-4 block font-[Montserrat] text-[13px] font-semibold tracking-[0.14em] text-teal">{index}</span>}
      <h3 className="max-w-[24ch] font-[Montserrat] text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-[1.25] text-navy">{title}</h3>
      <div aria-hidden="true" className="mt-5 h-px w-14 bg-gold" />
    </div>
  );
}

function BlockContent({ block }: { block: ProfileBlock }) {
  return (
    <div>
      <h4 className={blockLabel}>{block.label}</h4>
      {block.kind === "text" ? (
        <div className="mt-4 space-y-4">
          {block.paragraphs.map((paragraph) => <p key={paragraph} className={body}>{paragraph}</p>)}
        </div>
      ) : (
        <div className="mt-4">
          {block.intro && <p className={`${body} mb-5`}>{block.intro}</p>}
          <ul className={`grid grid-cols-1 border-t border-navy/15 ${block.columns === 2 ? "sm:grid-cols-2 sm:gap-x-8" : ""}`}>
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-navy/10 py-3 font-[Inter] text-[15px] leading-[1.6] text-ink">
                <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {block.after && <div className="mt-6 space-y-4">{block.after.map((paragraph) => <p key={paragraph} className={body}>{paragraph}</p>)}</div>}
        </div>
      )}
    </div>
  );
}

function CareerTimeline({ milestones }: { milestones: CareerMilestone[] }) {
  return (
    <ol className="mt-8 border-t border-navy/15">
      {milestones.map((milestone) => (
        <li key={`${milestone.period}-${milestone.role}`} className="grid gap-4 border-b border-navy/15 py-7 sm:grid-cols-[116px_minmax(0,1fr)] sm:gap-6">
          <p className="font-[Inter] text-[12px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-teal">{milestone.period}</p>
          <div className="min-w-0 border-l border-gold pl-5 sm:pl-6">
            <h4 className="font-[Montserrat] text-[18px] font-semibold leading-[1.45] text-navy">{milestone.role}</h4>
            <p className="mt-1.5 font-[Inter] text-[14px] font-medium leading-[1.6] text-navy/75">{milestone.institution}</p>
            <div className="mt-4 space-y-4">
              {milestone.paragraphs.map((paragraph) => <p key={paragraph} className={body}>{paragraph}</p>)}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProfilePortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="min-w-0 self-stretch">
      <div className="min-[900px]:sticky min-[900px]:top-28">
        <div className="aspect-[4/5] max-h-[calc(100dvh-9rem)] w-full max-w-[520px] overflow-hidden bg-navy/5 min-[900px]:max-w-none">
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
      </div>
    </div>
  );
}

const profileGrid = `${container} grid gap-12 min-[900px]:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] min-[900px]:gap-12 lg:gap-16`;

export function FounderProfile({ leader, portrait }: { leader: Founder; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-24 bg-wash py-20 md:py-24 lg:py-28">
      <div className={profileGrid}>
        <ProfilePortrait src={portrait} alt={leader.portraitAlt} />

        <div className="min-w-0">
          <header>
            <p className={eyebrow}>{leader.title}</p>
            <h2 id={`${leader.id}-name`} className="mt-4 font-[Montserrat] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy [text-wrap:balance]">{leader.name}</h2>
            <div aria-hidden="true" className="mt-7 h-px w-16 bg-gold" />
            <p className="mt-7 max-w-[68ch] font-[Inter] text-[18px] leading-[1.7] text-ink md:text-[19px]">{leader.overview}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Areas of expertise">
              {leader.expertise.map((item) => <li key={item} className="font-[Inter] text-[13px] font-medium text-navy">{item}</li>)}
            </ul>
            <ProfileLinks links={leader.links} />
            <Affiliations items={leader.affiliations} />
          </header>

          <div className="mt-14 border-t border-navy/15 pt-10">
            <BlockContent block={leader.credentials} />
          </div>

          <div className="mt-16 border-t border-navy/15 pt-10">
            <ThemeHeading title="Career Milestones" />
            <p className={`${eyebrow} mt-8`}>Institutional Leadership & Advisory</p>
            <CareerTimeline milestones={leader.milestones} />
          </div>

          <div className="mt-16 border-t border-navy/15 pt-10">
            <ThemeHeading title="Global Executive Education / Teaching" />
            <div className="mt-8"><BlockContent block={leader.teaching} /></div>
          </div>

          <div className="mt-16 border-t border-navy/15 pt-10">
            <ThemeHeading title="Research & Focus Areas" />
            <div className="mt-8 space-y-10">
              {leader.research.map((block) => <BlockContent key={block.label} block={block} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DirectorProfile({ leader, portrait }: { leader: Director; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-24 bg-paper py-20 md:py-24 lg:py-28">
      <div className={profileGrid}>
        <ProfilePortrait src={portrait} alt={leader.portraitAlt} />

        <div className="min-w-0">
          <header>
            <p className={eyebrow}>{leader.title}</p>
            <h2 id={`${leader.id}-name`} className="mt-4 max-w-[18ch] font-[Montserrat] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] text-navy [text-wrap:balance]">{leader.name}</h2>
            <div aria-hidden="true" className="mt-7 h-px w-16 bg-gold" />
            <p className="mt-7 max-w-[62ch] font-[Inter] text-[18px] leading-[1.7] text-ink md:text-[19px]">{leader.overview}</p>
            <ProfileLinks links={leader.links} />
            <Affiliations items={leader.affiliations} />
          </header>

          {leader.themes.map((theme, index) => (
            <div key={theme.id} className="mt-16 border-t border-navy/15 pt-10">
              <ThemeHeading title={theme.title} index={String(index + 1).padStart(2, "0")} />
              <div className="mt-8 space-y-10">
                {theme.blocks.map((block) => <BlockContent key={block.label} block={block} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
