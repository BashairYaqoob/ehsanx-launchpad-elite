import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PRELOADER_CANPLAY_MS, PRELOADER_MAX_MS, PRELOADER_VIDEO_SRC } from "@/config/preloader";
import { useSetIntroReady } from "@/lib/intro";

const KEY = "ehsanx-preloader-seen";
type Phase = "playing" | "exiting" | "done";
type PreloaderWindow = Window & { __preloaderExited?: boolean; __preloaderReact?: boolean };

export function Preloader() {
  const setReady = useSetIntroReady();
  const [phase, setPhase] = useState<Phase>("playing");
  const exited = useRef(false);

  const exit = () => {
    if (exited.current) return;
    exited.current = true;
    (window as PreloaderWindow).__preloaderExited = true;
    document.documentElement.style.overflow = "";
    setPhase("exiting");
    window.setTimeout(() => setReady(true), 150);
  };

  useEffect(() => {
    const w = window as PreloaderWindow;
    w.__preloaderReact = true;
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches || !!w.__preloaderExited;
    try {
      if (sessionStorage.getItem(KEY)) skip = true;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable */
    }
    if (skip) {
      exited.current = true;
      w.__preloaderExited = true;
      document.documentElement.style.overflow = "";
      setPhase("done");
      setReady(true);
      return;
    }
    // Lock on <html>: the navbar effect resets document.body.overflow on mount.
    document.documentElement.style.overflow = "hidden";
    const safety = window.setTimeout(exit, PRELOADER_MAX_MS);
    const canplay = window.setTimeout(exit, PRELOADER_CANPLAY_MS);
    const clearCanplay = () => window.clearTimeout(canplay);
    window.addEventListener("ehsanx-preloader-canplay", clearCanplay);
    // The inline script in __root dispatches this for pre-hydration Skip/Escape.
    window.addEventListener("ehsanx-preloader-exit", exit);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(safety);
      window.clearTimeout(canplay);
      window.removeEventListener("ehsanx-preloader-canplay", clearCanplay);
      window.removeEventListener("ehsanx-preloader-exit", exit);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[1100] h-dvh" data-preloader>
      {phase === "playing" && (
        <button type="button" className="preloader-skip [position:absolute] [top:24px] [right:24px] [z-index:5] [font-family:var(--font-display)] [font-size:13px] [font-weight:600] [letter-spacing:.08em] [text-transform:uppercase] [color:var(--navy)] [background:transparent] [border:var(--preloader-skip-border-13)] [border-radius:9999px] [padding:10px_22px] [min-height:44px] [cursor:pointer] [transition:border-color_.3s,color_.3s] [&:hover]:[border-color:var(--navy)]" onClick={exit}>
          Skip
        </button>
      )}
      <AnimatePresence
        onExitComplete={() => {
          setReady(true);
          setPhase("done");
        }}
      >
        {phase === "playing" && (
          <motion.div
            key="stage"
            className="absolute inset-0 flex h-dvh items-center justify-center bg-[var(--preloader-bg)]"
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            onAnimationStart={(definition) => {
              if (definition !== "exit") return;
              document.documentElement.style.overflow = "";
              window.setTimeout(() => setReady(true), 150);
            }}
          >
            <video
              className="h-auto max-h-full w-full object-contain [-webkit-mask-image:var(--preloader-mask)] [-webkit-mask-composite:source-in] [mask-image:var(--preloader-mask)] [mask-composite:intersect]"
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
