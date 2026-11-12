import kfcBw from "@/assets/impact/kfc-bw.webp";
import kfcColour from "@/assets/impact/kfc-colour.webp";
import pciBw from "@/assets/impact/pci-bw.webp";
import pciColour from "@/assets/impact/pci-colour.webp";
import ajLogo from "@/assets/impact/aj-logo.webp";
import { ajCase, engagementIndex, kfcCase, pciCase, type Metric } from "@/data/clientImpact";
import { HorizontalCase, Panel } from "./HorizontalCase";
import { ImageHoverReveal } from "./ImageHoverReveal";
import {
  AreaGrid,
  CaseMeta,
  Kicker,
  RuleList,
  body,
  caseTitle,
  lead,
  quote,
} from "./CaseStudyParts";

// Each case study reads in the same order (overview, challenge, the work, impact, takeaway) so the
// three can be compared, but each is composed differently: KFC leads with its photograph and its
// reach, PCI with the departments the programme joined up, Ahmad Jamal with the dialogue itself.

const meta = (id: string) => engagementIndex.find((item) => item.id === id);

/** A figure set large: gold on the navy and teal panels, where it keeps its contrast. */
function Figure({ metric, size = "md" }: { metric: Metric; size?: "lg" | "md" }) {
  return (
    <div className="flex min-w-0 flex-col-reverse justify-end gap-2 border-t border-paper/25 pt-4">
      <dt className="font-[Inter] text-[15px] leading-[1.45] text-paper/90 hz:text-[clamp(14px,min(1.1vw,2.1vh),17px)]">
        {metric.label}
        {metric.note && (
          <span className="mt-1 block text-[13px] text-paper/75 hz:text-[clamp(12px,min(0.95vw,1.8vh),14px)]">
            {metric.note}
          </span>
        )}
      </dt>
      <dd
        className={`font-[Montserrat] font-bold leading-[0.95] tracking-[-0.02em] text-gold ${
          size === "lg"
            ? "text-[clamp(4rem,16vw,8.5rem)] hz:text-[min(9.5vw,17vh)]"
            : "text-[clamp(2.6rem,8vw,4rem)] hz:text-[min(4.2vw,8vh)]"
        }`}
      >
        {metric.value}
      </dd>
    </div>
  );
}

/** The work and what it produced, side by side on one colour panel. */
function PracticeNote({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <Kicker tone="paper">{title}</Kicker>
      <p className="mt-5 font-[Montserrat] text-[clamp(1.2rem,3.2vw,1.5rem)] font-medium leading-[1.4] text-paper hz:text-[clamp(17px,min(1.6vw,3vh),24px)]">
        {text}
      </p>
    </div>
  );
}

function Takeaway({
  label,
  text,
  tone = "navy",
}: {
  label: string;
  text: string;
  tone?: "navy" | "paper";
}) {
  return (
    <figure className="border-l-2 border-gold pl-6 md:pl-8">
      <figcaption
        className={`font-[Montserrat] text-[14px] font-semibold ${tone === "paper" ? "text-paper/85" : "text-teal"}`}
      >
        {label}
      </figcaption>
      <blockquote className={`mt-4 ${quote} ${tone === "paper" ? "text-paper" : "text-navy"}`}>
        “{text}”
      </blockquote>
    </figure>
  );
}

