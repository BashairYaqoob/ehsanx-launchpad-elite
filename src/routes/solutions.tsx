import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/solutions")({
  head: () => pageHead("Solutions | EhsanX", "EhsanX leadership development, capability-building and organizational transformation offerings.", "/solutions"),
  component: SolutionsPage,
});

function SolutionsPage() {
  return <PagePlaceholder name="Solutions" />;
}
