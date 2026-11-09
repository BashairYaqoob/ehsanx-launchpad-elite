import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { BrandButton, GoldRule } from "@/components/ui-brand";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { ImageAsset } from "@/lib/image-assets";

/** How a card is coloured. Each tone sets the card ground, its text and its accents. */
type Tone = "navy" | "paper" | "gold" | "teal";

/**
 * How an element card holds its photograph: "panel" sets it in an inset frame beside the text,
 * "bleed" runs it flush to the card's right edge, "full" fills the card behind a solid text panel.
 */
type PhotoLayout = "panel" | "bleed" | "full";

export type StackCard = {
  name: string;
  /** The element's definition, set as the card's lead. */
  lead: string;
  tone: Tone;
  photo: { asset: ImageAsset; alt: string; position?: string; layout: PhotoLayout };
  /** A closing line set on the card itself. */
  note?: string;
  /** A statement from the model given its own text-led card, placed after this element. */
  aside?: { statement: string; tone: Tone };
};

export type StackProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  cards: StackCard[];
  cta: { label: string; to: "/philosophy" };
};

const TONES: Record<Tone, { card: string; numeral: string; rule: string; muted: string }> = {
  navy: {
    card: "bg-navy text-paper",
    numeral: "text-gold",
    rule: "bg-gold",
    muted: "text-paper/70",
  },
  paper: {
    card: "bg-paper text-navy",
    numeral: "text-teal",
    rule: "bg-teal",
    muted: "text-ink/65",
  },
  gold: { card: "bg-gold text-ink", numeral: "text-ink", rule: "bg-ink", muted: "text-ink/70" },
  teal: {
    card: "bg-teal text-paper",
    numeral: "text-gold",
    rule: "bg-gold",
    muted: "text-paper/70",
  },
};

// Motion measured from the reference: cards slide sideways at a steady rate while riding round a
// drum lying on its side. A card is flat at the centre and tilts to 50° as it nears either edge,
// rising and receding as it goes, so it enters low on the left and leaves high on the right.
const MAX_TILT = 50;
/** Drum radius as a share of the viewport height (480px at 900px). */
const RADIUS = 0.533;
/** Distance from the centre, as a share of the viewport width, at which the tilt is complete. */
const TILT_SPAN = 1.11;
/** Gap between neighbouring cards along the track. */
const GAP = { wide: 140, narrow: 28 };
/** Pixels of sideways travel per pixel scrolled. */
const SPEED = { wide: 1.24, medium: 1.05, narrow: 0.85 };
/** Darkening given to a fully tilted card, so the centred card holds the attention. */
const SHADE = 0.32;
const SCENE_QUERY = "(min-height: 560px)";

const CARD_SIZE = {
  element:
    "w-[min(88vw,560px)] min-h-[min(600px,76svh)] md:w-[min(84vw,680px)] lg:w-[760px] lg:min-h-[min(480px,62svh)]",
  aside: "w-[min(78vw,400px)] min-h-[min(520px,66svh)] lg:w-[420px] lg:min-h-[min(480px,62svh)]",
};
const SCENE_CARD =
  "group-data-[scene=on]/eplus:absolute group-data-[scene=on]/eplus:left-1/2 group-data-[scene=on]/eplus:top-1/2 group-data-[scene=on]/eplus:-translate-x-1/2 group-data-[scene=on]/eplus:-translate-y-1/2";
const CARD_BASE =
  "relative flex shrink-0 flex-col overflow-hidden rounded-[24px] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_24px_60px_-24px_rgb(0_0_0/0.6)] md:rounded-[32px]";

/**
 * The E-Plus Model as a diagonal scene. A tall track holds a sticky, full-height stage; scrolling
 * through the track carries the cards from the lower left, through the centre, out to the upper
 * right. Every card is in the markup in reading order, and without the scene (no JavaScript,
 * reduced motion or a very short window) they read as a staggered column.
 */
