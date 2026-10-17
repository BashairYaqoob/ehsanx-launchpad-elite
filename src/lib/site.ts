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

export function pageHead(title: string, description: string) {
  const path = title.startsWith("Philosophy") ? "/philosophy" : title.startsWith("Solutions") ? "/solutions" : title.startsWith("Our Approach") ? "/our-approach" : title.startsWith("Client Impact") ? "/client-impact" : title.startsWith("Meet the Team") ? "/meet-the-team" : title.startsWith("Contact") ? "/contact" : "/";
  const url = `https://ehsanx-launchpad-elite.lovable.app${path}`;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: "https://ehsanx-launchpad-elite.lovable.app/og-image.png" },
      { name: "twitter:image", content: "https://ehsanx-launchpad-elite.lovable.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}
