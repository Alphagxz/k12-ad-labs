/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — INTRO, SERVICES, CLIENTS, ABOUT, CASE STUDIES
 * ─────────────────────────────────────────────────────────────
 */

export const intro = {
  lead: "We create films and advertising that capture attention, connect with audiences and help brands scale their creative output.",
  body: "From live-action campaign films to AI-powered production, we handle concept, direction, production and post under one roof — so every piece of content looks considered and lands on time.",
};

export type Service = {
  title: string;
  description: string;
  tags: string[];
  /** Project (portfolio.ts id) whose frame illustrates this service. */
  projectId: string;
  /** Optional custom image ("/media/…jpg" or URL) instead of the project frame. */
  imageUrl: string;
};

export const services: Service[] = [
  {
    title: "Brand Films & Commercials",
    description: "Campaign films and commercials with a clear idea at the centre — directed, shot and finished to broadcast standard.",
    tags: ["Campaigns", "Direction", "Live action"],
    projectId: "soch",
    imageUrl: "",
  },
  {
    title: "AI Video Production",
    description: "Cinematic AI-generated films and commercials, directed with the craft of a traditional production and delivered far faster.",
    tags: ["AI commercials", "AI animation", "Visual worlds"],
    projectId: "pet-project",
    imageUrl: "",
  },
  {
    title: "AI UGC & Performance Ads",
    description: "Creator-style ads built hook-first for paid social, with the variations your media team needs to test and scale.",
    tags: ["AI UGC", "Paid social", "Hook variations"],
    projectId: "cheater-scanner",
    imageUrl: "",
  },
  {
    title: "Product Films",
    description: "Product-led films that show texture, detail and appetite appeal — for launches, e-commerce and retail.",
    tags: ["Product", "Food & beverage", "Launch films"],
    projectId: "trunativ",
    imageUrl: "",
  },
  {
    title: "Social Content & Reels",
    description: "Always-on content for Reels, TikTok and Shorts — on-brand, platform-native and delivered at the volume feeds demand.",
    tags: ["Reels", "TikTok", "Shorts"],
    projectId: "tripsniper",
    imageUrl: "",
  },
  {
    title: "Post-Production",
    description: "Editing, colour, motion graphics and sound design that take footage — ours or yours — to a finished film.",
    tags: ["Edit", "Colour", "Sound"],
    projectId: "bosch",
    imageUrl: "",
  },
];

/** Brands shown in the "Selected clients" section. */
export const clients: { name: string; logoUrl?: string }[] = [
  { name: "Bosch" },
  { name: "Soch" },
  { name: "Bangalore Airport" },
  { name: "TruNativ" },
  { name: "Rumik AI" },
  { name: "Phoenix Mall" },
  { name: "Pet Project" },
  { name: "Adukale" },
];

export const about = {
  headline: ["Creative thinking.", "*Full-scale* production."],
  aside: "A production partner, not a vendor.",
  body: "K12 Ad Labs brings creative direction, production craft and AI technology together to deliver premium films and advertising at scale. We work as an extension of your team — from the first idea to the final cut — so you can produce more, test more and move faster without lowering the bar.",
  pillars: [
    { title: "Creative storytelling", text: "Every film starts with an idea worth watching." },
    { title: "End-to-end production", text: "Concept, shoot, AI generation, edit and finish in one team." },
    { title: "AI-powered workflows", text: "Advanced pipelines remove the slow parts of production." },
    { title: "Speed at scale", text: "From one hero film to hundreds of variations, on schedule." },
    { title: "Performance-driven", text: "Content made to be measured, iterated and scaled." },
  ],
};

export type CaseStudy = {
  slug: string;
  brand: string;
  category: string;
  /**
   * `draft: true` shows a "Draft — content pending" tag on the page.
   * Set to false once the real copy is in.
   */
  draft: boolean;
  introduction: string;
  objective: string;
  concept: string;
  process: { title: string; text: string }[];
  /** id of a project in portfolio.ts — its video is the "final film". */
  projectId: string;
  /** Supporting images: "/media/…jpg" or URLs. "" entries render marked placeholders. */
  images: string[];
  /** Only real, supplied figures. Leave [] and the Results block is hidden. */
  results: { value: string; label: string }[];
};

/**
 * Copy below is carried over from the existing portfolio. Empty
 * fields ("" or []) are simply hidden on the page — fill them in
 * to add a brand introduction, process steps, images or results.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "rumik-ai",
    brand: "Rumik AI",
    category: "AI UGC · App Advertising",
    draft: false,
    introduction: "",
    objective: "Creator-led creative for an AI app.",
    concept: "Short-form storytelling that introduces the product in a familiar social format and keeps the message focused.",
    process: [],
    projectId: "rumik-ai",
    images: [],
    results: [],
  },
  {
    slug: "moneypilot",
    brand: "MoneyPilot",
    category: "AI UGC · Performance Advertising",
    draft: false,
    introduction: "",
    objective: "Performance-led financial product creative.",
    concept: "Creator-style short-form storytelling with a clear opening hook and concise product messaging.",
    process: [],
    projectId: "moneypilot",
    images: [],
    results: [],
  },
  {
    slug: "pet-project",
    brand: "Pet Project",
    category: "AI Animated Brand Film",
    draft: false,
    introduction: "",
    objective: "A character-led animated brand film for a pet-care concept.",
    concept: "A playful visual world shaped through animated scenes, a clear narrative progression and a polished final edit.",
    process: [],
    projectId: "pet-project",
    images: [],
    results: [],
  },
  {
    slug: "cheater-scanner",
    brand: "Cheater Scanner",
    category: "AI UGC · TikTok Creative",
    draft: false,
    introduction: "",
    objective: "Social-first advertising for an app-oriented service.",
    concept: "A vertical UGC format built around an immediate hook, a concise narrative and platform-native pacing.",
    process: [],
    projectId: "cheater-scanner",
    images: [],
    results: [],
  },
];
