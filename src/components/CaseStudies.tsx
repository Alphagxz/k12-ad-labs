import Link from "next/link";
import { caseStudies } from "@/config/content";
import { featuredProjects } from "@/config/portfolio";
import { resolveThumbnail } from "@/lib/video";
import Lines from "./Lines";
import Media from "./Media";
import { ArrowIcon } from "./Icons";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="shell py-28 md:py-40">
      <p className="label mb-4">(07) — Case studies</p>
      <Lines lines={["Inside", "the *work.*"]} className="display display-lg" />

      <div className="mt-14 grid gap-5 md:mt-24 md:grid-cols-2 md:gap-6">
        {caseStudies.map((c, i) => {
          const p = featuredProjects.find((x) => x.id === c.projectId);
          return (
            <Link key={c.slug} href={`/work/${c.slug}`} data-cursor="VIEW" data-reveal className={`glass group block rounded-[2rem] p-2.5 ${i % 2 ? "md:mt-20" : ""}`}>
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
                <div data-parallax="0.07" className="absolute -inset-y-[9%] inset-x-0">
                  <Media
                    src={c.images[0] || (p ? resolveThumbnail(p) : "")}
                    alt={`${c.brand} case study`}
                    title={c.brand}
                    subtitle={c.category}
                    index={i + 4}
                    className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(min-width: 768px) 46vw, 92vw"
                  />
                </div>
                <span className="glass-soft chip absolute left-4 top-4">Case 0{i + 1}</span>
              </div>
              <div className="flex items-end justify-between gap-6 px-4 pb-4 pt-6">
                <div>
                  <p className="label">{c.category}</p>
                  <h3 className="display mt-2 text-[clamp(1.8rem,3.2vw,3.2rem)] transition-colors duration-500 group-hover:text-accent">{c.brand}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">{c.objective}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone text-white transition-all duration-500 group-hover:bg-accent">
                  <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
