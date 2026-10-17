import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Cpu, Hourglass, Lightbulb, Network, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { GoldRule } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

type CardDef = { n: string; text: string; Icon: LucideIcon; card: string; num: string; icon: string };
const CARDS: CardDef[] = [
  { n: "01", text: "Limited ownership, initiative, and entrepreneurial thinking", Icon: Lightbulb, card: "bg-navy text-paper", num: "text-gold", icon: "bg-paper/10 text-gold" },
  { n: "02", text: "Short-term leadership and limited future readiness", Icon: Hourglass, card: "bg-teal text-paper", num: "text-gold", icon: "bg-paper/10 text-gold" },
  { n: "03", text: "Siloed teams and weak collaboration", Icon: Network, card: "bg-paper text-navy border border-navy/10", num: "text-teal", icon: "bg-teal/10 text-teal" },
  { n: "04", text: "Difficulty adapting to technological and AI-driven change", Icon: Cpu, card: "bg-gold text-navy", num: "text-navy", icon: "bg-navy/10 text-navy" },
];

function StackCard({ c, i, progress }: { c: CardDef; i: number; progress: MotionValue<number> }) {
  const n = CARDS.length;
  const start = (i + 1) / n;
  const depth = n - 1 - i;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - depth * 0.02 - (depth > 0 ? 0.0 : 0)]);
  const s2 = useTransform(progress, [start - 0.05, Math.min(start + 0.2, 1)], [1, depth > 0 ? 0.94 : 1]);
  const opacity = useTransform(progress, [start - 0.05, Math.min(start + 0.2, 1)], [1, depth > 0 ? 0.6 : 1]);
  const combined = useTransform([scale, s2], (v: number[]) => Math.min(v[0] ?? 1, v[1] ?? 1));

  return (
    <motion.article
        style={{ scale: combined, opacity, ["--top-m" as string]: `${96 + i * 16}px`, ["--top-d" as string]: `${120 + i * 24}px` }}
        className={cn(
          "sticky top-[var(--top-m)] mb-[45vh] flex last:mb-[10vh] min-h-[300px] w-full origin-top flex-col justify-between rounded-3xl p-8 shadow-lift md:top-[var(--top-d)] md:min-h-[340px] md:p-12",
          c.card,
        )}
      >
        <div className="flex items-start justify-between">
          <span className={cn("font-display text-6xl font-extrabold leading-none md:text-7xl", c.num)}>{c.n}</span>
          <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", c.icon)}>
            <c.Icon className="h-7 w-7" aria-hidden />
          </span>
        </div>
        <h3 className="h3-display mt-12 max-w-md">{c.text}</h3>
      </motion.article>
  );
}

export function Struggle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="section-y bg-wash">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[140px]">
            <GoldRule />
            <p className="eyebrow mt-6">The Challenge</p>
            <h2 className="h2-display mt-4 text-navy">Why Organizations Struggle</h2>
            <p className="mt-6 text-lg text-ink/80">Many organizations struggle with challenges such as:</p>
          </div>
        </div>
        <div ref={ref} className="pb-[10vh] md:col-span-7">
          {CARDS.map((c, i) => (
            <StackCard key={c.n} c={c} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
