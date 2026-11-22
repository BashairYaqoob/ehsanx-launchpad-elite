import { createFileRoute } from "@tanstack/react-router";
import shahid from "@/assets/team/shahid-portrait.webp";
import ambreen from "@/assets/team/ambreen-portrait.webp";
import { DirectorProfile } from "@/components/team/DirectorProfile";
import { FounderProfile } from "@/components/team/FounderProfile";
import { FinalCta } from "@/components/home/FounderAndCta";
import { TransformationHero } from "@/components/TransformationHero";
import { director, founder, teamHero } from "@/data/team";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/meet-the-team")({
  head: () => pageHead("Meet the Team | EhsanX", "EhsanX leadership and professional experience: Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan.", "/meet-the-team"),
  component: MeetTheTeamPage,
});

function TeamHero() {
  return (
    <TransformationHero
      eyebrow={teamHero.eyebrow}
      meta={teamHero.meta}
      title={teamHero.title}
      subtitle={teamHero.intro}
    />
  );
}

function MeetTheTeamPage() {
  return (
    <div className="overflow-x-clip">
      <TeamHero />
      <FounderProfile leader={founder} portrait={shahid} />
      <DirectorProfile leader={director} portrait={ambreen} />
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
