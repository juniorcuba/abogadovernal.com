"use client";

import { abrirPanelCookies } from "@/lib/consentimiento-cookies";
import { useT } from "@/lib/i18n/cliente";

/**
 * Abre el panel de preferencias de cookies. No está en el diseño: hace falta
 * porque el aviso promete poder cambiarlas "en cualquier momento", y para eso
 * tiene que haber una puerta visible desde cualquier página.
 */
export function BotonPreferenciasCookies({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <button type="button" onClick={abrirPanelCookies} className={`cursor-pointer ${className}`}>
      {t("Preferencias de cookies")}
    </button>
  );
}
