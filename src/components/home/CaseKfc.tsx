import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { clientImpact, combinedImpact } from "@/data/clientImpact";
import { BrandButton, GoldRule } from "@/components/ui-brand";

function CombinedFigure({ value, display, label }: { value: number; display: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [visual, setVisual] = useState<number | null>(null);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (n) => setVisual(Math.round(n)),
      onComplete: () => setVisual(null),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);
  const prefix = display.startsWith("~") ? "~" : "";
  const formatted = new Intl.NumberFormat("en-US").format(visual ?? 0);
  return (
    <div className="impact-total [min-width:0] [padding:24px_0] [.impact-total+&]:[border-top:1px_solid_var(--impact-divider)] [@media(min-width:768px)]:[.impact-total+&]:[border-top:0] [@media(min-width:768px)]:[.impact-total+&]:[border-left:1px_solid_var(--impact-divider)] [&_p]:[font-size:1.0625rem] [&_p]:[font-weight:500] [&_p]:[line-height:1.5] [&_p]:[color:var(--paper)] [&_p]:[margin-top:12px] [&_p]:[padding-inline:12px] max-xl:[&_.count-up]:!text-5xl max-xl:[&_.count-up]:!min-w-0">
      <span ref={ref} className="count-up [position:relative] [display:inline-block] [font-variant-numeric:tabular-nums] [.kfc-figure_&]:[font-size:64px] [.kfc-figure_&]:[white-space:nowrap] [@media(max-width:1023.98px)]:[.kfc-figure_&]:[font-size:48px] [.impact-total_&]:[font-family:var(--font-display)] [.impact-total_&]:[font-size:clamp(3rem,6vw,5.5rem)] [.impact-total_&]:[line-height:1.15] [.impact-total_&]:[font-weight:800] [.impact-total_&]:[color:var(--gold)] [.impact-total_&]:[white-space:nowrap] [.impact-total_&]:[font-variant-numeric:tabular-nums] [.impact-total_&]:[min-width:3ch] [.impact-total:nth-child(2)_&]:[min-width:6ch]" aria-label={display}>
        <span className={visual === null ? "" : "count-final [visibility:hidden]"}>{display}</span>
        {visual !== null && (
          <span className="count-visual [position:absolute] [inset:0]" aria-hidden="true">
            {prefix}{formatted}{display.endsWith("+") ? "+" : ""}
          </span>
        )}
      </span>
      <p>{label}</p>
    </div>
  );
}

export function CaseKfc() {
  const totals = combinedImpact();
  return (
    <section className="impact-section [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background-image:var(--grain-image)] [&::after]:[opacity:.03] [&::after]:[pointer-events:none] [position:relative] [isolation:isolate] [background:var(--impact-section-background-16)] [color:var(--paper)] [padding-block:48px] [overflow:hidden] [@media(min-width:768px)]:[padding-block:64px]" aria-labelledby="impact-title">
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 relative">
        <div className="impact-heading-row [display:flex] [align-items:baseline] [justify-content:space-between] [gap:24px] max-lg:!grid max-lg:!grid-cols-[minmax(0,1fr)_auto] [&>*]:min-w-0">
          <div><GoldRule /><h2 id="impact-title" className="impact-title [font-size:clamp(2.5rem,5vw,4.5rem)]! [line-height:1.1] [font-weight:800] [color:var(--paper)] [margin-top:24px] [letter-spacing:0.02em] max-md:!text-4xl">Client Impact</h2></div>
          <div className="impact-desktop-cta [display:none] [flex-shrink:0] [@media(min-width:1024px)]:[display:block]"><BrandButton to="/client-impact">See All Client Impact</BrandButton></div>
        </div>
        <ul className="impact-logos [display:grid] [grid-template-columns:1fr] [gap:24px] [margin-top:40px] [list-style:none] [padding:0] [@media(min-width:768px)]:[grid-template-columns:repeat(3,minmax(0,1fr))] [&>li]:[min-width:0]">
          {clientImpact.map((client) => (
            <li key={client.name}>
              <Link to="/client-impact" className="impact-logo-tile [display:flex] [align-items:center] [justify-content:center] [width:100%] [height:130px] [background:var(--paper)] [border-radius:24px] [border:1px_solid_transparent] [transition:transform_.3s,border-color_.3s] [@media(min-width:768px)]:[height:clamp(200px,22vw,280px)] [&:hover]:[transform:translateY(-4px)] [&:hover]:[border-color:var(--gold)] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:3px] [&:focus-visible]:[border-radius:24px] [&_img]:[width:70%] [&_img]:[height:60%] [&_img]:[object-fit:contain]" aria-label={client.name}>
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className={client.multiply ? "impact-logo-multiply [mix-blend-mode:multiply] [filter:brightness(1.06)]" : ""}
                />
              </Link>
            </li>
          ))}
        </ul>
        <hr className="impact-hairline [border:0] [border-top:1px_solid_var(--impact-divider)] [margin-top:40px]" />
        <div className="impact-totals [position:relative] [display:grid] [grid-template-columns:1fr] [text-align:center] [background:var(--impact-glow)] [padding-block:24px] [@media(min-width:768px)]:[grid-template-columns:repeat(3,minmax(0,1fr))]">
          <CombinedFigure value={totals.leaders.value} display={totals.leaders.display} label={totals.leaders.label} />
          <CombinedFigure value={totals.employees.value} display={totals.employees.display} label={totals.employees.label} />
          <CombinedFigure value={totals.cities.value} display={totals.cities.display} label={totals.cities.label} />
        </div>
        <p className="impact-footnote [font-size:.8125rem] [color:var(--impact-footnote)] [text-align:center] [margin-top:16px]">Figures reflect the KFC Pakistan and PCI programmes.</p>
        <div className="impact-all [display:flex] [justify-content:center] [margin-top:32px] [@media(min-width:1024px)]:[display:none]">
          <BrandButton to="/client-impact">See All Client Impact</BrandButton>
        </div>
      </div>
    </section>
  );
}
