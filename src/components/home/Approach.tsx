import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { approachSteps } from "@/data/approachSteps";
import { GoldRule } from "@/components/ui-brand";

export function Approach() {
  return (
    <section className="approach-static section-y bg-paper" aria-labelledby="approach-title">
      <div className="container-x">
        <GoldRule />
        <p className="eyebrow mt-6">How We Work</p>
        <h2 id="approach-title" className="h2-display mt-4 text-navy">Our Approach</h2>
        <ol className="approach-grid">
          {approachSteps.map((step, i) => (
            <li key={step.name} className="approach-card">
              <div className="approach-card-top">
                <span className="approach-num">0{i + 1}</span>
                <span className="approach-icon"><step.Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
              </div>
              <h3>{step.name}</h3>
              <span className="approach-rule" aria-hidden="true" />
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="approach-outro">
          <p>
            At EhsanX, transformation begins with understanding. Our approach moves organizations
            from insight to action through a practical, collaborative, and reflective process.
          </p>
          <Link to="/our-approach" className="btn-base btn-outline-navy">
            See Our Approach
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
