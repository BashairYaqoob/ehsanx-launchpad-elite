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
  bw: string; colour: string; tone: "white" | "wash"; extra?: ReactNode;
};

export function PhotoCaseStudy({ data, bw, colour, tone, extra }: Props) {
  return (
    <section id={data.id} aria-labelledby={`${data.id}-title`} className={`scroll-mt-24 py-16 md:py-24 ${tone === "wash" ? "bg-wash" : "bg-white"}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className={eyebrow}>{data.eyebrow}</p>
            <h2 id={`${data.id}-title`} className={`${h2} mt-4`}>{data.title}</h2>
            <div className="mt-8"><Block title="Challenge"><div className="space-y-5">{data.challenge.map((p) => <p key={p} className={body}>{p}</p>)}</div></Block></div>
          </div>
          <div className="lg:col-span-6 lg:pt-2">
            <ImageHoverReveal bw={bw} colour={colour} alt={data.imageAlt} width={1600} height={1200} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-10 lg:col-span-5">
            <Block title="Programme"><p className={body}>{data.programme}</p></Block>
            {extra}
            <Block title="Learning by Doing"><p className={body}>{data.learningByDoing}</p></Block>
          </div>
          <div className="lg:col-span-7">
            <Block title={data.learningAreasLabel}><NumberedList items={data.learningAreas} /></Block>
          </div>
        </div>

        <div className="mt-14"><Metrics caption="Impact Snapshot" items={data.metrics} /></div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5"><Block title="Why It Worked"><BulletList items={data.whyItWorked} /></Block></div>
          <div className="lg:col-span-7 lg:pt-6"><Takeaway labelText={data.takeawayLabel} text={data.takeaway} /></div>
        </div>
      </div>
    </section>
  );
}
