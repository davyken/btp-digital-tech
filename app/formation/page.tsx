import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { Formation } from "@/components/sections/Formation";
import { TipsTeaser } from "@/components/sections/TipsTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Formation logiciels BTP",
  description: "Formations pratiques aux logiciels du BTP à Douala, sur des projets réels du bureau d'études.",
};

export default function FormationPage() {
  return (
    <>
      <PageHero
        image={pageHeroes.formation}
        crumb="Formation"
        kicker="Service 01"
        title={<>Formation<br />BTP</>}
        lead="Apprenez les logiciels du métier sur de vrais dossiers : plans, calculs, métrés. Pour étudiants, techniciens et ingénieurs."
        icon="screen"
      />
      <Formation />
      <TipsTeaser />
      <CtaBand title="Réserver une place ?" />
    </>
  );
}
