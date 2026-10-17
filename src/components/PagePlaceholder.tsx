import { motion } from "framer-motion";
import { EASE } from "@/lib/site";

export function PagePlaceholder({ name }: { name: string }) {
  return (
    <>
      <section className="bg-navy pb-24 pt-44 text-paper md:pb-32 md:pt-52">
        <motion.div
          className="container-x"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow-dark">{name}</p>
          <h1 className="h1-display mt-5">{name}</h1>
          <span aria-hidden className="mt-8 block h-[2px] w-16 bg-gold" />
        </motion.div>
      </section>
      <section className="section-y">
        <div className="container-x flex flex-col items-center text-center">
          <span aria-hidden className="block h-10 w-px bg-teal/40" />
          <p className="mt-6 font-display text-xl font-semibold text-navy">This page is being crafted</p>
        </div>
      </section>
    </>
  );
}
