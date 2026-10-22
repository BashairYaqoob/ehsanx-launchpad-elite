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
      duration: 1,
      onUpdate: (n) => setVisual(Math.round(n)),
      onComplete: () => setVisual(null),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);
  const prefix = display.startsWith("~") ? "~" : "";
  const formatted = new Intl.NumberFormat("en-US").format(visual ?? 0);
  return (
    <div className="impact-total">
      <span ref={ref} className="count-up" aria-label={display}>
        <span className={visual === null ? "" : "count-final"}>{display}</span>
        {visual !== null && (
          <span className="count-visual" aria-hidden="true">
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
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="container-x relative">
        <div className="impact-heading-row">
          <div><GoldRule /><h2 id="impact-title" className="impact-title">Client Impact</h2></div>
          <div className="impact-desktop-cta"><BrandButton to="/client-impact">See All Client Impact</BrandButton></div>
        </div>
        <ul className="impact-logos">
          {clientImpact.map((client) => (
            <li key={client.name}>
              <Link to="/client-impact" className="impact-logo-tile" aria-label={client.name}>
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className={client.multiply ? "impact-logo-multiply" : ""}
                />
              </Link>
            </li>
          ))}
        </ul>
        <hr className="impact-hairline" />
        <div className="impact-totals">
          <CombinedFigure value={totals.leaders.value} display={totals.leaders.display} label={totals.leaders.label} />
          <CombinedFigure value={totals.employees.value} display={totals.employees.display} label={totals.employees.label} />
          <CombinedFigure value={totals.cities.value} display={totals.cities.display} label={totals.cities.label} />
        </div>
        <p className="impact-footnote">Figures reflect the KFC Pakistan and PCI programmes.</p>
        <div className="impact-all">
          <BrandButton to="/client-impact">See All Client Impact</BrandButton>
        </div>
      </div>
    </section>
  );
}
