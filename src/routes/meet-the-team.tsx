import { createFileRoute } from "@tanstack/react-router";
import shahid from "@/assets/team/shahid-portrait.webp.asset.json";
import ambreen from "@/assets/team/ambreen-portrait.webp.asset.json";
import { LeaderProfile } from "@/components/team/LeaderProfile";
import { FinalCta } from "@/components/home/FounderAndCta";
import { director, founder, teamHero } from "@/data/team";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/meet-the-team")({
  head: () => pageHead("Meet the Team | EhsanX", "EhsanX leadership and professional experience: Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan.", "/meet-the-team"),
  component: MeetTheTeamPage,
});

function MeetTheTeamPage() {
  return (
    <div className="overflow-x-clip">
      <div aria-hidden="true" className="h-20 bg-navy-deep" />
      <section className="bg-white pb-12 pt-14 md:pb-16 md:pt-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          <p className="font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-teal">{teamHero.eyebrow}</p>
          <h1 className="mt-5 max-w-[22ch] font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-navy [text-wrap:balance]">{teamHero.title}</h1>
          <div aria-hidden="true" className="mt-8 h-px w-16 bg-gold" />
          <p className="mt-8 max-w-[62ch] font-[Inter] text-[18px] leading-[1.7] text-ink">{teamHero.intro}</p>
        </div>
      </section>
      <LeaderProfile leader={founder} portrait={shahid.url} tone="wash" />
      <LeaderProfile leader={director} portrait={ambreen.url} tone="white" reverse />
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
