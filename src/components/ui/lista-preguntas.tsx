"use client";

import { useState } from "react";
import {
  ALTO_ABIERTA,
  type PreguntaFrecuente,
  type TrozoRespuesta,
} from "@/lib/preguntas";

/**
 * El acordeón de preguntas frecuentes, tal como lo definen los estados "FAQ 10"
 * a "FAQ 19" del frame `770:2776`:
 *
 *   fila cerrada  109 (la sexta, 105) · fila abierta 193, siempre
 *   pregunta      24/300 blanca a +44 (la sexta, +40)
 *   respuesta     20/400 cian, x58, caja de 987 justificada, interlineado 21
 *   el "+"        gira −45° y se convierte en aspa
 *
 * Solo hay una abierta a la vez, que es como lo enseña el archivo. Al abrirse,
 * la fila crece y la página se estira: de ahí `onAlto`, para que la sección que
 * la contiene ajuste su alto en el lienzo de 1920, donde todo va a medida.
 */
export function ListaPreguntas({
  preguntas,
  onAlto,
  className = "",
}: {
  preguntas: PreguntaFrecuente[];
  /** Cuánto crece la lista respecto a tenerlas todas cerradas. */
  onAlto?: (crecimiento: number) => void;
  className?: string;
}) {
  const [abierta, setAbierta] = useState<number | null>(null);

  const alternar = (i: number) => {
    const nueva = abierta === i ? null : i;
    setAbierta(nueva);
    onAlto?.(nueva === null ? 0 : ALTO_ABIERTA - (preguntas[nueva].alto ?? 109));
  };

  return (
    <ul
      className={`border-b border-white design:absolute design:left-[239px] design:w-[1441px] ${className}`}
    >
      {preguntas.map((p, i) => {
        const abiertaEsta = abierta === i;
        const arriba = p.arriba ?? 44;
        const alto = abiertaEsta ? ALTO_ABIERTA : (p.alto ?? 109);
        return (
          <li
            key={p.texto}
            className="relative border-t border-white design:block design:h-[var(--alto)] design:transition-[height] design:duration-300 design:ease-out"
            style={{ "--alto": `${alto}px` } as React.CSSProperties}
          >
            {/* En el lienzo de 1920 todo lo de dentro va posicionado, así que el
                botón se queda sin alto: se le da el de la fila cerrada, que es
                la parte que se pulsa. */}
            <button
              type="button"
              aria-expanded={abiertaEsta}
              aria-controls={`respuesta-${i}`}
              onClick={() => alternar(i)}
              className="flex w-full cursor-pointer flex-col gap-y-2 py-5 text-left sm:flex-row sm:items-center sm:justify-between design:absolute design:top-0 design:left-0 design:block design:h-[var(--cab)] design:py-0"
              style={{ "--cab": `${p.alto ?? 109}px` } as React.CSSProperties}
            >
              <span
                className="text-[20px] leading-[24px] font-light text-white design:absolute design:top-[var(--a)] design:left-[38px] design:text-[24px] design:leading-[25px]"
                style={{ "--a": `${arriba}px` } as React.CSSProperties}
              >
                {p.texto}
              </span>
              <span
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium design:contents design:text-[20px]"
                style={
                  {
                    "--a": `${arriba}px`,
                    "--mas": `${arriba - 10.5}px`,
                  } as React.CSSProperties
                }
              >
                {/* El archivo deja el rótulo en "Ver respuesta" también con la
                    fila abierta; quien indica que se cierra es el aspa. */}
                <span className="design:absolute design:top-[var(--a)] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span
                  aria-hidden
                  className={`inline-block origin-center text-[34px] leading-none font-light transition-transform duration-300 ease-out design:absolute design:top-[var(--mas)] design:left-[1364px] design:text-[41px] design:leading-[42px] ${
                    abiertaEsta ? "rotate-[-45deg]" : ""
                  }`}
                >
                  +
                </span>
              </span>
            </button>

            {/* Fuera del lienzo de 1920 la fila no tiene alto fijo: la respuesta
                se abre con la rejilla de 0fr a 1fr, que sí se puede animar. */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out design:contents ${
                abiertaEsta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden design:contents">
                <p
                  id={`respuesta-${i}`}
                  className={`text-vernal-accent pb-5 text-[16px] leading-[20px] design:left-[58px] design:w-[987px] design:pb-0 design:text-justify design:text-[20px] design:leading-[21px] ${
                    abiertaEsta
                      ? "design:absolute design:top-[var(--r)] design:block"
                      : "design:hidden"
                  }`}
                  style={{ "--r": `${p.respuestaArriba - 17.5}px` } as React.CSSProperties}
                >
                  {p.respuesta.map((trozo, j) => (
                    <Trozo key={j} trozo={trozo} />
                  ))}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Trozo({ trozo }: { trozo: TrozoRespuesta }) {
  if (typeof trozo === "string") return <>{trozo}</>;
  return (
    <a href={`mailto:${trozo.correo}`} className="underline underline-offset-2">
      {trozo.correo}
    </a>
  );
}
