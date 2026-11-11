import Link from "next/link";
import { nav, site, socials } from "@/config/site";

export default function Footer() {
  const visible = socials.filter((s) => s.url);
  return (
    <footer className="shell border-t border-line py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="label">© {new Date().getFullYear()} {site.name}. Creative production studio.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="ulink label !text-bone">{n.label}</Link>
            </li>
          ))}
          {visible.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="ulink label !text-bone">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
