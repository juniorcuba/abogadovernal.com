import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { FaqsPreguntas } from "@/components/sections/faqs-preguntas";

/**
 * Preguntas frecuentes — frame `770:625` de Figma, 1920 × 2961 (2026-09-26).
 *
 * |    y | alto | bloque                          | estado |
 * |------|------|---------------------------------|--------|
 * |    0 |  128 | cabecera                        | la de siempre |
 * |    0 | 1738 | título, entrada y las 10 filas  | propio |
 * | 1738 |  755 | "Agenda tu consulta"            | el compartido |
 * | 2493 |  468 | footer                          | el de siempre |
 *
 * Solo hay artboard de escritorio.
 */

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Las dudas que más escuchamos en las oficinas del Abogado Vernal en Texas, respondidas con claridad.",
};

export default function FaqsPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <FaqsPreguntas />
        <AgendaConsulta />
      </main>
      <SiteFooter />
    </>
  );
}
