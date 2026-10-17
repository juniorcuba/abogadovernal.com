import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { Eb1aComoFunciona, Eb1aHero, Eb1aParaQuien, Eb1aQueSon } from "@/components/sections/eb1a";
import { fijarIdioma, metadatos } from "@/lib/i18n/servidor";

/**
 * EB-1A - NIW — export "VERNAL - EB-1A.svg" (2026-10-17), 1920 × 4427.
 * Sustituye a la página de FAQs: el "EB1" del menú lleva aquí.
 *
 * |    y | alto | bloque                                   |
 * |------|------|------------------------------------------|
 * |    0 |  875 | hero + tarjeta "Tus habilidades…"        |
 * |  875 |  791 | "Qué son EB-1A-NIW" con las dos vías     |
 * | 1666 |  809 | banda cian "Para quién es"               |
 * | 2475 |  792 | "Cómo funciona", cuatro pasos            |
 * | 3208 |  755 | agenda (la de siempre, solapa 59)        |
 * | 3963 |  464 | footer                                   |
 *
 * Solo hay artboard de escritorio; ver `sections/eb1a.tsx`.
 */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return metadatos((await params).lang, "/eb-1a", {
    title: "EB-1A y NIW",
    description:
      "Residencia permanente en EE. UU. sin depender de un empleador: te ayudamos a ver si tu perfil encaja en la EB-1A o la NIW.",
  });
}

export default async function Eb1aPage({ params }: { params: Promise<{ lang: string }> }) {
  fijarIdioma((await params).lang);
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Eb1aHero />
        <Eb1aQueSon />
        <Eb1aParaQuien />
        <Eb1aComoFunciona />
        {/* Destino del botón "Hacer evaluación". */}
        <div id="evaluacion" className="scroll-mt-[60px]">
          <AgendaConsulta solape={59} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
