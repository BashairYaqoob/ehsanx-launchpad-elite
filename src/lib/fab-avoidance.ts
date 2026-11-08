// Keeps the floating WhatsApp button from covering controls or text.
// The button has one fixed position; instead of guessing offsets per page, it steps aside
// (fades out, stops taking clicks) whenever a control or a line of text sits beneath it.

export type Box = { left: number; top: number; right: number; bottom: number };

/** True when the boxes intersect, treating `gap` px of breathing room as part of each. */
export function overlaps(a: Box, b: Box, gap = 0): boolean {
  return (
    a.left < b.right + gap &&
    a.right > b.left - gap &&
    a.top < b.bottom + gap &&
    a.bottom > b.top - gap
  );
}

/**
 * Large focusable containers (a whole carousel, a marquee strip) are not "covered" by a small
 * button in any meaningful way, so obstacles above this share of the viewport are ignored.
 */
export const MAX_OBSTACLE_SHARE = 0.25;

export function isObstacleSized(box: Box, viewport: { width: number; height: number }): boolean {
  const area = Math.max(0, box.right - box.left) * Math.max(0, box.bottom - box.top);
  return area > 0 && area <= viewport.width * viewport.height * MAX_OBSTACLE_SHARE;
}

/** Hide at once when blocked; show again only after the spot has stayed clear for `delay` ms. */
export function nextHidden(state: {
  hidden: boolean;
  blocked: boolean;
  clearSince: number | null;
  now: number;
  delay: number;
}): {
  hidden: boolean;
  clearSince: number | null;
} {
  if (state.blocked) return { hidden: true, clearSince: null };
  const clearSince = state.clearSince ?? state.now;
  return { hidden: state.hidden && state.now - clearSince < state.delay, clearSince };
}

const INTERACTIVE =
  'a[href], button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';
const TEXT = "p, h1, h2, h3, h4, h5, h6, li, blockquote, dt, dd, label, figcaption, .count-up";

function isShown(el: Element): boolean {
  const check = (el as Element & { checkVisibility?: (o: object) => boolean }).checkVisibility;
  if (check) return check.call(el, { opacityProperty: true, visibilityProperty: true });
  const style = getComputedStyle(el);
  return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0;
}

/** Whether any visible control or rendered line of text lies under the button (browser only). */
export function fabIsObstructed(fab: HTMLElement, gap = 12): boolean {
  const box = fab.getBoundingClientRect();
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const near = (r: Box) => overlaps(box, r, gap);
  const skip = (el: Element) =>
    el === fab ||
    fab.contains(el) ||
    el.contains(fab) ||
    el.closest('[aria-hidden="true"]') !== null;

  for (const el of document.querySelectorAll(INTERACTIVE)) {
    if (skip(el)) continue;
    const r = el.getBoundingClientRect();
    if (near(r) && isObstacleSized(r, viewport) && isShown(el)) return true;
  }
  // Text: test the rendered line boxes, not the element box, so a short last line or the empty
  // right-hand side of a paragraph does not count as covered.
  const range = document.createRange();
  for (const el of document.querySelectorAll(TEXT)) {
    if (skip(el) || !near(el.getBoundingClientRect()) || !isShown(el)) continue;
    range.selectNodeContents(el);
    for (const line of range.getClientRects()) {
      if (line.width > 0 && line.height > 0 && near(line)) return true;
    }
  }
  return false;
}
