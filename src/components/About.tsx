import { about } from "@/config/content";
import Lines from "./Lines";

export default function About() {
  return (
    <section id="about" className="shell py-28 md:py-40">
      <p className="label mb-6">(07) — About</p>
      <Lines lines={about.headline} className="display display-lg" />
      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
        <p data-reveal className="font-serif text-3xl italic leading-tight text-accent md:col-span-4 md:text-4xl">{about.aside}</p>
        <p data-reveal className="text-xl leading-relaxed text-mute md:col-span-7 md:col-start-6 md:text-2xl">{about.body}</p>
      </div>
      <ol className="mt-16 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-5">
        {about.pillars.map((p, i) => (
          <li key={p.title} data-reveal className="glass rounded-3xl p-6">
            <span className="label !text-accent">0{i + 1}</span>
            <h3 className="mt-10 text-lg font-semibold leading-tight tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
