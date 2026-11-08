export const EASE = [0.22, 1, 0.36, 1] as const;

export const NAV_LINKS = [
  { to: "/philosophy", label: "Philosophy" },
  { to: "/solutions", label: "Solutions" },
  { to: "/our-approach", label: "Our Approach" },
  { to: "/client-impact", label: "Client Impact" },
  { to: "/meet-the-team", label: "Meet the Team" },
] as const;

export type SitePath =
  | "/"
  | "/philosophy"
  | "/solutions"
  | "/our-approach"
  | "/client-impact"
  | "/meet-the-team"
  | "/contact";

export const WHATSAPP_URL = "https://wa.me/923018226596";

// Production origin. Canonical URLs, Open Graph URLs and the share image use it,
// as do public/robots.txt and public/sitemap.xml (kept in sync by a test).
export const SITE_URL = "https://ehsanx.com";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

type HeadLink = { rel: string; href: string };

export function pageHead(title: string, description: string, path: SitePath = "/", extraLinks: HeadLink[] = []) {
  const url = `${SITE_URL}${path}`;
  return {
    links: [{ rel: "canonical", href: url }, ...extraLinks],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}
