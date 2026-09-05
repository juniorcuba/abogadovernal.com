import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Página para rutas que aún no existen.
 *
 * Las secciones enlazan a /nosotros, /contacto, /blog, etc., que todavía no están
 * construidas. Sin esto, cualquier clic en el menú lleva al 404 por defecto de
 * Next, que no tiene nada que ver con el sitio y da sensación de roto al
 * compartirlo. Sustituir por las páginas reales cuando se hagan.
 */
export default function NoEncontrada() {
  return (
    <>
      <SiteHeader />
      <main className="bg-vernal-ink flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-vernal-accent text-[16px] leading-[17px] font-bold tracking-[4px] uppercase">
          Próximamente
        </p>
        <h1 className="mt-6 max-w-[720px] text-[34px] leading-[36px] font-semibold text-white uppercase sm:text-[48px] sm:leading-[50px]">
          Esta página todavía está en construcción
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[17px] text-white/80">
          Estamos terminando esta sección. Mientras tanto puedes volver al inicio o
          escribirnos directamente: la primera consulta es el mejor punto de partida.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <a
            href={site.phoneHref}
            className="text-vernal-accent text-[20px] leading-[21px] font-bold whitespace-nowrap"
          >
            {site.phone}
          </a>
        </div>
        <Link
          href="/"
          className="mt-8 text-[14px] leading-[15px] text-white/60 underline transition-colors hover:text-vernal-accent"
        >
          {site.url.replace("https://", "")}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
