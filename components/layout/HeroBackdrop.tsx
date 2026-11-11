import Image from "next/image";
import clsx from "clsx";
import type { BuildingPhoto } from "@/lib/buildings";

/**
 * Full-bleed building photo behind a hero. A concrete-toned wash keeps the dark copy on the left readable
 * and the top clear for the transparent header, while the photo stays visible on the right.
 *
 * `side`: on large screens the photo fills only the right part of the hero and fades into the page on its
 * left edge, so a subject in the photo stays fully visible next to the copy instead of under the wash.
 * Below lg it behaves like the full-bleed variant.
 */
export function HeroBackdrop({ image, side = false }: { image: BuildingPhoto; side?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      <div className={side ? "absolute inset-0 overflow-hidden lg:left-auto lg:w-[64%]" : "absolute inset-0"}>
        <Image
          data-hero-bg
          src={image.src}
          alt=""
          fill
          priority
          placeholder="blur"
          quality={side ? 90 : 70}
          sizes={side ? "(min-width: 1024px) 64vw, 100vw" : "100vw"}
          className="scale-110 object-cover"
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
        {side && (
          <div className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-concrete via-concrete/30 to-transparent lg:block" />
        )}
      </div>
      <div
        className={
          side
            ? "absolute inset-0 bg-[linear-gradient(180deg,rgb(235_232_226/0.75)_0%,rgb(235_232_226/0.6)_60%,rgb(235_232_226/0.3)_100%)] lg:bg-[linear-gradient(90deg,rgb(235_232_226/0.95)_0%,rgb(235_232_226/0.85)_34%,rgb(235_232_226/0)_42%)]"
            : "absolute inset-0 bg-[linear-gradient(90deg,rgb(235_232_226/0.95)_0%,rgb(235_232_226/0.86)_38%,rgb(235_232_226/0.35)_75%,rgb(235_232_226/0.2)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(235_232_226/0.9)_0%,rgb(235_232_226/0.8)_60%,rgb(235_232_226/0.5)_100%)]"
        }
      />
      <div className={clsx("absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent", side ? "from-concrete/50" : "from-concrete/80")} />
      <div className={clsx("absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent", side ? "from-concrete/35" : "from-concrete/70")} />
    </div>
  );
}
