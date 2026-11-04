import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/impact/hero.webp.asset.json";
import { EngagementIndex } from "@/components/impact/EngagementIndex";
import { CaseStudyAhmadJamal, CaseStudyKfc, CaseStudyPci } from "@/components/impact/CaseStudies";
import { FinalCta } from "@/components/home/FounderAndCta";
import { impactHero } from "@/data/clientImpactDetailed";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/client-impact")({
  head: () => pageHead("Client Impact | EhsanX", "EhsanX client engagements and organizational impact with KFC Pakistan, PCI Automotive and Ahmad Jamal Textile Processing.", "/client-impact"),
  component: ClientImpactPage,
});

// Same responsive hero treatment as the Solutions page; no animation.
function Hero() {
  return (
    <section className="relative bg-navy-deep min-[900px]:flex min-[900px]:min-h-[max(85vh,600px)] min-[900px]:items-center">
      <div className="pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-0 min-[900px]:pt-0">
        <img
          src={heroImg.url}
          alt={impactHero.alt}
          width={1800}
          height={1200}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[50%_50%] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:object-[50%_55%]"
        />
        <div aria-hidden="true" className="absolute inset-0 hidden min-[900px]:block" style={{ background: "linear-gradient(90deg, rgba(8,22,40,0.88) 0%, rgba(8,22,40,0.6) 40%, rgba(8,22,40,0) 70%)" }} />
      </div>
      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-12 md:px-10 min-[900px]:pb-20 min-[900px]:pt-[calc(5rem+48px)]">
        <div className="max-w-[620px]">
          <p className="font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">{impactHero.eyebrow}</p>
          <h1 className="mt-5 font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-white">{impactHero.title}</h1>
          <p className="mt-6 max-w-[62ch] font-[Inter] text-[17px] leading-[1.7] text-white/90">{impactHero.intro}</p>
        </div>
      </div>
    </section>
  );
}

function ClientImpactPage() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <EngagementIndex />
      <CaseStudyKfc />
      <CaseStudyPci />
      <CaseStudyAhmadJamal />
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
