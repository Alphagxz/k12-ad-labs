"use client";

import { useState } from "react";
import Image from "next/image";

const HUES = [18, 210, 42, 265, 150, 345, 195, 28];

/**
 * Image frame. With `src` it shows the image; without, it renders a
 * clearly marked placeholder "slate" so missing assets are obvious.
 * If an image fails to load, it falls back to the same slate.
 */
export default function Media({
  src,
  alt,
  index = 0,
  note = "Placeholder",
  className = "",
  sizes = "(min-width: 1024px) 33vw, 80vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  index?: number;
  note?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const remote = !!src && /^https?:\/\//.test(src);
  return (
    <div className={`relative overflow-hidden bg-coal ${className}`}>
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={remote}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="media-img object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (placeholder)`}
          className="media-img slate absolute inset-0 flex flex-col justify-between p-4"
          style={{ ["--slate-hue" as string]: HUES[index % HUES.length] }}
        >
          <div className="flex justify-between">
            <span className="h-3 w-3 border-l border-t border-white/40" />
            <span className="h-3 w-3 border-r border-t border-white/40" />
          </div>
          <div className="text-center">
            <span className="display block text-[clamp(3rem,7vw,6rem)] text-white/10">{String(index + 1).padStart(2, "0")}</span>
            <span className="label mt-2 inline-block border border-white/20 px-2 py-1 !text-[0.5625rem] !text-white/60">
              {note} · replace in config
            </span>
          </div>
          <div className="flex justify-between">
            <span className="h-3 w-3 border-b border-l border-white/40" />
            <span className="h-3 w-3 border-b border-r border-white/40" />
          </div>
        </div>
      )}
    </div>
  );
}
