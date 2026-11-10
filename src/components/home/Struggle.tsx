import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";

const CARDS = [
  {
    text: "Limited ownership, initiative, and entrepreneurial thinking",
    detail:
      "People wait for direction instead of taking ownership, showing initiative, and thinking entrepreneurially.",
    card: "bg-navy text-paper",
    badge: "bg-paper/12 text-gold",
    detailText: "text-paper/80",
    ghost: "text-paper/[0.07]",
  },
  {
    text: "Short-term leadership and limited future readiness",
    detail:
      "Leadership focused on the short term leaves the organization less ready for what comes next.",
    card: "bg-teal text-paper",
    badge: "bg-paper/14 text-gold",
    detailText: "text-paper/80",
    ghost: "text-paper/[0.08]",
  },
  {
    text: "Siloed teams and weak collaboration",
    detail: "Teams work in silos, and collaboration across the organization stays weak.",
    card: "bg-paper text-navy ring-1 ring-inset ring-navy/15",
    badge: "bg-teal/10 text-teal",
    detailText: "text-ink/75",
    ghost: "text-navy/[0.06]",
  },
  {
    text: "Difficulty adapting to technological and AI-driven change",
    detail:
      "Organizations find it difficult to adapt as technology and AI change how work is done.",
    card: "bg-gold text-navy",
    badge: "bg-navy/10 text-navy",
    detailText: "text-navy",
    ghost: "text-navy/[0.08]",
  },
];

// The stacked scene needs room for three title rows plus one open card.
const PINNED_QUERY = "(min-height: 640px)";

/**
 * Why Organizations Struggle. While pinned, each card slides up from below and settles just under
 * the title row of the card before it, so every earlier card stays in the scene with its title
 * showing and the whole stack stays inside the frame. Without the scene (reduced motion or a
 * short window) the four cards read as a plain list.
 */
