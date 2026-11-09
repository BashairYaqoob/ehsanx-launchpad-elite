import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Users, Building2, Sprout } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { images } from "@/lib/image-assets";

const PILLARS = [
  { label: "Develop entrepreneurial leaders", icon: Users },
  { label: "Strengthen institutions", icon: Building2 },
  { label: "Enable sustainable transformation", icon: Sprout },
];

export function WhyExists() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The first render must match the server (which cannot know the motion preference), so the
  // parallax is switched off for reduced motion only after mounting.
  const [still, setStill] = useState(false);
  useEffect(() => setStill(!!reduce), [reduce]);
  const imageY = useTransform(scrollYProgress, [0, 1], [still ? 0 : -16, still ? 0 : 16]);
  return (
    <section
      ref={ref}
      className="eh-why [position:relative] [border-radius:0] [margin-top:-32px] [z-index:auto] [overflow:hidden] [isolation:isolate] [margin:0] section-y [padding-block:3.5rem] [@media(min-width:_768px)]:[padding-block:5rem] max-md:!py-16 bg-paper"
    >
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8">
        <div className="eh-why-grid [display:grid] [grid-template-columns:repeat(12,minmax(0,1fr))] [gap:48px] [align-items:start] [@media(max-width:767.98px)]:[display:block] [@media(max-height:599.98px)]:[gap:32px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[gap:32px] [&>div:first-child]:[grid-column:span_6] max-md:[&>div]:min-w-0">
          <div>
            <GoldRule />
            <h2 className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] [font-family:var(--font-display)] [font-size:clamp(2rem,_4vw,_3.5rem)] [font-weight:700] [line-height:1.1] [letter-spacing:0] max-sm:!text-3xl sm:max-lg:!text-4xl lg:max-xl:!text-5xl mt-6 text-navy">
              Why EhsanX Exists
            </h2>
            <div className="eh-purpose-copy [margin-top:32px] [display:grid] [gap:24px] [color:var(--navy)] [font-size:18px] [line-height:1.8] [@media(max-height:599.98px)]:[font-size:17px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[font-size:17px]">
              <p>
                EhsanX partners with organizations to develop entrepreneurial leaders, strengthen
                institutions, and enable sustainable transformation. Through leadership development,
                capability-building, consulting, and organizational transformation initiatives, we
                help organizations unlock growth by leveraging the strengths, people, relationships,
                resources, and opportunities they already possess.
              </p>
              <p className="text-ink">
                We believe that extraordinary results emerge when people discover purpose, cultivate
                an entrepreneurial mindset, and learn to create value from what they already have.
              </p>
            </div>
          </div>
          <div className="eh-portrait-wrap [grid-column:span_6] [margin-top:60px] [position:relative] [max-width:560px] [justify-self:end] [width:100%] [@media(max-width:767.98px)]:[margin-inline:auto] max-md:!max-w-[calc(100%-16px)]">
            <div className="eh-portrait [aspect-ratio:928_/_691] [border-radius:24px] [overflow:hidden] [&_img]:[width:100%] [&_img]:[height:calc(100%_+_32px)] [&_img]:[object-fit:cover] [&_img]:[margin-top:-16px]">
              <motion.img
                src={images.portrait.src}
                srcSet={images.portrait.srcSet}
                sizes="(min-width: 768px) 45vw, 100vw"
                alt="A bright waterfront walkway beside an EhsanX building"
                width={928}
                height={691}
                loading="lazy"
                style={{ y: imageY }}
              />
            </div>
            <span
              className="eh-portrait-corner [position:absolute] [right:-12px] [bottom:-12px] [width:72px] [height:72px] [border-right:3px_solid_var(--gold)] [border-bottom:3px_solid_var(--gold)] [border-radius:0_0_24px_0] [@media(max-width:767.98px)]:[right:-8px] [@media(max-width:767.98px)]:[bottom:-8px]"
              aria-hidden
            />
          </div>
        </div>
        <ul
          aria-label="Three pillars"
          className="eh-pillars mt-14 grid divide-y divide-navy/15 border-y border-navy/15 md:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {PILLARS.map(({ label, icon: Icon }, index) => (
            <li
              key={label}
              className="flex min-w-0 items-center gap-4 py-6 md:px-8 md:py-8 md:first:pl-0 md:last:pr-0"
            >
              <span className="w-7 shrink-0 font-display text-sm font-semibold text-teal">
                0{index + 1}
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[1.5px] border-teal text-teal">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="min-w-0 font-display text-lg font-semibold leading-snug text-navy lg:text-xl">
                {label}
              </span>
            </li>
          ))}
        </ul>
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
      className="relative isolate overflow-hidden bg-teal py-20 text-paper md:py-28 lg:py-32"
    >
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
    </section>
  );
}
