import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { refreshImages } from "@/lib/refresh-images";
import { Footer } from "@/components/Footer";
import { BrandButton, Item, Reveal } from "@/components/ui-brand";

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
    <section ref={ref} className="closing-section text-paper">
      <motion.img
        src={refreshImages.ship_final.src}
        srcSet={refreshImages.ship_final.srcSet}
        sizes="100vw"
        alt=""
        width={refreshImages.ship_final.width}
        height={refreshImages.ship_final.height}
        loading="lazy"
        style={{ y }}
        className="closing-image"
      />
      <div className="closing-shade" />
      <Reveal className="container-x closing-cta relative flex flex-col items-center text-center">
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
      <Footer embedded />
    </section>
  );
}
