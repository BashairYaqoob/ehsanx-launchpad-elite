import { useCallback, useId, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { BrandButton, GoldRule } from "@/components/ui-brand";

/* ------------------------------------------------------------------------------------------------
 * Path layout: one curved ribbon through the five stages (desktop), a vertical rail (below 1024px).
 * Everything renders complete on the server and without motion: full amber ribbon, every stage
 * reached. With motion allowed, the scroll scene sets the in-progress state after hydration.
 * ---------------------------------------------------------------------------------------------- */

type PathStage = { name: string; description: string };
export type PathProps = {
  kind: "approach";
  eyebrow: string;
  title: string;
  intro: string;
  stages: PathStage[];
  cta: { label: string; to: "/our-approach" };
};

// Desktop geometry in a 1184 x 1400 box (the content width at 1440px). The route enters from the
// left edge, falls through 01 and 02, ties one loop in the open left space, runs out to 03, returns
// through 04 to 05 and leaves off the right edge. Text sits on whichever side of a disc has room.
const BOX = { w: 1184, h: 1400 };
// `room`: the share of the box width free beside each disc, which caps its text column.
const NODES = [
  { x: 340, y: 160, side: "r", room: 40 },
  { x: 580, y: 420, side: "r", room: 40 },
  { x: 780, y: 730, side: "r", room: 29 },
  { x: 620, y: 965, side: "l", room: 40 },
  { x: 340, y: 1205, side: "r", room: 40 },
] as const;
const ROUTE = [
  "M -900 390 C -500 390, -260 330, -128 180",
  "C 30 0, 280 20, 340 160",
  "C 325 330, 560 300, 580 420",
  "C 600 550, 470 630, 350 610 C 200 585, 200 450, 330 460 C 470 470, 540 590, 640 650 C 720 695, 780 670, 780 730",
  "C 780 840, 640 860, 620 965",
  "C 630 1100, 360 1070, 340 1205",
  "C 330 1375, 720 1390, 1312 1320 C 1608 1285, 1900 1265, 2300 1255",
].join(" ");
// Decorative brand tapes at the page edges (desktop only). The right tape crosses itself, so it is
// drawn in two pieces: the second strand covers the first, lettering included.
const TAPE_RIGHT = [
  "M 1900 300 L 1312 300 C 1220 285, 1150 350, 1170 420 C 1190 490, 1290 480, 1280 415",
  "M 1280 415 C 1270 350, 1160 370, 1140 470 C 1120 570, 1230 620, 1312 600 L 1900 610",
];
const TAPE_LEFT = [
  "M -900 790 L -128 790 C -20 760, 110 820, 90 910 C 70 990, -40 980, -30 1060 C -20 1140, 90 1150, 60 1210 C 40 1260, -60 1270, -128 1250 L -900 1260",
];
const TAPE_WORDS = Array.from({ length: 16 }, () => "EHSANX").join("   ///   ");
// Visible ends of the route at 1440px, used to map scrolling onto the ribbon.
const ROUTE_TOP = 40;
const ROUTE_BOTTOM = 1390;
// Where on screen a stage counts as reached: a little lower on small screens, so the route
// completes as the last stage is passed.
const READING_LINE = { wide: 0.6, narrow: 0.8 };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Tape({ d, id }: { d: string; id: string }) {
  return (
    <g>
      <path id={id} d={d} fill="none" stroke="var(--gold)" strokeWidth="30" strokeLinecap="round" />
      <text
        fill="var(--ink)"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="2.5"
        dominantBaseline="central"
      >
        <textPath href={`#${id}`}>{TAPE_WORDS}</textPath>
      </text>
    </g>
  );
}

export function JourneyPath({ eyebrow, title, intro, stages, cta }: PathProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const titleId = `${uid}-title`;

  const setup = useCallback<Parameters<typeof useScrollScene>[1]>(
    (_gsap, ScrollTrigger, element) => {
      const fill = element.querySelector<SVGPathElement>("[data-route-fill]");
      const box = element.querySelector<HTMLElement>("[data-route-box]");
      const list = element.querySelector<HTMLElement>("[data-stages]");
      const rail = element.querySelector<HTMLElement>("[data-rail-fill]");
      const items = Array.from(element.querySelectorAll<HTMLElement>("[data-stage]"));
      if (!fill || !box || !list || !rail || items.length !== NODES.length) return;
      const wide = window.matchMedia("(min-width: 1024px)");

      // Length along the route at each disc, at the visible start and at the visible end.
      const total = fill.getTotalLength();
      const samples: { s: number; x: number; y: number }[] = [];
      for (let s = 0; s <= total; s += 4) {
        const p = fill.getPointAtLength(s);
        samples.push({ s, x: p.x, y: p.y });
      }
      const nearest = (x: number, y: number) =>
        samples.reduce((best, p) =>
          (p.x - x) ** 2 + (p.y - y) ** 2 < (best.x - x) ** 2 + (best.y - y) ** 2 ? p : best,
        ).s;
      const nodeLengths = NODES.map((n) => nearest(n.x, n.y));
      const startLength = samples.find((p) => p.x >= -128)?.s ?? 0;
      const lastNode = nodeLengths[nodeLengths.length - 1] ?? 0;
      const endLength = samples.find((p) => p.s > lastNode && p.x >= BOX.w + 128)?.s ?? total;
      // Scroll position (as a y in the box) mapped piecewise onto the ribbon, so each disc lights
      // up as it crosses the reading line, and the loop fills smoothly on the way.
      const anchors: [number, number][] = [
        [ROUTE_TOP, startLength],
        ...NODES.map((n, i): [number, number] => [n.y, nodeLengths[i] ?? 0]),
        [ROUTE_BOTTOM, endLength],
      ];
      const drawnAt = (y: number) => {
        const first = anchors[0];
        const last = anchors[anchors.length - 1];
        if (!first || !last) return total;
        if (y <= first[0]) return 0;
        if (y >= last[0]) return total;
        for (let i = 1; i < anchors.length; i++) {
          const [y1, l1] = anchors[i] as [number, number];
          const [y0, l0] = anchors[i - 1] as [number, number];
          if (y <= y1) return l0 + ((y - y0) / (y1 - y0)) * (l1 - l0);
        }
        return total;
      };

      const setStates = (reached: number, complete: boolean) => {
        items.forEach((item, i) => {
          item.dataset["state"] =
            complete || i < reached ? "done" : i === reached ? "current" : "up";
        });
        list.dataset["complete"] = String(complete);
      };

      fill.style.strokeDasharray = `${total} ${total}`;
      const update = () => {
        const line = window.innerHeight * (wide.matches ? READING_LINE.wide : READING_LINE.narrow);
        if (wide.matches) {
          const rect = box.getBoundingClientRect();
          const drawn = drawnAt((line - rect.top) / (rect.width / BOX.w));
          fill.style.strokeDashoffset = String(total - drawn);
          const reached = nodeLengths.filter((l) => l <= drawn + 1).length - 1;
          setStates(reached, drawn >= endLength);
        } else {
          const rect = list.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
          rail.style.transform = `scaleY(${progress})`;
          const reached =
            items.filter((item) => {
              const node = item.querySelector("[data-node]")?.getBoundingClientRect();
              return node ? node.top + node.height / 2 <= line : false;
            }).length - 1;
          setStates(reached, progress >= 1);
        }
      };
      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: update,
      });
      wide.addEventListener("change", update);
      update();
      return () => {
        wide.removeEventListener("change", update);
        fill.style.strokeDasharray = "";
        fill.style.strokeDashoffset = "";
        rail.style.transform = "";
        setStates(NODES.length, true);
      };
    },
    [],
  );
  useScrollScene(ref, setup, reduced);

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className="relative overflow-hidden bg-paper py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-end lg:gap-16">
          <div>
            <GoldRule />
            <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              {eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 font-display text-[32px] font-bold leading-[1.08] text-navy md:text-[44px] xl:text-[56px]"
            >
              {title}
            </h2>
          </div>
          <p className="max-w-[56ch] text-base leading-[1.65] text-ink/80 md:text-[17px] lg:pb-2">
            {intro}
          </p>
        </div>

        <div
          data-route-box
          className="relative mt-12 md:mt-16 lg:mt-6 lg:aspect-[1184/1400] lg:[container-type:inline-size]"
        >
          {/* Desktop route: grey track under an amber fill (complete until the scroll scene runs). */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${BOX.w} ${BOX.h}`}
            className="absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            fill="none"
          >
            {TAPE_LEFT.map((d, i) => (
              <Tape key={d} d={d} id={`${uid}-tl${i}`} />
            ))}
            {TAPE_RIGHT.map((d, i) => (
              <Tape key={d} d={d} id={`${uid}-tr${i}`} />
            ))}
            <path
              d={ROUTE}
              stroke="#e7e8ea"
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              data-route-fill
              d={ROUTE}
              stroke="var(--gold)"
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div
            data-stages
            data-complete="true"
            className="group/list relative lg:absolute lg:inset-0"
          >
            {/* Small screens: entry curl from the left edge, a straight rail, and an exit sweep. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 48"
              className="absolute -top-12 right-[calc(100%-48px)] h-12 w-[120px] overflow-visible lg:hidden"
              fill="none"
            >
              <path
                d="M -400 6 L 0 6 C 60 2, 113 10, 113 48"
                stroke="var(--gold)"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[34px] top-0 w-[14px] bg-[#e7e8ea] lg:hidden"
            />
            <span
              aria-hidden="true"
              data-rail-fill
              className="absolute bottom-0 left-[34px] top-0 w-[14px] origin-top bg-gold lg:hidden"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 400 56"
              className="absolute left-[34px] top-full h-14 w-[400px] overflow-visible lg:hidden"
              fill="none"
            >
              <path
                d="M 7 -2 C 7 36, 40 44, 120 44 L 2400 44"
                strokeWidth="14"
                strokeLinecap="round"
                className="stroke-[#e7e8ea] transition-[stroke] duration-300 group-data-[complete=true]/list:stroke-gold"
              />
            </svg>

            <ol className="relative lg:static">
              {stages.map((stage, i) => {
                const node = NODES[i] ?? NODES[0];
                const left = node.side === "l";
                return (
                  <li
                    key={stage.name}
                    data-stage
                    data-state="done"
                    style={
                      {
                        "--x": pct(node.x, BOX.w),
                        "--y": pct(node.y, BOX.h),
                        "--room": `${node.room}cqw`,
                      } as CSSProperties
                    }
                    className="group/stage relative grid grid-cols-[76px_minmax(0,1fr)] pb-10 last:pb-9 lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:block lg:p-0 lg:last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      data-node
                      className="relative z-10 ml-[19px] grid h-11 w-11 place-items-center rounded-full bg-gold font-display text-[15px] font-bold text-ink transition-[background-color,color,box-shadow] duration-300 group-data-[state=up]/stage:bg-ink group-data-[state=up]/stage:text-gold group-data-[state=current]/stage:shadow-[0_0_0_10px_rgba(250,183,76,0.3)] motion-reduce:transition-none lg:absolute lg:left-0 lg:top-0 lg:ml-0 lg:h-12 lg:w-12 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-base xl:h-14 xl:w-14 xl:text-lg"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`min-w-0 lg:absolute lg:top-0 lg:w-[min(340px,var(--room))] lg:-translate-y-6 xl:-translate-y-7 ${left ? "lg:right-[76px] lg:text-right" : "lg:left-[60px]"}`}
                    >
                      <h3
                        className={`flex h-11 items-center font-display text-[22px] font-bold leading-[1.15] text-navy lg:h-12 lg:text-[clamp(24px,2.1vw,30px)] xl:h-14 ${left ? "lg:justify-end" : ""}`}
                      >
                        {stage.name}
                      </h3>
                      <p className="mt-1.5 text-base leading-[1.65] text-ink/80 lg:text-[15px] xl:text-base">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-24 lg:absolute lg:right-0 lg:top-[86.07%] lg:mt-0 lg:-translate-y-1/2">
            <BrandButton to={cta.to} variant="outline-navy">
              {cta.label}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
