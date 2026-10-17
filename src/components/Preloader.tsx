import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoColor from "@/assets/logo-color.png";
import { PRELOADER_MAX_MS, PRELOADER_PLACEHOLDER_MS, PRELOADER_VIDEO_SRC } from "@/config/preloader";
import { useSetIntroReady } from "@/lib/intro";

const KEY = "ehsanx-preloader-seen";
type Phase = "playing" | "exiting" | "done";

export function Preloader() {
  const setReady = useSetIntroReady();
  const [phase, setPhase] = useState<Phase>("playing");
  const [placeholder, setPlaceholder] = useState(false);
  const exited = useRef(false);

  const exit = () => {
    if (exited.current) return;
    exited.current = true;
    setPhase("exiting");
  };

  useEffect(() => {
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem(KEY)) skip = true;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable */
    }
    if (skip) {
      exited.current = true;
      setPhase("done");
      setReady(true);
      return;
    }
    document.body.style.overflow = "hidden";
    fetch(PRELOADER_VIDEO_SRC, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (!r.ok || !type.startsWith("video")) setPlaceholder(true);
      })
      .catch(() => setPlaceholder(true));
    const t = window.setTimeout(exit, PRELOADER_MAX_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!placeholder) return;
    const t = window.setTimeout(exit, PRELOADER_PLACEHOLDER_MS + 200);
    return () => window.clearTimeout(t);
  }, [placeholder]);

  if (phase === "done") return null;

  const curtain = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden>
      <AnimatePresence>
        {phase === "playing" && (
          <motion.div
            key="stage"
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--preloader-bg)" }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {!placeholder ? (
              <video
                className="h-full w-full object-contain"
                src={PRELOADER_VIDEO_SRC}
                muted
                playsInline
                autoPlay
                preload="auto"
                onEnded={exit}
                onError={() => setPlaceholder(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-6">
                <img src={logoColor} alt="" width={457} height={77} className="w-56 md:w-72" />
                <div className="h-[2px] w-56 overflow-hidden bg-navy/10 md:w-72">
                  <motion.div
                    className="h-full origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: PRELOADER_PLACEHOLDER_MS / 1000, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {phase === "exiting" && (
        <>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-navy"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ ...curtain, delay: 0.15 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-teal"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ ...curtain, delay: 0.15 }}
            onAnimationStart={() => {
              document.body.style.overflow = "";
              window.setTimeout(() => setReady(true), 450);
            }}
            onAnimationComplete={() => setPhase("done")}
          />
        </>
      )}
    </div>
  );
}
