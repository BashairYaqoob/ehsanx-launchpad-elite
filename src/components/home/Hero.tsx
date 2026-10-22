import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/lib/image-assets";
import { BrandButton } from "@/components/ui-brand";
import { useIntroReady } from "@/lib/intro";
import { EASE } from "@/lib/site";

const TITLE = "Building Leaders. Transforming Organizations.";
const SUB =
  "We help organizations develop leaders who can navigate complexity, strengthen teams, and create lasting impact.";

export function Hero() {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  return (
    <section className="eh-hero relative bg-navy-deep text-paper" aria-label="Introduction">
      <div className="eh-hero-surface">
        <img
          src={images.hero_blocks.src}
          srcSet={images.hero_blocks.srcSet}
          sizes="100vw"
          alt="Navy, teal and gold EX sculpture in a sunlit atrium"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="container-x eh-hero-content">
          <div className="eh-hero-copy">
            <h1 className="eh-hero-title">
              {TITLE.split(" ").map((word, w) => (
                <span key={w} className="eh-word-mask">
                  <motion.span
                    initial={false}
                    animate={ready ? { y: 0, opacity: 1 } : { y: reduce ? 0 : "110%", opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: w * 0.035 }}
                  >
                    {word}
                  </motion.span>{" "}
                </span>
              ))}
            </h1>
            <motion.p
              className="eh-hero-subtitle"
              initial={false}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.2, duration: reduce ? 0 : 0.5 }}
            >
              {SUB}
            </motion.p>
          </div>
          <div className="eh-hero-ctas" aria-hidden={!ready}>
            <BrandButton to="/contact">Start a Conversation</BrandButton>
            <BrandButton to="/our-approach" variant="outline-light">
              Explore Our Approach
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
