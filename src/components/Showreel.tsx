"use client";

import { useRef, useState } from "react";
import { showreelProjects } from "@/config/portfolio";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Player from "./Player";

const reel = showreelProjects;

export default function Showreel() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Frame opens from a letterboxed window to full screen while pinned.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", pin: true, scrub: true, anticipatePin: 1 },
        })
        .fromTo(".reel-frame", { clipPath: "inset(14% 9% 14% 9% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
        .fromTo(".reel-stage", { scale: 0.86 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".reel-side", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.6);
    });
    return () => mm.revert();
  }, { scope: root });

  if (!reel.length) return null;
  const current = reel[active];

  return (
    <section ref={root} id="showreel" className="relative h-[100svh] min-h-[640px]" aria-label="Showreel">
      <div className="reel-frame absolute inset-0 bg-ash">
        <div className="shell grid h-full grid-rows-[auto_1fr_auto] gap-4 pb-6 pt-20 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:pb-10 lg:pt-24">
          <div className="reel-side flex items-end justify-between lg:block lg:self-end lg:pb-6">
            <p className="label">(02) — Showreel</p>
            <h2 className="display display-md lg:mt-4">The<br className="hidden lg:block" /> Reel</h2>
          </div>

          <div className="reel-stage flex min-h-0 justify-center">
            <Player
              key={current.id}
              project={current}
              index={active}
              autoStart={touched}
              className="h-full max-h-[78svh] lg:h-[78svh]"
            />
          </div>

          <ol className="reel-side h-scroll flex gap-2 overflow-x-auto lg:block lg:self-end lg:overflow-visible lg:pb-6">
            {reel.map((p, i) => (
              <li key={p.id} className="shrink-0 lg:border-t lg:border-line">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setTouched(true);
                  }}
                  aria-current={i === active}
                  className={`flex w-full items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:px-0 lg:py-4 ${
                    i === active ? "border-bone text-bone" : "border-line text-mute hover:text-bone"
                  }`}
                >
                  <span className="label !text-current">0{i + 1}</span>
                  <span className="text-sm lg:text-base">{p.brand}</span>
                  <span className="label ml-auto hidden lg:inline">{p.category}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
