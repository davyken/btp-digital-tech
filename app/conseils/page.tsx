import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { TipsLibrary } from "@/components/sections/TipsLibrary";
import { CtaBand } from "@/components/sections/CtaBand";
import { tips } from "@/lib/content";

export const metadata: Metadata = {
  title: "Conseils de chantier en vidéo",
  description:
    "Béton, structure, permis de construire, finitions, plomberie et électricité : les conseils vidéo de BTP Digital Tech pour construire sans mauvaises surprises.",
};

export default function ConseilsPage() {
  return (
    <>
      <PageHero
        image={pageHeroes.conseils}
        crumb="Conseils"
        kicker={`Bibliothèque · ${tips.length} vidéos`}
        title={<>Conseils<br />de chantier</>}
        lead="Les erreurs qu'on voit tous les jours sur les chantiers, expliquées en moins d'une minute. Choisissez un thème."
        icon="trowel"
      />
      <TipsLibrary />
      <CtaBand title="Une question sur votre chantier ?" />
    </>
  );
}