export function JourneyStack({ eyebrow, title, subtitle, intro, cards, cta }: StackProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (gsap, ScrollTrigger, element) => {
      const track = element.querySelector<HTMLElement>("[data-scene-track]");
      const stage = element.querySelector<HTMLElement>("[data-scene-stage]");
      const items = Array.from(element.querySelectorAll<HTMLElement>("[data-scene-card]"));
      if (!track || !stage || items.length === 0) return;
      const shades = items.map((item) => item.querySelector<HTMLElement>("[data-scene-shade]"));
      let centres: number[] = [];
      let travel = 0;
      let radius = 0;
      let span = 1;

      const measure = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const gap = width >= 768 ? GAP.wide : GAP.narrow;
        const speed = width >= 1024 ? SPEED.wide : width >= 768 ? SPEED.medium : SPEED.narrow;
        const widths = items.map((item) => item.offsetWidth);
        centres = widths.map((_, i) =>
          widths.slice(0, i).reduce((sum, w, j) => sum + w / 2 + gap + (widths[j + 1] ?? 0) / 2, 0),
        );
        travel = centres[centres.length - 1] ?? 0;
        radius = RADIUS * height;
        span = TILT_SPAN * width;
        track.style.height = `${Math.round(travel / speed + height)}px`;
        stage.style.perspective = `${Math.round(Math.max(1000, width * 1.336))}px`;
      };
      const render = (progress: number) => {
        const offset = progress * travel;
        items.forEach((item, i) => {
          // Later cards wait to the left (negative) and every card moves right as the page scrolls.
          const distance = offset - (centres[i] ?? 0);
          const reach = Math.min(1, Math.abs(distance) / span);
          const eased = 1 - (1 - reach) ** 2;
          const tilt = Math.sign(distance) * MAX_TILT * eased;
          const angle = (tilt * Math.PI) / 180;
          const y = -radius * Math.sin(angle);
          const z = -radius * (1 - Math.cos(angle));
          item.style.transform = `translate3d(${distance.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${tilt.toFixed(2)}deg)`;
          // The card nearest the centre sits in front; the others fall behind it.
          item.style.zIndex = String(1000 - Math.round(Math.abs(distance) / 4));
          const shade = shades[i];
          if (shade) shade.style.opacity = (SHADE * eased).toFixed(3);
        });
      };
      const clear = () => {
        element.dataset["scene"] = "off";
        track.style.removeProperty("height");
        stage.style.removeProperty("perspective");
        items.forEach((item, i) => {
          item.style.removeProperty("transform");
          item.style.removeProperty("z-index");
          shades[i]?.style.removeProperty("opacity");
        });
      };

      const mm = gsap.matchMedia();
      mm.add(SCENE_QUERY, () => {
        element.dataset["scene"] = "on";
        measure();
        // Track height depends on the viewport, so it is recalculated before every refresh.
        ScrollTrigger.addEventListener("refreshInit", measure);
        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => render(self.progress),
          onRefresh: (self) => render(self.progress),
        });
        render(trigger.progress);
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", measure);
          trigger.kill();
          clear();
        };
      });
      return () => {
        mm.revert();
        clear();
      };
    },
    [],
  );
  useScrollScene(ref, setup, reduced);

  let elementIndex = 0;
  return (
    <section
      ref={ref}
      data-scene="off"
      aria-labelledby="eplus-title"
      className="group/eplus relative isolate bg-ink pb-20 pt-20 text-paper [overflow-x:clip] md:pb-28 md:pt-28 lg:pt-32"
    >
      <header className="mx-auto max-w-[820px] px-4 text-center sm:px-6">
        <GoldRule className="mx-auto" />
        <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {eyebrow}
        </p>
        <h2
          id="eplus-title"
          className="mt-5 font-display text-[40px] font-bold leading-[1.04] tracking-[-0.02em] md:text-[60px] lg:text-[72px]"
        >
          {title}
          <span className="mt-3 block text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-paper/60 md:text-[30px] lg:text-[34px]">
            {subtitle}
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-[640px] text-base leading-[1.7] text-paper/75 md:text-lg">
          {intro}
        </p>
      </header>

      <div data-scene-track className="relative mt-14 md:mt-20 group-data-[scene=on]/eplus:mt-6">
        <div
          data-scene-stage
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-8 px-4 sm:px-6 md:gap-12 lg:px-8 group-data-[scene=on]/eplus:sticky group-data-[scene=on]/eplus:top-0 group-data-[scene=on]/eplus:block group-data-[scene=on]/eplus:h-svh group-data-[scene=on]/eplus:max-w-none group-data-[scene=on]/eplus:overflow-clip group-data-[scene=on]/eplus:px-0"
        >
          {cards.flatMap((card) => {
            const index = elementIndex++;
            const number = String(index + 1).padStart(2, "0");
            const nodes = [
              <ElementCard key={card.name} card={card} index={index} total={cards.length} />,
            ];
            if (card.aside) {
              nodes.push(
                <AsideCard
                  key={`${card.name}-aside`}
                  statement={card.aside.statement}
                  tone={card.aside.tone}
                  number={number}
                  name={card.name}
                />,
              );
            }
            return nodes;
          })}
        </div>
      </div>

      <div className="mt-14 flex justify-center px-4 md:mt-16">
        <BrandButton to={cta.to} variant="gold">
          {cta.label}
        </BrandButton>
      </div>
    </section>
  );
}

function Shade() {
  return (
    <span
      data-scene-shade
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0"
    />
  );
}

function CardHeading({ card, index, total }: { card: StackCard; index: number; total: number }) {
  const tone = TONES[card.tone];
  const number = String(index + 1).padStart(2, "0");
  return (
    <>
      <div
        className="flex items-baseline gap-3 font-display text-sm font-semibold"
        aria-hidden="true"
      >
        <span className={tone.numeral}>{number}</span>
        <span className="opacity-60">/ {String(total).padStart(2, "0")}</span>
      </div>
      <h3
        id={`eplus-card-${index}`}
        className="mt-4 font-display text-[30px] font-bold leading-[1.02] tracking-[-0.025em] md:mt-5 md:text-[44px] lg:text-[48px]"
      >
        <span className="sr-only">{number}. </span>
        {card.name}
      </h3>
      <p className="mt-4 max-w-[30ch] font-display text-[17px] font-semibold leading-[1.35] md:mt-5 md:text-[21px]">
        {card.lead}
      </p>
    </>
  );
}

