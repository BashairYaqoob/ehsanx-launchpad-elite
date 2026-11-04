import kfcBw from "@/assets/impact/kfc-bw.webp.asset.json";
import kfcColour from "@/assets/impact/kfc-colour.webp.asset.json";
import pciBw from "@/assets/impact/pci-bw.webp.asset.json";
import pciColour from "@/assets/impact/pci-colour.webp.asset.json";
import ajLogo from "@/assets/impact/aj-logo.webp.asset.json";
import { ajCase, kfcCase, pciCase } from "@/data/clientImpactDetailed";
import { PhotoCaseStudy } from "./PhotoCaseStudy";
import { Block, BulletList, Takeaway, body, container, eyebrow, h2 } from "./CaseStudyParts";

export function CaseStudyKfc() {
  return <PhotoCaseStudy data={kfcCase} bw={kfcBw.url} colour={kfcColour.url} tone="white" />;
}

// Filenames were misleading: "PCI_-_coloured" is the black-and-white frame, "PCI" is colour.
export function CaseStudyPci() {
  return (
    <PhotoCaseStudy
      data={pciCase}
      bw={pciBw.url}
      colour={pciColour.url}
      tone="wash"
      extra={
        <Block title="The Seven Departments">
          <ul className="flex flex-wrap gap-2">
            {pciCase.departments.map((d) => (
              <li key={d} className="rounded-full border border-navy/20 bg-white px-4 py-2 font-[Inter] text-[14px] text-navy">{d}</li>
            ))}
          </ul>
        </Block>
      }
    />
  );
}

export function CaseStudyAhmadJamal() {
  return (
    <section id={ajCase.id} aria-labelledby="aj-title" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <img src={ajLogo.url} alt="Ahmad Jamal Textile Processing logo" width={690} height={362} loading="lazy" decoding="async" className="h-auto w-[200px] object-contain md:w-[240px]" />
            <div aria-hidden="true" className="mt-8 h-px w-16 bg-gold" />
          </div>
          <div className="lg:col-span-8">
            <p className={eyebrow}>{ajCase.eyebrow}</p>
            <h2 id="aj-title" className={`${h2} mt-4`}>{ajCase.title}</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <Block title="Challenge"><p className={body}>{ajCase.challenge}</p></Block>
              <Block title="Engagement"><div className="space-y-5">{ajCase.engagement.map((p) => <p key={p} className={body}>{p}</p>)}</div></Block>
            </div>
            <div className="mt-10">
              <Block title="Learning Through Dialogue">
                <p className={body}>{ajCase.dialogueIntro}</p>
                <div className="mt-4"><BulletList items={ajCase.dialogueTopics} /></div>
              </Block>
            </div>
            <div className="mt-12"><Takeaway labelText={ajCase.takeawayLabel} text={ajCase.takeaway} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
