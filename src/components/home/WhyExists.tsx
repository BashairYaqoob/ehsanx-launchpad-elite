import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Building2, Sprout, Users } from "lucide-react";
import { useCallback, useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import portrait from "@/assets/why-exists-new-928.webp.asset.json";
import vision from "@/assets/vision-bg-new-1920.webp.asset.json";

const VISION =
  "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan.";
const PILLARS = [
  { label: "Develop entrepreneurial leaders", Icon: Users },
  { label: "Strengthen institutions", Icon: Building2 },
  { label: "Enable sustainable transformation", Icon: Sprout },
];
const CHIPS = ["Strengths", "People", "Relationships", "Resources", "Opportunities"];

export function WhyExists() {
  const ref = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -16, reduce ? 0 : 16]);
  const drift = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -70]);
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, ScrollTrigger, element) => {
      const words = element.querySelectorAll(".eh-vision-word");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            pin: true,
            start: "top top",
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
            { yPercent: -3 },
            { yPercent: 3, duration: 2.2, ease: "none" },
            0,
          );
      });
      mm.add("(max-width: 1023px), (max-height: 599px)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.065,
            scrollTrigger: { trigger: element, start: "top 65%", end: "bottom 85%", scrub: true },
          },
        );
        ScrollTrigger.create({
          trigger: element,
          start: "bottom 90%",
          onEnter: () => gsap.to(element.querySelector(".eh-ihsan"), { color: "var(--gold)" }),
          onLeaveBack: () => gsap.to(element.querySelector(".eh-ihsan"), { color: "var(--paper)" }),
        });
      });
    },
    [],
  );
  useScrollScene(visionRef, setup, reduce);
  return (
    <>
      <section ref={ref} className="eh-why section-y bg-paper">
        <div className="container-x">
          <div className="eh-why-grid">
            <div>
              <GoldRule />
              <h2 className="h2-display mt-6 text-navy">Why EhsanX Exists</h2>
              <motion.div
                className="eh-purpose-copy"
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
            <div className="eh-portrait-wrap">
              <div className="eh-portrait">
                <motion.img
                  src={portrait.url}
                  alt="A bright waterfront walkway beside an EhsanX building"
                  width={928}
                  height={1152}
                  loading="lazy"
                  style={{ y: imageY }}
                />
              </div>
              <span className="eh-portrait-corner" aria-hidden />
            </div>
          </div>
          <div className="eh-pillars">
            {PILLARS.map(({ label, Icon }, i) => (
              <motion.div key={label} className="eh-pillar" whileHover={reduce ? {} : { y: -5 }}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-teal">0{i + 1}</span>
                  <Icon className="h-7 w-7 text-navy" strokeWidth={1} aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="eh-marquee">
          <div className="eh-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="eh-chip-group" aria-hidden={copy === 1}>
                {CHIPS.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="eh-purpose-strip">
          <motion.p style={{ x: drift }}>
            Developing People. Strengthening Institutions. Creating Meaningful Impact.
          </motion.p>
        </div>
      </section>
      <section ref={visionRef} className="eh-vision bg-teal text-paper" aria-label="Our Vision">
        <img
          className="eh-vision-image"
          src={vision.url}
          alt="A single gold paper boat on a calm sea"
          width={1920}
          height={1080}
          loading="lazy"
        />
        <div className="eh-vision-overlay" />
        <div className="container-x eh-vision-content">
          <div className="eh-vision-rule-track">
            <span className="eh-vision-rule" />
          </div>
          <div className="max-w-4xl">
            <p className="eyebrow-dark">Our Vision</p>
            <span aria-hidden className="eh-quote text-gold">
              “
            </span>
            <blockquote className="eh-vision-quote">
              <span className="sr-only">{VISION}</span>
              <span aria-hidden>
                {VISION.split(" ").map((word, i) => (
                  <span key={i} className={`eh-vision-word ${word === "Ihsan." ? "eh-ihsan" : ""}`}>
                    {word}{" "}
                  </span>
                ))}
              </span>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
function Highlight({ children }: { children: string }) {
  return (
    <motion.mark
      className="eh-highlight"
      variants={{
        hidden: { backgroundSize: "0% 100%" },
        show: { backgroundSize: "100% 100%", transition: { duration: 1.1, delay: 0.15 } },
      }}
    >
      {children}
    </motion.mark>
  );
}
