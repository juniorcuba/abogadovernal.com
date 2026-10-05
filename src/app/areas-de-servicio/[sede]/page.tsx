import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgendaConsulta } from "@/components/sections/agenda-consulta";
import { SedeHero, SedePreguntas, SedeServicios } from "@/components/sections/sede";
import { sedePorSlug, sedes } from "@/lib/sedes";

/** Una página por sede, generadas en el build. Otra ciudad da 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return sedes.map((s) => ({ sede: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sede: string }>;
}): Promise<Metadata> {
  const sede = sedePorSlug((await params).sede);
  if (!sede) return {};
  return {
    title: `Abogado de inmigración en ${sede.ciudad}, TX`,
    description: sede.intro,
  };
}

export default async function SedePage({ params }: { params: Promise<{ sede: string }> }) {
  const sede = sedePorSlug((await params).sede);
  if (!sede) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <SedeHero sede={sede} />
        <SedeServicios sede={sede} />
        <SedePreguntas />
        {/* En el archivo el bloque se monta 71px sobre las preguntas. */}
        <AgendaConsulta solape={71} solapeMovil={36} />
      </main>
      <SiteFooter />
    </>
  );
}
