"use client";

// Cliente porque su carrusel necesita estado. Un componente de servidor no
// puede pasar funciones de render a uno de cliente.
import Image from "next/image";
import { Carrusel } from "@/components/ui/carrusel";
import { useT } from "@/lib/i18n/cliente";

/**
 * Reseñas de Google — nodos del rango y=6917..7794 de la frame 1:2.
 *
 * En el archivo este bloque empieza con "Mantente informado": un formulario de
 * boletín (título, texto, casilla de correo y aviso legal) que ocupa los
 * primeros 354 px en 1920 y 438 en 402. SE QUITÓ el 2026-10-13 por indicación
 * de Roberto: el despacho no manda boletín y el formulario no enviaba a ningún
 * sitio, así que pedía un correo que nadie iba a usar. Para recuperarlo, el
 * código está en el commit anterior a este cambio (`git log -- este archivo`);
 * antes de volver a ponerlo hace falta saber a dónde van los suscriptores y
 * quién manda los correos, y conectarlo como el formulario de consulta.
 *
 * Lo que queda son las reseñas, subidas esos 354 / 438 px, y la sección mide
 * 523 en 1920 (antes 877) y 834 en 402 (antes 1272). Coordenadas actuales,
 * relativas al inicio de la sección:
 *
 *   fondo     tres capas del export SVG; el retrato sube a y−250 (en el archivo
 *             y−203) para que en la banda más baja siga saliendo la cara
 *   reseñas   83:151  x278 y95   422×109 dos líneas, la segunda en #08b6ff
 *   logo      83:186  x618 y102  190×63
 *   fichas    x298 y229 y x666 y229, 294×198; nombre en #08b6ff
 *             estrellas #F0CC00 de 23×22, CENTRADAS sobre la columna
 *   flechas   x195 y300 y x1008 y300, 55×55
 *
 * En la HOME solapa 3px con testimonios, y por eso quien la usa le pasa el
 * margen negativo. El diseño solo trae DOS reseñas.
 *
 * Lienzo móvil, en una columna:
 *   reseñas título centrado en y69, logo en x106 y142
 *   ficha   una sola, columna de 230 centrada en x198.5 (el centro que marcan
 *           las flechas, no el de la pantalla); las estrellas van 5px a la
 *           izquierda de ese centro, como en el archivo
 *   flechas x24 y x319, y335
 */

/** Posición de cada ranura según el archivo; no rota. */
const ranuras = [{ left: 298 }, { left: 666 }];

/** Lo que rota: el texto y su autora. */
const resenas = [
  {
    texto:
      "Definitely recommend this law firm, the staff was very friendly and always helpful. Marysol was very professional and always helpful, thanks to her the whole process was easy and not stressful she is very much appreciated!",
    autor: "Jacquelyn Arroyo",
  },
  {
    // "el.abogado" va tal cual: es la reseña literal de una clienta, no una errata nuestra.
    texto:
      "Fui a una cita de consulta y la atención es excelente durante todo el proceso, el.abogado respondió todas mis dudas, evaluó y me presentó todas las opciones disponibles en mi caso. Gracias por toda la información suministrada.",
    autor: "Angelica Villegas",
  },
];

function Estrellas({ className }: { className?: string }) {
  const t = useT();
  return (
    // Paso de 34 entre estrellas en el archivo (23 de estrella + 11 de hueco),
    // que deja la fila en 159 de ancho.
    <span className={`flex gap-x-[11px] ${className ?? ""}`} aria-label={t("5 de 5 estrellas")}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Image key={i} src="/icons/estrella.svg" alt="" width={23} height={22} />
      ))}
    </span>
  );
}

