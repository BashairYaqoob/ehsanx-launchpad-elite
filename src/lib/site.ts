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

// Placeholder — replace with the real WhatsApp number.
export const WHATSAPP_URL = "https://wa.me/0000000000";

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}
