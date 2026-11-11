"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { WhatsappLogo, List, X } from "@phosphor-icons/react";
import { company, nav } from "@/lib/content";


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    // The bar stays fixed and visible in both scroll directions; it only turns into a glass pill once scrolled.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6",
      )}
    >
      <div
        className={clsx(
          "lg lg-light lg-morph mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4",
          // At the very top the bar is fully transparent; the glass pill forms as soon as the page scrolls.
          scrolled || menu ? "px-2.5" : "lg-off px-0",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-full pr-3" aria-label="BTP Digital Tech, accueil">
          {/* transparent logo (the white version stays as favicon) */}
          <span className="relative h-12 w-[58px] shrink-0">
            <Image src="/media/logo-transparent.webp" alt="" fill sizes="58px" className="object-contain" priority />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-[15px] font-extrabold uppercase tracking-tight text-blue">BTP Digital Tech</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">Douala · SARL</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={clsx(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:px-4",
                    isActive(n.href) ? "bg-ink text-white" : "text-ink/80 hover:bg-white/50 hover:text-ink",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="lg-btn inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white"
          >
            <WhatsappLogo size={18} weight="bold" className="text-yellow" />
            <span className="hidden sm:inline">Devis WhatsApp</span>
            <span className="sm:hidden">Devis</span>
          </a>
          <button
            className="lg lg-light lg-btn grid size-12 place-items-center lg:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menu ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          "lg lg-light lg-card mx-auto mt-3 max-w-[88rem] origin-top p-3 transition-all duration-500 ease-[var(--ease-out-expo)] lg:hidden",
          menu ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <ul>
          {nav.map((n, i) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={clsx(isActive(n.href) && "text-blue", "flex items-baseline gap-3 rounded-2xl px-4 py-3 text-2xl font-extrabold uppercase tracking-tight hover:bg-white/60")}
              >
                <span className="font-mono text-xs text-blue">0{i + 1}</span>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
