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
};

export default nextConfig;
