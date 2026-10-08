"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CATEGORIAS,
  EVENTO_ABRIR_PANEL,
  NINGUNA,
  TODAS,
  guardarConsentimiento,
  leerConsentimiento,
  type Categorias,
  type Consentimiento,
} from "@/lib/consentimiento-cookies";

/**
 * Aviso de cookies — export SVG del 2026-09-13, bajo la cabecera de 1920.
 *
 *   barra    x2 y128  1917×63  negro, superpuesta al hero (no empuja nada)
 *   texto    x223  Poppins 10/400 blanco, justificado, líneas base 152.5 y 164.5
 *                  (en el export del 2026-09-13 era de 12 y rompía en otro sitio)
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
 * **El panel de preferencias NO está en el diseño.** El texto del aviso promete
 * "configurar tus preferencias en cualquier momento", así que hace falta: va con
 * los colores y la tipografía del archivo, pero la composición es de oficio.
 * El tercer botón del aviso y el enlace del pie también son añadidos nuestros.
 */
export function AvisoCookies() {
  // null mientras no se ha leído el navegador: no se pinta nada todavía.
  const [decidido, setDecidido] = useState<boolean | null>(null);
  const [panel, setPanel] = useState(false);
  const [marcadas, setMarcadas] = useState<Categorias>(NINGUNA);
  const titulo = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const guardado = leerConsentimiento();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDecidido(guardado !== null);
    if (guardado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMarcadas(guardado.categorias);
    }
  }, []);

  // El pie y la política abren el panel lanzando un evento.
  useEffect(() => {
    const abrir = () => {
      setMarcadas(leerConsentimiento()?.categorias ?? NINGUNA);
      setPanel(true);
    };
    window.addEventListener(EVENTO_ABRIR_PANEL, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_PANEL, abrir);
  }, []);

  // Con el panel abierto: foco dentro, Escape para salir y fondo quieto.
  useEffect(() => {
    if (!panel) return;
    titulo.current?.focus();
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(false);
    };
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", tecla);
    };
  }, [panel]);

  const decidir = useCallback(
    (origen: Consentimiento["origen"], categorias?: Categorias) => {
      guardarConsentimiento(origen, categorias);
      setDecidido(true);
      setPanel(false);
    },
    [],
  );

  if (decidido === null) return null;

  return (
    <>
      {!decidido && !panel && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[90] flex flex-col gap-y-3 bg-black px-5 py-4 text-white sm:flex-row sm:items-center sm:gap-x-6 sm:px-8 design:absolute design:top-[128px] design:bottom-auto design:left-[2px] design:block design:h-[63px] design:w-[1917px] design:p-0"
        >
          <p className="max-w-[860px] text-[12px] leading-[14px] design:absolute design:top-[15px] design:left-[221px] design:w-[782px] design:max-w-none design:text-[10px] design:leading-[12px] design:text-justify">
            Usamos cookies propias y de terceros para mejorar tu experiencia de
            navegación, analizar el tráfico del sitio y mostrarte contenido
            personalizado. Puedes aceptar todas las cookies, rechazarlas o configurar
            tus preferencias en cualquier momento.
          </p>

          <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2 sm:ml-auto design:contents">
            <button
              type="button"
              onClick={() => decidir("aceptar", TODAS)}
              className="bg-vernal-accent flex h-[26px] w-[109px] shrink-0 cursor-pointer items-start justify-center pt-[3px] text-[16px] leading-[17px] text-black transition-opacity hover:opacity-90 design:absolute design:top-[19px] design:left-[1356px]"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => decidir("rechazar", NINGUNA)}
              className="bg-vernal-accent flex h-[26px] w-[109px] shrink-0 cursor-pointer items-start justify-center pt-[3px] text-[16px] leading-[17px] text-black transition-opacity hover:opacity-90 design:absolute design:top-[19px] design:left-[1487px]"
            >
              Rechazar
            </button>
            {/* Tercer botón, que el archivo no trae: sin él la frase de arriba
                sería mentira. Se mete entre "Rechazar" y la X. */}
            <button
              type="button"
              onClick={() => setPanel(true)}
              className="text-vernal-accent shrink-0 cursor-pointer text-[14px] leading-[17px] underline underline-offset-2 transition-opacity hover:opacity-90 design:absolute design:top-[23px] design:left-[1612px] design:text-[13px]"
            >
              Configurar
            </button>
            <button
              type="button"
              onClick={() => decidir("cerrar", NINGUNA)}
              aria-label="Cerrar el aviso de cookies (equivale a rechazar)"
              className="ml-auto flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center sm:ml-0 design:absolute design:top-[17px] design:left-[1712px] design:ml-0"
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
      )}

      {panel && <PanelCookies marcadas={marcadas} setMarcadas={setMarcadas} decidir={decidir} cerrar={() => setPanel(false)} titulo={titulo} />}
    </>
  );
}

