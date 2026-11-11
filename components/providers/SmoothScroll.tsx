"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<((t: number) => void) | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    rafRef.current = raf;
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    // Hold scrolling while the opening animation plays
    const onIntroDone = () => instance.start();
    if (document.documentElement.classList.contains("intro-running")) {
      instance.stop();
      window.addEventListener("intro:done", onIntroDone, { once: true });
    }

    // Smooth in-page anchors
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!.replace(/^\//, "");
      if (location.pathname !== "/" && a.getAttribute("href")!.startsWith("/#")) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el as HTMLElement, { offset: -24, duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("intro:done", onIntroDone);
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // New page: jump to top and let pinned sections measure the new layout
  const pathname = usePathname();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
