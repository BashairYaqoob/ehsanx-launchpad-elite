import { motion } from "framer-motion";
import heroImg from "@/assets/solutions-hero.png";
import { solutionsHero } from "@/data/solutions";

export function SolutionsHero() {
  return (
    <section className="relative isolate flex min-h-[560px] overflow-hidden bg-navy md:h-[85vh]">
      <img
        src={heroImg}
        alt={solutionsHero.imageAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover [object-position:72%_center] md:[object-position:70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,25,45,0.92)_0%,rgba(10,25,45,0.6)_45%,rgba(10,25,45,0)_80%)] md:bg-[linear-gradient(to_right,rgba(10,25,45,0.85)_0%,rgba(10,25,45,0.5)_30%,rgba(10,25,45,0)_55%)]"
      />
      <div className="mx-auto flex w-full max-w-[1280px] items-end px-4 pb-14 sm:px-6 md:items-center md:pb-0 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[560px]"
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold">{solutionsHero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.1] text-white md:text-[48px] lg:text-[56px]">
            {solutionsHero.title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
