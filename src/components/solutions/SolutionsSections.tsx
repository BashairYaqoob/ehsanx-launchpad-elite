import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/solutions/hero.jpg.asset.json";
import img01 from "@/assets/solutions/solution-01.jpg.asset.json";
import img02 from "@/assets/solutions/solution-02.jpg.asset.json";
import img03 from "@/assets/solutions/solution-03.jpg.asset.json";
import { LearningCycle } from "./LearningCycle";
import { FeatureList } from "./FeatureList";
import { learningCycleStages, outcomes, solution01, solution02, solution03, solutionsHero, whyPartner } from "@/data/solutions";

const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
const h2 = "font-[Montserrat] text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.15] text-navy";
const eyebrow = "font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal md:text-[13px]";
const body = "max-w-[62ch] font-[Inter] text-[17px] leading-[1.7] text-[#0D0D0D]";
const label = "mb-4 font-[Montserrat] text-[17px] font-semibold text-navy";
const numeral = "block font-[Montserrat] text-[clamp(5rem,11vw,9rem)] font-bold leading-none text-gold";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <section className={className}>{children}</section>;
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function Paras({ items }: { items: string[] }) {
  return <div className="space-y-5">{items.map((p) => <p key={p} className={body}>{p}</p>)}</div>;
}

function HowItWorks({ labelText, items, cols }: { labelText: string; items: string[]; cols: 2 | 3 }) {
  return (
    <div className="pt-16">
      <div aria-hidden="true" className="h-px w-full bg-gold/60" />
      <h3 className={`${h2} mt-10`}>{labelText}</h3>
      <div className={`mt-8 grid grid-cols-1 gap-6 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} md:gap-10`}>{items.map((p) => <p key={p} className={body}>{p}</p>)}</div>
    </div>
  );
}

function Img({ src, alt, className, ratio }: { src: string; alt: string; className?: string; ratio: string }) {
  return <img src={src} alt={alt} width={1536} height={1024} loading="lazy" decoding="async" className={`w-full object-cover ${ratio} ${className ?? ""}`} />;
}

