"use client";

import { abrirPanelCookies } from "@/lib/consentimiento-cookies";

/**
 * Abre el panel de preferencias de cookies. No está en el diseño: hace falta
 * porque el aviso promete poder cambiarlas "en cualquier momento", y para eso
 * tiene que haber una puerta visible desde cualquier página.
 */
export function BotonPreferenciasCookies({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={abrirPanelCookies} className={`cursor-pointer ${className}`}>
      Preferencias de cookies
    </button>
  );
}
