"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

import { INTRO_KEY as KEY } from "@/lib/intro";

const NAME = "BTP DIGITAL TECH";

/**
 * Opening sequence (once per browser session):
 * logo builds in → company name types itself → tagline + measuring line → curtain lifts.
 * Visibility is decided by an inline script before first paint (see introScript), so there is no flash.
 * Fires `intro:done` so the hero can start its own entrance afterwards.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || html.classList.contains("intro-skip")) return;

    const finish = () => {
      html.classList.remove("intro-running");
      html.classList.add("intro-skip");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.dispatchEvent(new Event("intro:done"));
    };

    const counter = { n: 0 };
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
    tl.from("[data-i-logo]", { scale: 0.4, rotate: -25, autoAlpha: 0, duration: 1 })
      .from("[data-i-ring]", { scale: 0.6, autoAlpha: 0, duration: 1.2 }, 0)
      .from("[data-i-px]", { scale: 0, rotate: 90, duration: 0.6, stagger: 0.07, ease: "back.out(2.4)" }, 0.35)
      .to(
        counter,
        {
          n: NAME.length,
          duration: 1.15,
          ease: `steps(${NAME.length})`,
          onUpdate: () => {
            if (typed.current) typed.current.textContent = NAME.slice(0, Math.round(counter.n));
          },
        },
        0.7,
      )
      .from("[data-i-tag]", { autoAlpha: 0, y: 12, duration: 0.7 }, "-=0.15")
      .from("[data-i-line]", { scaleX: 0, duration: 0.9, ease: "power2.inOut" }, "<")
      .to("[data-i-content]", { y: -40, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, "+=0.35")
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.25");

    const skip = () => tl.progress(1);
    el.addEventListener("click", skip);
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      el.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      tl.kill();
    };
  }, []);

  return (
    <div
      id="intro"
      ref={root}
      aria-hidden
      className="blueprint blueprint-dark grid cursor-pointer place-items-center bg-ink text-white"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-i-content className="flex flex-col items-center px-6 text-center">
        <div className="relative">
          <span data-i-ring className="absolute -inset-4 rounded-full border border-white/15" />
          <span data-i-logo className="relative block size-28 overflow-hidden rounded-full bg-white sm:size-32">
            <Image src="/media/logo.webp" alt="" fill sizes="128px" priority className="object-cover" />
          </span>
          <span data-i-px className="absolute -right-6 -top-3 size-5 bg-red" />
          <span data-i-px className="absolute -right-10 top-4 size-3 bg-red" />
          <span data-i-px className="absolute -bottom-2 -left-7 size-6 bg-yellow" />
          <span data-i-px className="absolute -left-11 bottom-5 size-3 bg-yellow" />
        </div>

        <p className="mt-10 flex h-[1.1em] items-center font-wide text-[clamp(1.6rem,6vw,3.2rem)] font-black uppercase leading-none tracking-tight">
          <span ref={typed} />
          <span className="intro-caret ml-1 inline-block h-[0.9em] w-[0.12em] bg-yellow" />
        </p>
        <span className="sr-only">{NAME}</span>

        <div className="mt-6 w-[min(80vw,420px)]">
          <div data-i-line className="dim origin-center text-white/60">
            <span data-i-tag className="text-yellow">Formation · Étude · Réalisation</span>
          </div>
        </div>
      </div>
      <p className="absolute bottom-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">Cliquer pour passer</p>
    </div>
  );
}
