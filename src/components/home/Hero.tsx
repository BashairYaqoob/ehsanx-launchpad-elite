import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import heroBlocks from "@/assets/hero-blocks.webp";
import heroCliff from "@/assets/hero-cliff.webp";
import heroRipple from "@/assets/hero-ripple.webp";
import heroShip from "@/assets/hero-ship.webp";
import { BrandButton } from "@/components/ui-brand";
import { useIntroReady } from "@/lib/intro";
import { EASE } from "@/lib/site";

const DURATION = 6500;

const SLIDES = [
  {
    title: "Building Leaders. Transforming Organizations.",
    sub: "We help organizations develop leaders who can navigate complexity, strengthen teams, and create lasting impact.",
    img: heroBlocks,
    pos: "70% center",
    alt: "Stacked navy, teal and gold blocks forming the EX mark in a bright atrium",
  },
  {
    title: "Leadership That Creates Real Change.",
    sub: "Equip your people with the clarity, capability, and confidence to turn leadership potential into measurable performance.",
    img: heroCliff,
    pos: "65% center",
    alt: "Origami boats climbing in a rising arc toward a gold boat on a cliff edge",
  },
  {
    title: "From Individual Growth to Organizational Impact.",
    sub: "Align leadership, strengthen organizational culture, and turn development initiatives into meaningful business outcomes.",
    img: heroRipple,
    pos: "60% center",
    alt: "Origami boats rippling outward on calm water from a glowing gold boat at the center",
  },
  {
    title: "Every Organization Has the Potential to Go Further.",
    sub: "We partner with organizations to uncover potential, navigate challenges, and build the capabilities needed for what comes next.",
    img: heroShip,
    pos: "70% center",
    alt: "A wooden sailing ship with an EhsanX hull crossing the sea at sunset",
  },
];

export function Hero() {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const progress = useMotionValue(0);
  const ref = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const paused = !ready || hovered || userPaused || tabHidden;
  const go = useCallback(
    (d: number) => {
      progress.set(0);
      setIndex((i) => (i + d + SLIDES.length) % SLIDES.length);
    },
    [progress],
  );

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const p = progress.get() + (now - last) / DURATION;
      last = now;
      if (p >= 1) {
        go(1);
      } else {
        progress.set(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, go, progress]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const slide = SLIDES[index];
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-navy-deep text-paper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      tabIndex={0}
    >
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.img
              src={slide.img}
              alt={slide.alt}
              width={1600}
              height={1000}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.pos }}
              initial={{ scale: 1 }}
              animate={{ scale: reduce ? 1 : 1.08 }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="bg-hero-overlay absolute inset-0" />
      </motion.div>
      {/* Preload remaining slide images quietly */}
      <div className="hidden">
        {SLIDES.slice(1).map((s) => (
          <img key={s.img} src={s.img} alt="" loading="lazy" />
        ))}
      </div>

      <motion.div
        className="container-x relative z-10 flex h-full items-center pt-24"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-[680px]" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            {ready && (
              <motion.div
                key={index}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.35 } }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              >
                <motion.p
                  className="eyebrow-dark"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </motion.p>
                <Heading className="h1-display mt-5">
                  {slide.title.split(" ").map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
                          show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay: i * 0.04 } },
                        }}
                      >
                        {w}&nbsp;
                      </motion.span>
                    </span>
                  ))}
                </Heading>
                <motion.p
                  className="mt-6 max-w-xl text-lg text-paper/85 md:text-xl"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.35 } } }}
                >
                  {slide.sub}
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.5 } } }}
                >
                  <BrandButton to="/contact">Start a Conversation</BrandButton>
                  <BrandButton to="/our-approach" variant="outline-light">
                    Explore Our Approach
                  </BrandButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="container-x absolute inset-x-0 bottom-8 z-20 flex items-end justify-between">
        <div className="flex items-center gap-3" role="tablist" aria-label="Choose slide">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i - index)}
              className="group flex min-h-11 flex-col items-start justify-center gap-2"
            >
              <span className={`font-display text-xs font-semibold ${i === index ? "text-paper" : "text-paper/50"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative block h-[2px] w-10 overflow-hidden bg-paper/25 md:w-16">
                {i === index && (
                  <motion.span className="absolute inset-0 origin-left bg-gold" style={{ scaleX: progress }} />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper/10"
          >
            {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden>
        <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-paper/70">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-paper/20">
          <span className="animate-scroll-line absolute inset-0 bg-gold" />
        </span>
      </div>
    </section>
  );
}
