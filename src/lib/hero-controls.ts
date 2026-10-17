export const HERO_DURATION = 6500;
export function nextSlide(current: number, direction: number, count: number) {
  return (current + direction + count) % count;
}
export function slideshowPaused(state: {
  ready: boolean;
  hovered: boolean;
  focused: boolean;
  userPaused: boolean;
  hidden: boolean;
  reduced: boolean;
}) {
  return (
    !state.ready ||
    state.hovered ||
    state.focused ||
    state.userPaused ||
    state.hidden ||
    state.reduced
  );
}
export const WHATSAPP_CONVERSATION_URL = `https://wa.me/923018226596?text=${encodeURIComponent("Hello EhsanX, I'd like to start a conversation.")}`;
