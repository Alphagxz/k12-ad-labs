import manifest from "@/config/thumbs.generated.json";
import type { Project } from "@/config/portfolio";

type Thumb = { src: string; w?: number; h?: number };
const thumbs = manifest as Record<string, Thumb>;

export type Aspect = "9:16" | "16:9" | "1:1" | "4:5";

export type ResolvedVideo =
  | { kind: "none" }
  | { kind: "file"; src: string }
  | { kind: "embed"; src: string; provider: "drive" | "youtube" | "vimeo" };

/** Extracts a Google Drive FILE id from any common share-link format. */
export function driveFileId(url: string): string | null {
  if (!/drive\.google\.com|docs\.google\.com/.test(url)) return null;
  if (/\/folders\//.test(url)) return null; // a folder is not a video
  const m = url.match(/\/d\/([\w-]{10,})/) ?? url.match(/[?&]id=([\w-]{10,})/);
  return m ? m[1] : null;
}

export function resolveVideo(url: string): ResolvedVideo {
  const u = (url ?? "").trim();
  if (!u) return { kind: "none" };

  const drive = driveFileId(u);
  if (drive) return { kind: "embed", provider: "drive", src: `https://drive.google.com/file/d/${drive}/preview` };
  if (/drive\.google\.com/.test(u)) return { kind: "none" };

  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return { kind: "embed", provider: "youtube", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1` };

  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "embed", provider: "vimeo", src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };

  return { kind: "file", src: u };
}

/**
 * Thumbnail order: custom `thumbnailUrl` → frame saved at build time
 * → Drive's live thumbnail. If none loads, a designed poster is shown.
 */
export function resolveThumbnail(p: Pick<Project, "thumbnailUrl" | "videoUrl">): string {
  if (p.thumbnailUrl?.trim()) return p.thumbnailUrl.trim();
  const id = driveFileId(p.videoUrl ?? "");
  if (!id) return "";
  return thumbs[id]?.src ?? `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
}

/** True shape of the film: measured frame → config hint → vertical. */
export function projectAspect(p: Pick<Project, "aspect" | "videoUrl">): Aspect {
  const t = thumbs[driveFileId(p.videoUrl ?? "") ?? ""];
  if (t?.w && t?.h) {
    const r = t.w / t.h;
    if (r > 1.25) return "16:9";
    if (r < 0.7) return "9:16";
    if (r < 0.9) return "4:5";
    return "1:1";
  }
  return p.aspect ?? "9:16";
}

export const aspectClass: Record<Aspect, string> = {
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};
