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
2. Add an entry to `featuredProjects` in `portfolio.ts` using `drive("FILE_ID")` (the ID is the long code in the file's share link). Direct `.mp4` URLs, YouTube and Vimeo also work.
3. Set `discipline` to `"AI"` or `"Film"`.

Notes:
- A Drive **folder** link is not a video link — folder links go in `driveFolders`.
- Drive videos play inside Google's embedded player. Direct `.mp4` files get the site's custom play/pause and mute controls.
- Videos load only when a visitor presses play, so the page stays fast and no video files live in this repo.

### Thumbnails

Before every build, `scripts/fetch-thumbs.mjs` saves a preview frame of each Drive video to `public/thumbs/<fileId>.jpg` and records its size, so thumbnails are real frames from the film, self-hosted, and each film is framed at its true aspect ratio.

- **Custom thumbnail:** commit your own `public/thumbs/<fileId>.jpg` (never overwritten), or set `thumbnailUrl` on the project.
- **No frame available:** the tile shows a designed poster card with the brand name instead, so nothing is ever empty.

### Design

The light glass theme lives in `src/app/globals.css` (colour tokens at the top, `.glass` panels, ambient colour). The hero headline is `site.headline` in `site.ts`; wrap a word in `*asterisks*` for the serif accent.

### Contact form

`contact.formEndpoint` in `site.ts` posts enquiries to FormSubmit, which emails them to the address in the URL. The first submission triggers a one-time activation email from FormSubmit — confirm it once. Any other JSON endpoint (e.g. Formspree) also works.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new>, import the repository, keep the defaults (framework: Next.js) and click **Deploy**.
3. To reuse the old address, open the Vercel project → Settings → Domains and add `k12-ad-labs.vercel.app` (or your custom domain), then update `site.url` in `src/config/site.ts`.

No environment variables are required.

## Accessibility & performance

- Honors `prefers-reduced-motion`: smooth scroll, pinning and reveals are disabled and content is shown statically.
- Custom cursor and magnetic buttons only on mouse devices.
- All pages are statically generated.
