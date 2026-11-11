/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — PORTFOLIO CONFIGURATION
 *  Everything video-related lives here.
 *
 *  HOW TO ADD / REPLACE A VIDEO
 *  1. In Google Drive: right-click the video → Share →
 *     General access: "Anyone with the link" → Viewer.
 *  2. Copy the link and paste it as `videoUrl`. Any Drive file
 *     link format works, e.g.
 *       https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *     Direct .mp4/.webm URLs, YouTube and Vimeo links also work.
 *  3. `thumbnailUrl` (optional):
 *       • a file in /public, e.g. "/media/rumik-01.jpg", or
 *       • any image URL, or
 *       • leave "" → the site uses Drive's auto thumbnail for
 *         Drive videos, or a marked placeholder frame otherwise.
 *
 *  A FOLDER link is not a video link. Folder links belong in
 *  `driveFolders` below — they open in Google Drive in a new tab.
 * ─────────────────────────────────────────────────────────────
 */

export type Project = {
  /** Unique id, used by the showreel and case studies. */
  id: string;
  title: string;
  brand: string;
  category: string;
  /** Google Drive FILE link, direct video URL, YouTube or Vimeo. */
  videoUrl: string;
  thumbnailUrl: string;
  /** Video shape. "9:16" vertical (default), "16:9", "1:1" or "4:5". */
  aspect?: "9:16" | "16:9" | "1:1" | "4:5";
  year?: string;
};

/**
 * SELECTED WORK — the 6–8 strongest ads, shown in this order.
 * TODO: every entry below is a PLACEHOLDER. Replace title / brand /
 * category and paste the real videoUrl + thumbnailUrl.
 */
export const featuredProjects: Project[] = [
  { id: "project-01", title: "Project title 01", brand: "Rumik AI", category: "AI UGC", videoUrl: "", thumbnailUrl: "" },
  { id: "project-02", title: "Project title 02", brand: "Phoenix Mall", category: "AI Commercial", videoUrl: "", thumbnailUrl: "" },
  { id: "project-03", title: "Project title 03", brand: "Pet Project", category: "Product Advertising", videoUrl: "", thumbnailUrl: "" },
  { id: "project-04", title: "Project title 04", brand: "Cannazo", category: "Performance Advertising", videoUrl: "", thumbnailUrl: "" },
  { id: "project-05", title: "Project title 05", brand: "Adukale", category: "Social Media Creative", videoUrl: "", thumbnailUrl: "" },
  { id: "project-06", title: "Project title 06", brand: "Rumik AI", category: "AI Commercial", videoUrl: "", thumbnailUrl: "" },
];

/** Google Drive FOLDER links — open directly in Drive. */
export const driveFolders = {
  /** "VIEW ALL PROJECTS" button. TODO: paste the main portfolio folder link. */
  allProjects: "",
  /** Brand-specific folders. Rows with an empty url show as "link pending". */
  brands: [
    { brand: "Rumik AI", note: "AI UGC & commercials", url: "" },
    { brand: "Phoenix Mall", note: "Campaign films", url: "" },
    { brand: "Pet Project", note: "Product advertising", url: "" },
    { brand: "Cannazo", note: "Performance creatives", url: "" },
    { brand: "Adukale", note: "Social media creatives", url: "" },
  ],
};
