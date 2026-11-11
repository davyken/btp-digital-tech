"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * Standard reveals inside a section:
 *  [data-split]   heading lines rise from a mask
 *  [data-reveal]  fade + rise, staggered by DOM order
 *  [data-draw]    SVG strokes draw in
 * Reduced motion: nothing is hidden, nothing moves.
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;

        root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true },
            ),
        });
        gsap.set(reveals, { autoAlpha: 0 });

        root.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: { trigger: p, start: "top 85%", once: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
