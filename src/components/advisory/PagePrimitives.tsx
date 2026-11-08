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

export type HeroImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  /** object-position for the 4:3 crop on small screens and the full-bleed crop from 900px. */
  mobilePosition: string;
  desktopPosition: string;
};

/**
 * Full-bleed photo hero shared with Solutions, Client Impact and Meet the Team: the photo sits
 * under the navy navbar band on small screens with the text below it; from 900px the photo fills
 * the hero behind a left navy gradient that carries the white text.
 */
export function PhotoHero({
  eyebrow,
  title,
  line,
  image,
  inset = false,
  children,
}: {
  eyebrow: string;
  title: string;
  line: string;
  image: HeroImage;
  /** From 900px, start the photo a quarter in and fade it out of the navy, so a subject in the
   *  middle of the frame sits clear of the text while the hero still reads as full-bleed. */
  inset?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-navy-deep text-paper min-[900px]:flex min-[900px]:min-h-[max(82vh,620px)] min-[900px]:items-end">
      <div
        className={cn(
          "pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:right-0 min-[900px]:pt-0",
          inset ? "min-[900px]:left-[24%]" : "min-[900px]:left-0",
        )}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="100vw"
          alt={image.alt}
          width={image.width}
          height={image.height}
          fetchPriority="high"
          style={{
            ["--hero-m" as string]: image.mobilePosition,
            ["--hero-d" as string]: image.desktopPosition,
          }}
          className="aspect-[4/3] w-full object-cover [object-position:var(--hero-m)] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:[object-position:var(--hero-d)]"
        />
        {/* Left shade carries the text; a soft top shade keeps the white navigation legible. With
            `inset`, the shade starts at the exact navy of the section so there is no seam. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden min-[900px]:block"
          style={{
            background: inset
              ? "linear-gradient(90deg, #1f2e45 0%, rgba(31,46,69,0.72) 26%, rgba(31,46,69,0) 62%), linear-gradient(180deg, rgba(31,46,69,0.6) 0%, rgba(31,46,69,0) 24%), linear-gradient(0deg, rgba(31,46,69,0.4) 0%, rgba(31,46,69,0) 35%)"
              : "linear-gradient(90deg, rgba(8,22,40,0.9) 0%, rgba(8,22,40,0.66) 38%, rgba(8,22,40,0) 72%), linear-gradient(180deg, rgba(8,22,40,0.55) 0%, rgba(8,22,40,0) 24%), linear-gradient(0deg, rgba(8,22,40,0.45) 0%, rgba(8,22,40,0) 40%)",
          }}
        />
      </div>
      <div
        className={cn(
          container,
          "relative py-12 min-[900px]:pb-24 min-[900px]:pt-[calc(5rem+64px)]",
        )}
      >
        <div className="max-w-[640px]">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.015em] text-paper">
            {title}
          </h1>
          <p className="mt-6 max-w-[32ch] font-display text-[clamp(1.2rem,2vw,1.625rem)] font-light leading-[1.45] text-paper/90">
            {line}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}
