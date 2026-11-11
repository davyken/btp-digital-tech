import Image from "next/image";
import { process } from "@/lib/content";

/**
 * "Du plan au bâtiment": the four phases as a static row of photo cards (no scroll animation).
 * Each card shows the real site photo of the phase, its number, title, key figure and description.
 */
export function Process() {
  return (
    <section id="methode" className="blueprint blueprint-dark relative bg-ink py-24 text-white lg:py-32" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-yellow">Notre méthode</p>
            <h2 id="process-title" className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.9]">
              Du plan
              <br />
              au bâtiment
            </h2>
          </div>
          <p className="max-w-md text-white/65 lg:text-lg">
            Quatre étapes, un seul interlocuteur : de l&apos;étude des plans jusqu&apos;à la remise des clés.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <li key={p.k} className="flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-ink-2">
              <div className="relative aspect-[4/3]">
                <Image src={p.img} alt="" fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" quality={70} className="object-cover" />
                <span className="absolute left-3 top-3 grid size-11 place-items-center rounded-full bg-yellow font-mono text-sm font-bold text-ink">
                  {p.k}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-extrabold uppercase leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-yellow">{p.metric}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
