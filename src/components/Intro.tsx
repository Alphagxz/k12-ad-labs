"use client";

import { useRef } from "react";
import { intro } from "@/config/content";
import { site } from "@/config/site";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

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

      // Counter runs 0 → value every time the figure scrolls into view.
      gsap.utils.toArray<HTMLElement>(".stat-num", root.current).forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const n = { v: 0 };
        const render = () => (el.textContent = String(Math.round(n.v)));
        const run = () => gsap.fromTo(n, { v: 0 }, { v: target, duration: 2, ease: "power2.out", overwrite: true, onUpdate: render });
        const reset = () => {
          gsap.killTweensOf(n);
          n.v = 0;
          render();
        };
        reset();
        ScrollTrigger.create({ trigger: el, start: "top 92%", end: "bottom 8%", onEnter: run, onEnterBack: run, onLeave: reset, onLeaveBack: reset });
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
              {site.stats.map((s) => {
                const num = parseFloat(s.value);
                const suffix = s.value.replace(/^[\d.,]+/, "");
                return (
                  <div key={s.label} data-reveal>
                    <dd className="display text-[clamp(4.5rem,9vw,9rem)] leading-none text-accent" aria-label={s.value}>
                      <span className="stat-num tabular-nums" data-target={num} aria-hidden>{num}</span>
                      <span aria-hidden>{suffix}</span>
                    </dd>
                    <dt className="label mt-3">{s.label}</dt>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
