"use client";

import { useRef } from "react";
import { WhatsappLogo, Phone, EnvelopeSimple, MapPin, ArrowUpRight } from "@phosphor-icons/react";
import { company, projects, services, tips } from "@/lib/content";
import { gsap, useGSAP, useReveals } from "@/lib/motion";

const stats = [
  { value: 6800, label: "abonnés", suffix: "+" },
  { value: services.length, label: "métiers", suffix: "" },
  { value: projects.length, label: "chantiers filmés", suffix: "" },
  { value: tips.length, label: "conseils vidéo", suffix: "" },
];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("fr-FR")),
          });
        });
        gsap.to("[data-tape]", {
          backgroundPositionX: 400,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="relative bg-ink text-white" aria-labelledby="contact-title">
      <div data-tape className="hazard h-5" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-white/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 sm:p-8" data-reveal>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">{s.label}</dt>
              <dd className="mt-2 font-narrow text-5xl font-black text-yellow sm:text-6xl">
                <span data-count={s.value}>{s.value.toLocaleString("fr-FR")}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-yellow" data-reveal>
              Contact
            </p>
            <h2 id="contact-title" data-split className="mt-3 font-narrow text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.86]">
              Parlons de
              <br />
              votre projet
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70" data-reveal>
              Un terrain, un plan, une idée ? Envoyez-nous un message : réponse rapide sur WhatsApp, du lundi au samedi.
            </p>
          </div>

          <ul className="space-y-3" data-reveal>
            <li>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="lg-btn group flex items-center justify-between rounded-[22px] bg-yellow px-6 py-5 text-ink"
              >
                <span className="flex items-center gap-3 text-lg font-extrabold">
                  <WhatsappLogo size={26} weight="bold" /> WhatsApp
                </span>
                <ArrowUpRight size={22} weight="bold" className="transition-transform group-hover:rotate-45" />
              </a>
            </li>
            {[
              { href: company.phoneHref, icon: Phone, label: company.phone },
              { href: `mailto:${company.email}`, icon: EnvelopeSimple, label: company.email },
              { href: company.facebook, icon: ArrowUpRight, label: "Facebook · Btpdigitaltech", ext: true },
            ].map(({ href, icon: Icon, label, ext }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="lg lg-dark lg-card lg-btn flex items-center gap-3 px-6 py-5 font-semibold"
                >
                  <Icon size={20} weight="bold" className="text-yellow" />
                  <span className="truncate">{label}</span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 px-6 pt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/55">
              <MapPin size={16} weight="bold" /> {company.city}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
