import { motion, useReducedMotion, type Variants } from "framer-motion";

export type LearningCycleStage = { label: string };
export type LearningCycleProps = {
  stages: LearningCycleStage[];
  className?: string;
  ariaLabel?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function LearningCycle({ stages, className = "", ariaLabel = "Learning cycle" }: LearningCycleProps) {
  const reduce = useReducedMotion();
  const count = stages.length;

  const parent: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 1.2, staggerChildren: 0.12 } },
  };
  const lineX: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } } };
  const lineY: Variants = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.2, ease: EASE } } };
  const itemX: Variants = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } };
  const itemY: Variants = { hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };

  const motionProps = reduce
    ? { initial: false as const }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } };

  return (
    <motion.div {...motionProps} variants={reduce ? undefined : parent} className={`relative ${className}`}>
      {/* Desktop line */}
      <motion.span
        aria-hidden="true"
        variants={reduce ? undefined : lineX}
        className="absolute left-0 right-0 top-[55px] hidden h-[1.5px] origin-left bg-navy/25 md:block"
      />
      {/* Mobile line */}
      <motion.span
        aria-hidden="true"
        variants={reduce ? undefined : lineY}
        className="absolute bottom-3 left-[5px] top-3 w-[1.5px] origin-top bg-navy/25 md:hidden"
      />
      {/* Desktop chevrons */}
      {Array.from({ length: Math.max(count - 1, 0) }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={reduce ? undefined : fade}
          className="absolute top-[55px] hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ left: `${((i + 1) / count) * 100}%` }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M2 1l5 5-5 5" stroke="var(--gold)" strokeWidth="1.5" />
          </svg>
        </motion.span>
      ))}
      <ol aria-label={ariaLabel} className="relative flex flex-col gap-8 md:grid md:gap-0" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
        {stages.map((stage, i) => (
          <li key={`${stage.label}-${i}`} className="relative md:text-center">
            <motion.div variants={reduce ? undefined : itemY} className="hidden md:block">
              <span className="block h-10 font-[Montserrat] text-[14px] font-semibold leading-10 text-teal">{pad(i + 1)}</span>
              <span aria-hidden="true" className="mx-auto mt-[0.5625rem] block h-3 w-3 rounded-full bg-gold" />
              <span className="mt-5 block font-[Montserrat] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-navy">{stage.label}</span>
            </motion.div>
            <motion.div variants={reduce ? undefined : itemX} className="flex items-start gap-5 md:hidden">
              <span aria-hidden="true" className="mt-1.5 block h-3 w-3 shrink-0 rounded-full bg-gold" />
              <span className="min-w-0">
                <span className="block font-[Montserrat] text-[14px] font-semibold text-teal">{pad(i + 1)}</span>
                <span className="block font-[Montserrat] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-navy">{stage.label}</span>
              </span>
            </motion.div>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
