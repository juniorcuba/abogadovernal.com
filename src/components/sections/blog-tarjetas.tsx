"use client";

import { useState } from "react";
import { TarjetaArticulo } from "@/components/sections/tarjeta-articulo";
import { topTitulo, type EntradaBlog } from "@/lib/blog";

/**
 * Las tarjetas de /blog y su botón "Cargar más".
 *
 * El archivo dibuja seis tarjetas (dos filas de tres) y el botón debajo. Aquí se
 * enseñan de seis en seis: el botón solo sale si quedan artículos por enseñar,
 * y cada pulsación añade otros seis. Con seis o menos no hay botón.
 *
 * Como las tarjetas van colocadas a mano sobre el lienzo, el alto de la banda
 * sale de cuántas filas hay a la vista:
 *
 *   1920  filas cada 618 desde y257.5, tarjeta de 575; el botón 69.5 bajo la
 *         última fila y 64 de aire tras él (los 1636 del archivo con dos filas).
 *         Sin botón quedan 100 bajo la última fila.
 *   402   una por fila; las seis primeras en la y del archivo y las siguientes
 *         cada 470; el botón 37 bajo la última y 57 tras él (los 3351 del
 *         archivo). Sin botón quedan 60.
 */
const PASO = 6;

/** x de cada columna y y del título de las seis tarjetas del archivo. */
const COLUMNAS = [252.5, 740.5, 1228.5];
const TITULOS = [248.4, 265.4, 268.4, 275.4, 275.4, 280.4];

/** y de las seis tarjetas del archivo en el lienzo de 402; todas a x23. */
const TARJETAS_MOVIL = [410, 876, 1348, 1820, 2286, 2758];

const topMovil = (i: number) =>
  i < TARJETAS_MOVIL.length ? TARJETAS_MOVIL[i] : TARJETAS_MOVIL[5] + (i - 5) * 470;

export function BlogTarjetas({ entradas }: { entradas: EntradaBlog[] }) {
  const [visibles, setVisibles] = useState(PASO);
  const lista = entradas.slice(0, visibles);
  const quedan = entradas.length > visibles;

  const filas = Math.max(1, Math.ceil(lista.length / 3));
  const fin = 257.5 + (filas - 1) * 618 + 575;
  const finMovil = topMovil(Math.max(0, lista.length - 1)) + 447;

  return (
    <div
      className="movil:h-[var(--mh)] design:h-[var(--h)]"
      style={
        {
          "--h": `${fin + (quedan ? 185.5 : 100)}px`,
          "--mh": `${finMovil + (quedan ? 146 : 60)}px`,
          "--bt": `${fin + 69.5}px`,
          "--mbt": `${finMovil + 37}px`,
        } as React.CSSProperties
      }
    >
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:w-full design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
        {lista.map((e, i) => {
          const titulo = topTitulo(e.titulo, TITULOS[i] ?? 268.4);
          return (
            <TarjetaArticulo
              key={e.slug}
              entrada={e}
              arriba={titulo}
              icono={{ left: 40.5, top: titulo - 51 }}
              id={`blog-trazo-${i}`}
              className="movil:absolute movil:top-[var(--mt)] movil:left-[23px] design:top-[var(--t)] design:left-[var(--l)]"
              estilo={
                {
                  "--t": `${257.5 + Math.floor(i / 3) * 618}px`,
                  "--l": `${COLUMNAS[i % 3]}px`,
                  "--mt": `${topMovil(i)}px`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </ul>

      {quedan && (
        <div className="mt-10 flex justify-center movil:absolute movil:top-[var(--mbt)] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[var(--bt)] design:left-[821px] design:mt-0 design:block">
          <button
            type="button"
            onClick={() => setVisibles((n) => n + PASO)}
            className="bg-vernal-navy text-vernal-accent flex h-[52px] w-full cursor-pointer items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px] movil:w-[277px] design:w-[277px]"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}
