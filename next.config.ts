import type { NextConfig } from "next";

/**
 * `basePath` se lee del entorno para poder servir el sitio bajo un prefijo
 * (p. ej. /vernal), como hace quiniela con QUINIELA_URL_PREFIX. Next lo necesita
 * en tiempo de BUILD, así que la variable se pasa como build arg en el Dockerfile.
 * Vacío = se sirve en la raíz.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Dos destinos de build, como en marlenebatta.com:
 *
 *  - por defecto → servidor Node (Docker en Render), con /api/consulta en Next.
 *  - DESTINO=estatico → `out/` con HTML/CSS/JS puros para un hosting sin Node
 *    (GoDaddy: Apache + PHP). Lo lanza `npm run build:estatico`. El formulario
 *    lo atiende hosting/consulta.php, y los idiomas y las redirecciones van en
 *    hosting/.htaccess, porque la exportación no admite rewrites ni redirects.
 *
 * Los archivos `*.servidor.ts(x)` de `app/` solo existen en el build con
 * servidor (la ruta POST del formulario y la ruta comodín del 404, que la
 * exportación no admite), y los `*.estatico.tsx` solo en el estático. Fuera de
 * su modo, `pageExtensions` no los lista y Next ni los ve.
 *
 * El estático construye en `.next-estatico` y no en `.next`: así no pisa el
 * servidor de desarrollo que comparten las sesiones.
 */
const estatico = process.env.DESTINO === "estatico";

const nextConfig: NextConfig = {
  // Imagen mínima para Docker: Next copia solo lo necesario para arrancar.
  // Vercel construye con su propio empaquetado y ahí "standalone" sobra, así que
  // solo se activa fuera de Vercel. Mantiene vivo el despliegue por Docker
  // (Render, o cualquier otro sitio) sin estorbar aquí.
  ...(estatico
    ? {
        output: "export" as const,
        distDir: ".next-estatico",
        // Cada página es una carpeta con su index.html: Apache la sirve sola.
        trailingSlash: true,
        // Sin servidor no hay optimizador: las imágenes salen tal cual (ya son webp).
        images: { unoptimized: true },
      }
    : process.env.VERCEL
      ? {}
      : { output: "standalone" as const }),
  pageExtensions: estatico ? ["estatico.tsx", "tsx", "ts"] : ["servidor.tsx", "servidor.ts", "tsx", "ts"],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(estatico ? {} : { rewrites, redirects }),
};

// El sitio vive en app/[lang]. El español no lleva prefijo: todo lo que no
// empiece por /en se sirve desde /es por dentro. `afterFiles` corre después de
// los archivos de public/ y antes de las rutas dinámicas, que es lo que hace
// falta: [lang] es dinámica y /nosotros no debe leerse como un idioma.
// OJO: en el estático esto lo hace hosting/.htaccess; si cambias algo aquí,
// cámbialo también allí.
async function rewrites() {
  return {
    beforeFiles: [],
    afterFiles: [
      { source: "/", destination: "/es" },
      {
        source: "/:primero((?!(?:en|es|api|_next)(?:/|$))[^/]+)/:resto*",
        destination: "/es/:primero/:resto*",
      },
    ],
    fallback: [],
  };
}

// URLs del sitio anterior que ya tienen página propia. Permanentes (308): así
// los buscadores y los enlaces viejos pasan a la nueva. Igual que arriba: en el
// estático las repite hosting/.htaccess.
async function redirects() {
  return [
    // /es no es una dirección pública: el español es la raíz.
    { source: "/es", destination: "/", permanent: false },
    { source: "/es/:ruta*", destination: "/:ruta*", permanent: false },
    { source: "/en/areas-de-servicio", destination: "/en/areas-de-servicio/dallas", permanent: false },
    { source: "/en/faqs", destination: "/en/eb-1a", permanent: false },
    // La página índice de áreas se quitó el 2026-10-11: las sedes cuelgan del
    // menú. Temporal (307) por si vuelve.
    {
      source: "/areas-de-servicio",
      destination: "/areas-de-servicio/dallas",
      permanent: false,
    },
    // La página de preguntas frecuentes se retiró por ahora (2026-10-12): el
    // enlace del menú pasó a ser "EB1" y desde el 2026-10-17 lleva a /eb-1a,
    // que la sustituye. Temporal (307): la página sigue en src/app/faqs para
    // cuando vuelva.
    {
      source: "/faqs",
      destination: "/eb-1a",
      permanent: false,
    },
    {
      source: "/politicas_privacidad.html",
      destination: "/politicas-de-privacidad",
      permanent: true,
    },
    {
      source: "/terminos_condiciones.html",
      destination: "/terminos-y-condiciones",
      permanent: true,
    },
  ];
}

export default nextConfig;
