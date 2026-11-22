import { createFileRoute } from "@tanstack/react-router";
import { TransformationHero } from "@/components/TransformationHero";
import { EngagementIndex } from "@/components/impact/EngagementIndex";
import { CaseRail } from "@/components/impact/CaseRail";
import { CaseStudyAhmadJamal, CaseStudyKfc, CaseStudyPci } from "@/components/impact/CaseStudies";
import { FinalCta } from "@/components/home/FounderAndCta";
import { impactHero } from "@/data/clientImpact";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/client-impact")({
  head: () => pageHead("Client Impact | EhsanX", "EhsanX client engagements and organizational impact with KFC Pakistan, PCI Automotive and Ahmad Jamal Textile Processing.", "/client-impact"),
  component: ClientImpactPage,
});

function Hero() {
  return (
    <TransformationHero
      eyebrow={impactHero.eyebrow}
      meta={impactHero.meta}
      title={impactHero.title}
      subtitle={impactHero.intro}
    />
  );
}

function ClientImpactPage() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <EngagementIndex />
      <div data-case-region>
        <CaseStudyKfc />
        <CaseStudyPci />
        <CaseStudyAhmadJamal />
      </div>
      <CaseRail />
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
