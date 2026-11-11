"use client";

import Link from "next/link";
import { useRef } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { BtpIcon } from "@/components/icons/BtpIcon";
import type { IconName } from "@/lib/content";
import type { BuildingPhoto } from "@/lib/buildings";
import { useReveals } from "@/lib/motion";
import { HeroBackdrop } from "./HeroBackdrop";

type Props = {
  kicker: string;
  title: React.ReactNode;
  lead: string;
  icon: IconName;
  crumb: string;
  image: BuildingPhoto;
};

/** Shared full-screen header for inner pages: building photo background, breadcrumb, split-line title, lead, big brand icon. */
export function PageHero({ kicker, title, lead, icon, crumb, image }: Props) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  // Fills the first screen, like the home hero, so the next section only appears once the visitor scrolls
  return (
    <section ref={root} className="relative flex min-h-svh items-center overflow-hidden bg-concrete pb-16 pt-36 sm:pb-20 sm:pt-44">
      <HeroBackdrop image={image} />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <nav aria-label="Fil d'Ariane" data-reveal>
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
              <li>
                <Link href="/" className="hover:text-blue">Accueil</Link>
              </li>
              <li aria-hidden><CaretRight size={10} weight="bold" /></li>
              <li aria-current="page" className="text-blue">{crumb}</li>
            </ol>
          </nav>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-blue" data-reveal>
            {kicker}
          </p>
          <h1 data-split className="mt-3 font-narrow text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[0.86]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80" data-reveal>
            {lead}
          </p>
        </div>
        <div data-reveal className="lg lg-light lg-card grid size-56 place-items-center max-md:hidden">
          <BtpIcon name={icon} size={150} accent="red" className="text-blue" />
        </div>
      </div>
    </section>
  );
}
