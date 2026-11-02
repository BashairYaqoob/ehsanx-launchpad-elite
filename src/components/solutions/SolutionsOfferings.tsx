import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nodePositions, offerings, solutionsIntro, strandPaths } from "@/data/solutions";
import { OfferingContent, strandColor } from "./OfferingContent";

export function SolutionsOfferings() {
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement | SVGElement>(s));
    const reveal = q("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finalState = () => {
      q("[data-strand]").forEach((p) => p.setAttribute("d", p.dataset.fan!));
      reveal.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };
    if (reduced) {
      finalState();
      return;
    }
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const strands = q("[data-strand]");
        const tl = gsap.timeline({
          paused: true,
          scrollTrigger: { trigger: root.querySelector("[data-knot]"), start: "top 70%", once: true },
        });
        tl.to(strands, { attr: { d: (_i: number, el: SVGPathElement) => el.dataset.fan! }, duration: 1.8, ease: "power3.inOut", stagger: 0.12 }, 0)
          .to(q("[data-intro]"), { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.1)
          .to(q("[data-node-dot]"), { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.12 }, 2.05)
          .to(q("[data-node-label]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 }, 2.1)
          .to(q("[data-panel], [data-accordion]"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.5);
      }, root);
      cleanup = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (selected + (e.key === "ArrowRight" ? 1 : -1) + offerings.length) % offerings.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const hidden = { opacity: 0, transform: "translateY(8px)" };
  const active = offerings[selected];

  return (
    <section ref={rootRef} className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div data-knot>
          {/* Desktop strands */}
          <div className="relative mx-auto hidden max-w-[1040px] md:block">
            <svg aria-hidden="true" viewBox="0 0 1000 440" preserveAspectRatio="none" className="block h-[440px] w-full">
              {strandPaths.map((s, i) => (
                <path
                  key={i}
                  data-strand
                  data-fan={s.fan}
                  d={s.tangled}
                  fill="none"
                  stroke={strandColor[offerings[i].color]}
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: i === selected ? 1 : 0.35, transition: "opacity 250ms" }}
                />
              ))}
            </svg>
          </div>
          {/* Mobile strands */}
          <svg aria-hidden="true" viewBox="400 50 200 180" className="mx-auto block h-[120px] w-[140px] md:hidden">
            {strandPaths.map((s, i) => (
              <path key={i} data-strand data-fan={s.mobile} d={s.tangled} fill="none" stroke={strandColor[offerings[i].color]} strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          <p data-reveal data-intro style={hidden} className="mx-auto mt-10 max-w-[820px] text-center font-display text-[22px] font-medium leading-[1.4] text-navy md:order-first md:text-[28px] lg:text-[32px]">
            {solutionsIntro}
          </p>
        </div>

        {/* Desktop tabs */}
        <div className="mx-auto hidden max-w-[1040px] md:block">
          <div role="tablist" aria-label={solutionsIntro.slice(0, 0) || "Offerings"} onKeyDown={onKey} className="relative -mt-[calc(440px*0.023)] h-[150px]">
            {offerings.map((o, i) => (
              <button
                key={o.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${o.id}`}
                aria-selected={i === selected}
                aria-controls="offering-panel"
                tabIndex={i === selected ? 0 : -1}
                onClick={() => setSelected(i)}
                className="absolute top-0 flex w-[260px] max-w-[30%] -translate-x-1/2 flex-col items-center rounded-md text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                style={{ left: nodePositions[i] }}
              >
                <span data-reveal data-node-dot className="-mt-1.5 block h-3 w-3 rounded-full" style={{ background: strandColor[o.color], opacity: 0, transform: "scale(0)" }} />
                <span data-reveal data-node-label style={hidden} className="mt-4 flex flex-col items-center">
                  <span className="font-sans text-xs font-semibold tracking-[0.14em]" style={{ color: o.color === "gold" ? "#344A6A" : strandColor[o.color] }}>
                    {o.numeral}
                  </span>
                  <span className={`mt-1.5 font-display text-[18px] font-semibold leading-snug text-navy ${i === selected ? "" : "opacity-70"}`}>{o.title}</span>
                </span>
              </button>
            ))}
          </div>
          <div data-reveal data-panel style={hidden} className="mx-auto mt-6 max-w-[1040px]">
            <div className="h-[2px] w-full transition-colors duration-[250ms]" style={{ background: strandColor[active.color] }} />
            <div id="offering-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="pt-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.125 }}>
                  <OfferingContent offering={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile accordion */}
        <div data-reveal data-accordion style={hidden} className="mt-12 md:hidden">
          {offerings.map((o, i) => {
            const isOpen = open === i;
            return (
              <div key={o.id} className="border-b border-navy/15 first:border-t">
                <h3>
                  <button
                    id={`acc-${o.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`acc-panel-${o.id}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-[56px] w-full items-center gap-3 py-4 text-left focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span aria-hidden className="h-3 w-3 shrink-0 rounded-full" style={{ background: strandColor[o.color] }} />
                    <span className="font-sans text-xs font-semibold tracking-[0.14em] text-navy">{o.numeral}</span>
                    <span className="flex-1 font-display text-[17px] font-semibold leading-snug text-navy">{o.title}</span>
                    <span aria-hidden className={`text-xl text-navy transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={`acc-panel-${o.id}`} role="region" aria-labelledby={`acc-${o.id}`} className="pb-8 pt-2">
                    <OfferingContent offering={o} stacked />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
