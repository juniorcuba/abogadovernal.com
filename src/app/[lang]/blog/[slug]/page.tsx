import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { Articulo } from "@/components/sections/articulo";
import { articulos, buscarArticulo } from "@/lib/articulo";
import { fijarIdioma, metadatos, traducirServidor } from "@/lib/i18n/servidor";

/**
 * La página de un artículo — frame `802:564` de Figma, 1920 × 4346.
 *
 * Ese frame es el del primer artículo; los seis de `articulos` usan la misma
 * maqueta y cada tarjeta del listado lleva al suyo.
 */

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const articulo = buscarArticulo(slug);
  if (!articulo) return {};
  const idioma = fijarIdioma(lang);
  return metadatos(lang, `/blog/${articulo.slug}`, {
    title: articulo.titulo.map((linea) => traducirServidor(idioma, linea)).join(" ").replace(/\s+/g, " "),
    description: articulo.descripcion,
  });
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  fijarIdioma(lang);
  const articulo = buscarArticulo(slug);
  if (!articulo) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Articulo articulo={articulo} />
        {/* En el archivo el bloque se monta 58 sobre la banda cian. */}
        <AgendaConsulta solape={58} solapeMovil={38} />
      </main>
      <SiteFooter />
    </>
  );
}
