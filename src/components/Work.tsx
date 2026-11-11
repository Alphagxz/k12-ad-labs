"use client";

import { useRef } from "react";
import { featuredProjects } from "@/config/portfolio";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";
import { resolveThumbnail } from "@/lib/video";
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
        gsap.fromTo(card.querySelector(".media-img"), { xPercent: -7, scale: 1.16 }, {
          xPercent: 7,
          scale: 1.16,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="work" className="overflow-hidden py-24 lg:flex lg:h-screen lg:min-h-[680px] lg:flex-col lg:justify-center lg:py-0 lg:pt-16">
      <div className="shell mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="label mb-3">(03) — Selected work</p>
          <Lines lines={["Selected Work"]} className="display display-md" />
        </div>
        <p className="label hidden pb-2 sm:block">
          {String(featuredProjects.length).padStart(2, "0")} films <span className="lg:hidden">— swipe</span><span className="hidden lg:inline">— scroll</span>
        </p>
      </div>

      <div ref={track} className="h-scroll flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:will-change-transform">
        {featuredProjects.map((p, i) => (
          <article key={p.id} className="work-card w-[70vw] shrink-0 snap-center sm:w-[42vw] lg:w-auto">
            <button
              type="button"
              onClick={() => open(p, i)}
              data-cursor="PLAY"
              aria-label={`Play ${p.brand} — ${p.title}`}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-md lg:h-[56vh] lg:w-auto"
            >
              <Media
                src={resolveThumbnail(p.thumbnailUrl, p.videoUrl)}
                alt={`${p.brand} — ${p.title}`}
                index={i}
                note="Thumbnail placeholder"
                className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="label absolute left-4 top-4 !text-bone">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-bone text-ink transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-accent">
                <PlayIcon className="h-4 w-4 translate-x-px" />
              </span>
              <span className="label absolute bottom-5 left-4 translate-y-3 !text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Play film
              </span>
            </button>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium leading-tight">{p.brand}</h3>
                <p className="mt-1 text-sm text-mute">{p.title}</p>
              </div>
              <p className="label pt-1 text-right">{p.category}</p>
            </div>
          </article>
        ))}
        <div className="hidden w-[8vw] shrink-0 lg:block" aria-hidden />
      </div>

      <div className="shell mt-8 hidden lg:block" aria-hidden>
        <div className="h-px w-full bg-line">
          <div className="work-progress h-full origin-left scale-x-0 bg-bone" />
        </div>
      </div>
    </section>
  );
}
