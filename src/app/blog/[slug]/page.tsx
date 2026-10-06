import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { Articulo } from "@/components/sections/articulo";
import { articulo } from "@/lib/articulo";

/**
 * La página de un artículo — frame `802:564` de Figma, 1920 × 4346.
 *
 * Solo hay un artículo escrito, así que de momento esta ruta solo responde a su
 * slug. Las seis tarjetas del listado llevan todas aquí; cuando lleguen los
 * otros cinco textos, esto pasa a leer de una lista y `generateStaticParams`
 * devuelve todos.
 */

export function generateStaticParams() {
  return [{ slug: articulo.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== articulo.slug) return {};
  return {
    title: articulo.titulo.join(" ").replace(/\s+/g, " "),
    description:
      "Qué es la Visa VAWA, a quién protege y qué beneficios da: independencia del agresor, permiso de trabajo, residencia permanente y protección para tus hijos.",
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== articulo.slug) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Articulo />
        {/* En el archivo el bloque se monta 58 sobre la banda cian. */}
        <AgendaConsulta solape={58} solapeMovil={36} />
      </main>
      <SiteFooter />
    </>
  );
}