export function BlogResenas({ className }: { className?: string } = {}) {
  const t = useT();
  return (
    <section
      className={`relative overflow-hidden bg-[linear-gradient(82.07deg,#172339_28.78%,#0F0F0F_43.26%)] movil:h-[834px] movil:bg-[linear-gradient(88.86deg,#172339_28.76%,#0F0F0F_43.26%)] design:h-[523px] ${className ?? ""}`}
    >
      <Image
        src="/images/blog/fondo.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1283}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.43] movil:inset-auto movil:top-[457px] movil:left-[-238px] movil:h-[441px] movil:w-[661px] movil:max-w-none movil:object-fill design:inset-auto design:top-[-250px] design:left-[40px] design:h-[1283px] design:w-[1923px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(84.51deg,#172339_13.52%,#00000000_72.00%)] movil:bg-[linear-gradient(174.80deg,#172339_52.60%,#101828B1_57.70%,#00000000_68.40%)]"
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 apilada:py-20 movil:h-[834px] movil:p-0 design:h-[523px] design:p-0">
        {/* Reseñas de Google. En flujo el título y el logo van juntos en una
            fila, como en el archivo; apilados quedaban sueltos y ocupaban el
            doble de alto. `design:contents` deshace la fila a 1920. */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 movil:contents design:mt-0 design:contents">
          <p className="text-[26px] leading-[28px] font-light sm:text-[28px] sm:leading-[29px] movil:absolute movil:top-[69px] movil:left-0 movil:w-[402px] movil:text-center movil:text-[24px] movil:leading-[25px] design:absolute design:top-[95px] design:left-[278px] design:w-[422px] design:leading-[37px] design:text-[36px]">
            <span className="block text-white">{t("Lo que piensan")}</span>
            <span className="text-vernal-accent block">{t("nuestros clientes")}</span>
          </p>

          <Image
            src="/icons/google-reviews.svg"
            alt={t("Google Customer Reviews")}
            width={190}
            height={63}
            className="movil:absolute movil:top-[142px] movil:left-[106px] design:absolute design:top-[102px] design:left-[618px]"
          />
        </div>

        <Carrusel
          items={resenas}
          className="mt-10 grid max-w-[900px] grid-cols-1 gap-8 apilada:grid-cols-2 sm:grid-cols-2 movil:mt-0 movil:block movil:max-w-none design:mt-0 design:block design:max-w-none"
          controles={({ anterior, siguiente }) => (
            /* Por debajo de 1280 las flechas van centradas bajo las fichas: en el
               archivo están a los lados, pero ahí no hay sitio y sin ellas el
               carrusel no se puede mover. `design:contents` deshace el envoltorio
               para que a 1920 vuelvan a sus coordenadas. */
            <div className="mt-8 flex justify-center gap-x-4 movil:contents design:mt-0 design:contents">
              <button
                type="button"
                onClick={anterior}
                aria-label={t("Reseña anterior")}
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[335px] movil:left-[24px] design:absolute design:top-[300px] design:left-[195px]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={siguiente}
                aria-label={t("Reseña siguiente")}
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[334px] movil:left-[319px] design:absolute design:top-[300px] design:left-[1008px]"
              >
                →
              </button>
            </div>
          )}
        >
          {(r, i, relevo) => (
            <li
              key={ranuras[i].left}
              className={`design:absolute design:top-[229px] design:left-[var(--x)] design:w-[294px] ${
                i === 0
                  ? "movil:absolute movil:top-[253px] movil:left-[83.5px] movil:w-[230px]"
                  : "movil:hidden"
              }`}
              style={{ "--x": `${ranuras[i].left}px` } as React.CSSProperties}
            >
              <Estrellas className="justify-center movil:justify-start movil:pl-[30.5px]" />
              <div key={relevo} className="animate-vernal-relevo">
                <p className="mt-[18px] text-center text-[16px] leading-[17px] text-white movil:mt-[22px]">
                  {t(r.texto)}
                </p>
                <p className="text-vernal-accent mt-[10px] text-center text-[16px] leading-[17px] font-bold movil:mt-[15px] design:mt-[22px]">
                  {r.autor}
                </p>
              </div>
            </li>
          )}
        </Carrusel>

      </div>
    </section>
  );
}
