import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { Process } from "@/components/sections/Process";
import { TipsTeaser } from "@/components/sections/TipsTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Notre méthode",
  description: "Étude et plans, gros œuvre, second œuvre et finitions, livraison : comment BTP Digital Tech mène un chantier.",
};

export default function MethodePage() {
  return (
    <>
      <PageHero
        image={pageHeroes.methode}
        crumb="Méthode"
        kicker="Comment on travaille"
        title={<>Du plan<br />aux clés</>}
        lead="Quatre phases, des contrôles à chaque étape et un suivi filmé que vous pouvez consulter à distance."
        icon="compass"
      />
      <Process />
      <TipsTeaser />
      <CtaBand title="On commence par l'étude ?" />
    </>
  );
}
