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
      <Lines lines={["Inside", "the work."]} className="display display-lg" />

      <div className="mt-16 space-y-20 md:mt-28 md:space-y-36">
        {caseStudies.map((c, i) => {
          const pIndex = featuredProjects.findIndex((p) => p.id === c.projectId);
          const p = featuredProjects[pIndex];
          const flip = i % 2 === 1;
          return (
            <Link key={c.slug} href={`/work/${c.slug}`} data-cursor="VIEW" className="group grid items-end gap-8 md:grid-cols-12">
              <div className={`overflow-hidden rounded-md md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <div data-parallax="0.08" className="absolute -inset-y-[10%] inset-x-0">
                    <Media
                      src={c.images[0] || (p ? resolveThumbnail(p.thumbnailUrl, p.videoUrl) : "")}
                      alt={`${c.brand} case study`}
                      index={i + 4}
                      note="Case study image placeholder"
                      className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(min-width: 768px) 60vw, 92vw"
                    />
                  </div>
                </div>
              </div>
              <div data-reveal className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                <p className="label">Case 0{i + 1} — {c.category}</p>
                <h3 className="display display-md mt-4 transition-colors duration-500 group-hover:text-accent">{c.brand}</h3>
                <p className="mt-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em]">
                  View case study
                  <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
