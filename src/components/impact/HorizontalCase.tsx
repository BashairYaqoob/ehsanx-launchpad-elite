import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { HORIZONTAL_QUERY, activeChapter, panelScrollTarget } from "@/lib/case-scroll";

export type Chapter = { id: string; label: string };

type Props = {
  /** Anchor id; it sits on the outer wrapper so links land where the pinned scene starts. */
  id: string;
  titleId: string;
  chapters: Chapter[];
  children: ReactNode;
};

const scrollWindowTo = (top: number) => {
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: "smooth" });
};

/**
 * One case study as a horizontal spread. On a wide, tall window with motion allowed, the section
 * pins and vertical scrolling moves its panels sideways, one pixel across for each pixel down, then
 * releases into normal scrolling. Everywhere else (and before scripts run) the same panels stack
 * vertically, so every word stays reachable without the scene.
 */
export function HorizontalCase({ id, titleId, chapters, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);
  const [chapter, setChapter] = useState(0);
  const trigger = useRef<Trigger | null>(null);
  const offsets = useRef<number[]>([]);

  useEffect(() => {
    const media = window.matchMedia(HORIZONTAL_QUERY);
    const update = () => setHorizontal(media.matches && !reduced);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduced]);

  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, ScrollTrigger, section) => {
      const track = section.querySelector<HTMLElement>("[data-track]");
      const bar = section.querySelector<HTMLElement>("[data-case-progress]");
      const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-panel]"));
      if (!track || panels.length < 2) return;
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
      const measure = () => {
        offsets.current = panels.map((panel) => panel.offsetLeft);
      };
      measure();
      ScrollTrigger.addEventListener("refresh", measure);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            bar?.style.setProperty("transform", `scaleX(${self.progress})`);
            const next = activeChapter(
              offsets.current,
              self.progress * distance(),
              section.clientWidth,
            );
            setChapter((current) => (current === next ? current : next));
          },
        },
      });
      trigger.current = tween.scrollTrigger ?? null;

      // Tabbing into a panel that is off to the side scrolls the page until that panel is in view.
      const onFocus = (event: FocusEvent) => {
        const st = trigger.current;
        const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-panel]");
        if (!st || !panel) return;
        const target = panelScrollTarget(st.start, panel.offsetLeft, distance());
        if (Math.abs(window.scrollY - target) > 4) {
          window.__lenis?.scrollTo(target, { immediate: true });
          if (!window.__lenis) window.scrollTo({ top: target });
        }
      };
      section.addEventListener("focusin", onFocus);
      return () => {
        section.removeEventListener("focusin", onFocus);
        ScrollTrigger.removeEventListener("refresh", measure);
        trigger.current = null;
        bar?.style.removeProperty("transform");
      };
    },
    [],
  );
  useScrollScene(ref, setup, reduced || !horizontal);

  const goTo = (index: number) => {
    const st = trigger.current;
    const section = ref.current;
    const track = section?.querySelector<HTMLElement>("[data-track]");
    if (!st || !section || !track) return;
    const distance = Math.max(0, track.scrollWidth - section.clientWidth);
    scrollWindowTo(panelScrollTarget(st.start, offsets.current[index] ?? 0, distance));
  };

  return (
    <div id={id} data-case className="relative border-t border-navy/10">
      <section
        ref={ref}
        aria-labelledby={titleId}
        data-hz={horizontal ? "true" : "false"}
        className="relative isolate bg-white hz:h-screen hz:overflow-hidden"
      >
        <div data-track className="hz:flex hz:h-full hz:w-max hz:will-change-transform">
          {children}
        </div>

        {/* Chapter guide, shown only while the case moves sideways. */}
        <nav
          aria-label={`Sections of this case study`}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center px-6 pb-5 hz:flex"
        >
          <ol className="pointer-events-auto flex items-center gap-1 rounded-full bg-paper p-1 ring-1 ring-navy/15">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === chapter ? "step" : undefined}
                  className="flex min-h-9 cursor-pointer items-center rounded-full px-3.5 font-display text-[13px] font-semibold text-navy/70 transition-colors duration-300 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=step]:bg-navy-deep aria-[current=step]:text-paper xl:px-4"
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 hidden h-[3px] bg-navy/10 hz:block"
        >
          <div data-case-progress className="h-full origin-left scale-x-0 bg-gold" />
        </div>
      </section>
    </div>
  );
}

type PanelProps = {
  chapter: string;
  /** Background and the panel's width in the horizontal mode (hz:w-[..vw]). */
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/** A panel of the spread; stacked it is a normal block, sideways it takes the full window height. */
export function Panel({ chapter, className = "", innerClassName = "", children }: PanelProps) {
  return (
    <div data-panel={chapter} className={`relative hz:h-full hz:shrink-0 ${className}`}>
      <div
        className={`mx-auto w-full max-w-[1280px] px-6 py-14 md:px-10 md:py-20 hz:mx-0 hz:flex hz:h-full hz:max-w-none hz:flex-col hz:justify-center hz:px-[4.5vw] hz:pb-[clamp(5.5rem,12vh,7rem)] hz:pt-[clamp(6rem,13vh,8rem)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
