import { useEffect, useRef, type ReactNode } from "react";
import logoWhite from "@/assets/logo-white.png";
import { container } from "@/components/advisory/PagePrimitives";
import { BRAND_LINE, FOUNDATIONS_LINE, type BrandSegment } from "@/data/brand";

/**
 * One line of text that travels along an SVG curve without end. The visible line repeats the
 * segment list; a hidden copy of one repetition is measured, and `startOffset` slides by exactly
 * that length, so the loop has no seam. It stands still for reduced motion and pauses while the
 * pointer rests on the band.
 */
function PathText({
  id,
  d,
  segments,
  className,
  accentClassName,
  fontSize,
  dy = 0,
  speed,
  ribbon,
}: {
  id: string;
  d: string;
  segments: BrandSegment[];
  className: string;
  accentClassName: string;
  fontSize: number;
  /** Vertical shift of the text from the path, to centre it in a ribbon. */
  dy?: number;
  /** Artboard units per second. */
  speed: number;
  /** Draws the path itself as a band under the text. */
  ribbon?: { stroke: string; width: number };
}) {
  const unitRef = useRef<SVGTextElement>(null);
  const pathTextRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const unit = unitRef.current;
    const textPath = pathTextRef.current;
    if (!unit || !textPath) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let length = unit.getComputedTextLength();
    void document.fonts?.ready.then(() => {
      length = unit.getComputedTextLength();
    });
    const band = textPath.closest("svg");
    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    band?.addEventListener("pointerenter", pause);
    band?.addEventListener("pointerleave", resume);
    let frame = 0;
    let last = performance.now();
    let travelled = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!paused && length > 0) {
        travelled = (travelled + speed * dt) % length;
        // One repetition back, so the forward motion never reveals the start of the path.
        textPath.setAttribute("startOffset", (travelled - length).toFixed(2));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      band?.removeEventListener("pointerenter", pause);
      band?.removeEventListener("pointerleave", resume);
    };
  }, [speed]);

  const render = (times: number) =>
    Array.from({ length: times }, (_, r) =>
      segments.map((s, i) => (
        <tspan key={`${r}-${i}`} className={s.accent ? accentClassName : undefined}>
          {s.text}
        </tspan>
      )),
    );

  return (
    <>
      <path
        id={id}
        d={d}
        fill="none"
        stroke={ribbon?.stroke ?? "none"}
        strokeWidth={ribbon?.width}
      />
      <text ref={unitRef} className={className} fontSize={fontSize} opacity={0} xmlSpace="preserve">
        {render(1)}
      </text>
      <text className={className} fontSize={fontSize} dy={dy} xmlSpace="preserve">
        <textPath ref={pathTextRef} href={`#${id}`} startOffset="-50%">
          {render(6)}
        </textPath>
      </text>
    </>
  );
}

/**
 * An artboard for the curves, scaled by height and cropped at the sides, so the lettering keeps
 * its size; phones get their own drawing (390 wide), wider screens another (1440 wide).
 */
function Artboard({
  width,
  height,
  className,
  children,
}: {
  width: number;
  height: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full select-none ${className}`}
    >
      {children}
    </svg>
  );
}

const ribbonText = "font-display font-semibold fill-navy-deep";
const loopText = "font-display font-medium fill-navy/50";

/**
 * The faint E-Plus foundations drift into a navy EhsanX badge and leave it as an amber ribbon
 * carrying the brand line: raw ingredients in, transformation out. Decorative, so hidden from
 * assistive technology (the same words appear on the site as text).
 */
function TransformationBand() {
  return (
    <div
      aria-hidden="true"
      className="relative -mt-4 h-[230px] w-full overflow-hidden md:-mt-10 md:h-[300px]"
    >
      <Artboard width={390} height={230} className="md:hidden">
        <PathText
          id="hero-loop-sm"
          d="M -40 70 C 60 20, 150 40, 140 110 C 134 160, 120 190, 150 190"
          segments={FOUNDATIONS_LINE}
          className={loopText}
          accentClassName="fill-gold"
          fontSize={13}
          speed={24}
        />
        <PathText
          id="hero-ribbon-sm"
          d="M 250 190 C 300 188, 360 158, 440 110"
          segments={BRAND_LINE}
          className={ribbonText}
          accentClassName="fill-teal"
          fontSize={15}
          dy={5}
          speed={24}
          ribbon={{ stroke: "var(--gold)", width: 34 }}
        />
        <rect x="134" y="166" width="124" height="48" rx="24" fill="var(--navy-deep)" />
        <image href={logoWhite} x="150" y="182" width="92" height="16" />
      </Artboard>
      <Artboard width={1440} height={300} className="hidden md:block">
        <PathText
          id="hero-loop"
          d="M -80 130 C 120 30, 420 40, 470 150 C 500 222, 560 250, 660 250"
          segments={FOUNDATIONS_LINE}
          className={loopText}
          accentClassName="fill-gold"
          fontSize={16}
          speed={34}
        />
        <PathText
          id="hero-ribbon"
          d="M 800 250 C 980 248, 1180 190, 1520 96"
          segments={BRAND_LINE}
          className={ribbonText}
          accentClassName="fill-teal"
          fontSize={19}
          dy={7}
          speed={34}
          ribbon={{ stroke: "var(--gold)", width: 44 }}
        />
        <rect x="652" y="218" width="156" height="64" rx="32" fill="var(--navy-deep)" />
        <image href={logoWhite} x="672" y="240" width="116" height="20" />
      </Artboard>
    </div>
  );
}

/**
 * The inner pages' hero: a navy band behind the navigation, then an editorial masthead on white
 * (page name and running head on a rule, a large navy headline, the subtitle offset beside a gold
 * rule), closed by the moving transformation band.
 */
export function TransformationHero({
  eyebrow,
  meta,
  title,
  subtitle,
}: {
  eyebrow: string;
  /** Running head on the right of the top rule. */
  meta: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section aria-labelledby="page-title" className="bg-paper">
      <div aria-hidden="true" className="h-[calc(5rem+32px)] bg-navy-deep" />
      <div className={`${container} pt-10 md:pt-14`}>
        <div className="flex items-center justify-between gap-6 border-b border-navy/15 pb-4">
          <p className="flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-teal md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
            {eyebrow}
          </p>
          <p className="hidden font-display text-[13px] font-semibold text-navy/60 md:block">
            {meta}
          </p>
        </div>
        <h1
          id="page-title"
          className="mt-10 max-w-[15ch] font-display text-[clamp(2.6rem,7vw,6.25rem)] font-bold leading-[1] tracking-[-0.03em] text-navy [text-wrap:balance] md:mt-14"
        >
          {title}
        </h1>
        <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-12">
          <p className="max-w-[54ch] border-l-[3px] border-gold pl-6 font-[Inter] text-[18px] leading-[1.65] text-ink md:text-[20px] lg:col-span-7 lg:col-start-6">
            {subtitle}
          </p>
        </div>
      </div>
      <TransformationBand />
    </section>
  );
}
