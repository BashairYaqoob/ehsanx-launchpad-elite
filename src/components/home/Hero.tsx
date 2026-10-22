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
import { images } from "@/lib/image-assets";
import { BrandButton } from "@/components/ui-brand";
import { Button } from "@/components/ui/button";
import { HERO_DURATION, nextSlide, slideshowPaused } from "@/lib/hero-controls";
import { useIntroReady } from "@/lib/intro";
import { EASE } from "@/lib/site";

const SLIDES = [
  {
    title: "Building Leaders. Transforming Organizations.",
    sub: "We help organizations develop leaders who can navigate complexity, strengthen teams, and create lasting impact.",
    img: images.hero_blocks.src,
    srcSet: images.hero_blocks.srcSet,
    pos: "70% center",
    alt: "Navy, teal and gold EX sculpture in a sunlit atrium",
  },
  {
    title: "Leadership That Creates Real Change.",
    sub: "Equip your people with the clarity, capability, and confidence to turn leadership potential into measurable performance.",
    img: images.hero_2.src,
    srcSet: images.hero_2.srcSet,
    pos: "65% center",
    alt: "A senior leader presenting a plan to five colleagues in a bright boardroom at golden hour",
  },
  {
    title: "From Individual Growth to Organizational Impact.",
    sub: "Align leadership, strengthen organizational culture, and turn development initiatives into meaningful business outcomes.",
    img: images.hero_3.src,
    srcSet: images.hero_3.srcSet,
    pos: "60% center",
    alt: "A professional on a mezzanine overlooking teams collaborating across an open-plan atrium office",
  },
  {
    title: "Every Organization Has the Potential to Go Further.",
    sub: "We partner with organizations to uncover potential, navigate challenges, and build the capabilities needed for what comes next.",
    img: images.ship.src,
    srcSet: images.ship.srcSet,
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
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
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
  const slide = SLIDES[index] ?? SLIDES[0];
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
            <picture className="eh-kenburns block h-full w-full">
              <source
                type="image/webp"
                srcSet={slide.srcSet}
                sizes="100vw"
              />
              <img
                src={slide.img}
                alt={slide.alt}
                width={1920}
                height={1088}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.pos }}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        <div className={`bg-hero-overlay absolute inset-0 ${index === 0 ? "hero-first-overlay" : ""}`} />
        <div className="container-x eh-hero-content">
          <div className="eh-hero-copy" aria-live="polite" aria-atomic="true">
            {SLIDES.map((s, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              const active = i === index;
              return (
                <div
                  key={s.title}
                  className="eh-hero-slide-text"
                  data-active={active}
                  aria-hidden={!active}
                >
                  <p className="eh-hero-eyebrow">
                    {String(i + 1).padStart(2, "0")} / 04
                  </p>
                  <Heading className="eh-hero-title">
                    {s.title.split(" ").map((word, w) => (
                      <span key={w} className="eh-word-mask">
                        <motion.span
                          initial={false}
                          animate={
                            active && ready
                              ? { y: 0, opacity: 1 }
                              : { y: reduce ? 0 : "110%", opacity: 0 }
                          }
                          transition={{
                            duration: reduce ? 0 : 0.5,
                            ease: EASE,
                            delay: active ? w * 0.035 : 0,
                          }}
                        >
                          {word}
                        </motion.span>{" "}
                      </span>
                    ))}
                  </Heading>
                  <motion.p
                    className="eh-hero-subtitle"
                    initial={false}
                    animate={active && ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ delay: active ? 0.2 : 0, duration: reduce ? 0 : 0.5 }}
                  >
                    {s.sub}
                  </motion.p>
                </div>
              );
            })}
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
