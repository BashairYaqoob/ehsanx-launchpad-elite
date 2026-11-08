import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoColor from "@/assets/logo-color.png";
import logoWhite from "@/assets/logo-white.png";
import { EASE, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
  });

  // Radix only locks scroll through its Overlay, which this full-screen menu does not use,
  // so keep the body lock and pause Lenis so wheel input cannot scroll the page underneath.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <motion.header
        className="eh-navbar-header [z-index:1000] z-[1000] fixed inset-x-0 top-4 px-4"
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        <nav
          aria-label="Main"
          className={cn(
            "eh-navbar [.eh-navbar-header_&]:[transition:height_.3s,background_.3s,box-shadow_.3s] mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-5 transition-all duration-[400ms] ease-out md:px-7",
            solid
              ? "h-[72px] border-navy/10 bg-paper/85 shadow-soft [box-shadow:var(--shadow-soft)] backdrop-blur-xl"
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
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "link-underline [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[left:0] [&::after]:[right:0] [&::after]:[bottom:-6px] [&::after]:[height:2px] [&::after]:[background:var(--gold)] [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:left] [&::after]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [&:hover::after]:[transform:scaleX(1)] [&[data-status='active']::after]:[transform:scaleX(1)] [position:relative] font-display text-sm font-semibold transition-colors",
                    solid ? "text-navy" : "text-paper",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="btn-base [&:hover]:[transform:translateY(-2px)] [display:inline-flex] [align-items:center] [gap:0.625rem] [min-height:48px] [padding:0.75rem_1.75rem] [border-radius:9999px] [font-family:var(--font-display)] [font-weight:600] [font-size:0.95rem] [transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1),_box-shadow_0.4s,_background-color_0.3s,_color_0.3s] max-sm:w-full max-sm:justify-center max-sm:whitespace-normal max-sm:text-center max-w-full btn-gold [background:var(--gold)] [color:var(--navy)] [box-shadow:0_14px_34px_-14px_rgba(250,_183,_76,_0.7)] hidden !min-h-[44px] !px-6 !py-2 lg:inline-flex"
            >
              Contact
              <ArrowRight
                className="btn-arrow [.btn-base_&]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [.btn-base:hover_&]:[transform:translateX(4px)] h-4 w-4"
                aria-hidden
              />
            </Link>
            <DialogPrimitive.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Open menu"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full lg:hidden hover:bg-transparent hover:text-inherit",
                  solid ? "text-navy" : "text-paper",
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DialogPrimitive.Trigger>
          </div>
        </nav>
      </motion.header>

      {/* Radix Dialog supplies the focus trap, Escape dismissal, focus return to the trigger and
          aria-hidden on the page behind; forceMount lets AnimatePresence play the exit fade. */}
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="eh-nav-menu [z-index:1010] z-[1010] h-dvh overflow-y-auto fixed inset-0 flex flex-col bg-navy-deep px-6 pb-10 pt-8 text-paper"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
                <div className="flex items-center justify-between">
                  <Link to="/" onClick={() => setOpen(false)} aria-label="EhsanX home">
                    <img
                      src={logoWhite}
                      alt="EhsanX"
                      width={457}
                      height={77}
                      className="h-7 w-auto"
                    />
                  </Link>
                  <DialogPrimitive.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      aria-label="Close menu"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                <motion.ul
                  className="mt-6 flex flex-1 flex-col gap-2 lg:mt-16 lg:gap-6"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                  }}
                >
                  {NAV_LINKS.map((l) => (
                    <motion.li
                      key={l.to}
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                      }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="link-underline [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[left:0] [&::after]:[right:0] [&::after]:[bottom:-6px] [&::after]:[height:2px] [&::after]:[background:var(--gold)] [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:left] [&::after]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [&:hover::after]:[transform:scaleX(1)] [&[data-status='active']::after]:[transform:scaleX(1)] [position:relative] inline-flex min-h-11 items-center font-display text-2xl font-bold sm:text-3xl lg:text-4xl"
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-base [&:hover]:[transform:translateY(-2px)] [display:inline-flex] [align-items:center] [gap:0.625rem] [min-height:48px] [padding:0.75rem_1.75rem] [border-radius:9999px] [font-family:var(--font-display)] [font-weight:600] [font-size:0.95rem] [transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1),_box-shadow_0.4s,_background-color_0.3s,_color_0.3s] max-sm:w-full max-sm:justify-center max-sm:whitespace-normal max-sm:text-center max-w-full btn-gold [background:var(--gold)] [color:var(--navy)] [box-shadow:0_14px_34px_-14px_rgba(250,_183,_76,_0.7)] justify-center"
                >
                  Contact
                  <ArrowRight
                    className="btn-arrow [.btn-base_&]:[transition:transform_0.4s_cubic-bezier(0.22,_1,_0.36,_1)] [.btn-base:hover_&]:[transform:translateX(4px)] h-4 w-4"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
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
