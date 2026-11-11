/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — SERVICES, CLIENTS, ABOUT, CASE STUDIES
 * ─────────────────────────────────────────────────────────────
 */

export const intro = {
  lead: "We create advertising that captures attention, connects with audiences and helps brands scale their creative output.",
  body: "Combining advanced AI production workflows with creative storytelling, we produce high-quality advertising content built for the modern digital landscape.",
};

export type Service = {
  title: string;
  description: string;
  /** Optional supporting visual: "/media/…jpg" or image URL. "" = marked placeholder. */
  imageUrl: string;
};

export const services: Service[] = [
  {
    title: "AI UGC Production",
    description:
      "Realistic creator-style ads with believable talent, natural delivery and native pacing — produced without casting, shipping or shoot days.",
    imageUrl: "",
  },
  {
    title: "AI Commercial Production",
    description:
      "Cinematic brand films and commercials, directed with the craft of a traditional production and delivered at the speed of an AI workflow.",
    imageUrl: "",
  },
  {
    title: "Performance Advertising",
    description:
      "Hook-first creative built for paid social. Structured for testing, iteration and the metrics your media team actually optimises against.",
    imageUrl: "",
  },
  {
    title: "Product Advertising",
    description:
      "Product-led commercials that show texture, detail and use in settings a studio shoot could never reach on the same timeline.",
    imageUrl: "",
  },
  {
    title: "Social Media Creatives",
    description:
      "Always-on content for Reels, TikTok and Shorts — on-brand, platform-native and delivered in the volume modern feeds demand.",
    imageUrl: "",
  },
  {
    title: "Creative Testing and Scaling",
    description:
      "Rapid variations of hooks, angles and formats, so winning concepts are found quickly and scaled into full creative systems.",
    imageUrl: "",
  },
];

/** Selected clients. Add `logoUrl` ("/media/logos/x.svg") to show a logo instead of type. */
export const clients: { name: string; logoUrl?: string }[] = [
  { name: "Rumik AI" },
  { name: "Phoenix Mall" },
  { name: "Pet Project" },
  { name: "Adukale" },
];

export const about = {
  headline: ["CREATIVE THINKING.", "AI-POWERED PRODUCTION."],
  body: "K12 Ad Labs combines creative direction, AI technology and advertising strategy to deliver premium advertising content at scale. We work as a production partner — from the first idea to the final cut — so brands can produce more, test more and move faster without lowering the bar.",
  pillars: [
    { title: "Creative storytelling", text: "Every ad starts with an idea worth watching, not a prompt." },
    { title: "AI-powered workflows", text: "Advanced production pipelines replace the slow parts of a shoot." },
    { title: "Production speed", text: "Concept to finished creative on timelines built for modern media." },
    { title: "Creative experimentation", text: "More angles, more formats, more chances to find what works." },
    { title: "Performance-driven content", text: "Made to be measured, iterated and scaled." },
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