function CardNote({ card }: { card: StackCard }) {
  const tone = TONES[card.tone];
  if (!card.note) return null;
  return (
    <div className="mt-6 flex gap-4 lg:mt-auto lg:pt-6">
      <span aria-hidden="true" className={`mt-[0.6em] h-[2px] w-8 shrink-0 ${tone.rule}`} />
      <p className={`max-w-[40ch] text-[15px] leading-[1.6] ${tone.muted}`}>{card.note}</p>
    </div>
  );
}

function ElementCard({ card, index, total }: { card: StackCard; index: number; total: number }) {
  const tone = TONES[card.tone];
  const { photo } = card;
  const image = (className: string, sizes: string) => (
    <ResponsiveImage
      asset={photo.asset}
      alt={photo.alt}
      loading="lazy"
      sizes={sizes}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition: photo.position ?? "center" }}
    />
  );
  const offset = index % 2 === 0 ? "lg:self-start" : "lg:self-end";
  // The edge-to-edge photograph needs a wider card, so its text column still fits the long title.
  const size = photo.layout === "bleed" ? `${CARD_SIZE.element} lg:w-[920px]` : CARD_SIZE.element;
  const frame = `${CARD_BASE} ${size} ${SCENE_CARD} ${offset} ${tone.card}`;

  if (photo.layout === "full") {
    // The photograph fills the card; the text sits on a solid panel in the lower left.
    return (
      <article data-scene-card aria-labelledby={`eplus-card-${index}`} className={frame}>
        {image("", "(min-width: 1024px) 760px, 90vw")}
        <div className="relative mt-auto p-3 md:p-4">
          <div
            className={`rounded-[18px] p-5 md:max-w-[440px] md:rounded-[24px] md:p-7 ${tone.card}`}
          >
            <CardHeading card={card} index={index} total={total} />
            <CardNote card={card} />
          </div>
        </div>
        <Shade />
      </article>
    );
  }

  if (photo.layout === "bleed") {
    // The photograph runs flush to the right edge, so the people on its right stay in view.
    return (
      <article
        data-scene-card
        aria-labelledby={`eplus-card-${index}`}
        className={`${frame} lg:flex-row`}
      >
        <div className="relative min-h-[220px] flex-1 lg:order-2 lg:min-h-0 lg:flex-none lg:basis-[48%]">
          {image("", "(min-width: 1024px) 440px, 90vw")}
        </div>
        <div className="flex min-w-0 flex-col p-5 sm:p-7 md:p-10 lg:basis-[52%] lg:p-10">
          <CardHeading card={card} index={index} total={total} />
          <CardNote card={card} />
        </div>
        <Shade />
      </article>
    );
  }

  return (
    <article data-scene-card aria-labelledby={`eplus-card-${index}`} className={frame}>
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8 lg:p-5 lg:pl-10">
        <div className="flex min-w-0 flex-col px-1 pt-1 lg:px-0 lg:py-5">
          <CardHeading card={card} index={index} total={total} />
          <CardNote card={card} />
        </div>
        <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[16px] md:rounded-[22px] lg:min-h-0">
          {image("", "(min-width: 1024px) 340px, 90vw")}
        </div>
      </div>
      <Shade />
    </article>
  );
}

function AsideCard({
  statement,
  tone,
  number,
  name,
}: {
  statement: string;
  tone: Tone;
  number: string;
  name: string;
}) {
  const style = TONES[tone];
  // Type-led: the element's numeral set large at the top, the statement anchored to the foot.
  return (
    <aside
      data-scene-card
      aria-label={`${number} ${name}`}
      className={`${CARD_BASE} ${CARD_SIZE.aside} ${SCENE_CARD} justify-between p-6 md:p-9 ${style.card}`}
    >
      <div className="flex items-start justify-between gap-4" aria-hidden="true">
        <span
          className={`font-display text-[88px] font-extrabold leading-[0.8] tracking-[-0.04em] md:text-[112px] ${style.numeral}`}
        >
          {number}
        </span>
        <span
          className={`mt-2 max-w-[12ch] text-right font-display text-sm font-semibold leading-[1.3] ${style.muted}`}
        >
          {name}
        </span>
      </div>
      <div className="mt-10">
        <span aria-hidden="true" className={`block h-[3px] w-10 ${style.rule}`} />
        <p className="mt-5 font-display text-[24px] font-bold leading-[1.16] tracking-[-0.02em] md:text-[28px]">
          {statement}
        </p>
      </div>
      <Shade />
    </aside>
  );
}
