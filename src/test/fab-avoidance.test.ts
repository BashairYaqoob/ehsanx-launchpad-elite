import { describe, expect, it } from "vitest";
import { isObstacleSized, nextHidden, overlaps } from "@/lib/fab-avoidance";

const fab = { left: 326, top: 780, right: 374, bottom: 828 };
const viewport = { width: 390, height: 844 };

describe("WhatsApp button avoidance rules", () => {
  it("detects a control beneath the button", () => {
    expect(overlaps(fab, { left: 16, top: 790, right: 374, bottom: 838 })).toBe(true);
  });
  it("ignores content that ends before the button, outside the breathing room", () => {
    expect(overlaps(fab, { left: 16, top: 790, right: 300, bottom: 810 }, 8)).toBe(false);
    expect(overlaps(fab, { left: 16, top: 790, right: 320, bottom: 810 }, 8)).toBe(true);
  });
  it("ignores large focusable containers such as a whole carousel", () => {
    expect(isObstacleSized({ left: 0, top: 0, right: 390, bottom: 700 }, viewport)).toBe(false);
    expect(isObstacleSized({ left: 16, top: 790, right: 374, bottom: 838 }, viewport)).toBe(true);
  });
  it("hides at once when blocked", () => {
    expect(
      nextHidden({ hidden: false, blocked: true, clearSince: null, now: 1000, delay: 300 }),
    ).toEqual({ hidden: true, clearSince: null });
  });
  it("reappears only after the spot stays clear for the delay", () => {
    const first = nextHidden({
      hidden: true,
      blocked: false,
      clearSince: null,
      now: 1000,
      delay: 300,
    });
    expect(first).toEqual({ hidden: true, clearSince: 1000 });
    expect(
      nextHidden({ hidden: true, blocked: false, clearSince: 1000, now: 1200, delay: 300 }).hidden,
    ).toBe(true);
    expect(
      nextHidden({ hidden: true, blocked: false, clearSince: 1000, now: 1300, delay: 300 }).hidden,
    ).toBe(false);
  });
  it("stays visible while nothing is beneath it", () => {
    expect(
      nextHidden({ hidden: false, blocked: false, clearSince: null, now: 1000, delay: 300 }).hidden,
    ).toBe(false);
  });
});
