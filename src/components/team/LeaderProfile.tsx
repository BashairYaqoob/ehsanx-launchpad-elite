import type { ReactNode } from "react";
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
            className="group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[15px] font-semibold text-paper underline decoration-gold/70 underline-offset-4 transition-colors hover:text-gold"
          >
            {link.label}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Affiliations({ items }: { items: string[] }) {
  return (
    <div className="mt-8 border-t border-paper/25 pt-5">
      <p className="font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-paper md:text-[13px]">Institutional affiliations</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 font-[Inter] text-[14px] font-medium text-paper/90">
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type IntroProps = {
  leader: Founder | Director;
  portrait: string;
  tone: "navy" | "teal";
  expertise?: string[];
  nameClass?: string;
};

/** Profile opener on a brand-colour band: portrait beside name, role, overview and links. */
function ProfileIntro({ leader, portrait, tone, expertise, nameClass = "" }: IntroProps) {
  return (
    <div className={`${tone === "teal" ? "bg-teal" : "bg-navy"} py-16 text-paper md:py-20 lg:py-24`}>
      <div className={`${container} grid items-center gap-10 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-12 lg:gap-16`}>
        <div className="aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[20px] bg-paper/10 min-[900px]:max-w-none">
          <img src={portrait} alt={leader.portraitAlt} width={1200} height={1500} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        </div>
        <header className="min-w-0">
          <p className="flex items-center gap-3 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-paper md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
            {leader.title}
          </p>
          <h2 id={`${leader.id}-name`} className={`mt-5 font-[Montserrat] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-paper [text-wrap:balance] ${nameClass}`}>{leader.name}</h2>
          <p className="mt-7 max-w-[60ch] font-[Inter] text-[17px] leading-[1.7] text-paper/90 md:text-[19px]">{leader.overview}</p>
          {expertise && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of expertise">
              {expertise.map((item) => <li key={item} className="rounded-full border border-paper/30 px-3.5 py-1.5 font-[Inter] text-[13px] font-medium text-paper">{item}</li>)}
            </ul>
          )}
          <ProfileLinks links={leader.links} />
          <Affiliations items={leader.affiliations} />
        </header>
      </div>
    </div>
  );
}

function ThemeHeading({ title, index }: { title: string; index: string }) {
  return (
    <div className="min-[900px]:sticky min-[900px]:top-28">
      <span aria-hidden="true" className="block font-[Montserrat] text-[40px] font-bold leading-none text-gold md:text-[48px]">{index}</span>
      <h3 className="mt-4 max-w-[18ch] font-[Montserrat] text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-[1.25] text-navy">{title}</h3>
    </div>
  );
}

/** One chapter of a profile: numbered heading on the left, the detail on the right. */
function Chapter({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  return (
    <div className="grid gap-8 border-t border-navy/15 py-12 first:border-t-0 first:pt-0 last:pb-0 md:py-14 min-[900px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] min-[900px]:gap-12 lg:gap-16">
      <ThemeHeading title={title} index={String(index).padStart(2, "0")} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function BlockContent({ block, hideLabel = false }: { block: ProfileBlock; hideLabel?: boolean }) {
  return (
    <div>
      {!hideLabel && <h4 className={blockLabel}>{block.label}</h4>}
      {block.kind === "text" ? (
        <div className={hideLabel ? "space-y-4" : "mt-4 space-y-4"}>
          {block.paragraphs.map((paragraph) => <p key={paragraph} className={body}>{paragraph}</p>)}
        </div>
      ) : (
        <div className={hideLabel ? "" : "mt-4"}>
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

export function FounderProfile({ leader, portrait }: { leader: Founder; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-20">
      <ProfileIntro leader={leader} portrait={portrait} tone="navy" expertise={leader.expertise} />
      <div className="bg-paper py-16 md:py-24">
        <div className={container}>
          <Chapter title={leader.credentials.label} index={1}>
            <BlockContent block={leader.credentials} hideLabel />
          </Chapter>
          <Chapter title="Career Milestones" index={2}>
            <p className={eyebrow}>Institutional Leadership & Advisory</p>
            <CareerTimeline milestones={leader.milestones} />
          </Chapter>
          <Chapter title="Global Executive Education / Teaching" index={3}>
            <BlockContent block={leader.teaching} />
          </Chapter>
          <Chapter title="Research & Focus Areas" index={4}>
            <div className="space-y-10">
              {leader.research.map((block) => <BlockContent key={block.label} block={block} />)}
            </div>
          </Chapter>
        </div>
      </div>
    </section>
  );
}

export function DirectorProfile({ leader, portrait }: { leader: Director; portrait: string }) {
  return (
    <section id={leader.id} aria-labelledby={`${leader.id}-name`} className="scroll-mt-20">
      <ProfileIntro leader={leader} portrait={portrait} tone="teal" nameClass="max-w-[18ch]" />
      <div className="bg-paper py-16 md:py-24">
        <div className={container}>
          {leader.themes.map((theme, index) => (
            <Chapter key={theme.id} title={theme.title} index={index + 1}>
              <div className="space-y-10">
                {theme.blocks.map((block) => <BlockContent key={block.label} block={block} />)}
              </div>
            </Chapter>
          ))}
        </div>
      </div>
    </section>
  );
}
