import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { BrandButton } from "@/components/ui-brand";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { ImageAsset } from "@/lib/image-assets";

type Stage = { name: string; image: ImageAsset; alt: string; description?: string };
type Props = { kind: "eplus" | "approach"; stages: Stage[]; paragraph: string; caption?: string };

export function Journey({ kind, stages, paragraph, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>((gsap, _ScrollTrigger, element) => {
    const panels = Array.from(element.querySelectorAll<HTMLElement>(".journey-panel"));
    const nodes = Array.from(element.querySelectorAll<HTMLElement>(".journey-node"));
    const end = element.querySelector(".journey-end");
    const text = element.querySelectorAll(".journey-titles");
    const progress = element.querySelector(".journey-fill");
    const arrow = element.querySelector(".journey-loop > path");
    const loop = element.querySelector(".journey-loop");
    // Rebuild the timeline when the viewport crosses 768px.
    const mm = gsap.matchMedia();
    mm.add({ small: "(max-width: 767px)", large: "(min-width: 768px)" }, (context) => {
      const small = !!context.conditions?.['small'];
      if (panels.length > 1) gsap.set(panels.slice(1), { autoAlpha: 0 });
      if (end && !small) gsap.set(end, { autoAlpha: 0, y: 24 });
      const vertical = kind === "eplus" ? small : !small;
      if (progress) gsap.set(progress, { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 });
      if (loop) gsap.set(loop, { autoAlpha: 0 });
      if (arrow) gsap.set(arrow, { strokeDasharray: 1, strokeDashoffset: 1 });
      const tl = gsap.timeline({ scrollTrigger: {
        trigger: element, start: "top 104px", end: () => `+=${window.innerHeight * 2}`,
        pin: true, pinSpacing: true, scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: self => { const active = Math.min(4, Math.floor(self.progress * 5.5)); nodes.forEach((node, i) => { node.dataset['active'] = String(i <= active); node.dataset['current'] = String(i === active); }); },
      }});
      if (progress) tl.to(progress, { scaleX: 1, scaleY: 1, duration: 4.4, ease: "none" }, 0);
      stages.slice(1).forEach((_, i) => {
        const next = panels[i + 1]; const previous = panels[i];
        if (!next || !previous) return;
        tl.to(previous, { autoAlpha: 0, duration: 0.6 }, i + 0.65)
          .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, i + 0.65);
        const title = next.querySelector(".journey-title-inner");
        const image = next.querySelector("img");
        if (title) tl.fromTo(title, { yPercent: 110 }, { yPercent: 0, duration: 0.7 }, i + 0.65);
        if (kind === "approach" && image) tl.fromTo(image, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8 }, i + 0.65);
      });
      if (arrow && loop) tl.to(loop, { autoAlpha: 1, duration: 0.1 }, 4.3).to(arrow, { strokeDashoffset: 0, duration: 0.5, ease: "none" }, 4.35);
      // Wide screens show the closing text over the last image, so the titles clear first. Small
      // screens place the closing text after the pinned stage: the last stage stays on screen.
      if (text.length && !small) tl.to(text, { autoAlpha: 0, duration: 0.3 }, 4.7);
      if (end && !small) tl.to(end, { autoAlpha: 1, y: 0, duration: 0.5 }, 4.85);
      tl.to({}, { duration: 0.65 });
    });
    return () => mm.revert();
  }, [kind, stages]);
  useScrollScene(ref, setup, reduced);
  const isEplus = kind === "eplus";
  return <section aria-label={isEplus ? "The E-Plus Model" : "Our Approach"}>
    <div ref={ref} className={`journey motion-reduce:hidden [position:relative] [overflow:clip] [border-radius:0] [margin-top:-24px] [z-index:auto] [isolation:isolate] [margin:0] max-w-full journey-${kind} ${isEplus ? "bg-navy text-paper" : "bg-paper text-navy"}`}>
    <div className="journey-stage [position:relative] [min-height:0] [height:100dvh] [max-height:none]">
      <header className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 journey-header [position:absolute] [top:24px] [inset-inline:0] [z-index:4] [pointer-events:none] [@media(max-width:767.98px)]:[top:20px] [&_h2]:[font-size:32px]! [@media(max-width:767.98px)]:[&_h2]:[font-size:26px]">
        <p className={isEplus ? "eyebrow-dark [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--gold)]" : "eyebrow [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--teal)]"}>{isEplus ? "Our Philosophy" : "How We Work"}</p>
        <h2 className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] [font-family:var(--font-display)] [font-size:clamp(2rem,_4vw,_3.5rem)] [font-weight:700] [line-height:1.1] [letter-spacing:0] max-sm:!text-3xl sm:max-lg:!text-4xl lg:max-xl:!text-5xl mt-3">{isEplus ? "The E-Plus Model" : "Our Approach"}</h2>
      </header>
      <div className="journey-panels [position:absolute] [inset:0]">
        {stages.map((stage, i) => <article key={stage.name} className="journey-panel [position:absolute] [inset:0] [&:not(:first-child)]:[visibility:hidden] [&_img]:[width:100%] [&_img]:[height:100%] [&_img]:[object-fit:cover] [@media(max-width:767.98px)]:[.journey-eplus_&_img]:[height:35%] [@media(max-width:767.98px)]:[.journey-eplus_&_img]:[top:19%] [@media(max-width:767.98px)]:[.journey-eplus_&_img]:[position:absolute]">
          <ResponsiveImage asset={stage.image} alt={stage.alt} loading="lazy" sizes={isEplus ? "100vw" : "(min-width: 768px) 48vw, 100vw"} />
          {isEplus && <div className="journey-image-overlay [position:absolute] [inset:0] [background:var(--journey-shade)] [@media(max-width:767.98px)]:[background:var(--journey-image-overlay-background-7)]" />}
          <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 journey-titles [position:absolute] [inset-inline:0] [top:30%] [display:flex] [align-items:center] [gap:36px] [@media(max-width:767.98px)]:[display:block] [@media(max-width:767.98px)]:[gap:18px] [@media(max-width:767.98px)]:[padding-left:64px] max-md:!pl-16 [@media(max-width:767.98px)]:[.journey-eplus_&]:[top:56%]">
            {!isEplus && <span className="journey-ghost" aria-hidden="true">0{i + 1}</span>}
            <span className="journey-numeral [font-family:var(--font-display)] [font-weight:600] [font-size:128px] [line-height:1] [color:var(--gold)] [@media(max-width:767.98px)]:[font-size:56px] [@media(min-width:768px)_and_(max-width:1023.98px)]:[font-size:100px] [@media(max-width:767.98px)]:[margin-bottom:12px] [@media(max-width:767.98px)]:[display:block]" aria-hidden="true">0{i + 1}</span>
            <div className="journey-title-mask [overflow:hidden] [max-width:640px] max-w-full min-w-0"><div className="journey-title-inner [&_h3]:!text-[26px] md:[&_h3]:!text-[36px] lg:[&_h3]:!text-[44px] [&_h3]:[font-weight:600] [&_h3]:[line-height:1.15] [&_h3]:[overflow-wrap:anywhere]"><h3>{stage.name}</h3>{stage.description && <p className="journey-description">{stage.description}</p>}</div></div>
          </div>
        </article>)}
      </div>
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 journey-rail-wrap [position:absolute] [inset-inline:0] [bottom:144px] [z-index:4] [@media(max-width:767.98px)]:[.journey-eplus_&]:[left:22px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[width:20px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[margin:0] [@media(max-width:767.98px)]:[.journey-eplus_&]:[padding:0] [@media(max-width:767.98px)]:[.journey-eplus_&]:[top:57%] [@media(max-width:767.98px)]:[.journey-eplus_&]:[bottom:128px]"><span className="journey-line [position:absolute] [top:5px] [left:48px] [right:calc(20%_+_20px)] [height:2px] [background:var(--journey-line-background-8)] [@media(max-width:767.98px)]:[.journey-eplus_&]:[left:5px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[right:auto] [@media(max-width:767.98px)]:[.journey-eplus_&]:[top:5px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[bottom:5px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[width:2px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[height:auto]" aria-hidden="true"><span className="journey-fill [position:absolute] [inset:0] [transform-origin:left] [background:var(--gold)] [@media(max-width:767.98px)]:[.journey-eplus_&]:[transform-origin:top]" /></span><ol className="journey-rail [display:grid] [grid-template-columns:repeat(5,minmax(0,1fr))] [gap:24px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[display:flex] [@media(max-width:767.98px)]:[.journey-eplus_&]:[flex-direction:column] [@media(max-width:767.98px)]:[.journey-eplus_&]:[gap:22px] max-xl:!gap-3" aria-label={isEplus ? "E-Plus stages" : "Approach steps"}>
        {stages.map((stage, i) => <li className="journey-node [position:relative] [font-family:var(--font-display)] [font-size:13px] [font-weight:600] [line-height:1.5] [@media(max-width:767.98px)]:[.journey-eplus_&>span:last-child]:[position:absolute] [@media(max-width:767.98px)]:[.journey-eplus_&>span:last-child]:[width:1px] [@media(max-width:767.98px)]:[.journey-eplus_&>span:last-child]:[height:1px] [@media(max-width:767.98px)]:[.journey-eplus_&>span:last-child]:[overflow:hidden] [@media(max-width:767.98px)]:[.journey-eplus_&>span:last-child]:[clip-path:inset(50%)]" data-active={i === 0 ? "true" : "false"} key={stage.name}><span className="journey-dot [display:block] [width:12px] [height:12px] [border:1px_solid_var(--paper)] [border-radius:50%] [margin-bottom:20px] [background:var(--navy)] [@media(max-width:767.98px)]:[margin:0] [.journey-node[data-active=true]_&]:[background:var(--gold)] [.journey-node[data-active=true]_&]:[border-color:var(--gold)]" aria-hidden="true" /><span>{stage.name}</span></li>)}
      </ol></div>
      {!isEplus && <svg className="journey-loop" viewBox="0 0 400 100" aria-hidden="true"><defs><marker id="approach-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" /></marker></defs><path pathLength="1" d="M370 10 C400 95 20 95 35 10" markerEnd="url(#approach-arrow)" /></svg>}
    </div>
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 journey-end [position:absolute] [inset-inline:0] [top:38%] [z-index:5] [visibility:hidden] max-md:!static max-md:!visible max-md:py-12 max-md:[&_a]:max-w-[calc(100%-72px)] [max-width:900px] [@media(max-width:767.98px)]:[top:64%] [@media(max-width:767.98px)]:[padding-left:64px] [@media(max-width:767.98px)]:[&_a]:[font-size:12px] [@media(max-width:767.98px)]:[&_a]:[padding-inline:18px] [@media(max-width:767.98px)]:[.journey-eplus_&]:[top:auto] [@media(max-width:767.98px)]:[.journey-eplus_&]:[padding-left:24px] [@media(min-width:768px)]:[.journey-eplus_&]:[top:auto] [@media(min-width:768px)]:[.journey-eplus_&]:[bottom:248px]">
        {caption && <p className="journey-caption [font-size:14px] [margin-bottom:24px] [@media(max-width:767.98px)]:[font-size:11px] [@media(max-width:767.98px)]:[margin-bottom:14px]">{caption}</p>}
        <p className="journey-paragraph [font-size:24px] [line-height:1.6] [margin-bottom:32px] [max-width:780px] [@media(max-width:767.98px)]:[font-size:16px] [@media(max-width:767.98px)]:[margin-bottom:20px]">{paragraph}</p>
        <BrandButton to={isEplus ? "/philosophy" : "/our-approach"} variant={isEplus ? "gold" : "outline-navy"}>{isEplus ? "Explore the Full Model" : "See Our Approach"}</BrandButton>
      </div>
    </div>
    <JourneyStatic kind={kind} stages={stages} paragraph={paragraph} {...(caption ? { caption } : {})} />
  </section>;
}

/**
 * Reduced-motion version: the same content as a still, numbered set of five, shown only when the
 * visitor prefers reduced motion. Both versions are server-rendered and switched by CSS, so the
 * markup never depends on the motion preference and hydration always matches.
 */
function JourneyStatic({ kind, stages, paragraph, caption }: Props) {
  const isEplus = kind === "eplus";
  return (
    <div className={`hidden py-16 motion-reduce:block md:py-24 ${isEplus ? "bg-navy text-paper" : "bg-paper text-navy"}`}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <p className={`font-display text-xs font-semibold uppercase tracking-[0.14em] ${isEplus ? "text-gold" : "text-teal"}`}>{isEplus ? "Our Philosophy" : "How We Work"}</p>
        <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.1] md:text-[44px]">{isEplus ? "The E-Plus Model" : "Our Approach"}</h2>
        <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-5" aria-label={isEplus ? "E-Plus stages" : "Approach steps"}>
          {stages.map((stage, i) => (
            <li key={stage.name} className="min-w-0">
              <ResponsiveImage asset={stage.image} alt={stage.alt} loading="lazy" sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full rounded-[16px] object-cover lg:aspect-[3/4]" />
              <div className="mt-5 flex items-baseline gap-3">
                <span aria-hidden="true" className="font-display text-[32px] font-semibold leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="min-w-0 font-display text-[20px] font-semibold leading-[1.25]">{stage.name}</h3>
              </div>
              {stage.description && <p className="mt-2 text-base leading-[1.6] opacity-90">{stage.description}</p>}
            </li>
          ))}
        </ol>
        <div className="mt-12 max-w-[780px] md:mt-16">
          {caption && <p className="mb-4 text-sm">{caption}</p>}
          <p className="mb-8 text-lg leading-[1.6] md:text-[22px]">{paragraph}</p>
          <BrandButton to={isEplus ? "/philosophy" : "/our-approach"} variant={isEplus ? "gold" : "outline-navy"}>{isEplus ? "Explore the Full Model" : "See Our Approach"}</BrandButton>
        </div>
      </div>
    </div>
  );
}
