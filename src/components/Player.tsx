"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/config/portfolio";
import { aspectClass, projectAspect, resolveThumbnail, resolveVideo } from "@/lib/video";
import Media from "./Media";
import { PauseIcon, PlayIcon, SoundOffIcon, SoundOnIcon } from "./Icons";

/**
 * One player for every video on the site.
 *  • Direct files (.mp4/.webm) → native <video> with custom play / mute controls.
 *  • Google Drive / YouTube / Vimeo → embedded player (their own controls).
 * Nothing is loaded until the visitor presses play.
 */
export default function Player({
  project,
  index = 0,
  autoStart = false,
  className = "",
}: {
  project: Project;
  index?: number;
  autoStart?: boolean;
  className?: string;
}) {
  const video = resolveVideo(project.videoUrl);
  const thumb = resolveThumbnail(project);
  const [started, setStarted] = useState(autoStart && video.kind !== "none");
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // Pause when scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el || !started) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && el.pause(), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const label = `${project.brand} — ${project.title}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-30px_rgb(30_20_80/0.55)] ${aspectClass[projectAspect(project)]} ${className}`}>
      {!started && (
        <button
          type="button"
          onClick={() => video.kind !== "none" && setStarted(true)}
          disabled={video.kind === "none"}
          aria-label={`Play ${label}`}
          data-cursor={video.kind === "none" ? undefined : "PLAY"}
          className="group absolute inset-0 block h-full w-full"
        >
          <Media src={thumb} alt={label} title={project.brand} subtitle={project.title} index={index} className="absolute inset-0 h-full w-full" sizes="(min-width: 1024px) 40vw, 90vw" />
          <span className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-bone shadow-xl backdrop-blur-md transition-transform duration-500 ease-out group-hover:scale-110">
            <PlayIcon className="h-6 w-6 translate-x-0.5" />
          </span>
        </button>
      )}

      {started && video.kind === "file" && (
        <>
          <video
            ref={ref}
            src={video.src}
            poster={thumb || undefined}
            autoPlay
            playsInline
            loop
            muted={muted}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onClick={toggle}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
            <button type="button" onClick={toggle} aria-label={paused ? "Play" : "Pause"} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-bone">
              {paused ? <PlayIcon className="h-4 w-4 translate-x-px" /> : <PauseIcon className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-sm">
              {muted ? <SoundOffIcon className="h-5 w-5" /> : <SoundOnIcon className="h-5 w-5" />}
            </button>
          </div>
        </>
      )}

      {started && video.kind === "embed" && (
        <iframe
          src={video.src}
          title={label}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
