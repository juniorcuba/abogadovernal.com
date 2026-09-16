import Image from "next/image";
import Link from "next/link";
import { CamposConsulta } from "@/components/ui/campos-consulta";
import { FlechaEnlace } from "@/components/ui/iconos";
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
 * Por debajo de 1280 no hay diseño: todo va apilado con la medida de lectura
 * limitada y las tarjetas en una columna.
 */

/* ------------------------------------------------------------------ hero */

export function SedeHero({ sede }: { sede: Sede }) {
  const { hero } = sede;
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0C0C0D] design:h-[713px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {hero.conMapa && (
          <>
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1920 713">
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
            <Image
              src="/images/trabajo/mapa-relieve.webp"
              alt=""
              width={2290}
              height={1536}
              className="absolute inset-0 hidden opacity-30 mix-blend-hard-light design:top-[-56px] design:left-[-557px] design:block design:h-[946px] design:w-[2423px] design:max-w-none"
            />
          </>
        )}
        <div
          className="absolute inset-x-0 top-0 h-full design:top-[var(--t)] design:h-[713px]"
          style={{ "--t": `${hero.top}px` } as React.CSSProperties}
        >
          <Image
            src={hero.foto.src}
            alt=""
            width={hero.foto.width}
            height={713}
            priority
            className="absolute top-0 right-0 h-full w-full object-cover object-right opacity-40 sm:w-[70%] design:left-[var(--l)] design:w-[var(--w)] design:max-w-none design:object-fill design:opacity-100"
            style={
              { "--l": `${hero.foto.left}px`, "--w": `${hero.foto.width}px` } as React.CSSProperties
            }
          />
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#0F0F10_5.97%,#0F0F1000_55.97%)]" />
          <div className="absolute inset-0" style={{ backgroundImage: hero.degradado }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-16 lg:px-12 design:h-[713px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] sm:leading-[32px] design:absolute design:top-[217px] design:left-[237px] design:text-[36px] design:leading-[37px]">
          Justicia sin fronteras
        </p>
        <h1 className="mt-3 text-[36px] leading-[40px] font-normal uppercase sm:text-[56px] sm:leading-[60px] design:absolute design:top-[282px] design:left-[237px] design:mt-0 design:text-[82px] design:leading-[85px]">
          <span className="text-vernal-accent block">
            Abogado de
            <br />
            inmigración en
          </span>
          <span className="block text-white">{sede.rotulo}</span>
        </h1>
        <p className="mt-6 max-w-[580px] text-[16px] leading-[22px] text-white design:absolute design:top-[563px] design:left-[237px] design:mt-0 design:w-[580px] design:leading-[17px]">
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
 * Trazo de 11 del borde de las tarjetas, centrado en el borde (5.5 fuera y 5.5
 * dentro), con el degradado radial girado del archivo.
 */
function TrazoTarjeta({
  id,
  ancho,
  alto,
  transformacion,
  grosor = 11,
}: {
  id: string;
  ancho: number;
  alto: number;
  transformacion: string;
  grosor?: number;
}) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute hidden overflow-visible design:block"
      style={{ left: 0, top: 0, width: ancho, height: alto }}
      viewBox={`0 0 ${ancho} ${alto}`}
    >
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={transformacion}>
          <stop stopColor="#172339" />
          <stop offset="1" stopColor="#0F0F0F" />
        </radialGradient>
      </defs>
      <rect width={ancho} height={alto} fill="none" stroke={`url(#${id})`} strokeWidth={grosor} />
    </svg>
  );
}

