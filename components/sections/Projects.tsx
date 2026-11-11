"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { projects } from "@/lib/content";
import { VideoCard } from "@/components/video/VideoCard";
import { gsap, useGSAP, useReveals } from "@/lib/motion";

export function Projects({ more = false }: { more?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // staggered columns drift at different speeds
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((c, i) => {
          gsap.to(c, {
            yPercent: i % 2 ? -8 : 4,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="realisations" className="relative overflow-hidden bg-concrete py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue" data-reveal>
              Réalisations
            </p>
            <h2 id="projects-title" data-split className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9]">
              Le chantier
              <br />
              parle de lui-même
            </h2>
          </div>
          <p className="max-w-sm text-ink/70" data-reveal>
            Des vidéos tournées sur nos chantiers à Douala et Edéa. Appuyez sur lecture : elles se chargent ici, sans quitter le site.
            {more && (
              <Link href="/realisations" className="mt-5 flex w-fit items-center gap-2 font-bold text-blue hover:underline">
                Toutes les réalisations <ArrowRight size={16} weight="bold" />
              </Link>
            )}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div data-col className="space-y-5">
            <div data-reveal>
              <VideoCard video={projects[0]} />
            </div>
            <div data-reveal>
              <VideoCard video={projects[3]} />
            </div>
          </div>
          <div data-col className="space-y-5 sm:pt-24">
            <div data-reveal>
              <VideoCard video={projects[1]} />
            </div>
            <div data-reveal>
              <VideoCard video={projects[4]} />
            </div>
          </div>
          <div data-col className="space-y-5 lg:pt-10">
            <div data-reveal>
              <VideoCard video={projects[2]} />
            </div>
            <div data-reveal className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[22px] bg-blue p-7 text-white">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-yellow">Partenaire</span>
              <div>
                <p className="font-narrow text-4xl font-black uppercase leading-[0.9]">Laroche Construction</p>
                <p className="mt-4 text-white/75">
                  Merci pour le professionnalisme et la « touche particulière » sur la livraison du R+3 de Kotto.
                </p>
              </div>
              <span aria-hidden className="absolute -right-6 -top-6 size-24 rotate-12 bg-red" />
              <span aria-hidden className="absolute right-16 top-10 size-8 bg-yellow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
