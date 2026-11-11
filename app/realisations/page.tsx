import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { Projects } from "@/components/sections/Projects";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Bâtiment R+3 à Kotto, duplex à PK21, piscine, finitions à Edéa : les chantiers de BTP Digital Tech en vidéo.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        image={pageHeroes.realisations}
        crumb="Réalisations"
        kicker="Nos chantiers"
        title={<>Réali&shy;sations</>}
        lead="Chaque chantier est filmé du terrassement à la livraison. Lancez une vidéo : elle se lit directement ici."
        icon="key"
      />
      <Projects />
      <CtaBand title="Votre chantier, le prochain ?" />
    </>
  );
}
