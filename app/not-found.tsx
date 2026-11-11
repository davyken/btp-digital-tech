import Link from "next/link";

export default function NotFound() {
  return (
    <section className="blueprint grid min-h-svh place-items-center px-4 pt-24 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue">Erreur 404</p>
        <h1 className="mt-3 font-narrow text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-[0.86]">
          Chantier
          <br />
          introuvable
        </h1>
        <Link href="/" className="lg lg-light lg-btn mt-10 inline-flex h-14 items-center px-7 font-bold">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
