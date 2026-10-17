import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item, Reveal } from "@/components/ui-brand";

const industries = ["Manufacturing", "Energy", "Banking", "Higher Education", "Healthcare", "Government", "SMEs", "Development Organizations", "Family Businesses"];
const paths = [
  "M8 38V23l10 5V20l10 7V15h7v23ZM12 33h3m6 0h3m7 0h3M29 15V9h5v6",
  "M15 39L23 8h2l8 31M19 24h10M17 32h14M16 18h16M20 11h8M10 15l-3 7h5l-3 7M38 15l-3 7h5l-3 7",
  "M7 18L24 8l17 10ZM9 39h30M7 35h34M12 22v10m8-10v10m8-10v10m8-10v10",
  "M5 17l19-9 19 9-19 9ZM13 22v8q11 8 22 0v-8M40 19v12M10 33v7l14-3 14 3v-7M24 31v6",
  "M24 7L39 13v12q-2 12-15 17Q11 37 9 25V13ZM12 25h7l3-7 4 13 3-6h7",
  "M9 39h30M7 35h34M12 31V20h24v11M10 20h28M15 18a9 9 0 0 1 18 0M24 8V5M17 24v7m7-7v7m7-7v7",
  "M9 39V23h30v16M6 17l4-8h28l4 8v6H6ZM13 10v13m7-13v13m8-13v13m7-13v13M14 28h8v7h-8M28 39V28h6v11",
  "M24 9a15 15 0 1 0 0 30 15 15 0 0 0 0-30ZM9 24h30M24 9c-10 9-10 21 0 30 10-9 10-21 0-30M5 29c-6-10 32-29 39-12M4 31c6 13 35-1 40-12",
  "M24 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM9 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM39 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8M15 39V29q0-7 9-7t9 7v10M3 37v-7q0-4 6-4h3m24 0h3q6 0 6 4v7",
];
function IndustryIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[index]} /><circle cx={index === 7 ? 42 : 38} cy={index === 0 ? 8 : 10} r="2" className="industry-accent" /></svg>;
}
export function WhoWeWorkWith() {
  const [paused, setPaused] = useState(false);
  return <section className="industries bg-paper" aria-labelledby="industries-title">
    <Reveal className="container-x industries-heading">
      <Item><span className="block h-[2px] w-[60px] bg-gold" aria-hidden="true" /><h2 id="industries-title" className="h2-display mt-6 text-navy">Who we work with</h2><p className="mt-6 max-w-[620px] text-lg text-ink/80">We partner with organizations across industries to develop people, create value, and transform institutions</p></Item>
      <Item><Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-navy" onClick={() => setPaused(p => !p)} aria-label={paused ? "Play industry strip" : "Pause industry strip"} aria-pressed={paused} title={paused ? "Play industry strip" : "Pause industry strip"}>{paused ? <Play size={16} /> : <Pause size={16} />}</Button></Item>
    </Reveal>
    <div className="industry-strip" data-paused={paused} tabIndex={0} aria-label="Industries">
      <div className="industry-track">
        {[0, 1].map(copy => <ul className="industry-list" key={copy} aria-hidden={copy === 1 ? true : undefined}>{industries.map((label, i) => <li key={label}><span className="industry-circle"><IndustryIcon index={i} /></span><span className="industry-label">{label}</span><span className="industry-separator" aria-hidden="true" /></li>)}</ul>)}
      </div>
    </div>
  </section>;
}