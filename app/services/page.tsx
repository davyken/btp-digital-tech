import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { Ticker } from "@/components/sections/Ticker";
import { Services } from "@/components/sections/Services";
import { Formation } from "@/components/sections/Formation";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Formation BTP, étude de structure, conception, réalisation clés en main, matériel et import-export : les 7 métiers de BTP Digital Tech à Douala.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image={pageHeroes.services}
        crumb="Services"
        kicker="Ce que nous faisons"
        title={<>Nos<br />services</>}
        lead="Un bureau d'études, une entreprise de construction et un centre de formation. Vous gardez le même interlocuteur du premier croquis à la remise des clés."
        icon="beam"
      />
      <Ticker />
      <Services />
      <Formation />
      <CtaBand title="Quel service vous faut-il ?" />
    </>
  );
}