export function CaseStudyKfc() {
  const info = meta("kfc");
  const [rgms, cohorts, months, employees] = kfcCase.metrics;
  return (
    <HorizontalCase
      id={kfcCase.id}
      titleId="kfc-title"
      chapters={[
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "programme", label: "Programme" },
        { id: "impact", label: "Practice & impact" },
        { id: "takeaway", label: "Takeaway" },
      ]}
    >
      <Panel chapter="overview" className="bg-white hz:w-[88vw]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-[4vw]">
          <div>
            <CaseMeta name={info?.name ?? "KFC Pakistan"} kind={info?.descriptor ?? ""} />
            <h2 id="kfc-title" className={`${caseTitle} mt-6 text-navy`}>
              {kfcCase.title}
            </h2>
          </div>
          <ImageHoverReveal
            bw={kfcBw}
            colour={kfcColour}
            alt={kfcCase.imageAlt}
            width={1600}
            height={1200}
            className="rounded-[20px]"
          />
        </div>
      </Panel>

      <Panel chapter="challenge" className="bg-white hz:w-[60vw] hz:border-l hz:border-navy/10">
        <Kicker>The challenge</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-[3vw]">
          <div className="space-y-6">
            <p className={`${lead} text-navy`}>{kfcCase.challenge[0]}</p>
            <p className={`${body} text-ink`}>{kfcCase.challenge[1]}</p>
          </div>
          <dl className="bg-teal-wash p-6 hz:p-[2.2vw]">
            <dd className="font-[Montserrat] text-[clamp(2.6rem,8vw,4rem)] font-bold leading-none tracking-[-0.02em] text-teal hz:text-[min(4.4vw,8.4vh)]">
              {kfcCase.teamSize.value}
            </dd>
            <dt className="mt-3 font-[Inter] text-[15px] leading-[1.45] text-ink hz:text-[clamp(14px,min(1.1vw,2.1vh),17px)]">
              {kfcCase.teamSize.label}
              <span className="block text-[13px] text-ink/70">{kfcCase.teamSize.note}</span>
            </dt>
          </dl>
        </div>
      </Panel>

      <Panel chapter="programme" className="bg-teal-wash hz:w-[94vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[5vw]">
          <div>
            <Kicker>The programme</Kicker>
            <p className={`${lead} mt-6 max-w-[34ch] text-navy`}>{kfcCase.programme}</p>
            <h3 className="mt-10 font-[Inter] text-[15px] font-semibold text-ink hz:mt-[5vh]">
              Three regional cohorts
            </h3>
            <ul className="mt-3 border-t border-navy/20">
              {kfcCase.cities.map((city) => (
                <li
                  key={city}
                  className="border-b border-navy/20 py-2 font-[Montserrat] text-[clamp(2rem,7vw,3rem)] font-bold leading-[1.1] tracking-[-0.015em] text-navy hz:py-[0.9vh] hz:text-[min(3.4vw,6.4vh)]"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:self-center">
            <h3 className="font-[Montserrat] text-[18px] font-semibold text-navy hz:text-[clamp(16px,min(1.35vw,2.6vh),20px)]">
              {kfcCase.learningAreasLabel}
            </h3>
            <div className="mt-4">
              <AreaGrid items={kfcCase.learningAreas} />
            </div>
          </div>
        </div>
      </Panel>

      <Panel chapter="impact" className="bg-navy-deep text-paper hz:w-[92vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:items-center lg:gap-[5vw]">
          <PracticeNote title="Learning by doing" text={kfcCase.learningByDoing} />
          <div>
            <Kicker tone="paper">Impact snapshot</Kicker>
            <dl className="mt-6 grid grid-cols-1 gap-8 hz:gap-[3vh]">
              {employees && <Figure metric={employees} size="lg" />}
              <div className="grid grid-cols-3 gap-5 lg:gap-8">
                {[rgms, cohorts, months].map((m) => m && <Figure key={m.label} metric={m} />)}
              </div>
            </dl>
          </div>
        </div>
      </Panel>

      <Panel chapter="takeaway" className="bg-white hz:w-[78vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-[5vw]">
          <Takeaway label={kfcCase.takeawayLabel} text={kfcCase.takeaway} />
          <div>
            <h3 className="font-[Montserrat] text-[18px] font-semibold text-navy hz:text-[clamp(16px,min(1.35vw,2.6vh),20px)]">
              Why it worked
            </h3>
            <div className="mt-5">
              <RuleList items={kfcCase.whyItWorked} />
            </div>
          </div>
        </div>
      </Panel>
    </HorizontalCase>
  );
}

// Filenames were misleading: "PCI_-_coloured" is the black-and-white frame, "PCI" is colour.
export function CaseStudyPci() {
  const info = meta("pci");
  const [managers, departments, industry, approach] = pciCase.metrics;
  return (
    <HorizontalCase
      id={pciCase.id}
      titleId="pci-title"
      chapters={[
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "programme", label: "Programme" },
        { id: "learning", label: "Learning areas" },
        { id: "impact", label: "Practice & impact" },
        { id: "takeaway", label: "Takeaway" },
      ]}
    >
      <Panel chapter="overview" className="bg-wash hz:w-[86vw]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-[4vw]">
          <div className="lg:order-2">
            <CaseMeta name={info?.name ?? "PCI Automotive"} kind={info?.descriptor ?? ""} />
            <h2 id="pci-title" className={`${caseTitle} mt-6 text-navy`}>
              {pciCase.title}
            </h2>
          </div>
          <ImageHoverReveal
            bw={pciBw}
            colour={pciColour}
            alt={pciCase.imageAlt}
            width={1600}
            height={1200}
            className="rounded-[20px] lg:order-1"
          />
        </div>
      </Panel>

      <Panel chapter="challenge" className="bg-wash hz:w-[62vw]">
        <Kicker>The challenge</Kicker>
        <p className={`${lead} mt-6 max-w-[40ch] text-navy`}>{pciCase.challenge[0]}</p>
        <p className={`${body} mt-8 border-l-2 border-teal pl-6 text-ink lg:ml-[18%]`}>
          {pciCase.challenge[1]}
        </p>
      </Panel>

      <Panel chapter="programme" className="bg-white hz:w-[86vw]">
        <Kicker>The programme</Kicker>
        <p className={`${lead} mt-6 max-w-[42ch] text-navy`}>{pciCase.programme}</p>
        <h3 className="mt-12 font-[Inter] text-[15px] font-semibold text-ink hz:mt-[7vh]">
          The seven departments
        </h3>
        {/* One line runs through every department: the programme worked across them, not within one. */}
        <ol className="relative mt-6 grid gap-4 border-l-2 border-teal pl-6 lg:grid-cols-7 lg:gap-3 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6">
          {pciCase.departments.map((department) => (
            <li
              key={department}
              className="relative font-[Montserrat] text-[17px] font-semibold leading-[1.25] text-navy hz:text-[clamp(15px,min(1.3vw,2.5vh),19px)]"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-[0.35em] h-3 w-3 rounded-full border-2 border-teal bg-white lg:-top-[31px] lg:left-0"
              />
              {department}
            </li>
          ))}
        </ol>
      </Panel>

      <Panel chapter="learning" className="bg-teal-wash hz:w-[50vw]">
        <h3 className="font-[Montserrat] text-[18px] font-semibold text-navy hz:text-[clamp(16px,min(1.35vw,2.6vh),20px)]">
          {pciCase.learningAreasLabel}
        </h3>
        <div className="mt-4 max-w-[640px]">
          <AreaGrid items={pciCase.learningAreas} columns={1} />
        </div>
      </Panel>

      <Panel chapter="impact" className="bg-teal text-paper hz:w-[86vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:items-center lg:gap-[5vw]">
          <PracticeNote title="Learning by doing" text={pciCase.learningByDoing} />
          <div>
            <Kicker tone="paper">Impact snapshot</Kicker>
            <dl className="mt-6 grid grid-cols-2 gap-6 lg:gap-8">
              {managers && <Figure metric={managers} size="lg" />}
              {departments && <Figure metric={departments} size="lg" />}
            </dl>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-8 hz:mt-[4vh]">
              {[
                { term: "Industry", metric: industry },
                { term: "Approach", metric: approach },
              ].map(
                ({ term, metric }) =>
                  metric && (
                    <div key={term} className="border-t border-paper/25 pt-4">
                      <dt className="font-[Inter] text-[14px] text-paper/80">{term}</dt>
                      <dd className="mt-2 font-[Montserrat] text-[clamp(1.2rem,3vw,1.5rem)] font-semibold leading-[1.3] text-paper hz:text-[clamp(16px,min(1.5vw,2.9vh),22px)]">
                        {metric.value} {metric.label}
                      </dd>
                    </div>
                  ),
              )}
            </dl>
          </div>
        </div>
      </Panel>

      <Panel chapter="takeaway" className="bg-white hz:w-[80vw]">
        <Takeaway label={pciCase.takeawayLabel} text={pciCase.takeaway} />
        <h3 className="mt-12 font-[Montserrat] text-[18px] font-semibold text-navy hz:mt-[6vh] hz:text-[clamp(16px,min(1.35vw,2.6vh),20px)]">
          Why it worked
        </h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {pciCase.whyItWorked.map((item) => (
            <li
              key={item}
              className="border-t-2 border-gold pt-4 font-[Inter] text-[16px] leading-[1.55] text-ink hz:text-[clamp(14px,min(1.15vw,2.2vh),18px)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Panel>
    </HorizontalCase>
  );
}

// Qualitative only: Ahmad Jamal has no figures, so the dialogue itself carries the case.
export function CaseStudyAhmadJamal() {
  const info = meta("ahmad-jamal");
  return (
    <HorizontalCase
      id={ajCase.id}
      titleId="aj-title"
      chapters={[
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "engagement", label: "Engagement" },
        { id: "dialogue", label: "The dialogue" },
        { id: "takeaway", label: "Takeaway" },
      ]}
    >
      <Panel chapter="overview" className="bg-white hz:w-[80vw]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-center lg:gap-[5vw]">
          <img
            src={ajLogo}
            alt="Ahmad Jamal Textile Processing logo"
            width={690}
            height={362}
            loading="lazy"
            decoding="async"
            className="h-auto w-[200px] object-contain md:w-[260px] lg:w-full lg:max-w-[340px]"
          />
          <div className="lg:border-l lg:border-navy/15 lg:pl-[4vw]">
            <CaseMeta
              name={info?.name ?? "Ahmad Jamal Textile Processing"}
              kind={info?.descriptor ?? ""}
            />
            <h2 id="aj-title" className={`${caseTitle} mt-6 text-navy`}>
              {ajCase.title}
            </h2>
          </div>
        </div>
      </Panel>

      <Panel chapter="challenge" className="bg-wash hz:w-[56vw]">
        <Kicker>The challenge</Kicker>
        <p className={`${lead} mt-6 max-w-[36ch] text-navy`}>{ajCase.challenge}</p>
      </Panel>

      <Panel chapter="engagement" className="bg-white hz:w-[60vw]">
        <Kicker>The engagement</Kicker>
        <p className={`${lead} mt-6 max-w-[34ch] text-navy`}>{ajCase.engagement[0]}</p>
        <p className={`${body} mt-8 text-ink`}>{ajCase.engagement[1]}</p>
      </Panel>

      <Panel chapter="dialogue" className="bg-navy-deep text-paper hz:w-[84vw]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-center lg:gap-[5vw]">
          <div>
            <Kicker tone="paper">Learning through dialogue</Kicker>
            <p className="mt-6 max-w-[28ch] font-[Inter] text-[18px] leading-[1.6] text-paper/90 hz:text-[clamp(16px,min(1.35vw,2.6vh),20px)]">
              {ajCase.dialogueIntro}
            </p>
          </div>
          <ul className="border-t border-paper/20">
            {ajCase.dialogueTopics.map((topic) => (
              <li
                key={topic}
                className="border-b border-paper/20 py-3 font-[Montserrat] text-[clamp(1.9rem,7vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.015em] text-paper hz:py-[1.3vh] hz:text-[min(3.6vw,7vh)]"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel chapter="takeaway" className="bg-teal text-paper hz:w-[76vw]">
        <div className="max-w-[60rem]">
          <Takeaway label={ajCase.takeawayLabel} text={ajCase.takeaway} tone="paper" />
        </div>
      </Panel>
    </HorizontalCase>
  );
}
