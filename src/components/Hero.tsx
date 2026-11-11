"use client";

import Link from "next/link";
import { useRef } from "react";
import { featuredProjects } from "@/config/portfolio";
import { site } from "@/config/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { resolveThumbnail } from "@/lib/video";
import HeroBackdrop from "./HeroBackdrop";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import Media from "./Media";
import { PlayIcon } from "./Icons";
import { READY_EVENT } from "./Preloader";
import { useVideoModal } from "./VideoModal";

const cards = site.hero.cardProjectIds
  .map((id) => featuredProjects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => !!p)
  .slice(0, 3);

// Position / tilt of each floating card.
const LAYOUT = [
  "right-[2%] top-[4%] w-[62%] aspect-[16/10] rotate-[3deg] z-10",
  "left-0 top-[34%] w-[40%] aspect-[9/14] -rotate-[5deg] z-20",
  "right-[6%] bottom-0 w-[46%] aspect-[4/5] rotate-[2deg] z-30",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { open } = useVideoModal();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Resolve elements now: the intro runs later, outside this GSAP context.
      const q = gsap.utils.selector(root);
      const lines = q(".hero-line .line-inner");
      const fades = q(".hero-fade");
      const bg = q(".hero-bg");
      const tiles = q(".hero-card");
      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { opacity: 0, y: 24 });
      gsap.set(bg, { scale: 1.2, opacity: 0 });
      gsap.set(tiles, { opacity: 0, y: 80, scale: 0.9 });

      const intro = () =>
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(bg, { scale: 1, opacity: 1, duration: 2.2 }, 0)
          .to(lines, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.15)
          .to(fades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.7)
          .to(tiles, { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.14 }, 0.5);

      if ((window as unknown as { __k12ready?: boolean }).__k12ready) intro();
      else window.addEventListener(READY_EVENT, intro, { once: true });

      // Scroll-out: copy drifts up, cards separate at different speeds.
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      tl.to(".hero-copy", { yPercent: -18, opacity: 0.25, ease: "none" }, 0).to(".hero-bg-wrap", { yPercent: 14, ease: "none" }, 0);
      q(".hero-card-wrap").forEach((el, i) => tl.to(el, { yPercent: [-38, -70, -22][i] ?? -30, ease: "none" }, 0));

      return () => window.removeEventListener(READY_EVENT, intro);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-28 md:pt-32">
      <div className="hero-bg-wrap absolute inset-0 -z-10">
        <div className="hero-bg absolute inset-0">
          <HeroBackdrop />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell grid w-full items-center gap-12 lg:grid-cols-12">
        <div className="hero-copy lg:col-span-8 xl:col-span-7">
          <p className="hero-fade glass-soft chip mb-7 gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {site.eyebrow}
          </p>
          <Lines as="h1" manual lines={site.headline} className="hero-line display text-[clamp(2.9rem,7.1vw,7.6rem)]" />
          <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-mute md:text-xl">{site.subheadline}</p>
          <div className="hero-fade mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/#work" className="btn btn-solid">Explore our work</Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#contact" className="btn btn-ghost">Start a project</Link>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto aspect-[10/11] w-full max-w-md lg:col-span-4 lg:max-w-none xl:col-span-5">
          {cards.map((p, i) => (
            <div key={p.id} className={`hero-card-wrap absolute ${LAYOUT[i]}`}>
              <button
                type="button"
                onClick={() => open(p, i)}
                data-cursor="PLAY"
                aria-label={`Play ${p.brand} — ${p.title}`}
                className="hero-card glass group block h-full w-full rounded-3xl p-2"
              >
                <span className="relative block h-full w-full overflow-hidden rounded-2xl">
                  <Media src={resolveThumbnail(p)} alt={`${p.brand} — ${p.title}`} title={p.brand} subtitle={p.category} index={i} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 28vw, 60vw" priority={i === 0} />
                  <span className="glass-soft chip absolute left-3 top-3 gap-2">
                    <PlayIcon className="h-2.5 w-2.5" />
                    {p.brand}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
