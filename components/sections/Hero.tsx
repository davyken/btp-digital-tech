"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { company } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/motion";
import { heroBureauPhoto } from "@/lib/buildings";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-hero-title]", { type: "lines,chars", mask: "lines", linesClass: "split-line" });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.from(split.chars, { yPercent: 115, duration: 1.2, stagger: 0.018 })
          .from("[data-hero-sub]", { autoAlpha: 0, y: 24, duration: 1 }, "-=0.8")
          .from("[data-hero-cta] > *", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.9 }, "-=0.8")
          .from("[data-chip]", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 1 }, 0.9);

        // Guide lines stay hidden on arrival and draw across as soon as the visitor scrolls
        gsap.fromTo(
          "[data-grid-line]",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            ease: "none",
            stagger: 0.15,
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=320", scrub: 0.6 },
          },
        );

        // Wait for the opening animation (if it is playing) before the hero entrance
        const play = () => tl.play();
        if (document.documentElement.classList.contains("intro-running")) {
          window.addEventListener("intro:done", play, { once: true });
        } else play();

        // Background photo drifts slower than the page while leaving the hero
        gsap.to("[data-hero-bg]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          yPercent: -14,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => {
          window.removeEventListener("intro:done", play);
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[92svh] items-center overflow-hidden blueprint grain pt-24 lg:min-h-svh lg:pt-20"
      aria-labelledby="hero-title"
    >
      <HeroBackdrop image={heroBureauPhoto} side />

      {/* construction guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-grid-line className="absolute left-0 right-0 top-[38%] h-px bg-blue/20" />
        <div data-grid-line className="absolute left-0 right-0 top-[80%] h-px bg-blue/20" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-8 xl:px-8">
        {/* copy: sized against viewport height so both CTAs are visible without scrolling */}
        <div data-hero-copy className="relative z-10">
          <p className="dim mb-5 max-w-sm text-blue">
            <span>Formation · Étude · Réalisation</span>
          </p>
          <h1
            id="hero-title"
            data-hero-title
            className="font-narrow text-[clamp(2.9rem,min(8.6vw,12.5svh),7rem)] lg:text-[clamp(3rem,min(6.6vw,12.5svh),7rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]"
          >
            <span className="block whitespace-nowrap">On calcule.</span>
            <span className="block whitespace-nowrap">
              On <span className="text-blue">bâtit.</span>
            </span>
            <span className="block whitespace-nowrap">On livre.</span>
          </h1>
          <p data-hero-sub className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/75 lg:mt-6 lg:text-lg">
            Bureau d&apos;études, entreprise de construction et centre de formation à Douala. Du calcul de structure à
            la remise des clés, avec la même équipe.
          </p>
          {/* Mobile: both CTAs share one row (equal width, condensed type). sm+: natural width. */}
          <div data-hero-cta className="mt-7 flex items-center gap-2 sm:gap-3">
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="lg-btn inline-flex h-13 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-3 text-[13.5px] font-bold text-white shadow-[0_14px_30px_-12px_rgb(23_71_184/0.8)] max-sm:[font-variation-settings:'wdth'_82] sm:h-14 sm:flex-none sm:gap-2.5 sm:px-7 sm:text-base"
            >
              <WhatsappLogo weight="bold" className="size-4 shrink-0 text-yellow sm:size-5" />
              Parler de mon projet
            </a>
            <Link
              href="/realisations"
              className="lg lg-light lg-btn inline-flex h-13 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-3 text-[13.5px] font-bold max-sm:[font-variation-settings:'wdth'_82] sm:h-14 sm:flex-none sm:gap-2 sm:px-7 sm:text-base"
            >
              Voir les chantiers <ArrowRight weight="bold" className="size-4 shrink-0 sm:size-[18px]" />
            </Link>
          </div>
        </div>

        {/* key facts, bottom-right over the background photo */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-[22rem] lg:grid-cols-1">
          <div data-chip className="lg lg-dark lg-card px-5 py-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-yellow">Kotto · R+3</p>
            <p className="mt-0.5 text-sm font-bold sm:text-base">Livré en décembre 2025</p>
          </div>
          <div data-chip className="lg lg-light lg-card px-5 py-3.5">
            <p className="text-2xl font-black leading-none text-blue">6,8 K</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">abonnés suivent nos chantiers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
