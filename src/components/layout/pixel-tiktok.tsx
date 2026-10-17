"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  EVENTO_CONSENTIMIENTO,
  hayConsentimiento,
  type Consentimiento,
} from "@/lib/consentimiento-cookies";

/**
 * Píxel de TikTok del despacho (lo pidió Roberto el 2026-10-17).
 *
 * SOLO se carga si el visitante aceptó la categoría "Marketing" del panel de
 * cookies: el aviso promete que sin aceptación expresa no se carga nada de
 * publicidad. Si la acepta más tarde, se carga en ese momento; si la retira, se
 * le dice a TikTok que deje de medir (`revokeConsent`). Un script que ya cargó
 * no se puede descargar, pero deja de enviar.
 *
 * El código del píxel es el oficial de TikTok, el mismo que pegaron, pasado a
 * una función. Además se avisa a TikTok de cada cambio de página: el sitio no
 * recarga al navegar y el `ttq.page()` del código original solo contaría la
 * primera.
 *
 * No pinta nada en la página, a propósito: en el layout va junto al script que
 * escala el lienzo, que depende del orden de los elementos.
 *
 * OJO: la política de privacidad debería nombrar a TikTok entre los terceros
 * que reciben datos. Está pendiente de que el despacho lo confirme.
 */
const ID_PIXEL = "DB7S3N3C77U45L31JKH0";

type Ttq = {
  page: () => void;
  load: (id: string, opciones?: unknown) => void;
  revokeConsent?: () => void;
  grantConsent?: () => void;
};

declare global {
  interface Window {
    ttq?: Ttq;
    TiktokAnalyticsObject?: string;
  }
}

/**
 * El snippet oficial de TikTok, sin cambios de lógica. Lleva `any` a propósito:
 * es código del proveedor que se copia tal cual para no equivocarse al tiparlo,
 * y fuera de esta función todo va por el tipo `Ttq`.
 */
function cargarPixel() {
  if (window.ttq) return;
  /* eslint-disable */
  // prettier-ignore
  (function (w: any, d: Document, t: string) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t: any,e: any){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t: any){for(
    var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e: any,n: any){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script")
    ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
    ttq.load(ID_PIXEL);
    ttq.page();
  })(window, document, "ttq");
  /* eslint-enable */
}

export function PixelTiktok() {
  const ruta = usePathname();
  const primera = useRef(true);

  // Cargar ahora si ya hay permiso, o cuando lo den.
  useEffect(() => {
    if (hayConsentimiento("marketing")) cargarPixel();
    const alDecidir = (e: Event) => {
      const c = (e as CustomEvent<Consentimiento>).detail;
      if (c.categorias.marketing) {
        cargarPixel();
        window.ttq?.grantConsent?.();
      } else {
        window.ttq?.revokeConsent?.();
      }
    };
    window.addEventListener(EVENTO_CONSENTIMIENTO, alDecidir);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alDecidir);
  }, []);

  // Una vista por cada cambio de página (la primera ya la cuenta el snippet).
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (window.ttq && hayConsentimiento("marketing")) window.ttq.page();
  }, [ruta]);

  return null;
}
