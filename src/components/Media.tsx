"use client";

import { useState } from "react";
import Image from "next/image";

const HUES = [18, 250, 200, 330, 150, 40, 280, 190];

/**
 * Image frame. Shows `src` when available; otherwise (or if the image
 * fails to load) a designed poster card carrying the title, so a tile
 * is never empty.
 */
export default function Media({
  src,
  alt,
  title,
  subtitle,
  index = 0,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 80vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  /** Poster headline (usually the brand). */
  title?: string;
  subtitle?: string;
  index?: number;
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
          aria-label={alt}
          className="media-img poster absolute inset-0 flex flex-col justify-end p-[7%]"
          style={{ ["--poster-hue" as string]: HUES[index % HUES.length] }}
        >
          <div>
            <span className="display block text-[clamp(1.5rem,3.4vw,3.2rem)] leading-[0.95] text-bone">{title ?? alt}</span>
            {subtitle && <span className="label mt-3 block !text-bone/70">{subtitle}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
