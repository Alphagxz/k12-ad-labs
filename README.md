# K12 Ad Labs — Website

Premium, cinematic agency site for K12 Ad Labs.
**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Updating content (no component code needed)

Everything editable lives in `src/config/`:

| File | What it controls |
| --- | --- |
| `site.ts` | Headline, description, hero background video, showreel order, **email, enquiry link, form endpoint, social links**, navigation |
| `portfolio.ts` | **Featured videos** (title, brand, category, video URL, thumbnail) and **Google Drive folder links** (View All Projects + per-brand folders) |
| `content.ts` | Intro copy, services, client list, About, case studies |

Edit → commit → push. Vercel redeploys automatically in about a minute.

### Adding a portfolio video

1. In Google Drive, share the **video file**: *General access → Anyone with the link → Viewer*.
2. Paste the link as `videoUrl` in `portfolio.ts`. Any Drive file link format works. Direct `.mp4` URLs, YouTube and Vimeo also work.
3. Thumbnail: put an image in `public/media/` and set `thumbnailUrl: "/media/your-file.jpg"`. If left empty, Drive videos use Drive's automatic thumbnail.

Notes:
- A Drive **folder** link is not a video link — folder links go in `driveFolders`.
- Drive videos play inside Google's embedded player (its own play/volume controls). Direct `.mp4` files get the site's custom play/pause and mute controls. For the showreel, direct files hosted on a CDN give the most polished result.
- Videos load only when a visitor presses play, so the page stays fast and no video files live in this repo.
- The hero background needs a direct video file (`site.hero.videoUrl`); Drive cannot autoplay as a background. Until then a generated light backdrop is shown.

### Placeholders

Anything not yet supplied renders as a clearly labelled placeholder frame ("… placeholder · replace in config") or a "pending" note. Search the config files for `TODO` to see everything outstanding. Case study fields left empty are hidden; ones marked `draft: true` show a "Draft — content pending" tag and are hidden from search engines.

### Contact form

Set `contact.formEndpoint` in `site.ts` to a [Formspree](https://formspree.io) form URL (free tier is fine) and submissions arrive in your inbox. Without it, the form opens the visitor's email app addressed to `contact.email`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new>, import the repository, keep the defaults (framework: Next.js) and click **Deploy**.
3. To reuse the old address, open the Vercel project → Settings → Domains and add `k12-ad-labs.vercel.app` (or your custom domain), then update `site.url` in `src/config/site.ts`.

No environment variables are required.

## Accessibility & performance

- Honors `prefers-reduced-motion`: smooth scroll, pinning and reveals are disabled and content is shown statically.
- Custom cursor and magnetic buttons only on mouse devices.
- All pages are statically generated.
