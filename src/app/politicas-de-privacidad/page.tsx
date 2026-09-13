import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";
import { PoliticasContenido } from "@/components/sections/politicas-contenido";

/**
 * Políticas de privacidad — nodo `425:2203` de Figma, 1920 × 4533.
 *
 * | y    | alto | bloque                                   | estado |
 * |------|------|------------------------------------------|--------|
 * | 0    | 128  | cabecera                                 | la de la home |
 * | 0    | 3188 | foto, título, texto legal, tarjeta, CTA  | propio |
 * | 3188 | 877  | "Mantente informado" + reseñas           | el de la home |
 * | 4065 | 468  | footer                                   | el de la home |
 *
 * Solo hay artboard de escritorio.
 */

export const metadata: Metadata = {
  title: "Políticas de privacidad",
  description:
    "Cómo The Law Office of Vernal Farnum Mejia recopila, utiliza, almacena y protege la información personal, y cómo usa la mensajería SMS y WhatsApp.",
};

export default function PoliticasPrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <PoliticasContenido />
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
