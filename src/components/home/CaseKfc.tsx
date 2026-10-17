import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { clientImpact, type ImpactFigure } from "@/data/clientImpact";
import { refreshImages } from "@/lib/refresh-images";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { BrandButton, GoldRule } from "@/components/ui-brand";
import { impactValue } from "@/lib/client-impact";

function ImpactNumber({ figure }: { figure: ImpactFigure }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [visual, setVisual] = useState<number | null>(null);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, figure.value, { duration: 2, onUpdate: n => setVisual(Math.round(n)), onComplete: () => setVisual(null) });
    return () => controls.stop();
  }, [inView, reduce, figure.value]);
  const final = impactValue(figure.value, figure.prefix);
  return <div className="impact-figure"><span ref={ref} className="count-up" aria-label={final}><span className={visual === null ? "" : "count-final"}>{final}</span>{visual !== null && <span className="count-visual" aria-hidden="true">{impactValue(visual, figure.prefix)}</span>}</span><p>{figure.label}</p></div>;
}
export function CaseKfc() {
  return <section className="impact-section section-y" aria-labelledby="impact-title">
    <ResponsiveImage asset={refreshImages.impact} alt="" loading="lazy" className="impact-background" />
    <div className="impact-shade" />
    <div className="container-x relative">
      <GoldRule /><h2 id="impact-title" className="impact-title">Client Impact</h2>
      <div className="impact-grid">{clientImpact.map(client => {
        const empty = !client.primary && !client.secondary && !client.details?.length;
        return <Link to="/client-impact" className={`impact-card ${empty ? "impact-logo-only" : ""}`} key={client.name} aria-label={`${client.name} client impact`}>
          <div className="impact-logo-tile"><img src={client.logo} alt={client.name} loading="lazy" className={client.multiply ? "impact-logo-multiply" : ""} /></div>
          {!empty && <><div className="impact-figures">{client.primary && <ImpactNumber figure={client.primary} />}{client.secondary && <ImpactNumber figure={client.secondary} />}</div>
          {!!client.details?.length && <dl className="impact-details">{client.details.map(row => (row.value || row.chips?.length) && <div key={row.label}><dt>{row.label}</dt><dd>{row.value}{row.chips?.length ? <ul className="impact-chips">{row.chips.map(chip => <li key={chip}>{chip}</li>)}</ul> : null}</dd></div>)}</dl>}</>}
          <ArrowUpRight className="impact-arrow" aria-hidden="true" />
        </Link>;
      })}</div>
      <div className="impact-all"><BrandButton to="/client-impact">See All Client Impact</BrandButton></div>
    </div>
  </section>;
}
