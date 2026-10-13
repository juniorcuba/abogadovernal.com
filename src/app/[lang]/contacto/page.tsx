import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BlogResenas } from "@/components/sections/blog-resenas";
import { ContactoHero } from "@/components/sections/contacto-hero";
import { fijarIdioma, metadatos } from "@/lib/i18n/servidor";

/**
 * Contacto — frame `615:867` de Figma, 1920 × 2487 (2026-09-19).
 *
 * |    y | alto | bloque                               | estado |
 * |------|------|--------------------------------------|--------|
 * |    0 |  128 | cabecera                             | la de siempre |
 * |    0 | 1142 | hero: título, claim, formulario      | propio (falta la foto) |
 * | 1142 |  523 | reseñas (el boletín se quitó)          | el de la home |
 * | 2019 |  468 | footer                               | el de la home |
 *
 * Solo hay artboard de escritorio.
 */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return metadatos((await params).lang, "/contacto", {
    title: "Contacto",
    description:
      "Contacta con el despacho del Abogado Vernal en Dallas, Houston, Austin, Fort Worth y San Antonio, o de forma virtual.",
  });
}

export default async function ContactoPage({ params }: { params: Promise<{ lang: string }> }) {
  fijarIdioma((await params).lang);
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <ContactoHero />
        <BlogResenas />
      </main>
      <SiteFooter />
    </>
  );
}
