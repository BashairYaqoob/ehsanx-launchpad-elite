import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { refreshImages } from "@/lib/refresh-images";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useCallback, useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { images } from "@/lib/image-assets";

const VISION =
  "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan.";
const PILLARS = [
  { label: "Develop entrepreneurial leaders", image: refreshImages.pillar_1 },
  { label: "Strengthen institutions", image: refreshImages.pillar_2 },
  { label: "Enable sustainable transformation", image: refreshImages.pillar_3 },
];

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
              <span className="eh-portrait-corner" aria-hidden />
            </div>
          </div>
          <div className="eh-pillars" aria-label="Three pillars">
            {PILLARS.map(({ label, image }, i) => <PillarCard key={label} label={label} image={image} index={i} reduced={!!reduce} />)}
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
          src={refreshImages.vision_v2.src}
          srcSet={refreshImages.vision_v2.srcSet}
          sizes="100vw"
          alt="EhsanX vision across a calm horizon"
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
            <p className="eyebrow-dark text-paper">Our Vision</p>
            <span aria-hidden className="eh-quote text-gold">
              “
            </span>
            <blockquote className="eh-vision-quote text-paper">
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
      <div className="vision-challenge-gap" aria-hidden="true" />
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

function PillarCard({ label, image, index, reduced }: { label: string; image: typeof refreshImages.pillar_1; index: number; reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-12 - index * 5, 12 + index * 5]);
  return <motion.article ref={ref} className="pillar-card" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay: index * 0.12 }}>
    <motion.div className="pillar-image-drift" style={{ y }}><ResponsiveImage asset={image} alt={label} loading="lazy" sizes="(min-width: 1024px) 30vw, 75vw" /></motion.div>
    <div className="pillar-shade" />
    <span className="pillar-number">0{index + 1}</span>
    <h3>{label}<ArrowUpRight className="pillar-arrow" aria-hidden="true" /></h3>
  </motion.article>;
}
