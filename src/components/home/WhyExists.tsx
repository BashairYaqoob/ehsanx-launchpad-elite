import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Users, Building2, Sprout } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
  const visionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -16, reduce ? 0 : 16]);
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, ScrollTrigger, element) => {
      const words = element.querySelectorAll(".eh-vision-word");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            pin: true,
            start: "top 104px",
            pinSpacing: true,
            end: "+=150%",
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
          .to(element.querySelector(".eh-ihsan"), { color: "var(--gold)", duration: 0.1 })
          .fromTo(
            element.querySelector(".eh-vision-rule"),
            { scaleY: 0 },
            { scaleY: 1, duration: 2.2, ease: "none" },
            0,
          )
          .fromTo(
            element.querySelector(".eh-vision-image"),
            { scale: 1 },
            { scale: 1.06, duration: 2.2, ease: "none" },
            0,
          );
      });
      mm.add("(max-width: 1023px), (max-height: 599px)", (context) => {
        gsap.fromTo(
          words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.065,
            scrollTrigger: { trigger: element, start: "top 65%", end: "bottom 85%", scrub: true },
          },
        );
        context.add("highlightIhsan", () => gsap.to(element.querySelector(".eh-ihsan"), { color: "var(--gold)" }));
        context.add("restoreIhsan", () => gsap.to(element.querySelector(".eh-ihsan"), { color: "var(--paper)" }));
        ScrollTrigger.create({
          trigger: element,
          start: "bottom 90%",
          onEnter: () => context['highlightIhsan'](),
          onLeaveBack: () => context['restoreIhsan'](),
        });
      });
      return () => mm.revert();
    },
    [],
  );
  useScrollScene(visionRef, setup, reduce);
  return (
    <>
      <section ref={ref} className="eh-why [position:relative] [border-radius:0] [margin-top:-32px] [z-index:auto] [overflow:hidden] [isolation:isolate] [margin:0] section-y bg-paper">
        <div className="container-x">
          <div className="eh-why-grid [display:grid] [grid-template-columns:repeat(12,minmax(0,1fr))] [gap:48px] [align-items:start] [@media(max-width:767.98px)]:[display:block] [@media(max-height:599.98px)]:[gap:32px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[gap:32px] [&>div:first-child]:[grid-column:span_6]">
            <div>
              <GoldRule />
              <h2 className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] mt-6 text-navy">Why EhsanX Exists</h2>
              <motion.div
                className="eh-purpose-copy [margin-top:32px] [display:grid] [gap:24px] [color:var(--navy)] [font-size:18px] [line-height:1.8] [@media(max-height:599.98px)]:[font-size:17px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[font-size:17px]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
              >
                <p>
                  EhsanX partners with organizations to develop{" "}
                  <Highlight>entrepreneurial leaders</Highlight>,{" "}
                  <Highlight>strengthen institutions</Highlight>, and enable{" "}
                  <Highlight>sustainable transformation</Highlight>. Through leadership development,
                  capability-building, consulting, and organizational transformation initiatives, we
                  help organizations unlock growth by leveraging the strengths, people,
                  relationships, resources, and opportunities they already possess.
                </p>
                <p className="text-ink">
                  We believe that extraordinary results emerge when people discover purpose,
                  cultivate an entrepreneurial mindset, and learn to create value from what they
                  already have.
                </p>
              </motion.div>
            </div>
            <div className="eh-portrait-wrap [grid-column:span_6] [margin-top:60px] [position:relative] [max-width:560px] [justify-self:end] [width:100%] [@media(max-width:767.98px)]:[margin-inline:auto]">
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
              <span className="eh-portrait-corner [position:absolute] [right:-12px] [bottom:-12px] [width:72px] [height:72px] [border-right:3px_solid_var(--gold)] [border-bottom:3px_solid_var(--gold)] [border-radius:0_0_24px_0] [@media(max-width:767.98px)]:[right:-8px] [@media(max-width:767.98px)]:[bottom:-8px]" aria-hidden />
            </div>
          </div>
          <div className="eh-pillars [display:grid] [grid-template-columns:1fr] [gap:16px] [margin-top:56px] [max-width:1280px] [margin-inline:auto] [@media(min-width:768px)]:[grid-template-columns:repeat(3,minmax(0,1fr))] [@media(min-width:768px)]:[gap:24px] [@media(min-width:768px)]:[margin-top:64px]" aria-label="Three pillars">
            {PILLARS.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="pillar-card-wrap [min-width:0] [display:flex]"
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.1 }}
              >
                <Link to="/philosophy" className="pillar-card [position:relative] [display:flex] [flex-direction:column] [width:100%] [min-height:240px] [padding:32px] [border-radius:24px] [background:var(--paper)] [border:1px_solid_var(--border)] [box-shadow:var(--shadow-soft)] [container-type:inline-size] [transition:translate_.3s,background-color_.3s] [outline-offset:3px] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[border-radius:24px] [&_h3]:[font-size:min(1.5rem,12cqw)] [&_h3]:[line-height:1.35] [&_h3]:[font-weight:600] [&_h3]:[color:var(--navy)] [&_h3]:[overflow-wrap:anywhere] [&_h3]:[transition:color_.3s] [&_h3]:[padding-bottom:24px] [&:hover]:[translate:0_-4px] [&:hover]:[background:var(--navy)] [&:hover_h3]:[color:var(--paper)]" aria-label={`${label} — read our philosophy`}>
                  <div className="pillar-card-top [display:flex] [align-items:center] [justify-content:space-between] [gap:8px]">
                    <span className="pillar-number [font-family:var(--font-display)] [font-size:2.5rem] [font-weight:800] [line-height:1] [color:var(--teal)] [transition:color_.3s] [.pillar-card:hover_&]:[color:var(--gold)]">0{index + 1}</span>
                    <span className="pillar-icon [width:48px] [height:48px] [border:1.5px_solid_var(--teal)] [border-radius:50%] [display:grid] [place-items:center] [flex-shrink:0] [color:var(--teal)] [transition:color_.3s,border-color_.3s] [.pillar-card:hover_&]:[color:var(--paper)] [.pillar-card:hover_&]:[border-color:var(--paper)]"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
                  </div>
                  <div className="pillar-card-bottom [margin-top:auto] [padding-top:32px]">
                    <span className="pillar-rule [display:block] [width:24px] [height:2px] [background:var(--gold)] [margin-bottom:16px] [transition:width_.3s] [.pillar-card:hover_&]:[width:56px]" aria-hidden="true" />
                    <h3>{label}</h3>
                  </div>
                  <ArrowUpRight className="pillar-arrow [position:absolute] [bottom:24px] [right:24px] [color:var(--teal)] [transition:color_.3s] [.pillar-card:hover_&]:[color:var(--paper)]" size={18} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section aria-label="Our Vision">
        <div ref={visionRef} className="eh-vision [min-height:0] [position:relative] [overflow:hidden] [display:flex] [align-items:center] [isolation:isolate] [margin:0] [border-radius:0] [z-index:auto] [height:calc(100dvh_-_104px)] [background:var(--teal)] [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background-image:var(--grain-image)] [&::after]:[opacity:.03] [&::after]:[pointer-events:none] bg-teal text-paper">
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
        <div className="container-x eh-vision-content [position:relative] [display:flex] [gap:48px] [padding-block:24px] [@media(max-width:767.98px)]:[gap:20px]">
          <div className="eh-vision-rule-track [width:2px] [background:var(--eh-vision-rule-track-background-6)] [flex-shrink:0] [position:relative]">
            <span className="eh-vision-rule [position:absolute] [inset:0] [background:var(--gold)] [transform-origin:top]" />
          </div>
          <div className="max-w-4xl">
            <p className="eyebrow-dark text-paper">Our Vision</p>
            <span aria-hidden className="eh-quote [display:block] [font-family:var(--font-display)] [font-size:96px] [font-weight:700] [line-height:1] [margin-top:24px] [@media(max-width:767.98px)]:[font-size:64px] [@media(max-width:767.98px)]:[margin-top:16px] text-gold">
              “
            </span>
            <blockquote className="eh-vision-quote [font-family:var(--font-display)] [font-size:44px] [font-weight:600] [line-height:1.35] [color:var(--paper)] [@media(max-width:767.98px)]:[font-size:26px] [@media(min-width:768px)_and_(max-height:599.98px)]:[font-size:36px] [@media(min-width:768px)_and_(max-width:1023.98px)_and_(min-height:600px)]:[font-size:36px] text-paper">
              <span className="sr-only">{VISION}</span>
              <span aria-hidden>
                {VISION.split(" ").map((word, i) => (
                  <span key={i} className={`eh-vision-word [display:inline] ${word === "Ihsan." ? "eh-ihsan" : ""}`}>
                    {word}{" "}
                  </span>
                ))}
              </span>
            </blockquote>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
function Highlight({ children }: { children: string }) {
  return (
    <motion.mark
      className="eh-highlight [background:var(--eh-highlight-background-5)] [color:var(--navy)] [padding-inline:2px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      variants={{
        hidden: { backgroundSize: "0% 100%" },
        show: { backgroundSize: "100% 100%", transition: { duration: 1.1, delay: 0.15 } },
      }}
    >
      {children}
    </motion.mark>
  );
}

