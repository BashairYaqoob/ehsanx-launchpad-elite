import img02 from "@/assets/solutions/solution-02.jpg";
import { FinalCta } from "@/components/home/FounderAndCta";
import { TransformationHero } from "@/components/TransformationHero";
import { images } from "@/lib/image-assets";
import {
  outcomes,
  solution01,
  solution02,
  solution03,
  solutionsHero,
  whyPartner,
} from "@/data/solutions";

// The Solutions page presents three offerings that form one progression (a dialogue can start the
// work, a programme builds capability over months, a partnership sustains it). Each solution keeps
// the same reading order (what it is, what it covers, how it works) with its own composition and
// one colour moment. Sections render in place: no scroll-triggered entrances, so no blank bands.

const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
const h2 =
  "font-[Montserrat] text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-[1.12] tracking-[-0.015em] [text-wrap:balance]";
const body = "max-w-[62ch] font-[Inter] text-[17px] leading-[1.7]";
const lead =
  "max-w-[40ch] font-[Montserrat] text-[clamp(1.25rem,2.1vw,1.6rem)] font-medium leading-[1.4] [text-wrap:pretty]";
const listHeading = "font-[Montserrat] text-[19px] font-bold leading-[1.3]";

const stripColon = (text: string) => text.replace(/:\s*$/, "");

type Solution = typeof solution01;

