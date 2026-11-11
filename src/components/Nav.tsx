"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, socials, contact } from "@/config/site";
import { gsap, ScrollTrigger, scroll, useGSAP } from "@/lib/gsap";
import Magnetic from "./Magnetic";

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Hide on scroll down, return on scroll up.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 200;
        gsap.to(bar.current, { yPercent: hide ? -140 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
      },
    });
    return () => st.kill();
  }, [pathname]);

  useGSAP(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll(".menu-item"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.3 });
      gsap.fromTo(el.querySelectorAll(".menu-meta"), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.7 });
    } else {
      gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "expo.inOut", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  useEffect(() => {
    if (open) scroll.lenis?.stop();
    else scroll.lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const visibleSocials = socials.filter((s) => s.url);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-3 z-[70] px-3 md:top-4 md:px-6">
        <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 md:h-16 md:pl-7 md:pr-2.5">
          <Link href="/" className="display text-lg tracking-tight" aria-label="K12 Ad Labs — home" onClick={() => setOpen(false)}>
            K12<span className="text-accent">.</span> Ad Labs
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.slice(0, 4).map((n) => (
              <Link key={n.href} href={n.href} className="ulink text-sm font-medium text-bone/80 hover:text-bone">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <Link href="/#contact" className="btn btn-solid !h-10 !px-5 md:!h-11">Start a project</Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bone lg:hidden"
            >
              <span className={`absolute h-px w-4 bg-white transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4 bg-white transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div ref={menu} id="site-menu" data-lenis-prevent className="shell fixed inset-0 z-[65] hidden flex-col justify-between bg-ink/80 pb-8 pt-28 backdrop-blur-2xl" style={{ clipPath: "inset(0 0 100% 0)" }}>
        <nav aria-label="Menu">
          {nav.map((n, i) => (
            <div key={n.href} className="overflow-hidden border-b border-line">
              <Link href={n.href} onClick={() => setOpen(false)} className="menu-item display flex items-baseline justify-between py-3 text-[clamp(2.4rem,10vw,4.5rem)]">
                {n.label}
                <span className="label">0{i + 1}</span>
              </Link>
            </div>
          ))}
        </nav>
        <div className="menu-meta flex flex-wrap items-end justify-between gap-4">
          {contact.email ? <a href={`mailto:${contact.email}`} className="text-base">{contact.email}</a> : <span />}
          <ul className="flex gap-5">
            {visibleSocials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="label !text-bone">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
