import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { SedeHero, SedeServicios } from "@/components/sections/sede";
import { SedePreguntas } from "@/components/sections/sede-preguntas";
import { fijarIdioma, metadatos, traducirServidor } from "@/lib/i18n/servidor";
import { sedePorSlug, sedes } from "@/lib/sedes";

/** Una página por sede, generadas en el build. Otra ciudad da 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return sedes.map((s) => ({ sede: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; sede: string }>;
}): Promise<Metadata> {
  const { lang, sede: slug } = await params;
  const sede = sedePorSlug(slug);
  if (!sede) return {};
  const idioma = fijarIdioma(lang);
  return metadatos(lang, `/areas-de-servicio/${sede.slug}`, {
    title: traducirServidor(idioma, "Abogado de inmigración en {ciudad}, TX").replace("{ciudad}", sede.ciudad),
    description: sede.intro,
  });
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ lang: string; sede: string }>;
}) {
  const { lang, sede: slug } = await params;
  fijarIdioma(lang);
  const sede = sedePorSlug(slug);
  if (!sede) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <SedeHero sede={sede} />
        <SedeServicios sede={sede} />
        <SedePreguntas />
        {/* En el archivo el bloque se monta 71px sobre las preguntas. */}
        <AgendaConsulta solape={71} solapeMovil={28} />
      </main>
      <SiteFooter />
    </>
  );
}
