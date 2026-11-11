/**
 * ─────────────────────────────────────────────────────────────
 *  K12 AD LABS — SITE CONFIGURATION
 *  Brand copy, contact details, social links, hero.
 *  Edit this file, commit, push → Vercel redeploys automatically.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "K12 Ad Labs",
  url: "https://k12-ad-labs.vercel.app", // update if you use a custom domain
  /** Hero headline, one entry per line. Wrap a word in *asterisks* for the serif accent. */
  headline: ["We make brands", "worth *watching.*"],
  eyebrow: "Creative production studio",
  subheadline:
    "Brand films, commercials, social content and AI-powered advertising — produced end to end, from the first idea to the final cut.",
  description:
    "K12 Ad Labs is a creative production studio making brand films, commercials, product films, social content and AI-powered advertising for modern brands.",

  /** Headline figure. Counts up from 0 each time it scrolls into view. */
  stats: [{ value: "300+", label: "Ads produced" }],

  hero: {
    /**
     * Optional background video for the hero. Must be a DIRECT video
     * file ("/media/hero.mp4" in /public or a CDN .mp4/.webm URL).
     * Leave "" to use the built-in animated backdrop.
     */
    videoUrl: "",
    posterUrl: "",
    /** Project ids (portfolio.ts) shown as the floating cards in the hero. */
    cardProjectIds: ["soch", "pet-project", "trunativ"],
  },
} as const;

export const contact = {
  email: "garciaalpha007@gmail.com",
  /** "Start a project" link — currently WhatsApp. Any URL works (Calendly, Typeform…). */
  enquiryUrl:
    "https://wa.me/919074512437?text=Hi%20K12%20Ad%20Labs%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  enquiryLabel: "WhatsApp",
  /**
   * Contact form endpoint (JSON POST). Uses FormSubmit, which emails
   * each enquiry to the address in the URL. Swap for Formspree or any
   * other endpoint if preferred.
   */
  formEndpoint: "https://formsubmit.co/ajax/garciaalpha007@gmail.com",
};

/** Social links. Empty entries are hidden. */
export const socials: { label: string; url: string }[] = [
  { label: "Instagram", url: "https://www.instagram.com/gokulgxz/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/gokul-das-k-m-728795348/" },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Clients", href: "/#clients" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
