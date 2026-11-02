import { createFileRoute } from "@tanstack/react-router";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsOfferings } from "@/components/solutions/SolutionsOfferings";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/solutions")({
  head: () => pageHead("Solutions | EhsanX", "EhsanX leadership development, capability-building and organizational transformation offerings.", "/solutions"),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsOfferings />
    </>
  );
}
