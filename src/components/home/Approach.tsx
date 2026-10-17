import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { BrandButton, Item, Reveal } from "@/components/ui-brand";

const STEPS = ["Listen", "Diagnose", "Design", "Implement", "Reflect & Improve"];

function Circle({ i, p }: { i: number; p: MotionValue<number> }) {
  const at = i / (STEPS.length - 1);
  const bg = useTransform(p, [Math.max(at * 0.8 - 0.05, 0), at * 0.8 + 0.02], ["rgba(17,96,101,0)", "rgba(17,96,101,1)"]);
  const color = useTransform(p, [Math.max(at * 0.8 - 0.05, 0), at * 0.8 + 0.02], ["#116065", "#ffffff"]);
  return (
    <motion.span
      style={{ backgroundColor: bg, color }}
      className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-paper font-display text-lg font-bold md:h-20 md:w-20 md:text-xl"
    >
      0{i + 1}
    </motion.span>
  );
}

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });
  const line = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const arc = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <Reveal>
          <Item>
            <p className="eyebrow">How We Work</p>
            <h2 className="h2-display mt-4 text-navy">Our Approach</h2>
          </Item>
        </Reveal>

        <div ref={ref} className="mt-16">
          {/* Desktop horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-10 right-10 top-10 h-[2px] bg-teal/15">
              <motion.span className="absolute inset-0 origin-left bg-teal" style={{ scaleX: line }} />
            </div>
            <ol className="relative grid grid-cols-5 gap-4">
              {STEPS.map((s, i) => (
                <li key={s} className="flex flex-col items-center text-center">
                  <Circle i={i} p={scrollYProgress} />
                  <span className="mt-5 font-display text-lg font-semibold text-navy">{s}</span>
                </li>
              ))}
            </ol>
            <svg aria-hidden className="mt-4 h-24 w-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <motion.path
                d="M900 0 C 900 90, 100 90, 100 0"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: arc }}
              />
            </svg>
          </div>
          {/* Mobile vertical */}
          <div className="relative flex md:hidden">
            <ol className="relative flex-1 space-y-8">
              <div className="absolute bottom-8 left-8 top-8 w-[2px] bg-teal/15">
                <motion.span className="absolute inset-0 origin-top bg-teal" style={{ scaleY: line }} />
              </div>
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-5">
                  <Circle i={i} p={scrollYProgress} />
                  <span className="font-display text-lg font-semibold text-navy">{s}</span>
                </li>
              ))}
            </ol>
            <svg aria-hidden className="w-10 shrink-0" viewBox="0 0 40 100" preserveAspectRatio="none">
              <motion.path
                d="M0 92 C 40 92, 40 8, 0 8"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: arc }}
              />
            </svg>
          </div>
        </div>

        <Reveal className="mt-14 max-w-2xl">
          <Item>
            <p className="text-lg text-ink/85">
              At EhsanX, transformation begins with understanding. Our approach moves organizations from insight to
              action through a practical, collaborative, and reflective process.
            </p>
          </Item>
          <Item className="mt-10">
            <BrandButton to="/our-approach" variant="outline-navy">
              See Our Approach
            </BrandButton>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
