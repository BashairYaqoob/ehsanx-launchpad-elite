import { createFileRoute } from "@tanstack/react-router";
import shahid from "@/assets/team/shahid-portrait.webp.asset.json";
import ambreen from "@/assets/team/ambreen-portrait.webp.asset.json";
import hero640 from "@/assets/team/meet-the-team-hero-640.webp.asset.json";
import hero1280 from "@/assets/team/meet-the-team-hero-1280.webp.asset.json";
import hero1672 from "@/assets/team/meet-the-team-hero-1672.webp.asset.json";
import { DirectorProfile, FounderProfile } from "@/components/team/LeaderProfile";
import { FinalCta } from "@/components/home/FounderAndCta";
import { director, founder, teamHero } from "@/data/team";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/meet-the-team")({
  head: () => pageHead("Meet the Team | EhsanX", "EhsanX leadership and professional experience: Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan.", "/meet-the-team"),
  component: MeetTheTeamPage,
});

function TeamHero() {
  return (
    <section className="relative bg-navy-deep min-[900px]:flex min-[900px]:min-h-[max(85vh,600px)] min-[900px]:items-center">
      <div className="pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-0 min-[900px]:pt-0">
        <img
          src={hero1672.url}
          srcSet={`${hero640.url} 640w, ${hero1280.url} 1280w, ${hero1672.url} 1672w`}
          sizes="100vw"
          alt={teamHero.alt}
          width={1672}
          height={941}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[68%_50%] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:object-[50%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden min-[900px]:block"
          style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--navy-deep) 96%, transparent) 0%, color-mix(in srgb, var(--navy-deep) 82%, transparent) 36%, color-mix(in srgb, var(--navy-deep) 28%, transparent) 63%, transparent 80%)" }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10 md:py-12 min-[900px]:pb-20 min-[900px]:pt-[calc(5rem+48px)]">
        <div className="max-w-[620px]">
          <p className="font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">{teamHero.eyebrow}</p>
          <h1 className="mt-5 font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-paper [text-wrap:balance]">{teamHero.title}</h1>
          <div aria-hidden="true" className="mt-7 h-px w-16 bg-gold" />
          <p className="mt-7 max-w-[62ch] font-[Inter] text-[17px] leading-[1.7] text-paper/90">{teamHero.intro}</p>
        </div>
      </div>
    </section>
  );
}

function MeetTheTeamPage() {
  return (
    <div className="overflow-x-clip">
      <TeamHero />
      <FounderProfile leader={founder} portrait={shahid.url} />
      <DirectorProfile leader={director} portrait={ambreen.url} />
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
