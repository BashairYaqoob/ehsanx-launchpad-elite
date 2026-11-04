import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoldRule } from "@/components/ui-brand";
import { useScrollScene } from "@/hooks/use-scroll-scene";

const CARDS = [
  { text: "Limited ownership, initiative, and entrepreneurial thinking", detail: "People wait for direction instead of taking ownership, showing initiative, and thinking entrepreneurially.", card: "bg-navy text-paper", rule: "bg-gold" },
  { text: "Short-term leadership and limited future readiness", detail: "Leadership focused on the short term leaves the organization less ready for what comes next.", card: "bg-teal text-paper", rule: "bg-gold" },
  { text: "Siloed teams and weak collaboration", detail: "Teams work in silos, and collaboration across the organization stays weak.", card: "bg-paper text-navy border border-navy/15", rule: "bg-teal" },
  { text: "Difficulty adapting to technological and AI-driven change", detail: "Organizations find it difficult to adapt as technology and AI change how work is done.", card: "bg-gold text-navy", rule: "bg-navy" },
];

const PINNED_QUERY = "(min-width: 1024px) and (min-height: 600px)";

export function Struggle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setPinned(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  // List mode (mobile, tablet, short screens, reduced motion): the card crossing the
  // middle of the viewport becomes the active challenge as the user scrolls.
  useEffect(() => {
    if (pinned || !ref.current) return;
    const cards = Array.from(ref.current.querySelectorAll<HTMLElement>(".eh-challenge-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset["index"]));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [pinned]);

  const setup = useCallback<Parameters<typeof useScrollScene>[1]>((gsap, _ScrollTrigger, element) => {
    const mm = gsap.matchMedia();
    mm.add(PINNED_QUERY, () => {
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".eh-challenge-card"));
      const rows = Array.from(element.querySelectorAll<HTMLElement>(".challenge-index-row"));
      if (cards.length < 2) return;
      const stackOffset = () => Math.max(72, ...cards.map((card) => (card.querySelector("header")?.getBoundingClientRect().height ?? 64) + 8));
      gsap.set(cards.slice(1), { y: () => window.innerHeight + 100 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element, start: "top 104px", end: () => `+=${window.innerHeight * 2.5}`, pin: true, pinSpacing: true, scrub: 0.7, invalidateOnRefresh: true,
          onUpdate: (self) => { const current = Math.min(3, Math.floor(self.progress * 3.5)); rows.forEach((row, i) => (row.dataset["active"] = String(i === current))); },
        },
      });
      cards.slice(1).forEach((card, i) => {
        cards.slice(0, i + 1).forEach((previous, j) => {
          tl.to(previous, { scale: 0.95, y: () => -(i + 1 - j) * stackOffset(), duration: 1, ease: "none" }, i);
          const detail = previous.querySelector(".challenge-card-detail");
          if (detail) tl.to(detail, { opacity: 0, duration: 1, ease: "none" }, i);
        });
        tl.to(card, { y: 0, duration: 1, ease: "none" }, i);
      });
      tl.to({}, { duration: 0.5 });
    });
    return () => mm.revert();
  }, []);
  useScrollScene(ref, setup, reduced);

  return <section aria-labelledby="challenge-title">
    <div ref={ref} data-mode={pinned ? "pinned" : "list"} className={`group/ch eh-challenge relative isolate bg-wash [background:var(--paper)] ${pinned ? "h-dvh" : ""}`}>
      <div className={`container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 ${pinned ? "grid h-full grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-center gap-8 pb-32 pt-6" : "py-16 md:py-20 lg:py-24"}`}>
        <div className={`[&>p]:[font-size:16px] [&>p]:[margin-top:16px] ${pinned ? "" : "mb-10 max-w-[650px]"}`}>
          <GoldRule />
          <p className="eyebrow [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--teal)] mt-6">The Challenge</p>
          <h2 id="challenge-title" className="mt-4 font-display text-[32px] font-bold leading-[1.1] text-navy md:text-[36px] lg:max-xl:text-[30px]">Why Organizations Struggle</h2>
          <p className="mt-6 text-lg text-ink/80">Many organizations struggle with challenges such as:</p>
          {pinned && <ol className="challenge-index mt-7 grid gap-3 lg:max-xl:mt-5 lg:max-xl:gap-2.5">{CARDS.map((card, i) => <li key={card.text} className="challenge-index-row [display:flex] [gap:12px] [border-left:3px_solid_transparent] [padding-left:12px] [font-size:13px] [line-height:1.45] [color:var(--challenge-index-row-color-12)] lg:max-xl:[font-size:12px] [&[data-active=true]]:[border-color:var(--gold)] [&[data-active=true]]:[color:var(--navy)] [&[data-active=true]]:[font-weight:700]" data-active={i === 0 ? "true" : "false"}><span>{String(i + 1).padStart(2, "0")}</span><span>{card.text}</span></li>)}</ol>}
        </div>
        <div className={pinned ? "relative h-[min(52vh,calc(100dvh_-_280px))] self-end" : "grid gap-5"}>
          {CARDS.map((card, i) => {
            const isActive = pinned || i === active;
            return <article
              key={card.text}
              data-index={i}
              data-active={isActive}
              className={`eh-challenge-card flex origin-top flex-col overflow-hidden rounded-[24px] shadow-lift [box-shadow:var(--shadow-lift)] transition-[background-color,color,opacity,transform] duration-500 ${pinned ? "absolute inset-0" : "relative"} ${isActive ? card.card : "border border-navy/15 bg-paper text-navy opacity-70"} ${!pinned && isActive ? "scale-100" : ""} ${!pinned && !isActive ? "scale-[0.98]" : ""}`}
            >
              <header className="px-6 pb-4 pt-6 md:px-10 md:pt-8 lg:px-12 lg:pt-9">
                <h3 className="max-w-[24ch] font-display text-[22px] font-semibold leading-[1.2] md:text-[28px] lg:max-xl:text-[26px]">{card.text}</h3>
              </header>
              <div className="challenge-card-detail mt-auto px-6 pb-7 md:px-10 md:pb-10 lg:px-12 lg:pb-12">
                <span aria-hidden="true" className={`mb-5 block h-[2px] w-12 ${isActive ? card.rule : "bg-teal"}`} />
                <p className="max-w-[46ch] text-base leading-[1.65] md:text-lg">{card.detail}</p>
              </div>
            </article>;
          })}
        </div>
      </div>
    </div>
  </section>;
}
