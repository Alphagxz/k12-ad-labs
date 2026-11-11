"use client";

import { useRef } from "react";
import { featuredProjects } from "@/config/portfolio";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";
import { aspectClass, projectAspect, resolveThumbnail } from "@/lib/video";
import Lines from "./Lines";
import Media from "./Media";
import { PlayIcon } from "./Icons";
import { useVideoModal } from "./VideoModal";

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { open } = useVideoModal();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop: vertical scroll drives a pinned horizontal gallery.
    mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.to(".work-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.fromTo(card.querySelector(".media-img"), { xPercent: -6, scale: 1.14 }, {
          xPercent: 6,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="work" className="overflow-hidden py-24 lg:flex lg:h-screen lg:min-h-[700px] lg:flex-col lg:justify-center lg:py-0 lg:pt-20">
      <div className="shell mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="label mb-3">(03) — Selected work</p>
          <Lines lines={["Selected *work*"]} className="display display-md" />
        </div>
        <p className="label hidden pb-2 sm:block">
          {String(featuredProjects.length).padStart(2, "0")} films <span className="lg:hidden">— swipe</span><span className="hidden lg:inline">— scroll</span>
        </p>
      </div>

      <div ref={track} className="h-scroll flex w-full snap-x snap-mandatory items-start gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-6 lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:will-change-transform">
        {featuredProjects.map((p, i) => {
          const aspect = projectAspect(p);
          const wide = aspect === "16:9";
          return (
            <article key={p.id} className={`work-card glass shrink-0 snap-center rounded-3xl p-2 ${wide ? "w-[84vw] sm:w-[62vw]" : "w-[66vw] sm:w-[38vw]"} lg:w-auto`}>
              <button
                type="button"
                onClick={() => open(p, i)}
                data-cursor="PLAY"
                aria-label={`Play ${p.brand} — ${p.title}`}
                className={`group relative block w-full overflow-hidden rounded-2xl ${aspectClass[aspect]} lg:h-[50vh] lg:w-auto`}
              >
                <Media
                  src={resolveThumbnail(p)}
                  alt={`${p.brand} — ${p.title}`}
                  title={p.brand}
                  subtitle={p.title}
                  index={i}
                  className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <span className="glass-soft chip absolute left-3 top-3">{String(i + 1).padStart(2, "0")} · {p.discipline === "AI" ? "AI production" : "Film production"}</span>
                <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/75 text-bone shadow-lg backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <PlayIcon className="h-4 w-4 translate-x-px" />
                </span>
              </button>
              <div className="flex items-start justify-between gap-4 px-3 pb-2 pt-4">
                <div>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">{p.brand}</h3>
                  <p className="mt-1 text-sm text-mute">{p.title}</p>
                </div>
                <p className="label pt-1 text-right">{p.category}</p>
              </div>
            </article>
          );
        })}
        <div className="hidden w-[6vw] shrink-0 lg:block" aria-hidden />
      </div>

      <div className="shell mt-6 hidden lg:block" aria-hidden>
        <div className="h-px w-full bg-line">
          <div className="work-progress h-full origin-left scale-x-0 bg-bone" />
        </div>
      </div>
    </section>
  );
}