function Connector() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 h-0 w-full">
      <span className="absolute left-1/2 top-[-32px] h-16 w-[1.5px] -translate-x-1/2 bg-gold" />
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-navy-deep min-[900px]:flex min-[900px]:min-h-[max(85vh,600px)] min-[900px]:items-center">
      <div className="pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-0 min-[900px]:pt-0">
        <img
          src={heroImg.url}
          alt={solutionsHero.alt}
          width={1536}
          height={1024}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[72%_50%] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:object-[70%_40%]"
        />
        <div aria-hidden="true" className="absolute inset-0 hidden min-[900px]:block" style={{ background: "linear-gradient(90deg, rgba(8,22,40,0.88) 0%, rgba(8,22,40,0.6) 40%, rgba(8,22,40,0) 70%)" }} />
      </div>
      <div className={`${container} relative py-12 min-[900px]:pb-20 min-[900px]:pt-[calc(5rem+48px)]`}>
        <div className="max-w-[620px]">
          <p className="font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">{solutionsHero.eyebrow}</p>
          <h1 className="mt-5 font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-white">{solutionsHero.title}</h1>
          <div className="mt-6 space-y-4">
            {solutionsHero.paragraphs.map((p) => <p key={p} className="max-w-[62ch] font-[Inter] text-[17px] leading-[1.7] text-white/90">{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution01() {
  const s = solution01;
  return (
    <Reveal className="bg-white py-20 lg:py-28">
      <div className={`${container} grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12`}>
        <div className="lg:col-span-7">
          <span aria-hidden="true" className={numeral}>{s.number}</span>
          <p className={`${eyebrow} mt-4`}>{s.eyebrow}</p>
          <h2 className={`${h2} mt-4`}>{s.title}</h2>
          <Img src={img01.url} alt={s.alt} ratio="aspect-[4/5]" className="mt-8 lg:hidden" />
          <div className="mt-8"><Paras items={s.description} /></div>
        </div>
        <div className="hidden lg:col-span-5 lg:block lg:self-center">
          <Img src={img01.url} alt="" ratio="aspect-[4/5]" />
        </div>
        <div className="mt-4 lg:col-span-12 lg:mt-12"><p className={label}>{s.listLabel}</p><FeatureList items={s.list} variant="panel" /></div>
        <div className="lg:col-span-12"><HowItWorks labelText={s.howLabel} items={s.how} cols={2} /></div>
      </div>
    </Reveal>
  );
}

function Solution02() {
  const s = solution02;
  return (
    <Reveal className="bg-white py-20 lg:py-28">
      <div className={`${container} space-y-14 lg:space-y-20`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[45fr_55fr] lg:items-center lg:gap-14">
          <div className="hidden lg:block"><Img src={img02.url} alt="" ratio="aspect-[4/5]" /></div>
          <div>
            <span aria-hidden="true" className={numeral}>{s.number}</span>
            <p className={`${eyebrow} mt-4`}>{s.eyebrow}</p>
            <h2 className={`${h2} mt-4`}>{s.title}</h2>
            <Img src={img02.url} alt={s.alt} ratio="aspect-[4/5] md:aspect-[3/2]" className="mt-8 lg:hidden" />
            <div className="mt-8"><Paras items={s.description} /></div>
          </div>
        </div>
        <div><p className={label}>{s.listLabel}</p><FeatureList items={s.list} variant="striped" /></div>
        <HowItWorks labelText={s.howLabel} items={s.how} cols={3} />
        <LearningCycle stages={learningCycleStages} className="pt-4" />
      </div>
    </Reveal>
  );
}

function Solution03() {
  const s = solution03;
  return (
    <Reveal className="bg-white py-24 lg:py-32">
      <div className={`${container} space-y-12 lg:space-y-16`}>
        <Img src={img03.url} alt={s.alt} ratio="aspect-[4/3] md:aspect-[21/9]" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span aria-hidden="true" className={numeral}>{s.number}</span>
            <p className={`${eyebrow} mt-4`}>{s.eyebrow}</p>
            <h2 className={`${h2} mt-4`}>{s.title}</h2>
          </div>
          <div className="lg:pt-6"><Paras items={s.description} /></div>
        </div>
        <div><p className={label}>{s.listLabel}</p><FeatureList items={s.list} variant="striped" marker="bar" /></div>
        <HowItWorks labelText={s.howLabel} items={s.how} cols={3} />
      </div>
    </Reveal>
  );
}

function WhyPartner() {
  return (
    <Reveal className="bg-[#F4F6F9] py-20 lg:py-28">
      <div className={container}>
        <h2 className={h2}>{whyPartner.title}</h2>
        <ol className="mt-12 border-b border-gold/60">
          {whyPartner.rows.map((row, i) => (
            <li key={row.title} className="group grid grid-cols-1 gap-2 border-t border-gold/60 py-7 md:grid-cols-[7rem_40%_1fr] md:items-baseline md:gap-8">
              <span aria-hidden="true" className="font-[Montserrat] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none text-navy/30 transition-[transform,color] duration-200 md:group-hover:translate-x-[6px] md:group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[Montserrat] text-[1.25rem] font-semibold text-navy">{row.title}</h3>
              <p className={body}>{row.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

function Outcomes() {
  return (
    <Reveal className="bg-white py-20 lg:py-28">
      <div className={container}>
        <h2 className={h2}>{outcomes.title}</h2>
        <p className={`${body} mt-6`}>{outcomes.intro}</p>
        <ul className="mt-12 grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-navy/15 py-6 font-[Montserrat] text-[20px] font-medium leading-snug text-navy">
              <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function SolutionsPageContent() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Solution01 />
      <Connector />
      <Solution02 />
      <Connector />
      <Solution03 />
      <WhyPartner />
      <Outcomes />
    </div>
  );
}
