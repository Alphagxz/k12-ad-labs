"use client";

import { useRef, useState } from "react";
import { services } from "@/config/content";
import { featuredProjects } from "@/config/portfolio";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { resolveThumbnail } from "@/lib/video";
import Lines from "./Lines";
import Media from "./Media";

const visual = (projectId: string, imageUrl: string) => {
  if (imageUrl) return imageUrl;
  const p = featuredProjects.find((x) => x.id === projectId);
  return p ? resolveThumbnail(p) : "";
};

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
          <Lines lines={["Everything a", "brand needs *on screen.*"]} className="display display-lg" />
        </div>
        <p data-reveal className="max-w-sm text-lg leading-relaxed text-mute">
          One production partner for every format — from a single hero film to hundreds of variations.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="glass sticky top-28 rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-3xl">
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
                  <Media src={visual(s.projectId, s.imageUrl)} alt={s.title} title={s.title} subtitle={s.tags.join(" · ")} index={i + 2} className="h-full w-full" sizes="40vw" />
                </div>
              ))}
              <p className="glass-soft chip absolute bottom-4 left-4 z-10">
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")} · {services[active].title}
              </p>
            </div>
          </div>
        </div>

        <ol className="space-y-4 lg:col-span-6 lg:col-start-7">
          {services.map((s, i) => (
            <li key={s.title} className={`svc-item glass rounded-3xl p-6 transition-opacity duration-500 md:p-9 ${i === active ? "lg:opacity-100" : "lg:opacity-55"}`}>
              <div className="flex gap-5">
                <span className="label w-7 pt-2 !text-accent">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="display text-[clamp(1.7rem,3vw,2.9rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-mute">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="chip border border-line bg-white/50">{t}</li>
                    ))}
                  </ul>
                  <Media src={visual(s.projectId, s.imageUrl)} alt={s.title} title={s.title} index={i + 2} className="mt-6 aspect-[16/10] rounded-2xl lg:hidden" sizes="90vw" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
