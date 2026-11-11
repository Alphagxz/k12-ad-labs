import Image from "next/image";
import { clients } from "@/config/content";
import Lines from "./Lines";

export default function Clients() {
  return (
    <section id="clients" className="shell py-28 md:py-40">
      <p className="label mb-4">(06) — Selected clients</p>
      <Lines lines={["Brands we've", "*produced* for."]} className="display display-lg" />
      <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
        {clients.map((c) => (
          <li
            key={c.name}
            data-reveal
            className="glass group flex aspect-[5/3] items-center justify-center rounded-3xl p-5 text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
          >
            {c.logoUrl ? (
              <Image src={c.logoUrl} alt={c.name} width={320} height={120} className="h-10 w-auto object-contain" />
            ) : (
              <span className="display text-[clamp(1.25rem,2.3vw,2.2rem)] transition-colors duration-500 group-hover:text-accent">{c.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
