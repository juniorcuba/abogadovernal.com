"use client";

import Image from "next/image";
import { useState } from "react";
import { ListaPreguntas } from "@/components/ui/lista-preguntas";
import { preguntasSede } from "@/lib/preguntas";
import { useT } from "@/lib/i18n/cliente";

/**
 * Las cinco preguntas de /testimoniales — banda y=3487..4703 del frame
 * `453:469` (1216 de alto): la misma foto al 18% volteada, el titular a +91, la
 * entradilla a +338, las filas desde +449 y el botón a +1067.
 *
 * Es la banda de `BloquePreguntas`, pero aquí las filas SE DESPLIEGAN en el
 * sitio (pedido de Roberto, 2026-10-11) en vez de llevar a /faqs. El acordeón
 * es el de /faqs (`ListaPreguntas`), con sus mismas medidas de fila abierta.
 *
 * El archivo cierra la banda en 1216 con todas cerradas; al abrirse una fila
 * crece de 109 a 193, así que la sección, su fondo y el botón bajan lo mismo.
 *
 * En el lienzo de 402 la banda mide 1192: título a +52, entradilla a +216,
 * filas desde +389 y botón a +1050. Ahí la fila abierta no tiene alto fijo, de
 * modo que la lista y el botón van en el flujo y la sección crece sola.
 * El botón "Ver más preguntas" que cerraba la banda (y1067, a /faqs) se quitó
 * el 2026-10-12 con la página de preguntas, y la banda mide 90 menos.
 */
const ALTO = 1126;

export function TestimonialesPreguntas() {
  const t = useT();
  const [crecimiento, setCrecimiento] = useState(0);

  return (
    <section
      className="relative overflow-hidden bg-black design:h-[var(--alto)] design:transition-[height] design:duration-300 design:ease-out"
      style={{ "--alto": `${ALTO + crecimiento}px` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden movil:w-[402px] movil:[transform:scaleX(-1)] design:w-[1920px] design:[transform:scaleX(-1)]"
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] movil:inset-auto movil:top-[-99px] movil:left-[-841px] movil:h-[1423px] movil:w-[1792px] movil:max-w-none movil:object-fill design:top-[-781px] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(94.00deg,#000000_8.50%,#00000000_57.36%)] movil:bg-[linear-gradient(165.95deg,#000000_11.90%,#00000000_35.49%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:max-w-none movil:px-0 movil:pt-[389px] movil:pb-[90px] design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] movil:absolute movil:top-[52px] movil:left-[47px] movil:w-[320px] movil:text-left movil:text-[32px] movil:leading-[33px] design:absolute design:top-[91px] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]">
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

        <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify movil:absolute movil:top-[216px] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[338px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          {t("Cada semana, en nuestras oficinas escuchamos las mismas preguntas una y otra vez señal de que hay información que no siempre es fácil de encontrar, o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra comunidad, explicadas de forma simple y directa.")}
        </p>

        <ListaPreguntas
          preguntas={preguntasSede}
          onAlto={setCrecimiento}
          className="mt-10 movil:mx-[33px] movil:mt-0 movil:border-b-0 design:top-[449px] design:mt-0"
        />
      </div>
    </section>
  );
}
