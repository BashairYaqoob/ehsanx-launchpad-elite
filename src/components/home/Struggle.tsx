import { useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { Building2, Network, Sparkles, Unplug } from "lucide-react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { images } from "@/lib/image-assets";
import { ResponsiveImage } from "@/components/ResponsiveImage";
const CARDS = [
  { n: "01", text: "Limited ownership, initiative, and entrepreneurial thinking", card: "bg-navy text-paper", num: "text-gold", image: images.challenge_1, Icon: Unplug, alt: "Tethered navy paper boats beside a gold boat sailing freely" },
  { n: "02", text: "Short-term leadership and limited future readiness", card: "bg-teal text-paper", num: "text-gold", image: images.challenge_2, Icon: Building2, alt: "A teal paper boat tethered to shore" },
  { n: "03", text: "Siloed teams and weak collaboration", card: "bg-paper text-navy border border-navy/10", num: "text-teal", image: images.challenge_3, Icon: Network, alt: "Separate groups of paper boats divided by stone barriers" },
  { n: "04", text: "Difficulty adapting to technological and AI-driven change", card: "bg-gold text-navy", num: "text-navy", image: images.challenge_4, Icon: Sparkles, alt: "Paper boats navigating a complex geometric network" },
];
export function Struggle() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>((gsap, _ScrollTrigger, element) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".eh-challenge-card"));
      const rows = Array.from(element.querySelectorAll<HTMLElement>(".challenge-index-row"));
      const stackOffset = () => Math.max(72, ...cards.map(card => (card.querySelector("header")?.getBoundingClientRect().height ?? 64) + 8));
      gsap.set(cards.slice(1), { y: () => window.innerHeight + 100 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 104px", end: () => `+=${window.innerHeight * 3.5}`, pin: true, pinSpacing: true, scrub: 0.7, invalidateOnRefresh: true,
        onUpdate: self => { const active = Math.min(3, Math.floor(self.progress * 3.5)); rows.forEach((row, i) => row.dataset['active'] = String(i === active)); },
      }});
      cards.slice(1).forEach((card, i) => {
        cards.slice(0, i + 1).forEach((previous, j) => {
          tl.to(previous, { scale: 0.95, y: () => -(i + 1 - j) * stackOffset(), duration: 1, ease: "none" }, i);
          tl.to(previous.querySelector(".challenge-card-detail"), { opacity: 0.7, duration: 1, ease: "none" }, i);
        });
        tl.to(card, { y: 0, duration: 1, ease: "none" }, i);
      });
      tl.to({}, { duration: 0.5 });
    });
  }, []);
  useScrollScene(ref, setup, reduced);
  return <section ref={ref} className="eh-challenge bg-wash" aria-labelledby="challenge-title">
    <div className="container-x eh-challenge-layout">
      <div className="eh-challenge-heading"><GoldRule /><p className="eyebrow mt-6">The Challenge</p><h2 id="challenge-title" className="h2-display mt-4 text-navy">Why Organizations Struggle</h2><p className="mt-6 text-lg text-ink/80">Many organizations struggle with challenges such as:</p>
        <ol className="challenge-index">{CARDS.map((card, i) => <li key={card.n} className="challenge-index-row" data-active={i === 0 ? "true" : "false"}><span>{card.n}</span><span>{card.text}</span></li>)}</ol>
      </div>
      <div className="eh-challenge-stack">{CARDS.map((card, i) => <article key={card.n} className={`eh-challenge-card shadow-lift ${card.card}`} data-card={i + 1}>
        <div className="challenge-card-text"><header className="eh-challenge-title"><span className={`font-display font-semibold ${card.num}`}>{card.n}</span><h3>{card.text}</h3></header><div className="challenge-card-detail"><card.Icon size={32} strokeWidth={1.5} aria-hidden="true" /><span>{card.n} / 04</span></div></div>
        <div className="eh-challenge-image"><ResponsiveImage asset={card.image} alt={card.alt} loading="lazy" sizes="(min-width: 1024px) 35vw, 100vw" /></div>
      </article>)}</div>
    </div>
  </section>;
}
