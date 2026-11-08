// Philosophy — "What does EhsanX believe, and why?"
// Navy, typographic and editorial: no photography. Content comes from src/data/philosophy.ts unchanged.
import {
  ArrowDown,
  ArrowRight,
  BrainCog,
  ChartNoAxesCombined,
  Compass,
  Diamond,
  Earth,
  HandHeart,
  Landmark,
  Lightbulb,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { FinalCta } from "@/components/home/FounderAndCta";
import { container, Eyebrow, Reveal } from "@/components/advisory/PagePrimitives";
import { philosophy, type Foundation } from "@/data/philosophy";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  BrainCog,
  ChartNoAxesCombined,
  Compass,
  Diamond,
  Earth,
  HandHeart,
  Landmark,
  Lightbulb,
  Users,
  UsersRound,
};

function Hero() {
  const { hero, heroLine, sections } = philosophy;
  return (
    <section className="relative overflow-hidden bg-navy-deep text-paper">
      <div
        className={cn(
          container,
          "relative grid gap-14 pb-20 pt-36 md:pb-24 md:pt-44 lg:grid-cols-12 lg:items-end lg:gap-16",
        )}
      >
        <div className="lg:col-span-7">
          <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
          <h1 className="mt-7 font-display text-[clamp(2.75rem,6.2vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.015em] text-paper">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-[30ch] font-display text-[clamp(1.25rem,2.1vw,1.75rem)] font-light leading-[1.45] text-paper/90">
            {heroLine}
          </p>
        </div>
        <div className="lg:col-span-5">
          <nav aria-label="On this page">
            <ol className="border-t border-paper/15">
              {sections.map((s, i) => (
                <li key={s.id} className="border-b border-paper/15">
                  <a
                    href={`#${s.id}`}
                    className="group flex min-h-14 items-center gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <span className="w-6 font-display text-sm font-semibold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[17px] font-medium text-paper/90 transition-colors group-hover:text-paper">
                      {s.label}
                    </span>
                    <ArrowDown
                      aria-hidden="true"
                      className="ml-auto h-4 w-4 text-paper/40 transition-transform group-hover:translate-y-0.5 group-hover:text-gold motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

function Idea() {
  const { intro } = philosophy;
  const [first, second, conclusion] = intro.paragraphs;
  return (
    <section
      id="idea"
      aria-labelledby="idea-title"
      className="scroll-mt-24 bg-paper py-24 md:py-32"
    >
      <div className={cn(container, "grid gap-12 lg:grid-cols-12 lg:gap-16")}>
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2
              id="idea-title"
              className="mt-6 font-display text-[clamp(1.875rem,3vw,2.5rem)] font-bold leading-[1.15] text-navy [text-wrap:balance]"
            >
              {intro.title}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,2.7vw,2.25rem)] font-light leading-[1.35] text-navy [text-wrap:pretty]">
              {intro.pullSentence}
            </p>
          </Reveal>
          <Reveal className="mt-12 grid gap-8 border-t border-navy/10 pt-12 md:grid-cols-2 md:gap-12">
            <p className="text-[17px] leading-[1.75] text-ink/85">{first}</p>
            <p className="text-[17px] leading-[1.75] text-ink/85">{second}</p>
          </Reveal>
          <Reveal>
            <p className="mt-12 border-l-2 border-gold pl-6 font-display text-[clamp(1.125rem,1.6vw,1.3125rem)] font-medium leading-[1.6] text-navy md:pl-8">
              {conclusion}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FoundationBlock({ item, className }: { item: Foundation; className?: string }) {
  const Icon = icons[item.icon] ?? Compass;
  return (
    <article className={cn("border-t border-paper/20 pt-6", className)}>
      <div className="flex items-center gap-3">
        <Icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 shrink-0 text-gold" />
        <h3 className="font-display text-[19px] font-semibold leading-snug text-paper">
          {item.title}
        </h3>
      </div>
      <p className="mt-4 text-[15.5px] leading-[1.7] text-paper/85">{item.role}</p>
      <ul className="mt-5 space-y-2">
        {item.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[15px] leading-[1.55] text-paper/80">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
            {b}
          </li>
        ))}
      </ul>
      <p className="sr-only">
        {philosophy.model.feedLabel} {item.feedsInto}
      </p>
    </article>
  );
}

/** Flow arrow between columns: points down when stacked, right from the large breakpoint. */
function FlowArrow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center py-4 text-gold/80 lg:py-0", className)}
    >
      <ArrowRight strokeWidth={1.5} className="h-6 w-6 rotate-90 lg:rotate-0" />
    </div>
  );
}

function Model() {
  const { model } = philosophy;
  const by = (id: string) => model.foundations.find((f) => f.id === id) as Foundation;
  const outcome = by("outcome");
  const OutcomeIcon = icons[outcome.icon] ?? HandHeart;
  return (
    <section
      id="model"
      aria-labelledby="model-title"
      className="scroll-mt-24 bg-navy py-24 text-paper md:py-32"
    >
      <div className={container}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow tone="dark">{model.eyebrow}</Eyebrow>
            <h2
              id="model-title"
              className="mt-6 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] text-paper"
            >
              {model.title}
            </h2>
          </div>
          <p className="max-w-[46ch] text-[17px] leading-[1.7] text-paper/85 lg:col-span-5 lg:col-start-8">
            {model.intro}
          </p>
        </Reveal>

        {/* Two foundation flows converge on one outcome (as in the Company Profile's model diagram). */}
        <Reveal className="mt-16 grid lg:mt-20 lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_56px_minmax(0,1.15fr)] lg:grid-rows-[auto_auto] lg:gap-y-14">
          <FoundationBlock item={by("meaning")} className="lg:col-start-1 lg:row-start-1" />
          <FlowArrow className="lg:col-start-2 lg:row-start-1" />
          <FoundationBlock item={by("character")} className="lg:col-start-3 lg:row-start-1" />
          <FlowArrow className="hidden lg:col-start-4 lg:row-start-1 lg:flex" />
          <FoundationBlock
            item={by("people")}
            className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-0"
          />
          <FlowArrow className="lg:col-start-2 lg:row-start-2" />
          <FoundationBlock item={by("entrepreneurial")} className="lg:col-start-3 lg:row-start-2" />
          <FlowArrow className="hidden lg:col-start-4 lg:row-start-2 lg:flex" />
          <FlowArrow className="lg:hidden" />
          <article className="flex flex-col border-t-2 border-gold bg-navy-deep p-7 md:p-9 lg:col-start-5 lg:row-span-2 lg:row-start-1">
            <div className="flex items-center gap-3">
              <OutcomeIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-7 w-7 shrink-0 text-gold"
              />
              <h3 className="font-display text-[22px] font-bold leading-snug text-paper">
                {outcome.title}
              </h3>
            </div>
            <p className="mt-5 text-[16px] leading-[1.7] text-paper/90">{outcome.role}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {outcome.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-[1.55] text-paper/85">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#journey"
              className="group mt-8 flex items-center gap-3 border-t border-paper/15 pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:mt-auto"
            >
              <span className="shrink-0 whitespace-nowrap font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                {model.outcomeLabel.replace(":", "")}
              </span>
              <span className="font-display text-[16px] font-semibold text-paper">
                {outcome.feedsInto}
              </span>
              <ArrowDown
                aria-hidden="true"
                className="ml-auto h-4 w-4 text-gold transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Journey() {
  const { journey, stages, tagline } = philosophy;
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="scroll-mt-24 bg-paper py-24 md:py-32"
    >
      <div className={container}>
        <Reveal>
          <Eyebrow>{journey.eyebrow}</Eyebrow>
          <h2
            id="journey-title"
            className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] text-navy"
          >
            {journey.title}
          </h2>
        </Reveal>
        <Reveal className="relative mt-16">
          {/* Connecting line: horizontal from md, vertical when stacked. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[27px] top-6 w-px bg-navy/15 md:bottom-auto md:left-0 md:right-0 md:top-[94px] md:h-px md:w-auto"
          />
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {stages.map((s, i) => {
              const Icon = icons[s.icon] ?? UsersRound;
              const last = i === stages.length - 1;
              return (
                <li key={s.number} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 md:block">
                  <div className="flex flex-col items-center md:items-start">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-[44px] font-light leading-none md:text-[64px]",
                        last ? "text-teal" : "text-navy",
                      )}
                    >
                      {s.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-4 h-3.5 w-3.5 rounded-full ring-[6px] ring-paper md:mt-[18px]",
                        last ? "bg-gold" : "bg-navy",
                      )}
                    />
                  </div>
                  <div className="md:mt-8">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn("h-6 w-6", last ? "text-teal" : "text-navy/70")}
                    />
                    <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-[1.65] text-ink/80">{s.descriptor}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal className="mt-20 flex items-center gap-5 md:gap-8">
          <span aria-hidden="true" className="h-px flex-1 bg-navy/20" />
          <p className="text-center font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-light text-navy [text-wrap:balance]">
            {tagline}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-navy/20" />
        </Reveal>
      </div>
    </section>
  );
}

function Beliefs() {
  const { beliefsHeader, beliefs } = philosophy;
  return (
    <section
      id="beliefs"
      aria-labelledby="beliefs-title"
      className="scroll-mt-24 bg-teal py-24 text-paper md:py-32"
    >
      <div className={container}>
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-10">
            <Eyebrow tone="teal">{beliefsHeader.eyebrow}</Eyebrow>
            <h2
              id="beliefs-title"
              className="mt-6 font-display text-[clamp(1.75rem,3.4vw,2.875rem)] font-normal leading-[1.25] text-paper [text-wrap:balance]"
            >
              {beliefsHeader.title}
            </h2>
          </div>
        </Reveal>
        <Reveal className="mt-16">
          <ol className="grid border-t border-paper/20 md:grid-cols-2 md:gap-x-16">
            {beliefs.map((b, i) => (
              <li
                key={b.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-b border-paper/20 py-7"
              >
                <span
                  aria-hidden="true"
                  className="pt-1 font-display text-sm font-semibold text-gold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[19px] font-semibold leading-snug text-paper">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.65] text-paper/85">{b.sentence}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Closing() {
  const { closing } = philosophy;
  return (
    <section aria-label="Closing thought" className="bg-paper py-24 md:py-32">
      <Reveal className={cn(container, "max-w-[1040px] text-center")}>
        <p className="mx-auto max-w-[46ch] text-[16px] leading-[1.6] text-ink/70">
          {closing.leadIn}
        </p>
        <span
          aria-hidden="true"
          className="mt-8 block font-display text-[64px] font-bold leading-[0.6] text-gold"
        >
          “
        </span>
        <blockquote className="mt-4">
          <p className="font-display text-[clamp(1.5rem,3vw,2.375rem)] font-light leading-[1.35] text-navy [text-wrap:balance]">
            {closing.first}
          </p>
          <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.375rem)] font-semibold leading-[1.3] text-teal [text-wrap:balance]">
            {closing.second}
          </p>
        </blockquote>
        <p className="mt-10 flex items-center justify-center gap-4 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/60">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {closing.attribution}
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
        </p>
      </Reveal>
    </section>
  );
}

export function PhilosophyPage() {
  return (
    // `advisory-page` hides the standalone footer: FinalCta brings its own.
    <div className="advisory-page bg-paper text-ink">
      <Hero />
      <Idea />
      <Model />
      <Journey />
      <Beliefs />
      <Closing />
      <FinalCta />
    </div>
  );
}
