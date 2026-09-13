import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * "Somos inmigrantes como tú" / transmisiones en vivo — nodos del rango
 * y=5414..6077 de la frame 1:2. Coordenadas relativas al inicio de la sección.
 *
 *   fondo   1923×688, cuatro capas del export SVG del 2026-09-13:
 *             1. #172339
 *             2. foto 1256×1515 en (+375, −184), opacidad 0.62, soft-light
 *             3. linear-gradient(98.29deg, #0F0F10 transparente 56.47% → opaco 81.83%)
 *             4. linear-gradient(254.53deg, #0F0F10 transparente 65.34% → opaco 79.59%)
 *           En ese export el diseñador cambió la foto, pasó "INMIGRANTES" a blanco,
 *           el botón de verde a cian y el radio de la barra de 29.5 a 38.5. El
 *           móvil conserva la foto anterior y el botón verde.
 *   título  104:87  x264 y122  434×201  3 líneas, "Somos" blanco y el resto #08b6ff
 *   horario 104:88  x264 y339  "sintonízanos" en #08b6ff
 *           97:31   x495 y339  "martes | 5p.m." en blanco
 *   cuerpo  67:3    x264 y407  580×108  itálica, primera frase en #08b6ff
 *   botón   73:34   x264 y534  277×52   #00B567 (verde, no cian)
 *   vídeo   67:6    x914 y122  733×425
 *   play    69:25   x1230 y297 96×96
 *   barra   83:29   x1036.5 y473.5 471×119  degradado azul al 73%
 *   badge   83:33   x1398.5 y439.5 141×55   degradado gris oscuro
 *
 * Lienzo móvil (y=8644..9634, 990 de alto): todo en una columna. El vídeo es el
 * de escritorio escalado ×0.4843 (355×206 en x24 y678), con sombra 8/36 al 84%.
 * La marca "LIVE", la barra "aclara tus dudas" y el badge vienen en el archivo
 * como vectores sueltos, no como texto, y con otro dibujo que en escritorio
 * (borde cian en la barra, borde oscuro en el badge). Se sacan tal cual del
 * export a /images/movil/transmision-rotulos.svg, con su filtro y degradados.
 */
/**
 * Trazo degradado de 3px de la barra y del badge (en el archivo, `stroke` con un
 * linearGradient). CSS no tiene bordes con degradado, así que es una capa con el
 * degradado recortada a su propio borde con una máscara. Va 1.5px hacia fuera,
 * porque el trazo de un SVG queda centrado sobre el borde del rect.
 */
function Trazo({ className, degradado }: { className: string; degradado: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-[-1.5px] border-[3px] border-transparent ${className}`}
      style={{
        background: `${degradado} border-box`,
        WebkitMask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}

export function Transmisiones() {
  return (
    <section className="bg-vernal-navy relative overflow-hidden movil:h-[990px] design:h-[688px]">
      {/* Una foto por lienzo: con carga diferida la oculta no se pide. */}
      <Image
        src="/images/live/fondo-escritorio.webp"
        alt=""
        aria-hidden
        width={768}
        height={1024}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.62] mix-blend-soft-light movil:hidden design:inset-auto design:top-[-184px] design:left-[375px] design:h-[1515px] design:w-[1256px] design:max-w-none design:object-fill"
      />
      <Image
        src="/images/live/fondo.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1632}
        className="pointer-events-none absolute hidden opacity-[0.41] mix-blend-soft-light movil:top-[-39px] movil:left-[-83px] movil:block movil:h-[913px] movil:w-[1076px] movil:max-w-none movil:object-fill"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(98.29deg,#0F0F1000_56.47%,#0F0F10_81.83%)] movil:bg-[linear-gradient(158.36deg,#057EBC00_23.18%,#171717_72.59%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(254.53deg,#0F0F1000_65.34%,#0F0F10_79.59%)] movil:hidden"
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[990px] movil:p-0 design:h-[688px] design:p-0">
        <h2 className="text-[38px] leading-[40px] font-semibold uppercase sm:text-[48px] movil:absolute movil:top-[73px] movil:left-0 movil:w-[392px] movil:text-center movil:leading-[48px] movil:text-[46px] design:absolute design:top-[122px] design:left-[264px] design:w-[434px] design:leading-[67px] design:text-[64px]">
          <span className="block text-white">Somos</span>
          <span className="text-vernal-accent block design:text-white">inmigrantes</span>
          <span className="text-vernal-accent block">como tú</span>
        </h2>

        <p className="mt-6 text-[20px] leading-[21px] font-light uppercase movil:absolute movil:top-[237px] movil:left-[38px] movil:mt-0 movil:leading-[31px] movil:text-[30px] design:absolute design:top-[339px] design:left-[264px] design:mt-0 design:leading-[31px] design:text-[30px]">
          <span className="text-vernal-accent movil:block">sintonízanos</span>
          <span className="ml-[24px] text-white movil:ml-0 movil:block">
            martes <span className="text-white/50">|</span>{" "}
            <span className="text-vernal-accent">5p.m.</span>
          </span>
        </p>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] font-light design:text-justify italic movil:absolute movil:top-[341px] movil:left-[38px] movil:mt-0 movil:w-[312px] movil:max-w-none movil:text-justify design:absolute design:top-[407px] design:left-[264px] design:mt-0 design:w-[580px]">
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
          className="mt-8 w-full sm:w-[277px] movil:absolute movil:top-[573px] movil:left-[40px] movil:mt-0 movil:w-[277px] design:absolute design:top-[534px] design:left-[264px] design:mt-0 design:bg-vernal-accent"
        >
          Ver retransmisiones
        </ButtonLink>

        {/* Vídeo de la transmisión */}
        <div className="relative mt-12 aspect-[733/425] w-full movil:absolute movil:top-[678px] movil:left-[24px] movil:mt-0 movil:aspect-auto movil:h-[206px] movil:w-[355px] movil:shadow-[8px_36px_37.1px_rgb(0_0_0/0.84)] design:absolute design:top-[122px] design:left-[914px] design:mt-0 design:aspect-auto design:h-[425px] design:w-[733px]">
          {/* Borde cian de 2px alrededor del vídeo (rect x915 y5537, stroke #08B6FF).
              Va por encima de la imagen: si no, la foto lo tapa. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 border-2 border-vernal-accent design:top-[1px] design:left-[1px] design:h-[423px] design:w-[731px]"
          />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/live/transmision.webp"
              alt="Transmisión en vivo del Abogado Vernal"
              width={857}
              height={644}
              className="absolute top-[-109px] left-[-73px] h-[644px] w-[857px] max-w-none object-cover movil:top-[-53px] movil:left-[-35px] movil:h-[312px] movil:w-[415px]"
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

          {/* Rótulos del móvil: marca "LIVE", barra y badge, del export. */}
          <Image
            src="/images/movil/transmision-rotulos.svg"
            alt="Aclara tus dudas migratorias"
            width={329}
            height={167}
            unoptimized
            className="pointer-events-none absolute hidden max-w-none movil:z-20 movil:top-[92.9px] movil:left-[19.9px] movil:block movil:h-[167.2px] movil:w-[329.2px]"
          />

          <button
            type="button"
            aria-label="Ver la transmisión"
            className="absolute top-1/2 left-1/2 flex h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105 movil:top-[85px] movil:left-[155px] movil:h-[42px] movil:w-[42px] movil:translate-x-0 movil:translate-y-0 design:top-[152px] design:left-[303px] design:translate-x-0 design:translate-y-0"
          >
            <span
              aria-hidden
              className="ml-[6px] border-t-[17px] border-b-[17px] border-l-[29px] border-t-transparent border-b-transparent border-l-[#172339] movil:ml-[3px] movil:border-t-[7.5px] movil:border-b-[7.5px] movil:border-l-[12.7px]"
            />
          </button>
        </div>

        {/* Barra "aclara tus dudas migratorias": rect x1036.5 y5887.5, 471×119,
            rx 38.5 (redondeada), opacidad 0.73. Los textos van en x1160, con
            líneas base en y5931.8 y y5976.1 del archivo. */}
        <div
          className="relative mt-6 flex items-center gap-x-4 rounded-[30px] px-6 py-4 movil:hidden design:absolute design:top-[473.5px] design:left-[1036.5px] design:mt-0 design:block design:h-[119px] design:w-[471px] design:rounded-[38.5px] design:p-0"
        >
          {/* La opacidad 0.73 del archivo es del RECTÁNGULO, no del contenido.
              Aplicada al contenedor oscurecía también el texto y los iconos. */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-[inherit]"
            style={{
              backgroundImage:
                "linear-gradient(274.95deg, #08B6FF -23.70%, #172339 110.67%)",
              opacity: 0.73,
            }}
          />
          <Trazo
            className="rounded-[40px]"
            degradado="linear-gradient(90deg, #0C96D4 -0.32%, #16334F 100.32%)"
          />
          <span
            aria-hidden
            className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[3px] border-white design:h-[78px] design:w-[78px] design:absolute design:top-[22.5px] design:left-[31.5px]"
          >
            <span className="ml-[4px] border-t-[11px] border-b-[11px] border-l-[19px] border-t-transparent border-b-transparent border-l-white" />
          </span>
          <span className="relative text-white design:absolute design:top-[26px] design:left-[123.5px]">
            <span className="block text-[16px] leading-[17px] font-semibold uppercase design:text-[25px] design:leading-[26px]">
              aclara tus dudas
            </span>
            <span className="block text-[28px] leading-[30px] font-bold uppercase design:text-[46px] design:leading-[48px]">
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
          <Trazo
            className="rounded-[29px]"
            degradado="linear-gradient(90deg, #121212 -1.06%, #2D2D2D 101.06%)"
          />
          <span className="absolute top-[16.5px] left-[24.5px] h-[22px] w-[22px] rounded-full bg-[#EE0303]" />
          <span className="absolute top-[12px] left-[54.5px] text-[30px] leading-[31px] font-bold text-white uppercase">
            live
          </span>
        </span>

      </div>
    </section>
  );
}
