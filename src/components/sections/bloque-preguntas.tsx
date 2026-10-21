"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ListaPreguntas } from "@/components/ui/lista-preguntas";
import type { PreguntaFrecuente } from "@/lib/preguntas";
import { useT } from "@/lib/i18n/cliente";

/**
 * Banda de preguntas frecuentes. Aparece en /faqs (con las diez), y al cierre de
 * /testimoniales y /blog (con las cinco primeras). Siempre es la misma foto al
 * 18% sobre negro, VOLTEADA en horizontal, con su degradado, el titular
 * centrado, la entradilla y las filas de 109 separadas por un trazo blanco.
 *
 * Cambian de una página a otra el alto, la y de la foto, el ángulo del
 * degradado y las posiciones; por eso van por props.
 *
 * Las filas SE DESPLIEGAN en el sitio (pedido de Roberto, 2026-10-11): antes
 * cada una llevaba a /faqs. El acordeón es el de /faqs (`ListaPreguntas`). El
 * archivo cierra la banda con todas cerradas; al abrirse una, la fila crece de
 * 109 a 193 y la sección, su fondo y el botón bajan lo mismo.
 *
 * En el lienzo de 402 la banda es la misma en todas partes: 1192 de alto, la
 * foto dibujada 1792×1423 en (−841, −99), el título a +52 en x47, la
 * entradilla a +216 en x42, las filas de 122 a +389 (x33, 336 de ancho) y el
 * botón a +1050 en x62. Ahí la fila abierta no tiene alto fijo, así que la
 * lista y el botón van en el flujo y la sección crece sola.
 */

/** Geometría de la banda en el lienzo de 402. */
const MOVIL = { titulo: 52, entrada: 216 };

export function BloquePreguntas({
  preguntas,
  alto,
  fotoArriba,
  gradiente,
  tops,
  boton,
  bandaArriba = 0,
  className = "",
}: {
  preguntas: PreguntaFrecuente[];
  alto: number;
  /** y de la foto dentro de la banda (el archivo la sube para encuadrarla). */
  fotoArriba: number;
  gradiente: string;
  tops: { titulo: number; entrada: number; lista: number; boton?: number };
  boton?: { texto: string; href: string };
  /** y donde empieza la banda oscura dentro de la sección. */
  bandaArriba?: number;
  className?: string;
}) {
  const t = useT();
  const [crecimiento, setCrecimiento] = useState(0);
  const altoAhora = alto + crecimiento;

  return (
    <section
      className={`relative overflow-hidden bg-black design:h-[var(--alto)] design:transition-[height] design:duration-300 design:ease-out ${className}`}
      style={{ "--alto": `${altoAhora}px` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden movil:w-[402px] movil:[transform:scaleX(-1)] design:top-[var(--bt)] design:h-[var(--bh)] design:w-[1920px] design:[transform:scaleX(-1)]"
        style={
          {
            "--bt": `${bandaArriba}px`,
            "--bh": `${altoAhora - bandaArriba}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] movil:inset-auto movil:top-[-99px] movil:left-[-841px] movil:h-[1423px] movil:w-[1792px] movil:max-w-none movil:object-fill design:top-[var(--fy)] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
          style={{ "--fy": `${fotoArriba}px` } as React.CSSProperties}
        />
        {/* El degradado cambia por página; el del lienzo de 402 es el mismo
            en todas, así que va aparte. */}
        <div className="absolute inset-0 movil:hidden" style={{ backgroundImage: gradiente }} />
        <div className="absolute inset-0 hidden movil:block movil:bg-[linear-gradient(165.95deg,#000000_11.90%,#00000000_35.49%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:max-w-none movil:px-0 movil:pt-[389px] movil:pb-[90px] design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h2
          className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] movil:absolute movil:top-[var(--tm)] movil:left-[47px] movil:w-[320px] movil:text-left movil:text-[32px] movil:leading-[33px] design:absolute design:top-[var(--t)] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]"
          style={
            {
              "--t": `${tops.titulo}px`,
              "--tm": `${MOVIL.titulo}px`,
            } as React.CSSProperties
          }
        >
          <span className="movil:hidden">
            <span className="text-vernal-accent">
              {t("Las dudas que más ")}<br className="hidden design:inline" />
              {t("escuchamos,")}
            </span>{" "}
            <span className="text-white">
              {t("respondidas ")}<br className="hidden design:inline" />
              {t("con claridad.")}
            </span>
          </span>
          <span className="hidden movil:block">
            <span className="text-vernal-accent">
              {t("Las dudas que ")}<br />
              {t("más escuchamos,")}
            </span>{" "}
            <span className="text-white">
              {t("respondidas con ")}<br />
              {t("claridad.")}
            </span>
          </span>
        </h2>

        <p
          className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify movil:absolute movil:top-[var(--tm)] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[var(--t)] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]"
          style={
            {
              "--t": `${tops.entrada}px`,
              "--tm": `${MOVIL.entrada}px`,
            } as React.CSSProperties
          }
        >
          {t("Cada semana, en nuestras oficinas escuchamos las mismas preguntas una y otra vez señal de que hay información que no siempre es fácil de encontrar, o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra comunidad, explicadas de forma simple y directa.")}
        </p>

        <ListaPreguntas
          preguntas={preguntas}
          onAlto={setCrecimiento}
          className="mt-10 movil:mx-[33px] movil:mt-0 movil:border-b-0 design:top-[var(--t)] design:mt-0"
          style={{ "--t": `${tops.lista}px` } as React.CSSProperties}
        />

        {boton && tops.boton !== undefined && (
          <div
            className="mt-10 flex justify-center movil:mt-[51px] movil:ml-[62px] movil:block design:absolute design:top-[var(--t)] design:left-[821px] design:mt-0 design:block design:transition-[top] design:duration-300 design:ease-out"
            style={
              {
                "--t": `${tops.boton + crecimiento}px`,
              } as React.CSSProperties
            }
          >
            <ButtonLink href={boton.href} className="w-full sm:w-[277px] apilada:w-[277px] movil:w-[277px]">
              {boton.texto}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
