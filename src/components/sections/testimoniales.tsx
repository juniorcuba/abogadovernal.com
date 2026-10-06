import Image from "next/image";
import Link from "next/link";
import { BloquePreguntas } from "@/components/sections/bloque-preguntas";
import { TarjetaArticulo } from "@/components/sections/tarjeta-articulo";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { TrazoTarjeta } from "@/components/ui/trazo-tarjeta";
import { preguntasSede } from "@/lib/preguntas";
import { entradasBlogPortada } from "@/lib/blog";
import { testimonios } from "@/lib/testimonios";

/**
 * /testimoniales — frame `453:469` de Figma, 1920 × 6738 (2026-09-26).
 *
 * Bandas: hero 0..991 · casos 983..3487 · preguntas 3487..4703 ·
 * blog 4683..5573 · agenda 5515..6270 · footer 6270. Los solapes son del
 * archivo y por eso hay márgenes negativos.
 *
 * El lienzo de 402 sale de "VESPER AGENCY LANDING - MOBILE (6)" (402 x 9848):
 *
 *   hero    0..1236 (banda de 403×1243 desde y−7; el retrato va en una caja de 402×496
 *           desde y740, y la tarjeta de la cita a (184, 1001), 214×231)
 *   casos   1236..4988: las seis fichas de 354 a x25, el titular, el vídeo de
 *           387×217 y la tira, que aquí son CUATRO fotos en 2×2
 *   faqs    4988..6141 · blog 6141..7812 con tres tarjetas · agenda 7776..8788
 *           (solapa 36) · footer 8788
 *
 * El artboard móvil se deja fuera el "+15.000 personas asesoradas" y los
 * rótulos del vídeo. Aquí se mantienen, con el tamaño del móvil: son contenido
 * y caben en la banda. A preguntar al diseñador.
 */

/** Las seis fichas en el lienzo de 402: y dentro de la banda y alto. */
const TARJETAS_MOVIL = [
  { top: 90, alto: 336, trazo: "matrix(165.122 -2330.77 171.922 30.1127 15.9544 346.19)" },
  { top: 501, alto: 389, trazo: "matrix(165.122 -2691.98 171.922 34.7793 15.9544 400.3)" },
  { top: 971, alto: 389, trazo: "matrix(165.122 -2691.98 171.922 34.7793 15.9544 400.3)" },
  { top: 1440, alto: 378, trazo: "matrix(165.122 -2617.01 171.922 33.8108 15.9544 389.07)" },
  { top: 1884, alto: 378, trazo: "matrix(165.122 -2617.01 171.922 33.8108 15.9544 389.07)" },
  { top: 2334, alto: 389, trazo: "matrix(165.122 -2691.98 171.922 34.7793 15.9544 400.3)" },
];

/** El avatar pasa de 166 a 140, y su encuadre con él. */
const AVATAR_MOVIL = 140 / 166;

/** La tira en el lienzo de 402: solo cuatro huecos, en 2×2. */
const TIRA_MOVIL = [
  { left: 0, top: 3261, ancho: 199 },
  { left: 200, top: 3261, ancho: 202 },
  { left: 0, top: 3413, ancho: 199 },
  { left: 200, top: 3413, ancho: 201 },
];

/* ------------------------------------------------------------------ hero */

