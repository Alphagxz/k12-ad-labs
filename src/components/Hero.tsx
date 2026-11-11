"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import HeroBackdrop from "./HeroBackdrop";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { READY_EVENT } from "./Preloader";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Resolve elements now: the intro runs later, outside this GSAP context.
      const q = gsap.utils.selector(root);
      const lines = q(".hero-line .line-inner");
      const fades = q(".hero-fade");
      const bg = q(".hero-bg");
      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { opacity: 0, y: 24 });
      gsap.set(bg, { scale: 1.25, opacity: 0 });

      const intro = () =>
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(bg, { scale: 1, opacity: 1, duration: 2.4 }, 0)
          .to(lines, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.15)
          .to(fades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.8);

      if ((window as unknown as { __k12ready?: boolean }).__k12ready) intro();
      else window.addEventListener(READY_EVENT, intro, { once: true });

      // Scroll-out: headline drifts up, backdrop pushes in and dims.
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
        .to(".hero-copy", { yPercent: -28, opacity: 0.2, ease: "none" }, 0)
        .to(".hero-bg-wrap", { yPercent: 18, scale: 1.12, ease: "none" }, 0);

      return () => window.removeEventListener(READY_EVENT, intro);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="hero-bg-wrap absolute inset-0">
        <div className="hero-bg absolute inset-0">
          <HeroBackdrop />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
      </div>

      <div className="hero-copy shell relative pb-10 pt-32 md:pb-14">
        <p className="hero-fade label mb-6 flex items-center gap-3 !text-bone">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          AI-first creative production
        </p>
        <Lines as="h1" manual lines={site.headline} className="hero-line display display-xl" />

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md font-serif text-2xl italic leading-tight text-bone/90 md:text-3xl">
            {site.subheadline}
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/#work" className="btn btn-solid">Explore our work</Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#contact" className="btn btn-ghost">Start a project</Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
