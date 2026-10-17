"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  EVENTO_CONSENTIMIENTO,
  hayConsentimiento,
  type Consentimiento,
} from "@/lib/consentimiento-cookies";

/**
 * Píxel de Meta (Facebook / Instagram) del despacho (lo pidió Roberto el
 * 2026-10-17). Funciona igual que `pixel-tiktok.tsx`:
 *
 * SOLO se carga si el visitante aceptó la categoría "Marketing" del panel de
 * cookies. Si la acepta más tarde, se carga en ese momento; si la retira, se le
 * dice a Meta que deje de medir (`fbq('consent', 'revoke')`).
 *
 * El código es el oficial de Meta, el mismo que pegaron, pasado a una función.
 * Se cuenta un PageView por cada cambio de página, porque el sitio no recarga
 * al navegar. El `<noscript>` con la imagen de seguimiento NO se pone: sin
 * JavaScript no hay forma de pedir el consentimiento y esa imagen mediría a
 * todo el mundo.
 *
 * No pinta nada en la página, a propósito (ver `pixel-tiktok.tsx`).
 */
const ID_PIXEL = "945221081712474";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/**
 * El snippet oficial de Meta, sin cambios de lógica. Lleva `any` a propósito:
 * es código del proveedor que se copia tal cual para no equivocarse al tiparlo,
 * y fuera de esta función todo va por el tipo `Fbq`.
 */
function cargarPixel() {
  if (window.fbq) return;
  /* eslint-disable */
  // prettier-ignore
  (function(f: any,b: Document,e: string,v: string,n?: any,t?: any,s?: any)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)})(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  // TypeScript cree que aquí sigue sin existir (por el return de arriba); el
  // snippet acaba de crearla.
  const fbq = window.fbq as Fbq | undefined;
  fbq?.("init", ID_PIXEL);
  fbq?.("track", "PageView");
}

export function PixelMeta() {
  const ruta = usePathname();
  const primera = useRef(true);

  // Cargar ahora si ya hay permiso, o cuando lo den.
  useEffect(() => {
    if (hayConsentimiento("marketing")) cargarPixel();
    const alDecidir = (e: Event) => {
      const c = (e as CustomEvent<Consentimiento>).detail;
      if (c.categorias.marketing) {
        cargarPixel();
        window.fbq?.("consent", "grant");
      } else {
        window.fbq?.("consent", "revoke");
      }
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alDecidir);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alDecidir);
  }, []);

  // Una vista por cada cambio de página (la primera ya la cuenta cargarPixel).
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (window.fbq && hayConsentimiento("marketing")) window.fbq("track", "PageView");
  }, [ruta]);

  return null;
}
