import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { BrandButton } from "@/components/ui-brand";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { ImageAsset } from "@/lib/image-assets";

type Stage = { name: string; image: ImageAsset; alt: string; description?: string };
type Props = { kind: "eplus" | "approach"; stages: Stage[]; paragraph: string; caption?: string };

export function Journey({ kind, stages, paragraph, caption }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>((gsap, _ScrollTrigger, element) => {
    const panels = Array.from(element.querySelectorAll<HTMLElement>(".journey-panel"));
    const nodes = Array.from(element.querySelectorAll<HTMLElement>(".journey-node"));
    const end = element.querySelector(".journey-end");
    const text = element.querySelectorAll(".journey-titles");
    const progress = element.querySelector(".journey-fill");
    const arrow = element.querySelector(".journey-loop path");
    const small = window.matchMedia("(max-width: 767px)").matches;
    gsap.set(panels.slice(1), { autoAlpha: 0 });
    gsap.set(end, { autoAlpha: 0, y: 24 });
    gsap.set(progress, { scaleX: kind === "eplus" && small ? 1 : 0, scaleY: kind === "eplus" && small ? 0 : 1 });
    if (arrow) gsap.set(arrow, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ scrollTrigger: {
      trigger: element, start: "top top", end: () => `+=${window.innerHeight * (small ? 3 : 5)}`,
      pin: true, scrub: 0.6, invalidateOnRefresh: true,
      onUpdate: self => { const active = Math.min(4, Math.floor(self.progress * 5.5)); nodes.forEach((node, i) => node.dataset.active = String(i <= active)); },
    }});
    tl.to(progress, { scaleX: 1, scaleY: 1, duration: 4.4, ease: "none" }, 0);
    stages.slice(1).forEach((_, i) => {
      const next = panels[i + 1]; const previous = panels[i];
      if (!next || !previous) return;
      tl.to(previous, { autoAlpha: 0, duration: 0.6 }, i + 0.65)
        .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, i + 0.65)
        .fromTo(next.querySelector(".journey-title-inner"), { yPercent: 110 }, { yPercent: 0, duration: 0.7 }, i + 0.65);
      if (kind === "approach") tl.fromTo(next.querySelector("img"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8 }, i + 0.65);
    });
    if (arrow) tl.to(arrow, { strokeDashoffset: 0, duration: 0.5, ease: "none" }, 4.35);
    tl.to(text, { autoAlpha: 0, duration: 0.3 }, 4.7)
      .to(end, { autoAlpha: 1, y: 0, duration: 0.5 }, 4.85)
      .to({}, { duration: 0.65 });
  }, [kind, stages]);
  useScrollScene(ref, setup, reduced);
  const isEplus = kind === "eplus";
  return <section ref={ref} className={`journey journey-${kind} ${isEplus ? "bg-navy text-paper" : "bg-paper text-navy"}`} aria-label={isEplus ? "The E-Plus Model" : "Our Approach"}>
    <div className="journey-stage">
      <header className="container-x journey-header">
        <p className={isEplus ? "eyebrow-dark" : "eyebrow"}>{isEplus ? "Our Philosophy" : "How We Work"}</p>
        <h2 className="h2-display mt-3">{isEplus ? "The E-Plus Model" : "Our Approach"}</h2>
      </header>
      <div className="journey-panels">
        {stages.map((stage, i) => <article key={stage.name} className="journey-panel">
          <ResponsiveImage asset={stage.image} alt={stage.alt} loading="lazy" sizes={isEplus ? "100vw" : "(min-width: 768px) 48vw, 100vw"} />
          {isEplus && <div className="journey-image-overlay" />}
          <div className="container-x journey-titles">
            <span className="journey-numeral" aria-hidden="true">0{i + 1}</span>
            <div className="journey-title-mask"><div className="journey-title-inner"><h3>{stage.name}</h3>{stage.description && <p className="journey-description">{stage.description}</p>}</div></div>
          </div>
        </article>)}
      </div>
      <div className="container-x journey-rail-wrap"><span className="journey-line" aria-hidden="true"><span className="journey-fill" /></span><ol className="journey-rail" aria-label={isEplus ? "E-Plus stages" : "Approach steps"}>
        {stages.map((stage, i) => <li className="journey-node" data-active={i === 0 ? "true" : "false"} key={stage.name}><span className="journey-dot" aria-hidden="true" /><span>{stage.name}</span></li>)}
      </ol></div>
      {!isEplus && <svg className="journey-loop" viewBox="0 0 400 100" aria-hidden="true"><defs><marker id="approach-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" /></marker></defs><path pathLength="1" d="M370 10 C400 95 20 95 35 10" markerEnd="url(#approach-arrow)" /></svg>}
      <div className="container-x journey-end">
        {caption && <p className="journey-caption">{caption}</p>}
        <p className="journey-paragraph">{paragraph}</p>
        <BrandButton to={isEplus ? "/philosophy" : "/our-approach"} variant={isEplus ? "gold" : "outline-navy"}>{isEplus ? "Explore the Full Model" : "See Our Approach"}</BrandButton>
      </div>
    </div>
  </section>;
}