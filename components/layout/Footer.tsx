import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-6xl border-t border-white/10 px-4 pb-10 pt-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="relative h-16 w-[77px] shrink-0">
              <Image src="/media/logo-transparent.webp" alt="" fill sizes="77px" className="object-contain" />
            </span>
            <div>
              <p className="font-extrabold uppercase">{company.legal}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">{company.tagline}</p>
            </div>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-yellow">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p
          aria-hidden
          className="pointer-events-none mt-16 select-none whitespace-nowrap font-narrow text-[17.5vw] font-black uppercase leading-[0.75] text-white/[0.05] md:text-[12.5vw]"
        >
          BTP Digital
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
          © {new Date().getFullYear()} {company.legal} · {company.city}
        </p>
      </div>
    </footer>
  );
}
