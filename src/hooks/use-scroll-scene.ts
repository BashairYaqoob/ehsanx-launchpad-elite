import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  setup: (gsap: typeof Gsap, ScrollTrigger: typeof Trigger, element: HTMLElement) => void | (() => void),
  reduced: boolean | null,
) {
  const [motionDisabled, setMotionDisabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionDisabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useLayoutEffect(() => {
    if (reduced || motionDisabled || !ref.current) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    let refreshTimer = 0;
    // One shared, debounced refresh for fonts, window load and resize.
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (cancelled) return;
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          if (cancelled) return;
          ScrollTrigger.sort((a: Trigger, b: Trigger) => {
            if (!a.trigger || !b.trigger) return 0;
            return a.trigger.compareDocumentPosition(b.trigger) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
          });
          ScrollTrigger.refresh();
        });
      }, 150);
    };
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const element = ref.current;
        const context = gsap.context(() => setup(gsap, ScrollTrigger, element), ref);
        dispose = () => context.revert();
        refresh();
      },
    );
    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      dispose?.();
    };
  }, [ref, setup, reduced, motionDisabled]);
}
