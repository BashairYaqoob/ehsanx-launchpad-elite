export type FeatureListVariant = "panel" | "striped" | "open";
export type FeatureListProps = {
  items: string[];
  variant: FeatureListVariant;
  /** Marker style; striped lists in Solution 03 use a vertical bar. */
  marker?: "dash" | "bar";
  className?: string;
};

/** The two soft row colours (Glossy Cyan tint, Evening glow cream), defined once. */
export const featureRowColours = {
  teal: "bg-[#1c9ea6]/15",
  cream: "bg-[#fcd596]/35",
  smTeal: "sm:bg-[#1c9ea6]/15",
  smCream: "sm:bg-[#fcd596]/35",
} as const;

export function FeatureList({ items, variant, marker = "dash", className = "" }: FeatureListProps) {
  const rows = Math.ceil(items.length / 2);
  const text = marker === "bar" ? "font-[Montserrat] text-[22px] font-semibold leading-snug text-navy" : "font-[Montserrat] text-[20px] font-medium leading-snug text-navy";
  const shell = variant === "panel" ? `${featureRowColours.teal} p-8 md:p-10` : "";
  const gap = variant === "panel" ? "sm:gap-x-10" : "";

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-flow-col sm:grid-cols-2 sm:[grid-template-rows:repeat(var(--rows),auto)] ${gap} ${shell} ${className}`}
      style={{ ["--rows" as string]: rows }}
    >
      {items.map((item, i) => {
        const col = i < rows ? 0 : 1;
        const row = i - col * rows;
        let tone = "";
        if (variant === "striped") {
          const mobile = i % 2 === 0 ? featureRowColours.teal : featureRowColours.cream;
          const desk = (row + col) % 2 === 0 ? featureRowColours.smTeal : featureRowColours.smCream;
          tone = `${mobile} ${desk} px-6`;
        }
        const divider = variant === "striped" ? "" : row === 0 ? "sm:border-t-0" : "";
        const border = variant === "striped" ? "" : `border-t border-navy/12 first:border-t-0 ${divider}`;
        return (
          <li key={item} className={`flex min-w-0 items-center gap-4 py-[18px] ${border} ${tone} ${text}`}>
            {marker === "bar" ? (
              <span aria-hidden="true" className="h-6 w-[3px] shrink-0 bg-gold" />
            ) : (
              <span aria-hidden="true" className="h-[2px] w-4 shrink-0 bg-gold" />
            )}
            <span className="min-w-0">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
