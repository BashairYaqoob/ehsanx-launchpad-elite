import { describe, expect, it } from "vitest";
import {
  HERO_DURATION,
  nextSlide,
  slideshowPaused,
  WHATSAPP_CONVERSATION_URL,
} from "@/lib/hero-controls";

const playing = {
  ready: true,
  hovered: false,
  focused: false,
  userPaused: false,
  hidden: false,
  reduced: false,
};
describe("hero interaction rules", () => {
  it("wraps four slides in both directions", () => {
    expect(nextSlide(3, 1, 4)).toBe(0);
    expect(nextSlide(0, -1, 4)).toBe(3);
  });
  it("uses the existing 6500ms slide duration", () => {
    expect(HERO_DURATION).toBe(6500);
  });
  it("pauses on hover", () => {
    expect(slideshowPaused(playing)).toBe(false);
    expect(slideshowPaused({ ...playing, hovered: true })).toBe(true);
  });
  it("pauses on focus", () => {
    expect(slideshowPaused({ ...playing, focused: true })).toBe(true);
  });
  it("pauses in hidden tabs", () => {
    expect(slideshowPaused({ ...playing, hidden: true })).toBe(true);
  });
  it("honors manual pause", () => {
    expect(slideshowPaused({ ...playing, userPaused: true })).toBe(true);
  });
  it("does not autoplay with reduced motion", () => {
    expect(slideshowPaused({ ...playing, reduced: true })).toBe(true);
  });
  it("uses the requested WhatsApp number", () => {
    expect(new URL(WHATSAPP_CONVERSATION_URL).pathname).toBe("/923018226596");
  });
  it("prefills the requested conversation", () => {
    expect(new URL(WHATSAPP_CONVERSATION_URL).searchParams.get("text")).toBe(
      "Hello EhsanX, I'd like to start a conversation.",
    );
  });
});
