"use client";

import { useRef, useState } from "react";
import { services } from "@/config/content";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import Lines from "./Lines";
import Media from "./Media";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // The sticky visual follows whichever service is centred.
  useGSAP(() => {
    const items = root.current!.querySelectorAll<HTMLElement>(".svc-item");
    const triggers = Array.from(items).map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) })
    );
    return () => triggers.forEach((t) => t.kill());
  }, { scope: root });

  return (
    <section ref={root} id="services" className="shell py-28 md:py-40">
      <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
        <div>
          <p className="label mb-4">(05) — Services</p>
          <Lines lines={["What we", "produce."]} className="display display-lg" />
        </div>
        <p data-reveal className="max-w-sm text-lg leading-relaxed text-mute">
          One production partner for every format a modern brand needs — from a single hero film to hundreds of variations.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 aspect-[4/5] max-h-[76vh] overflow-hidden rounded-md">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="absolute inset-0 transition-[opacity,transform,clip-path] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.08)",
                  clipPath: i <= active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                }}
                aria-hidden={i !== active}
              >
                <Media src={s.imageUrl} alt={s.title} index={i + 2} note="Service visual placeholder" className="h-full w-full" sizes="40vw" />
              </div>
            ))}
            <p className="label absolute bottom-4 left-4 z-10 !text-bone">
              {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {services.map((s, i) => (
            <li key={s.title} className={`svc-item border-t border-line py-9 transition-opacity duration-500 last:border-b lg:py-14 ${i === active ? "lg:opacity-100" : "lg:opacity-35"}`}>
              <div className="flex gap-6">
                <span className="label w-8 pt-2">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="display text-[clamp(2rem,4.2vw,4rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-mute">{s.description}</p>
                  <Media src={s.imageUrl} alt={s.title} index={i + 2} note="Service visual placeholder" className="mt-6 aspect-[16/10] rounded-md lg:hidden" sizes="90vw" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
