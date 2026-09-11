import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * "Nuestros servicios" — nodos del rango y=4078..4746 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 4078).
 *
 *   fondo    59:37    1923×668. En el archivo la sección NO tiene relleno propio:
 *                     lo que se ve es la foto desaturada al 34% sobre el fondo de
 *                     la página (#0f0f0f) y encima
 *                     linear-gradient(77.74deg, #171717 48.45% → transp. 61.05%),
 *                     que es lo que tapa el canto izquierdo de la foto.
 *   barra    97:46    x215 y96   12×443   #08b6ff
 *   título   59:35    x290 y106  348×134  Poppins 600 64px lh1.04 UPPER, TODO en #08b6ff
 *   cuerpo   59:36    x290 y270  580×209  Poppins 400 16px lh1.04 justificado, blanco
 *                     con una frase en #08b6ff
 *   botón    73:37    x290 y479  277×52   #08b6ff, texto 16px
 *   play     129:1293 x1262 y256 96×96    círculo blanco con triángulo
 *   claim    83:148   x1032 y400 556×157  Poppins 300 36px lh1.04, CENTRADO
 *                     (las tres líneas comparten centro en x1310),
 *                     primera línea en #08b6ff, resto blanco.
 *                     OJO: la caja mide 157 de alto pero el texto solo ocupa 112.
 *                     Deducir el tamaño dividiendo la altura de la caja entre las
 *                     líneas da 50px y es incorrecto: hay que medir el ancho de una
 *                     línea en el render (490px) y calibrarlo contra la tipografía.
 *
 * El fondo es una foto a 34% de opacidad, dibujada a 1122×1682 con desplazamiento
 * (+882, −173) dentro del rect de la sección. Sale del export SVG de la frame.
 *
 * Lienzo móvil (y=6104..7103, 999 de alto): la misma foto, dibujada 619×929 en
 * (−9, +500), con un degradado que oscurece la mitad de arriba en vez del lado
 * izquierdo. Título x38 y65, cuerpo x38 y194 en caja de 325, botón x40 y498,
 * play de 96 en x153 y728 y el claim centrado en y848. Sin barra cian.
 *
 * El botón dice "Agenda una consulta" en escritorio y "Agenda tu consulta" en
 * móvil. Es una incoherencia del archivo, pero se respeta: cada lienzo el suyo.
 */
export function Servicios() {
  return (
    <section className="relative overflow-hidden bg-vernal-ink movil:h-[999px] design:mt-px design:h-[668px]">
      <Image
        src="/images/servicios/fondo.webp"
        alt=""
        aria-hidden
        width={1122}
        height={1682}
        className="pointer-events-none absolute top-0 right-0 h-full w-auto object-cover opacity-[0.34] movil:top-[500px] movil:right-auto movil:left-[-9px] movil:h-[929px] movil:w-[619px] movil:max-w-none movil:object-fill design:top-[-173px] design:right-auto design:left-[882px] design:h-[1682px] design:w-[1122px]"
      />
      {/* Sin esto se ve el canto vertical de la foto a x882, como si el video
          estuviera pegado encima en vez de fundido con el panel oscuro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(77.74deg,#171717_48.45%,#17171700_61.05%)] movil:bg-[linear-gradient(182.44deg,#171717_50.42%,#00000000_58.17%)]"
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[999px] movil:p-0 design:h-[668px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-accent hidden design:absolute design:top-[96px] design:left-[215px] design:block design:h-[443px] design:w-[12px]"
        />

        <h2 className="text-vernal-accent text-[38px] leading-[40px] font-semibold uppercase sm:text-[48px] movil:absolute movil:top-[65px] movil:left-[38px] movil:w-[300px] movil:leading-[48px] movil:text-[46px] design:absolute design:top-[106px] design:left-[290px] design:w-[348px] design:leading-[67px] design:text-[64px]">
          Nuestros
          <br />
          servicios
        </h2>

        <p className="mt-8 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line design:text-justify text-white movil:absolute movil:top-[194px] movil:left-[38px] movil:mt-0 movil:w-[325px] movil:max-w-none movil:text-justify design:absolute design:top-[270px] design:left-[290px] design:mt-0 design:w-[580px]">
          {"Como firma de inmigración en Texas, "}
          <span className="text-vernal-accent">
            podemos ayudarte a través de distintas áreas de práctica, adaptadas a las
            diferentes etapas y necesidades de tu proceso migratorio.
          </span>
          {" Ya sea que busques reunir a tu familia, proteger tu estatus legal, obtener un permiso de trabajo o defenderte ante una situación de deportación, contamos con la experiencia necesaria para orientarte y representarte en cada paso del camino.\n\nCada caso es distinto, y por eso comenzamos por escucharte a ti, antes de definir cuál es el camino legal que mejor se ajusta a tu situación."}
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[277px] movil:absolute movil:top-[498px] movil:left-[40px] movil:mt-0 movil:w-[277px] design:absolute design:top-[479px] design:left-[290px] design:mt-0"
        >
          <span className="movil:hidden">Agenda una consulta</span>
          <span className="hidden movil:inline">Agenda tu consulta</span>
        </ButtonLink>

        {/* Botón de play (nodo 129:1293): círculo blanco de 96 con triángulo oscuro. */}
        <button
          type="button"
          aria-label="Ver vídeo"
          className="mt-10 flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full bg-white transition-transform hover:scale-105 movil:absolute movil:top-[728px] movil:left-[153px] movil:mt-0 movil:h-[96px] movil:w-[96px] design:absolute design:top-[256px] design:left-[1262px] design:mt-0 design:h-[96px] design:w-[96px]"
        >
          <span
            aria-hidden
            className="ml-[6px] border-t-[13px] border-b-[13px] border-l-[22px] border-t-transparent border-b-transparent border-l-[#161616] movil:border-t-[17px] movil:border-b-[17px] movil:border-l-[29px] design:border-t-[17px] design:border-b-[17px] design:border-l-[29px]"
          />
        </button>

        <p className="mt-8 max-w-[556px] text-center text-[24px] leading-[25px] font-light text-white movil:absolute movil:top-[848px] movil:left-[16px] movil:mt-0 movil:w-[370px] movil:max-w-none design:absolute design:top-[400px] design:left-[1032px] design:mt-0 design:w-[556px] design:leading-[37px] design:text-[36px]">
          <span className="text-vernal-accent">Nos adaptamos a tu caso y</span>{" "}
          luchamos por ofrecerte la mejor opción.
        </p>
      </div>
    </section>
  );
}