function BotonMasInfo({ id, top }: { id: string; top: number }) {
  return (
    <Link
      href={`/areas-de-practica#${id}`}
      className="text-vernal-accent relative mt-8 inline-flex h-[52px] w-[223px] items-center bg-[#0F0F10] pl-[25px] text-[16px] leading-[17px] transition-opacity hover:opacity-90 design:absolute design:top-[var(--bt)] design:left-[60.5px] design:mt-0"
      style={{ "--bt": `${top}px` } as React.CSSProperties}
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
  // En Fort Worth "en Forth Worth" parte el título de Deportación en tres líneas
  // y el archivo baja el botón 12px.
  const boton = celda.boton + (sede.slug === "fort-worth" && servicio.id === "deportacion" ? 12 : 0);
  const partido = servicio.id === "deportacion";
  return (
    <article
      id={servicio.id}
      className="relative scroll-mt-[160px] overflow-hidden bg-[#172339] p-8 design:absolute design:top-[var(--ct)] design:left-[var(--cl)] design:h-[489px] design:w-[728px] design:overflow-visible design:p-0"
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
          className="absolute top-0 right-0 h-full w-full object-cover opacity-40 design:left-[var(--fl)] design:w-[var(--fw)] design:object-fill design:opacity-100"
          style={{ "--fl": `${foto.left}px`, "--fw": `${foto.width}px` } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-[linear-gradient(245.99deg,#00000000_10.21%,#0C121D81_27.27%,#111929_50.58%,#172339_66.36%)]" />
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
      />

      <Image
        src={`/icons/sedes/${servicio.id}.svg`}
        alt=""
        width={60}
        height={60}
        className="relative h-[60px] w-[60px] design:absolute design:top-[33.5px] design:left-[60.5px]"
      />
      <div className="relative design:absolute design:top-[111.5px] design:left-[60.5px] design:w-[455px]">
        <h2 className="mt-5 text-[28px] leading-[30px] font-light design:mt-0 design:text-[36px] design:leading-[37px]">
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
          className="mt-4 text-[16px] leading-[22px] text-white sm:text-justify design:mt-[var(--h)] design:leading-[17px]"
          style={{ "--h": `${servicio.hueco}px` } as React.CSSProperties}
        >
          {servicio.texto.replaceAll("{ciudad}", sede.ciudad)}
        </p>
      </div>
      <BotonMasInfo id={servicio.id} top={boton} />
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
      className="relative scroll-mt-[160px] overflow-hidden bg-[#172339] p-8 design:absolute design:top-[1613.5px] design:left-[216.5px] design:h-[630px] design:w-[1493px] design:overflow-visible design:p-0"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/images/sedes/tarjeta-visas-humanitarias.webp"
          alt=""
          width={1238}
          height={945}
          sizes="(min-width: 1280px) 825px, 100vw"
          className="absolute top-0 right-0 h-full w-full object-cover opacity-40 design:left-[668px] design:w-[825px] design:object-fill design:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(236.63deg,#00000000_10.14%,#0C121D81_24.46%,#111929_40.62%,#172339_57.29%)]" />
      </div>
      <TrazoTarjeta
        id="sede-trazo-visas-humanitarias"
        ancho={1493}
        alto={630}
        transformacion="matrix(689.844 -4368.5 718.254 56.4394 73.687 648.97)"
      />

      <Image
        src="/icons/sedes/visas-humanitarias.svg"
        alt=""
        width={60}
        height={60}
        className="relative h-[60px] w-[60px] design:absolute design:top-[46.5px] design:left-[60.5px]"
      />
      <div className="relative design:absolute design:top-[131.5px] design:left-[60.5px] design:w-[455px]">
        <h2 className="mt-5 text-[28px] leading-[30px] font-light design:mt-0 design:text-[36px] design:leading-[37px]">
          <span className="text-vernal-accent">Visas Humanitarias</span>
          <br />
          <span className="text-white">en {sede.nombreDiseno}</span>
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-white sm:text-justify design:mt-[18px] design:leading-[17px]">
          {sede.introHumanitarias}
        </p>
      </div>

      <ul className="relative mt-6 grid gap-4 md:grid-cols-3 design:static design:mt-0 design:block">
        {visasHumanitarias.map((v, i) => (
          <li
            key={v.titulo}
            className="shadow-vernal-1 relative bg-[#172339] p-6 design:absolute design:top-[315.5px] design:left-[var(--sl)] design:h-[192px] design:w-[418px] design:p-0"
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
              className="pointer-events-none absolute inset-0 hidden h-full w-full design:block"
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
            <h3 className="relative text-[22px] leading-[25px] font-light text-white design:absolute design:top-[var(--st)] design:left-[36px] design:text-[24px]">
              {v.titulo}
            </h3>
            <p className="relative mt-2 text-[16px] leading-[20px] text-white design:absolute design:top-[var(--sp)] design:left-[36px] design:mt-0 design:w-[340px] design:leading-[17px]">
              {v.antes}
              <span className="text-vernal-accent">{v.destacado}</span>
              {v.despues}
            </p>
          </li>
        ))}
      </ul>

      <BotonMasInfo id="visas-humanitarias" top={543.5} />
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
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-hard-light design:top-0 design:left-0 design:h-[1536px] design:w-[2816px] design:max-w-none design:origin-top-left design:object-fill design:[transform:matrix(0.956127,0.392228,-0.479625,1.169171,1053.871,-504.406)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(273.31deg,#08B6FF00_9.10%,#08B6FF_64.49%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1040px] flex-col gap-y-6 px-6 py-16 lg:px-12 design:block design:h-[2413px] design:max-w-[1920px] design:p-0">
        {servicios.map((s, i) => (
          <Tarjeta key={s.id} servicio={s} sede={sede} celda={CELDAS[i]} indice={i} />
        ))}
        <TarjetaHumanitarias sede={sede} />

        <p className="text-vernal-navy mt-6 flex items-center justify-center gap-x-4 text-center text-[18px] leading-[22px] design:absolute design:top-[2315px] design:left-[656px] design:mt-0 design:gap-x-[24px] design:text-[20px] design:leading-[21px]">
          <Image src="/icons/sedes/edificio.svg" alt="" width={31} height={32} className="h-[32px] w-[31px] shrink-0" />
          <span className="design:pt-[5px]">{sede.direccion}</span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ preguntas */

export function SedePreguntas() {
  return (
    <section className="relative overflow-hidden bg-black design:h-[1211px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/sedes/faq-fondo.webp"
          alt=""
          width={1923}
          height={1205}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] design:inset-auto design:top-0 design:left-0 design:h-[1205px] design:w-[1923px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(265.98deg,#000000_20.64%,#00000000_69.50%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[1211px] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] design:absolute design:top-[91px] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]">
          <span className="text-vernal-accent">
            Las dudas que más <br className="hidden design:inline" />
            escuchamos,
          </span>{" "}
          <span className="text-white">
            respondidas <br className="hidden design:inline" />
            con claridad.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify design:absolute design:top-[338px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ul className="mt-10 border-b border-white design:absolute design:top-[449px] design:left-[239px] design:mt-0 design:w-[1441px]">
          {preguntasSede.map((p) => (
            <li key={p} className="relative border-t border-white design:h-[109px]">
              <Link
                href="/faqs"
                className="group flex flex-col gap-y-2 py-5 sm:flex-row sm:items-center sm:justify-between design:block design:h-full design:py-0"
              >
                <span className="text-[20px] leading-[24px] font-light text-white design:absolute design:top-[44px] design:left-[38px] design:text-[24px] design:leading-[25px]">
                  {p}
                </span>
                <span className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium group-hover:underline design:contents design:text-[20px]">
                  <span className="design:absolute design:top-[44px] design:left-[1207px]">Ver respuesta</span>
                  <span
                    aria-hidden
                    className="text-[34px] leading-none font-light design:absolute design:top-[33.5px] design:left-[1364px] design:text-[41px] design:leading-[42px]"
                  >
                    +
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center design:absolute design:top-[1067px] design:left-[821px] design:mt-0 design:block">
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

/* --------------------------------------------------------------- agenda */

export function SedeAgenda() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(80.90deg,#172339_28.78%,#0F0F0F_43.26%)] design:-mt-[5px] design:h-[763px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/politicas/hero.webp"
          alt=""
          width={1035}
          height={1552}
          className="absolute top-0 right-0 hidden h-full w-auto opacity-[0.68] sm:block design:top-[-197px] design:right-auto design:left-[642px] design:h-[1920px] design:w-[1281px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(83.69deg,#000000_39.56%,#00000000_72%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[763px] design:max-w-[1920px] design:p-0">
        <h2 className="text-[38px] leading-[42px] font-semibold uppercase sm:text-[48px] sm:leading-[52px] design:absolute design:top-[111px] design:left-[265px] design:text-[64px] design:leading-[67px]">
          <span className="text-white">Agenda</span>{" "}
          <span className="text-vernal-accent">tu consulta</span>
        </h2>
        <p className="mt-4 text-[16px] leading-[20px] text-white design:absolute design:top-[199px] design:left-[271px] design:mt-0 design:leading-[17px]">
          Cambios en las leyes de inmigración, consejos prácticos
          <br className="hidden sm:inline" /> y respuestas a las dudas más comunes de nuestra comunidad.
        </p>

        <form className="mt-8 max-w-[565px] design:absolute design:top-[301px] design:left-[265px] design:mt-0 design:w-[565px] design:max-w-none">
          <CamposConsulta />
        </form>
      </div>
    </section>
  );
}
