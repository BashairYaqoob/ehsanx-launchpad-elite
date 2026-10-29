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
      <Link to="/contact" className="btn-base [&:hover]:[transform:translateY(-2px)] btn-gold !px-10 !py-5 text-lg">
        Start a Conversation
        <ArrowRight className="btn-arrow [.btn-base_&]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [.btn-base:hover_&]:[transform:translateX(4px)] h-5 w-5" aria-hidden />
      </Link>
    </motion.div>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="closing-section [position:relative] [isolation:isolate] [overflow:hidden] [background:var(--navy-deep)] [min-height:100dvh] [display:flex] [flex-direction:column] text-paper">
      <motion.img
        src={refreshImages.ship_final.src}
        srcSet={refreshImages.ship_final.srcSet}
        sizes="100vw"
        alt=""
        width={refreshImages.ship_final.width}
        height={refreshImages.ship_final.height}
        loading="lazy"
        style={{ y }}
        className="closing-image [position:absolute] [inset:-12%_0] [width:100%] [height:124%] [object-fit:cover] [z-index:-2]"
      />
      <div className="closing-shade [position:absolute] [inset:0] [background:var(--closing-shade)] [z-index:-1]" />
      <Reveal className="container-x closing-cta [flex:1] [min-height:60svh] [justify-content:center] [padding-block:80px] [@media(max-width:767.98px)]:[min-height:0] [@media(max-width:767.98px)]:[padding-block:56px] [@media(max-width:767.98px)]:[&_p]:[font-size:16px] relative flex flex-col items-center text-center">
        <Item>
          <h2 className="h2-display [.eh-why_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[font-size:36px] [.eh-challenge-heading_&]:[letter-spacing:0] [.eh-challenge-heading_&]:[color:var(--navy)] [@media(max-width:767.98px)]:[.eh-challenge-heading_&]:[font-size:32px] [@media(min-width:1024px)_and_(max-width:1279.98px)]:[.eh-challenge-heading_&]:[font-size:30px] [.closing-cta_&]:[color:var(--paper)] [@media(max-width:767.98px)]:[.closing-cta_&]:[font-size:32px] max-w-3xl">Let’s Build the Future Together</h2>
        </Item>
        <Item>
          <p className="mt-6 max-w-2xl text-lg text-paper/85 md:text-xl">
            The future will not be shaped by resources alone. It will be shaped by the ability of people and
            institutions to learn, adapt, innovate, and create value in a changing world.
          </p>
        </Item>
        <Item className="mt-10 [.closing-cta_&]:[margin-top:24px]">
          <MagneticButton />
        </Item>
      </Reveal>
      <Footer embedded />
    </section>
  );
}
