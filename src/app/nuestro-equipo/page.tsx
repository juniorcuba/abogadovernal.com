import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import {
  EquipoCompromiso,
  EquipoHero,
  EquipoRejilla,
} from "@/components/sections/equipo";

/**
 * Nuestro equipo — frame `770:403` de Figma, 1920 × 4486 (2026-09-27).
 *
 * |    y | alto | bloque                                | estado |
 * |------|------|---------------------------------------|--------|
 * |    0 |  128 | cabecera                              | la de siempre |
 * |    0 |  897 | hero                                  | propio |
 * |  897 | 1373 | "El equipo": once fichas en 4 + 4 + 3 | propio |
 * | 2270 |  993 | "Nuestro compromiso" y el vídeo       | propio |
 * | 3263 |  755 | "Agenda tu consulta"                  | el compartido |
 * | 4018 |  468 | footer                                | el de siempre |
 *
 * DE ESTA PÁGINA NO HAY EXPORT SVG: el hero sale de los datos del conector de
 * Figma y el resto está medido sobre el render del artboard, con las fotos
 * recortadas de él. Hay que repasarla cuando llegue el archivo.
 *
 * Nadie la enlaza todavía: el menú no la trae y el botón "Conoce al equipo
 * completo" de la home apunta aquí desde ahora.
 */

export const metadata: Metadata = {
  title: "Nuestro equipo",
  description:
    "Las personas que atienden cada caso en las oficinas del Abogado Vernal en Texas: abogados, paralegales y personal de apoyo.",
};

export default function NuestroEquipoPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <EquipoHero />
        <EquipoRejilla />
        <EquipoCompromiso />
        <AgendaConsulta />
      </main>
      <SiteFooter />
    </>
  );
}
