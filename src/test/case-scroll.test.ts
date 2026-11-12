import { describe, expect, it, vi } from "vitest";
import {
  activeCase,
  activeChapter,
  caseNav,
  caseProgress,
  nextNavHidden,
  panelScrollTarget,
} from "@/lib/case-scroll";

describe("case study progress", () => {
  it("runs from 0 at the top of the case to 1 at its end", () => {
    expect(caseProgress(200, 3000, 800)).toBe(0);
    expect(caseProgress(0, 3000, 800)).toBe(0);
    expect(caseProgress(-1100, 3000, 800)).toBe(0.5);
    expect(caseProgress(-2200, 3000, 800)).toBe(1);
    expect(caseProgress(-5000, 3000, 800)).toBe(1);
  });
  it("handles a case shorter than the window", () => {
    expect(caseProgress(100, 500, 800)).toBe(0);
    expect(caseProgress(-10, 500, 800)).toBe(1);
  });
  it("picks the case under the reading line", () => {
    const rects = [
      { top: -3000, bottom: -100 },
      { top: -100, bottom: 2900 },
      { top: 2900, bottom: 5000 },
    ];
    expect(activeCase(rects, 800)).toBe(1);
    expect(activeCase([{ top: 500, bottom: 900 }], 800)).toBe(-1);
  });
});

describe("chapters inside a pinned case", () => {
  const offsets = [0, 1200, 2100, 3400];
  it("marks the chapter whose panel has reached the middle of the window", () => {
    expect(activeChapter(offsets, 0, 1440)).toBe(0);
    expect(activeChapter(offsets, 500, 1440)).toBe(1);
    expect(activeChapter(offsets, 3000, 1440)).toBe(3);
  });
  it("scrolls to a panel without leaving the pinned range", () => {
    expect(panelScrollTarget(5000, 1200, 3000)).toBe(6200);
    expect(panelScrollTarget(5000, 3400, 3000)).toBe(8000);
    expect(panelScrollTarget(5000, -20, 3000)).toBe(5000);
  });
});

describe("navigation swap", () => {
  it("only swaps inside the case studies", () => {
    expect(nextNavHidden(false, { inCases: false, delta: 40 })).toBe(false);
    expect(nextNavHidden(true, { inCases: false, delta: 40 })).toBe(false);
  });
  it("hides on scroll down, returns on scroll up and ignores small movements", () => {
    expect(nextNavHidden(false, { inCases: true, delta: 20 })).toBe(true);
    expect(nextNavHidden(true, { inCases: true, delta: -20 })).toBe(false);
    expect(nextNavHidden(true, { inCases: true, delta: 3 })).toBe(true);
    expect(nextNavHidden(false, { inCases: true, delta: -3 })).toBe(false);
  });
  it("notifies subscribers only when the state changes", () => {
    const listener = vi.fn();
    const unsubscribe = caseNav.subscribe(listener);
    caseNav.set(true);
    caseNav.set(true);
    caseNav.set(false);
    unsubscribe();
    caseNav.set(true);
    caseNav.set(false);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
