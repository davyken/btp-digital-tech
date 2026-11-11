import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { pageHeroes } from "@/lib/buildings";
import { Contact } from "@/components/sections/Contact";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez BTP Digital Tech à Douala : WhatsApp, téléphone, e-mail.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={pageHeroes.contact}
        crumb="Contact"
        kicker="Douala · Cameroun"
        title={<>Nous<br />écrire</>}
        lead="Décrivez votre terrain, votre plan ou votre idée. Nous répondons rapidement, en français ou en anglais."
        icon="helmet"
      />
      <ContactForm />
      <Contact />
    </>
  );
}
