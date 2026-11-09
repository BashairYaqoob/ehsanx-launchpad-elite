import { Journey } from "./Journey";
import { approach } from "@/data/approach";

/** Home "Our Approach": the five stages from the Company Profile (p.9) on the shared Journey path. */
export function Approach() {
  return (
    <Journey
      layout="path"
      kind="approach"
      eyebrow="How We Work"
      title="Our Approach"
      intro={approach.intro.summary}
      stages={approach.steps.map((step) => ({ name: step.title, description: step.purpose }))}
      cta={{ label: "See Our Approach", to: "/our-approach" }}
    />
  );
}
