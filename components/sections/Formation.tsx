"use client";

import { useRef } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { company } from "@/lib/content";
import { BtpIcon } from "@/components/icons/BtpIcon";
import { gsap, useGSAP, useReveals } from "@/lib/motion";

const software = ["AutoCAD", "Revit", "Robot Structural", "ArchiCAD", "SketchUp", "Covadis"];

export function Formation() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-soft]", {
          autoAlpha: 0,
          scale: 0.6,
          rotate: () => gsap.utils.random(-14, 14),
          stagger: 0.06,
          duration: 0.9,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: "[data-softs]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="formation" className="relative overflow-hidden bg-blue text-white" aria-labelledby="formation-title">
      <div className="blueprint blueprint-dark absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-yellow" data-reveal>
            Service 01 · Formation
          </p>
          <h2 id="formation-title" data-split className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9]">
            Le logiciel ne remplace pas l&apos;ingénieur.
            <span className="text-yellow"> Il le rend redoutable.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/80" data-reveal>
            Formations pratiques sur des projets réels du cabinet, en présentiel à Douala. Petits groupes, attestation de fin de formation.
          </p>
          <a
            data-reveal
            href={`${company.whatsapp}?text=${encodeURIComponent("Bonjour, je souhaite des informations sur vos formations.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lg-btn mt-9 inline-flex h-14 items-center gap-2.5 rounded-full bg-yellow px-7 font-bold text-ink"
          >
            <WhatsappLogo size={20} weight="bold" /> Prochaine session
          </a>
        </div>

        <div data-softs className="relative flex flex-wrap content-center gap-3 lg:justify-end">
          <BtpIcon name="screen" size={120} accent="red" className="absolute -top-20 right-0 text-white/90 max-lg:hidden" />
          {software.map((s) => (
            <span key={s} data-soft className="lg lg-dark px-6 py-4 text-xl font-extrabold uppercase tracking-tight">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
