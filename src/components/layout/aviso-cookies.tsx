"use client";

import { useEffect, useState } from "react";
import {
  guardarConsentimiento,
  leerConsentimiento,
  type Consentimiento,
} from "@/lib/consentimiento-cookies";

/**
 * Aviso de cookies — export SVG del 2026-09-13, bajo la cabecera de 1920.
 *
 *   barra    x2 y128  1917×63  negro, superpuesta al hero (no empuja nada)
 *   texto    x223  Poppins 12/400 blanco, justificado, líneas base 154.2 y 168.2
 *   Aceptar  x1358 y147  109×26  #08B6FF, texto 16/400 negro centrado
 *   Rechazar x1489 y147  109×26
 *   cerrar   X de 14×14 en x1622 y153, dos trazos de 2 en #08B6FF con punta redonda
 *
 * Solo el lienzo de 1920 lo trae. En el móvil y en las medidas intermedias va
 * como barra fija abajo, con el mismo texto y los mismos botones: eso es criterio
 * propio, pero el aviso no puede faltar en ningún tamaño.
 *
 * No se pinta en el servidor: sin leer el navegador no se sabe si ya se decidió,
 * y pintarlo para luego quitarlo sería un parpadeo a todos los que ya eligieron.
 *
 * El texto dice "configurar tus preferencias", pero el diseño no trae ningún
 * panel para hacerlo. Queda pendiente decidir si se añade o se cambia el texto.
 */
export function AvisoCookies() {
  const [pendiente, setPendiente] = useState(false);

  useEffect(() => {
    // Leer el navegador solo puede hacerse después de montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendiente(leerConsentimiento() === null);
  }, []);

  if (!pendiente) return null;

  const decidir = (origen: Consentimiento["origen"]) => {
    guardarConsentimiento(origen);
    setPendiente(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[90] flex flex-col gap-y-3 bg-black px-5 py-4 text-white sm:flex-row sm:items-center sm:gap-x-6 sm:px-8 design:absolute design:top-[128px] design:bottom-auto design:left-[2px] design:block design:h-[63px] design:w-[1917px] design:p-0"
    >
      <p className="max-w-[860px] text-[12px] leading-[14px] design:absolute design:top-[15px] design:left-[221px] design:w-[857px] design:max-w-none design:text-justify">
        Usamos cookies propias y de terceros para mejorar tu experiencia de
        navegación, analizar el tráfico del sitio y mostrarte contenido
        personalizado. Puedes aceptar todas las cookies, rechazarlas o configurar
        tus preferencias en cualquier momento.
      </p>

      <div className="flex items-center gap-x-[22px] sm:ml-auto design:contents">
        <button
          type="button"
          onClick={() => decidir("aceptar")}
          className="bg-vernal-accent flex h-[26px] w-[109px] shrink-0 cursor-pointer items-start justify-center pt-[3px] text-[16px] leading-[17px] text-black transition-opacity hover:opacity-90 design:absolute design:top-[19px] design:left-[1356px]"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decidir("rechazar")}
          className="bg-vernal-accent flex h-[26px] w-[109px] shrink-0 cursor-pointer items-start justify-center pt-[3px] text-[16px] leading-[17px] text-black transition-opacity hover:opacity-90 design:absolute design:top-[19px] design:left-[1487px]"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decidir("cerrar")}
          aria-label="Cerrar el aviso de cookies (equivale a rechazar)"
          className="ml-auto flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center sm:ml-0 design:absolute design:top-[17px] design:left-[1612px] design:ml-0"
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M13.89 0.105L0 14M13.89 13.895L0 0"
              stroke="#08B6FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
