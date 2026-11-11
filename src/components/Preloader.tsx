"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, scroll, MOTION_OK } from "@/lib/gsap";

/** Fires once the intro curtain lifts. Hero listens for this. */
export const READY_EVENT = "k12:ready";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const finish = () => {
      (window as unknown as { __k12ready?: boolean }).__k12ready = true;
      window.dispatchEvent(new Event(READY_EVENT));
    };

    if (!window.matchMedia(MOTION_OK).matches) {
      finish();
      setDone(true);
      return;
    }

    scroll.lenis?.stop();
    const n = { v: 0 };
    gsap
      .timeline({ onComplete: () => setDone(true) })
      .to(n, {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
        },
      })
      .to(".pl-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .to(".pl-fade", { yPercent: -120, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.04 })
      .add(() => {
        scroll.lenis?.start();
        finish();
      })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
  }, { scope: root });

  if (done) return null;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-ink shell py-8" aria-hidden>
      <div className="flex justify-between overflow-hidden">
        <span className="pl-fade label !text-bone">K12 Ad Labs</span>
        <span className="pl-fade label">Creative production studio</span>
      </div>
      <div>
        <div className="overflow-hidden">
          <span ref={count} className="pl-fade display display-lg block tabular-nums">000</span>
        </div>
        <div className="mt-6 h-px w-full bg-line">
          <div className="pl-bar h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
