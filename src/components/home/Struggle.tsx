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
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>((gsap, _ScrollTrigger, element) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".eh-challenge-card"));
      const rows = Array.from(element.querySelectorAll<HTMLElement>(".challenge-index-row"));
      const stackOffset = () => Math.max(72, ...cards.map(card => (card.querySelector("header")?.getBoundingClientRect().height ?? 64) + 8));
      gsap.set(cards.slice(1), { y: () => window.innerHeight + 100 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 104px", end: () => `+=${window.innerHeight * 2.5}`, pin: true, pinSpacing: true, scrub: 0.7, invalidateOnRefresh: true,
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
    return () => mm.revert();
  }, []);
  useScrollScene(ref, setup, reduced);
  return <section aria-labelledby="challenge-title">
    <div ref={ref} className="eh-challenge [position:relative] [overflow:visible] [isolation:isolate] [margin:0] [border-radius:0] [z-index:auto] [background:var(--paper)] [height:100dvh] [@media(max-width:1023.98px)]:[height:auto] bg-wash">
    <div className="container-x eh-challenge-layout [padding-block:24px_128px] [display:grid] [grid-template-columns:minmax(0,4fr)_minmax(0,8fr)] [gap:32px] [align-items:center] [min-height:0] [height:100%] [@media(max-width:1023.98px)]:[padding-block:56px] [@media(max-height:599.98px)]:[display:block] [@media(max-width:1023.98px)_and_(min-height:600px)]:[display:block] [@media(max-width:1023.98px)]:[height:auto]">
      <div className="eh-challenge-heading [@media(max-height:599.98px)]:[max-width:650px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[max-width:650px] [@media(max-width:1023.98px)]:[margin-bottom:40px] [@media(min-width:1024px)_and_(max-height:599.98px)]:[margin-bottom:48px] [&>p]:[font-size:16px] [&>p]:[margin-top:16px]"><GoldRule /><p className="eyebrow mt-6">The Challenge</p><h2 id="challenge-title" className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] mt-4 text-navy">Why Organizations Struggle</h2><p className="mt-6 text-lg text-ink/80">Many organizations struggle with challenges such as:</p>
        <ol className="challenge-index [display:grid] [gap:12px] [margin-top:28px] [@media(max-width:1023.98px)]:[display:none] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[gap:10px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[margin-top:20px]">{CARDS.map((card, i) => <li key={card.n} className="challenge-index-row [display:flex] [gap:12px] [position:relative] [border-left:3px_solid_transparent] [padding-left:12px] [font-size:13px] [line-height:1.45] [color:var(--challenge-index-row-color-12)] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[font-size:12px] [&[data-active=true]]:[border-color:var(--gold)] [&[data-active=true]]:[color:var(--navy)] [&[data-active=true]]:[font-weight:700]" data-active={i === 0 ? "true" : "false"}><span>{card.n}</span><span>{card.text}</span></li>)}</ol>
      </div>
      <div className="eh-challenge-stack [position:relative] [height:min(52vh,calc(100dvh_-_280px))] [min-height:0] [margin-top:0] [align-self:end] [@media(max-width:1023.98px)]:[height:auto] [@media(max-width:1023.98px)]:[padding-bottom:0] [@media(min-width:1024px)_and_(max-height:599.98px)]:[padding-bottom:64px]">{CARDS.map((card, i) => <article key={card.n} className={`eh-challenge-card [position:absolute] [inset:0] [display:grid] [grid-template-columns:45%_55%] [gap:0] [padding:0] [border-radius:24px] [min-height:0] [transform-origin:top] [overflow:hidden] [height:100%] [@media(max-height:599.98px)]:[position:sticky] [@media(max-width:1023.98px)_and_(min-height:600px)]:[position:sticky] [@media(max-width:767.98px)]:[display:flex] [@media(min-width:768px)_and_(max-width:1023.98px)]:[min-height:400px] [@media(max-height:599.98px)]:[top:88px] [@media(max-width:1023.98px)_and_(min-height:600px)]:[top:88px] [@media(max-width:1023.98px)]:[margin-bottom:24px] [@media(min-width:1024px)_and_(max-height:599.98px)]:[margin-bottom:60px] [@media(max-width:767.98px)]:[flex-direction:column] [@media(max-width:1023.98px)]:[height:auto] [@media(max-width:1023.98px)]:[&[data-card='2']]:[top:152px] [@media(min-width:1024px)_and_(max-height:599.98px)]:[&[data-card='2']]:[top:100px] [@media(max-width:1023.98px)]:[&[data-card='3']]:[top:216px] [@media(min-width:1024px)_and_(max-height:599.98px)]:[&[data-card='3']]:[top:112px] [@media(max-width:1023.98px)]:[&[data-card='4']]:[top:280px] [@media(min-width:1024px)_and_(max-height:599.98px)]:[&[data-card='4']]:[top:124px] [@media(max-height:599.98px)]:[&[data-card='4']]:[margin-bottom:0] [@media(max-width:1023.98px)_and_(min-height:600px)]:[&[data-card='4']]:[margin-bottom:0] shadow-lift ${card.card}`} data-card={i + 1}>
        <div className="challenge-card-text [display:flex] [flex-direction:column] [padding:76px_20px_24px] [min-width:0] [background:inherit] [@media(max-width:767.98px)]:[padding:24px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[padding:76px_16px_20px]"><header className="eh-challenge-title [align-self:start] [display:flex] [gap:12px] [position:absolute] [top:0] [left:0] [right:0] [z-index:2] [background:inherit] [align-items:center] [padding:0_20px] [height:56px] [@media(max-width:767.98px)]:[position:static] [@media(max-width:767.98px)]:[padding:0] [&_h3]:[font-size:28px] [&_h3]:[font-weight:600] [&_h3]:[line-height:1.15] [@media(max-width:767.98px)]:[&_h3]:[font-size:24px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[&_h3]:[font-size:24px] [&>span]:[font-size:24px] [&>span]:[line-height:1.3]"><span className={`font-display font-semibold ${card.num}`}>{card.n}</span><h3>{card.text}</h3></header><div className="challenge-card-detail [display:flex] [align-items:center] [justify-content:space-between] [margin-top:auto] [padding-top:24px] [font-family:var(--font-display)] [font-size:13px] [@media(max-width:767.98px)]:[padding-top:20px]"><card.Icon size={32} strokeWidth={1.5} aria-hidden="true" /><span>{card.n} / 04</span></div></div>
        <div className="eh-challenge-image [overflow:hidden] [align-self:stretch] [border-radius:0_24px_24px_0] [mask-image:none] [height:100%] [@media(max-width:767.98px)]:[border-radius:24px_24px_0_0] [@media(max-width:767.98px)]:[order:-1] [@media(max-width:767.98px)]:[width:100%] [@media(max-width:767.98px)]:[aspect-ratio:16/9] [@media(max-width:767.98px)]:[flex-shrink:0] [@media(max-width:767.98px)]:[height:auto] [&_img]:[width:100%] [&_img]:[height:100%] [&_img]:[object-fit:cover]"><ResponsiveImage asset={card.image} alt={card.alt} loading="lazy" sizes="(min-width: 1024px) 35vw, 100vw" /></div>
      </article>)}</div>
    </div>
    </div>
  </section>;
}
