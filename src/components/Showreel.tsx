"use client";

import { useRef, useState } from "react";
import { showreelProjects } from "@/config/portfolio";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projectAspect } from "@/lib/video";
import Player from "./Player";

const reel = showreelProjects;

export default function Showreel() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Glass stage opens from a framed window to full screen while pinned.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", pin: true, scrub: true, anticipatePin: 1 },
        })
        .fromTo(".reel-frame", { clipPath: "inset(13% 8% 13% 8% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
        .fromTo(".reel-stage", { scale: 0.84 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".reel-side", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.6);
    });
    return () => mm.revert();
  }, { scope: root });

  if (!reel.length) return null;
  const current = reel[active];
  const wide = projectAspect(current) === "16:9";

  return (
    <section ref={root} id="showreel" className="relative h-[100svh] min-h-[640px]" aria-label="Showreel">
      <div className="reel-frame absolute inset-0 border-y border-white/80 bg-white/45 backdrop-blur-2xl">
        <div className="shell grid h-full grid-rows-[auto_1fr_auto] gap-4 pb-6 pt-24 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:pb-10 lg:pt-28">
          <div className="reel-side flex items-end justify-between lg:block lg:self-end lg:pb-6">
            <p className="label">(02) — Showreel</p>
            <h2 className="display display-md lg:mt-4">The <em>reel</em></h2>
          </div>

          <div className="reel-stage flex min-h-0 items-center justify-center">
            <Player
              key={current.id}
              project={current}
              index={active}
              autoStart={touched}
              className={wide ? "w-full max-w-3xl" : "h-full max-h-[74svh] lg:h-[74svh]"}
            />
          </div>

          <ol className="reel-side h-scroll flex gap-2 overflow-x-auto lg:block lg:space-y-2 lg:self-end lg:overflow-visible lg:pb-6">
            {reel.map((p, i) => (
              <li key={p.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setTouched(true);
                  }}
                  aria-current={i === active}
                  className={`flex w-full items-baseline gap-4 rounded-full px-4 py-2.5 text-left transition-all duration-300 lg:rounded-2xl lg:px-5 lg:py-4 ${
                    i === active ? "glass text-bone" : "border border-transparent text-mute hover:text-bone"
                  }`}
                >
                  <span className="label !text-current">0{i + 1}</span>
                  <span className="text-sm font-medium lg:text-base">{p.brand}</span>
                  <span className="label ml-auto hidden lg:inline">{p.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
