"use client";

import Image from "next/image";
import { useState } from "react";
import { clients } from "@/config/content";
import { ScrollTrigger } from "@/lib/gsap";
import Lines from "./Lines";

/** How many clients show before "View all". */
const VISIBLE = 6;

type Client = (typeof clients)[number];

function Tile({ c, reveal = false }: { c: Client; reveal?: boolean }) {
  return (
    <li
      {...(reveal ? { "data-reveal": "" } : {})}
      className="glass group flex aspect-[5/3] items-center justify-center rounded-3xl p-4 text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
    >
      {c.logoUrl ? (
        <Image src={c.logoUrl} alt={c.name} width={320} height={120} className="h-10 w-auto object-contain" />
      ) : (
        <span className="display text-[clamp(1.05rem,1.5vw,1.5rem)] leading-tight transition-colors duration-500 group-hover:text-accent">{c.name}</span>
      )}
    </li>
  );
}

const GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6";

export default function Clients() {
  const [open, setOpen] = useState(false);
  const first = clients.slice(0, VISIBLE);
  const rest = clients.slice(VISIBLE);

  return (
    <section id="clients" className="shell py-28 md:py-40">
      <p className="label mb-4">(06) — Selected clients</p>
      <Lines lines={["Brands we've", "*produced* for."]} className="display display-lg" />

      <ul className={`mt-14 md:mt-20 ${GRID}`}>
        {first.map((c) => (
          <Tile key={c.name} c={c} reveal />
        ))}
      </ul>

      {rest.length > 0 && (
        <>
          {/* Collapsible: animates between 0 and its natural height. */}
          <div
            id="more-clients"
            className="grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
            onTransitionEnd={(e) => e.propertyName === "grid-template-rows" && ScrollTrigger.refresh()}
          >
            <div className="-mx-6 overflow-hidden px-6" inert={!open}>
              <ul className={`pb-10 pt-3 ${GRID}`}>
                {rest.map((c) => (
                  <Tile key={c.name} c={c} />
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="more-clients" className="btn btn-ghost">
              {open ? "Show fewer" : `View all ${clients.length} clients`}
              <span className={`inline-block text-base leading-none transition-transform duration-500 ${open ? "rotate-45" : ""}`} aria-hidden>+</span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
