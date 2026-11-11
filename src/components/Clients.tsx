import Image from "next/image";
import { clients } from "@/config/content";

export default function Clients() {
  return (
    <section id="clients" className="shell border-t border-line py-28 md:py-40">
      <p className="label mb-10">(06) — Selected clients</p>
      <ul className="group/list flex flex-wrap items-baseline gap-x-[0.35em] gap-y-2 display display-lg">
        {clients.map((c, i) => (
          <li key={c.name} data-reveal className="flex items-baseline gap-x-[0.35em]">
            <span className="transition-[color,opacity] duration-500 hover:!text-accent hover:!opacity-100 group-hover/list:opacity-30">
              {c.logoUrl ? (
                <Image src={c.logoUrl} alt={c.name} width={320} height={120} className="inline-block h-[0.8em] w-auto" />
              ) : (
                c.name
              )}
            </span>
            {i < clients.length - 1 && <span className="font-serif italic normal-case text-mute" aria-hidden>/</span>}
          </li>
        ))}
      </ul>
      <p data-reveal className="mt-12 max-w-md text-lg leading-relaxed text-mute">
        Brands across technology, retail, pet care and food trust K12 to produce their advertising.
      </p>
    </section>
  );
}
