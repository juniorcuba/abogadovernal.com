import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/**
 * Poppins es la única familia del diseño. Pesos y estilos en uso confirmados:
 *   200 italic → aviso de consentimiento SMS (nodo 6:87)
 *   300        → subtítulo del hero (nodo 6:23)
 *   400        → nav, campos, "Chat en Vivo" (nodos 6:50, 6:40, 18:21)
 *   600        → h1 del hero, CTA (nodos 6:3, 95:2)
 *   700 italic → énfasis dentro del consentimiento (nodo 6:87)
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Abogado Vernal | Abogado de inmigración en Texas",
    template: "%s | Abogado Vernal",
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: site.url,
    siteName: site.name,
  },
  // En los despliegues de preview se bloquea la indexación: es el sitio de un
  // despacho real y no debe aparecer en Google desde una URL provisional.
  ...(process.env.NEXT_PUBLIC_NOINDEX === "true"
    ? { robots: { index: false, follow: false } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
