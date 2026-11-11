"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Project } from "@/config/portfolio";
import { gsap, scroll, useGSAP } from "@/lib/gsap";
import { resolveVideo } from "@/lib/video";
import Player from "./Player";
import { CloseIcon } from "./Icons";

type Ctx = { open: (p: Project, index?: number) => void };
const VideoCtx = createContext<Ctx>({ open: () => {} });
export const useVideoModal = () => useContext(VideoCtx);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<{ project: Project; index: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((project: Project, index = 0) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setCurrent({ project, index });
  }, []);

  const close = useCallback(() => {
    const done = () => {
      setCurrent(null);
      lastFocus.current?.focus?.();
    };
    if (root.current) gsap.to(root.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: done });
    else done();
  }, []);

  useEffect(() => {
    if (!current) return;
    scroll.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
      scroll.lenis?.start();
    };
  }, [current, close]);

  useGSAP(() => {
    if (!current || !root.current) return;
    gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.fromTo(".vm-stage", { scale: 0.92, y: 30 }, { scale: 1, y: 0, duration: 0.7, ease: "expo.out" });
  }, { dependencies: [current], scope: root });

  const p = current?.project;
  const vertical = (p?.aspect ?? "9:16") !== "16:9";

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      {p && (
        <div
          ref={root}
          role="dialog"
          aria-modal="true"
          aria-label={`${p.brand} — ${p.title}`}
          data-lenis-prevent
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 opacity-0"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="shell flex items-center justify-between py-5">
            <div>
              <p className="label">{p.category}</p>
              <p className="mt-1 text-sm">{p.brand} — {p.title}</p>
            </div>
            <button ref={closeBtn} type="button" onClick={close} aria-label="Close video" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-bone hover:text-ink">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className={`vm-stage ${vertical ? "h-full max-h-[86svh] w-auto" : "w-full max-w-6xl"}`}>
              <Player
                key={p.id}
                project={p}
                index={current!.index}
                autoStart
                className={vertical ? "!h-full max-w-[92vw]" : "w-full"}
              />
              {resolveVideo(p.videoUrl).kind === "none" && (
                <p className="label mt-3 text-center">Placeholder — add this project&apos;s video link in src/config/portfolio.ts</p>
              )}
            </div>
          </div>
        </div>
      )}
    </VideoCtx.Provider>
  );
}
