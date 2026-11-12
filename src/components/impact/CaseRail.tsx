import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { engagementIndex } from "@/data/clientImpact";
import {
  activeCase,
  caseNav,
  caseProgress,
  nextNavHidden,
  useCaseNavHidden,
} from "@/lib/case-scroll";

// How long a jump from the bar keeps the bar in place, so the scroll it starts cannot swap it out.
const JUMP_LOCK_MS = 1400;

/**
 * Case study bar. Inside the case studies, scrolling down swaps the main navigation for this pill in
 * the same place: the three clients, the one being read, and how far through it the reader is.
 * Scrolling up brings the main navigation back.
 */
export function CaseRail() {
  const shown = useCaseNavHidden();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);
  const progress = useRef<HTMLSpanElement[]>([]);
  const lockUntil = useRef(0);

  useEffect(() => {
    const region = document.querySelector<HTMLElement>("[data-case-region]");
    const cases = engagementIndex.map((item) => document.getElementById(item.id));
    if (!region) return;
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const viewport = window.innerHeight;
      const box = region.getBoundingClientRect();
      const inCases = box.top <= 1 && box.bottom > viewport * 0.5;
      const locked = performance.now() < lockUntil.current;
      if (!locked || !inCases)
        caseNav.set(nextNavHidden(caseNav.get(), { inCases, delta: y - lastY }));
      lastY = y;
      const rects = cases.map(
        (el) => el?.getBoundingClientRect() ?? { top: 0, bottom: 0, height: 0 },
      );
      setActive(activeCase(rects, viewport));
      rects.forEach((rect, i) => {
        const bar = progress.current[i];
        if (bar) bar.style.transform = `scaleX(${caseProgress(rect.top, rect.height, viewport)})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      caseNav.set(false);
    };
  }, []);

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    lockUntil.current = performance.now() + JUMP_LOCK_MS;
    caseNav.set(true);
    const top = window.scrollY + target.getBoundingClientRect().top;
    if (window.__lenis && !reduce) window.__lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed inset-x-0 top-4 z-[990] px-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[140%] opacity-0"
      }`}
    >
      <nav
        aria-label="Case studies"
        className="mx-auto flex h-16 max-w-[1280px] items-center gap-2 rounded-full bg-navy-deep px-2 text-paper md:gap-4 md:pl-7 md:pr-2"
      >
        <span className="hidden shrink-0 font-[Montserrat] text-[13px] font-semibold text-paper/60 md:block">
          Case studies
        </span>
        <ol className="grid flex-1 grid-cols-3 gap-1 md:ml-auto md:flex md:flex-none">
          {engagementIndex.map((item, i) => (
            <li key={item.id} className="min-w-0">
              <a
                href={`#${item.id}`}
                onClick={(event) => go(event, item.id)}
                aria-current={i === active ? "location" : undefined}
                className="group relative flex h-12 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full px-3 font-[Montserrat] text-[13px] font-semibold text-paper/65 transition-colors duration-300 hover:text-paper aria-[current=location]:bg-paper/10 aria-[current=location]:text-paper md:px-5 md:text-[14px]"
              >
                <span className="truncate">
                  <span className="md:hidden">{item.short}</span>
                  <span className="hidden md:inline">{item.name}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-1.5 h-[2px] overflow-hidden rounded-full bg-paper/0 group-aria-[current=location]:bg-paper/15"
                >
                  <span
                    ref={(el) => {
                      if (el) progress.current[i] = el;
                    }}
                    className="block h-full origin-left scale-x-0 bg-gold"
                  />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
