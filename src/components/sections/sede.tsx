import Image from "next/image";
import Link from "next/link";
import { FlechaEnlace } from "@/components/ui/iconos";
import { TrazoTarjeta } from "@/components/ui/trazo-tarjeta";
import {
  preguntasSede,
  servicios,
  visasHumanitarias,
  type Sede,
  type Servicio,
} from "@/lib/sedes";

/**
 * Página de sede — plantilla de los artboards "VERNAL - AREAS DE SERVICIO -
 * <ciudad>", 1920×5563. Los datos de cada ciudad están en src/lib/sedes.ts.
 *
 * | y    | alto | bloque                                                  |
 * |------|------|---------------------------------------------------------|
 * | 0    | 713  | hero: "Justicia sin fronteras", rótulo y foto de la ciudad |
 * | 713  | 2413 | tarjetas de servicios sobre cian (empieza en x6) + dirección |
 * | 3126 | 1211 | preguntas frecuentes (el fondo va en espejo)            |
 * | 4332 | 763  | "Agenda tu consulta" (solapa 5px con las preguntas)     |
 * | 5095 | 468  | footer, el de la home                                   |
 *
 * El lienzo de 402 sale de los artboards "VESPER AGENCY LANDING - MOBILE (11)"
 * a "(14)" (402 x 8193), uno por ciudad:
 *
 * |    y | alto | bloque                                           |
 * |------|------|--------------------------------------------------|
 * |    0 |  571 | hero, con el fondo en espejo                     |
 * |  571 | 4426 | las siete tarjetas, de una en una, y la dirección |
 * | 4997 | 1192 | preguntas frecuentes                             |
 * | 6153 | 1012 | "Agenda tu consulta" (solapa 36)                 |
 * | 7165 | 1060 | footer                                           |
 *
 * Las tarjetas miden 354 y van a x24.5; dentro, el icono a (30.5, 39.5), el
 * título a +123.5 y el texto en caja de 290. El archivo ajusta a mano cada
 * hueco (de 11 a 32 entre título y texto); aquí se usan los valores que más se
 * repiten, así que una tarjeta puede quedar unos píxeles más alta o más baja.
 * El hueco entre tarjetas es 23.
 *
 * Entre 561 y 1279 no hay diseño: todo va apilado con la medida de lectura
 * limitada y las tarjetas en una columna.
 */

/* ------------------------------------------------------------------ hero */

