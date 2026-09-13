import Image from "next/image";
import { FloatingCta } from "@/components/layout/floating-cta";
import {
  politicaPrivacidad,
  type BloqueConHueco,
  type Trozo,
} from "@/lib/politicas-privacidad";

/**
 * Cuerpo de /politicas-de-privacidad — nodo 425:2203, rango y=0..3188.
 * Coordenadas relativas a la sección, que empieza en y0 (se mete 128px bajo la
 * cabecera, como los heros).
 *
 *   fondo    rect x8 y9 1920×1231, tres capas:
 *              1. foto 1035×1552 en (+885, 0)
 *              2. linear-gradient(245.74deg, #0F0F0F transparente 0.90% → opaco 46.16%)
 *              3. linear-gradient(357.15deg, #0F0F0F 2.18% → transparente 27.19%)
 *   título   x255, líneas base 272.9 y 339.9, Poppins 64/400 (no 600 como los
 *            demás titulares), "POLÍTICAS DE" blanco y "PRIVACIDAD" cian
 *   texto    x255 y411, caja de 845 (843 en el archivo; Chrome deja 2px de
 *            aire al final de la línea justificada), Poppins 16 con interlineado 17, justificado.
 *            Entre bloques, UNA línea en blanco (17px). Las viñetas van a +10 y el
 *            texto a +24 por nivel.
 *   tarjeta  x1434 y701 322×291 al 87%: degradado radial elíptico y girado,
 *            icono 74×80 en (+34, +27) y "una firma "imperfectamente honesta""
 *            en 36/300, con la última línea en cian
 *   CTA      el flotante, en y846. En el archivo tapa media tarjeta; se deja así.
 *
 * Por debajo de 1280 no hay diseño: texto apilado con la medida de lectura
 * limitada, la foto como fondo de cabecera y sin la tarjeta decorativa.
 */

function Texto({ trozos }: { trozos: Trozo[] }) {
  return trozos.map((t, i) =>
    typeof t === "string" ? (
      t
    ) : (
      <span key={i} className="text-vernal-accent">
        {t.texto}
      </span>
    ),
  );
}

/** Viñeta: el "•" a +10 del inicio de su nivel y el texto a +24. */
const VINETA =
  "relative pl-[24px] before:absolute before:left-[9px] before:content-['•']";

function BloqueLegal({ bloque, primero }: { bloque: BloqueConHueco; primero: boolean }) {
  // Una línea en blanco (17px) antes de cada bloque, salvo el primero y los pegados.
  const hueco = primero || bloque.pegado ? "" : "mt-[17px]";

  switch (bloque.tipo) {
    case "titulo": {
      const clase = `text-vernal-accent ${bloque.negrita ? "font-bold" : "font-normal"} ${hueco}`;
      return bloque.nivel === 2 ? (
        <h2 className={clase}>{bloque.texto}</h2>
      ) : (
        <h3 className={clase}>{bloque.texto}</h3>
      );
    }
    case "parrafo":
      return (
        <p className={`sm:text-justify ${hueco}`}>
          <Texto trozos={bloque.texto} />
        </p>
      );
    case "lineas":
      return (
        <p className={hueco}>
          {bloque.lineas.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </p>
      );
    case "lista":
      return (
        <ul className={hueco}>
          {bloque.items.map((item) => (
            <li key={item.texto} className={`${VINETA} sm:text-justify`}>
              {item.texto}
              {item.sub && (
                <ul>
                  {item.sub.map((s) => (
                    <li key={s} className={VINETA}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
  }
}

export function PoliticasContenido() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[3188px]">
      {/* Fondo: foto a la derecha fundida a negro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden design:top-[9px] design:left-[8px] design:h-[1231px] design:w-[1920px]"
      >
        <Image
          src="/images/politicas/hero.webp"
          alt=""
          width={1035}
          height={1552}
          priority
          sizes="(min-width: 1280px) 1035px, 100vw"
          className="absolute top-0 right-0 h-full w-full object-cover object-[60%_20%] opacity-40 design:right-auto design:left-[885px] design:h-[1552px] design:w-[1035px] design:max-w-none design:object-fill design:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0F0F0F66_0%,#0F0F0F_100%)] design:bg-[linear-gradient(245.74deg,#0F0F0F00_0.90%,#0F0F0F_46.16%)]" />
        <div className="absolute inset-0 hidden design:block design:bg-[linear-gradient(357.15deg,#0F0F0F_2.18%,#0F0F0F00_27.19%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 design:h-[3188px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[40px] leading-[42px] font-normal uppercase sm:text-[56px] sm:leading-[58px] design:absolute design:top-[217px] design:left-[255px] design:text-[64px] design:leading-[67px]">
          <span className="block text-white">Políticas de</span>
          <span className="text-vernal-accent block">privacidad</span>
        </h1>

        <div className="mt-10 max-w-[680px] text-[16px] leading-[22px] text-white design:absolute design:top-[411px] design:left-[255px] design:mt-0 design:w-[845px] design:max-w-none design:leading-[17px]">
          {politicaPrivacidad.map((bloque, i) => (
            <BloqueLegal key={i} bloque={bloque} primero={i === 0} />
          ))}
        </div>

        {/* Tarjeta decorativa "una firma imperfectamente honesta". */}
        <div
          aria-hidden
          className="hidden design:absolute design:top-[701px] design:left-[1434px] design:block design:h-[291px] design:w-[322px]"
        >
          {/* El fondo es un radial elíptico GIRADO: CSS no lo tiene, así que se
              pinta un círculo de radio 100 y se le aplica la matriz del SVG
              (dividida entre 100). El 87% va en el contenedor de las dos capas. */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.87]">
            <div className="absolute inset-0 bg-[#0F0F0F]" />
            <div
              className="absolute top-[-100px] left-[-100px] h-[200px] w-[200px] origin-center bg-[radial-gradient(circle_closest-side,#172339_0%,#0F0F0F_100%)]"
              style={{ transform: "matrix(6.96289, -6.15051, 0.904012, 0.907807, 10.2, 218.283)" }}
            />
          </div>
          <Image
            src="/icons/politicas/firma-honesta.svg"
            alt=""
            width={74}
            height={80}
            className="absolute top-[26.8px] left-[33.9px] h-[80.35px] w-[74.22px]"
          />
          <p className="absolute top-[125.3px] left-[34px] text-[36px] leading-[37px] font-light whitespace-pre text-white">
            {'una firma\n"imperfecta\nmente\n'}
            <span className="text-vernal-accent">honesta”</span>
          </p>
        </div>

        <FloatingCta className="design:top-[846px] design:right-[3px]" />
      </div>
    </section>
  );
}
