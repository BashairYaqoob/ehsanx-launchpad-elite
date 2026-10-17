import { createContext, useContext, useState, type ReactNode } from "react";

type IntroCtx = { ready: boolean; setReady: (v: boolean) => void };
const Ctx = createContext<IntroCtx>({ ready: true, setReady: () => {} });

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

/** True once the preloader has fully exited. */
export const useIntroReady = () => useContext(Ctx).ready;
export const useSetIntroReady = () => useContext(Ctx).setReady;
