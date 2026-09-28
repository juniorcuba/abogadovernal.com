import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import {
  TestimonialesBlog,
  TestimonialesCasos,
  TestimonialesHero,
  TestimonialesPreguntas,
} from "@/components/sections/testimoniales";

/**
 * Testimonios y casos de éxito — frame `453:469` de Figma, 1920 × 6738.
 *
 * |    y | alto | bloque                                   | estado |
 * |------|------|------------------------------------------|--------|
 * |    0 |  991 | hero: título, texto, CTA y la cita       | propio |
 * |  983 | 2504 | seis casos, el vídeo y la tira de fotos  | propio |
 * | 3487 | 1216 | preguntas frecuentes (las cinco)         | propio |
 * | 4683 |  890 | tres entradas del blog                   | propio |
 * | 5515 |  755 | "Agenda tu consulta"                     | el compartido |
 * | 6270 |  468 | footer                                   | el de siempre |
 *
 * Solo hay artboard de escritorio.
 *
 * TEMPORAL: la página saca nombre, ciudad, foto y vídeo de clientes reales y
 * todavía no hay consentimiento por escrito, así que va sin indexar y fuera del
 * menú (ver `navItems`). Cuando lleguen los permisos se quita el `robots` de
 * aquí y se descomenta el enlace del menú.
 */

export const metadata: Metadata = {
  title: "Testimonios y casos de éxito",
  description:
    "Historias reales de clientes del Abogado Vernal en Texas: peticiones familiares, asilo, visas U y VAWA, naturalización y defensa contra la deportación.",
  robots: { index: false, follow: false },
};

export default function TestimonialesPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <TestimonialesHero />
        <TestimonialesCasos />
        <TestimonialesPreguntas />
        <TestimonialesBlog />
        {/* En el archivo el bloque se monta 58px sobre las entradas del blog. */}
        <AgendaConsulta solape={58} />
      </main>
      <SiteFooter />
    </>
  );
}
