import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PRELOADER_CANPLAY_MS, PRELOADER_MAX_MS, PRELOADER_VIDEO_SRC } from "@/config/preloader";
import { useSetIntroReady } from "@/lib/intro";

const KEY = "ehsanx-preloader-seen";
type Phase = "playing" | "exiting" | "done";

export function Preloader() {
  const setReady = useSetIntroReady();
  const [phase, setPhase] = useState<Phase>("playing");
  const exited = useRef(false);

  const exit = () => {
    if (exited.current) return;
    exited.current = true;
    document.body.style.overflow = "";
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
    const safety = window.setTimeout(exit, PRELOADER_MAX_MS);
    const canplay = window.setTimeout(exit, PRELOADER_CANPLAY_MS);
    const clearCanplay = () => window.clearTimeout(canplay);
    window.addEventListener("ehsanx-preloader-canplay", clearCanplay);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(safety);
      window.clearTimeout(canplay);
      window.removeEventListener("ehsanx-preloader-canplay", clearCanplay);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[1100]">
      {phase === "playing" && (
        <button type="button" className="preloader-skip" onClick={exit}>
          Skip
        </button>
      )}
      <AnimatePresence onExitComplete={() => setPhase("done")}>
        {phase === "playing" && (
          <motion.div
            key="stage"
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--preloader-bg)" }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            onAnimationStart={(definition) => {
              if (definition !== "exit") return;
              document.body.style.overflow = "";
              window.setTimeout(() => setReady(true), 150);
            }}
          >
            <video
              className="h-full w-full object-contain"
              src={PRELOADER_VIDEO_SRC}
              muted
              playsInline
              autoPlay
              preload="auto"
              onCanPlay={() => window.dispatchEvent(new Event("ehsanx-preloader-canplay"))}
              onEnded={exit}
              onError={exit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
