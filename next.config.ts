import type { NextConfig } from "next";

/**
 * `basePath` se lee del entorno para poder servir el sitio bajo un prefijo
 * (p. ej. /vernal), como hace quiniela con QUINIELA_URL_PREFIX. Next lo necesita
 * en tiempo de BUILD, así que la variable se pasa como build arg en el Dockerfile.
 * Vacío = se sirve en la raíz.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Imagen mínima para Docker: Next copia solo lo necesario para arrancar.
  // Vercel construye con su propio empaquetado y ahí "standalone" sobra, así que
  // solo se activa fuera de Vercel. Mantiene vivo el despliegue por Docker
  // (Render, o cualquier otro sitio) sin estorbar aquí.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // URLs del sitio anterior que ya tienen página propia. Permanentes (308):
  // así los buscadores y los enlaces viejos pasan a la nueva.
  // El sitio vive en app/[lang]. El español no lleva prefijo: todo lo que no
  // empiece por /en se sirve desde /es por dentro. `afterFiles` corre después de
  // los archivos de public/ y antes de las rutas dinámicas, que es lo que hace
  // falta: [lang] es dinámica y /nosotros no debe leerse como un idioma.
  rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/es" },
        {
          source: "/:primero((?!(?:en|es|_next)(?:/|$))[^/]+)/:resto*",
          destination: "/es/:primero/:resto*",
        },
      ],
      fallback: [],
    };
  },

  redirects() {
    return [
      // /es no es una dirección pública: el español es la raíz.
      { source: "/es", destination: "/", permanent: false },
      { source: "/es/:ruta*", destination: "/:ruta*", permanent: false },
      { source: "/en/areas-de-servicio", destination: "/en/areas-de-servicio/dallas", permanent: false },
      { source: "/en/faqs", destination: "/en/contacto", permanent: false },
      // La página índice de áreas se quitó el 2026-10-11: las sedes cuelgan del
      // menú. Temporal (307) por si vuelve.
      {
        source: "/areas-de-servicio",
        destination: "/areas-de-servicio/dallas",
        permanent: false,
      },
      // La página de preguntas frecuentes se retiró por ahora (2026-10-12): el
      // enlace del menú pasó a ser "EB1" y lleva a Contacto. Temporal (307): la
      // página sigue en src/app/faqs para cuando vuelva.
      {
        source: "/faqs",
        destination: "/contacto",
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
  },
};

export default nextConfig;