function Paras({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className="space-y-5">
      {items.map((p) => (
        <p key={p} className={`${body} ${className}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

/** Position in the progression and the offering's name, above its headline. */
function SolutionHead({ s, tone = "light" }: { s: Solution; tone?: "light" | "dark" }) {
  return (
    <>
      <p
        className={`flex items-center gap-3 font-[Montserrat] text-[15px] font-semibold ${tone === "dark" ? "text-paper" : "text-teal"}`}
      >
        <span aria-hidden="true" className="text-gold">
          {s.number}
        </span>
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
        {s.name}
      </p>
      <h2
        id={`${s.id}-title`}
        className={`${h2} mt-5 ${tone === "dark" ? "text-paper" : "text-navy"}`}
      >
        {s.title}
      </h2>
    </>
  );
}

/** What a solution covers: a heading beside the items, set as ruled rows in two or three columns. */
function Coverage({ label, items, columns }: { label: string; items: string[]; columns: 2 | 3 }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
      <h3 className={`${listHeading} text-navy lg:col-span-4`}>{stripColon(label)}</h3>
      <ul
        className={`grid grid-cols-1 gap-x-10 border-t border-navy/15 sm:grid-cols-2 ${columns === 3 ? "lg:col-span-12 lg:grid-cols-3" : "lg:col-span-8"}`}
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-b border-navy/15 py-4 font-[Montserrat] text-[17px] font-semibold leading-[1.35] text-navy"
          >
            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Photo({
  src,
  srcSet,
  alt,
  width,
  height,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-[20px] object-cover ${className}`}
    />
  );
}

function Hero() {
  return (
    <TransformationHero
      eyebrow={solutionsHero.eyebrow}
      meta={solutionsHero.meta}
      title={solutionsHero.title}
      subtitle={solutionsHero.intro}
    />
  );
}

function Solution01() {
  const s = solution01;
  const photo = images.solutions_dialogue;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="scroll-mt-20 bg-paper py-20 lg:py-28"
    >
      <div className={`${container} space-y-16 lg:space-y-20`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SolutionHead s={s} />
            <div className="mt-8">
              <Paras items={s.description} className="text-ink" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:pt-12">
            <Photo
              src={photo.src}
              srcSet={photo.srcSet}
              alt={s.alt}
              width={photo.width}
              height={photo.height}
              className="aspect-[3/2]"
            />
          </div>
        </div>
        <Coverage label={s.listLabel} items={s.list} columns={2} />
        <HowPanel label={s.howLabel} items={s.how} />
      </div>
    </section>
  );
}

/** "How it works" on a light panel: the label beside the explanation. */
function HowPanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid gap-6 rounded-[20px] bg-teal-wash p-7 md:p-12 lg:grid-cols-12 lg:gap-12">
      <h3 className={`${listHeading} text-teal lg:col-span-4`}>{stripColon(label)}</h3>
      <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:col-span-8">
        {items.map((p) => (
          <p key={p} className={`${body} text-ink`}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function Solution02() {
  const s = solution02;
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-20">
      <div className="bg-teal-wash py-20 lg:py-28">
        <div className={`${container} space-y-16 lg:space-y-20`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <Photo
              src={img02}
              alt={s.alt}
              width={1536}
              height={1024}
              className="aspect-[3/2] lg:col-span-5 lg:aspect-[4/5]"
            />
            <div className="lg:col-span-7 lg:pl-4">
              <SolutionHead s={s} />
              <div className="mt-8">
                <Paras items={s.description} className="text-ink" />
              </div>
            </div>
          </div>
          <Coverage label={s.listLabel} items={s.list} columns={2} />
        </div>
      </div>

      {/* The programme's rhythm is the point of this solution, so "How it works" is its colour band. */}
      <div className="bg-teal py-16 text-paper md:py-20">
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-4">
            <h3 className="font-[Montserrat] text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-[1.15]">
              {stripColon(s.howLabel)}
            </h3>
            <p className="mt-8 font-[Montserrat] text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.02em] text-gold">
              {s.duration.value}
            </p>
            <p className="mt-2 font-[Inter] text-[16px] text-paper/85">{s.duration.label}</p>
          </div>
          <ol className="lg:col-span-8">
            {s.how.map((p) => (
              <li
                key={p}
                className="border-t border-paper/25 py-6 first:border-t-2 first:border-gold/80 first:pt-5 last:pb-0"
              >
                <p className="font-[Inter] text-[17px] leading-[1.7] text-paper/90">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Solution03() {
  const s = solution03;
  const photo = images.solutions_partnership;
  const [opening, ...rest] = s.description;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="scroll-mt-20 bg-paper py-20 lg:py-28"
    >
      <div className={`${container} space-y-16 lg:space-y-20`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
            <Photo
              src={photo.src}
              srcSet={photo.srcSet}
              alt={s.alt}
              width={photo.width}
              height={photo.height}
              className="aspect-[4/3] object-[50%_62%] lg:aspect-square"
            />
          </div>
          <div className="lg:col-span-6">
            <SolutionHead s={s} />
            {opening && <p className={`${lead} mt-8 text-navy`}>{opening}</p>}
            <div className="mt-6">
              <Paras items={rest} className="text-ink" />
            </div>
          </div>
        </div>
        <Coverage label={s.listLabel} items={s.list} columns={3} />
        <div className="rounded-[20px] bg-navy p-7 text-paper md:p-12">
          <h3 className={`${listHeading} text-paper`}>{stripColon(s.howLabel)}</h3>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {s.how.map((p) => (
              <p
                key={p}
                className="border-t border-paper/25 pt-5 font-[Inter] text-[17px] leading-[1.7] text-paper/90"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  return (
    <section aria-labelledby="why-title" className="bg-navy-deep py-20 text-paper lg:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-4">
          <span aria-hidden="true" className="block h-[3px] w-12 bg-gold" />
          <h2 id="why-title" className={`${h2} mt-6 text-paper`}>
            {whyPartner.title}
          </h2>
        </div>
        <ul className="border-t border-paper/20 lg:col-span-8">
          {whyPartner.rows.map((row) => (
            <li
              key={row.title}
              className="grid gap-2 border-b border-paper/20 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8 md:py-7"
            >
              <h3 className="font-[Montserrat] text-[19px] font-semibold leading-[1.35] text-paper">
                {row.title}
              </h3>
              <p className="font-[Inter] text-[17px] leading-[1.65] text-paper/80">{row.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="bg-paper py-20 lg:py-28">
      <div className={container}>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="outcomes-title" className={`${h2} text-navy lg:col-span-5`}>
            {outcomes.title}
          </h2>
          <p className={`${body} text-ink lg:col-span-7`}>{outcomes.intro}</p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {outcomes.items.map((item) => (
            <li key={item} className="border-t-2 border-teal py-6">
              <span className="block font-[Montserrat] text-[19px] font-semibold leading-[1.35] text-navy">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SolutionsPageContent() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Solution01 />
      <Solution02 />
      <Solution03 />
      <WhyPartner />
      <Outcomes />
      {/* Shared closing CTA + footer; the marker hides the standalone footer like Philosophy/Our Approach. */}
      <span aria-hidden="true" className="advisory-page hidden" />
      <FinalCta />
    </div>
  );
}
