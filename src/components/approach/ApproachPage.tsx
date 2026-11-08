// Our Approach — "How does EhsanX put its beliefs into practice?"
// Teal, structured and process-led, with real programme photography. Content: src/data/approach.ts
// (sourced from the Company Profile) and the case studies in src/data/clientImpact.ts.
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, RefreshCw } from "lucide-react";
import kfcPhoto from "@/assets/impact/kfc-colour.webp";
import pciPhoto from "@/assets/impact/pci-colour.webp";
import { FinalCta } from "@/components/home/FounderAndCta";
import { container, Eyebrow, Reveal } from "@/components/advisory/PagePrimitives";
import { approach, type ApproachPhase, type ApproachStep } from "@/data/approach";
import { kfcCase, pciCase } from "@/data/clientImpact";
import { cn } from "@/lib/utils";

/** Stage colour by phase: navy for insight, teal for action, gold for reflection. */
const phaseColor: Record<ApproachPhase, { bar: string; border: string; numeral: string }> = {
  insight: { bar: "bg-navy", border: "border-navy", numeral: "text-navy/[0.14]" },
  action: { bar: "bg-teal", border: "border-teal", numeral: "text-teal/[0.18]" },
  reflection: { bar: "bg-gold", border: "border-gold", numeral: "text-gold/[0.45]" },
};
const phaseLabel = (phase: ApproachPhase) =>
  approach.method.phases.find((p) => p.id === phase)?.label ?? "";

const textLink =
  "group inline-flex items-center gap-2 font-display text-[15px] font-semibold underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

