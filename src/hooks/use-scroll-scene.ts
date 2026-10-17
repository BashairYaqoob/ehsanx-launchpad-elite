import { useEffect, useState, type RefObject } from "react";
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  setup: (gsap: typeof Gsap, ScrollTrigger: typeof Trigger, element: HTMLElement) => void,
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
  useEffect(() => {
    if (reduced || motionDisabled || !ref.current) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    let refreshFrame = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          if (cancelled) return;
          ScrollTrigger.sort((a: Trigger, b: Trigger) => {
            if (!a.trigger || !b.trigger) return 0;
            return a.trigger.compareDocumentPosition(b.trigger) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
          });
          ScrollTrigger.refresh();
        });
      });
    };
    window.addEventListener("resize", refresh);
    document.fonts.ready.then(refresh);
    const imageCleanups = Array.from(document.images).map(image => {
      image.addEventListener("load", refresh);
      return () => image.removeEventListener("load", refresh);
    });
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const element = ref.current;
        const context = gsap.context(() => setup(gsap, ScrollTrigger, element), element);
        dispose = () => context.revert();
        refresh();
      },
    );
    return () => {
      cancelled = true;
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("resize", refresh);
      imageCleanups.forEach(cleanup => cleanup());
      dispose?.();
    };
  }, [ref, setup, reduced, motionDisabled]);
}
