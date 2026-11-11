import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/config/content";
import { featuredProjects } from "@/config/portfolio";
import { resolveThumbnail } from "@/lib/video";
import Lines from "@/components/Lines";
import Media from "@/components/Media";
import Player from "@/components/Player";
import { ArrowIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.brand} — ${c.category}`,
    description: `K12 Ad Labs case study: ${c.category} for ${c.brand}.`,
    alternates: { canonical: `/work/${c.slug}` },
    robots: c.draft ? { index: false } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  const c = caseStudies[i];
  if (!c) notFound();
  const pIndex = featuredProjects.findIndex((p) => p.id === c.projectId);
  const project = featuredProjects[pIndex];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const cover = c.images[0] || (project ? resolveThumbnail(project.thumbnailUrl, project.videoUrl) : "");

  const blocks = [
    { label: "The brand", text: c.introduction },
    { label: "Objective", text: c.objective },
    { label: "Creative concept", text: c.concept },
  ];

  return (
    <article>
      <header className="shell pb-12 pt-36 md:pt-48">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Link href="/#case-studies" className="ulink label !text-bone">← All case studies</Link>
          <span className="label">Case 0{i + 1} — {c.category}</span>
          {c.draft && <span className="label border border-accent/60 px-2 py-1 !text-accent">Draft — content pending</span>}
        </div>
        <Lines as="h1" lines={[c.brand]} className="display display-xl" />
      </header>

      <div className="relative h-[60svh] overflow-hidden md:h-[85svh]">
        <div data-parallax="0.1" className="absolute -inset-y-[12%] inset-x-0">
          <Media src={cover} alt={`${c.brand} — cover`} index={i + 4} note="Cover image placeholder" className="h-full w-full" sizes="100vw" priority />
        </div>
      </div>

      <section className="shell py-24 md:py-36">
        {blocks.map((b) => (
          <div key={b.label} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:py-14">
            <p className="label md:col-span-3">{b.label}</p>
            <p data-reveal className="text-2xl leading-snug md:col-span-8 md:text-4xl md:leading-tight">{b.text}</p>
          </div>
        ))}
      </section>

      <section className="shell border-t border-line py-24 md:py-36">
        <p className="label mb-4">Production process</p>
        <Lines lines={["How it", "was made."]} className="display display-lg" />
        <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.process.map((s, k) => (
            <li key={s.title} data-reveal className="border-t border-line py-7">
              <span className="label !text-accent">0{k + 1}</span>
              <h3 className="mt-8 text-xl font-medium">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {project && (
        <section className="bg-ash py-24 md:py-36">
          <div className="shell grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="label mb-4">Final film</p>
              <Lines lines={["The", "result."]} className="display display-lg" />
              <p data-reveal className="mt-8 text-mute">{project.brand} — {project.title}<br />{project.category}</p>
            </div>
            <div data-reveal className="flex justify-center md:col-span-6 md:col-start-7">
              <Player project={project} index={pIndex} className={(project.aspect ?? "9:16") === "16:9" ? "w-full" : "h-[78svh] max-w-full"} />
            </div>
          </div>
        </section>
      )}

      {c.images.length > 1 && (
        <section className="shell py-24 md:py-36">
          <p className="label mb-10">Supporting frames</p>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {c.images.slice(1).map((src, k) => (
              <div key={k} data-reveal className={k % 3 === 0 ? "md:col-span-7" : k % 3 === 1 ? "md:col-span-5 md:mt-24" : "md:col-span-12"}>
                <Media
                  src={src}
                  alt={`${c.brand} — frame ${k + 1}`}
                  index={i + k + 1}
                  note="Supporting image placeholder"
                  className={`rounded-md ${k % 3 === 2 ? "aspect-[21/9]" : "aspect-[4/5]"}`}
                  sizes="(min-width: 768px) 55vw, 92vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {c.results.length > 0 && (
        <section className="shell border-t border-line py-24 md:py-36">
          <p className="label mb-10">Results</p>
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.results.map((r) => (
              <div key={r.label} data-reveal>
                <dd className="display display-lg text-accent">{r.value}</dd>
                <dt className="label mt-3">{r.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      <Link href={`/work/${next.slug}`} data-cursor="NEXT" className="group shell block border-t border-line py-20 md:py-32">
        <p className="label mb-4">Next case study</p>
        <p className="display display-xl flex items-center gap-6 transition-colors duration-500 group-hover:text-accent">
          {next.brand}
          <ArrowIcon className="h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
        </p>
      </Link>
    </article>
  );
}
