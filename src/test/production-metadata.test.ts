import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { NAV_LINKS, OG_IMAGE_URL, SITE_URL, pageHead } from "@/lib/site";

const publicFile = (name: string) => readFileSync(resolve(__dirname, "../../public", name), "utf8");
const pages = ["/", ...NAV_LINKS.map((link) => link.to), "/contact"];

describe("production metadata", () => {
  it("uses the production origin for canonical and share URLs", () => {
    const head = pageHead("Title", "Description", "/philosophy");

    expect(SITE_URL).toBe("https://ehsanx.com");
    expect(head.links[0]).toEqual({ rel: "canonical", href: "https://ehsanx.com/philosophy" });
    expect(head.meta).toContainEqual({
      property: "og:url",
      content: "https://ehsanx.com/philosophy",
    });
    expect(head.meta).toContainEqual({ property: "og:image", content: OG_IMAGE_URL });
  });

  it("lists every page in the sitemap on the production origin", () => {
    const locations = [...publicFile("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );

    expect(locations.sort()).toEqual(pages.map((path) => `${SITE_URL}${path}`).sort());
  });

  it("points robots.txt at the production sitemap", () => {
    expect(publicFile("robots.txt")).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
