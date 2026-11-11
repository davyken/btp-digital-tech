"use client";

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { tipCategories, tips, type TipCategory } from "@/lib/content";
import { VideoCard } from "@/components/video/VideoCard";
import { gsap, ScrollTrigger, useGSAP, useReveals } from "@/lib/motion";

export function TipsLibrary() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const [filter, setFilter] = useState<TipCategory | "Tout">("Tout");
  useReveals(root);

  const list = useMemo(() => (filter === "Tout" ? tips : tips.filter((t) => t.category === filter)), [filter]);

  // Animate cards in whenever the filter changes
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-tip]",
        { autoAlpha: 0, y: 30, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", stagger: 0.035, overwrite: true },
      );
      ScrollTrigger.refresh();
    },
    { scope: grid, dependencies: [filter] },
  );

  const counts = useMemo(
    () => Object.fromEntries(tipCategories.map((c) => [c, tips.filter((t) => t.category === c).length])),
    [],
  );

  return (
    <section ref={root} className="relative bg-concrete pb-24 pt-4" aria-label="Vidéos de conseils">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          role="toolbar"
          aria-label="Filtrer par thème"
          className="lg lg-light sticky top-24 z-30 scroll-thin flex max-w-full gap-1 overflow-x-auto p-1.5 sm:inline-flex"
          data-reveal
        >
          {(["Tout", ...tipCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={clsx(
                "shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-300",
                filter === c ? "bg-ink text-white" : "text-ink/70 hover:bg-white/70 hover:text-ink",
              )}
            >
              {c}
              <span className={clsx("ml-1.5 font-mono text-[11px]", filter === c ? "text-yellow" : "text-ink/40")}>
                {c === "Tout" ? tips.length : counts[c]}
              </span>
            </button>
          ))}
        </div>

        <ul ref={grid} className="mt-12 grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {list.map((t) => (
            <li key={t.id} data-tip>
              <VideoCard video={t} index={tips.indexOf(t)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
