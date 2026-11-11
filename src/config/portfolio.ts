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
 *  3. `thumbnailUrl` (optional): leave "" and a frame from the video
 *     is saved automatically at build time. To override, use a file
 *     in /public (e.g. "/media/soch.jpg") or any image URL.
 *
 *  A FOLDER link is not a video link. Folder links belong in
 *  `driveFolders` below — they open in Google Drive in a new tab.
 * ─────────────────────────────────────────────────────────────
 */

export type Project = {
  /** Unique id, used by the hero cards and services. */
  id: string;
  title: string;
  brand: string;
  category: string;
  /** Google Drive FILE link, direct video URL, YouTube or Vimeo. */
  videoUrl: string;
  thumbnailUrl: string;
  /** Video shape. "9:16" vertical (default), "16:9", "1:1" or "4:5". */
  aspect?: "9:16" | "16:9" | "1:1" | "4:5";
  discipline: "AI" | "Film";
};

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/**
 * SELECTED WORK — shown in this order.
 * `discipline` groups the work: "AI" or "Film".
 * The two "Animated Reel" entries are editorial reels about a brand,
 * so the brand sits in `title` and is not listed as a client.
 * `aspect` is only a hint; the real shape is measured from the video
 * frame at build time. Leave `thumbnailUrl` "" to use that frame.
 */
export const featuredProjects: Project[] = [
  { id: "soch", brand: "Soch", title: "Campaign Film", category: "Brand Campaign", discipline: "Film", videoUrl: drive("1GeVFB0aeGNUDI96Euxzx5PrQWNJQANAy"), thumbnailUrl: "", aspect: "16:9" },
  { id: "pet-project", brand: "Pet Project", title: "Animated Brand Film", category: "AI Animation", discipline: "AI", videoUrl: drive("1WLHVzz0cQByB4mVKBBLnbFGJmipx4weD"), thumbnailUrl: "" },
  { id: "bosch", brand: "Bosch", title: "Ride Campaign", category: "Campaign Film", discipline: "Film", videoUrl: drive("14q_9bZmS60WR231Q_9yBg_Fn9X5rsmCT"), thumbnailUrl: "", aspect: "16:9" },
  { id: "cheater-scanner", brand: "Cheater Scanner", title: "TikTok Creative", category: "AI UGC", discipline: "AI", videoUrl: drive("1WrRulgnGmmT-_do7waXJB5vBPbmzczwK"), thumbnailUrl: "" },
  { id: "trunativ", brand: "TruNativ", title: "Essential Protein Launch", category: "Product Film", discipline: "Film", videoUrl: drive("1YkKlddFh30gvfDfpcdXUW6Tijm0zZpnz"), thumbnailUrl: "" },
  { id: "moneypilot", brand: "MoneyPilot", title: "Performance Advertising", category: "AI UGC", discipline: "AI", videoUrl: drive("11SPwSTkA1KkPESnO81PGGWQtqTfOvAKn"), thumbnailUrl: "" },
  { id: "bangalore-airport", brand: "Bangalore Airport", title: "Gifting Film", category: "Brand Film", discipline: "Film", videoUrl: drive("1CJSFOe3StbxM-gAkJKwzJaajEIVx6gFd"), thumbnailUrl: "", aspect: "16:9" },
  { id: "anim-starbucks", brand: "Animated Reel", title: "Starbucks", category: "Animation", discipline: "Film", videoUrl: drive("1t9lqova9t3KgDoS1ieG0SCAwKBHkjMRE"), thumbnailUrl: "" },
  { id: "rumik-ai", brand: "Rumik AI", title: "App Advertising", category: "AI UGC", discipline: "AI", videoUrl: drive("12tDyrvvbhtGMSSRdh2ocpgMJQkyTyEsg"), thumbnailUrl: "" },
  { id: "adukale", brand: "Adukale", title: "Product Advertisement", category: "AI Product Film", discipline: "AI", videoUrl: drive("1ked_9FQePqzZfcdf9KFpBJQU58brrB4Z"), thumbnailUrl: "", aspect: "16:9" },
  { id: "anim-redbull", brand: "Animated Reel", title: "Red Bull", category: "Animation", discipline: "Film", videoUrl: drive("1Dk23CS9MAGFey0bPMT2BugMx_L9vMoa2"), thumbnailUrl: "" },
  { id: "social-catfish", brand: "Social Catfish", title: "Social Ad", category: "AI UGC", discipline: "AI", videoUrl: drive("148s5sBRapmuRhZ4KiQZDNSigw6c92XnR"), thumbnailUrl: "" },
];

/**
 * SHOWREEL — alternate cuts, so no film appears twice on the page.
 */
export const showreelProjects: Project[] = [
  { id: "reel-trunativ", brand: "TruNativ", title: "Everyday Sugar", category: "Product Film", discipline: "Film", videoUrl: drive("1BwSz4KOYznVAi5baSAmEBE_obkC5-Jhe"), thumbnailUrl: "" },
  { id: "reel-moneypilot", brand: "MoneyPilot", title: "Alternate cut", category: "AI UGC", discipline: "AI", videoUrl: drive("1kIHi32-q40azqOlZmdrC2sLNIFJdLYPP"), thumbnailUrl: "" },
  { id: "reel-cardoutpost", brand: "CardOutpost", title: "Social Creative", category: "AI UGC", discipline: "AI", videoUrl: drive("1ZHcUuSf87pcYbcMDW23GUhbC10LJyCkk"), thumbnailUrl: "" },
];

/** Google Drive FOLDER links — open directly in Drive in a new tab. */
export const driveFolders = {
  /** "VIEW ALL PROJECTS" button. */
  allProjects: "https://drive.google.com/drive/folders/1z2ruZlJkq4eFj_iJltS8JJs1gzDZzf12",
  /** Rows in the More Projects list. Rows with an empty url show as "link pending". */
  folders: [
    { label: "AI UGC & TikTok", note: "Paid social creatives", url: "https://drive.google.com/drive/folders/1csv8j4Jc7GM73i0nRv2-mxloHx0qlqJo" },
    { label: "Animated Reels", note: "Animated short-form", url: "https://drive.google.com/drive/folders/1PFlpL5MdhwpKcpcx2z88CO55JhFW8ZlP" },
    { label: "TruNativ", note: "Product films", url: "https://drive.google.com/drive/folders/1iNHlMladJQWectFGyh_zS_nRoGNLuEp5" },
    { label: "Bangalore Airport", note: "Campaign films", url: "https://drive.google.com/drive/folders/1U1GFTZ1ZV46t7HGb0CecyhYe5qp6YAM9" },
    { label: "Soch", note: "Campaign films", url: "https://drive.google.com/drive/folders/1PssE5J8aBoJ4AU5uVf_NUnDVtjgiimuz" },
    { label: "Bosch", note: "Campaign films", url: "https://drive.google.com/drive/folders/1fKefhvWWH9-I9Z3USX66Dw6jPcYhpiM5" },
  ],
};
