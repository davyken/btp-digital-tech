"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { company } from "@/lib/content";
import { useReveals } from "@/lib/motion";

export function CtaBand({ title = "Un projet en tête ?" }: { title?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);
  return (
    <section ref={root} className="relative bg-ink text-white">
      <div className="hazard h-4" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between">
        <h2 data-split className="font-narrow text-[clamp(2.4rem,6vw,4.5rem)] font-black uppercase leading-[0.9]">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3" data-reveal>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="lg-btn inline-flex h-14 items-center gap-2.5 rounded-full bg-yellow px-7 font-bold text-ink"
          >
            <WhatsappLogo size={20} weight="bold" /> WhatsApp
          </a>
          <Link href="/contact" className="lg lg-dark lg-btn inline-flex h-14 items-center gap-2 px-7 font-bold">
            Tous les contacts <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
