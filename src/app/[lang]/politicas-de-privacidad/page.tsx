import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";
import { PoliticasContenido } from "@/components/sections/politicas-contenido";
import { fijarIdioma, metadatos } from "@/lib/i18n/servidor";

/**
 * Políticas de privacidad — nodo `425:2203` de Figma, 1920 × 4533.
 *
 * | y    | alto | bloque                                   | estado |
 * |------|------|------------------------------------------|--------|
 * | 0    | 128  | cabecera                                 | la de la home |
 * | 0    | 3188 | foto, título, texto legal, tarjeta, CTA  | propio |
 * | 3188 | 523  | reseñas (el boletín se quitó)              | el de la home |
 * | 4065 | 468  | footer                                   | el de la home |
 *
 * Solo hay artboard de escritorio.
 */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return metadatos((await params).lang, "/politicas-de-privacidad", {
    // En inglés en los dos idiomas, como el texto legal.
    title: "Privacy Policy",
    description:
      "How The Law Office of Vernal Farnum Mejia collects, uses, stores and protects personal information, and how it uses SMS and WhatsApp messaging.",
  });
}

export default async function PoliticasPrivacidadPage({ params }: { params: Promise<{ lang: string }> }) {
  fijarIdioma((await params).lang);
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
