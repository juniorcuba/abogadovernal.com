"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ListaPreguntas } from "@/components/ui/lista-preguntas";
import { preguntasSede } from "@/lib/preguntas";

/**
 * Preguntas frecuentes de las sedes — banda y=3126..4337 de los artboards
 * "VERNAL - AREAS DE SERVICIO - <ciudad>" (1211 de alto, el fondo en espejo en
 * el lienzo de 402).
 *
 * Las filas SE DESPLIEGAN en el sitio (pedido de Roberto, 2026-10-11): antes
 * cada una llevaba a /faqs. El acordeón es el de /faqs (`ListaPreguntas`). Al
 * abrirse una fila crece de 109 a 193, y la sección y el botón bajan lo mismo.
 * En el lienzo de 402 la fila abierta no tiene alto fijo: la lista y el botón
 * van en el flujo y la sección crece sola (cerrada mide los 1192 del archivo).
 *
 * Va en su propio archivo porque necesita estado y `sede.tsx` es de servidor.
 */
const ALTO = 1211;
const BOTON = 1067;

export function SedePreguntas() {
  const [crecimiento, setCrecimiento] = useState(0);

  return (
    <section
      className="relative overflow-hidden bg-black design:h-[var(--alto)] design:transition-[height] design:duration-300 design:ease-out"
      style={{ "--alto": `${ALTO + crecimiento}px` } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 movil:w-[402px] movil:[transform:scaleX(-1)]">
        <Image
          src="/images/sedes/faq-fondo.webp"
          alt=""
          width={1923}
          height={1205}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] movil:inset-auto movil:top-[-99px] movil:left-[-841px] movil:h-[1423px] movil:w-[1792px] movil:max-w-none movil:object-fill design:inset-auto design:top-0 design:left-0 design:h-[1205px] design:w-[1923px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(265.98deg,#000000_20.64%,#00000000_69.50%)] movil:bg-[linear-gradient(165.95deg,#000000_11.90%,#00000000_35.49%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:max-w-none movil:px-0 movil:pt-[389px] movil:pb-[90px] design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[34px] leading-[40px] font-light movil:absolute movil:top-[52px] movil:left-[47px] movil:w-[320px] movil:text-left movil:text-[32px] movil:leading-[33px] sm:text-[48px] sm:leading-[52px] design:absolute design:top-[91px] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]">
          <span className="movil:hidden">
            <span className="text-vernal-accent">
              Las dudas que más <br className="hidden design:inline" />
              escuchamos,
            </span>{" "}
            <span className="text-white">
              respondidas <br className="hidden design:inline" />
              con claridad.
            </span>
          </span>
          <span className="hidden movil:block">
            <span className="text-vernal-accent">
              Las dudas que <br />
              más escuchamos,
            </span>{" "}
            <span className="text-white">
              respondidas con <br />
              claridad.
            </span>
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify movil:absolute movil:top-[216px] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[338px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ListaPreguntas
          preguntas={preguntasSede}
          onAlto={setCrecimiento}
          className="mt-10 movil:mx-[33px] movil:mt-0 movil:border-b-0 design:top-[449px] design:mt-0"
        />

        <div
          className="mt-10 flex justify-center movil:mt-[51px] movil:ml-[62px] movil:block design:absolute design:top-[var(--boton)] design:left-[821px] design:mt-0 design:block design:transition-[top] design:duration-300 design:ease-out"
          style={{ "--boton": `${BOTON + crecimiento}px` } as React.CSSProperties}
        >
          <Link
            href="/faqs"
            className="bg-vernal-accent text-vernal-navy inline-flex h-[52px] w-[277px] items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90"
          >
            Ver más preguntas
          </Link>
        </div>
      </div>
    </section>
  );
}
