import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/philosophy")({
  head: () => pageHead("Philosophy | EhsanX", "The E-Plus Model and what EhsanX believes about leadership, character and value creation.", "/philosophy"),
  component: PhilosophyPage,
});

function PhilosophyPage() {
  return <PagePlaceholder name="Philosophy" />;
}
