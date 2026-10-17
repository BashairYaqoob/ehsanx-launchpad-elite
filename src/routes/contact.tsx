import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Contact | EhsanX", "Start a conversation with EhsanX via WhatsApp or email.", "/contact"),
  component: ContactPage,
});

function ContactPage() {
  return <PagePlaceholder name="Contact" />;
}
