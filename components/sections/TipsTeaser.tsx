"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { tips } from "@/lib/content";
import { VideoCard } from "@/components/video/VideoCard";
import { useReveals } from "@/lib/motion";

const picks = ["1892871408758337", "2613180562467875", "1094729406401186", "1701676264484751"];

export function TipsTeaser() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);
  const list = picks.map((id) => tips.find((t) => t.id === id)!);

  return (
    <section ref={root} className="relative bg-concrete-2 py-24 sm:py-32" aria-labelledby="tips-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue" data-reveal>
              Conseils de chantier
            </p>
            <h2 id="tips-title" data-split className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9]">
              Construire,
              <br />
              ça s&apos;apprend
            </h2>
          </div>
          <div data-reveal>
            <Link
              href="/conseils"
              className="lg lg-light lg-btn inline-flex h-14 items-center gap-2 px-7 font-bold"
            >
              Les {tips.length} conseils vidéo <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>

        <div className="-mx-4 mt-14 scroll-thin flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {list.map((t) => (
            <div key={t.id} data-reveal className="w-[78vw] shrink-0 snap-start sm:w-auto">
              <VideoCard video={t} index={tips.indexOf(t)} sizes="(min-width:1024px) 25vw, 80vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
