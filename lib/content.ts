// Content collected from facebook.com/Btpdigitaltech (2026-11-08).
// Replace posters in /public/media with the client's original files when available.

export const company = {
  name: "BTP Digital Tech",
  legal: "BTP Digital Tech SARL",
  tagline: "Formation · Étude de bureau · Réalisation",
  about:
    "Nous mettons le digital au service du bâtiment : former, calculer, dessiner et construire, avec la rigueur d'un bureau d'études et la réalité du terrain.",
  city: "Douala, Cameroun",
  phone: "+237 6 54 40 50 48",
  phoneHref: "tel:+237654405048",
  whatsapp: "https://wa.me/237654405048",
  email: "btpdigitaltech@gmail.com",
  facebook: "https://www.facebook.com/Btpdigitaltech",
  followers: 6800,
  partners: ["Laroche Construction"],
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/methode", label: "Méthode" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/formation", label: "Formation" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];


export type IconName =
  | "screen"
  | "crate"
  | "wrench"
  | "excavator"
  | "beam"
  | "key"
  | "compass"
  | "trowel"
  | "helmet"
  | "rebar"
  | "permit"
  | "pipe";

export const services: { n: string; title: string; text: string; icon: IconName; image: string }[] = [
  { n: "01", title: "Formation en logiciels BTP", text: "AutoCAD, Revit, Robot, ArchiCAD : des sessions pratiques, sur projets réels, pour étudiants et professionnels.", icon: "screen", image: "/media/services/01-formation-fb.webp" },
  { n: "02", title: "Commerce général & import-export", text: "Approvisionnement en matériaux et équipements, du fournisseur jusqu'au chantier.", icon: "crate", image: "/media/services/02-import-export-fb.webp" },
  { n: "03", title: "Support & suivi de projet", text: "Intégration, entretien et suivi : un interlocuteur unique du lancement à la réception.", icon: "wrench", image: "/media/services/03-suivi-fb.webp" },
  { n: "04", title: "Matériel : vente & location", text: "Représentation, commercialisation et location d'engins et d'outillage de chantier.", icon: "excavator", image: "/media/services/04-materiel-fb.webp" },
  { n: "05", title: "Étude de structure", text: "Descente de charges, dimensionnement béton armé, plans d'exécution. Une structure solide sur le papier d'abord.", icon: "beam", image: "/media/services/05-structure-fb.webp" },
  { n: "06", title: "Projets clés en main", text: "Gros œuvre, second œuvre, finitions : on vous remet les clés, pas des problèmes.", icon: "key", image: "/media/services/06-cles-en-main-fb.webp" },
  { n: "07", title: "Conception & dessin", text: "Plans architecturaux, dossiers de permis de construire, rendus 3D.", icon: "compass", image: "/media/services/07-conception-fb.webp" },
];

const fb = (id: string) => `https://www.facebook.com/reel/${id}`;

export type Video = {
  id: string;
  title: string;
  url: string;
  poster?: string;
  place?: string;
  tag: string;
};

export const projects: Video[] = [
  { id: "2292708034538293", title: "Bâtiment R+3 livré", place: "Kotto, Douala", tag: "Livré", poster: "/media/kotto-r3.webp", url: fb("2292708034538293") },
  { id: "1011061038693923", title: "De la fondation à la façade", place: "Douala", tag: "Transformation", poster: "/media/duplex-facade.webp", url: fb("1011061038693923") },
  { id: "1951708955756090", title: "Lancement d'une piscine", place: "Kotto, Douala", tag: "En cours", poster: "/media/piscine-kotto.webp", url: fb("1951708955756090") },
  { id: "1541785153986349", title: "Travaux de finition", place: "Edéa", tag: "Finitions", poster: "/media/edea-finitions.webp", url: fb("1541785153986349") },
  { id: "2476371269442302", title: "Duplex : antivols & portail", place: "PK21, Douala", tag: "Second œuvre", poster: "/media/duplex-pk21.webp", url: fb("2476371269442302") },
];

export type TipCategory = "Structure" | "Béton" | "Permis" | "Finitions" | "Réseaux" | "Chantier";

export type Tip = Video & { category: TipCategory; icon: IconName; cover?: string };

const tip = (id: string, title: string, category: TipCategory, icon: IconName): Tip => ({
  id,
  title,
  category,
  icon,
  tag: category,
  url: fb(id),
});

