import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { useRef } from "react";
import heroShip from "@/assets/hero-ship.webp";
import { BrandButton, Item, Reveal } from "@/components/ui-brand";

/** Founder strip — self-contained; delete this component and its usage to remove it. */
export function FounderStrip() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <Reveal className="container-x grid items-center gap-10 md:grid-cols-12">
        <Item className="md:col-span-3">
          <div className="flex aspect-square w-40 items-center justify-center rounded-full bg-wash ring-1 ring-navy/10 md:w-48">
            <User className="h-12 w-12 text-navy/30" aria-hidden />
            <span className="sr-only">[Founder portrait]</span>
          </div>
        </Item>
        <Item className="md:col-span-9">
          <p className="eyebrow">Meet the Team</p>
          <h2 className="h3-display mt-3 text-navy">[Founder name]</h2>
          <p className="mt-1 font-display font-semibold text-teal">[Title]</p>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">[One-line credibility statement]</p>
          <BrandButton to="/meet-the-team" variant="outline-navy" className="mt-8">
            Meet the Team
          </BrandButton>
        </Item>
      </Reveal>
    </section>
  );
}

function MagneticButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block p-3"
    >
      <Link to="/contact" className="btn-base btn-gold !px-10 !py-5 text-lg">
        Start a Conversation
        <ArrowRight className="btn-arrow h-5 w-5" aria-hidden />
      </Link>
    </motion.div>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative overflow-hidden py-32 text-paper md:py-44">
      <motion.img
        src={heroShip}
        alt=""
        width={1264}
        height={848}
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[124%] w-full -translate-y-[12%] object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/85" />
      <Reveal className="container-x relative flex flex-col items-center text-center">
        <Item>
          <h2 className="h2-display max-w-3xl">Let’s Build the Future Together</h2>
        </Item>
        <Item>
          <p className="mt-6 max-w-2xl text-lg text-paper/85 md:text-xl">
            The future will not be shaped by resources alone. It will be shaped by the ability of people and
            institutions to learn, adapt, innovate, and create value in a changing world.
          </p>
        </Item>
        <Item className="mt-10">
          <MagneticButton />
        </Item>
      </Reveal>
    </section>
  );
}