export function SedeHero({ sede }: { sede: Sede }) {
  const { hero } = sede;
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0C0C0D] movil:-mt-[106px] movil:h-[571px] design:h-[713px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 movil:h-[571px] movil:w-[402px] movil:[transform:scaleX(-1)]">
        {hero.conMapa && (
          <>
            <svg className="absolute inset-0 h-full w-full movil:hidden" preserveAspectRatio="none" viewBox="0 0 1920 713">
              <defs>
                <radialGradient
                  id={`sede-hero-radial-${sede.slug}`}
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(1225.17 286.351 -433.15 241.334 113.645 234.549)"
                >
                  <stop stopColor="#172339" />
                  <stop offset="1" stopColor="#0F0F0F" />
                </radialGradient>
              </defs>
              <rect width="1920" height="713" fill={`url(#sede-hero-radial-${sede.slug})`} />
            </svg>
            {/* El lienzo de 402 trae su propia matriz para el mismo radial. */}
            <svg className="absolute inset-0 hidden h-full w-full movil:block" preserveAspectRatio="none" viewBox="0 0 402 571">
              <defs>
                <radialGradient
                  id={`sede-hero-radial-movil-${sede.slug}`}
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(256.52 229.322 -90.6909 193.27 23.7944 187.837)"
                >
                  <stop stopColor="#172339" />
                  <stop offset="1" stopColor="#0F0F0F" />
                </radialGradient>
              </defs>
              <rect width="402" height="571" fill={`url(#sede-hero-radial-movil-${sede.slug})`} />
            </svg>
            <Image
              src="/images/trabajo/mapa-relieve.webp"
              alt=""
              width={2290}
              height={1536}
              className="absolute inset-0 hidden opacity-30 mix-blend-hard-light movil:top-[32px] movil:left-[-105px] movil:block movil:h-[281px] movil:w-[654px] movil:max-w-none movil:opacity-[0.68] movil:mix-blend-plus-lighter design:top-[-56px] design:left-[-557px] design:block design:h-[946px] design:w-[2423px] design:max-w-none"
            />
          </>
        )}
        <div
          className="absolute inset-x-0 top-0 h-full movil:top-0 movil:h-[571px] design:top-[var(--t)] design:h-[713px]"
          style={{ "--t": `${hero.top}px` } as React.CSSProperties}
        >
          <Image
            src={hero.foto.src}
            alt=""
            width={hero.foto.width}
            height={713}
            priority
            className={`absolute top-0 right-0 h-full w-full object-cover object-right opacity-40 sm:w-[70%] design:left-[var(--l)] design:w-[var(--w)] design:max-w-none design:object-fill design:opacity-100 ${
              hero.fotoMovil ? "movil:hidden" : ""
            }`}
            style={
              { "--l": `${hero.foto.left}px`, "--w": `${hero.foto.width}px` } as React.CSSProperties
            }
          />
          {hero.fotoMovil && (
            <Image
              src={hero.fotoMovil.src}
              alt=""
              width={hero.fotoMovil.width}
              height={hero.fotoMovil.height}
              priority
              className="absolute hidden max-w-none movil:top-[var(--mt)] movil:left-[var(--ml)] movil:block movil:h-[var(--mh)] movil:w-[var(--mw)]"
              style={
                {
                  "--ml": `${hero.fotoMovil.left}px`,
                  "--mt": `${hero.fotoMovil.top}px`,
                  "--mw": `${hero.fotoMovil.width}px`,
                  "--mh": `${hero.fotoMovil.height}px`,
                } as React.CSSProperties
              }
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#0F0F10_5.97%,#0F0F1000_55.97%)] movil:bg-[linear-gradient(161.73deg,#000000_-6.04%,#0A0A0A00_58.38%)]" />
          {/* El segundo degradado va en estilo en línea (cambia por ciudad), así
              que el del lienzo de 402, que es el mismo para todas, va aparte. */}
          <div className="absolute inset-0 movil:hidden" style={{ backgroundImage: hero.degradado }} />
          <div className="absolute inset-0 hidden movil:block movil:bg-[linear-gradient(338.03deg,#000000_22.16%,#00000000_66.17%)]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-16 lg:px-12 movil:absolute movil:top-[362px] movil:left-0 movil:w-full movil:max-w-none movil:-translate-y-1/2 movil:p-0 design:h-[713px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] sm:leading-[32px] movil:ml-[38px] movil:text-[24px] movil:leading-[25px] design:absolute design:top-[217px] design:left-[237px] design:text-[36px] design:leading-[37px]">
          Justicia sin fronteras
        </p>
        <h1 className="mt-3 text-[36px] leading-[40px] font-normal uppercase sm:text-[56px] sm:leading-[60px] movil:mt-[12px] movil:ml-[38px] movil:w-[364px] movil:text-[46px] movil:leading-[48px] design:absolute design:top-[282px] design:left-[237px] design:mt-0 design:text-[82px] design:leading-[85px]">
          {/* El lienzo de 402 se queda sin el "en": con él, "INMIGRACIÓN EN"
              mide 372.9 y no cabe en los 364 que hay de margen a margen. */}
          <span className="text-vernal-accent block">
            Abogado de
            <br />
            inmigración<span className="movil:hidden"> en</span>
          </span>
          <span className="block text-white">{sede.rotulo}</span>
        </h1>
        <p className="mt-6 max-w-[580px] text-[16px] leading-[22px] text-white movil:mt-[17px] movil:ml-[41px] movil:w-[316px] movil:max-w-none movil:text-justify movil:text-[15px] movil:leading-[16px] design:absolute design:top-[563px] design:left-[237px] design:mt-0 design:w-[580px] design:leading-[17px]">
          {sede.intro}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ servicios */

/**
 * Posición de cada tarjeta dentro de la sección (y relativa a y713).
 *
 * El texto de las tarjetas va en una caja de 455: medido en Chrome, "requiere una
 * orden de una corte estatal de familia antes" ocupa 453.9 y tiene que caber, y
 * "reunir, y cuánto tiempo puede tomar el proceso según tu" ocupa 457.0 y no.
 * Solo el rango 454–456 reproduce los cortes del archivo en todas las tarjetas.
 */
const CELDAS = [
  { left: 216.5, top: 49.5, boton: 394.5 },
  { left: 981.5, top: 49.5, boton: 394.5 },
  { left: 216.5, top: 567.5, boton: 387.5 },
  { left: 981.5, top: 567.5, boton: 387.5 },
  { left: 216.5, top: 1085.5, boton: 387.5 },
  { left: 981.5, top: 1085.5, boton: 387.5 },
];

/** Foto de cada tarjeta, ya recortada a su parte visible: x dentro de la tarjeta y ancho. */
const FOTOS: Record<string, { left: number; width: number }> = {
  "peticion-familiar": { left: 210, width: 518 },
  naturalizacion: { left: 166, width: 562 },
  deportacion: { left: 255, width: 473 },
  "visas-juveniles": { left: 298, width: 430 },
  "visa-k1": { left: 265, width: 463 },
  "habeas-corpus": { left: 251, width: 477 },
};

/**
 * Lo mismo en el lienzo de 402, donde la foto ocupa la mitad de arriba de la
 * tarjeta. Medido en el artboard de Houston; las otras tres ciudades usan las
 * mismas fotos y el mismo encuadre.
 */
const FOTOS_MOVIL: Record<string, { left: number; top: number; width: number; height: number }> = {
  "peticion-familiar": { left: 16, top: -91, width: 420, height: 425 },
  naturalizacion: { left: 0, top: -30, width: 415, height: 419 },
  deportacion: { left: -30, top: -44, width: 434, height: 438 },
  "visas-juveniles": { left: -12, top: -144, width: 464, height: 468 },
  "visa-k1": { left: -15, top: -38, width: 426, height: 430 },
  "habeas-corpus": { left: 3, top: -59, width: 423, height: 427 },
};

/** Trazo de las tarjetas en el lienzo de 402. La primera es más alta. */
const TRAZO_MOVIL = "matrix(-473.907 -400.113 55.0638 -279.243 483.719 576.02)";
const TRAZO_MOVIL_1 = "matrix(-473.907 -415.773 55.0638 -290.172 483.719 598.78)";

/**
 * Sin `top`, el botón va en el flujo, justo debajo de lo que tenga encima (ver
 * `Tarjeta`); con `top`, en esa y exacta de la tarjeta.
 *
 * El archivo lo manda a una página de detalle por servicio que no existe en el
 * diseño (/areas-de-practica), así que de momento lleva a /contacto. Cuando el
 * cliente decida si habrá esas páginas, se cambia aquí.
 */
function BotonMasInfo({ top }: { top?: number }) {
  return (
    <Link
      href="/contacto"
      className={`text-vernal-accent relative mt-8 inline-flex h-[52px] w-[223px] items-center bg-[#0F0F10] pl-[25px] text-[16px] leading-[17px] transition-opacity hover:opacity-90 movil:mt-[16px] movil:text-[15px] movil:leading-[16px] design:mt-0 ${
        top === undefined ? "" : "design:absolute design:top-[var(--bt)] design:left-[60.5px]"
      }`}
      style={top === undefined ? undefined : ({ "--bt": `${top}px` } as React.CSSProperties)}
    >
      Mas información
      <FlechaEnlace className="absolute top-[18.5px] left-[171px] h-[15px] w-[25px]" />
    </Link>
  );
}

function Tarjeta({
  servicio,
  sede,
  celda,
  indice,
}: {
  servicio: Servicio;
  sede: Sede;
  celda: (typeof CELDAS)[number];
  indice: number;
}) {
  const foto = FOTOS[servicio.id];
  const fotoMovil = FOTOS_MOVIL[servicio.id];
  // En Fort Worth "en Forth Worth" parte el título de Deportación en tres líneas
  // y el archivo baja el botón 12px.
  const boton = celda.boton + (sede.slug === "fort-worth" && servicio.id === "deportacion" ? 12 : 0);
  const partido = servicio.id === "deportacion";
  return (
    <article
      id={servicio.id}
      className="relative scroll-mt-[160px] overflow-hidden bg-[#172339] p-8 movil:mx-[24.5px] movil:w-[354px] movil:overflow-visible movil:p-0 design:absolute design:top-[var(--ct)] design:left-[var(--cl)] design:h-[489px] design:w-[728px] design:overflow-visible design:p-0"
      style={{ "--ct": `${celda.top}px`, "--cl": `${celda.left}px` } as React.CSSProperties}
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src={`/images/sedes/tarjeta-${servicio.id}.webp`}
          alt=""
          width={Math.round(foto.width * 1.5)}
          height={734}
          sizes="(min-width: 1280px) 562px, 100vw"
          className="absolute top-0 right-0 h-full w-full object-cover opacity-40 movil:hidden design:left-[var(--fl)] design:w-[var(--fw)] design:object-fill design:opacity-100"
          style={{ "--fl": `${foto.left}px`, "--fw": `${foto.width}px` } as React.CSSProperties}
        />
        {/* En el lienzo de 402 la foto llena la mitad de arriba de la tarjeta y
            el archivo usa la imagen cuadrada sin recortar, no la franja que
            recorta la de escritorio. */}
        <Image
          src={`/images/sedes/tarjeta-${servicio.id}-movil.webp`}
          alt=""
          width={900}
          height={900}
          sizes="464px"
          className="absolute hidden max-w-none movil:top-[var(--mft)] movil:left-[var(--mfl)] movil:block movil:h-[var(--mfh)] movil:w-[var(--mfw)]"
          style={
            {
              "--mfl": `${fotoMovil.left}px`,
              "--mft": `${fotoMovil.top}px`,
              "--mfw": `${fotoMovil.width}px`,
              "--mfh": `${fotoMovil.height}px`,
            } as React.CSSProperties
          }
        />
        <div className="absolute inset-0 bg-[linear-gradient(245.99deg,#00000000_10.21%,#0C121D81_27.27%,#111929_50.58%,#172339_66.36%)] movil:bg-[linear-gradient(220.95deg,#00000000_15.01%,#0C121D81_27.94%,#111929_45.62%,#172339_57.58%)]" />
      </div>
      <TrazoTarjeta
        id={`sede-trazo-${servicio.id}`}
        ancho={728}
        alto={489}
        transformacion={
          indice === 0
            ? "translate(985 563.5) rotate(-157.803) scale(1036.3 295.101)"
            : "matrix(338.959 -3407.57 352.918 44.0245 33.409 505.01)"
        }
        movil={{
          ancho: 354,
          alto: indice === 0 ? 520 : 500,
          transformacion: indice === 0 ? TRAZO_MOVIL_1 : TRAZO_MOVIL,
        }}
      />

      <Image
        src={`/icons/sedes/${servicio.id}.svg`}
        alt=""
        width={60}
        height={60}
        className="relative h-[60px] w-[60px] movil:absolute movil:top-[39.5px] movil:left-[30.5px] design:absolute design:top-[33.5px] design:left-[60.5px]"
      />
      {/* El botón va en su y del archivo (`boton`) salvo que el texto no quepa
          encima: los cuerpos llevan el nombre de la ciudad y en San Antonio el
          de Deportación ocupa un renglón más que en el archivo, que dice
          "Dallas". La caja de texto mide como mínimo hasta el botón menos un
          margen, y el botón va detrás en el flujo. */}
      <div className="relative movil:w-[354px] movil:px-[30.5px] movil:pt-[123.5px] movil:pb-[28.5px] design:absolute design:top-[111.5px] design:left-[60.5px] design:w-[455px]">
        <div
          className="design:box-border design:min-h-[var(--mh)] design:pb-[16px]"
          style={{ "--mh": `${boton - 111.5}px` } as React.CSSProperties}
        >
          <h2 className="mt-5 text-[28px] leading-[30px] font-light movil:mt-0 movil:text-[24px] movil:leading-[25px] design:mt-0 design:text-[36px] design:leading-[37px]">
            {partido ? (
              <>
                <span className="text-vernal-accent">
                  Defensa Contra la
                  <br />
                  Deportación
                </span>{" "}
                <span className="text-white">en {sede.nombreDiseno}</span>
              </>
            ) : (
              <>
                <span className="text-vernal-accent">{servicio.titulo}</span>
                <br />
                <span className="text-white">en {sede.nombreDiseno}</span>
              </>
            )}
          </h2>
          <p
            className="mt-4 text-[16px] leading-[22px] text-white sm:text-justify movil:mt-[32px] movil:text-left movil:text-[15px] movil:leading-[16px] design:mt-[var(--h)] design:leading-[17px]"
            style={{ "--h": `${servicio.hueco}px` } as React.CSSProperties}
          >
            {servicio.texto.replaceAll("{ciudad}", sede.ciudad)}
          </p>
        </div>
        <BotonMasInfo />
      </div>
    </article>
  );
}

const SUBTARJETAS = [60.5, 491.5, 927.5];

function TarjetaHumanitarias({ sede }: { sede: Sede }) {
  // Fuera de Dallas la introducción ocupa dos líneas en vez de cuatro y el
  // archivo sube 10px el título y el texto de las tres subtarjetas (las cajas no
  // se mueven).
  const subida = sede.slug === "dallas" ? 0 : 10;
  return (
    <article
      id="visas-humanitarias"
      className="relative scroll-mt-[160px] overflow-hidden bg-[#172339] p-8 movil:mx-[24.5px] movil:w-[354px] movil:overflow-visible movil:p-0 design:absolute design:top-[1613.5px] design:left-[216.5px] design:h-[630px] design:w-[1493px] design:overflow-visible design:p-0"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/images/sedes/tarjeta-visas-humanitarias.webp"
          alt=""
          width={1238}
          height={945}
          sizes="(min-width: 1280px) 825px, 100vw"
          className="absolute top-0 right-0 h-full w-full object-cover opacity-40 movil:hidden design:left-[668px] design:w-[825px] design:object-fill design:opacity-100"
        />
        <Image
          src="/images/sedes/tarjeta-visas-humanitarias-movil.webp"
          alt=""
          width={900}
          height={565}
          sizes="821px"
          className="absolute hidden max-w-none movil:top-[-37px] movil:left-[-207px] movil:block movil:h-[526px] movil:w-[821px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(236.63deg,#00000000_10.14%,#0C121D81_24.46%,#111929_40.62%,#172339_57.29%)] movil:bg-[linear-gradient(227.31deg,#00000000_12.29%,#0C121D81_19.49%,#111929_29.48%,#172339_42.89%)]" />
      </div>
      <TrazoTarjeta
        id="sede-trazo-visas-humanitarias"
        ancho={1493}
        alto={630}
        transformacion="matrix(689.844 -4368.5 718.254 56.4394 73.687 648.97)"
        movil={{ ancho: 354, alto: 1081, transformacion: "matrix(-473.907 -855.036 55.0638 -596.738 483.719 1237.2)" }}
      />

      <Image
        src="/icons/sedes/visas-humanitarias.svg"
        alt=""
        width={60}
        height={60}
        className="relative h-[60px] w-[60px] movil:absolute movil:top-[50.5px] movil:left-[30.5px] design:absolute design:top-[46.5px] design:left-[60.5px]"
      />
      <div className="relative movil:w-[354px] movil:px-[30.5px] movil:pt-[134.5px] design:absolute design:top-[131.5px] design:left-[60.5px] design:w-[455px]">
        <h2 className="mt-5 text-[28px] leading-[30px] font-light movil:mt-0 movil:text-[24px] movil:leading-[25px] design:mt-0 design:text-[36px] design:leading-[37px]">
          <span className="text-vernal-accent">Visas Humanitarias</span>
          <br />
          <span className="text-white">en {sede.nombreDiseno}</span>
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-white sm:text-justify movil:mt-[21px] movil:text-left movil:text-[15px] movil:leading-[16px] design:mt-[18px] design:leading-[17px]">
          {sede.introHumanitarias}
        </p>
      </div>

      <ul className="relative mt-6 grid gap-4 md:grid-cols-3 movil:mt-[17.5px] movil:ml-[32px] movil:block movil:space-y-[23px] design:static design:mt-0 design:block">
        {visasHumanitarias.map((v, i) => (
          <li
            key={v.titulo}
            className="shadow-vernal-1 relative bg-[#172339] p-6 movil:h-[204px] movil:w-[294px] movil:p-0 design:absolute design:top-[315.5px] design:left-[var(--sl)] design:h-[192px] design:w-[418px] design:p-0"
            style={
              {
                "--sl": `${SUBTARJETAS[i]}px`,
                "--st": `${22 - subida}px`,
                "--sp": `${65 - subida}px`,
              } as React.CSSProperties
            }
          >
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden h-full w-full movil:hidden design:block"
              viewBox="0 0 418 192"
            >
              <defs>
                <radialGradient
                  id={`sede-sub-${i}`}
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(191.725 -1308.51 199.621 16.9054 22.008 196.03)"
                >
                  <stop stopColor="#172339" />
                  <stop offset="1" stopColor="#0F0F0F" />
                </radialGradient>
              </defs>
              <rect x="3.5" y="3.5" width="411" height="185" fill="none" stroke={`url(#sede-sub-${i})`} strokeWidth="7" />
            </svg>
            {/* El mismo trazo, con la caja y la matriz del lienzo de 402. */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden h-full w-full movil:block"
              viewBox="0 0 294 204"
            >
              <defs>
                <radialGradient
                  id={`sede-sub-movil-${i}`}
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(138.061 -1437.99 143.746 18.5783 12.348 211.93)"
                >
                  <stop stopColor="#172339" />
                  <stop offset="1" stopColor="#0F0F0F" />
                </radialGradient>
              </defs>
              <rect x="3.5" y="3.5" width="287" height="197" fill="none" stroke={`url(#sede-sub-movil-${i})`} strokeWidth="7" />
            </svg>
            <h3 className="relative text-[22px] leading-[25px] font-light text-white movil:absolute movil:top-[19.5px] movil:left-[20.5px] movil:text-[24px] movil:leading-[25px] design:absolute design:top-[var(--st)] design:left-[36px] design:text-[24px]">
              {v.titulo}
            </h3>
            <p className="relative mt-2 text-[16px] leading-[20px] text-white movil:absolute movil:top-[55.5px] movil:left-[20.5px] movil:mt-0 movil:w-[262px] movil:text-[15px] movil:leading-[16px] design:absolute design:top-[var(--sp)] design:left-[36px] design:mt-0 design:w-[340px] design:leading-[17px]">
              {v.antes}
              <span className="text-vernal-accent">{v.destacado}</span>
              {v.despues}
            </p>
          </li>
        ))}
      </ul>

      <div className="movil:pb-[33.5px] movil:pl-[30.5px]">
        <BotonMasInfo top={543.5} />
      </div>
    </article>
  );
}

export function SedeServicios({ sede }: { sede: Sede }) {
  return (
    <section className="relative overflow-hidden bg-[#0C0C0D] design:h-[2413px]">
      <div
        aria-hidden
        className="bg-vernal-accent pointer-events-none absolute inset-0 overflow-hidden design:left-[6px] design:w-[1914px]"
      >
        <Image
          src="/images/equipo/fondo-textura.webp"
          alt=""
          width={1800}
          height={982}
          /* En el archivo la bandera va GIRADA (~22°) y deformada: el patrón lleva
             una matriz completa. Se aplica tal cual sobre la imagen a su tamaño de
             origen, 2816×1536, con el origen en la esquina. */
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-hard-light movil:top-0 movil:left-[-920px] movil:h-[1882px] movil:w-[3450px] movil:max-w-none movil:object-fill design:top-0 design:left-0 design:h-[1536px] design:w-[2816px] design:max-w-none design:origin-top-left design:object-fill design:[transform:matrix(0.956127,0.392228,-0.479625,1.169171,1053.871,-504.406)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(273.31deg,#08B6FF00_9.10%,#08B6FF_64.49%)] movil:bg-[linear-gradient(234.27deg,#08B6FF00_50.48%,#08B6FF_62.17%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1040px] flex-col gap-y-6 px-6 py-16 lg:px-12 movil:max-w-none movil:gap-y-[23px] movil:px-0 movil:pt-[36.5px] movil:pb-0 design:block design:h-[2413px] design:max-w-[1920px] design:p-0">
        {servicios.map((s, i) => (
          <Tarjeta key={s.id} servicio={s} sede={sede} celda={CELDAS[i]} indice={i} />
        ))}
        <TarjetaHumanitarias sede={sede} />

        <p className="text-vernal-navy mt-6 flex items-center justify-center gap-x-4 text-center text-[18px] leading-[22px] movil:mt-[10.5px] movil:mb-[24px] movil:block movil:text-[16px] movil:leading-[17px] design:absolute design:top-[2315px] design:left-[656px] design:mt-0 design:gap-x-[24px] design:text-[20px] design:leading-[21px]">
          <Image src="/icons/sedes/edificio.svg" alt="" width={31} height={32} className="h-[32px] w-[31px] shrink-0 movil:mx-auto movil:block" />
          <span className="design:pt-[5px]">{sede.direccion}</span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ preguntas */

export function SedePreguntas() {
  return (
    <section className="relative overflow-hidden bg-black movil:h-[1192px] design:h-[1211px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 movil:h-[1192px] movil:w-[402px] movil:[transform:scaleX(-1)]">
        <Image
          src="/images/sedes/faq-fondo.webp"
          alt=""
          width={1923}
          height={1205}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] movil:inset-auto movil:top-[-99px] movil:left-[-841px] movil:h-[1423px] movil:w-[1792px] movil:max-w-none movil:object-fill design:inset-auto design:top-0 design:left-0 design:h-[1205px] design:w-[1923px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(265.98deg,#000000_20.64%,#00000000_69.50%)] movil:bg-[linear-gradient(165.95deg,#000000_11.90%,#00000000_35.49%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 movil:h-[1192px] movil:max-w-none movil:p-0 design:h-[1211px] design:max-w-[1920px] design:p-0">
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

        <ul className="mt-10 border-b border-white movil:absolute movil:top-[389px] movil:left-[33px] movil:mt-0 movil:w-[336px] movil:border-b-0 design:absolute design:top-[449px] design:left-[239px] design:mt-0 design:w-[1441px]">
          {preguntasSede.map((p) => (
            <li key={p.texto} className="relative border-t border-white movil:h-[122px] design:h-[109px]">
              <Link
                href="/faqs"
                className="group flex flex-col gap-y-2 py-5 sm:flex-row sm:items-center sm:justify-between movil:block movil:h-full movil:py-0 design:block design:h-full design:py-0"
              >
                <span className="text-[20px] leading-[24px] font-light text-white movil:absolute movil:top-[28px] movil:left-[9px] movil:w-[210px] movil:text-[18px] movil:leading-[19px] design:absolute design:top-[44px] design:left-[38px] design:text-[24px] design:leading-[25px]">
                  {p.texto}
                </span>
                <span className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium group-hover:underline movil:absolute movil:top-[30px] movil:left-[234px] movil:block movil:w-[90px] movil:gap-x-0 movil:text-center movil:text-[16px] movil:leading-[17px] design:contents design:text-[20px]">
                  <span className="movil:block design:absolute design:top-[44px] design:left-[1207px]">Ver respuesta</span>
                  <span
                    aria-hidden
                    className="text-[34px] leading-none font-light movil:absolute movil:top-[38.5px] movil:left-0 movil:w-full movil:text-[32px] movil:leading-[32px] design:absolute design:top-[33.5px] design:left-[1364px] design:text-[41px] design:leading-[42px]"
                  >
                    +
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center movil:absolute movil:top-[1050px] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[1067px] design:left-[821px] design:mt-0 design:block">
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
