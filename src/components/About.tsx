import { about } from "@/config/content";
import Lines from "./Lines";

export default function About() {
  return (
    <section id="about" className="shell border-t border-line py-28 md:py-40">
      <p className="label mb-6">(08) — About</p>
      <Lines lines={about.headline} className="display display-lg" />
      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
        <p data-reveal className="font-serif text-3xl italic leading-tight md:col-span-4 md:text-4xl">
          A production partner, not a tool.
        </p>
        <p data-reveal className="text-xl leading-relaxed text-mute md:col-span-7 md:col-start-6 md:text-2xl">{about.body}</p>
      </div>
      <ol className="mt-20 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
        {about.pillars.map((p, i) => (
          <li key={p.title} data-reveal className="border-t border-line py-7">
            <span className="label !text-accent">0{i + 1}</span>
            <h3 className="mt-8 text-xl font-medium leading-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
