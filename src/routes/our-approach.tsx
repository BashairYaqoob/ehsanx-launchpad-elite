import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/our-approach")({
  head: () => pageHead("Our Approach | EhsanX", "The EhsanX five-step method: Listen, Diagnose, Design, Implement, Reflect & Improve.", "/our-approach"),
  component: OurApproachPage,
});

function OurApproachPage() {
  return <PagePlaceholder name="Our Approach" />;
}
