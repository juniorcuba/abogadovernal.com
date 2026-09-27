import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { FlechaEnlace } from "@/components/ui/iconos";
import { Logo } from "@/components/ui/logo";
import { TrazoTarjeta } from "@/components/ui/trazo-tarjeta";
import { preguntasSede } from "@/lib/preguntas";
import {
  entradaBlogEtiquetas,
  entradaBlogResumen,
  entradasBlog,
  testimonios,
} from "@/lib/testimonios";

/**
 * /testimoniales — frame `453:469` de Figma, 1920 × 6738 (2026-09-26).
 *
 * Bandas: hero 0..991 · casos 983..3487 · preguntas 3487..4703 ·
 * blog 4683..5573 · agenda 5515..6270 · footer 6270. Los solapes son del
 * archivo y por eso hay márgenes negativos.
 */

/* ------------------------------------------------------------------ hero */

export function TestimonialesHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[991px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden design:h-[991px] design:w-[1918px]">
        {/* Degradado radial girado del archivo: CSS no sabe girar un radial. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1918 991" preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="testi-hero-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(1223.9 398 -432.699 335.431 113.526 326)"
            >
              <stop stopColor="#172339" />
              <stop offset="1" stopColor="#0F0F0F" />
            </radialGradient>
          </defs>
          <rect width="1918" height="991" fill="url(#testi-hero-radial)" />
        </svg>
        <Image
          src="/images/testimoniales/hero-fondo.webp"
          alt=""
          width={1473}
          height={922}
          priority
          sizes="(min-width: 1280px) 1473px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.42] mix-blend-plus-lighter design:top-[69px] design:left-[136px] design:h-[922px] design:w-[1473px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(313.66deg,#000000_2.38%,#0A0A0A00_14.08%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(71.50deg,#000000_17.39%,#00000000_42.88%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(181.96deg,#000000_-1.99%,#00000000_20.19%)]" />
      </div>

      {/* Retrato: la foto mide 1440 de alto y la caja la recorta a 766. */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden overflow-hidden apilada:top-[150px] apilada:right-0 apilada:block apilada:h-[520px] apilada:w-[420px] movil:top-[150px] movil:right-[-20px] movil:block movil:h-[380px] movil:w-[308px] design:top-[217px] design:left-[892px] design:block design:h-[766px] design:w-[621px]"
      >
        <Image
          src="/images/testimoniales/hero-retrato.webp"
          alt=""
          width={769}
          height={1785}
          priority
          sizes="621px"
          className="absolute top-[-30px] left-0 h-[1440px] w-[621px] max-w-none apilada:h-[974px] apilada:w-[420px] apilada:[mask-image:linear-gradient(180deg,#000_70%,transparent_100%)] movil:h-[714px] movil:w-[308px] movil:[mask-image:linear-gradient(180deg,#000_65%,transparent_100%)]"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[991px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] design:absolute design:top-[295px] design:left-[242px] design:text-[36px] design:leading-[37px]">
          Abogado Vernal
        </p>

        <h1 className="mt-3 text-[44px] leading-[48px] uppercase sm:text-[62px] sm:leading-[66px] design:absolute design:top-[349px] design:left-[237px] design:mt-0 design:w-[1000px] design:text-[82px] design:leading-[85px]">
          <span className="block text-white">Testimonios y</span>
          <span className="text-vernal-accent block">casos de éxito</span>
        </h1>

        <div className="mt-8 max-w-[680px] space-y-5 text-[16px] leading-[22px] text-white design:absolute design:top-[550px] design:left-[243px] design:mt-0 design:w-[614px] design:max-w-none design:space-y-0 design:text-justify design:leading-[17px]">
          <p>
            Detrás de cada caso que llevamos hay una persona que un día decidió no quedarse
            con la incertidumbre. Alguien que dejó atrás el miedo a preguntar, que se sentó
            frente a nosotros a contarnos su situación, y que hoy tiene algo que antes no
            tenía: certeza, un documento, una familia reunida, un futuro que ya no depende
            de esperar.
          </p>
          <p className="design:mt-[17px]">
            Estas no son solo historias de casos ganados. Son historias de personas que
            decidieron luchar por lo que les correspondía, y que hoy quieren que tú sepas
            que también es posible para ti.
          </p>
        </div>

        <ButtonLink
          href="#casos"
          className="mt-8 w-full sm:w-[224px] apilada:w-[224px] design:absolute design:top-[763px] design:left-[243px] design:mt-0"
        >
          Ver testimonios
        </ButtonLink>

        {/* Tarjeta de la cita, con su propio radial girado. */}
        <div className="relative mt-10 max-w-[420px] design:absolute design:top-[670px] design:left-[1348px] design:mt-0 design:h-[309px] design:w-[322px] design:max-w-none">
          <svg
            aria-hidden
            className="absolute inset-0 hidden h-full w-full opacity-[0.87] design:block"
            viewBox="0 0 322 309"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="testi-cita-radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(696.289 -652.078 90.4012 96.2458 10.2 231.665)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
            </defs>
            <rect width="322" height="309" fill="url(#testi-cita-radial)" />
          </svg>
          <Image
            src="/icons/testimoniales/brote.svg"
            alt=""
            aria-hidden
            width={69}
            height={68}
            className="relative ml-6 h-[57px] w-[58px] pt-6 design:absolute design:top-[22px] design:left-[34px] design:m-0 design:h-[68px] design:w-[69px] design:p-0"
          />
          <p className="relative bg-[#172339]/90 p-6 text-[26px] leading-[30px] font-light text-white sm:text-[32px] sm:leading-[34px] design:absolute design:top-[112px] design:left-[34px] design:bg-transparent design:p-0 design:text-[32px] design:leading-[33px]">
            Cada historia aquí empezó con una duda,{" "}
            <span className="text-vernal-accent">y terminó con una nueva vida.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- casos */

/** Coordenadas de las seis tarjetas dentro de la banda (x, y). */
const TARJETAS = [
  { left: 239.5, top: 90.5 },
  { left: 738.5, top: 90.5 },
  { left: 1237.5, top: 90.5 },
  { left: 239.5, top: 619.5 },
  { left: 738.5, top: 619.5 },
  { left: 1237.5, top: 621.5 },
];

/** La tira de fotos bajo el vídeo: x y ancho de cada hueco. */
const TIRA = [
  { src: "/images/testimoniales/tira-1.webp", left: 0, ancho: 382, w: 516, h: 688, x: -123, y: -113 },
  { src: "/images/testimoniales/tira-2.webp", left: 385, ancho: 381, w: 641, h: 1139, x: -260, y: -461 },
  { src: "/images/testimoniales/tira-3.webp", left: 769, ancho: 382, w: 470, h: 627, x: 0, y: -115 },
  { src: "/images/testimoniales/tira-4.webp", left: 1154, ancho: 381, w: 841, h: 631, x: -230, y: -207 },
  { src: "/images/testimoniales/tira-5.webp", left: 1538, ancho: 382, w: 443, h: 591, x: -18, y: -17 },
];

function TarjetaTestimonio({
  t,
  celda,
}: {
  t: (typeof testimonios)[number];
  celda: (typeof TARJETAS)[number];
}) {
  return (
    <li
      className="relative mt-[83px] bg-[#172339] px-8 pt-[100px] pb-10 design:absolute design:top-[var(--t)] design:left-[var(--l)] design:mt-0 design:h-[436px] design:w-[454px] design:p-0"
      style={{ "--t": `${celda.top}px`, "--l": `${celda.left}px` } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/[0.34]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(178.59deg,#00000000_4.77%,#172339_51.10%)]"
      />
      <TrazoTarjeta
        id={`testi-trazo-${celda.left}-${celda.top}`}
        ancho={454}
        alto={436}
        transformacion="matrix(213.283 -3046.36 222.066 39.3579 18.983 450.89)"
      />

      {/* Foto redonda montada sobre el borde superior. */}
      <span className="absolute top-[-83px] left-1/2 block h-[166px] w-[166px] -translate-x-1/2 overflow-hidden rounded-full design:top-[-43px]">
        <Image
          src={t.foto}
          alt={`${t.nombre}, ${t.caso}`}
          width={332}
          height={415}
          className="h-full w-full object-cover design:absolute design:top-[-61px] design:left-[-65px] design:h-[371px] design:w-[296px] design:max-w-none design:object-fill"
        />
      </span>

      {/* Cada línea es un <span>: suelto fluye como párrafo y en el lienzo de
          1920 se fuerza a renglón, que es como lo parte el archivo. */}
      <p className="relative text-center text-[16px] leading-[22px] text-white design:absolute design:top-[145px] design:left-[25px] design:w-[404px] design:leading-[17px]">
        {t.lineas.map((linea, i) => (
          <span key={i} className="design:block">
            {linea.map((trozo, j) =>
              typeof trozo === "string" ? (
                <span key={j}>{trozo}</span>
              ) : (
                <span key={j} className="text-vernal-accent">
                  {trozo.cian}
                </span>
              ),
            )}
          </span>
        ))}
      </p>

      <p
        className="relative mt-6 text-center design:absolute design:top-[var(--n)] design:left-0 design:mt-0 design:w-full"
        style={{ "--n": `${t.nombreArriba - 21.75}px` } as React.CSSProperties}
      >
        <span className="text-vernal-accent block text-[22px] leading-[26px] font-light design:text-[25px] design:leading-[26px]">
          {t.nombre}
        </span>
        <span className="mt-1 block text-[15px] leading-[16px] font-light text-white design:mt-[4.5px]">
          {t.caso}
        </span>
        <span className="text-vernal-accent mt-1 block text-[15px] leading-[16px] font-light design:mt-[6px]">
          {t.ciudad}
        </span>
      </p>
    </li>
  );
}

export function TestimonialesCasos() {
  return (
    <section
      id="casos"
      className="relative overflow-hidden bg-vernal-accent design:-mt-[8px] design:h-[2504px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(250.81deg,#08B6FF00_8.89%,#08B6FF_30.18%)]" />
        <Image
          src="/images/testimoniales/tarjetas-textura.webp"
          alt=""
          width={1600}
          height={873}
          sizes="(min-width: 1280px) 4876px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.21] mix-blend-hard-light design:top-[-156px] design:left-[-1748px] design:h-[2660px] design:w-[4876px] design:max-w-none design:object-fill"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[2504px] design:max-w-[1920px] design:p-0">
        <ul className="grid gap-x-10 gap-y-[120px] sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 design:block">
          {testimonios.map((t, i) => (
            <TarjetaTestimonio key={t.nombre} t={t} celda={TARJETAS[i]} />
          ))}
        </ul>

        <p className="text-vernal-navy mt-16 text-center text-[26px] leading-[32px] font-light sm:text-[34px] sm:leading-[40px] design:absolute design:top-[1131px] design:left-[455px] design:mt-0 design:w-[1010px] design:text-[40px] design:leading-[42px]">
          Aquí, cada rostro tiene un nombre. Cada nombre, un proceso distinto.{" "}
          <span className="font-normal text-white">
            Y cada proceso, un final que vale la pena contar.
          </span>
        </p>

        {/* Vídeo del testimonio. */}
        <div className="relative mt-12 aspect-[1040/548] w-full overflow-hidden rounded-[31px] design:absolute design:top-[1312px] design:left-[440px] design:mt-0 design:aspect-auto design:h-[548px] design:w-[1040px]">
          <Image
            src="/images/testimoniales/video.webp"
            alt="Testimonio de María G. Murillo"
            width={1331}
            height={749}
            sizes="(min-width: 1280px) 1331px, 100vw"
            className="absolute inset-0 h-full w-full object-cover design:top-[-182px] design:left-[-146px] design:h-[745px] design:w-[1331px] design:max-w-none design:object-fill"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(358.73deg,#000000_14.83%,#05050500_78.16%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute hidden font-bold text-white/[0.14] uppercase design:top-[336px] design:left-[84px] design:block design:text-[154px] design:leading-[160px]"
          >
            Aprobada
          </span>

          <p className="absolute bottom-[86px] left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-x-[14px] text-center text-[32px] leading-[36px] font-semibold uppercase sm:text-[44px] design:bottom-auto design:top-[359px] design:gap-x-[18px] design:text-[55px] design:leading-[57px]">
            <Image
              src="/icons/testimoniales/verificado.svg"
              alt=""
              aria-hidden
              width={55}
              height={55}
              className="h-[38px] w-[38px] shrink-0 design:h-[55px] design:w-[55px]"
            />
            <span>
              <span className="text-vernal-accent">Residencia </span>
              <span className="text-white">aprobada</span>
            </span>
          </p>
          <p className="absolute bottom-[54px] left-1/2 w-full -translate-x-1/2 text-center text-[20px] leading-[24px] font-light design:bottom-auto design:top-[418px] design:text-[30px] design:leading-[31px]">
            <span className="text-vernal-accent">María G. Murillo </span>
            <span className="text-white">Mexicana</span>
          </p>
          <span className="absolute hidden design:bottom-[24px] design:left-[46.7px] design:block design:h-[58px] design:w-[83px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>
          <span className="text-vernal-accent absolute hidden text-[20px] leading-[21px] font-light design:top-[480px] design:left-[856px] design:block">
            Canal Oficial
          </span>

          <button
            type="button"
            aria-label="Ver el testimonio"
            className="absolute top-1/2 left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105 design:h-[96px] design:w-[96px]"
          >
            <span
              aria-hidden
              className="ml-[6px] border-t-[14px] border-b-[14px] border-l-[24px] border-t-transparent border-b-transparent border-l-[#172339] design:border-t-[17px] design:border-b-[17px] design:border-l-[29px]"
            />
          </button>
        </div>

        {/* Tira de fotos de clientes. */}
        <ul className="mt-10 grid grid-cols-2 gap-1 sm:grid-cols-5 design:absolute design:top-[1928px] design:left-0 design:mt-0 design:block design:w-[1920px]">
          {TIRA.map((f) => (
            <li
              key={f.src}
              className="relative aspect-[382/288] overflow-hidden bg-[#818181] design:absolute design:top-0 design:left-[var(--l)] design:aspect-auto design:h-[288px] design:w-[var(--w)]"
              style={{ "--l": `${f.left}px`, "--w": `${f.ancho}px` } as React.CSSProperties}
            >
              <Image
                src={f.src}
                alt=""
                aria-hidden
                width={f.w}
                height={f.h}
                className="absolute inset-0 h-full w-full object-cover design:top-[var(--y)] design:left-[var(--x)] design:h-[var(--h)] design:w-[var(--iw)] design:max-w-none design:object-fill"
                style={
                  {
                    "--x": `${f.x}px`,
                    "--y": `${f.y}px`,
                    "--iw": `${f.w}px`,
                    "--h": `${f.h}px`,
                  } as React.CSSProperties
                }
              />
            </li>
          ))}
        </ul>

        <p className="text-vernal-navy mt-12 text-center design:absolute design:top-[2225.5px] design:left-0 design:mt-0 design:w-full">
          <span className="block text-[72px] leading-[76px] font-semibold sm:text-[110px] sm:leading-[114px] design:text-[176px] design:leading-[184px]">
            +15,000
          </span>
          <span className="block text-[20px] leading-[24px] font-semibold tracking-[0.02em] uppercase sm:text-[28px] design:mt-[-9.5px] design:text-[45px] design:leading-[47px]">
            Personas asesoradas
          </span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- preguntas */

export function TestimonialesPreguntas() {
  return (
    <section className="relative overflow-hidden bg-black design:h-[1216px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:h-[1216px] design:w-[1920px] design:[transform:scaleX(-1)]"
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] design:top-[-781px] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(94.00deg,#000000_8.50%,#00000000_57.36%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1216px] design:max-w-[1920px] design:p-0">
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
            <li
              key={p}
              className="relative flex flex-col gap-y-2 border-t border-white py-5 sm:flex-row sm:items-center sm:justify-between design:block design:h-[109px] design:py-0"
            >
              <span className="text-[20px] leading-[24px] font-light text-white design:absolute design:top-[44px] design:left-[38px] design:text-[24px] design:leading-[25px]">
                {p}
              </span>
              {/* Sin respuestas en el archivo: rótulo, no enlace (ver /faqs). */}
              <span
                aria-hidden
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium design:contents design:text-[20px]"
              >
                <span className="design:absolute design:top-[44px] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span className="text-[34px] leading-none font-light design:absolute design:top-[33.5px] design:left-[1364px] design:text-[41px] design:leading-[42px]">
                  +
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center design:absolute design:top-[1067px] design:left-[821px] design:mt-0 design:block">
          <ButtonLink href="/faqs" className="w-full sm:w-[277px] apilada:w-[277px]">
            Ver más preguntas
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ blog */

export function TestimonialesBlog() {
  return (
    <section className="bg-vernal-accent relative overflow-hidden design:-mt-[20px] design:h-[890px]">
      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[890px] design:max-w-[1920px] design:p-0">
        <h2 className="text-vernal-navy text-center text-[26px] leading-[32px] font-light sm:text-[32px] design:absolute design:top-[78px] design:left-0 design:w-full design:text-[36px] design:leading-[37px]">
          No te pierdas las ultimas noticias
        </h2>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 design:absolute design:top-[165.5px] design:left-0 design:mt-0 design:block design:w-full">
          {entradasBlog.map((e, i) => (
            <li
              key={e.titulo}
              className="relative overflow-hidden bg-[#172339] design:absolute design:top-0 design:left-[var(--l)] design:h-[575px] design:w-[438px]"
              style={{ "--l": `${[252.5, 740.5, 1228.5][i]}px` } as React.CSSProperties}
            >
              <Image
                src={e.imagen}
                alt=""
                aria-hidden
                width={e.foto.w}
                height={e.foto.h}
                sizes="(min-width: 1280px) 438px, 100vw"
                className="absolute inset-0 h-full w-full object-cover design:top-[var(--fy)] design:left-[var(--fx)] design:h-[var(--fh)] design:w-[var(--fw)] design:max-w-none design:object-fill"
                style={
                  {
                    "--fx": `${e.foto.x}px`,
                    "--fy": `${e.foto.y}px`,
                    "--fw": `${e.foto.w}px`,
                    "--fh": `${e.foto.h}px`,
                  } as React.CSSProperties
                }
              />
              <div aria-hidden className="absolute inset-0 bg-black/[0.34]" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(212.75deg,#00000000_11.60%,#000000_56.09%)]"
              />
              <TrazoTarjeta
                id={`testi-blog-trazo-${i}`}
                ancho={438}
                alto={575}
                transformacion="matrix(205.944 -3993.67 214.425 51.5967 18.14 592.81)"
              />

              <span className="bg-vernal-accent text-vernal-navy absolute top-[22px] right-[22px] flex items-center justify-center px-3 py-1 text-[16px] leading-[20px] font-medium design:top-[5.5px] design:right-auto design:left-[326.5px] design:h-[40px] design:w-[93px] design:p-0 design:text-[23px] design:leading-[24px]">
                BLOG
              </span>

              <div className="relative flex h-full flex-col justify-end p-6 design:block design:p-0">
                <h3 className="text-[26px] leading-[30px] font-light whitespace-pre-line text-white design:absolute design:top-[var(--ty)] design:left-[40.5px] design:text-[32px] design:leading-[33px]"
                  style={{ "--ty": `${e.lineas === 2 ? 288 : 268}px` } as React.CSSProperties}
                >
                  {e.titulo}
                </h3>
                <p className="mt-3 text-[13px] leading-[16px] text-white design:absolute design:top-[394px] design:left-[40.5px] design:mt-0 design:w-[340px] design:leading-[14px]">
                  {entradaBlogResumen}
                </p>
                <Link
                  href="/blog"
                  className="bg-vernal-accent text-vernal-navy relative mt-5 flex h-[52px] w-full items-center pl-[25px] text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[223px] apilada:w-[223px] design:absolute design:top-[446.5px] design:left-[40.5px] design:mt-0 design:w-[223px]"
                >
                  Leer articulo
                  <FlechaEnlace className="absolute top-[18.5px] left-[171px] h-[15px] w-[25px]" />
                </Link>
                <p className="mt-4 flex gap-x-[5px] text-[10px] leading-[12px] font-medium text-white design:absolute design:top-[527px] design:left-[40px] design:mt-0">
                  {entradaBlogEtiquetas.map((t, k) => (
                    <span
                      key={t}
                      className="flex items-center justify-center rounded-[3.5px] border border-white/40 px-2 py-[3px] design:h-[18px] design:w-[var(--w)] design:p-0"
                      style={{ "--w": `${k === 0 ? 70 : 85}px` } as React.CSSProperties}
                    >
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center design:absolute design:top-[780px] design:left-[821px] design:mt-0 design:block">
          <Link
            href="/blog"
            className="bg-vernal-navy text-vernal-accent flex h-[52px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px]"
          >
            Ver mas articulos
          </Link>
        </div>
      </div>
    </section>
  );
}
