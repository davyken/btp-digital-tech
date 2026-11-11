"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { BtpIcon } from "@/components/icons/BtpIcon";
import { useReveals } from "@/lib/motion";

/** The 7 services as a plain grid: everything is visible on arrival, cards fade up as they enter the viewport. */
export function Services({ more = false }: { more?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="services" className="relative bg-concrete" aria-labelledby="services-title">
      <div className="relative py-24 lg:py-28">
        <div className="mx-auto mb-12 flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue" data-reveal>
              Ce que nous faisons
            </p>
            <h2 id="services-title" data-split className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9]">
              7 métiers,
              <br />
              un seul interlocuteur
            </h2>
          </div>
          <div className="w-full max-w-xs" data-reveal>
            <p className="text-ink/70">Du bureau d&apos;études à la formation, en passant par le matériel et la réalisation.</p>
            {more && (
              <Link href="/services" className="mt-3 flex w-fit items-center gap-2 font-bold text-blue hover:underline">
                Détail des services <ArrowRight size={16} weight="bold" />
              </Link>
            )}
          </div>
        </div>

        <ol className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-5">
          {services.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              className={`group relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] bg-ink p-7 text-white shadow-[0_24px_44px_-26px_rgb(18_20_24/0.7)] lg:min-h-[400px] ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              {/* background photo + dark wash so the copy stays readable */}
              <Image
                src={s.image}
                alt=""
                fill
                quality={70}
                sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"}
                className="-z-10 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
              <div className="flex items-start justify-between">
                <BtpIcon name={s.icon} size={72} accent={Number(s.n) % 2 ? "yellow" : "red"} className="text-white" />
                <span className="font-mono text-sm text-white/60">{s.n} / 07</span>
              </div>
              <div>
                <h3 className="font-narrow text-[1.7rem] font-extrabold uppercase leading-[0.95] tracking-tight">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/80">{s.text}</p>
              </div>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-yellow transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
