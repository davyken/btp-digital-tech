"use client";

import Image from "next/image";
import clsx from "clsx";
import { Play, ArrowUpRight } from "@phosphor-icons/react";
import { useVideo } from "./VideoPlayer";
import { BtpIcon } from "@/components/icons/BtpIcon";
import type { Tip, Video } from "@/lib/content";

const tipTone: Record<string, string> = {
  Structure: "bg-blue text-white",
  Béton: "bg-concrete-2 text-ink",
  Permis: "bg-ink text-white",
  Finitions: "bg-yellow text-ink",
  Réseaux: "bg-blue-deep text-white",
  Chantier: "bg-red text-white",
};

/** Card with a poster (real frame or typographic) and a glass play button. Iframe loads only on click. */
export function VideoCard({
  video,
  index,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 85vw",
}: {
  video: Video | Tip;
  index?: number;
  className?: string;
  sizes?: string;
}) {
  const { open } = useVideo();
  const isTip = "category" in video;
  const cover = isTip ? (video as Tip).cover : undefined;

  return (
    <article className={clsx("group relative", className)} data-card>
      <button
        type="button"
        onClick={() => open(video)}
        className="relative block aspect-[3/4] w-full overflow-hidden rounded-[22px] text-left"
        aria-label={`Lire la vidéo : ${video.title}`}
      >
        {video.poster ? (
          <>
            <Image
              src={video.poster}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          </>
        ) : (
          <div
            className={clsx(
              "absolute inset-0",
              cover ? "bg-ink text-white" : ["blueprint grain", isTip && tipTone[(video as Tip).category]],
            )}
          >
            {cover && (
              <>
                <Image
                  src={cover}
                  alt=""
                  fill
                  sizes={sizes}
                  quality={70}
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
              </>
            )}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className={cover ? "text-white/85" : "opacity-80"}>
                  Conseil {index !== undefined ? String(index + 1).padStart(2, "0") : ""}
                </span>
                <span className={cover ? clsx("rounded-full px-2.5 py-1", tipTone[(video as Tip).category]) : "opacity-80"}>
                  {(video as Tip).category}
                </span>
              </div>
              {isTip && (
                <BtpIcon
                  name={(video as Tip).icon}
                  size={64}
                  accent={(video as Tip).category === "Finitions" ? "red" : "yellow"}
                  className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110"
                />
              )}
              <p className="pr-14 font-narrow text-[1.65rem] font-extrabold uppercase leading-[0.95] tracking-tight text-balance">
                {video.title}
              </p>
            </div>
          </div>
        )}

        {video.poster && (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-yellow">
              {video.tag}
              {video.place ? <span className="text-white/70"> · {video.place}</span> : null}
            </p>
            <p className="mt-1 text-xl font-bold leading-tight">{video.title}</p>
          </div>
        )}

        <span
          className={clsx(
            "lg lg-btn absolute grid size-14 place-items-center",
            video.poster ? "right-4 top-4 lg-dark" : cover ? "bottom-4 right-4 lg-dark" : "bottom-4 right-4 lg-light text-ink",
          )}
        >
          <Play size={20} weight="fill" />
        </span>
      </button>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60 hover:opacity-100"
      >
        Voir sur Facebook <ArrowUpRight size={12} weight="bold" />
      </a>
    </article>
  );
}
