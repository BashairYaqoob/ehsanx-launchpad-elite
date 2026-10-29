import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { approachSteps } from "@/data/approachSteps";
import { GoldRule } from "@/components/ui-brand";

export function Approach() {
  return (
    <section className="approach-static [position:relative] [isolation:isolate] section-y [padding-block:3.5rem] [@media(min-width:_768px)]:[padding-block:5rem] max-md:!py-16 bg-paper" aria-labelledby="approach-title">
      <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8">
        <GoldRule />
        <p className="eyebrow [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--teal)] mt-6">How We Work</p>
        <h2 id="approach-title" className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] [font-family:var(--font-display)] [font-size:clamp(2rem,_4vw,_3.5rem)] [font-weight:700] [line-height:1.1] [letter-spacing:0] max-sm:!text-3xl sm:max-lg:!text-4xl lg:max-xl:!text-5xl mt-4 text-navy">Our Approach</h2>
        <ol className="approach-grid [display:grid] [grid-template-columns:1fr] [gap:24px] [margin-top:56px] [list-style:none] [padding:0] [position:relative] [@media(min-width:768px)_and_(max-width:1279.98px)]:[grid-template-columns:repeat(6,minmax(0,1fr))] [@media(min-width:1280px)]:[grid-template-columns:repeat(5,minmax(0,1fr))] [@media(min-width:768px)_and_(max-width:1279.98px)]:[&>li]:[grid-column:span_2] [@media(min-width:768px)_and_(max-width:1279.98px)]:[&>:nth-child(4)]:[grid-column:2/span_2] [@media(min-width:1280px)]:[&>:nth-child(4)]:[grid-column:auto] [@media(min-width:768px)_and_(max-width:1279.98px)]:[&>:nth-child(5)]:[grid-column:4/span_2] [@media(min-width:1280px)]:[&>:nth-child(5)]:[grid-column:auto] [@media(min-width:1280px)]:[&::before]:[content:''] [@media(min-width:1280px)]:[&::before]:[position:absolute] [@media(min-width:1280px)]:[&::before]:[top:24px] [@media(min-width:1280px)]:[&::before]:[left:8%] [@media(min-width:1280px)]:[&::before]:[right:8%] [@media(min-width:1280px)]:[&::before]:[height:1px] [@media(min-width:1280px)]:[&::before]:[background:var(--approach-grid-background-15)] [@media(min-width:1280px)]:[&::before]:[pointer-events:none] md:max-lg:!grid-cols-2 md:max-lg:[&>li]:!col-auto">
          {approachSteps.map((step, i) => (
            <li key={step.name} className="approach-card [position:relative] [background:var(--paper)] [border:var(--approach-card-border-14)] [border-radius:24px] [padding:28px] [box-shadow:var(--shadow-soft)] [transition:translate_.4s,box-shadow_.4s] [&::before]:[content:''] [&::before]:[position:absolute] [&::before]:[top:0] [&::before]:[left:28px] [&::before]:[right:28px] [&::before]:[height:3px] [&::before]:[border-radius:0_0_3px_3px] [&::before]:[background:var(--gold)] [&::before]:[transform:scaleX(0)] [&::before]:[transform-origin:left] [&::before]:[transition:transform_.4s] [&:hover]:[translate:0_-4px] [&:hover]:[box-shadow:var(--shadow-lift)] [&:hover::before]:[transform:scaleX(1)] [&_h3]:[font-family:var(--font-display)] [&_h3]:[font-weight:600] [&_h3]:[font-size:20px] [&_h3]:[line-height:1.3] [&_h3]:[color:var(--navy)] [&_h3]:[margin-top:20px] [&_p]:[font-size:15px] [&_p]:[line-height:1.65] [&_p]:[color:var(--ink)] [&_p]:[margin-top:14px] min-w-0 max-xl:[&_p]:!text-base">
              <div className="approach-card-top [display:flex] [align-items:center] [justify-content:space-between] [gap:16px] !grid !grid-cols-[minmax(0,1fr)_auto]">
                <span className="approach-num [font-family:var(--font-display)] [font-weight:800] [font-size:28px] [color:var(--teal)]">0{i + 1}</span>
                <span className="approach-icon [width:48px] [height:48px] [border-radius:50%] [border:1.5px_solid_var(--teal)] [display:grid] [place-items:center] [color:var(--teal)] [flex-shrink:0]"><step.Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
              </div>
              <h3>{step.name}</h3>
              <span className="approach-rule [display:block] [width:40px] [height:2px] [background:var(--gold)] [margin-top:12px]" aria-hidden="true" />
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="approach-outro [margin-top:56px] [max-width:780px] [&_p]:[font-size:18px] [&_p]:[line-height:1.7] [&_p]:[color:var(--navy)] [&_a]:[margin-top:28px]">
          <p>
            At EhsanX, transformation begins with understanding. Our approach moves organizations
            from insight to action through a practical, collaborative, and reflective process.
          </p>
          <Link to="/our-approach" className="btn-base [&:hover]:[transform:translateY(-2px)] [display:inline-flex] [align-items:center] [gap:0.625rem] [min-height:48px] [padding:0.75rem_1.75rem] [border-radius:9999px] [font-family:var(--font-display)] [font-weight:600] [font-size:0.95rem] [transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1),_box-shadow_0.4s,_background-color_0.3s,_color_0.3s] max-sm:w-full max-sm:justify-center max-sm:whitespace-normal max-sm:text-center max-w-full btn-outline-navy [&:hover]:[background:var(--btn-outline-navy-background-2)] [border:1.5px_solid_var(--navy)] [color:var(--navy)]">
            See Our Approach
            <ArrowRight className="btn-arrow [.btn-base_&]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [.btn-base:hover_&]:[transform:translateX(4px)] h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
