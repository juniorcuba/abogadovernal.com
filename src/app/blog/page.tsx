import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { BloquePreguntas } from "@/components/sections/bloque-preguntas";
import { BlogHero, BlogListado } from "@/components/sections/blog-listado";
import { preguntasSede } from "@/lib/preguntas";

/**
 * Blog â€” frame `703:807` de Figma, 1920 Ã— 4946 (2026-09-26).
 *
 * |    y | alto | bloque                                  | estado |
 * |------|------|-----------------------------------------|--------|
 * |    0 |  128 | cabecera                                | la de siempre |
 * |    0 |  875 | hero                                    | propio |
 * |  875 | 1636 | buscador, filtros y seis artÃ­culos      | propio |
 * | 2511 | 1271 | preguntas frecuentes (las cinco)        | el compartido |
 * | 3723 |  755 | "Agenda tu consulta"                    | el compartido |
 * | 4478 |  468 | footer                                  | el de siempre |
 *
 * Solo hay artboard de escritorio.
 */

export const metadata: Metadata = {
  title: "Blog de inmigraciÃ³n",
  description:
    "ArtÃ­culos del equipo del Abogado Vernal sobre trÃ¡mites migratorios, cambios en las leyes y las dudas mÃ¡s comunes de la comunidad en Texas.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <BlogHero />
        <BlogListado />
        <BloquePreguntas
          preguntas={preguntasSede}
          alto={1271}
          fotoArriba={-781}
          gradiente="linear-gradient(93.83deg,#000000 12.27%,#00000000 61.14%)"
          tops={{ titulo: 91, entrada: 338, lista: 449, boton: 1067 }}
          boton={{ texto: "Ver mÃ¡s preguntas", href: "/faqs" }}
        />
        {/* En el archivo el bloque se monta 59px sobre las preguntas. */}
        <AgendaConsulta solape={59} solapeMovil={36} />
      </main>
      <SiteFooter />
    </>
  );
}
