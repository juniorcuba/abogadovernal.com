import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";

/**
 * "Áreas de práctica y servicios" — nodo `211:750` de Figma, 1920 × 4009.
 *
 * Mapa de la página, medido sobre el render de referencia del artboard:
 *
 * |    y | alto | bloque                              | estado |
 * |------|------|-------------------------------------|--------|
 * |    0 |  128 | cabecera                            | ✅ la misma de la home (dif. media 0.81) |
 * |  128 |  905 | hero: título, claim, CTA y selector de ciudad | pendiente |
 * | 1033 | 1570 | "Abogado de inmigración en …" + acordeón de las 5 ciudades | pendiente |
 * | 2603 |  877 | "Mantente informado" + reseñas      | ✅ la misma de la home (dif. media 0.35) |
 * | 3480 |  529 | footer                              | ✅ el mismo de la home (dif. media 0.48) |
 *
 * Los tres bloques marcados coinciden con la home píxel a píxel, así que se
 * reutilizan los componentes tal cual. Solo cambia que aquí "Mantente informado"
 * no lleva el solape de 3px: en la home pisa a testimonios y aquí no.
 *
 * Los dos bloques pendientes esperan al export SVG del artboard. Son pilas de
 * capas —cian plano, foto de la bandera, degradado encima— y derivar eso del
 * render lleva a inventarse valores; ya pasó una vez en la home con un degradado
 * de 129° que no existía en el archivo.
 *
 * OJO con dos cosas del contenido, para preguntarle al cliente:
 *   - el título dice "ÁREAS DE PRACTICA", sin tilde
 *   - la cuarta ciudad dice "FORTH WORTH"; la ciudad es Fort Worth
 */

export const metadata: Metadata = {
  title: "Áreas de práctica y servicios",
  description:
    "Áreas de práctica y servicios del despacho en Dallas, Houston, Austin, Fort Worth y San Antonio.",
};

export default function AreasDeServicioPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        {/* Aquí van el hero (y128, alto 905) y el bloque de ciudades (y1033,
            alto 1570) en cuanto tengamos el SVG del artboard. */}
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
