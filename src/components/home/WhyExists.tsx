import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Users, Building2, Sprout } from "lucide-react";
import { refreshImages } from "@/lib/refresh-images";
import { useCallback, useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { images } from "@/lib/image-assets";

const VISION =
  "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan.";
const PILLARS = [
  { label: "Develop entrepreneurial leaders", icon: Users },
  { label: "Strengthen institutions", icon: Building2 },
  { label: "Enable sustainable transformation", icon: Sprout },
];

export function WhyExists() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -16, reduce ? 0 : 16]);
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

// Vision band: not pinned. The words brighten as the band scrolls through the viewport (scrubbed),
// so it reads in place instead of holding the page for extra screens.
export function Vision() {
  const visionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, _ScrollTrigger, element) => {
      const words = element.querySelectorAll(".eh-vision-word");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(
          words,
          { opacity: 0.25 },
          { opacity: 1, stagger: 0.065, duration: 0.1, ease: "none" },
        )
        .to(element.querySelector(".eh-ihsan"), { color: "var(--gold)", duration: 0.1 });
      timeline.fromTo(
        element.querySelector(".eh-vision-rule"),
        { scaleY: 0 },
        { scaleY: 1, duration: timeline.duration(), ease: "none" },
        0,
      );
    },
    [],
  );
  useScrollScene(visionRef, setup, reduce);
  return (
    <section aria-label="Our Vision">
      <div
        ref={visionRef}
        className="eh-vision [position:relative] [overflow:hidden] [display:flex] [align-items:center] [isolation:isolate] [margin:0] [border-radius:0] [z-index:auto] [background:var(--teal)] [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background-image:var(--grain-image)] [&::after]:[opacity:.03] [&::after]:[pointer-events:none] bg-teal text-paper"
      >
        <img
          className="eh-vision-image [position:absolute] [inset:0] [height:100%] [width:100%] [object-fit:cover] [object-position:70%_center]"
          src={refreshImages.vision_v2.src}
          srcSet={refreshImages.vision_v2.srcSet}
          sizes="100vw"
          alt="EhsanX vision across a calm horizon"
          width={1920}
          height={1080}
          loading="lazy"
        />
        <div className="eh-vision-overlay [position:absolute] [inset:0] [background:var(--vision-shade)] [&::before]:[content:''] [&::before]:[position:absolute] [&::before]:[inset:0] [&::before]:[background:var(--vision-horizon)]" />
        <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 eh-vision-content [position:relative] [display:flex] [gap:48px] [padding-block:112px] [@media(max-width:767.98px)]:[gap:20px] max-lg:!py-20 max-lg:!gap-4">
          <div className="eh-vision-rule-track [width:2px] [background:var(--eh-vision-rule-track-background-6)] [flex-shrink:0] [position:relative]">
            <span className="eh-vision-rule [position:absolute] [inset:0] [background:var(--gold)] [transform-origin:top]" />
          </div>
          <div className="max-w-4xl">
            <p className="eyebrow-dark [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--gold)] text-paper">
              Our Vision
            </p>
            <span
              aria-hidden
              className="eh-quote [display:block] [font-family:var(--font-display)] [font-size:72px] [font-weight:700] [line-height:1] [margin-top:20px] [@media(max-width:767.98px)]:[font-size:56px] [@media(max-width:767.98px)]:[margin-top:16px] text-gold"
            >
              “
            </span>
            <blockquote className="eh-vision-quote [font-family:var(--font-display)] [font-size:44px] [font-weight:600] [line-height:1.35] [color:var(--paper)] [@media(max-width:767.98px)]:[font-size:26px] [@media(min-width:768px)_and_(max-height:599.98px)]:[font-size:36px] [@media(min-width:768px)_and_(max-width:1023.98px)_and_(min-height:600px)]:[font-size:36px] max-sm:!text-2xl text-paper">
              <span className="sr-only">{VISION}</span>
              <span aria-hidden>
                {VISION.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={`eh-vision-word [display:inline] ${word === "Ihsan." ? "eh-ihsan" : ""}`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
