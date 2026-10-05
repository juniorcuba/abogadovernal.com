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
 * En el lienzo de 402 ("VESPER AGENCY LANDING - MOBILE (8)", filas de x33 a
 * x369) cambia casi todo:
 *
 *   fila cerrada  `altoMovil` (122, salvo 115, 113 y 126)
 *   pregunta      18/300 blanca, x42, interlineado 19, caja de 210, colocada a
 *                 mano fila por fila (`arribaMovil`)
 *   derecha       caja de 90 centrada en x312, 16/500: cerrada el rótulo parte
 *                 en "Ver / respuesta" y lleva el "+" debajo; abierta pone
 *                 "Cerrar" y un aspa de 13. Queda pegada abajo, con 21.5 de
 *                 margen inferior.
 *   respuesta     15/400 cian, x42, interlineado 16, justificada, caja de 300, a +121 del
 *                 borde de la fila y con 33 por debajo
 *
 * Solo hay una abierta a la vez, que es como lo enseña el archivo. Al abrirse,
 * la fila crece y la página se estira: de ahí `onAlto`, para que la sección que
 * la contiene ajuste su alto en el lienzo de 1920, donde todo va a medida. En
 * móvil no hace falta, porque allí la fila abierta no tiene alto fijo.
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
      className={`border-b border-white movil:w-[336px] design:absolute design:left-[239px] design:w-[1441px] ${className}`}
    >
      {preguntas.map((p, i) => {
        const abiertaEsta = abierta === i;
        const arriba = p.arriba ?? 44;
        const alto = abiertaEsta ? ALTO_ABIERTA : (p.alto ?? 109);
        return (
          <li
            key={p.texto}
            className="relative border-t border-white movil:h-[var(--amov)] design:block design:h-[var(--alto)] design:transition-[height] design:duration-300 design:ease-out"
            style={
              {
                "--alto": `${alto}px`,
                // Abierta, en móvil manda la respuesta: 121 de hueco, los
                // renglones que salgan y 33 por debajo.
                "--amov": abiertaEsta ? "auto" : `${p.altoMovil}px`,
                "--cabmov": `${p.altoMovil}px`,
                "--qmov": `${p.arribaMovil}px`,
                // La columna derecha queda pegada abajo con 21.5 de margen.
                "--rcmov": abiertaEsta ? "29px" : `${p.altoMovil - 92}px`,
              } as React.CSSProperties
            }
          >
            {/* En el lienzo de 1920 todo lo de dentro va posicionado, así que el
                botón se queda sin alto: se le da el de la fila cerrada, que es
                la parte que se pulsa. */}
            <button
              type="button"
              aria-expanded={abiertaEsta}
              aria-controls={`respuesta-${i}`}
              onClick={() => alternar(i)}
              className="flex w-full cursor-pointer flex-col gap-y-2 py-5 text-left sm:flex-row sm:items-center sm:justify-between movil:absolute movil:top-0 movil:left-0 movil:block movil:h-[var(--cabmov)] movil:py-0 design:absolute design:top-0 design:left-0 design:block design:h-[var(--cab)] design:py-0"
              style={{ "--cab": `${p.alto ?? 109}px` } as React.CSSProperties}
            >
              <span
                className="text-[20px] leading-[24px] font-light text-white movil:absolute movil:top-[var(--qmov)] movil:left-[9px] movil:w-[210px] movil:text-[18px] movil:leading-[19px] design:absolute design:top-[var(--a)] design:left-[38px] design:text-[24px] design:leading-[25px]"
                style={{ "--a": `${arriba}px` } as React.CSSProperties}
              >
                {p.texto}
              </span>
              <span
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium movil:absolute movil:top-[var(--rcmov)] movil:left-[234px] movil:block movil:w-[90px] movil:gap-x-0 movil:text-center movil:text-[16px] movil:leading-[17px] design:contents design:text-[20px]"
                style={
                  {
                    "--a": `${arriba}px`,
                    "--mas": `${arriba - 10.5}px`,
                  } as React.CSSProperties
                }
              >
                {/* El artboard de 1920 deja el rótulo en "Ver respuesta" también
                    con la fila abierta; quien indica que se cierra es el aspa.
                    El de 402, en cambio, lo cambia por "Cerrar". */}
                <span className="movil:hidden design:absolute design:top-[var(--a)] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span className="hidden movil:block">
                  {abiertaEsta ? "Cerrar" : "Ver respuesta"}
                </span>
                <span
                  aria-hidden
                  className={`inline-block origin-center text-[34px] leading-none font-light transition-transform duration-300 ease-out movil:absolute movil:top-[38.5px] movil:left-0 movil:w-full movil:text-[32px] movil:leading-[32px] design:absolute design:top-[var(--mas)] design:left-[1364px] design:text-[41px] design:leading-[42px] ${
                    abiertaEsta ? "rotate-[-45deg] movil:hidden" : ""
                  }`}
                >
                  +
                </span>
                {/* Abierta, el lienzo de 402 no gira el "+": pone un aspa de 13. */}
                {abiertaEsta && (
                  <svg
                    aria-hidden
                    viewBox="307 573 13 13"
                    className="hidden fill-current movil:absolute movil:top-[30px] movil:left-[40px] movil:block movil:h-[13px] movil:w-[13px]"
                  >
                    <path d="M319.955 574.402L314.913 579.443L320 584.53L318.53 586L313.443 580.913L308.424 585.932L307.068 584.576L312.087 579.557L307 574.47L308.47 573L313.557 578.087L318.598 573.045L319.955 574.402Z" />
                  </svg>
                )}
              </span>
            </button>

            {/* Fuera del lienzo de 1920 la fila no tiene alto fijo: la respuesta
                se abre con la rejilla de 0fr a 1fr, que sí se puede animar. */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out movil:contents design:contents ${
                abiertaEsta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden movil:contents design:contents">
                <p
                  id={`respuesta-${i}`}
                  className={`text-vernal-accent pb-5 text-[16px] leading-[20px] movil:ml-[9px] movil:w-[300px] movil:pt-[121px] movil:pb-[33px] movil:text-[15px] movil:leading-[16px] movil:text-justify design:left-[58px] design:w-[987px] design:pb-0 design:text-justify design:text-[20px] design:leading-[21px] ${
                    abiertaEsta
                      ? "movil:block design:absolute design:top-[var(--r)] design:block"
                      : "movil:hidden design:hidden"
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
