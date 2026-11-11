/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — INTRO, SERVICES, CLIENTS, ABOUT
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
    projectId: "anim-starbucks",
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

/**
 * Brands shown in the "Selected clients" section, taken from the
 * project folders in the Drive portfolio. Remove or reorder freely;
 * add `logoUrl` ("/media/logos/x.svg") to show a logo instead of type.
 */
export const clients: { name: string; logoUrl?: string }[] = [
  { name: "Bosch" },
  { name: "Zomato" },
  { name: "Swiggy × AiDash" },
  { name: "Okta" },
  { name: "Bangalore Airport" },
  { name: "Soch" },
  { name: "Home Centre" },
  { name: "TruNativ" },
  { name: "Rumik AI" },
  { name: "Pet Project" },
  { name: "Adukale" },
  { name: "MoneyPilot" },
  { name: "Cheater Scanner" },
  { name: "Social Catfish" },
  { name: "TripSniper" },
  { name: "CardOutpost" },
  { name: "DeepScan" },
  { name: "Videshi Coffee" },
  { name: "Indian Kanteen" },
  { name: "Vyana" },
  { name: "Cataleya" },
  { name: "CKPC Properties" },
  { name: "Phaco Festival" },
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