export function TestimonialesHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] movil:-mt-[106px] movil:h-[1236px] design:h-[991px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden movil:h-[1243px] movil:w-[403px] design:h-[991px] design:w-[1918px]">
        {/* Degradado radial girado del archivo: CSS no sabe girar un radial. */}
        <svg className="absolute inset-0 h-full w-full movil:hidden" viewBox="0 0 1918 991" preserveAspectRatio="none">
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
        {/* El lienzo de 402 trae su propia matriz para el mismo radial. */}
        <svg className="absolute inset-0 hidden h-full w-full movil:block" viewBox="0 0 403 1243" preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="testi-hero-radial-movil"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(257.158 499.207 -90.9165 420.727 23.8536 401.898)"
            >
              <stop stopColor="#172339" />
              <stop offset="1" stopColor="#0F0F0F" />
            </radialGradient>
          </defs>
          <rect width="403" height="1243" fill="url(#testi-hero-radial-movil)" />
        </svg>
        <Image
          src="/images/testimoniales/hero-fondo.webp"
          alt=""
          width={1473}
          height={922}
          priority
          sizes="(min-width: 1280px) 1473px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.42] mix-blend-plus-lighter movil:top-[70px] movil:left-[-234px] movil:h-[434px] movil:w-[693px] movil:max-w-none movil:object-fill design:top-[69px] design:left-[136px] design:h-[922px] design:w-[1473px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(313.66deg,#000000_2.38%,#0A0A0A00_14.08%)] movil:bg-[linear-gradient(280.11deg,#000000_13.52%,#0A0A0A00_25.88%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(71.50deg,#000000_17.39%,#00000000_42.88%)] movil:bg-[linear-gradient(70.54deg,#000000_14.99%,#00000000_53.03%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(181.96deg,#000000_-1.99%,#00000000_20.19%)] movil:hidden" />
      </div>

      {/* Retrato: la caja de 621×766 recorta la foto, que el archivo mete girada
          1.86° con la matriz del patrón; por eso en el lienzo va a tamaño
          natural con `transform` en vez de estirada. */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden overflow-hidden apilada:top-[150px] apilada:right-0 apilada:block apilada:h-[520px] apilada:w-[420px] movil:top-[740px] movil:right-0 movil:left-0 movil:block movil:h-[496px] movil:w-[402px] design:top-[217px] design:left-[892px] design:block design:h-[766px] design:w-[621px]"
      >
        <Image
          src="/images/testimoniales/hero-retrato.webp"
          alt=""
          width={769}
          height={1785}
          priority
          sizes="621px"
          className="absolute top-[-30px] left-0 h-[1440px] w-[621px] max-w-none apilada:h-[974px] apilada:w-[420px] apilada:[mask-image:linear-gradient(180deg,#000_70%,transparent_100%)] movil:top-[-19px] movil:left-0 movil:h-[932px] movil:w-[402px] design:top-0 design:h-[1785px] design:w-[769px] design:[transform:matrix(0.80739,0.026186,-0.026193,0.806766,-0.3933,-29.9341)] design:[transform-origin:0_0]"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[1236px] movil:max-w-none movil:p-0 design:h-[991px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] movil:absolute movil:top-[177px] movil:left-[38px] movil:text-[24px] movil:leading-[25px] design:absolute design:top-[295px] design:left-[242px] design:text-[36px] design:leading-[37px]">
          Abogado Vernal
        </p>

        <h1 className="mt-3 text-[44px] leading-[48px] uppercase sm:text-[62px] sm:leading-[66px] movil:absolute movil:top-[213px] movil:left-[38px] movil:mt-0 movil:w-[330px] movil:text-[46px] movil:leading-[48px] design:absolute design:top-[349px] design:left-[237px] design:mt-0 design:w-[1000px] design:text-[82px] design:leading-[85px]">
          {/* En 402 "Y" se queda con "CASOS DE" en el mismo renglón. */}
          <span className="block text-white movil:inline">Testimonios y</span>{" "}
          <span className="text-vernal-accent block movil:inline">casos de éxito</span>
        </h1>

        <div className="mt-8 max-w-[680px] space-y-5 text-[16px] leading-[22px] text-white movil:absolute movil:top-[381px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:space-y-0 movil:text-justify movil:text-[15px] movil:leading-[16px] design:absolute design:top-[557px] design:left-[243px] design:mt-0 design:w-[578px] design:max-w-none design:space-y-0 design:text-justify design:leading-[17px]">
          <p>
            Detrás de cada caso que llevamos hay una persona que un día decidió no quedarse
            con la incertidumbre. Alguien que dejó atrás el miedo a preguntar, que se sentó
            frente a nosotros a contarnos su situación, y que hoy tiene algo que antes no
            tenía: certeza, un documento, una familia reunida, un futuro que ya no depende
            de esperar.
          </p>
          <p className="movil:mt-[16px] design:mt-[17px]">
            Estas no son solo historias de casos ganados. Son historias de personas que
            decidieron luchar por lo que les correspondía, y que hoy quieren que tú sepas
            que también es posible para ti.
          </p>
        </div>

        <ButtonLink
          href="#casos"
          className="mt-8 w-full sm:w-[224px] apilada:w-[224px] movil:absolute movil:top-[657px] movil:left-[43px] movil:mt-0 movil:h-[53px] movil:w-[210px] design:absolute design:top-[763px] design:left-[243px] design:mt-0"
        >
          Ver testimonios
        </ButtonLink>

        {/* Tarjeta de la cita, con su propio radial girado. */}
        <div className="relative mt-10 max-w-[420px] movil:absolute movil:top-[1001px] movil:left-[184px] movil:mt-0 movil:h-[231px] movil:w-[214px] movil:max-w-none design:absolute design:top-[670px] design:left-[1348px] design:mt-0 design:h-[309px] design:w-[322px] design:max-w-none">
          <svg
            aria-hidden
            className="absolute inset-0 hidden h-full w-full opacity-[0.87] movil:block design:block"
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
            className="relative ml-6 h-[57px] w-[58px] pt-6 movil:absolute movil:top-[16px] movil:left-[22.6px] movil:m-0 movil:h-[45px] movil:w-[46px] movil:p-0 design:absolute design:top-[22px] design:left-[34px] design:m-0 design:h-[68px] design:w-[69px] design:p-0"
          />
          {/* En el lienzo de 1920 el archivo parte estas cinco líneas a mano;
              por debajo fluyen como un párrafo normal. */}
          <p className="relative bg-[#172339]/90 p-6 text-[26px] leading-[30px] font-light text-white sm:text-[32px] sm:leading-[34px] movil:absolute movil:top-[82px] movil:left-[22px] movil:w-[150px] movil:bg-transparent movil:p-0 movil:text-[20px] movil:leading-[21px] design:absolute design:top-[112px] design:left-[34px] design:w-[254px] design:bg-transparent design:p-0 design:text-[32px] design:leading-[33px]">
            <span className="design:block">Cada historia </span>
            <span className="design:block">aquí empezó </span>
            <span className="design:block">con una duda, </span>
            <span className="text-vernal-accent design:block">y terminó con </span>
            <span className="text-vernal-accent design:block">una nueva vida.</span>
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
  movil,
}: {
  t: (typeof testimonios)[number];
  celda: (typeof TARJETAS)[number];
  movil: (typeof TARJETAS_MOVIL)[number];
}) {
  return (
    <li
      className="relative mt-[83px] bg-[#172339] px-8 pt-[100px] pb-10 movil:absolute movil:top-[var(--tm)] movil:left-[25px] movil:mt-0 movil:h-[var(--hm)] movil:w-[354px] movil:p-0 design:absolute design:top-[var(--t)] design:left-[var(--l)] design:mt-0 design:h-[436px] design:w-[454px] design:p-0"
      style={
        {
          "--t": `${celda.top}px`,
          "--l": `${celda.left}px`,
          "--tm": `${movil.top}px`,
          "--hm": `${movil.alto}px`,
        } as React.CSSProperties
      }
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/[0.34]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(178.59deg,#00000000_4.77%,#172339_51.10%)] movil:bg-[linear-gradient(178.44deg,#00000000_5.18%,#172339_51.09%)]"
      />
      <TrazoTarjeta
        id={`testi-trazo-${celda.left}-${celda.top}`}
        ancho={454}
        alto={436}
        transformacion="matrix(213.283 -3046.36 222.066 39.3579 18.983 450.89)"
        movil={{ ancho: 354, alto: movil.alto, transformacion: movil.trazo, grosor: 6 }}
      />

      {/* Foto redonda montada sobre el borde superior. El encuadre de dentro lo
          pone el archivo a mano en cada tarjeta, así que viene con el dato. */}
      <span
        className="absolute top-[-83px] left-1/2 block h-[166px] w-[166px] -translate-x-1/2 overflow-hidden rounded-full movil:top-[-55px] movil:h-[140px] movil:w-[140px] design:top-[var(--av)]"
        style={{ "--av": `${t.avatar.arriba}px` } as React.CSSProperties}
      >
        <Image
          src={t.foto}
          alt={`${t.nombre}, ${t.caso}`}
          width={720}
          height={900}
          sizes="(min-width: 1280px) 346px, 166px"
          className="h-full w-full object-cover movil:absolute movil:top-[var(--mfy)] movil:left-[var(--mfx)] movil:h-[var(--mfh)] movil:w-[var(--mfw)] movil:max-w-none movil:object-fill design:absolute design:top-[var(--fy)] design:left-[var(--fx)] design:h-[var(--fh)] design:w-[var(--fw)] design:max-w-none design:object-fill"
          style={
            {
              "--fx": `${t.avatar.foto.x}px`,
              "--fy": `${t.avatar.foto.y}px`,
              "--fw": `${t.avatar.foto.w}px`,
              "--fh": `${t.avatar.foto.h}px`,
              "--mfx": `${(t.avatar.foto.x * AVATAR_MOVIL).toFixed(1)}px`,
              "--mfy": `${(t.avatar.foto.y * AVATAR_MOVIL).toFixed(1)}px`,
              "--mfw": `${(t.avatar.foto.w * AVATAR_MOVIL).toFixed(1)}px`,
              "--mfh": `${(t.avatar.foto.h * AVATAR_MOVIL).toFixed(1)}px`,
            } as React.CSSProperties
          }
        />
      </span>

      {/* Cada línea es un <span>: suelto fluye como párrafo y en el lienzo de
          1920 se fuerza a renglón, que es como lo parte el archivo. */}
      <p
        className="relative text-center text-[16px] leading-[22px] text-white movil:absolute movil:top-[97px] movil:left-[12px] movil:w-[330px] movil:text-[15px] movil:leading-[16px] design:absolute design:top-[var(--tt)] design:left-[25px] design:w-[404px] design:leading-[17px]"
        style={{ "--tt": `${t.textoArriba}px` } as React.CSSProperties}
      >
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
        className="relative mt-6 text-center movil:absolute movil:bottom-[28.75px] movil:left-0 movil:mt-0 movil:w-full design:absolute design:top-[var(--n)] design:left-0 design:mt-0 design:w-full"
        style={{ "--n": `${t.nombreArriba - 21.75}px` } as React.CSSProperties}
      >
        <span className="text-vernal-accent block text-[22px] leading-[26px] font-light movil:text-[20px] movil:leading-[21px] design:text-[25px] design:leading-[26px]">
          {t.nombre}
        </span>
        <span className="mt-1 block text-[15px] leading-[16px] font-light text-white movil:mt-[5.25px] design:mt-[4.5px]">
          {t.caso}
        </span>
        <span className="text-vernal-accent mt-1 block text-[15px] leading-[16px] font-light movil:mt-[6px] design:mt-[6px]">
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
      className="relative overflow-hidden bg-vernal-accent movil:h-[3752px] design:-mt-[8px] design:h-[2504px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(250.81deg,#08B6FF00_8.89%,#08B6FF_30.18%)] movil:bg-[linear-gradient(189.18deg,#08B6FF00_46.92%,#08B6FF_48.99%)]" />
        <Image
          src="/images/testimoniales/tarjetas-textura.webp"
          alt=""
          width={1600}
          height={873}
          sizes="(min-width: 1280px) 4876px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.21] mix-blend-hard-light movil:top-[-46px] movil:left-[-2032px] movil:h-[2353px] movil:w-[3213px] movil:max-w-none movil:object-fill design:top-[-156px] design:left-[-1748px] design:h-[2660px] design:w-[4876px] design:max-w-none design:object-fill"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[3752px] movil:max-w-none movil:p-0 design:h-[2504px] design:max-w-[1920px] design:p-0">
        <ul className="grid gap-x-10 gap-y-[120px] sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 movil:block design:block">
          {testimonios.map((t, i) => (
            <TarjetaTestimonio key={t.nombre} t={t} celda={TARJETAS[i]} movil={TARJETAS_MOVIL[i]} />
          ))}
        </ul>

        <p className="text-vernal-navy mt-16 text-center text-[26px] leading-[32px] font-light sm:text-[34px] sm:leading-[40px] movil:absolute movil:top-[2764px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:text-[32px] movil:leading-[33px] design:absolute design:top-[1131px] design:left-[455px] design:mt-0 design:w-[1010px] design:text-[40px] design:leading-[42px]">
          Aquí, cada rostro tiene un nombre. Cada nombre, un proceso distinto.{" "}
          <span className="font-normal text-white">
            Y cada proceso, un final que vale la pena contar.
          </span>
        </p>

        {/* Vídeo del testimonio: 1040×548 en x440 y2295, con el radio de 31 y
            el trazo de 5 centrado en el borde. */}
        <div className="relative mt-12 aspect-[1040/548] w-full movil:absolute movil:top-[3013px] movil:left-[8px] movil:mt-0 movil:aspect-auto movil:h-[217px] movil:w-[387px] design:absolute design:top-[1312px] design:left-[440px] design:mt-0 design:aspect-auto design:h-[548px] design:w-[1040px]">
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[31px] bg-[#D9D9D9]">
            <Image
              src="/images/testimoniales/video.webp"
              alt=""
              width={1331}
              height={749}
              sizes="(min-width: 1280px) 1331px, 100vw"
              className="absolute inset-0 h-full w-full object-cover design:top-[-182px] design:left-[-146px] design:h-[745px] design:w-[1331px] design:max-w-none design:object-fill"
            />
            <div className="absolute inset-0 bg-[linear-gradient(358.73deg,#000000_14.83%,#05050500_78.16%)]" />
          </div>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible design:block"
            viewBox="0 0 1040 548"
          >
            <rect x="0" y="0" width="1040" height="548" rx="31" fill="none" stroke="#172339" strokeWidth="5" />
          </svg>
          <span
            aria-hidden
            className="pointer-events-none absolute hidden font-bold text-white/[0.14] uppercase design:top-[327px] design:left-[84px] design:block design:text-[154px] design:leading-[215.6px]"
          >
            Aprobada
          </span>

          <p className="absolute bottom-[86px] left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-x-[14px] text-center text-[32px] leading-[36px] font-semibold uppercase sm:text-[44px] movil:bottom-[44px] movil:gap-x-[7px] movil:text-[20px] movil:leading-[22px] design:bottom-auto design:top-[355px] design:gap-x-[20.4px] design:text-[55px] design:leading-[57px]">
            <Image
              src="/icons/testimoniales/verificado.svg"
              alt=""
              aria-hidden
              width={55}
              height={55}
              className="h-[38px] w-[38px] shrink-0 movil:h-[20px] movil:w-[20px] design:h-[55px] design:w-[55px]"
            />
            <span>
              <span className="text-vernal-accent">Residencia </span>
              <span className="text-white">aprobada</span>
            </span>
          </p>
          <p className="absolute bottom-[54px] left-1/2 w-full -translate-x-1/2 text-center text-[20px] leading-[24px] font-light movil:bottom-[22px] movil:text-[12px] movil:leading-[14px] design:bottom-auto design:top-[418px] design:text-[30px] design:leading-[31px]">
            <span className="text-vernal-accent">María G. Murillo </span>
            <span className="text-white">Mexicana</span>
          </p>
          <span className="absolute hidden design:top-[453.7px] design:left-[46.7px] design:block design:h-[58px] design:w-[83px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>
          <span className="text-vernal-accent absolute hidden text-[20px] leading-[21px] font-light design:top-[482.5px] design:left-[856px] design:block">
            Canal Oficial
          </span>

          <button
            type="button"
            aria-label="Ver el testimonio"
            className="absolute top-1/2 left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105 movil:h-[44px] movil:w-[44px] design:h-[96px] design:w-[96px]"
          >
            <span
              aria-hidden
              className="ml-[6px] border-t-[14px] border-b-[14px] border-l-[24px] border-t-transparent border-b-transparent border-l-[#172339] movil:ml-[3px] movil:border-t-[8px] movil:border-b-[8px] movil:border-l-[14px] design:border-t-[17px] design:border-b-[17px] design:border-l-[29px]"
            />
          </button>
        </div>

        {/* Tira de fotos de clientes. */}
        {/* En 402 la tira son cuatro fotos en 2×2; la quinta no sale. */}
        <ul className="mt-10 grid grid-cols-2 gap-1 sm:grid-cols-5 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:w-[402px] design:absolute design:top-[1928px] design:left-0 design:mt-0 design:block design:w-[1920px]">
          {TIRA.map((f, i) => (
            <li
              key={f.src}
              className={`relative aspect-[382/288] overflow-hidden bg-[#818181] movil:absolute movil:top-[var(--mt)] movil:left-[var(--ml)] movil:aspect-auto movil:h-[151px] movil:w-[var(--mw)] design:absolute design:top-0 design:left-[var(--l)] design:aspect-auto design:h-[288px] design:w-[var(--w)] ${
                i > 3 ? "movil:hidden" : ""
              }`}
              style={
                {
                  "--l": `${f.left}px`,
                  "--w": `${f.ancho}px`,
                  "--mt": `${(TIRA_MOVIL[i] ?? TIRA_MOVIL[0]).top}px`,
                  "--ml": `${(TIRA_MOVIL[i] ?? TIRA_MOVIL[0]).left}px`,
                  "--mw": `${(TIRA_MOVIL[i] ?? TIRA_MOVIL[0]).ancho}px`,
                } as React.CSSProperties
              }
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

        {/* En el archivo el bloque no está centrado en la página: su eje cae
            73px a la izquierda del medio. */}
        <p className="text-vernal-navy mt-12 text-center movil:absolute movil:top-[3600px] movil:left-0 movil:mt-0 movil:w-full design:absolute design:top-[2225.5px] design:left-0 design:mt-0 design:w-full design:-translate-x-[73px]">
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

/** Las cinco preguntas sobre la banda oscura; el bloque es el compartido. */
export function TestimonialesPreguntas() {
  return (
    <BloquePreguntas
      preguntas={preguntasSede}
      alto={1216}
      fotoArriba={-781}
      gradiente="linear-gradient(94.00deg,#000000 8.50%,#00000000 57.36%)"
      tops={{ titulo: 91, entrada: 338, lista: 449, boton: 1067 }}
      boton={{ texto: "Ver más preguntas", href: "/faqs" }}
    />
  );
}

/* ------------------------------------------------------------------ blog */

/** y del título de cada una de las tres tarjetas, según el archivo. */
const TITULOS_BLOG = [285.4, 265.4, 268.4];

export function TestimonialesBlog() {
  return (
    <section className="bg-vernal-accent relative overflow-hidden movil:h-[1671px] design:-mt-[20px] design:h-[890px]">
      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[1671px] movil:max-w-none movil:p-0 design:h-[890px] design:max-w-[1920px] design:p-0">
        <h2 className="text-vernal-navy text-center text-[26px] leading-[32px] font-light sm:text-[32px] movil:absolute movil:top-[35px] movil:left-[61px] movil:w-[280px] movil:text-[32px] movil:leading-[33px] design:absolute design:top-[78px] design:left-0 design:w-full design:text-[36px] design:leading-[37px]">
          No te pierdas las ultimas noticias
        </h2>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:w-full design:absolute design:top-[165.5px] design:left-0 design:mt-0 design:block design:w-full">
          {entradasBlogPortada.map((e, i) => (
            <TarjetaArticulo
              key={e.titulo}
              entrada={e}
              arriba={TITULOS_BLOG[i]}
              icono={{ left: 369.5, top: 510.5 }}
              id={`testi-blog-trazo-${i}`}
              className="movil:absolute movil:top-[var(--mt)] movil:left-[23px] design:top-0 design:left-[var(--l)]"
              estilo={
                {
                  "--l": `${[252.5, 740.5, 1228.5][i]}px`,
                  "--mt": `${[127, 593, 1065][i]}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </ul>

        <div className="mt-10 flex justify-center movil:absolute movil:top-[1548px] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[780px] design:left-[821px] design:mt-0 design:block">
          <Link
            href="/blog"
            className="bg-vernal-navy text-vernal-accent flex h-[52px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px] movil:w-[277px]"
          >
            Ver mas articulos
          </Link>
        </div>
      </div>
    </section>
  );
}
