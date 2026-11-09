export type FeatureListProps = {
  items: string[];
  /** Accessible name for the list. */
  label: string;
  className?: string;
};

/**
 * Numbered topic list in up to three columns with gold rules. Replaces the earlier filter bar plus
 * card grid, which repeated every item twice and filtered down to a single card.
 */
export function FeatureList({ items, label, className = "" }: FeatureListProps) {
  return (
    <ol aria-label={label} className={`grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="flex min-w-0 items-baseline gap-4 border-t border-gold/60 py-5">
          <span aria-hidden="true" className="w-7 shrink-0 font-[Montserrat] text-[15px] font-bold text-teal">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-[Montserrat] text-[18px] font-semibold leading-snug text-navy">{item}</span>
        </li>
      ))}
    </ol>
  );
}
