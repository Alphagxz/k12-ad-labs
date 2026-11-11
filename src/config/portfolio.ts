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

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/**
 * SELECTED WORK — shown in this order.
 * Thumbnails are left "" so Drive's automatic thumbnail is used; drop
 * a custom image in /public/media and set thumbnailUrl to override.
 * If a film is landscape, set aspect: "16:9" so it is framed correctly.
 */
export const featuredProjects: Project[] = [
  { id: "pet-project", brand: "Pet Project", title: "AI Animated Brand Film", category: "Animation", videoUrl: drive("1WLHVzz0cQByB4mVKBBLnbFGJmipx4weD"), thumbnailUrl: "" },
  { id: "cheater-scanner", brand: "Cheater Scanner", title: "AI UGC / TikTok Creative", category: "AI UGC", videoUrl: drive("1WrRulgnGmmT-_do7waXJB5vBPbmzczwK"), thumbnailUrl: "" },
  { id: "social-catfish", brand: "Social Catfish", title: "AI UGC / Social Ad", category: "AI UGC", videoUrl: drive("148s5sBRapmuRhZ4KiQZDNSigw6c92XnR"), thumbnailUrl: "" },
  { id: "tripsniper", brand: "TripSniper", title: "AI UGC / Travel Ad", category: "AI UGC", videoUrl: drive("1FwLraGfuwc0TKTw9JHA4LZJeTALHMxBq"), thumbnailUrl: "" },
  { id: "moneypilot", brand: "MoneyPilot", title: "AI UGC / Performance Advertising", category: "Performance", videoUrl: drive("11SPwSTkA1KkPESnO81PGGWQtqTfOvAKn"), thumbnailUrl: "" },
  { id: "rumik-ai", brand: "Rumik AI", title: "AI UGC / App Advertising", category: "App Advertising", videoUrl: drive("12tDyrvvbhtGMSSRdh2ocpgMJQkyTyEsg"), thumbnailUrl: "" },
  { id: "adukale", brand: "Adukale", title: "AI Product Advertisement", category: "Product Advertising", videoUrl: drive("1ked_9FQePqzZfcdf9KFpBJQU58brrB4Z"), thumbnailUrl: "", aspect: "16:9" },
  // Optional 8th slot (same curated folder) — uncomment to feature:
  // { id: "cardoutpost", brand: "CardOutpost", title: "AI UGC Creative", category: "AI UGC", videoUrl: drive("1ZHcUuSf87pcYbcMDW23GUhbC10LJyCkk"), thumbnailUrl: "" },
];

/**
 * SHOWREEL — alternate cuts, so no film appears twice on the page.
 */
export const showreelProjects: Project[] = [
  { id: "reel-tripsniper", brand: "TripSniper", title: "Ad Reel 02", category: "Travel", videoUrl: drive("12OgpPbxVindbpQrSBkrH-jpo62P0CKRj"), thumbnailUrl: "" },
  { id: "reel-moneypilot", brand: "MoneyPilot", title: "Alternate cut", category: "Performance", videoUrl: drive("1kIHi32-q40azqOlZmdrC2sLNIFJdLYPP"), thumbnailUrl: "" },
  { id: "reel-cheater-scanner", brand: "Cheater Scanner", title: "Alternate cut", category: "AI UGC", videoUrl: drive("1s_I0RRsVfI0X9bzi14HmFZ2jneSrl6JJ"), thumbnailUrl: "" },
  { id: "reel-cardoutpost", brand: "CardOutpost", title: "Cut 02", category: "AI UGC", videoUrl: drive("1ZHcUuSf87pcYbcMDW23GUhbC10LJyCkk"), thumbnailUrl: "" },
];

/** Google Drive FOLDER links — open directly in Drive in a new tab. */
export const driveFolders = {
  /** "VIEW ALL PROJECTS" button. */
  allProjects: "https://drive.google.com/drive/folders/1z2ruZlJkq4eFj_iJltS8JJs1gzDZzf12",
  /** Rows in the More Projects list. Rows with an empty url show as "link pending". */
  folders: [
    { label: "AI UGC & TikTok", note: "Paid social creatives", url: "https://drive.google.com/drive/folders/1csv8j4Jc7GM73i0nRv2-mxloHx0qlqJo" },
    { label: "Animated Reels", note: "Animated short-form", url: "https://drive.google.com/drive/folders/1PFlpL5MdhwpKcpcx2z88CO55JhFW8ZlP" },
    { label: "TruNativ", note: "Brand work", url: "https://drive.google.com/drive/folders/1iNHlMladJQWectFGyh_zS_nRoGNLuEp5" },
    { label: "Bangalore Airport", note: "Campaign films", url: "https://drive.google.com/drive/folders/1U1GFTZ1ZV46t7HGb0CecyhYe5qp6YAM9" },
    { label: "Soch", note: "Campaign films", url: "https://drive.google.com/drive/folders/1PssE5J8aBoJ4AU5uVf_NUnDVtjgiimuz" },
  ],
};
