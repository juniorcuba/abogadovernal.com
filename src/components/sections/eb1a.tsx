import Image from "next/image";
import { t } from "@/lib/i18n/servidor";

/**
 * /eb-1a — export "VERNAL - EB-1A.svg" (2026-10-17), 1920 × 4427. Sustituye a
 * la página de FAQs. Coordenadas relativas a cada sección.
 *
 * Solo hay artboard de 1920. La franja apilada y el móvil son criterio propio:
 * la foto del hero pasa arriba (nada encima de la cara), textos centrados en
 * apilada y alineados a la izquierda a 38 en móvil, como los artboards de 402
 * de las otras páginas.
 *
 * Los textos se cuadran con la fórmula de Poppins: caja = línea base −
 * ((interlineado − 1.4·tamaño)/2 + 1.05·tamaño).
 */

const CIAN = "text-vernal-accent";

/* ------------------------------------------------------------------------ */
/* Hero, y=0..875 (se mete 128 bajo la cabecera, como todos los heros).
 *
 *   fondo    1917×875: radial girado #172339 → #0F0F0F, la foto 2046×1123 en
 *            (+174, 0) al 42% en plus-lighter y dos lineales encima
 *   antetít. x237 y261, 36/300
 *   h1       x237 y312, 82/400 con interlineado 85, tres líneas
 *   cuerpo   x243 y592, caja de 580, 16/17 justificado
 *   botón    x243 y682, 224×52
 *   tarjeta  x1348 y562 322×309: relleno radial al 87% y trazo radial de 8;
 *            icono 69×69 en (+34, +21), cita 32/300 en (+34, +111)
 */
