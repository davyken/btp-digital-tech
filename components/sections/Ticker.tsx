"use client";

import { useRef } from "react";
import { services } from "@/lib/content";
import { BtpIcon } from "@/components/icons/BtpIcon";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

/** Hazard-tape marquee. Scroll velocity briefly speeds it up and skews it. */
export function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
        const skew = gsap.quickTo("[data-track]", "skewX", { duration: 0.5, ease: "power3" });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -300);
            skew(v);
            loop.timeScale(1 + Math.abs(v) * 0.6);
            gsap.to(loop, { timeScale: 1, duration: 1, overwrite: true, delay: 0.1 });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const items = [...services, ...services];
  return (
    <div ref={root} className="relative overflow-hidden border-y-[3px] border-ink bg-yellow py-4" aria-label="Nos services">
      <div data-track className="flex w-max items-center">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-4 pr-12" aria-hidden={i >= services.length}>
            <BtpIcon name={s.icon} size={34} accent="red" />
            <span className="whitespace-nowrap font-narrow text-3xl font-black uppercase tracking-tight">{s.title}</span>
            <span className="ml-8 size-3 rotate-45 bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}
