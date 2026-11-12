import { describe, expect, it } from "vitest";
import { degreeName, director, founder } from "@/data/team";

// The degrees and ventures are stored in parts so the page can set them differently; these
// rebuild the approved biography lines from those parts so the wording cannot drift.
const line = (d: { level: string; field: string; institution: string }) =>
  `${degreeName(d)} — ${d.institution}.`;

describe("Meet the Team keeps the approved biography wording", () => {
  it("rebuilds Dr Shahid's degrees", () => {
    expect(founder.credentials.degrees.map(line)).toEqual([
      "PhD in Entrepreneurship and Innovation — Technical University of Berlin.",
      "MBA — Lahore University of Management Sciences (LUMS).",
      "MSc in Industrial and Manufacturing Systems Engineering — Asian Institute of Technology, Thailand.",
      "BSc in Mechanical Engineering — University of Engineering and Technology (UET), Lahore.",
    ]);
  });
  it("rebuilds Dr Ambreen's degrees and ventures", () => {
    expect(director.background.degrees.map(line)).toEqual([
      "BS in Computer Systems Engineering — Sir Syed University of Engineering and Technology (SSUET).",
      "MBA in Corporate Management — IBA Karachi.",
      "PhD in Entrepreneurship Management — Putra Business School, Malaysia.",
    ]);
    expect(director.ventures.items.map((v) => `${v.role}, ${v.name}.`)).toEqual([
      "Founder, AURA360.",
      "Co-founder, Hijab-al-Firdaus.",
    ]);
  });
  it("keeps all seven teaching institutions and ten engagements", () => {
    expect(founder.teaching.regions.flatMap((r) => r.institutions)).toHaveLength(7);
    expect(director.engagements.items).toHaveLength(10);
    expect(director.expertise.items).toHaveLength(10);
  });
});
