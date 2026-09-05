import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { SobreNosotros } from "@/components/sections/sobre-nosotros";
import { BioVernal } from "@/components/sections/bio-vernal";
import { NuestroEquipo } from "@/components/sections/nuestro-equipo";
import { NuestroCompromiso } from "@/components/sections/nuestro-compromiso";
import { Servicios } from "@/components/sections/servicios";
import { ComoTrabajamos } from "@/components/sections/como-trabajamos";
import { Transmisiones } from "@/components/sections/transmisiones";
import { Testimonios } from "@/components/sections/testimonios";
import { BlogResenas } from "@/components/sections/blog-resenas";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <SobreNosotros />
        <BioVernal />
        <NuestroEquipo />
        <NuestroCompromiso />
        <Servicios />
        <ComoTrabajamos />
        <Transmisiones />
        <Testimonios />
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
