// Interaction rules for the Client Impact case studies and their navigation, kept free of the DOM
// so they can be tested. The components feed in measurements; these decide what happens.
import { useSyncExternalStore } from "react";

/** The pinned horizontal case studies need a wide and tall enough window; otherwise they stack. */
export const HORIZONTAL_QUERY = "(min-width: 1024px) and (min-height: 700px)";

/** Scroll distance (px) in one direction before the bar swaps; ignores jitter and trackpad noise. */
export const SWAP_THRESHOLD = 8;

const clamp01 = (value: number) => (Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0);

/**
 * How far the reader is through a case study, 0 to 1: 0 when its top reaches the top of the window,
 * 1 when its bottom reaches the bottom. Works for the pinned and the stacked layout alike.
 */
export function caseProgress(top: number, height: number, viewport: number): number {
  const travel = height - viewport;
  if (travel <= 0) return top <= 0 ? 1 : 0;
  return clamp01(-top / travel);
}

/** Index of the case under the reading line (40% down the window), or -1 when none is. */
export function activeCase(rects: { top: number; bottom: number }[], viewport: number): number {
  const line = viewport * 0.4;
  return rects.findIndex((rect) => rect.top <= line && rect.bottom > line);
}

/** Index of the chapter whose panel starts at or before the middle of the window. */
export function activeChapter(offsets: number[], scrolled: number, viewportWidth: number): number {
  const line = scrolled + viewportWidth * 0.5;
  let index = 0;
  offsets.forEach((offset, i) => {
    if (offset <= line) index = i;
  });
  return index;
}

/** Window scroll position that brings a panel to the left edge of a pinned case study. */
export function panelScrollTarget(start: number, offset: number, distance: number): number {
  return start + Math.min(Math.max(0, offset), Math.max(0, distance));
}

/**
 * Whether the main navigation gives way to the case study bar. Inside the case studies, scrolling
 * down swaps it out and scrolling up brings it back; outside them it is always shown.
 */
export function nextNavHidden(
  hidden: boolean,
  { inCases, delta }: { inCases: boolean; delta: number },
): boolean {
  if (!inCases) return false;
  if (delta > SWAP_THRESHOLD) return true;
  if (delta < -SWAP_THRESHOLD) return false;
  return hidden;
}

// Shared between the main navigation and the case study bar, so the two always swap together.
let navHidden = false;
const listeners = new Set<() => void>();

export const caseNav = {
  get: () => navHidden,
  set(value: boolean) {
    if (value === navHidden) return;
    navHidden = value;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => void listeners.delete(listener);
  },
};

/** True while the case study bar stands in for the main navigation. */
export function useCaseNavHidden(): boolean {
  return useSyncExternalStore(caseNav.subscribe, caseNav.get, () => false);
}
