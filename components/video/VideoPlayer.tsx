"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { Video } from "@/lib/content";

type Ctx = { open: (v: Video) => void };
const VideoCtx = createContext<Ctx>({ open: () => {} });
export const useVideo = () => useContext(VideoCtx);

/** Facebook's official embeddable player. Only loaded after an explicit click (facade pattern). */
const embedSrc = (v: Video) =>
  `https://www.facebook.com/plugins/video.php?${new URLSearchParams({
    href: `https://www.facebook.com/Btpdigitaltech/videos/${v.id}/`,
    show_text: "false",
    autoplay: "true",
    width: "560",
  })}`;

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Video | null>(null);
  const lenis = useLenis();

  const open = useCallback((v: Video) => {
    setCurrent(v);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      setCurrent(null);
      lenis?.start();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [lenis]);

  useEffect(() => {
    if (current) lenis?.stop();
  }, [current, lenis]);

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label={current?.title ?? "Vidéo"}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(92vw,420px)] overflow-visible bg-transparent p-0 text-white backdrop:bg-ink/70 backdrop:backdrop-blur-md open:animate-[dialog-in_.5s_cubic-bezier(.16,1,.3,1)]"
      >
        {current && (
          <div className="relative">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-yellow">{current.tag}</p>
                <h2 className="mt-1 text-lg font-semibold leading-tight">{current.title}</h2>
              </div>
              <button
                onClick={close}
                className="lg lg-dark lg-btn grid size-11 shrink-0 place-items-center"
                aria-label="Fermer la vidéo"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="relative aspect-[9/16] max-h-[72vh] w-full overflow-hidden rounded-[22px] bg-ink-2">
              <div className="absolute inset-0 grid place-items-center font-mono text-xs text-white/50">Chargement…</div>
              <iframe
                key={current.id}
                src={embedSrc(current)}
                title={current.title}
                className="absolute inset-0 size-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-white/80 underline-offset-4 hover:text-yellow hover:underline"
            >
              Ouvrir sur Facebook <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        )}
      </dialog>
    </VideoCtx.Provider>
  );
}
