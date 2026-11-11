import { driveFolders } from "@/config/portfolio";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { ArrowIcon } from "./Icons";

export default function MoreProjects() {
  const all = driveFolders.allProjects.trim();
  const rows = driveFolders.folders.filter((f) => f.url.trim());
  return (
    <section id="more" className="shell py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-4">(04) — More projects</p>
          <Lines lines={["There's", "plenty *more.*"]} className="display display-lg" />
          <p data-reveal className="mt-8 max-w-sm text-lg leading-relaxed text-mute">
            The full archive — campaign films, product shoots, AI productions and every variation — lives in our portfolio library.
          </p>
          {all && (
            <div data-reveal className="mt-10">
              <Magnetic>
                <a href={all} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  View all projects <ArrowIcon className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          )}
        </div>

        <ul data-reveal className="glass rounded-3xl px-5 md:col-span-6 md:col-start-7 md:px-8">
          {rows.map((b, i) => (
            <li key={b.label} className="border-b border-line last:border-b-0">
              <a href={b.url} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="group flex items-center gap-5 py-6 transition-[padding] duration-500 ease-out hover:pl-3">
                <span className="label w-7">0{i + 1}</span>
                <span className="display text-2xl md:text-4xl">{b.label}</span>
                <span className="label ml-auto hidden text-right sm:block">{b.note}</span>
                <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
