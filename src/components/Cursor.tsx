"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Custom cursor for fine pointers only. Elements opt in with
 * data-cursor="PLAY" (label) or data-cursor="" (plain grow).
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = dot.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let active = false;

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      const on = !!target;
      if (on !== active) {
        active = on;
        gsap.to(el, { scale: on ? 1 : 0, duration: 0.45, ease: "expo.out" });
      }
      if (target && text.current) text.current.textContent = target.getAttribute("data-cursor") || "";
    };
    const leave = () => {
      active = false;
      gsap.to(el, { scale: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-24 w-24 scale-0 items-center justify-center rounded-full bg-accent text-ink [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <span ref={text} className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]" />
    </div>
  );
}
