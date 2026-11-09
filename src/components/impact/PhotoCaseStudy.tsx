import type { ReactNode } from "react";
import { ImageHoverReveal } from "./ImageHoverReveal";
import { Block, BulletList, Metrics, NumberedList, Takeaway, body, container, eyebrow, h2 } from "./CaseStudyParts";
import type { Metric } from "@/data/clientImpact";

type Props = {
  data: {
    id: string; eyebrow: string; title: string; challenge: string[]; programme: string;
    learningAreasLabel: string; learningAreas: string[]; learningByDoing: string;
    metrics: Metric[]; whyItWorked: string[]; takeawayLabel: string; takeaway: string; imageAlt: string;
  };
  /** Position in the engagement index, shown as the chapter numeral. */
  number: number;
  bw: string; colour: string; tone: "white" | "wash"; band: "navy" | "teal"; extra?: ReactNode;
};

/**
 * One case study as an editorial chapter: numeral and headline over a wide photograph (black and
 * white, colour on hover), the programme, an impact band in brand colour, then the takeaway.
 */
export function PhotoCaseStudy({ data, number, bw, colour, tone, band, extra }: Props) {
  const bg = tone === "wash" ? "bg-wash" : "bg-white";
  return (
    <section id={data.id} aria-labelledby={`${data.id}-title`} className="scroll-mt-24">
      <div className={`${bg} pt-16 md:pt-24`}>
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span aria-hidden="true" className="block font-[Montserrat] text-[64px] font-bold leading-none text-gold md:text-[88px]">{String(number).padStart(2, "0")}</span>
              <p className={`${eyebrow} mt-6`}>{data.eyebrow}</p>
              <h2 id={`${data.id}-title`} className={`${h2} mt-4`}>{data.title}</h2>
            </div>
            <div className="lg:col-span-7">
              <ImageHoverReveal bw={bw} colour={colour} alt={data.imageAlt} width={1600} height={1200} className="rounded-[20px]" />
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Block title="Challenge"><div className="space-y-5">{data.challenge.map((p) => <p key={p} className={body}>{p}</p>)}</div></Block>
            </div>
            <div className="space-y-10 lg:col-span-7">
              <Block title="Programme"><p className={body}>{data.programme}</p></Block>
              {extra}
            </div>
          </div>

          <div className="mt-14 grid gap-10 pb-16 lg:grid-cols-12 lg:gap-14 md:pb-24">
            <div className="lg:col-span-5">
              <Block title="Learning by Doing"><p className={body}>{data.learningByDoing}</p></Block>
            </div>
            <div className="lg:col-span-7">
              <Block title={data.learningAreasLabel}><NumberedList items={data.learningAreas} /></Block>
            </div>
          </div>
        </div>
      </div>

      <Metrics caption="Impact Snapshot" items={data.metrics} tone={band} />

      <div className={`${bg} py-16 md:py-20`}>
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-5"><Block title="Why It Worked"><BulletList items={data.whyItWorked} /></Block></div>
          <div className="lg:col-span-7 lg:pt-6"><Takeaway labelText={data.takeawayLabel} text={data.takeaway} /></div>
        </div>
      </div>
    </section>
  );
}
