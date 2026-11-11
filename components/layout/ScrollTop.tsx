"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLenis } from "@/components/providers/SmoothScroll";

/** Liquid-glass "back to top" button with a scroll-progress ring and a crane-hook arrow. */
export function ScrollTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);
      ring.current?.style.setProperty("stroke-dashoffset", String(1 - p));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Revenir en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={clsx(
        "lg lg-light lg-btn group fixed bottom-5 right-5 z-40 grid size-14 place-items-center text-ink transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] sm:bottom-8 sm:right-8 sm:size-16",
        visible ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {/* progress ring */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgb(18 20 24 / 0.1)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>
      {/* custom icon: crane hook lifting, with the yellow logo block */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="relative transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
      >
        <rect x="19" y="18" width="8" height="8" fill="var(--color-yellow)" />
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M16 27V6" />
          <path d="M8 14l8-8 8 8" />
        </g>
      </svg>
    </button>
  );
}
