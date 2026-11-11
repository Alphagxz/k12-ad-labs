"use client";

import { useState } from "react";
import { contact, socials } from "@/config/site";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { ArrowIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const visibleSocials = socials.filter((s) => s.url);
  const enquiryHref = contact.enquiryUrl || (contact.email ? `mailto:${contact.email}?subject=Project%20enquiry` : "#enquiry-form");
  const external = !!contact.enquiryUrl;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data._gotcha) return; // honeypot

    if (contact.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    if (contact.email) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\n\n${data.message}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry — ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }
    setStatus("unconfigured");
  }

  const field = "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg text-bone outline-none transition-colors placeholder:text-transparent focus:border-bone";
  const lab = "label pointer-events-none absolute left-0 top-0";

  return (
    <section id="contact" className="shell relative overflow-hidden border-t border-line pb-20 pt-28 md:pt-40">
      <p className="label mb-6">(09) — Contact</p>
      <Lines lines={["Have a project", "in mind?"]} className="display display-xl" />

      <div className="mt-10 md:mt-14">
        <Magnetic strength={0.15}>
          <a
            href={enquiryHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            data-cursor="GO"
            className="group inline-flex items-center gap-4 font-serif text-[clamp(2rem,6vw,5.5rem)] italic leading-none text-accent"
          >
            <span className="ulink">Let&apos;s create something.</span>
            <ArrowIcon className="h-[0.6em] w-[0.6em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </a>
        </Magnetic>
      </div>

      <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
        <div className="space-y-10 md:col-span-4">
          <div data-reveal>
            <p className="label mb-3">Email</p>
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="ulink text-2xl">{contact.email}</a>
            ) : (
              <p className="label !text-bone/60">Placeholder — add business email in site.ts</p>
            )}
          </div>
          <div data-reveal>
            <p className="label mb-3">Project enquiries</p>
            <a href={enquiryHref} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="ulink text-2xl">
              Start a project
            </a>
          </div>
          <div data-reveal>
            <p className="label mb-3">Social</p>
            {visibleSocials.length ? (
              <ul className="space-y-1">
                {visibleSocials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="ulink text-2xl">{s.label}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="label !text-bone/60">Placeholder — add social links in site.ts</p>
            )}
          </div>
        </div>

        <form id="enquiry-form" onSubmit={submit} className="scroll-mt-28 md:col-span-7 md:col-start-6" data-reveal>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            <label className="relative block">
              <input name="name" required autoComplete="name" placeholder="Name" className={field} />
              <span className={lab}>Name *</span>
            </label>
            <label className="relative block">
              <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
              <span className={lab}>Email *</span>
            </label>
            <label className="relative block sm:col-span-2">
              <input name="company" autoComplete="organization" placeholder="Company" className={field} />
              <span className={lab}>Company / brand</span>
            </label>
            <label className="relative block sm:col-span-2">
              <textarea name="message" required rows={4} placeholder="Project" className={`${field} resize-none`} />
              <span className={lab}>Tell us about the project *</span>
            </label>
            <input name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic>
              <button type="submit" disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowIcon className="h-4 w-4" />
              </button>
            </Magnetic>
            <p className="text-sm text-mute" role="status" aria-live="polite">
              {status === "sent" && "Thank you — we'll be in touch shortly."}
              {status === "error" && "Something went wrong. Please email us directly."}
              {status === "unconfigured" && "Form not connected yet — add formEndpoint or email in site.ts."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
