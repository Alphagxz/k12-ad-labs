"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Site-wide scroll choreography, driven by data attributes:
 *   data-lines            masked headline lines rise into place
 *   data-reveal           fade-up on enter (batched + staggered)
 *   data-parallax="0.15"  vertical drift while in view
 */
export default function ScrollFX() {
  const pathname = usePathname();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        gsap.from(el.querySelectorAll(".line-inner"), {
          yPercent: 108,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.set("[data-reveal]", { opacity: 0, y: 36 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "0.15") * 100;
        gsap.fromTo(el, { yPercent: -amt }, {
          yPercent: amt,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
