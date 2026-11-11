import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Shared handle so overlays can pause smooth scrolling. */
export const scroll: { lenis: Lenis | null } = { lenis: null };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

export { gsap, ScrollTrigger, useGSAP };
