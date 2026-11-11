import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Showreel from "@/components/Showreel";
import Work from "@/components/Work";
import MoreProjects from "@/components/MoreProjects";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { services } from "@/config/content";
import { site } from "@/config/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.headline.join(" ").replaceAll("*", ""),
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Intro />
      <Showreel />
      <Work />
      <MoreProjects />
      <Marquee items={services.map((s) => s.title)} />
      <Services />
      <Clients />
      <About />
      <Contact />
    </>
  );
}