export function Eb1aHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[radial-gradient(120%_80%_at_10%_30%,#172339_0%,#0F0F0F_100%)] movil:-mt-[106px] design:h-[875px] design:bg-none">
      <div aria-hidden className="pointer-events-none absolute inset-0 design:w-[1917px]">
        <svg className="absolute inset-0 hidden h-full w-full design:block" viewBox="0 0 1917 875" preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="eb1a-hero-fondo"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(1223.26 351.413 -432.474 296.167 113.467 287.841)"
            >
              <stop stopColor="#172339" />
              <stop offset="1" stopColor="#0F0F0F" />
            </radialGradient>
          </defs>
          <rect width="1917" height="875" fill="url(#eb1a-hero-fondo)" />
        </svg>
        {/* Fuera de 1920 la foto es una franja arriba, fundida a negro por
            abajo: el texto va debajo y no tapa la cara. */}
        <Image
          src="/images/eb1a/hero.webp"
          alt=""
          width={2000}
          height={1097}
          priority
          sizes="(min-width: 1280px) 2046px, 100vw"
          className="absolute inset-x-0 top-0 h-[520px] w-full object-cover object-[50%_10%] opacity-70 [mask-image:linear-gradient(180deg,#000_55%,transparent_100%)] movil:top-[96px] movil:h-[330px] design:top-0 design:left-[174px] design:h-[1123px] design:w-[2046px] design:max-w-none design:object-fill design:opacity-[0.42] design:mix-blend-plus-lighter design:[mask-image:none]"
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(317.21deg,#000000_2.38%,#0A0A0A00_14.08%)] design:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#000000_41.24%,#00000000_62.54%)] design:block" />
      </div>

      <div className="relative mx-auto max-w-[760px] px-10 pt-[440px] pb-20 apilada:text-center movil:max-w-none movil:px-[38px] movil:pt-[372px] movil:pb-[64px] design:h-[875px] design:max-w-[1920px] design:p-0">
        <p className="text-[28px] leading-[30px] font-light text-white movil:text-[24px] movil:leading-[26px] design:absolute design:top-[261px] design:left-[237px] design:text-[36px] design:leading-[37px]">
          EB-1A - NIW
        </p>
        <h1 className="mt-3 text-[52px] leading-[56px] font-normal text-white uppercase movil:text-[40px] movil:leading-[43px] design:absolute design:top-[312px] design:left-[237px] design:mt-0 design:w-[900px] design:text-[82px] design:leading-[85px]">
          {t("Tu residencia en EE. UU.,")} <span className={CIAN}>{t("sin depender de un empleador")}</span>
        </h1>
        <p className="mt-6 text-[16px] leading-[22px] text-white apilada:mx-auto apilada:max-w-[580px] movil:text-justify movil:text-[15px] movil:leading-[19px] design:absolute design:top-[592px] design:left-[243px] design:mt-0 design:w-[580px] design:text-justify design:leading-[17px]">
          <strong className="font-bold">EB-1A - NIW</strong>{" "}
          {t("te permiten pedir tu residencia por cuenta propia, sin oferta de trabajo ni patrocinio. Te ayudamos a ver si tu perfil encaja.")}
        </p>
        <a
          href="#evaluacion"
          className="bg-vernal-accent text-vernal-navy mt-8 inline-flex h-[52px] w-[224px] items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 design:absolute design:top-[682px] design:left-[243px] design:mt-0"
        >
          {t("Hacer evaluación")}
        </a>

        <figure className="relative mt-12 h-[250px] w-[300px] apilada:mx-auto apilada:text-left movil:h-[214px] movil:w-[260px] design:absolute design:top-[562px] design:left-[1348px] design:mt-0 design:h-[309px] design:w-[322px]">
          <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 322 309" preserveAspectRatio="none">
            <defs>
              <radialGradient
                id="eb1a-hero-tarjeta-relleno"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(696.289 -652.078 90.4012 96.2458 10.2 231.665)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
              <radialGradient
                id="eb1a-hero-tarjeta-trazo"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(-462 20.7302 -10.2299 -243.702 437.53 93.173)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
            </defs>
            <rect
              width="322"
              height="309"
              fill="url(#eb1a-hero-tarjeta-relleno)"
              fillOpacity="0.87"
              stroke="url(#eb1a-hero-tarjeta-trazo)"
              strokeWidth="8"
            />
          </svg>
          <Image
            src="/icons/eb1a/herramientas.svg"
            alt=""
            width={69}
            height={69}
            className="absolute top-[20px] left-[28px] h-[56px] w-[56px] movil:top-[18px] movil:left-[24px] movil:h-[48px] movil:w-[48px] design:top-[21px] design:left-[34px] design:h-[69px] design:w-[69px]"
          />
          <blockquote className="absolute top-[92px] left-[28px] text-[26px] leading-[27px] font-light whitespace-pre text-white movil:top-[80px] movil:left-[24px] movil:text-[22px] movil:leading-[23px] design:top-[111px] design:left-[34px] design:text-[32px] design:leading-[33px]">
            {t("Tus habilidades\npodrían\ncambiar ")}
            <span className={CIAN}>{t("tu\nsituación\nmigratoria.")}</span>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Qué son, y=875..1666.
 *
 *   fondo    #0B0B0B y la estatua de la Libertad al 17%, 3078×1718 en (0, −228)
 *   título   centrado, y64, 64/300
 *   intro    centrado, y163, caja de 820, 16/17
 *   tarjetas 488×402 en x427 y x954, y246. Debajo un lineal #40629F → #172339,
 *            la foto y encima un lineal transparente → #172339. Insignia blanca
 *            de 75 en (+38, +168) / (+34, +168), título 36/300 a su derecha y
 *            cuerpo en y+266
 *   remate   cursiva centrada, y688
 *
 * OJO: la tarjeta NIW del archivo termina con "No hay una vía "mejor". La
 * adecuada depende de tu perfil y se define en la consulta.", que es el mismo
 * texto del remate de debajo. Se quita de la tarjeta para no repetirlo.
 */
const TARJETAS_VIAS = [
  {
    via: "EB-1A",
    resto: "(habilidad\nextraordinaria).",
    icono: { src: "/icons/eb1a/eb1a.svg", w: 38, h: 38 },
    foto: "/images/eb1a/tarjeta-eb1a.webp",
    // En el artboard la foto va 740×553 en (−202, −135).
    fotoDiseno: "design:top-[-135px] design:left-[-202px] design:h-[553px] design:w-[740px]",
    fotoFuera: "object-[70%_30%]",
    margen: "design:pl-[38px]",
    cuerpo:
      "Para profesionales con una trayectoria sobresaliente en su campo. Debes cumplir al menos 3 de 10 criterios de logros y pasar una evaluación global de tu trayectoria.",
  },
  {
    via: "NIW",
    resto: " (exención por\ninterés nacional).",
    icono: { src: "/icons/eb1a/niw.svg", w: 56, h: 35 },
    foto: "/images/eb1a/tarjeta-niw.webp",
    fotoDiseno: "design:top-[-43px] design:left-[-9px] design:h-[461px] design:w-[618px]",
    fotoFuera: "object-[50%_25%]",
    margen: "design:pl-[34px]",
    cuerpo:
      "Requiere título avanzado o habilidad excepcional. Se evalúa que tu trabajo tenga importancia nacional, que estés bien posicionado para avanzarlo y que a EE. UU. le convenga eximir la oferta de trabajo.",
  },
];

export function Eb1aQueSon() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] design:h-[791px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/eb1a/que-son-fondo.webp"
          alt=""
          width={1376}
          height={768}
          sizes="(min-width: 1280px) 3078px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-[0.17] design:top-[-228px] design:left-0 design:h-[1718px] design:w-[3078px] design:max-w-none design:object-fill"
        />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-10 py-20 text-center movil:px-[38px] movil:py-[64px] design:max-w-none design:px-0 design:pt-[64px] design:pb-0">
        <h2 className="text-[48px] leading-[52px] font-light text-white movil:text-left movil:text-[38px] movil:leading-[41px] design:text-[64px] design:leading-[67px]">
          {t("Qué son")} <span className={`${CIAN} whitespace-nowrap`}>EB-1A-NIW</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[22px] text-white movil:text-left movil:text-[15px] movil:leading-[19px] design:mt-[32px] design:max-w-[820px] design:leading-[17px]">
          {t(
            "Son dos vías de residencia permanente en las que tú presentas tu petición, sin que un empleador te patrocine. Lo que debes demostrar cambia en cada una.",
          )}
        </p>

        <div className="mx-auto mt-12 grid max-w-[488px] gap-6 text-left min-[880px]:max-w-none min-[880px]:grid-cols-2 movil:mt-10 movil:max-w-none movil:grid-cols-1 design:mt-[49px] design:ml-[427px] design:grid-cols-[488px_488px] design:gap-[39px]">
          {TARJETAS_VIAS.map((v) => (
            <article key={v.via} className="relative overflow-hidden design:h-[402px]">
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(198.49deg,#40629F_7.57%,#172339_63.60%)]" />
              <Image
                src={v.foto}
                alt=""
                width={1200}
                height={896}
                sizes="(min-width: 1280px) 740px, (min-width: 880px) 50vw, 100vw"
                className={`absolute inset-x-0 top-0 h-[260px] w-full object-cover movil:h-[220px] design:max-w-none design:object-fill ${v.fotoFuera} ${v.fotoDiseno}`}
              />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(208.72deg,#17233900_24.83%,#172339_54.79%)]" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#17233900_30%,#172339b3_58%)] design:hidden" />

              <div className={`relative px-[34px] pt-[168px] pb-[36px] movil:px-[24px] movil:pt-[140px] movil:pb-[28px] design:pt-[167px] design:pr-0 design:pb-0 ${v.margen}`}>
                <div className="flex items-start gap-[11px]">
                  <span className="mt-px flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full bg-white movil:h-[60px] movil:w-[60px]">
                    <Image
                      src={v.icono.src}
                      alt=""
                      width={v.icono.w}
                      height={v.icono.h}
                      style={{ width: v.icono.w, height: v.icono.h }}
                      className="movil:scale-[0.8]"
                    />
                  </span>
                  <h3 className="text-[30px] leading-[32px] font-light whitespace-pre-line text-white apilada:text-[26px] apilada:leading-[28px] movil:text-[22px] movil:leading-[24px] design:text-[36px] design:leading-[37px]">
                    <span className={CIAN}>{v.via}</span>
                    {t(v.resto)}
                  </h3>
                </div>
                <p className="mt-[25px] text-[16px] leading-[20px] text-white movil:text-[15px] movil:leading-[19px] design:w-[416px] design:leading-[17px]">
                  {t(v.cuerpo)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[16px] leading-[22px] text-white italic movil:text-left movil:text-[15px] movil:leading-[19px] design:mt-[40px] design:leading-[17px]">
          {t("No hay una vía “mejor”.")} <span className={CIAN}>{t("La adecuada depende de tu perfil")}</span>{" "}
          {t("y se define en la consulta.")}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Para quién es, y=1666..2475. Fondo cian (el lineal del archivo va de cian
 * transparente a cian sobre cian: no se ve, no se pinta).
 *
 *   título   centrado, y81, 64/300 negro
 *   subtít.  centrado, y163, 16/17, "evaluar tu caso" en negrita
 *   tarjetas 5 de 242×302 desde x261 cada 277, y241. Relleno oscuro que
 *            sube a #172339 hacia la mitad y trazo radial de 8. Círculo blanco
 *            de 113 con anillo cian de 4, centrado arriba (centro en y+79.5);
 *            el texto, 16/17 centrado, centrado en vertical sobre y+208
 *   remate   centrado, y611, 36/300 negro, dos líneas
 *
 * En móvil cada tarjeta se tumba: círculo a la izquierda y texto a la derecha.
 */
const PERFILES = [
  { icono: "estudios", w: 43, h: 49, texto: "Tienes estudios universitarios o posgrado, y experiencia sólida en tu campo." },
  { icono: "premios", w: 45, h: 55, texto: "Has publicado, recibido premios o salido en medios por tu trabajo." },
  { icono: "equipos", w: 64, h: 62, texto: "Has liderado equipos, proyectos o empresas con impacto medible." },
  { icono: "jurado", w: 64, h: 57, texto: "Has sido jurado, revisor o evaluador del trabajo de otros profesionales." },
  {
    icono: "interes",
    w: 62,
    h: 61,
    texto:
      "Tu trabajo es valioso en un campo de interés para EE. UU., como tecnología, salud, ingeniería, investigación o negocios.",
  },
];

/** Fondo de las tarjetas: los degradados del archivo, relativos a la tarjeta. */
function FondoPerfil({ i }: { i: number }) {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 242 302" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`eb1a-perfil-relleno-${i}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.3" stopColor="#0D1421" />
          <stop offset="0.51" stopColor="#172339" />
        </linearGradient>
        <radialGradient
          id={`eb1a-perfil-trazo-${i}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(114.668 -2112.69 119.391 27.2952 9.163 312.51)"
        >
          <stop stopColor="#172339" />
          <stop offset="1" stopColor="#0F0F0F" />
        </radialGradient>
      </defs>
      <rect
        width="242"
        height="302"
        fill={`url(#eb1a-perfil-relleno-${i})`}
        stroke={`url(#eb1a-perfil-trazo-${i})`}
        strokeWidth="8"
      />
    </svg>
  );
}

export function Eb1aParaQuien() {
  return (
    <section className="bg-vernal-accent relative overflow-hidden design:h-[809px]">
      <div className="relative mx-auto max-w-[1100px] px-10 py-20 text-center text-black movil:px-[38px] movil:py-[64px] design:max-w-none design:px-0 design:pt-[81px] design:pb-0">
        <h2 className="text-[48px] leading-[52px] font-light movil:text-left movil:text-[38px] movil:leading-[41px] design:text-[64px] design:leading-[67px]">
          {t("Para quién es")}
        </h2>
        <p className="mt-4 text-[16px] leading-[20px] movil:text-left movil:text-[15px] design:mt-[15px] design:leading-[17px]">
          {t("Vale la pena")} <strong className="font-bold">{t("evaluar tu caso")}</strong> {t("si:")}
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-5 movil:mt-8 movil:flex-col movil:gap-3 design:mt-[61px] design:ml-[261px] design:flex-nowrap design:justify-start design:gap-[35px]">
          {PERFILES.map((p, i) => (
            <li
              key={p.icono}
              className="relative h-[302px] w-[242px] movil:flex movil:h-auto movil:min-h-[112px] movil:w-full movil:items-center movil:gap-4 movil:px-4 movil:py-4"
            >
              <FondoPerfil i={i} />
              <span className="border-vernal-accent relative mx-auto mt-[21px] flex h-[117px] w-[117px] items-center justify-center rounded-full border-4 bg-white movil:mx-0 movil:mt-0 movil:h-[80px] movil:w-[80px] movil:shrink-0">
                <Image
                  src={`/icons/eb1a/${p.icono}.svg`}
                  alt=""
                  width={p.w}
                  height={p.h}
                  style={{ width: p.w, height: p.h }}
                  className="movil:scale-[0.72]"
                />
              </span>
              <span className="absolute inset-x-[25px] top-[150px] bottom-[36px] flex items-center justify-center text-[16px] leading-[17px] text-white movil:relative movil:inset-auto movil:justify-start movil:text-left movil:text-[15px] movil:leading-[18px]">
                {t(p.texto)}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-[760px] text-[30px] leading-[33px] font-light movil:mt-10 movil:text-left movil:text-[24px] movil:leading-[27px] design:mt-[68px] design:max-w-[960px] design:text-[36px] design:leading-[37px]">
          {t("No necesitas cumplir todo. Tus logros cuentan sin importar en qué país los construiste.")}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Cómo funciona, y=2475..3267.
 *
 *   fondo    negro, el Capitolio 2951×850 en (−472, 0) y
 *            linear-gradient(119.64deg, transparente 25.25% → negro 87.69%).
 *            (Debajo hay otra foto que el Capitolio tapa entera: no se carga.)
 *   personas caja 699×744 en (248, 48); la foto 699×868, recortada por abajo
 *   título   x1068 y104.5, 49/300
 *   pasos    círculos blancos de 49 en (1028, 225 + 95·n), número 32/700
 *            navy; texto en (1109, 235 + 95·n), caja de 395, 16/17 con el
 *            arranque en cian. Rayas de 0.5 #707070 de x1016 a x1504 en
 *            y298.5, 388, 488 y 587
 *   nota     x1034 y616, caja de 470, 14/15 cursiva
 */
const PASOS = [
  { arranque: "Cuéntanos tu perfil.", resto: "Llena el formulario con tus datos y un resumen de tu trayectoria.", raya: 73.5 },
  { arranque: "Consulta con el abogado.", resto: "Revisamos tu perfil y te decimos qué vía puede ajustarse a ti.", raya: 68 },
  { arranque: "Presentamos tu petición.", resto: "Preparamos y enviamos tu caso a las autoridades migratorias.", raya: 73 },
  { arranque: "Seguimiento.", resto: "Te acompañamos hasta la resolución.", raya: 77 },
];

export function Eb1aComoFunciona() {
  return (
    <section className="relative overflow-hidden bg-black design:h-[792px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/eb1a/como-franja.webp"
          alt=""
          width={2000}
          height={576}
          sizes="(min-width: 1280px) 2951px, 100vw"
          className="absolute inset-x-0 top-0 h-[560px] w-full object-cover object-[20%_center] [mask-image:linear-gradient(180deg,#000_50%,transparent_100%)] movil:h-[420px] design:left-[-472px] design:h-[850px] design:w-[2951px] design:max-w-none design:object-fill design:[mask-image:none]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#00000033_0%,#000000cc_55%,#000000_75%)] design:bg-[linear-gradient(119.64deg,#00000000_25.25%,#000000_87.69%)]" />
      </div>

      <div className="relative mx-auto max-w-[760px] px-10 pt-16 pb-20 movil:px-[38px] movil:pt-[48px] movil:pb-[64px] design:h-[792px] design:max-w-[1920px] design:p-0">
        <div className="relative mx-auto h-[440px] w-[400px] overflow-hidden [mask-image:linear-gradient(180deg,#000_75%,transparent_100%)] movil:h-[360px] movil:w-[326px] design:absolute design:top-[48px] design:left-[248px] design:mx-0 design:h-[744px] design:w-[699px] design:[mask-image:none]">
          <Image
            src="/images/eb1a/como-personas.webp"
            alt={t("Una médica y un profesional muestran su tarjeta de residencia frente al Capitolio")}
            width={1128}
            height={1400}
            sizes="(min-width: 1280px) 699px, 400px"
            className="absolute top-0 left-0 h-auto w-full max-w-none design:h-[868px] design:w-[699px]"
          />
        </div>

        <h2 className="mt-10 text-center text-[40px] leading-[44px] font-light text-white movil:mt-8 movil:text-left movil:text-[34px] movil:leading-[37px] design:absolute design:top-[104.5px] design:left-[1068px] design:mt-0 design:text-left design:text-[49px] design:leading-[52px]">
          {t("Cómo funciona")}
        </h2>

        <ol className="mx-auto mt-8 max-w-[480px] movil:mt-6 design:absolute design:top-[225px] design:left-[1028px] design:mt-0 design:w-[476px] design:max-w-none">
          {PASOS.map((p, i) => (
            <li
              key={p.arranque}
              className="relative flex items-start gap-5 border-b-[0.5px] border-[#707070] py-5 design:block design:h-[95px] design:border-0 design:py-0"
            >
              <span className="text-vernal-navy flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-full bg-white text-[32px] leading-none font-bold movil:h-[42px] movil:w-[42px] movil:text-[26px] design:absolute design:top-0 design:left-0">
                {i + 1}
              </span>
              <p className="pt-[8px] text-[16px] leading-[20px] text-white movil:pt-[4px] movil:text-[15px] movil:leading-[19px] design:absolute design:top-[10px] design:left-[81px] design:w-[395px] design:pt-0 design:leading-[17px]">
                <span className={CIAN}>{t(p.arranque)}</span> {t(p.resto)}
              </p>
              <span
                aria-hidden
                className="absolute left-[-12px] hidden h-[0.5px] w-[488px] bg-[#707070] design:block"
                style={{ top: p.raya }}
              />
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-[480px] text-center text-[14px] leading-[18px] text-white italic movil:text-left design:absolute design:top-[616px] design:left-[1034px] design:mt-0 design:w-[470px] design:max-w-none design:text-left design:leading-[15px]">
          {t("Los tiempos dependen de tu situación y de dónde vives,")}{" "}
          <span className={CIAN}>{t("y se explican en la consulta.")}</span>
        </p>
      </div>
    </section>
  );
}
