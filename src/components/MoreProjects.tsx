import { driveFolders } from "@/config/portfolio";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { ArrowIcon } from "./Icons";

export default function MoreProjects() {
  const all = driveFolders.allProjects.trim();
  return (
    <section id="more" className="shell py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-4">(04) — More projects</p>
          <Lines lines={["There's", "more."]} className="display display-lg" />
          <p data-reveal className="mt-8 max-w-sm text-lg leading-relaxed text-mute">
            The full archive — every campaign, cut and variation — lives in our portfolio library.
          </p>
          <div data-reveal className="mt-10">
            <Magnetic>
              <a
                href={all || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!all}
                className="btn btn-solid"
              >
                View all projects <ArrowIcon className="h-4 w-4" />
              </a>
            </Magnetic>
            {!all && <p className="label mt-4">Placeholder — add the Drive folder link in portfolio.ts</p>}
          </div>
        </div>

        <ul className="md:col-span-6 md:col-start-7">
          {driveFolders.brands.map((b, i) => {
            const url = b.url.trim();
            const Row = url ? "a" : "div";
            return (
              <li key={b.brand} data-reveal className="border-t border-line last:border-b">
                <Row
                  {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer", "data-cursor": "OPEN" } : {})}
                  className={`group flex items-center gap-6 py-6 transition-[padding] duration-500 ease-out ${url ? "hover:pl-4" : ""}`}
                >
                  <span className="label w-8">0{i + 1}</span>
                  <span className="display text-3xl md:text-5xl">{b.brand}</span>
                  <span className="label ml-auto hidden text-right sm:block">{url ? b.note : "Folder link pending"}</span>
                  <ArrowIcon className={`h-5 w-5 shrink-0 transition-transform duration-500 ${url ? "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" : "opacity-25"}`} />
                </Row>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
