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

/** Explicit thumbnail → Drive auto-thumbnail → "" (placeholder frame). */
export function resolveThumbnail(thumbnailUrl: string, videoUrl: string): string {
  if (thumbnailUrl?.trim()) return thumbnailUrl.trim();
  const id = driveFileId(videoUrl ?? "");
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : "";
}

export const aspectClass: Record<string, string> = {
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};
