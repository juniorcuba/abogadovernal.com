import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { SobreNosotros } from "@/components/sections/sobre-nosotros";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <SobreNosotros />
        {/*
          Secciones pendientes de la frame 1:2, en orden:
          Bio del abogado (y1751) · Nuestro equipo (y2559)
          Nuestro compromiso (y3269) · Servicios (y4078) · Cómo trabajamos (y4746)
          5 sedes + live (y5414) · Testimonios (y6077) · Blog (y6917) · Reseñas (y7366)
          Ver docs/FIGMA.md
        */}
      </main>
      <SiteFooter />
    </>
  );
}
