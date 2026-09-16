import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { LienzoDiseno } from "@/components/layout/lienzo-diseno";
import { FloatingCta } from "@/components/layout/floating-cta";

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
  // El despliegue manda sobre el dominio de produccion: en un preview el
  // canonical y las OG deben apuntar al propio preview, no a abogadovernal.com.
  // `||` y no `??`: la variable llega como cadena vacia cuando no se define,
  // y `new URL("")` lanza.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
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
  // Se bloquea la indexación salvo que alguien la habilite A PROPÓSITO con
  // NEXT_PUBLIC_NOINDEX="false". La comparación va al reves adrede: si la
  // variable falta —despliegue nuevo, plataforma distinta, alguien que la
  // olvida— el resultado es no indexar. Es el sitio de un despacho real y una
  // URL provisional suya no debe competir en Google con la definitiva.
  ...(process.env.NEXT_PUBLIC_NOINDEX !== "false"
    ? { robots: { index: false, follow: false } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased">
        <LienzoDiseno>
          {children}
          <FloatingCta />
          {/* En móvil el CTA es una barra fija de 99px: este hueco evita que
              tape el final del footer. */}
          <div aria-hidden className="hidden h-[99px] bg-[#0F0F0F] movil:block" />
        </LienzoDiseno>
        {/*
          El lienzo se maqueta a 1920 y se escala para caber en la ventana. Esa
          escala se calcula en un efecto, o sea despues de hidratar: sin este
          script se veria un fogonazo con la maqueta a 1920 desbordada.

          Va DESPUES del div a proposito. Un script en linea corre en cuanto el
          parser lo encuentra, asi que si fuera antes el div todavia no existiria.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var v=window.innerWidth,w=document.documentElement.clientWidth," +
              "e=document.currentScript.previousElementSibling;if(!e)return;" +
              "if(v>=1280){e.className='modo-diseno';e.style.width='1920px';" +
              "var z=Math.min(1,w/1920);e.style.zoom=z;e.style.setProperty('--escala',z);}" +
              "else if(v<=560){e.className='modo-movil';e.style.width='402px';" +
              "e.style.zoom=w/402;}}catch(_){}})();",
          }}
        />
      </body>
    </html>
  );
}
