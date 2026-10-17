import type { Metadata } from "next";
import NoEncontrada from "../not-found";
import { fijarIdioma, metadatos } from "@/lib/i18n/servidor";

/**
 * La página 404 del sitio estático (GoDaddy). Solo existe en ese build: con
 * servidor, las rutas que no existen las atiende `[...resto]/page.servidor.tsx`
 * y salen por `not-found.tsx`, que es esto mismo.
 *
 * La exportación no admite la ruta comodín, así que aquí se genera una página
 * de verdad por idioma (`/es/no-encontrada/` y `/en/no-encontrada/`) y
 * hosting/404.php la sirve con estado 404 para todo lo que no existe.
 */
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return metadatos((await params).lang, "/no-encontrada", {
    title: "Página no encontrada",
    robots: { index: false, follow: false },
  });
}

export default async function NoEncontradaEstatica({ params }: { params: Promise<{ lang: string }> }) {
  fijarIdioma((await params).lang);
  return <NoEncontrada />;
}
