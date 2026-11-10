// Philosophy — "What does EhsanX believe, and why?"
// Typographic and editorial around one centrepiece, the E-Plus Model, set as a sentence: two flows
// joined by a plus, arriving at the outcome, which carries the Journey as where it leads. Content
// comes from src/data/philosophy.ts. Scroll motion runs through useScrollScene (GSAP after
// hydration); the settled layout is what renders first, so without motion everything is in place.
import { useCallback, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FinalCta } from "@/components/home/FounderAndCta";
import { container, Eyebrow, PhotoHero, Reveal } from "@/components/advisory/PagePrimitives";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { images } from "@/lib/image-assets";
import { philosophy, type Foundation } from "@/data/philosophy";
import { cn } from "@/lib/utils";

type SceneSetup = Parameters<typeof useScrollScene>[1];

/** Registers a scroll scene on a section; reduced motion leaves the settled layout untouched. */
function useSectionScene(setup: SceneSetup) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useScrollScene(ref, setup, reduce);
  return ref;
}

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
      {/* Page index: a slim band under the hero rather than over the photograph. Stacked rows on
          phones; three equal columns from md, each padded clear of the dividers between them. */}
      <nav aria-label="On this page" className="border-b border-navy/10 bg-paper">
        <ol className={cn(container, "grid md:grid-cols-3")}>
          {sections.map((s, i) => (
            <li
              key={s.id}
              className="border-navy/10 max-md:border-b max-md:last:border-b-0 md:border-l md:first:border-l-0 md:[&:first-child>a]:pl-0 md:[&:last-child>a]:pr-0"
            >
              <a
                href={`#${s.id}`}
                className="group relative flex min-h-16 items-center gap-4 py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold motion-reduce:after:transition-none md:min-h-[88px] md:gap-3 md:px-5 lg:gap-5 lg:px-10"
              >
                <span className="font-display text-[13px] font-semibold tabular-nums tracking-[0.08em] text-teal md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap font-display text-[16px] font-semibold text-navy lg:text-[17px]">
                  {s.label}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/15 text-navy/60 transition-colors duration-200 group-hover:border-teal group-hover:bg-teal group-hover:text-paper motion-reduce:transition-none"
                >
                  <ArrowDown className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Pale-teal bridge from the Idea into the model; bleeds to the right edge on large screens. */
const BLEED_RIGHT =
  "lg:-mr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]";

function Idea() {
  const { intro } = philosophy;
  const [first, second, conclusion] = intro.paragraphs;
  // The pull sentence brightens word by word in reading order as it scrolls into view.
  const setup = useCallback<SceneSetup>((gsap, _ScrollTrigger, element) => {
    const statement = element.querySelector("[data-idea-statement]");
    const words = element.querySelectorAll("[data-idea-word]");
    if (!statement || words.length === 0) return;
    gsap.fromTo(
      words,
      { opacity: 0.3 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: statement, start: "top 80%", end: "center 45%", scrub: 0.6 },
      },
    );
  }, []);
  const ref = useSectionScene(setup);
  return (
    <section
      ref={ref}
      id="idea"
      aria-labelledby="idea-title"
      className="relative isolate scroll-mt-24 bg-paper pt-20 [overflow-x:clip] md:pt-32"
    >
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2
              id="idea-title"
              className="mt-6 font-display text-[clamp(2.25rem,4vw,3.375rem)] font-bold leading-[1.06] tracking-[-0.02em] text-navy [text-wrap:balance]"
            >
              {intro.title}
            </h2>
          </div>
          <p className="max-w-[62ch] text-[17px] leading-[1.75] text-ink/85 md:text-[19px] lg:col-span-6 lg:col-start-7 lg:mt-[84px]">
            {first}
          </p>
        </div>

        {/* The turn in the argument, said once, at full size. */}
        <div className="mt-16 md:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-10 lg:col-start-2">
            <span aria-hidden="true" className="block h-1 w-14 bg-gold md:w-[72px]" />
            <p
              data-idea-statement
              className="mt-6 font-display text-[clamp(2rem,4.4vw,4rem)] font-light leading-[1.16] tracking-[-0.02em] text-navy md:mt-8 [text-wrap:pretty]"
            >
              {intro.pullSentence.split(" ").map((word, i) => (
                <span key={i} data-idea-word>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:mt-24 lg:grid-cols-12 lg:gap-x-6">
          <p className="max-w-[62ch] pb-14 text-[17px] leading-[1.75] text-ink/85 md:text-[18px] lg:col-span-5 lg:col-start-2 lg:pb-32">
            {second}
          </p>
          <div
            className={cn(
              "-mx-6 flex flex-col justify-between gap-8 bg-teal-wash px-6 pb-12 pt-10 md:-mx-10 md:px-10 lg:col-span-5 lg:col-start-8 lg:mx-0 lg:pb-[72px] lg:pl-14 lg:pt-14",
              BLEED_RIGHT,
            )}
          >
            <p className="font-display text-[20px] font-medium leading-[1.5] text-teal md:text-[24px]">
              {conclusion}
            </p>
            <a
              href="#model"
              className="group flex min-h-12 items-center gap-3 border-t border-teal/25 pt-4 font-display text-[15px] font-semibold text-navy md:text-[16px]"
            >
              {philosophy.sections.find((s) => s.id === "model")?.label}
              <ArrowDown
                aria-hidden="true"
                className="ml-auto h-[18px] w-[18px] shrink-0 text-teal transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Amber arrow joining a root foundation to the one it feeds: down when stacked, right from lg. */
function FeedArrow() {
  return (
    <div aria-hidden="true" className="flex py-3 pl-1 lg:h-[52px] lg:items-center lg:px-3 lg:py-0">
      <span className="flex flex-col items-start lg:w-full lg:flex-row lg:items-center">
        <span className="h-7 w-[3px] bg-gold lg:h-[3px] lg:w-auto lg:flex-1" />
        <svg
          viewBox="0 0 14 14"
          className="-ml-1 h-2.5 w-[11px] rotate-90 lg:ml-0 lg:h-3.5 lg:w-3.5 lg:rotate-0"
        >
          <path d="M0 0 L14 7 L0 14 Z" fill="var(--gold)" />
        </svg>
      </span>
    </div>
  );
}

function FoundationName({ item, tier }: { item: Foundation; tier: "root" | "developed" }) {
  return (
    <div data-model-line className="flex flex-col gap-3">
      <h3
        className={cn(
          "font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.015em]",
          tier === "root" ? "font-light text-navy" : "font-semibold text-teal",
        )}
      >
        {item.title}
      </h3>
      <ul
        aria-label={`${item.title}: qualities`}
        className="flex flex-wrap gap-x-5 gap-y-1 text-[14px] leading-[1.55] text-ink/70 md:text-[14.5px]"
      >
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

/** One flow of the model: a root foundation, the arrow, and the foundation it feeds into. */
function Flow({ root, developed }: { root: Foundation; developed: Foundation }) {
  return (
    <div className="lg:col-start-2 lg:grid lg:grid-cols-[minmax(0,5fr)_88px_minmax(0,6fr)] lg:items-start">
      <FoundationName item={root} tier="root" />
      <FeedArrow />
      <FoundationName item={developed} tier="developed" />
      <p className="sr-only">
        {root.title}: {philosophy.model.feedLabel} {developed.title}.
      </p>
    </div>
  );
}

function Model() {
  const { model, stages, tagline } = philosophy;
  const by = (id: string) => model.foundations.find((f) => f.id === id) as Foundation;
  const outcome = by("outcome");
  const leadsTo = model.outcomeLabel.replace(":", "");

  const setup = useCallback<SceneSetup>((gsap, _ScrollTrigger, element) => {
    // Each part of the sentence settles as the reader reaches it, the plus turns into place, and
    // the outcome band rises. Nothing starts below a quarter opacity, so a fast scroll still reads.
    element.querySelectorAll("[data-model-line]").forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.25, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    });
    const plus = element.querySelector("[data-model-plus]");
    if (plus) {
      gsap.fromTo(
        plus,
        { rotate: 90, scale: 0.6, opacity: 0.3 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: plus, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    }
    const band = element.querySelector("[data-model-band]");
    if (band) {
      gsap.fromTo(
        band,
        { y: 48, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: band, start: "top 95%", end: "top 55%", scrub: 0.6 },
        },
      );
    }
  }, []);
  const ref = useSectionScene(setup);

  return (
    <section
      ref={ref}
      id="model"
      aria-labelledby="model-title"
      className="relative isolate scroll-mt-24 bg-paper pt-24 md:pt-28"
    >
      <div className={container}>
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-6">
            <Eyebrow>{model.eyebrow}</Eyebrow>
            <h2
              id="model-title"
              className="mt-5 font-display text-[clamp(1.875rem,2.8vw,2.5rem)] font-bold leading-[1.1] text-navy"
            >
              {model.title}
            </h2>
          </div>
          <p className="max-w-[46ch] text-[16px] leading-[1.7] text-ink/80 md:text-[17px] lg:col-span-5 lg:col-start-8">
            {model.intro}
          </p>
        </header>

        {/* The model set as one sentence: two flows joined by a plus, arriving at the outcome. */}
        <div className="mt-12 border-t border-navy/15 pt-8 md:mt-16 md:pt-12 lg:grid lg:grid-cols-[96px_minmax(0,1fr)] lg:gap-y-2">
          <Flow root={by("meaning")} developed={by("character")} />
          <span
            aria-hidden="true"
            data-model-plus
            className="my-5 block w-fit font-display text-[84px] font-light leading-[0.8] text-gold lg:col-start-1 lg:my-0 lg:mt-1.5 lg:text-[112px] lg:leading-[0.9]"
          >
            +
          </span>
          <div aria-hidden="true" className="hidden lg:col-start-2 lg:block lg:h-7" />
          <Flow root={by("people")} developed={by("entrepreneurial")} />
        </div>
      </div>

      {/* Arrival: the outcome, and the journey it leads to, in one block. */}
      <div data-model-band className="mt-14 bg-navy-deep text-paper md:mt-16">
        <article
          aria-labelledby="outcome-title"
          className={cn(
            container,
            "py-12 md:py-16 lg:grid lg:grid-cols-[96px_minmax(0,1fr)] lg:pb-[72px]",
          )}
        >
          <span
            aria-hidden="true"
            className="block font-display text-[72px] font-light leading-[0.7] text-gold lg:text-[96px] lg:leading-[0.8]"
          >
            =
          </span>
          <div className="mt-6 lg:mt-0">
            <h3
              id="outcome-title"
              className="font-display text-[clamp(2.625rem,5.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.025em] [text-wrap:balance]"
            >
              {outcome.title}
            </h3>
            <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.65] text-paper/90 md:text-[17px]">
              {outcome.role}
            </p>
            <ul
              aria-label={`${outcome.title}: where value is created`}
              className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-paper/20 pt-5 text-[14px] leading-[1.45] text-paper/90 sm:grid-cols-3 md:text-[14.5px] lg:grid-cols-6"
            >
              {outcome.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            {/* Where the outcome leads: the five stages, part of the outcome rather than a section. */}
            <div id="journey" className="mt-12 scroll-mt-24 border-t border-paper/20 pt-8 md:mt-14">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                <h4 className="flex flex-col gap-1.5 font-display text-[22px] font-semibold leading-[1.25] md:text-[24px] lg:block">
                  <span className="text-[13px] font-medium text-gold md:text-[14px] lg:mr-3.5">
                    {leadsTo}
                  </span>
                  {philosophy.journey.title}
                </h4>
                <p className="font-display text-[19px] font-light leading-[1.35] text-paper/90">
                  {tagline}
                </p>
              </div>
              <ol className="mt-6 grid gap-[18px] md:mt-7 md:grid-cols-5 md:gap-x-7">
                {stages.map((s, i) => (
                  <li
                    key={s.number}
                    className={cn(
                      "flex flex-col gap-1.5 border-l-2 pl-4 md:gap-2 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4",
                      i === stages.length - 1 ? "border-gold" : "border-paper/35",
                    )}
                  >
                    <h5 className="font-display text-[17px] font-semibold md:text-[18px]">
                      {s.title}
                    </h5>
                    <p className="text-[14.5px] leading-[1.55] text-paper/85">{s.descriptor}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/** Words that join the two ideas in a belief's title ("Purpose Before Performance"). */
const JOINERS = new Set(["Before", "Over", "with", "Through", "Beyond"]);

/** Sets the joining word light so the two ideas carry the line; other titles stay as one weight. */
function BeliefTitle({ title }: { title: string }) {
  const words = title.split(" ");
  const join = words.findIndex((w, i) => i > 0 && i < words.length - 1 && JOINERS.has(w));
  if (join === -1) return <span className="font-semibold">{title}</span>;
  const part = (from: number, to?: number): ReactNode => words.slice(from, to).join(" ");
  return (
    <>
      <span className="font-semibold">{part(0, join)}</span>{" "}
      <span className="font-light text-navy">{words[join]}</span>{" "}
      <span className="font-semibold">{part(join + 1)}</span>
    </>
  );
}

function Beliefs() {
  const { beliefsHeader, beliefs } = philosophy;
  // Reading line: each belief comes up to full strength as it reaches the upper middle of the
  // screen and stays there. Phones keep every line at full strength.
  const setup = useCallback<SceneSetup>((gsap, _ScrollTrigger, element) => {
    const rows = element.querySelectorAll("[data-belief]");
    if (rows.length === 0) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: 0.5 },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);
  const ref = useSectionScene(setup);
  return (
    <section
      ref={ref}
      id="beliefs"
      aria-labelledby="beliefs-title"
      className="relative isolate scroll-mt-24 bg-paper py-20 md:py-32"
    >
      <div className={container}>
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-10">
            <Eyebrow>{beliefsHeader.eyebrow}</Eyebrow>
            <h2
              id="beliefs-title"
              className="mt-6 font-display text-[clamp(1.9375rem,4.2vw,3.75rem)] font-light leading-[1.18] tracking-[-0.02em] text-navy md:mt-7 [text-wrap:pretty]"
            >
              {beliefsHeader.title}
            </h2>
          </div>
        </div>
        {/* Unnumbered: the beliefs are not a sequence. */}
        <ul className="mt-11 border-t border-navy/15 md:mt-20">
          {beliefs.map((b) => (
            <li
              key={b.title}
              data-belief
              className="flex flex-col gap-2 border-b border-navy/10 py-[22px] md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-[30px]"
            >
              <h3 className="font-display text-[28px] leading-[1.12] tracking-[-0.015em] text-teal md:col-span-7 md:text-[clamp(2rem,3.1vw,2.75rem)] md:leading-[1.1]">
                <BeliefTitle title={b.title} />
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-ink/80 md:col-span-4 md:col-start-9 md:text-[16.5px]">
                {b.sentence}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Closing() {
  const { closing } = philosophy;
  return (
    <section
      aria-label="Closing thought"
      className="relative isolate bg-teal py-24 text-paper md:py-32"
    >
      <Reveal className={cn(container, "max-w-[1040px] text-center")}>
        <p className="mx-auto max-w-[46ch] text-[16px] leading-[1.6] text-paper/85">
          {closing.leadIn}
        </p>
        <span
          aria-hidden="true"
          className="mt-8 block font-display text-[64px] font-bold leading-[0.6] text-gold"
        >
          “
        </span>
        <blockquote className="mt-4">
          <p className="font-display text-[clamp(1.5rem,3vw,2.375rem)] font-light leading-[1.35] text-paper [text-wrap:balance]">
            {closing.first}
          </p>
          <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.375rem)] font-semibold leading-[1.3] text-paper [text-wrap:balance]">
            {closing.second}
          </p>
        </blockquote>
        <p className="mt-10 flex items-center justify-center gap-4 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/80">
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
      <Beliefs />
      <Closing />
      <FinalCta />
    </div>
  );
}
