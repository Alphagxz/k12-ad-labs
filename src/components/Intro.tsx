"use client";

import { useRef } from "react";
import { intro } from "@/config/content";
import { site } from "@/config/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(".intro-word", { opacity: 0.14 }, {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: ".intro-text", start: "top 80%", end: "bottom 45%", scrub: true },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="intro" className="shell py-28 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label md:col-span-3">(01) — Introduction</p>
        <div className="md:col-span-9">
          <p className="intro-text text-[clamp(1.7rem,3.9vw,4rem)] font-medium leading-[1.08] tracking-tight" aria-label={intro.lead}>
            {intro.lead.split(" ").map((w, i) => (
              <span key={i} className="intro-word" aria-hidden>{w} </span>
            ))}
          </p>
          <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-9">
            <p data-reveal className="max-w-xl text-lg leading-relaxed text-mute md:col-span-6">{intro.body}</p>
            <dl className="md:col-span-3 md:text-right">
              {site.stats.map((s) => (
                <div key={s.label} data-reveal>
                  <dd className="display display-md text-accent">{s.value}</dd>
                  <dt className="label mt-2">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
