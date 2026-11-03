import { useId, useState } from "react";

export type FeatureListProps = {
  items: string[];
  /** Accessible name for the filter bar. */
  label: string;
  className?: string;
};

const ALL = "All";

/** Flat filter bar (teal outline pills) with a white card grid underneath. */
export function FeatureList({ items, label, className = "" }: FeatureListProps) {
  const [active, setActive] = useState<string>(ALL);
  const gridId = useId();
  const shown = active === ALL ? items : items.filter((i) => i === active);
  const tabs = [ALL, ...items];

  return (
    <div className={className}>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              aria-controls={gridId}
              onClick={() => setActive(t)}
              className={`min-h-11 rounded-full border px-5 py-2 text-left font-[Inter] text-[14px] font-medium leading-snug transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                on ? "border-teal bg-teal text-white" : "border-teal bg-white text-teal hover:bg-[#F8F9FA]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <ul id={gridId} aria-live="polite" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li
            key={item}
            className="flex min-h-[120px] min-w-0 flex-col justify-between gap-6 border border-navy/15 bg-white p-6 transition-colors duration-200 hover:border-teal hover:bg-[#F8F9FA]"
          >
            <span aria-hidden="true" className="font-[Montserrat] text-[14px] font-semibold text-teal">
              {String(items.indexOf(item) + 1).padStart(2, "0")}
            </span>
            <span className="font-[Montserrat] text-[18px] font-semibold leading-snug text-navy">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
