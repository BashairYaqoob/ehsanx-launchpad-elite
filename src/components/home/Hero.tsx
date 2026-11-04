import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
    objectPosition: "80% 50%",
    alt: "Navy, teal and gold EX sculpture in a sunlit atrium",
  },
  {
    title: "Leadership That Creates Real Change.",
    sub: "Equip your people with the clarity, capability, and confidence to turn leadership potential into measurable performance.",
    img: images.home_slide_2.src,
    srcSet: images.home_slide_2.srcSet,
    pos: "50% 40%",
    objectPosition: "40% 50%",
    alt: "A speaker addressing participants seated in a large auditorium in front of a row of national flags",
  },
  {
    title: "From Individual Growth to Organizational Impact.",
    sub: "Align leadership, strengthen organizational culture, and turn development initiatives into meaningful business outcomes.",
    img: images.home_slide_3.src,
    srcSet: images.home_slide_3.srcSet,
    pos: "50% 50%",
    objectPosition: "35% 55%",
    alt: "Participants seated at long tables during a workshop in a bright training room",
  },
  {
    title: "Every Organization Has the Potential to Go Further.",
    sub: "We partner with organizations to uncover potential, navigate challenges, and build the capabilities needed for what comes next.",
    img: images.home_slide_4.src,
    srcSet: images.home_slide_4.srcSet,
    pos: "60% 40%",
    objectPosition: "50% 45%",
    alt: "A large group of programme participants standing together for a photo in a modern venue",
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
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const coverY = useTransform(scrollYProgress, [0, 1], [0, reduce || !wide ? 0 : 180]);
  const slide = SLIDES[index] ?? SLIDES[0];
  return (
    <section
      ref={ref}
      className="eh-hero [overflow:clip] min-[900px]:[height:min(100dvh,1080px)] min-[900px]:[min-height:600px] relative bg-navy-deep text-paper"
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
      <div className="relative mt-[calc(5rem+8px)] aspect-[4/3] w-full overflow-hidden min-[900px]:absolute min-[900px]:inset-0 min-[900px]:mt-0 min-[900px]:aspect-auto">
      <motion.div className="eh-hero-surface [position:absolute] [inset:0] [overflow:hidden]" style={{ y: coverY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
          >
            <picture className="eh-kenburns [&_img]:[animation:eh-kenburns_6.5s_linear_forwards] block h-full w-full">
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
                style={
                  {
                    "--hero-pos": slide.objectPosition,
                    "--hero-pos-md": slide.pos,
                  } as CSSProperties
                }
                className="h-full w-full object-cover [object-position:var(--hero-pos)] min-[900px]:[object-position:var(--hero-pos-md)]"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 hidden min-[900px]:block" style={{ background: "linear-gradient(90deg, rgba(8,22,40,0.88) 0%, rgba(8,22,40,0.6) 40%, rgba(8,22,40,0) 70%)" }} />
      </motion.div>
      </div>
        <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 eh-hero-content relative pt-10 min-[900px]:[position:absolute] [bottom:clamp(88px,14vh,140px)] [left:0] [right:0] [z-index:2] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[bottom:104px] [@media(max-width:767.98px)_and_(min-height:701px)]:[bottom:112px] [@media(min-width:768px)_and_(max-width:1023.98px)]:[bottom:132px]">
          <div className="eh-hero-copy [max-width:820px] [text-shadow:var(--hero-copy-shadow)] [display:grid] [@media(max-width:767.98px)]:[max-width:100%] [@media(min-width:768px)_and_(max-width:1023.98px)]:[max-width:720px]" aria-live="polite" aria-atomic="true">
            {SLIDES.map((s, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              const active = i === index;
              return (
                <div
                  key={s.title}
                  className="eh-hero-slide-text [grid-area:1/1] [&[data-active=false]]:[visibility:hidden] [&[data-active=false]]:[pointer-events:none]"
                  data-active={active}
                  aria-hidden={!active}
                >
                  <p className="eh-hero-eyebrow [font-family:var(--font-display)] [font-size:12px] [margin-bottom:18px] [color:var(--paper)] [letter-spacing:0] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[margin-bottom:8px] [@media(max-width:767.98px)_and_(min-height:701px)]:[margin-bottom:12px]">
                    {String(i + 1).padStart(2, "0")} / 04
                  </p>
                  <Heading className="eh-hero-title [font-family:var(--font-display)] [font-size:clamp(2rem,4.2vw,4rem)]! [font-weight:700] [line-height:1.08] [min-height:3.24em] [letter-spacing:0] [text-shadow:var(--hero-headline-shadow)] [color:var(--paper)] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[font-size:28px] [@media(max-width:767.98px)_and_(min-height:701px)]:[font-size:32px] [@media(min-width:768px)_and_(max-width:1023.98px)]:[font-size:48px] [@media(max-width:767.98px)]:[line-height:1.12] [@media(max-width:767.98px)]:[min-height:4.48em] max-md:!text-3xl">
                    {s.title.split(" ").map((word, w) => (
                      <span key={w} className="eh-word-mask [display:inline-block] [overflow:hidden] [vertical-align:bottom] [padding-bottom:.08em] [margin-bottom:-.08em] [margin-right:.22em] [&>span]:[display:inline-block]">
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
                    className="eh-hero-subtitle [max-width:650px] [min-height:3.4em] [margin-top:20px] [font-size:18px] [line-height:1.7] [color:var(--paper)] [@media(min-width:768px)_and_(max-width:1023.98px)]:[max-width:620px] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[min-height:6.2em] [@media(max-width:767.98px)_and_(min-height:701px)]:[min-height:6.6em] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[margin-top:12px] [@media(max-width:767.98px)_and_(min-height:701px)]:[margin-top:16px] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[font-size:14px] [@media(max-width:767.98px)_and_(min-height:701px)]:[font-size:15px] [@media(max-width:767.98px)]:[line-height:1.65] max-md:!text-base max-md:!min-h-[6.6em]"
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
          <div className="eh-hero-ctas [display:flex] [gap:16px] [margin-top:28px] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[gap:8px] [@media(max-width:767.98px)_and_(min-height:701px)]:[gap:12px] [@media(max-width:767.98px)_and_(max-height:700.98px)]:[margin-top:16px] [@media(max-width:767.98px)_and_(min-height:701px)]:[margin-top:20px] [@media(max-width:767.98px)]:[flex-direction:column] [@media(max-width:767.98px)]:[&_a]:[width:100%] [@media(max-width:767.98px)]:[&_a]:[justify-content:space-between] [@media(max-width:767.98px)]:[&_a]:[min-height:48px] [@media(max-width:767.98px)]:[&_a]:[font-size:13px] [@media(max-width:767.98px)]:[&_a]:[padding-inline:20px] [@media(max-width:767.98px)]:[&>span]:[width:100%] [@media(max-width:767.98px)]:[&>span_a]:[width:100%]" aria-hidden={!ready}>
            <BrandButton to="/contact">Start a Conversation</BrandButton>
            <BrandButton to="/our-approach" variant="outline-light">
              Explore Our Approach
            </BrandButton>
          </div>
        </div>
        <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 eh-hero-controls relative py-8 min-[900px]:py-0 min-[900px]:[position:absolute] [inset-inline:0] [bottom:52px] [display:flex] [align-items:center] [justify-content:space-between] [z-index:3] [@media(max-width:767.98px)]:[bottom:44px] [@media(max-width:767.98px)]:[padding-right:92px]">
          <div className="flex items-center gap-6">
            <p className="eh-counter [font-family:var(--font-display)] [font-weight:600] [font-size:13px] [white-space:nowrap]">
              <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-paper/60"> / 04</span>
            </p>
            <div className="eh-progress [display:flex] [gap:10px] [@media(max-width:767.98px)]:[display:none]" aria-hidden>
              {SLIDES.map((_, i) => (
                <span key={i} className="eh-progress-segment [width:56px] [height:2px] [background:var(--eh-progress-segment-background-3)] [position:relative] [&>span]:[position:absolute] [&>span]:[inset:0] [&>span]:[transform-origin:left] [&>span]:[background:var(--gold)]">
                  {i === index && <motion.span style={{ scaleX: progress }} />}
                </span>
              ))}
            </div>
          </div>
          <div className="eh-control-cluster [display:flex] [gap:8px] [@media(max-width:767.98px)]:[gap:4px]">
            <Button
              variant="ghost"
              size="icon"
              className="eh-control [width:44px] [height:44px] [border-radius:50%] [color:var(--paper)] [background:transparent] [&:hover]:[background:transparent] [&:hover]:[color:var(--paper)] [&:hover]:[box-shadow:var(--eh-control-box-shadow-4)] [&_svg]:[width:20px] [&_svg]:[height:20px] [&_svg]:[stroke-width:1.3]"
              aria-label="Previous slide"
              title="Previous slide"
              onClick={() => go(-1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="eh-control [width:44px] [height:44px] [border-radius:50%] [color:var(--paper)] [background:transparent] [&:hover]:[background:transparent] [&:hover]:[color:var(--paper)] [&:hover]:[box-shadow:var(--eh-control-box-shadow-4)] [&_svg]:[width:20px] [&_svg]:[height:20px] [&_svg]:[stroke-width:1.3]"
              aria-label="Next slide"
              title="Next slide"
              onClick={() => go(1)}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="eh-control [width:44px] [height:44px] [border-radius:50%] [color:var(--paper)] [background:transparent] [&:hover]:[background:transparent] [&:hover]:[color:var(--paper)] [&:hover]:[box-shadow:var(--eh-control-box-shadow-4)] [&_svg]:[width:20px] [&_svg]:[height:20px] [&_svg]:[stroke-width:1.3] eh-pause [&_svg]:[width:14px] [&_svg]:[height:14px] [@media(max-width:767.98px)]:[display:none]"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              title={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused((p) => !p)}
            >
              {userPaused ? <Play /> : <Pause />}
            </Button>
          </div>
        </div>
    </section>
  );
}
