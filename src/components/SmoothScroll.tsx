import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function SmoothScroll() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      dispose = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => { cancelled = true; dispose?.(); };
  }, [pathname]);
  return null;
}