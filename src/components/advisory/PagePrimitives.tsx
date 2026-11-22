import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared page width and gutters (matches Solutions, Client Impact and Meet the Team). */
export const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";

/**
 * Small uppercase section label with a gold rule. Teal text on light backgrounds, gold on navy;
 * on teal the text is white (gold on teal is below WCAG AA for small text) and the rule stays gold.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "teal";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] md:text-[13px]",
        tone === "dark" ? "text-gold" : tone === "teal" ? "text-paper" : "text-teal",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
      {children}
    </p>
  );
}

/**
 * Fade-up on entry. `initial` is identical on server and client so hydration always matches;
 * with reduced motion the content is shown at once instead of waiting to be scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      {...(reduce
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
