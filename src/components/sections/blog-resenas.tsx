import Image from "next/image";
import { ConsentNotice } from "@/components/ui/consent-notice";

/**
 * "Mantente informado" (newsletter) + reseñas de Google — nodos del rango
 * y=6917..7794 de la frame 1:2. En el archivo comparten un mismo fondo, por eso
 * van en un único componente. Coordenadas relativas al inicio de la sección.
 *
 * Solapa 3px con testimonios (que acaba en 6920), de ahí el margen negativo.
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
 *   fichas    x298 y583 y x666 y583, 294×198; estrellas #F0CC00; nombre en #08b6ff
 *   flechas   x195 y654 y x1008 y654, 55×55
 *
 * El diseño solo trae DOS reseñas y no hay tarjetas de blog: esta sección es
 * únicamente la suscripción y las opiniones. Los textos van literales del archivo.
 */

const resenas = [
  {
    texto:
      "Definitely recommend this law firm, the staff was very friendly and always helpful. Marysol was very professional and always helpful, thanks to her the whole process was easy and not stressful she is very much appreciated!",
    autor: "Jacquelyn Arroyo",
    left: 298,
    estrellasLeft: 360 - 298,
  },
  {
    // "el.abogado" va tal cual: es la reseña literal de una clienta, no una errata nuestra.
    texto:
      "Fui a una cita de consulta y la atención es excelente durante todo el proceso, el.abogado respondió todas mis dudas, evaluó y me presentó todas las opciones disponibles en mi caso. Gracias por toda la información suministrada.",
    autor: "Angelica Villegas",
    left: 666,
    estrellasLeft: 733 - 666,
  },
];

function Estrellas({ className }: { className?: string }) {
  return (
    <span className={`flex gap-x-[10px] ${className ?? ""}`} aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <Image key={i} src="/icons/estrella.svg" alt="" width={23} height={22} />
      ))}
    </span>
  );
}

export function BlogResenas() {
  return (
    <section
      className="relative overflow-hidden design:-mt-[3px] design:h-[877px]"
      style={{
        backgroundImage:
          "linear-gradient(82.07deg, #172339 28.78%, #0F0F0F 43.26%)",
      }}
    >
      <Image
        src="/images/blog/fondo.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1283}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.43] design:inset-auto design:top-[-203px] design:left-[40px] design:h-[1283px] design:w-[1923px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(84.51deg, #172339 13.52%, rgb(0 0 0 / 0) 72.00%)",
        }}
      />

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[877px] design:p-0">
        <h2 className="text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] design:absolute design:top-[95px] design:left-[265px] design:w-[745px] design:leading-[67px] design:text-[64px]">
          Mantente informado
        </h2>

        <p className="mt-6 max-w-[541px] text-[16px] leading-[17px] text-white design:absolute design:top-[183px] design:left-[271px] design:mt-0 design:w-[541px]">
          Cambios en las leyes de inmigración, consejos prácticos y respuestas a las
          dudas más comunes de nuestra comunidad.
        </p>

        <form className="mt-8 flex max-w-[686px] design:absolute design:top-[258px] design:left-[271px] design:mt-0 design:w-[562px]">
          <div className="flex h-[52px] flex-1 items-center bg-white/97 pl-3">
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
              className="ml-[17px] h-full w-full bg-transparent text-[15px] leading-[16px] text-black outline-none placeholder:text-black"
            />
          </div>
          <button
            type="submit"
            aria-label="Suscribirse"
            className="bg-vernal-accent text-vernal-navy flex h-[52px] w-[124px] shrink-0 items-center justify-center text-[20px] transition-opacity hover:opacity-90 design:absolute design:left-[438px]"
          >
            →
          </button>
        </form>

        <ConsentNotice className="mt-6 max-w-[558px] design:absolute design:top-[332px] design:left-[271px] design:mt-0 design:w-[558px]" />

        {/* Reseñas de Google */}
        <p className="mt-14 text-[28px] leading-[29px] font-light design:absolute design:top-[449px] design:left-[278px] design:mt-0 design:w-[422px] design:leading-[37px] design:text-[36px]">
          <span className="block text-white">Lo que piensan</span>
          <span className="text-vernal-accent block">nuestros clientes</span>
        </p>

        <Image
          src="/icons/google-reviews.svg"
          alt="Google Customer Reviews"
          width={190}
          height={63}
          className="mt-6 design:absolute design:top-[456px] design:left-[618px] design:mt-0"
        />

        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 design:mt-0 design:block">
          {resenas.map((r) => (
            <li
              key={r.autor}
              className="design:absolute design:top-[583px] design:left-[var(--x)] design:w-[294px]"
              style={{ "--x": `${r.left}px` } as React.CSSProperties}
            >
              <Estrellas className="justify-center design:justify-start" />
              <p className="mt-[18px] text-center text-[16px] leading-[17px] text-white">
                {r.texto}
              </p>
              <p className="text-vernal-accent mt-[10px] text-center text-[16px] leading-[17px] font-bold">
                {r.autor}
              </p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Reseña anterior"
          className="bg-vernal-accent text-vernal-navy hidden h-[55px] w-[55px] items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 design:absolute design:top-[654px] design:left-[195px] design:flex"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Reseña siguiente"
          className="bg-vernal-accent text-vernal-navy hidden h-[55px] w-[55px] items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 design:absolute design:top-[654px] design:left-[1008px] design:flex"
        >
          →
        </button>
      </div>
    </section>
  );
}
