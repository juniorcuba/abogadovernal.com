"use client";

import Image from "next/image";
import { useState } from "react";
import { ListaPreguntas } from "@/components/ui/lista-preguntas";
import { preguntasFrecuentes } from "@/lib/preguntas";

/**
 * Cuerpo de /faqs — frame `770:625` de Figma, rango y=0..1738.
 *
 *   fondo    banda de 1923×1674 desde y128, VOLTEADA en horizontal
 *            (matrix(-1 0 0 1 1923 128) en el archivo): negro, la foto de la
 *            abogada al 18% (dibujada 2585×2052 en −662,−378) y
 *            linear-gradient(92.91°, negro 20.64% → transparente 69.50%).
 *            El volteo se aplica al contenedor, así que dentro las coordenadas
 *            son las del archivo (el ancho se recorta de 1923 a 1920, que es el
 *            lienzo). La banda acaba en 1802 y se mete 64px bajo el
 *            bloque "Agenda", cuyo banner tiene transparente esa franja.
 *   título   centrado, líneas base 256.9/323.9/390.9, Poppins 64/300; las dos
 *            primeras líneas en cian y las dos últimas en blanco
 *   entrada  x549 y448, caja de 820, 16/17 justificado
 *   lista    x239, 1441 de ancho, el acordeón (ver `ListaPreguntas`)
 *
 * Al abrirse una pregunta la fila crece de 109 a 193, así que la sección y su
 * banda de fondo crecen lo mismo: sin eso el degradado se quedaría corto.
 */
const ALTO = 1738;
const ALTO_BANDA = 1674;

export function FaqsPreguntas() {
  const [crecimiento, setCrecimiento] = useState(0);

  return (
    <section
      className="relative -mt-[128px] overflow-hidden bg-black design:h-[var(--alto)] design:overflow-visible design:transition-[height] design:duration-300 design:ease-out"
      style={{ "--alto": `${ALTO + crecimiento}px` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:top-[128px] design:h-[var(--banda)] design:w-[1920px] design:[transform:scaleX(-1)]"
        style={{ "--banda": `${ALTO_BANDA + crecimiento}px` } as React.CSSProperties}
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          priority
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] design:top-[-378px] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(92.91deg,#000000_20.64%,#00000000_69.50%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h1 className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] design:absolute design:top-[201px] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]">
          <span className="text-vernal-accent">
            Las dudas que más <br className="hidden design:inline" />
            escuchamos,
          </span>{" "}
          <span className="text-white">
            respondidas <br className="hidden design:inline" />
            con claridad.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify design:absolute design:top-[448px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ListaPreguntas
          preguntas={preguntasFrecuentes}
          onAlto={setCrecimiento}
          className="mt-10 design:top-[580px] design:mt-0"
        />
      </div>
    </section>
  );
}
