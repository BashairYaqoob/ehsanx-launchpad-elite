import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/image-assets";
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

// Same responsive hero treatment as the Solutions page; no animation.
function Hero() {
  return (
    <section className="relative bg-navy-deep min-[900px]:flex min-[900px]:min-h-[max(85vh,600px)] min-[900px]:items-center">
      {/* From 900px the photo starts 40% in and fades out of the navy, keeping the cohort clear of the text. */}
      <div className="pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:left-[40%] min-[900px]:right-0 min-[900px]:pt-0">
        <img
          src={images.impact_cohort.src}
          srcSet={images.impact_cohort.srcSet}
          sizes="100vw"
          alt={impactHero.alt}
          width={images.impact_cohort.width}
          height={images.impact_cohort.height}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[50%_45%] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:object-[50%_40%]"
        />
        <div aria-hidden="true" className="absolute inset-0 hidden min-[900px]:block" style={{ background: "linear-gradient(90deg, #1f2e45 0%, rgba(31,46,69,0.7) 22%, rgba(31,46,69,0) 55%), linear-gradient(180deg, rgba(31,46,69,0.55) 0%, rgba(31,46,69,0) 22%)" }} />
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
