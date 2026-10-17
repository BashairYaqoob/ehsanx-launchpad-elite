import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { GoldRule, Item, Reveal } from "@/components/ui-brand";

const VISION =
  "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan.";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.25, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

export function WhyExists() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const rule = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const words = VISION.split(" ");

  return (
    <>
      <section className="section-y bg-paper">
        <Reveal className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <Item className="md:col-span-5">
            <GoldRule />
            <h2 className="h2-display mt-6 text-navy">Why EhsanX Exists</h2>
          </Item>
          <div className="space-y-8 md:col-span-7">
            <Item>
              <p className="text-xl leading-relaxed text-navy">
                EhsanX partners with organizations to develop entrepreneurial leaders, strengthen institutions, and
                enable sustainable transformation. Through leadership development, capability-building, consulting,
                and organizational transformation initiatives, we help organizations unlock growth by leveraging the
                strengths, people, relationships, resources, and opportunities they already possess.
              </p>
            </Item>
            <Item>
              <p className="text-lg text-ink">
                We believe that extraordinary results emerge when people discover purpose, cultivate an
                entrepreneurial mindset, and learn to create value from what they already have.
              </p>
            </Item>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-teal py-28 text-paper md:py-40">
        <svg aria-hidden className="absolute -right-40 top-1/2 h-[900px] w-[900px] -translate-y-1/2 opacity-[0.08]" viewBox="0 0 400 400">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx="200" cy="200" r={16 + i * 16} fill="none" stroke={i % 3 === 0 ? "var(--gold)" : "#ffffff"} strokeWidth="0.8" />
          ))}
        </svg>
        <div ref={ref} className="container-x relative flex gap-8 md:gap-12">
          <div className="relative w-[2px] shrink-0 bg-paper/15">
            <motion.span className="absolute inset-0 origin-top bg-gold" style={{ scaleY: rule }} />
          </div>
          <div className="max-w-4xl">
            <p className="eyebrow-dark">Our Vision</p>
            <span aria-hidden className="mt-4 block font-display text-7xl font-extrabold leading-none text-gold md:text-8xl">
              “
            </span>
            <blockquote className="font-display font-semibold leading-[1.3]" style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)" }}>
              <span className="sr-only">{VISION}</span>
              <span aria-hidden>
                {words.map((w, i) => (
                  <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
                ))}
              </span>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
