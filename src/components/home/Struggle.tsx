import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { cn } from "@/lib/utils";
import { images } from "@/lib/image-assets";
const CARDS = [
  {
    n: "01",
    text: "Limited ownership, initiative, and entrepreneurial thinking",
    card: "bg-navy text-paper",
    num: "text-gold",
    image: images.challenge_1,
    alt: "Tethered navy paper boats beside a gold boat sailing freely",
  },
  {
    n: "02",
    text: "Short-term leadership and limited future readiness",
    card: "bg-teal text-paper",
    num: "text-gold",
    image: images.challenge_2,
    alt: "A teal paper boat tethered to shore",
  },
  {
    n: "03",
    text: "Siloed teams and weak collaboration",
    card: "bg-paper text-navy border border-navy/10",
    num: "text-teal",
    image: images.challenge_3,
    alt: "Separate groups of paper boats divided by stone barriers",
  },
  {
    n: "04",
    text: "Difficulty adapting to technological and AI-driven change",
    card: "bg-gold text-navy",
    num: "text-navy",
    image: images.challenge_4,
    alt: "Paper boats navigating a complex geometric network",
  },
];
export function Struggle() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, _ScrollTrigger, element) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
        const cards = Array.from(element.querySelectorAll<HTMLElement>(".eh-challenge-card"));
        gsap.set(cards.slice(1), { y: () => window.innerHeight + 100 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.5}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        cards.slice(1).forEach((card, i) => {
          timeline
            .to(
              cards[i] ?? card,
              { scale: 0.93, y: -20, duration: 1, ease: "none" },
              i,
            )
            .to(card, { y: 0, duration: 1, ease: "none" }, i)
            .to((cards[i] ?? card).children, { opacity: 0.7, duration: 1, ease: "none" }, i);
        });
        timeline.to({}, { duration: 0.5 });
      });
    },
    [],
  );
  useScrollScene(ref, setup, reduce);
  return (
    <section ref={ref} className="eh-challenge bg-wash">
      <div className="container-x eh-challenge-layout">
        <div className="eh-challenge-heading">
          <GoldRule />
          <p className="eyebrow mt-6">The Challenge</p>
          <h2 className="h2-display mt-4 text-navy">Why Organizations Struggle</h2>
          <p className="mt-6 text-lg text-ink/80">
            Many organizations struggle with challenges such as:
          </p>
        </div>
        <div className="eh-challenge-stack">
          {CARDS.map((card, i) => (
            <article
              key={card.n}
              className={cn("eh-challenge-card shadow-lift", card.card)}
              data-card={i + 1}
            >
              <div className="eh-challenge-title">
                <span className={cn("font-display text-4xl font-semibold", card.num)}>
                  {card.n}
                </span>
                <h3 className="font-display text-xl font-semibold leading-snug">{card.text}</h3>
              </div>
              <div className="eh-challenge-image">
                <motion.img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  alt={card.alt}
                  width={card.image.width}
                  height={card.image.height}
                  loading="lazy"
                  whileHover={reduce ? {} : { x: -6, y: -4, scale: 1.02 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
