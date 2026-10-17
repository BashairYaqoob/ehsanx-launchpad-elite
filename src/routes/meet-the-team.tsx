import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/meet-the-team")({
  head: () => pageHead("Meet the Team | EhsanX", "The people and origin story behind EhsanX.", "/meet-the-team"),
  component: MeettheTeamPage,
});

function MeettheTeamPage() {
  return <PagePlaceholder name="Meet the Team" />;
}
