"use client";

// Cliente porque su carrusel necesita estado. Un componente de servidor no
// puede pasar funciones de render a uno de cliente.
import Image from "next/image";
import { ConsentNotice } from "@/components/ui/consent-notice";
import { Carrusel } from "@/components/ui/carrusel";
import { FlechaEnlace } from "@/components/ui/iconos";

/**
 * "Mantente informado" (newsletter) + reseñas de Google — nodos del rango
 * y=6917..7794 de la frame 1:2. En el archivo comparten un mismo fondo, por eso
 * van en un único componente. Coordenadas relativas al inicio de la sección.
 *
 * En la HOME solapa 3px con testimonios (que acaba en 6920), y por eso quien la
 * usa le pasa el margen negativo. En /areas-de-servicio arranca pegada al bloque
 * de ciudades, sin solape, así que ahí no se le pasa nada.
 *
 *   fondo   1923×877, tres capas del export SVG:
 *             1. linear-gradient(82.07deg, #172339 28.78%, #0F0F0F 43.26%)
 *             2. retrato 1923×1283 en (+40, −203), opacidad 0.43
 *             3. linear-gradient(84.51deg, #172339 13.52%, negro transparente 72.00%)
 *   título    83:149  x265 y95   745×67
 *   texto     83:150  x271 y183  541×44
 *   correo    83:67   x271 y258  562×52  blanco al 97%
 *   botón     83:71   x709 y258  124×52  #08B6FF
 *   aviso     83:69   x271 y332  558×81  mismo texto legal que el hero
 *   reseñas   83:151  x278 y449  422×109 dos líneas, la segunda en #08b6ff
 *   logo      83:186  x618 y456  190×63
 *   fichas    x298 y583 y x666 y583, 294×198; nombre en #08b6ff
 *             estrellas #F0CC00 de 23×22, CENTRADAS sobre la columna (x360 y x733)
 *   flechas   x195 y654 y x1008 y654, 55×55
 *
 * El diseño solo trae DOS reseñas y no hay tarjetas de blog: esta sección es
 * únicamente la suscripción y las opiniones. Los textos van literales del archivo.
 *
 * Lienzo móvil (y=10290..11562, 1272 de alto), en una columna:
 *   título  x41 y69 · texto x41 y183, cuatro líneas con cortes fijos
 *   correo  x40 y283, 322×48, con el botón de 114 dentro
 *   aviso   x41 y356, 12px en caja de 320
 *   reseñas título centrado en y507, logo en x106 y580
 *   ficha   una sola, columna de 230 centrada en x198.5 (el centro que marcan
 *           las flechas, no el de la pantalla); las estrellas van 5px a la
 *           izquierda de ese centro, como en el archivo
 *   flechas x24 y x319, y773
 *
 * El texto de arriba corta en el filo: la línea 2 no admite la "y" que la 4 sí
 * cabe con el mismo ancho. Con un ancho, Chrome y Figma no coinciden en qué
 * lado cae, así que en móvil los cortes van fijos con <br>.
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
  return (
    // Paso de 34 entre estrellas en el archivo (23 de estrella + 11 de hueco),
    // que deja la fila en 159 de ancho.
    <span className={`flex gap-x-[11px] ${className ?? ""}`} aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <Image key={i} src="/icons/estrella.svg" alt="" width={23} height={22} />
      ))}
    </span>
  );
}

export function BlogResenas({ className }: { className?: string } = {}) {
  return (
    <section
      className={`relative overflow-hidden bg-[linear-gradient(82.07deg,#172339_28.78%,#0F0F0F_43.26%)] movil:h-[1272px] movil:bg-[linear-gradient(88.86deg,#172339_28.76%,#0F0F0F_43.26%)] design:h-[877px] ${className ?? ""}`}
    >
      <Image
        src="/images/blog/fondo.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1283}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.43] movil:inset-auto movil:top-[895px] movil:left-[-238px] movil:h-[441px] movil:w-[661px] movil:max-w-none movil:object-fill design:inset-auto design:top-[-203px] design:left-[40px] design:h-[1283px] design:w-[1923px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(84.51deg,#172339_13.52%,#00000000_72.00%)] movil:bg-[linear-gradient(174.80deg,#172339_69.00%,#101828B1_72.27%,#00000000_79.29%)]"
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[1272px] movil:p-0 design:h-[877px] design:p-0">
        <h2 className="text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] movil:absolute movil:top-[69px] movil:left-[41px] movil:w-[300px] movil:leading-[48px] movil:text-[46px] design:absolute design:top-[95px] design:left-[265px] design:w-[745px] design:leading-[67px] design:text-[64px]">
          Mantente informado
        </h2>

        <p className="mt-6 max-w-[541px] text-[16px] leading-[17px] text-white movil:absolute movil:top-[183px] movil:left-[41px] movil:mt-0 movil:w-[330px] movil:max-w-none design:absolute design:top-[183px] design:left-[271px] design:mt-0 design:w-[541px]">
          Cambios en las leyes de
          <br className="hidden movil:inline" /> inmigración, consejos prácticos
          <br className="hidden movil:inline" /> y respuestas a las dudas más
          <br className="hidden movil:inline" /> comunes de nuestra comunidad.
        </p>

        <form className="mt-8 flex max-w-[562px] movil:absolute movil:top-[283px] movil:left-[40px] movil:mt-0 movil:w-[322px] movil:max-w-none design:absolute design:top-[258px] design:left-[271px] design:mt-0 design:w-[562px]">
          <div className="flex h-[52px] flex-1 items-center bg-white/97 pl-3 movil:h-[48px] movil:pl-[17px]">
            <Image
              src="/icons/form/mail.svg"
              alt=""
              width={18}
              height={14}
              className="max-w-none shrink-0"
            />
            <input
              type="email"
              name="correo"
              required
              aria-label="Correo Electrónico"
              placeholder="Correo Electrónico"
              className="ml-[17px] h-full w-full bg-transparent movil:ml-[12px] text-[15px] leading-[16px] text-black outline-none placeholder:text-black"
            />
          </div>
          <button
            type="submit"
            aria-label="Suscribirse"
            className="bg-vernal-accent text-vernal-navy flex h-[52px] w-[124px] shrink-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-90 movil:h-[48px] movil:w-[114px] design:absolute design:left-[438px]"
          >
            <FlechaEnlace />
          </button>
        </form>

        <ConsentNotice className="mt-6 max-w-[558px] movil:absolute movil:top-[356px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-[12px] design:absolute design:top-[332px] design:left-[271px] design:mt-0 design:w-[558px]" />

        {/* Reseñas de Google. En flujo el título y el logo van juntos en una
            fila, como en el archivo; apilados quedaban sueltos y ocupaban el
            doble de alto. `design:contents` deshace la fila a 1920. */}
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 movil:contents design:mt-0 design:contents">
          <p className="text-[26px] leading-[28px] font-light sm:text-[28px] sm:leading-[29px] movil:absolute movil:top-[507px] movil:left-0 movil:w-[402px] movil:text-center movil:text-[24px] movil:leading-[25px] design:absolute design:top-[449px] design:left-[278px] design:w-[422px] design:leading-[37px] design:text-[36px]">
            <span className="block text-white">Lo que piensan</span>
            <span className="text-vernal-accent block">nuestros clientes</span>
          </p>

          <Image
            src="/icons/google-reviews.svg"
            alt="Google Customer Reviews"
            width={190}
            height={63}
            className="movil:absolute movil:top-[580px] movil:left-[106px] design:absolute design:top-[456px] design:left-[618px]"
          />
        </div>

        <Carrusel
          items={resenas}
          className="mt-10 grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-2 movil:mt-0 movil:block movil:max-w-none design:mt-0 design:block design:max-w-none"
          controles={({ anterior, siguiente }) => (
            /* Por debajo de 1280 las flechas van centradas bajo las fichas: en el
               archivo están a los lados, pero ahí no hay sitio y sin ellas el
               carrusel no se puede mover. `design:contents` deshace el envoltorio
               para que a 1920 vuelvan a sus coordenadas. */
            <div className="mt-8 flex justify-center gap-x-4 movil:contents design:mt-0 design:contents">
              <button
                type="button"
                onClick={anterior}
                aria-label="Reseña anterior"
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[773px] movil:left-[24px] design:absolute design:top-[654px] design:left-[195px]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={siguiente}
                aria-label="Reseña siguiente"
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[772px] movil:left-[319px] design:absolute design:top-[654px] design:left-[1008px]"
              >
                →
              </button>
            </div>
          )}
        >
          {(r, i, relevo) => (
            <li
              key={ranuras[i].left}
              className={`design:absolute design:top-[583px] design:left-[var(--x)] design:w-[294px] ${
                i === 0
                  ? "movil:absolute movil:top-[691px] movil:left-[83.5px] movil:w-[230px]"
                  : "movil:hidden"
              }`}
              style={{ "--x": `${ranuras[i].left}px` } as React.CSSProperties}
            >
              <Estrellas className="justify-center movil:justify-start movil:pl-[30.5px]" />
              <div key={relevo} className="animate-vernal-relevo">
                <p className="mt-[18px] text-center text-[16px] leading-[17px] text-white movil:mt-[22px]">
                  {r.texto}
                </p>
                <p className="text-vernal-accent mt-[10px] text-center text-[16px] leading-[17px] font-bold movil:mt-[15px]">
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
