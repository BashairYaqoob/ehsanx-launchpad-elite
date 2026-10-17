import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/client-impact")({
  head: () => pageHead("Client Impact | EhsanX", "Case studies of EhsanX engagements with organizations across Pakistan.", "/client-impact"),
  component: ClientImpactPage,
});

function ClientImpactPage() {
  return <PagePlaceholder name="Client Impact" />;
}
