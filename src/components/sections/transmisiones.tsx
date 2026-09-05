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
        <h2 className="text-[38px] leading-[1.04] font-semibold uppercase sm:text-[48px] design:absolute design:top-[122px] design:left-[264px] design:w-[434px] design:text-[64px]">
          <span className="block text-white">Somos</span>
          <span className="text-vernal-accent block">inmigrantes</span>
          <span className="text-vernal-accent block">como tú</span>
        </h2>

        <p className="mt-6 text-[20px] leading-[1.04] font-light uppercase design:absolute design:top-[339px] design:left-[264px] design:mt-0 design:text-[30px]">
          <span className="text-vernal-accent">sintonízanos</span>
          <span className="ml-[43px] text-white">
            martes <span className="text-white/50">|</span> 5p.m.
          </span>
        </p>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[1.04] text-justify italic design:absolute design:top-[407px] design:left-[264px] design:mt-0 design:w-[580px]">
          <span className="text-vernal-accent">
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
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/live/transmision.webp"
              alt="Transmisión en vivo del Abogado Vernal"
              width={857}
              height={644}
              className="absolute top-[-109px] left-[-73px] h-[644px] w-[857px] max-w-none object-cover"
            />
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

        {/* Barra "aclara tus dudas migratorias" y badge LIVE */}
        <div
          className="mt-6 flex items-center gap-x-4 px-6 py-4 design:absolute design:top-[473.5px] design:left-[1036.5px] design:mt-0 design:h-[119px] design:w-[471px] design:px-[32px]"
          style={{
            backgroundImage:
              "linear-gradient(274.95deg, #08B6FF -23.70%, #172339 110.67%)",
            opacity: 0.73,
          }}
        >
          <span
            aria-hidden
            className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full border-[3px] border-white"
          >
            <span className="ml-[4px] border-t-[11px] border-b-[11px] border-l-[19px] border-t-transparent border-b-transparent border-l-white" />
          </span>
          <span className="text-white">
            <span className="block text-[19px] leading-[1.2] font-medium uppercase">
              aclara tus dudas
            </span>
            <span className="block text-[34px] leading-[1.1] font-bold uppercase">
              migratorias
            </span>
          </span>
        </div>

        <span
          aria-hidden
          className="hidden items-center justify-center gap-x-[10px] design:absolute design:top-[439.5px] design:left-[1398.5px] design:flex design:h-[55px] design:w-[141px]"
          style={{
            backgroundImage:
              "linear-gradient(273.17deg, #000000 -24.82%, #3A3A3A 111.58%)",
          }}
        >
          <span className="h-[22px] w-[22px] rounded-full bg-[#e02020]" />
          <span className="text-[26px] leading-[1.04] font-bold text-white uppercase">
            live
          </span>
        </span>
      </div>
    </section>
  );
}
