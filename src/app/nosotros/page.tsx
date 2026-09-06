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
 * "Abogado Vernal" — nodo `181:2125` de Figma, 1920 × 5338.
 *
 * Mapa de la página, del export SVG del artboard:
 *
 * |    y | alto | bloque                                        | estado |
 * |------|------|-----------------------------------------------|--------|
 * |    9 |  772 | hero: "Abogado Vernal" + su historia + la cita | ✅ |
 * |    0 |  128 | cabecera, encima del hero                      | ✅ la de la home (dif. 0.55) |
 * |  781 |  608 | "Una lección que su propia familia le enseñó"  | ✅ |
 * | 1391 |  648 | banda cian "El caso que lo confirmó todo"      | ✅ |
 * | 2034 |  883 | "Hoy, al frente de un equipo que piensa igual" | ✅ |
 * | 2629 |  288 | tira de cinco fotos — VACÍA en el archivo      | huecos |
 * | 2920 |  801 | "+15,000 personas asesoradas"                  | ✅ |
 * | 3721 |  877 | "Mantente informado" + reseñas                 | ✅ la de la home (dif. 0.35) |
 * | 4598 |  468 | footer                                         | ✅ el de la home (dif. 0.49) |
 * | 5066 |  272 | espacio vacío al final del artboard            | — |
 *
 * Los tres bloques marcados coinciden con la home píxel a píxel; se comprobó
 * buscando el desplazamiento vertical que minimiza la diferencia media.
 *
 * OJO con el contenido, para preguntarle al cliente:
 *   - el archivo escribe "Abogado Vernal Farum", sin la ene, dos veces
 *   - dice "cuatro ciudades" y lista Dallas, Houston, Austin y Fort Worth,
 *     pero el despacho tiene cinco sedes: falta San Antonio
 *   - la tira de cinco fotos de y2629 son rectángulos grises vacíos: el
 *     diseñador no ha puesto las imágenes
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
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
