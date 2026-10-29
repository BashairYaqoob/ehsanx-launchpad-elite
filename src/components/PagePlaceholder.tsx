import { motion } from "framer-motion";
import { EASE } from "@/lib/site";

export function PagePlaceholder({ name }: { name: string }) {
  return (
    <>
      <section className="bg-navy pb-24 pt-44 text-paper md:pb-32 md:pt-52">
        <motion.div
          className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow-dark [font-family:var(--font-display)] [font-weight:600] [font-size:0.75rem] [letter-spacing:0.14em] [text-transform:uppercase] [color:var(--gold)]">{name}</p>
          <h1 className="h1-display [font-family:var(--font-display)] [font-size:clamp(2.5rem,_6vw,_5rem)] [font-weight:700] [line-height:1.05] [letter-spacing:0] max-sm:!text-3xl sm:max-lg:!text-4xl lg:max-xl:!text-5xl mt-5">{name}</h1>
          <span aria-hidden className="mt-8 block h-[2px] w-16 bg-gold" />
        </motion.div>
      </section>
      <section className="section-y [padding-block:3.5rem] [@media(min-width:_768px)]:[padding-block:5rem] max-md:!py-16">
        <div className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8 flex flex-col items-center text-center">
          <span aria-hidden className="block h-10 w-px bg-teal/40" />
          <p className="mt-6 font-display text-xl font-semibold text-navy">This page is being crafted</p>
        </div>
      </section>
    </>
  );
}
