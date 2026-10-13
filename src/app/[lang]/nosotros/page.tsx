import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NosotrosCaso } from "@/components/sections/nosotros-caso";
import { NosotrosCifras } from "@/components/sections/nosotros-cifras";
import { NosotrosHero } from "@/components/sections/nosotros-hero";
import { NosotrosHoy } from "@/components/sections/nosotros-hoy";
import { NosotrosLeccion } from "@/components/sections/nosotros-leccion";
import { BlogResenas } from "@/components/sections/blog-resenas";

/**
 * "Abogado Vernal" — nodo `181:2125` de Figma, 1920 × 5309 (export del 2026-09-13).
 *
 * El diseñador rehizo la página entera respecto al export anterior (5338 de alto):
 * todas las secciones propias cambiaron de composición, fondos y fotos.
 *
 * |    y | alto | bloque                                            | estado |
 * |------|------|---------------------------------------------------|--------|
 * |    0 |  128 | cabecera                                          | la de la home |
 * |   −1 | 1027 | hero: "Tu defensa en Texas" + retrato + tarjeta   | propio |
 * | 1026 |  608 | "Una lección que su propia familia le enseñó"     | propio |
 * | 1634 |  648 | banda cian "El caso que lo confirmó todo"         | propio |
 * | 2282 |  883 | "Hoy, al frente de un equipo…" + tira de 5 fotos  | propio |
 * | 3168 |  793 | "+15,000 personas asesoradas" + logos de medios   | propio |
 * | 3964 |  877 | "Mantente informado" + reseñas                    | el de la home |
 * | 4841 |  468 | footer                                            | el de la home |
 *
 * Entre "Hoy" y "+15,000", y entre "+15,000" y "Mantente informado", el archivo
 * deja 3px de fondo de página: de ahí los márgenes de 3px.
 *
 * OJO con el contenido, para preguntarle al cliente:
 *   - el archivo escribe "Abogado Vernal Farum", sin la ene, dos veces
 *   - dice "cuatro ciudades" y lista Dallas, Houston, Austin y Fort Worth,
 *     pero el despacho tiene cinco sedes: falta San Antonio
 *   - la tira de fotos y la foto de la lección son de clientes y familia reales:
 *     hace falta su consentimiento para publicarlas
 */

export const metadata: Metadata = {
  title: "Abogado Vernal",
  description:
    "La historia del Abogado Vernal Farnum Mejía y del equipo que hoy atiende a la comunidad inmigrante en Texas.",
};

export default function NosotrosPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <NosotrosHero />
        <NosotrosLeccion />
        <NosotrosCaso />
        <NosotrosHoy />
        <NosotrosCifras />
        <BlogResenas className="design:mt-[3px]" />
      </main>
      <SiteFooter />
    </>
  );
}
