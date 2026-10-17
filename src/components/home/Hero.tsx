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
import blocks from "@/assets/hero-blocks-new.webp";
import blocksSmall from "@/assets/hero-blocks-new-1280.webp";
import cliff from "@/assets/hero-cliff-new-1920.webp.asset.json";
import cliffSmall from "@/assets/hero-cliff-new-1280.webp.asset.json";
import ripple from "@/assets/hero-ripple-new-1920.webp.asset.json";
import rippleSmall from "@/assets/hero-ripple-new-1280.webp.asset.json";
import ship from "@/assets/hero-ship-new-1920.webp.asset.json";
import shipSmall from "@/assets/hero-ship-new-1280.webp.asset.json";
import { BrandButton } from "@/components/ui-brand";
import { Button } from "@/components/ui/button";
import { HERO_DURATION, nextSlide, slideshowPaused } from "@/lib/hero-controls";
import { useIntroReady } from "@/lib/intro";
import { EASE } from "@/lib/site";

const SLIDES = [
  {
    title: "Building Leaders. Transforming Organizations.",
    sub: "We help organizations develop leaders who can navigate complexity, strengthen teams, and create lasting impact.",
    img: blocks,
    small: blocksSmall,
    height: 1088,
    pos: "70% center",
    alt: "Navy, teal and gold EX sculpture in a sunlit atrium",
  },
  {
    title: "Leadership That Creates Real Change.",
    sub: "Equip your people with the clarity, capability, and confidence to turn leadership potential into measurable performance.",
    img: cliff.url,
    small: cliffSmall.url,
    height: 1080,
    pos: "65% center",
    alt: "Origami boats climbing toward a gold boat on a cliff",
  },
  {
    title: "From Individual Growth to Organizational Impact.",
    sub: "Align leadership, strengthen organizational culture, and turn development initiatives into meaningful business outcomes.",
    img: ripple.url,
    small: rippleSmall.url,
    height: 1080,
    pos: "60% center",
    alt: "Origami boats forming ripples around a gold boat",
  },
  {
    title: "Every Organization Has the Potential to Go Further.",
    sub: "We partner with organizations to uncover potential, navigate challenges, and build the capabilities needed for what comes next.",
    img: ship.url,
    small: shipSmall.url,
    height: 1080,
    pos: "70% center",
    alt: "An EhsanX sailing ship crossing the sea",
  },
] as const;

export function Hero() {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [zoom, setZoom] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const progress = useMotionValue(0);
  const paused = slideshowPaused({
    ready,
    hovered,
    focused,
    userPaused,
    hidden,
    reduced: !!reduce,
  });
  const go = useCallback(
    (direction: number) => {
      progress.set(0);
      setIndex((i) => nextSlide(i, direction, SLIDES.length));
    },
    [progress],
  );
  const slide = SLIDES[index] ?? SLIDES[0];
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setZoom(Math.max(1, Math.min(1.05, 1920 / rect.width, slide.height / rect.height)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slide.height]);
  useEffect(() => {
    if (paused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const value = progress.get() + (now - last) / HERO_DURATION;
      last = now;
      if (value >= 1) go(1);
      else progress.set(value);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, progress, go]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  return (
    <section
      ref={ref}
      className="eh-hero relative bg-navy-deep text-paper"
      aria-roledescription="carousel"
      aria-label="Highlights"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.code === "Space") {
          e.preventDefault();
          setUserPaused((p) => !p);
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const t = e.changedTouches[0];
        if (!t || !touch.current) return;
        const dx = t.clientX - touch.current.x;
        const dy = t.clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <motion.div className="eh-hero-surface" style={{ y: coverY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
          >
            <motion.picture
              className="block h-full w-full"
              initial={{ scale: 1 }}
              animate={{ scale: reduce ? 1 : zoom }}
              transition={{ duration: HERO_DURATION / 1000, ease: "linear" }}
            >
              <source
                type="image/webp"
                srcSet={`${slide.small} 1280w, ${slide.img} 1920w`}
                sizes="100vw"
              />
              <img
                src={slide.img}
                alt={slide.alt}
                width={1920}
                height={slide.height}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.pos }}
              />
            </motion.picture>
          </motion.div>
        </AnimatePresence>
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="container-x eh-hero-content">
          <div className="eh-hero-copy" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              {ready && (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.p
                    className="eh-hero-eyebrow"
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  >
                    {String(index + 1).padStart(2, "0")} / 04
                  </motion.p>
                  <h1 className="eh-hero-title">
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i} className="eh-word-mask">
                        <motion.span
                          variants={{
                            hidden: { y: reduce ? 0 : "110%", opacity: 0 },
                            show: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: reduce ? 0 : 0.65,
                                ease: EASE,
                                delay: i * 0.035,
                              },
                            },
                          }}
                        >
                          {word}
                        </motion.span>{" "}
                      </span>
                    ))}
                  </h1>
                  <motion.p
                    className="eh-hero-subtitle"
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
                    }}
                  >
                    {slide.sub}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="eh-hero-ctas" aria-hidden={!ready}>
            <BrandButton to="/contact">Start a Conversation</BrandButton>
            <BrandButton to="/our-approach" variant="outline-light">
              Explore Our Approach
            </BrandButton>
          </div>
        </div>
        <div className="container-x eh-hero-controls">
          <div className="flex items-center gap-6">
            <p className="eh-counter">
              <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-paper/60"> / 04</span>
            </p>
            <div className="eh-progress" aria-hidden>
              {SLIDES.map((_, i) => (
                <span key={i} className="eh-progress-segment">
                  {i === index && <motion.span style={{ scaleX: progress }} />}
                </span>
              ))}
            </div>
          </div>
          <div className="eh-control-cluster">
            <Button
              variant="ghost"
              size="icon"
              className="eh-control"
              aria-label="Previous slide"
              title="Previous slide"
              onClick={() => go(-1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="eh-control"
              aria-label="Next slide"
              title="Next slide"
              onClick={() => go(1)}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="eh-control eh-pause"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              title={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused((p) => !p)}
            >
              {userPaused ? <Play /> : <Pause />}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