function PanelCookies({
  marcadas,
  setMarcadas,
  decidir,
  cerrar,
  titulo,
}: {
  marcadas: Categorias;
  setMarcadas: (c: Categorias) => void;
  decidir: (origen: Consentimiento["origen"], categorias?: Categorias) => void;
  cerrar: () => void;
  titulo: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={cerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookies-titulo"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto bg-[#172339] px-6 py-7 text-white shadow-[0_0_40px_rgba(0,0,0,0.55)] sm:px-8 sm:py-8"
      >
        <div className="flex items-start justify-between gap-x-6">
          <h2
            id="cookies-titulo"
            ref={titulo}
            tabIndex={-1}
            className="text-[24px] leading-[28px] font-light outline-none sm:text-[28px] sm:leading-[32px]"
          >
            Preferencias de <span className="text-vernal-accent">cookies</span>
          </h2>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar las preferencias"
            className="flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center"
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

        <p className="mt-3 text-[14px] leading-[19px] text-white/75">
          Elige qué quieres permitir. Puedes volver a cambiarlo cuando quieras desde
          &laquo;Preferencias de cookies&raquo;, al final de cualquier página.
        </p>

        <ul className="mt-6 flex flex-col gap-y-4">
          {CATEGORIAS.map((c) => {
            const activa = c.fija || marcadas[c.id as "analitica" | "marketing"];
            return (
              <li key={c.id} className="border border-white/15 px-4 py-4">
                <label className={`flex items-start gap-x-4 ${c.fija ? "" : "cursor-pointer"}`}>
                  <input
                    type="checkbox"
                    id={`cookies-${c.id}`}
                    checked={activa}
                    disabled={c.fija}
                    onChange={(e) =>
                      setMarcadas({
                        ...marcadas,
                        [c.id]: e.target.checked,
                      } as Categorias)
                    }
                    className="accent-vernal-accent mt-[3px] h-[18px] w-[18px] shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-60"
                  />
                  <span className="min-w-0">
                    <span className="block text-[16px] leading-[20px] font-medium">
                      {c.titulo}
                      {c.fija && (
                        <span className="ml-2 align-middle text-[11px] leading-[14px] font-normal text-white/50 uppercase">
                          Siempre activas
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[18px] text-white/70">
                      {c.texto}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => decidir("guardar", marcadas)}
            className="bg-vernal-accent text-vernal-navy h-[48px] shrink-0 cursor-pointer px-2 sm:flex-[1.6] text-[16px] leading-[17px] font-medium whitespace-nowrap transition-opacity hover:opacity-90"
          >
            Guardar preferencias
          </button>
          <button
            type="button"
            onClick={() => decidir("aceptar", TODAS)}
            className="h-[48px] shrink-0 cursor-pointer border border-white/30 text-[16px] leading-[17px] transition-colors hover:bg-white/10 sm:flex-1"
          >
            Aceptar todas
          </button>
          <button
            type="button"
            onClick={() => decidir("rechazar", NINGUNA)}
            className="h-[48px] shrink-0 cursor-pointer border border-white/30 text-[16px] leading-[17px] transition-colors hover:bg-white/10 sm:flex-1"
          >
            Rechazar todas
          </button>
        </div>
      </div>
    </div>
  );
}
