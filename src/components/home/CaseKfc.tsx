import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import workshop from "@/assets/workshop-team.webp";
import { BrandButton, Item, Reveal } from "@/components/ui-brand";
import { EASE } from "@/lib/site";

function CountUp({ to, prefix = "", className }: { to: number; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setV(to);
    const c = animate(0, to, { duration: 2, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString("en-US")}
    </span>
  );
}

export function CaseKfc() {
  return (
    <section className="section-y bg-wash">
      <div className="container-x">
        <p className="eyebrow">Client Impact</p>
        <div className="mt-10 grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <motion.div
              className="overflow-hidden rounded-3xl shadow-lift"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <img
                src={workshop}
                alt="EhsanX facilitator leading a leadership workshop with professionals around a meeting table"
                width={550}
                height={212}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              className="absolute -bottom-6 -right-2 rounded-2xl border-l-4 border-gold bg-paper px-6 py-4 shadow-soft md:-right-6"
            >
              <span className="font-display font-bold text-navy">KFC Pakistan</span>
            </motion.div>
          </div>

          <Reveal>
            <Item>
              <CountUp to={12000} prefix="~" className="font-display text-6xl font-extrabold leading-none text-teal md:text-8xl" />
              <p className="mt-3 font-display font-semibold text-navy">employees influenced</p>
            </Item>
            <Item className="mt-8">
              <p className="text-lg text-ink/85">
                KFC Pakistan sought to strengthen the entrepreneurial mindset, leadership capability, and innovation
                capacity of its Restaurant General Managers. A national Entrepreneurial Leadership & Innovation
                programme reached 180 RGMs across three regional cohorts over a 4-month journey.
              </p>
            </Item>
            <Item className="mt-8 flex flex-wrap gap-3">
              {[
                { n: 180, l: "RGMs" },
                { n: 3, l: "regional cohorts" },
                { n: 4, l: "months" },
              ].map((s) => (
                <span key={s.l} className="rounded-full border border-navy/10 bg-paper px-5 py-2.5 font-display text-sm font-semibold text-navy shadow-soft">
                  <CountUp to={s.n} className="text-teal" /> {s.l}
                </span>
              ))}
            </Item>
          </Reveal>
        </div>

        <Reveal className="mt-24 max-w-4xl">
          <Item>
            <figure className="border-l-2 border-gold pl-8">
              <span aria-hidden className="block font-display text-6xl font-extrabold leading-none text-teal">“</span>
              <blockquote className="font-display text-2xl font-semibold leading-snug text-navy md:text-3xl">
                Every Restaurant General Manager became more than an operational manager — they became a coach, an
                innovator, and a developer of people.
              </blockquote>
            </figure>
          </Item>
          <Item className="mt-12">
            <BrandButton to="/client-impact">See All Client Impact</BrandButton>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
