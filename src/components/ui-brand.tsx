import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { EASE, type SitePath } from "@/lib/site";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline-light" | "outline-navy";
const variantClass: Record<Variant, string> = {
  gold: "btn-gold",
  "outline-light": "btn-outline-light",
  "outline-navy": "btn-outline-navy",
};

export function BrandButton({
  to,
  variant = "gold",
  children,
  className,
}: {
  to: SitePath;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const reduced = useReducedMotion();
  return (
    <motion.span className="inline-flex" style={{ x: sx, y: sy }} onMouseMove={e => { if (variant !== "gold" || reduced || !window.matchMedia("(pointer:fine)").matches) return; const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left - rect.width / 2) * 0.12); y.set((e.clientY - rect.top - rect.height / 2) * 0.15); }} onMouseLeave={() => { x.set(0); y.set(0); }}><Link to={to} className={cn("btn-base", variantClass[variant], className)}>
      <span>{children}</span>
      <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
    </Link></motion.span>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const C = as === "section" ? motion.section : motion.div;
  return (
    <C
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </C>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-[2px] w-12 bg-gold", className)} />;
}