export function Struggle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setPinned(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, ScrollTrigger, element) => {
      const mm = gsap.matchMedia();
      mm.add(PINNED_QUERY, () => {
        const stack = element.querySelector<HTMLElement>("[data-challenge-stack]");
        const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-challenge-card]"));
        const rows = Array.from(element.querySelectorAll<HTMLElement>("[data-challenge-row]"));
        if (!stack || cards.length < 2) return;
        let strip = 0;
        // Every card shares the height left once the earlier cards' title rows are stacked above it.
        const headers = cards.map((card) => card.querySelector<HTMLElement>("header"));
        const measure = () => {
          cards.forEach((card) => card.style.removeProperty("height"));
          headers.forEach((header) => header?.style.removeProperty("min-height"));
          strip = Math.max(...headers.map((header) => header?.offsetHeight ?? 80));
          // Equal title rows, so a one-line title never lets its description show under the next card.
          headers.forEach((header) => header?.style.setProperty("min-height", `${strip}px`));
          const open = Math.max(strip * 2, stack.clientHeight - strip * (cards.length - 1));
          cards.forEach((card) => (card.style.height = `${Math.round(open)}px`));
        };
        measure();
        ScrollTrigger.addEventListener("refreshInit", measure);
        gsap.set(cards.slice(1), { y: () => window.innerHeight });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.4}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const current = Math.min(
                cards.length - 1,
                Math.floor(self.progress * (cards.length - 0.5)),
              );
              rows.forEach((row, i) => (row.dataset["active"] = String(i === current)));
            },
          },
        });
        cards.slice(1).forEach((card, i) => {
          tl.fromTo(
            card,
            { y: () => window.innerHeight },
            { y: () => (i + 1) * strip, duration: 1, ease: "power2.out", immediateRender: false },
            i,
          );
        });
        tl.to({}, { duration: 0.5 });
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", measure);
          cards.forEach((card) => card.style.removeProperty("height"));
          headers.forEach((header) => header?.style.removeProperty("min-height"));
        };
      });
      return () => mm.revert();
    },
    [],
  );
  useScrollScene(ref, setup, reduced || !pinned);

  return (
    <section aria-labelledby="challenge-title">
      <div
        ref={ref}
        data-mode={pinned ? "pinned" : "list"}
        className={`relative isolate bg-paper ${pinned ? "h-dvh" : ""}`}
      >
        <div
          className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-12 lg:px-8 xl:px-12 ${
            pinned
              ? "flex h-full flex-col pb-6 pt-[92px] lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-16 lg:pb-8 lg:pt-[128px]"
              : "py-16 md:py-20 lg:py-24"
          }`}
        >
          <div className={pinned ? "" : "mb-10 max-w-[650px]"}>
            <GoldRule className={pinned ? "hidden lg:block" : ""} />
            <p className="mt-0 font-display text-xs font-semibold uppercase tracking-[0.14em] text-teal lg:mt-6">
              The Challenge
            </p>
            <h2
              id="challenge-title"
              className={`font-display font-bold leading-[1.08] tracking-[-0.015em] text-navy ${
                pinned
                  ? "mt-2 text-[28px] md:text-[34px] lg:mt-4 lg:text-[40px] xl:text-[44px]"
                  : "mt-4 text-[32px] md:text-[40px]"
              }`}
            >
              Why Organizations Struggle
            </h2>
            <p
              className={`text-ink/80 ${pinned ? "mt-2 text-base lg:mt-5 lg:text-[19px] lg:leading-[1.55]" : "mt-5 text-lg"} max-w-[30ch]`}
            >
              Many organizations struggle with challenges such as:
            </p>
            {pinned && (
              <ol className="mt-8 hidden border-t border-navy/15 lg:block" aria-hidden="true">
                {CARDS.map((card, i) => (
                  <li
                    key={card.text}
                    data-challenge-row
                    data-active={i === 0 ? "true" : "false"}
                    className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-2 border-b border-navy/15 py-3.5 text-[15px] leading-[1.4] text-[#5b6b84] transition-colors duration-300 before:absolute before:-left-5 before:bottom-3 before:top-3 before:w-[3px] before:rounded-full before:bg-gold before:opacity-0 before:transition-opacity before:duration-300 data-[active=true]:font-semibold data-[active=true]:text-navy data-[active=true]:before:opacity-100"
                  >
                    <span className="pt-px font-display text-[13px] font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{card.text}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <ol
            data-challenge-stack
            className={
              pinned
                ? "relative mt-5 min-h-0 flex-1 lg:mt-0 lg:h-[min(680px,calc(100dvh-196px))] lg:flex-none"
                : "grid gap-4 md:gap-5"
            }
          >
            {CARDS.map((card, i) => (
              <li
                key={card.text}
                data-challenge-card
                className={`flex flex-col overflow-hidden rounded-[20px] shadow-[0_-14px_32px_-20px_rgb(13_13_13/0.45),0_20px_44px_-28px_rgb(31_46_69/0.4)] md:rounded-[24px] ${
                  pinned ? "absolute inset-x-0 top-0" : "relative"
                } ${card.card}`}
              >
                <header className="flex items-start gap-4 px-5 py-4 md:gap-5 md:px-8 md:py-6">
                  <span
                    aria-hidden="true"
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-[13px] font-bold md:h-10 md:w-10 md:text-sm ${card.badge}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="min-w-0 pt-1 font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] md:pt-1.5 md:text-[22px] xl:text-[24px]">
                    {card.text}
                  </h3>
                </header>
                <div className="relative flex-1 px-5 pb-6 pl-[4.25rem] md:px-8 md:pb-8 md:pl-[5.75rem]">
                  <p
                    className={`max-w-[44ch] text-[15px] leading-[1.6] md:text-lg ${card.detailText}`}
                  >
                    {card.detail}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-4 right-4 select-none font-display text-[96px] font-extrabold leading-none tracking-[-0.04em] md:-bottom-6 md:right-8 md:text-[160px] ${card.ghost} ${
                      pinned ? "" : "hidden md:block"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
