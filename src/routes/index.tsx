import { createFileRoute } from "@tanstack/react-router";
import { Approach } from "@/components/home/Approach";
import { CaseKfc } from "@/components/home/CaseKfc";
import { EPlus } from "@/components/home/EPlus";
import { FinalCta, FounderStrip } from "@/components/home/FounderAndCta";
import { Hero } from "@/components/home/Hero";
import { Struggle } from "@/components/home/Struggle";
import { WhyExists } from "@/components/home/WhyExists";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "EhsanX | Building Leaders. Transforming Organizations.",
      "EhsanX partners with organizations to develop entrepreneurial leaders, strengthen institutions, and enable sustainable transformation.",
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhyExists />
      <Struggle />
      <EPlus />
      <Approach />
      <CaseKfc />
      <FounderStrip />
      <FinalCta />
    </>
  );
}
