import { approachSteps } from "@/data/approachSteps";
import { BrandButton, GoldRule } from "@/components/ui-brand";

/** Home "Our Approach": a teal band carrying the five stages as one numbered sequence, joined by a
 *  gold line on wide screens and a vertical rail on small ones. */
export function Approach() {
  return (
    <section className="approach-static relative isolate bg-teal py-16 text-paper md:py-24" aria-labelledby="approach-title">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
          <div>
            <GoldRule />
            <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.14em] text-paper">How We Work</p>
            <h2 id="approach-title" className="mt-4 font-display text-[32px] font-bold leading-[1.1] text-paper md:text-[44px] xl:text-[52px]">Our Approach</h2>
          </div>
          <p className="max-w-[56ch] text-lg leading-[1.7] text-paper/90 lg:pb-2">
            At EhsanX, transformation begins with understanding. Our approach moves organizations
            from insight to action through a practical, collaborative, and reflective process.
          </p>
        </div>
        <ol className="relative mt-12 grid gap-0 md:mt-16 xl:grid-cols-5 xl:gap-8">
          <span aria-hidden="true" className="absolute left-[6px] top-3 bottom-3 w-px bg-paper/30 xl:left-0 xl:right-0 xl:top-[7px] xl:bottom-auto xl:h-px xl:w-auto" />
          {approachSteps.map((step, i) => (
            <li key={step.name} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 pb-9 last:pb-0 xl:block xl:pb-0">
              <span aria-hidden="true" className="relative z-10 mt-[6px] block h-[14px] w-[14px] rounded-full border-2 border-gold bg-teal xl:mt-0" />
              <div className="xl:mt-8">
                <span className="block font-display text-[40px] font-bold leading-none text-gold md:text-[52px]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-[1.25] text-paper md:mt-4 md:text-[22px]">{step.name}</h3>
                <p className="mt-3 max-w-[40ch] text-base leading-[1.65] text-paper/85">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 md:mt-16">
          <BrandButton to="/our-approach" variant="outline-light">See Our Approach</BrandButton>
        </div>
      </div>
    </section>
  );
}
