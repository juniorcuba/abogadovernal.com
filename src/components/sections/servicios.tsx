import { ButtonLink } from "@/components/ui/button";

/**
 * "Nuestros servicios" — nodos del rango y=4078..4746 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 4078).
 *
 *   fondo    59:37    1923×668, oscuro (#161616) con una foto desaturada a la derecha
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
 * PENDIENTE: la foto de fondo. La API de Figma sigue devolviendo 429 y sin el árbol
 * no sé qué imageRef le corresponde; descartada ya `ed879e3c9` (es otra toma).
 */
export function Servicios() {
  return (
    <section className="relative overflow-hidden bg-[#161616] design:h-[668px]">
      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[668px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-accent hidden design:absolute design:top-[96px] design:left-[215px] design:block design:h-[443px] design:w-[12px]"
        />

        <h2 className="text-vernal-accent text-[38px] leading-[1.04] font-semibold uppercase sm:text-[48px] design:absolute design:top-[106px] design:left-[290px] design:w-[348px] design:text-[64px]">
          Nuestros
          <br />
          servicios
        </h2>

        <p className="mt-8 max-w-[580px] text-[16px] leading-[1.04] whitespace-pre-line text-justify text-white design:absolute design:top-[270px] design:left-[290px] design:mt-0 design:w-[580px]">
          {"Como firma de inmigración en Texas, "}
          <span className="text-vernal-accent">
            podemos ayudarte a través de distintas áreas de práctica, adaptadas a las
            diferentes etapas y necesidades de tu proceso migratorio.
          </span>
          {" Ya sea que busques reunir a tu familia, proteger tu estatus legal, obtener un permiso de trabajo o defenderte ante una situación de deportación, contamos con la experiencia necesaria para orientarte y representarte en cada paso del camino.\n\nCada caso es distinto, y por eso comenzamos por escucharte a ti, antes de definir cuál es el camino legal que mejor se ajusta a tu situación."}
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[277px] design:absolute design:top-[479px] design:left-[290px] design:mt-0"
        >
          Agenda una consulta
        </ButtonLink>

        {/* Botón de play (nodo 129:1293): círculo blanco de 96 con triángulo oscuro. */}
        <button
          type="button"
          aria-label="Ver vídeo"
          className="mt-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white transition-transform hover:scale-105 design:absolute design:top-[256px] design:left-[1262px] design:mt-0 design:h-[96px] design:w-[96px]"
        >
          <span
            aria-hidden
            className="ml-[6px] border-t-[13px] border-b-[13px] border-l-[22px] border-t-transparent border-b-transparent border-l-[#161616] design:border-t-[17px] design:border-b-[17px] design:border-l-[29px]"
          />
        </button>

        <p className="mt-8 max-w-[556px] text-center text-[24px] leading-[1.04] font-light text-white design:absolute design:top-[400px] design:left-[1032px] design:mt-0 design:w-[556px] design:text-[36px]">
          <span className="text-vernal-accent">Nos adaptamos a tu caso y</span>{" "}
          luchamos por ofrecerte la mejor opción.
        </p>
      </div>
    </section>
  );
}
