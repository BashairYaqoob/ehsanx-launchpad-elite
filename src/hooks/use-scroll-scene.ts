import { useEffect, type RefObject } from "react";
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  setup: (gsap: typeof Gsap, ScrollTrigger: typeof Trigger, element: HTMLElement) => void,
  reduced: boolean | null,
) {
  useEffect(() => {
    if (reduced || !ref.current) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const element = ref.current;
        const context = gsap.context(() => setup(gsap, ScrollTrigger, element), element);
        dispose = () => context.revert();
        ScrollTrigger.refresh();
      },
    );
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [ref, setup, reduced]);
}
