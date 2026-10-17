import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoColor from "@/assets/logo-color.png";
import logoWhite from "@/assets/logo-white.png";
import { useIntroReady } from "@/lib/intro";
import { EASE, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const ready = useIntroReady();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        className="eh-navbar-header fixed inset-x-0 top-4 px-4"
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        <nav
          aria-label="Main"
          className={cn(
             "eh-navbar mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-5 transition-all duration-[400ms] ease-out md:px-7",
            solid
              ? "h-[72px] border-navy/10 bg-paper/85 shadow-soft backdrop-blur-xl"
              : "h-20 border-transparent bg-transparent",
          )}
        >
          <Link to="/" aria-label="EhsanX home" className="flex items-center">
            <img
              src={solid ? logoColor : logoWhite}
              alt="EhsanX"
              width={457}
              height={77}
              className="h-6 w-auto md:h-7"
            />
          </Link>
           <ul className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "link-underline font-display text-sm font-semibold transition-colors",
                    solid ? "text-navy" : "text-paper",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn-base btn-gold hidden !min-h-[44px] !px-6 !py-2 sm:inline-flex">
              Contact
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
            </Link>
             <Button variant="ghost" size="icon"
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
               className={cn("flex h-11 w-11 items-center justify-center rounded-full xl:hidden hover:bg-transparent hover:text-inherit", solid ? "text-navy" : "text-paper")}
            >
              <Menu className="h-6 w-6" />
             </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="eh-nav-menu fixed inset-0 flex flex-col bg-navy-deep px-6 pb-10 pt-8 text-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} aria-label="EhsanX home">
                <img src={logoWhite} alt="EhsanX" width={457} height={77} className="h-7 w-auto" />
              </Link>
               <Button variant="ghost" size="icon"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20"
              >
                <X className="h-6 w-6" />
               </Button>
            </div>
            <motion.ul
              className="mt-16 flex flex-1 flex-col gap-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            >
              {NAV_LINKS.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="link-underline font-display text-3xl font-bold sm:text-4xl"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-base btn-gold justify-center">
              Contact
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
