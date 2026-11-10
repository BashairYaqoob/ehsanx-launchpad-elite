import { useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";

// The five assets named in the section's own paragraph, set as the section's centrepiece. Each
// sits on its own line (two share the first line on wide screens) with a staggered indent.
const ASSETS = [
  { word: "Strengths", colour: "text-navy", line: 0, indent: "" },
  { word: "People", colour: "text-teal", line: 0, indent: "max-md:pl-0" },
  { word: "Relationships", colour: "text-gold", line: 1, indent: "max-md:pl-[9%]" },
  { word: "Resources", colour: "text-navy", line: 2, indent: "max-md:pl-0" },
  { word: "Opportunities", colour: "text-teal", line: 3, indent: "max-md:pl-[9%]" },
];
// Wide-screen placement of each line: left, ranged right, indented, ranged right.
const LINES = ["md:justify-start", "md:justify-end", "md:pl-[18%]", "md:justify-end"];

/**
 * Why EhsanX Exists: the heading and paragraph, then the five assets the paragraph names set
 * large, then the belief statement. As the assets scroll into view each one drops into its line
 * (scrubbed), masked at the top of its line so it never crosses the words above. The settled
 * layout is what renders first, so without motion every word is already in place.
 */
export function WhyExists() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, _ScrollTrigger, element) => {
      const field = element.querySelector("[data-why-field]");
      const words = Array.from(element.querySelectorAll("[data-why-word]"));
      if (!field || words.length === 0) return;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: "top 85%",
          end: "center 55%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      words.forEach((word, i) => {
        timeline
          .fromTo(
            word,
            { yPercent: -105, rotate: i % 2 ? 3 : -3 },
            { yPercent: 0, rotate: 0, duration: 0.36, ease: "back.out(1.6)" },
            i * 0.16,
          )
          .fromTo(word, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "none" }, i * 0.16);
      });
    },
    [],
  );
  useScrollScene(ref, setup, reduce);

  const lines = LINES.map((_, line) => ASSETS.filter((asset) => asset.line === line));
  return (
    <section
      ref={ref}
      aria-labelledby="why-title"
      className="relative isolate bg-paper pt-16 md:pt-24 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-12 lg:px-8 xl:px-12">
        <div className="md:grid md:grid-cols-12 md:items-start md:gap-x-8 lg:gap-x-16">
          <div className="md:col-span-5">
            <GoldRule />
            <h2
              id="why-title"
              className="mt-6 font-display text-[32px] font-bold leading-[1.1] text-navy md:text-[36px] lg:text-[40px]"
            >
              Why EhsanX Exists
            </h2>
          </div>
          {/* Offset so the first line sits level with the top of the heading's capitals. */}
          <p className="mt-6 max-w-[58ch] text-base leading-[1.75] text-ink/80 md:col-span-7 md:mt-[26px] md:text-[17px]">
            EhsanX partners with organizations to develop entrepreneurial leaders, strengthen
            institutions, and enable sustainable transformation. Through leadership development,
            capability-building, consulting, and organizational transformation initiatives, we help
            organizations unlock growth by leveraging the strengths, people, relationships,
            resources, and opportunities they already possess.
          </p>
        </div>

        {/* The paragraph above already names the five assets, so this display copy is hidden from screen readers. */}
        <div
          data-why-field
          aria-hidden="true"
          className="mt-12 font-display text-[40px] font-extrabold leading-[0.92] tracking-[-0.045em] sm:text-[48px] md:mt-20 md:text-[clamp(64px,8.6vw,132px)] md:leading-[0.9] lg:mt-24"
        >
          {lines.map((assets, line) => (
            <div
              key={line}
              className={`md:flex md:gap-[0.28em] md:whitespace-nowrap ${LINES[line]}`}
            >
              {assets.map(({ word, colour, indent }) => (
                <span
                  key={word}
                  className={`block pb-[0.1em] [clip-path:inset(0_-0.3em_-0.4em_-0.3em)] md:inline-block ${indent}`}
                >
                  <span data-why-word className={`inline-block will-change-transform ${colour}`}>
                    {word}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-navy/15 pb-20 pt-10 md:mt-24 md:grid md:grid-cols-12 md:gap-x-8 md:pb-28 md:pt-16 lg:gap-x-16">
          <div className="md:col-span-5">
            <GoldRule className="md:mt-5" />
          </div>
          <p className="mt-6 max-w-[24ch] font-display text-[28px] font-semibold leading-[1.18] tracking-[-0.02em] text-navy md:col-span-7 md:mt-0 md:text-[36px] lg:text-[44px]">
            We believe that extraordinary results emerge when people discover purpose, cultivate an
            entrepreneurial mindset, and learn to create value from what they already have.
          </p>
        </div>
      </div>
    </section>
  );
}

// The approved vision statement, broken into the lines it is set in on wide screens. Small screens
// let it wrap naturally. The text itself must not change.
const VISION_LINES = [
  "To develop people of character",
  "and entrepreneurial mindset",
  "who strengthen institutions,",
  "create value, and contribute",
  "to a flourishing society",
  "through the pursuit of",
];

/**
 * Vision band: a typographic pull quote on teal, with no photograph. As the band scrolls through,
 * the lines brighten in reading order (scrubbed) and the oversized quotation mark drifts a little
 * slower than the text. Without motion every line is fully legible.
 */
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, _ScrollTrigger, element) => {
      const lines = element.querySelectorAll("[data-vision-line]");
      gsap.fromTo(
        lines,
        { opacity: 0.28 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "center 45%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
      gsap.fromTo(
        element.querySelectorAll("[data-vision-mark]"),
        { yPercent: -8 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    [],
  );
  useScrollScene(ref, setup, reduce);

  return (
    <section
      ref={ref}
      aria-labelledby="vision-title"
      className="relative isolate bg-paper p-3 sm:p-4 md:p-6"
    >
      {/* Inset panel: a white margin separates the teal from the navy Client Impact above. */}
      <div className="overflow-hidden rounded-[24px] bg-teal py-16 text-paper md:rounded-[32px] md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-12 lg:px-8 xl:px-12">
          <div className="flex items-center gap-4">
            <GoldRule />
            <h2
              id="vision-title"
              className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-paper"
            >
              Our Vision
            </h2>
          </div>
          <div className="relative mt-10 grid md:mt-14 lg:grid-cols-12 lg:gap-x-8">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none lg:col-span-2 lg:-mt-6"
            >
              <span
                data-vision-mark
                className="block font-display text-[120px] font-extrabold leading-[0.8] text-gold md:text-[180px] lg:text-[260px] xl:text-[300px]"
              >
                “
              </span>
            </span>
            <div className="mt-2 min-w-0 lg:col-span-10 lg:mt-0">
              <blockquote>
                <p className="font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.02em] sm:text-[36px] md:text-[46px] lg:text-[min(4.1vw,64px)]">
                  {VISION_LINES.map((line) => (
                    <span key={line} data-vision-line className="lg:block">
                      {line}{" "}
                    </span>
                  ))}
                  <span data-vision-line className="lg:block">
                    <span className="text-gold">Ihsan.</span>
                    <span aria-hidden="true" className="text-gold">
                      ”
                    </span>
                  </span>
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
