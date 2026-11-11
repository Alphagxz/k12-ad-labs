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
  { name: "Cannazo" },
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

const PROCESS_TEMPLATE = [
  { title: "Brief & strategy", text: "TODO: how the brief, audience and angles were defined." },
  { title: "Creative development", text: "TODO: scripting, storyboards and look development." },
  { title: "AI production", text: "TODO: generation, direction and iteration workflow." },
  { title: "Edit & delivery", text: "TODO: edit, sound, grade and final formats delivered." },
];

/**
 * TODO: the copy below is PLACEHOLDER text awaiting real project
 * details. Nothing here is presented as a client result.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "rumik-ai",
    brand: "Rumik AI",
    category: "AI UGC Production",
    draft: true,
    introduction: "TODO: one or two sentences introducing Rumik AI and what they do.",
    objective: "TODO: what the campaign needed to achieve.",
    concept: "TODO: the creative idea behind the work.",
    process: PROCESS_TEMPLATE,
    projectId: "project-01",
    images: ["", "", ""],
    results: [],
  },
  {
    slug: "phoenix-mall",
    brand: "Phoenix Mall",
    category: "AI Commercial Production",
    draft: true,
    introduction: "TODO: one or two sentences introducing Phoenix Mall.",
    objective: "TODO: what the campaign needed to achieve.",
    concept: "TODO: the creative idea behind the work.",
    process: PROCESS_TEMPLATE,
    projectId: "project-02",
    images: ["", "", ""],
    results: [],
  },
  {
    slug: "pet-project",
    brand: "Pet Project",
    category: "Product Advertising",
    draft: true,
    introduction: "TODO: one or two sentences introducing Pet Project.",
    objective: "TODO: what the campaign needed to achieve.",
    concept: "TODO: the creative idea behind the work.",
    process: PROCESS_TEMPLATE,
    projectId: "project-03",
    images: ["", "", ""],
    results: [],
  },
];