function Hero() {
  const { hero } = approach;
  return (
    <section className="relative overflow-hidden bg-teal text-paper">
      <div className="lg:grid lg:min-h-[max(80vh,640px)] lg:grid-cols-2">
        {/* Photo: under the navbar band on small screens; on large screens it starts below the
            navbar so the white navigation never sits on the bright photograph. */}
        <div className="relative pt-[88px] lg:order-2 lg:pt-32">
          <img
            src={hero.image.src}
            srcSet={hero.image.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover object-[30%_50%] lg:aspect-auto lg:h-full"
          />
        </div>
        <div className="flex items-end lg:order-1">
          <div className="w-full px-6 pb-16 pt-12 md:px-10 md:pb-20 lg:pb-24 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-16 lg:pt-44">
            <Eyebrow tone="teal">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-7 font-display text-[clamp(2.75rem,6.2vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.015em]">
              {hero.title}
            </h1>
            <p className="mt-8 max-w-[22ch] font-display text-[clamp(1.25rem,2.1vw,1.75rem)] font-light leading-[1.45] text-paper/90">
              {hero.line}
            </p>
            <ul className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/85">
              {hero.qualities.map((q, i) => (
                <li key={q} className="flex items-center gap-4">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { intro, bridge } = approach;
  return (
    <section aria-labelledby="approach-intro" className="bg-paper py-24 md:py-32">
      <div className={cn(container, "grid gap-14 lg:grid-cols-12 lg:gap-16")}>
        <Reveal className="lg:col-span-7">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h2 id="approach-intro" className="sr-only">
            {intro.eyebrow}
          </h2>
          <p className="mt-8 max-w-[40ch] font-display text-[clamp(1.25rem,1.9vw,1.5rem)] font-light leading-[1.6] text-navy">
            {intro.text}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:pt-14" delay={0.1}>
          <aside aria-label={bridge.eyebrow} className="border-l-2 border-navy bg-wash p-7 md:p-9">
            <Eyebrow>{bridge.eyebrow}</Eyebrow>
            <p className="mt-6 font-display text-[20px] font-semibold leading-[1.45] text-navy">
              {bridge.statement}
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-ink/80">{bridge.text}</p>
            <Link to={bridge.link.to} className={cn(textLink, "mt-6 text-teal")}>
              {bridge.link.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function MethodOverview() {
  const { method, steps } = approach;
  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="scroll-mt-24 bg-wash py-24 md:py-28"
    >
      <div className={container}>
        <Reveal>
          <Eyebrow>{method.eyebrow}</Eyebrow>
          <h2
            id="method-title"
            className="mt-6 max-w-[24ch] font-display text-[clamp(1.875rem,3.4vw,2.875rem)] font-bold leading-[1.15] text-navy"
          >
            {method.title}
          </h2>
        </Reveal>
        <Reveal className="mt-14">
          {/* Phase bar (large screens): groups the stages by colour. */}
          <div aria-hidden="true" className="hidden grid-cols-5 gap-6 md:grid">
            {method.phases.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-navy",
                  p.steps.length === 2 ? "col-span-2" : "col-span-1",
                )}
              >
                {p.label}
                <span className={cn("h-[3px] flex-1", phaseColor[p.id].bar)} />
              </div>
            ))}
          </div>
          <ol className="mt-8 grid gap-3 md:grid-cols-5 md:gap-6">
            {steps.map((s) => (
              <li key={s.id}>
                {/* Compact index row on small screens; full column with the purpose from md. */}
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "group flex h-full items-center gap-5 border-t-[3px] bg-paper px-5 py-4 transition-colors hover:bg-paper/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:flex-col md:items-start md:gap-0 md:p-7",
                    phaseColor[s.phase].border,
                  )}
                >
                  <span className="w-11 font-display text-[32px] font-light leading-none text-navy md:w-auto md:text-[44px]">
                    {s.number}
                  </span>
                  <span className="min-w-0 flex-1 md:mt-5 md:flex-none">
                    <span className="block font-display text-[17px] font-semibold leading-snug text-navy md:text-[19px]">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 md:hidden">
                      {phaseLabel(s.phase)}
                    </span>
                    <span className="mt-2 hidden text-[15px] leading-[1.6] text-ink/80 md:block">
                      {s.purpose}
                    </span>
                  </span>
                  <span aria-hidden="true" className="md:mt-auto md:pt-6">
                    <ArrowDown className="h-4 w-4 text-teal transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-3 font-display text-[14px] font-semibold text-navy">
            <RefreshCw aria-hidden="true" className="h-4 w-4 text-teal" />
            <span>
              {steps[4]?.number} {steps[4]?.title} <span aria-hidden="true">→</span>
              <span className="sr-only">leads back to</span> {steps[0]?.number} {steps[0]?.title}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Stage({ step }: { step: ApproachStep }) {
  const color = phaseColor[step.phase];
  return (
    <article
      id={step.id}
      aria-labelledby={`${step.id}-title`}
      className="scroll-mt-24 border-t border-navy/10 py-16 first:border-t-0 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
              <span aria-hidden="true" className={cn("h-[3px] w-8", color.bar)} />
              {phaseLabel(step.phase)}
            </p>
            <span
              aria-hidden="true"
              className={cn(
                "mt-4 block font-display text-[clamp(5.5rem,11vw,9.5rem)] font-light leading-[0.85]",
                color.numeral,
              )}
            >
              {step.number}
            </span>
            <h3
              id={`${step.id}-title`}
              className="-mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] text-navy md:-mt-5"
            >
              <span className="sr-only">{step.number} </span>
              {step.title}
            </h3>
            <p className="mt-5 max-w-[30ch] font-display text-[clamp(1.125rem,1.7vw,1.375rem)] font-light leading-[1.5] text-navy">
              {step.purpose}
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-16">
          <p className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-teal">
            What it involves
          </p>
          <div className="mt-5 space-y-5">
            {step.involves.map((p) => (
              <p key={p} className="text-[17px] leading-[1.75] text-ink/85">
                {p}
              </p>
            ))}
          </div>
          {step.list && (
            <ul aria-label={step.list.label} className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {step.list.items.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[1.55] text-ink/85">
                  <span
                    aria-hidden="true"
                    className={cn("mt-[0.7em] h-px w-4 shrink-0", color.bar)}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <a
            href={`#${approach.steps.find((s) => s.number === step.leadsTo.number)?.id ?? "method"}`}
            className={cn(
              "group mt-10 block border-l-2 bg-wash p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:p-7",
              color.border,
            )}
          >
            <span className="font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60">
              Leads to
            </span>
            <span className="mt-2 flex items-center gap-3 font-display text-[18px] font-semibold text-navy">
              {step.leadsTo.number} {step.leadsTo.title}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-teal transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </span>
            <span className="mt-2 block text-[15.5px] leading-[1.65] text-ink/75">
              {step.leadsTo.text}
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Stages() {
  return (
    <section aria-label={approach.method.stagesEyebrow} className="bg-paper pt-10 md:pt-16">
      <div className={container}>
        <Eyebrow>{approach.method.stagesEyebrow}</Eyebrow>
        {approach.steps.map((s) => (
          <Reveal key={s.id}>
            <Stage step={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Practice() {
  const { practice } = approach;
  const cases = [
    { data: kfcCase, photo: kfcPhoto },
    { data: pciCase, photo: pciPhoto },
  ];
  return (
    <section aria-labelledby="practice-title" className="bg-navy-deep py-24 text-paper md:py-32">
      <div className={container}>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="dark">{practice.eyebrow}</Eyebrow>
            <h2
              id="practice-title"
              className="mt-6 font-display text-[clamp(1.875rem,3.4vw,2.875rem)] font-bold leading-[1.15]"
            >
              {practice.title}
            </h2>
          </div>
          <Link to={practice.link.to} className={cn(textLink, "text-gold")}>
            {practice.link.label}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
          {cases.map(({ data, photo }, i) => (
            <Reveal key={data.id} delay={i * 0.08}>
              <article aria-labelledby={`practice-${data.id}`}>
                <img
                  src={photo}
                  alt={data.imageAlt}
                  width={1600}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="mt-7 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {data.eyebrow}
                </p>
                <h3
                  id={`practice-${data.id}`}
                  className="mt-3 font-display text-[22px] font-semibold leading-snug"
                >
                  {data.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-paper/85">
                  {data.learningByDoing}
                </p>
                <Link
                  to="/client-impact"
                  hash={data.id}
                  className={cn(textLink, "mt-6 text-paper")}
                >
                  Read the case study
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engagements() {
  const { engagements } = approach;
  return (
    <section aria-labelledby="engagements-title" className="bg-paper py-24 md:py-32">
      <div className={container}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{engagements.eyebrow}</Eyebrow>
            <h2
              id="engagements-title"
              className="mt-6 font-display text-[clamp(1.875rem,3.4vw,2.875rem)] font-bold leading-[1.15] text-navy"
            >
              {engagements.title}
            </h2>
          </div>
          <p className="max-w-[52ch] text-[17px] leading-[1.7] text-ink/80 lg:col-span-6">
            {engagements.intro}
          </p>
        </Reveal>
        <Reveal className="mt-16">
          <ol className="grid border-t-2 border-navy md:grid-cols-3">
            {engagements.items.map((e, i) => (
              <li
                key={e.name}
                className="relative border-b border-navy/10 py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0 lg:px-10"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-[13px] top-10 hidden h-6 w-6 items-center justify-center rounded-full bg-paper text-teal md:flex"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
                <span aria-hidden="true" className="font-display text-sm font-semibold text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[21px] font-bold leading-snug text-navy">
                  {e.name}
                </h3>
                <dl className="mt-6 space-y-4 text-[15.5px] leading-[1.6]">
                  <div>
                    <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                      For
                    </dt>
                    <dd className="mt-1 text-ink/85">{e.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                      Format
                    </dt>
                    <dd className="mt-1 text-ink/85">{e.format}</dd>
                  </div>
                </dl>
                <p className="mt-6 border-t border-navy/10 pt-5 text-[15.5px] leading-[1.6] text-navy">
                  {e.role}
                </p>
              </li>
            ))}
          </ol>
          <Link to={engagements.link.to} className={cn(textLink, "mt-10 text-teal")}>
            {engagements.link.label}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Difference() {
  const { difference } = approach;
  return (
    <section aria-labelledby="difference-title" className="bg-teal py-24 text-paper md:py-32">
      <div className={container}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow tone="teal">{difference.eyebrow}</Eyebrow>
            <h2
              id="difference-title"
              className="mt-6 font-display text-[clamp(1.875rem,3.4vw,2.875rem)] font-bold leading-[1.15]"
            >
              {difference.title}
            </h2>
          </div>
          <p className="max-w-[44ch] font-display text-[19px] font-light leading-[1.55] text-paper/90 lg:col-span-5">
            {difference.intro}
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <ul className="border-t border-paper/20">
            {difference.shifts.map((s) => (
              <li
                key={s.to}
                className="grid gap-2 border-b border-paper/20 py-6 md:grid-cols-[minmax(0,0.9fr)_40px_minmax(0,1.1fr)_minmax(0,1.5fr)] md:items-baseline md:gap-6 md:py-7"
              >
                <p className="font-display text-[17px] text-paper/85">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-paper/85">
                    From{" "}
                  </span>
                  {s.from}
                </p>
                <ArrowRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 self-center text-gold md:block"
                />
                <p className="font-display text-[20px] font-semibold text-paper">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                    To{" "}
                  </span>
                  {s.to}
                </p>
                <p className="text-[16px] leading-[1.6] text-paper/85">{s.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function WhyItWorks() {
  const { principle } = approach;
  return (
    <section aria-labelledby="principle-title" className="bg-paper py-24 md:py-32">
      <Reveal className={cn(container, "grid gap-10 lg:grid-cols-12 lg:gap-16")}>
        <div className="lg:col-span-6">
          <Eyebrow>{principle.eyebrow}</Eyebrow>
          <h2
            id="principle-title"
            className="mt-6 font-display text-[clamp(1.75rem,3.2vw,2.625rem)] font-light leading-[1.25] text-navy [text-wrap:balance]"
          >
            {principle.title}
          </h2>
        </div>
        <p className="text-[18px] leading-[1.75] text-ink/85 lg:col-span-6 lg:pt-12">
          {principle.copy}
        </p>
      </Reveal>
    </section>
  );
}

export function ApproachPage() {
  return (
    // `advisory-page` hides the standalone footer: FinalCta brings its own.
    <div className="advisory-page bg-paper text-ink">
      <Hero />
      <Intro />
      <MethodOverview />
      <Stages />
      <Practice />
      <Engagements />
      <Difference />
      <WhyItWorks />
      <FinalCta />
    </div>
  );
}
