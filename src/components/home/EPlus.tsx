import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { BrandButton, Item, Reveal } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

const STEPS = ["Leadership", "Innovation", "Value Creation", "Institutional Transformation", "Human Flourishing"];
const COLORS = ["bg-navy-light", "bg-navy-light", "bg-teal", "bg-teal", "bg-gold"];
const TEXT = ["text-paper", "text-paper", "text-paper", "text-paper", "text-navy"];

function Block({ i, p, label }: { i: number; p: MotionValue<number>; label: string }) {
  const a = i / STEPS.length;
  const b = (i + 1) / STEPS.length;
  const y = useTransform(p, [a, b], [24, 0]);
  const opacity = useTransform(p, [a, b], [0.35, 1]);
  return (
    <motion.div
      style={{ y, opacity, height: `${28 + i * 16}%` }}
      className={cn("flex flex-1 items-start rounded-2xl p-4 shadow-lift lg:p-5", COLORS[i], TEXT[i])}
    >
      <span className="font-display text-sm font-semibold leading-snug lg:text-base">
        <span className="block text-xs opacity-70">0{i + 1}</span>
        {label}
      </span>
    </motion.div>
  );
}

function MobileStep({ i, p, label }: { i: number; p: MotionValue<number>; label: string }) {
  const opacity = useTransform(p, [i / 5, (i + 1) / 5], [0.35, 1]);
  return (
    <motion.li style={{ opacity, marginLeft: `${i * 12}px` }} className={cn("relative rounded-2xl p-5 shadow-lift", COLORS[i], TEXT[i])}>
      <span className="block font-display text-xs font-semibold opacity-70">0{i + 1}</span>
      <span className="font-display font-semibold">{label}</span>
    </motion.li>
  );
}

export function EPlus() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const left = useTransform(scrollYProgress, [0, 1], ["10%", "90%"]);
  const top = useTransform(scrollYProgress, [0, 1], ["72%", "8%"]);

  return (
    <section className="section-y overflow-hidden bg-navy text-paper">
      <div className="container-x">
        <Reveal>
          <Item>
            <p className="eyebrow-dark">Our Philosophy</p>
            <h2 className="h2-display mt-4">The E-Plus Model</h2>
          </Item>
        </Reveal>

        <div ref={ref} className="mt-16">
          {/* Desktop staircase */}
          <div className="relative hidden h-[440px] items-end gap-4 md:flex">
            {STEPS.map((s, i) => (
              <Block key={s} i={i} p={scrollYProgress} label={s} />
            ))}
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M10 72 L90 8"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="0 1"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
            <motion.span
              aria-hidden
              style={{ left, top }}
              className="pointer-events-none absolute -ml-2 -mt-2 h-4 w-4 rounded-full bg-gold shadow-[0_0_24px_6px_rgba(250,183,76,0.55)]"
            />
          </div>
          {/* Mobile stepped list */}
          <div className="relative md:hidden">
            <div className="absolute bottom-0 left-[-12px] top-0 w-[2px] bg-paper/15">
              <motion.span className="absolute inset-0 origin-top bg-gold" style={{ scaleY: scrollYProgress }} />
            </div>
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <MobileStep key={s} i={i} p={scrollYProgress} label={s} />
              ))}
            </ol>
          </div>
          <p className="mt-8 text-sm text-paper/70">
            Leadership → Innovation → Value Creation → Institutional Transformation → Human Flourishing.
          </p>
        </div>

        <Reveal className="mt-14 max-w-2xl">
          <Item>
            <p className="text-lg text-paper/80">
              Every engagement is built on EhsanX’s own philosophy: the E-Plus Model. Explore how purpose, character,
              and entrepreneurial capability come together to create value that outlasts any single project.
            </p>
          </Item>
          <Item className="mt-10">
            <BrandButton to="/philosophy">Explore the Full Model</BrandButton>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
