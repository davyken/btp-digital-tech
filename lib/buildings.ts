import type { StaticImageData } from "next/image";
import heroFrameSite from "@/public/media/buildings/hero-frame-site.webp";
import steelFrameCrane from "@/public/media/buildings/steel-frame-crane.webp";
import completedTowers from "@/public/media/buildings/completed-towers.webp";
import scaffoldedBuilding from "@/public/media/buildings/scaffolded-building.webp";
import craneBlock from "@/public/media/buildings/crane-block.webp";
import apartmentBlocks from "@/public/media/buildings/apartment-blocks.webp";
import heroBureau from "@/public/media/hero-bureau.webp";
import fbServices from "@/public/media/facebook/hero-services.webp";
import fbMethode from "@/public/media/facebook/hero-methode-v4.webp";
import fbRealisations from "@/public/media/facebook/hero-realisations-v2.webp";
import fbFormation from "@/public/media/facebook/hero-formation.webp";
import fbConseils from "@/public/media/facebook/hero-conseils-v2.webp";
import fbContact from "@/public/media/facebook/hero-contact.webp";

/** Multi-storey building photos used as hero backgrounds (CC0, see public/media/buildings/SOURCES.txt). */
export type BuildingPhoto = { src: StaticImageData; alt: string; position?: string };

export const buildings = {
  heroFrameSite: { src: heroFrameSite, alt: "Immeuble à étages en béton armé en cours de construction", position: "50% 12%" },
  steelFrameCrane: { src: steelFrameCrane, alt: "Ossature d'un bâtiment à étages et grue à tour", position: "40% 50%" },
  completedTowers: { src: completedTowers, alt: "Immeubles résidentiels à étages achevés" },
  scaffoldedBuilding: { src: scaffoldedBuilding, alt: "Bâtiment à étages sous échafaudage" },
  craneBlock: { src: craneBlock, alt: "Grue au-dessus d'un immeuble à étages en chantier" },
  apartmentBlocks: { src: apartmentBlocks, alt: "Immeubles d'habitation à étages" },
} satisfies Record<string, BuildingPhoto>;

/** Landing hero: our engineer at the design desk, with a site and crane behind (own photo). */
export const heroBureauPhoto: BuildingPhoto = {
  src: heroBureau,
  alt: "Ingénieur de BTP Digital Tech au bureau d'études, chantier et grue en arrière-plan",
  position: "40% 40%",
};

/** Inner-page hero photos: BTP Digital Tech's own projects, from facebook.com/Btpdigitaltech (cropped to 16:9). */
export const pageHeroes = {
  services: { src: fbServices, alt: "Immeuble résidentiel R+2 conçu par BTP Digital Tech", position: "40% 50%" },
  methode: { src: fbMethode, alt: "Bâtiment à étages en cours de gros œuvre", position: "50% 40%" },
  realisations: { src: fbRealisations, alt: "Maison de plain-pied achevée, projet BTP Digital Tech", position: "55% 50%" },
  formation: { src: fbFormation, alt: "Immeuble R+3 modélisé en 3D", position: "35% 50%" },
  conseils: { src: fbConseils, alt: "Coffrage et fondations sur un chantier BTP Digital Tech", position: "50% 50%" },
  contact: { src: fbContact, alt: "Maison individuelle, projet BTP Digital Tech", position: "70% 50%" },
} satisfies Record<string, BuildingPhoto>;
