// Brand lines used by the inner-page hero's moving curves.

export type BrandSegment = { text: string; accent?: boolean };

const sep: BrandSegment = { text: "  ×  ", accent: true };
const dot: BrandSegment = { text: "   ·   " };

/**
 * The line carried by the amber ribbon: the footer tagline ("Entrepreneurial Leadership.
 * Innovation. Institutional Transformation.") and the closing line of the EhsanX brochure
 * ("Developing People. Strengthening Institutions. Creating Meaningful Impact.").
 */
export const BRAND_LINE: BrandSegment[] = [
  { text: "EhsanX" },
  sep,
  { text: "Entrepreneurial Leadership" },
  sep,
  { text: "Innovation" },
  sep,
  { text: "Institutional Transformation" },
  sep,
  { text: "Developing People" },
  sep,
  { text: "Strengthening Institutions" },
  sep,
  { text: "Creating Meaningful Impact" },
  sep,
];

/** The four foundations of the E-Plus Model, the faint line that flows into the EhsanX badge. */
export const FOUNDATIONS_LINE: BrandSegment[] = [
  { text: "meaning and purpose" },
  dot,
  { text: "people-centered beliefs" },
  dot,
  { text: "character and values" },
  dot,
  { text: "entrepreneurial mindset" },
  dot,
];