const tipList: Tip[] = [
  tip("1892871408758337", "Ciment 42,5 ≠ bâtiment plus solide", "Béton", "trowel"),
  tip("2519904535187448", "Attention au dosage hasardeux du béton", "Béton", "trowel"),
  tip("1869225890903840", "Une maison qui dure commence sous terre", "Structure", "rebar"),
  tip("1094729406401186", "Dalle qui fléchit : les solutions", "Structure", "beam"),
  tip("2995964247402620", "L'expérience construit, l'ingénieur calcule", "Structure", "beam"),
  tip("1099756135786644", "Ton plan est beau… mais est-il constructible ?", "Structure", "compass"),
  tip("2613180562467875", "Permis refusé à cause d'un plan manquant (1/3)", "Permis", "permit"),
  tip("3165024420555212", "Permis refusé à cause d'un plan manquant (2/3)", "Permis", "permit"),
  tip("1105568748648013", "Permis refusé à cause d'un plan manquant (3/3)", "Permis", "permit"),
  tip("1960922174562600", "On ne signe pas un acte de vente au commissariat", "Permis", "permit"),
  tip("2038263416817791", "Règles de calage pour des tableaux droits", "Finitions", "trowel"),
  tip("4421771901300172", "Le crépissage d'angle", "Finitions", "trowel"),
  tip("1874256990203968", "Comment crépir les murs de douche", "Finitions", "trowel"),
  tip("865958263053371", "Pourquoi double-t-on les murs en haut standing ?", "Finitions", "helmet"),
  tip("1701676264484751", "Gaines bleue et rouge : à quoi servent-elles ?", "Réseaux", "pipe"),
  tip("1019171331081737", "CU et CE en plomberie", "Réseaux", "pipe"),
  tip("2828381780874881", "Climatisation : les erreurs qui coûtent cher", "Réseaux", "pipe"),
  tip("1400679415298155", "Plomberie : les erreurs qui coûtent cher", "Réseaux", "pipe"),
  tip("1039371781884123", "L'erreur à éviter avant de poser un câble", "Réseaux", "pipe"),
  tip("1696999585100779", "Il pensait tout faire sans ingénieur…", "Chantier", "helmet"),
  tip("894390890425628", "Il voulait tout économiser… et a tout gâché", "Chantier", "helmet"),
  tip("2539401309861363", "Acheter le matériel avant les ouvriers ?", "Chantier", "helmet"),
  tip("3520499838123082", "« On va régler ça avec le crépissage »", "Chantier", "trowel"),
  tip("1412765077077817", "La famille du client ne dirige pas le chantier", "Chantier", "helmet"),
  tip("1414373104093201", "2 erreurs qui ruinent un projet avant de construire", "Chantier", "helmet"),
  tip("2265721460928905", "Master ou ingénieur : pas la même chose", "Chantier", "compass"),
];

const coverSlug: Record<TipCategory, string> = {
  Béton: "beton",
  Structure: "structure",
  Permis: "permis",
  Finitions: "finitions",
  Réseaux: "reseaux",
  Chantier: "chantier",
};

/** Each tip gets its own cover photo, numbered within its category (public/media/tips/<category>-<n>-fb.webp). */
export const tips: Tip[] = (() => {
  const seen: Partial<Record<TipCategory, number>> = {};
  return tipList.map((t) => {
    const n = (seen[t.category] = (seen[t.category] ?? 0) + 1);
    return { ...t, cover: `/media/tips/${coverSlug[t.category]}-${n}-fb.webp` };
  });
})();

export const tipCategories: TipCategory[] = ["Structure", "Béton", "Permis", "Finitions", "Réseaux", "Chantier"];

export const process = [
  { k: "01", title: "Étude & plans", text: "Relevés, conception, calcul de structure, dossier de permis. Tout se décide sur le papier.", img: "/media/duplex-pk21.webp", metric: "Plans d'exécution" },
  { k: "02", title: "Gros œuvre", text: "Implantation, fondations, poteaux, dalles à hourdis. Le béton dosé, vibré, contrôlé.", img: "/media/kotto-r3.webp", metric: "R+3 · dalle hourdis" },
  { k: "03", title: "Second œuvre & finitions", text: "Crépissage, réseaux, menuiseries. Les détails qui font la différence à l'usage.", img: "/media/edea-finitions.webp", metric: "Crépissage 100 %" },
  { k: "04", title: "Livraison", text: "Réception des travaux, levée des réserves, remise des clés.", img: "/media/duplex-facade.webp", metric: "Clés en main" },
];
