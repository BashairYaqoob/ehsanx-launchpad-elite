// Philosophy — "What does EhsanX believe, and why?"
// Navy, typographic and editorial: no photography. Content comes from src/data/philosophy.ts unchanged.
import {
  ArrowDown,
  ChevronRight,
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
import { container, Eyebrow, PhotoHero, Reveal } from "@/components/advisory/PagePrimitives";
import { images } from "@/lib/image-assets";
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
    <>
      <PhotoHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        line={heroLine}
        image={{
          ...images.philosophy_workshop,
          alt: "Dr Shahid Qureshi facilitating group work with participants seated at tables during an EhsanX workshop.",
          mobilePosition: "70% 50%",
          desktopPosition: "50% 35%",
        }}
        inset
      />
      {/* Page index: a slim band under the hero rather than over the photograph. */}
      <nav aria-label="On this page" className="border-b border-navy/10 bg-paper">
        <ol className={cn(container, "grid grid-cols-2 md:grid-cols-4")}>
          {sections.map((s, i) => (
            <li
              key={s.id}
              className="border-navy/10 max-md:[&:nth-child(-n+2)]:border-b md:border-l md:first:border-l-0"
            >
              <a
                href={`#${s.id}`}
                className="group flex min-h-16 items-center gap-3 py-4 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold md:min-h-20 md:gap-4 md:px-6 md:first:pl-0"
              >
                <span className="font-display text-sm font-semibold text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[15px] font-semibold text-navy md:text-[16px]">
                  {s.label}
                </span>
                <ArrowDown
                  aria-hidden="true"
                  className="ml-auto hidden h-4 w-4 shrink-0 text-navy/40 transition-transform group-hover:translate-y-0.5 group-hover:text-teal motion-reduce:transition-none md:block"
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
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

/** A foundation in the E-Plus Model. `tier` sets the top edge: navy for root beliefs, teal for the qualities they develop. */
function FoundationPanel({
  item,
  tier,
  className,
}: {
  item: Foundation;
  tier: "root" | "developed";
  className?: string;
}) {
  const Icon = icons[item.icon] ?? Compass;
  return (
    <article
      className={cn(
        "flex flex-col border border-navy/10 border-t-[3px] bg-paper p-6 md:p-7",
        tier === "root" ? "border-t-navy" : "border-t-teal",
        className,
      )}
    >
      <div className="flex items-center gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wash text-navy">
          <Icon aria-hidden="true" strokeWidth={1.6} className="h-[22px] w-[22px]" />
        </span>
        <h3 className="font-display text-[18px] font-semibold leading-snug text-navy">
          {item.title}
        </h3>
      </div>
      <p className="mb-5 mt-4 text-[15.5px] leading-[1.65] text-ink/80">{item.role}</p>
      <ul
        aria-label={`${item.title}: qualities`}
        className="mt-auto flex flex-wrap gap-2 border-t border-navy/10 pt-5"
      >
        {item.bullets.map((b) => (
          <li
            key={b}
            className="rounded-full border border-navy/15 px-3 py-1 text-[13.5px] leading-[1.4] text-navy"
          >
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

/** Gold connector: points down when stacked, right from the large breakpoint. */
function Connector({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center py-3 lg:py-0", className)}
    >
      <span className="flex flex-col items-center lg:w-full lg:flex-row">
        <span className="h-6 w-px bg-gold lg:h-px lg:w-auto lg:flex-1" />
        <ChevronRight
          strokeWidth={2}
          className="-mt-1.5 h-4 w-4 rotate-90 text-gold lg:-ml-2 lg:mt-0 lg:rotate-0"
        />
      </span>
    </div>
  );
}

function Model() {
  const { model } = philosophy;
  const by = (id: string) => model.foundations.find((f) => f.id === id) as Foundation;
  const outcome = by("outcome");
  const OutcomeIcon = icons[outcome.icon] ?? HandHeart;
  const [foundationsCaption, outcomeCaption] = model.title.split(", ");
  return (
    <section
      id="model"
      aria-labelledby="model-title"
      className="scroll-mt-24 bg-wash py-24 md:py-32"
    >
      <div className={container}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{model.eyebrow}</Eyebrow>
            <h2
              id="model-title"
              className="mt-6 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] text-navy"
            >
              {model.title}
            </h2>
          </div>
          <p className="max-w-[46ch] text-[17px] leading-[1.7] text-ink/80 lg:col-span-5 lg:col-start-8">
            {model.intro}
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          {/* Column captions (large screens), taken from the section title. */}
          <div
            aria-hidden="true"
            className="mb-5 hidden font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60 lg:grid lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_88px_minmax(0,1.1fr)]"
          >
            <span className="col-span-3 flex items-center gap-3">
              {foundationsCaption}
              <span className="h-px flex-1 bg-navy/15" />
            </span>
            <span className="col-start-5 flex items-center gap-3">
              {outcomeCaption}
              <span className="h-px flex-1 bg-navy/15" />
            </span>
          </div>

          {/* Two flows converge on one outcome, as in the Company Profile's model diagram. */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_88px_minmax(0,1.1fr)] lg:grid-rows-[1fr_1fr] lg:gap-y-6">
            <FoundationPanel
              item={by("meaning")}
              tier="root"
              className="lg:col-start-1 lg:row-start-1"
            />
            <Connector className="lg:col-start-2 lg:row-start-1" />
            <FoundationPanel
              item={by("character")}
              tier="developed"
              className="lg:col-start-3 lg:row-start-1"
            />
            <FoundationPanel
              item={by("people")}
              tier="root"
              className="mt-8 lg:col-start-1 lg:row-start-2 lg:mt-0"
            />
            <Connector className="lg:col-start-2 lg:row-start-2" />
            <FoundationPanel
              item={by("entrepreneurial")}
              tier="developed"
              className="lg:col-start-3 lg:row-start-2"
            />

            {/* Converging bracket between the two flows and the outcome (large screens). */}
            <div
              aria-hidden="true"
              className="relative hidden lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:block"
            >
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 25 H45 V75 H0 M45 50 H96"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <ChevronRight
                strokeWidth={2}
                className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
              />
            </div>
            <Connector className="lg:hidden" />

            <article className="flex flex-col border-t-[3px] border-gold bg-navy p-7 text-paper md:p-9 lg:col-start-5 lg:row-span-2 lg:row-start-1">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-paper/10 text-gold">
                <OutcomeIcon aria-hidden="true" strokeWidth={1.6} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-[24px] font-bold leading-snug">
                {outcome.title}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-paper/90">{outcome.role}</p>
              <ul
                aria-label={`${outcome.title}: where value is created`}
                className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1"
              >
                {outcome.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-[1.5] text-paper/90">
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
                  className="ml-auto h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                />
              </a>
            </article>
          </div>
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
      className="scroll-mt-24 bg-navy py-24 text-paper md:py-32"
    >
      <div className={container}>
        <Reveal>
          <Eyebrow tone="dark">{journey.eyebrow}</Eyebrow>
          <h2
            id="journey-title"
            className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] text-paper"
          >
            {journey.title}
          </h2>
        </Reveal>
        <Reveal className="relative mt-16">
          {/* Connecting line: horizontal from md, vertical when stacked. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[27px] top-6 w-px bg-paper/25 md:bottom-auto md:left-0 md:right-0 md:top-[94px] md:h-px md:w-auto"
          />
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {stages.map((s, i) => {
              const last = i === stages.length - 1;
              return (
                <li key={s.number} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 md:block">
                  <div className="flex flex-col items-center md:items-start">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-[44px] font-light leading-none text-gold md:text-[64px]",
                      )}
                    >
                      {s.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-4 h-3.5 w-3.5 rounded-full ring-[6px] ring-navy md:mt-[18px]",
                        last ? "bg-gold" : "border-2 border-gold bg-navy",
                      )}
                    />
                  </div>
                  <div className="md:mt-8">
                    <h3 className="font-display text-[19px] font-semibold leading-snug text-paper">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-[1.65] text-paper/85">
                      {s.descriptor}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal className="mt-20 flex items-center gap-5 md:gap-8">
          <span aria-hidden="true" className="h-px flex-1 bg-paper/25" />
          <p className="text-center font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-light text-paper [text-wrap:balance]">
            {tagline}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-paper/25" />
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
