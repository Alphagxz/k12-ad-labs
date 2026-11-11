/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — SITE CONFIGURATION
 *  Brand copy, contact details, social links, hero + showreel.
 *  Edit this file, commit, push → Vercel redeploys automatically.
 *
 *  Anything left as an empty string "" is treated as "not supplied
 *  yet": the site hides it or shows a clearly marked placeholder.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "K12 Ad Labs",
  url: "https://k12-ad-labs.vercel.app", // TODO: update if you use a custom domain
  headline: ["AI ADS THAT", "DON'T LOOK LIKE AI."],
  subheadline: "Premium AI Advertising for Modern Brands.",
  description:
    "K12 Ad Labs is an AI-first creative production agency producing premium AI advertisements, realistic AI UGC, product commercials, social creatives and performance advertising for modern brands.",

  /** Figures carried over from the previous K12 Ad Labs website. */
  stats: [{ value: "50+", label: "Ads produced" }],

  hero: {
    /**
     * Background video for the hero. Must be a DIRECT video file
     * (e.g. "/media/hero.mp4" in /public, or a CDN .mp4/.webm URL).
     * Google Drive links cannot autoplay as a silent background.
     * Leave "" to use the built-in animated light backdrop.
     */
    videoUrl: "",
    posterUrl: "",
  },

  showreel: {
    /**
     * IDs of projects (from portfolio.ts) to play in the showreel
     * section, in order. Each video appears once.
     */
    projectIds: ["project-01", "project-02", "project-03", "project-04"],
  },
} as const;

export const contact = {
  /** TODO: replace with the real business email. */
  email: "",
  /**
   * Project enquiry link (Calendly, Typeform, Google Form, WhatsApp…).
   * Leave "" to make enquiry buttons scroll to the contact form.
   */
  enquiryUrl: "",
  /**
   * Contact form endpoint. Works out of the box with Formspree
   * (https://formspree.io → create a form → paste its URL here,
   * e.g. "https://formspree.io/f/abcdwxyz") or any endpoint that
   * accepts a JSON POST. Leave "" and the form opens the visitor's
   * email app addressed to `email` instead.
   */
  formEndpoint: "",
};

/** Social links. Empty entries are hidden. */
export const socials: { label: string; url: string }[] = [
  { label: "Instagram", url: "" },
  { label: "LinkedIn", url: "" },
  { label: "YouTube", url: "" },
  { label: "X / Twitter", url: "" },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
