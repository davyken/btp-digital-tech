import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { TipsTeaser } from "@/components/sections/TipsTeaser";
import { Formation } from "@/components/sections/Formation";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Services more />
      <Process />
      <Projects more />
      <TipsTeaser />
      <Formation />
      <Contact />
    </>
  );
}
