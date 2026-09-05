import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * "Somos inmigrantes como tú" / transmisiones en vivo — nodos del rango
 * y=5414..6077 de la frame 1:2. Coordenadas relativas al inicio de la sección.
 *
 *   fondo   1923×688, tres capas del export SVG:
 *             1. #172339
 *             2. foto 1923×1632 en (0, −316), opacidad 0.41, soft-light
 *             3. linear-gradient(98.13deg, #057EBC transparente 35.12% → #171717 69.50%)
 *   título  104:87  x264 y122  434×201  3 líneas, "Somos" blanco y el resto #08b6ff
 *   horario 104:88  x264 y339  "sintonízanos" en #08b6ff
 *           97:31   x495 y339  "martes | 5p.m." en blanco
 *   cuerpo  67:3    x264 y407  580×108  itálica, primera frase en #08b6ff
 *   botón   73:34   x264 y534  277×52   #00B567 (verde, no cian)
 *   vídeo   67:6    x914 y122  733×425
 *   play    69:25   x1230 y297 96×96
 *   barra   83:29   x1036.5 y473.5 471×119  degradado azul al 73%
 *   badge   83:33   x1398.5 y439.5 141×55   degradado gris oscuro
 */
export function Transmisiones() {
  return (
    <section className="bg-vernal-navy relative overflow-hidden design:h-[688px]">
      <Image
        src="/images/live/fondo.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1632}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.41] mix-blend-soft-light design:inset-auto design:top-[-316px] design:left-0 design:h-[1632px] design:w-[1923px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(98.13deg, rgb(5 126 188 / 0) 35.12%, #171717 69.50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[688px] design:p-0">
        <h2 className="text-[38px] leading-[40px] font-semibold uppercase sm:text-[48px] design:absolute design:top-[122px] design:left-[264px] design:w-[434px] design:leading-[67px] design:text-[64px]">
          <span className="block text-white">Somos</span>
          <span className="text-vernal-accent block">inmigrantes</span>
          <span className="text-vernal-accent block">como tú</span>
        </h2>

        <p className="mt-6 text-[20px] leading-[21px] font-light uppercase design:absolute design:top-[339px] design:left-[264px] design:mt-0 design:leading-[31px] design:text-[30px]">
          <span className="text-vernal-accent">sintonízanos</span>
          <span className="ml-[43px] text-white">
            martes <span className="text-white/50">|</span>{" "}
            <span className="text-vernal-accent">5p.m.</span>
          </span>
        </p>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] font-light text-justify italic design:absolute design:top-[407px] design:left-[264px] design:mt-0 design:w-[580px]">
          {/* La frase en cian NO es itálica y va en peso 400; el resto sí es
              itálica en 300. Ponerlo todo en itálica cambiaba el corte de línea. */}
          <span className="text-vernal-accent font-normal not-italic">
            No te pierdas las transmisiones en vivo del Abogado Vernal: Inmigrantes
            Como Tú.
          </span>
          <span className="text-white">
            {" Cada martes a las 5:00 p.m., el Abogado Vernal recibe invitados especiales para hablar sobre los cambios y actualizaciones más recientes en inmigración, y compartir información relevante para el proceso migratorio de la comunidad. También responde preguntas en vivo, en tiempo real."}
          </span>
        </p>

        <ButtonLink
          href="/transmisiones"
          variant="green"
          className="mt-8 w-full sm:w-[277px] design:absolute design:top-[534px] design:left-[264px] design:mt-0"
        >
          Ver retransmisiones
        </ButtonLink>

        {/* Vídeo de la transmisión */}
        <div className="relative mt-12 aspect-[733/425] w-full design:absolute design:top-[122px] design:left-[914px] design:mt-0 design:aspect-auto design:h-[425px] design:w-[733px]">
          {/* Borde cian de 2px alrededor del vídeo (rect x915 y5537, stroke #08B6FF). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 border-2 border-vernal-accent design:top-[1px] design:left-[1px] design:h-[423px] design:w-[731px]"
          />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/live/transmision.webp"
              alt="Transmisión en vivo del Abogado Vernal"
              width={857}
              height={644}
              className="absolute top-[-109px] left-[-73px] h-[644px] w-[857px] max-w-none object-cover"
            />
            {/* Marca de agua "LIVE" (nodo 83:28, x999 y5721, caja 564×287 → 277px).
                Va dentro del vídeo, que la recorta por abajo igual que el archivo. */}
            <span
              aria-hidden
              className="absolute hidden text-[277px] leading-[288px] font-bold text-white/25 uppercase design:block"
              style={{ left: 999 - 914, top: 5721 - 5536 }}
            >
              live
            </span>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 1) 100%)",
              }}
            />
          </div>

          <button
            type="button"
            aria-label="Ver la transmisión"
            className="absolute top-1/2 left-1/2 flex h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105 design:top-[175px] design:left-[316px] design:translate-x-0 design:translate-y-0"
          >
            <span
              aria-hidden
              className="ml-[6px] border-t-[17px] border-b-[17px] border-l-[29px] border-t-transparent border-b-transparent border-l-[#172339]"
            />
          </button>
        </div>

        {/* Barra "aclara tus dudas migratorias": rect x1036.5 y5887.5, 471×119,
            rx 29.5 (redondeada), opacidad 0.73. Los textos van en x1160, con
            líneas base en y5931.8 y y5976.1 del archivo. */}
        <div
          className="mt-6 flex items-center gap-x-4 rounded-[30px] px-6 py-4 design:absolute design:top-[473.5px] design:left-[1036.5px] design:mt-0 design:block design:h-[119px] design:w-[471px] design:rounded-[29.5px] design:p-0"
          style={{
            backgroundImage:
              "linear-gradient(274.95deg, #08B6FF -23.70%, #172339 110.67%)",
            opacity: 0.73,
          }}
        >
          <span
            aria-hidden
            className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full border-[3px] border-white design:absolute design:top-[22.5px] design:left-[31.5px]"
          >
            <span className="ml-[4px] border-t-[11px] border-b-[11px] border-l-[19px] border-t-transparent border-b-transparent border-l-white" />
          </span>
          <span className="text-white design:absolute design:top-[26px] design:left-[123.5px]">
            <span className="block text-[25px] leading-[26px] font-semibold uppercase">
              aclara tus dudas
            </span>
            <span className="block text-[46px] leading-[48px] font-bold uppercase">
              migratorias
            </span>
          </span>
        </div>

        {/* Badge LIVE: rect x1398.5 y5853.5, 141×55, rx 27.5 (píldora completa).
            El punto rojo es un círculo de r=11 centrado en (1434, 5881). */}
        <span
          aria-hidden
          className="hidden items-center design:absolute design:top-[439.5px] design:left-[1398.5px] design:flex design:h-[55px] design:w-[141px] design:rounded-[27.5px]"
          style={{
            backgroundImage:
              "linear-gradient(273.17deg, #000000 -24.82%, #3A3A3A 111.58%)",
          }}
        >
          <span className="absolute top-[16.5px] left-[24.5px] h-[22px] w-[22px] rounded-full bg-[#EE0303]" />
          <span className="absolute top-[12px] left-[54.5px] text-[30px] leading-[31px] font-bold text-white uppercase">
            live
          </span>
        </span>

      </div>
    </section>
  );
}
