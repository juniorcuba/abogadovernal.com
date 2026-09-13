import Image from "next/image";
import { FloatingCta } from "@/components/layout/floating-cta";

/**
 * Hero de /nosotros — frame `181:2125`, export del 2026-09-13, rango y=−1..1026.
 * Coordenadas relativas a la sección (empieza en y0, 128px bajo la cabecera).
 *
 *   fondo    rect x−3 y−1 1920×1027, tres capas:
 *              1. linear-gradient(146.05deg, #172339 27.86% → #000000 86.54%)
 *              2. rascacielos en overlay (recortado ya a la zona visible)
 *              3. linear-gradient(352.05deg, #0F0F10 19.13% → transparente 56.35%)
 *   retrato  caja x876 y205 793×821: foto 859×1288 en (−53, −72) y encima
 *            linear-gradient(182.83deg, transparente 57.70% → #0F0F10 97.99%)
 *   antetítulo "Tu defensa en Texas"  x223, línea base 295.1, Poppins 36/300
 *   h1       x223, líneas base 383.2 / 468.2, Poppins 82/600, "VERNAL" en cian,
 *            con la Vernal Shadow 1
 *   cuerpo   x223 y531, caja de 560, 16/17 justificado, "Abogado Vernal Farum" en cian
 *   tarjeta  x1264 y634 322×348: relleno radial al 87% y trazo radial de 8, los dos
 *            girados; icono 73×72 en (+40.5, +50.1) y la cita en 36/300
 *   CTA      el flotante, en y885
 *
 * Los degradados de la tarjeta van en un SVG en línea con los mismos
 * gradientTransform del archivo (restando el origen de la tarjeta): así salen
 * exactos, cosa que con CSS no se puede.
 *
 * Texto LITERAL, incluida la errata "Vernal Farum" sin la ene.
 */
export function NosotrosHero() {
  return (
    // −128 para meterse debajo de la cabecera, como el resto de heros.
    <section className="bg-vernal-ink relative -mt-[128px] overflow-hidden design:h-[1026px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-[-1px] design:left-[-3px] design:h-[1027px] design:w-[1920px]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(146.05deg,#172339_27.86%,#000000_86.54%)]" />
        <Image
          src="/images/nosotros/hero-ciudad.webp"
          alt=""
          width={1920}
          height={1027}
          priority
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-[linear-gradient(352.05deg,#0F0F10_19.13%,#0F0F1000_56.35%)]" />
      </div>

      {/* Retrato: solo en el lienzo de 1920; por debajo tapaba el texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden overflow-hidden design:top-[205px] design:left-[876px] design:block design:h-[821px] design:w-[793px]"
      >
        <Image
          src="/images/nosotros/hero-retrato-2.webp"
          alt=""
          width={859}
          height={1288}
          priority
          className="absolute top-[-72px] left-[-53px] h-[1288px] w-[859px] max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(182.83deg,#0F0F1000_57.70%,#0F0F10_97.99%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[152px] pb-16 lg:px-12 design:block design:h-[1026px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] sm:leading-[32px] design:absolute design:top-[264px] design:left-[223px] design:text-[36px] design:leading-[37px]">
          Tu defensa en Texas
        </p>
        <h1 className="drop-shadow-vernal-1 mt-2 text-[46px] leading-[48px] font-semibold uppercase sm:text-[62px] sm:leading-[64px] design:absolute design:top-[312px] design:left-[223px] design:mt-0 design:text-[82px] design:leading-[85px]">
          <span className="block text-white">Abogado</span>
          <span className="text-vernal-accent block">Vernal</span>
        </h1>

        <p className="mt-8 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify design:absolute design:top-[531px] design:left-[223px] design:mt-0 design:w-[560px] design:max-w-none design:leading-[17px]">
          {"Antes de convertirse en abogado de inmigración, el "}
          <span className="text-vernal-accent">Abogado Vernal Farum</span>
          {' ya conocía el peso de ese sistema desde adentro. Nació en Panamá, pero su historia con la inmigración a Estados Unidos comenzó mucho antes de que él mismo decidiera ejercer el derecho: comenzó viendo a sus propios hermanos cruzar esa frontera legal, y a su madre enfrentar una sanción por una falta administrativa que la ley consideró severa.\n\nNo aprendió sobre el proceso migratorio en un salón de clases. Lo aprendió en su propia casa.\n\nPor eso, cuando dice que "cada cliente que llega a la oficina lleva a mi familia", no es una frase hecha, es literal. Cada caso de inmigración que revisa, cada petición familiar, cada proceso de residencia, le recuerda lo que vivió su propia gente.\n\nEsa cercanía con el sistema migratorio de Estados Unidos y con lo que significa navegarlo sin ayuda, es lo que lo llevó a fundar Vernal Farnum Mejía & Associates, un despacho de inmigración en Texas donde cada caso se atiende con la misma seriedad y cuidado con la que él hubiera querido que atendieran a los suyos.'}
        </p>

        {/* Tarjeta con la cita. En móvil y medidas intermedias va en flujo, debajo del texto. */}
        <figure className="relative mt-10 max-w-[360px] p-8 design:absolute design:top-[634px] design:left-[1264px] design:mt-0 design:h-[348px] design:w-[322px] design:max-w-none design:p-0">
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 322 348"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="nos-hero-tarjeta-relleno"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(696.289 -732.302 90.4012 108.087 10.2 260.658)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
              <radialGradient
                id="nos-hero-tarjeta-trazo"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(-462 23.2806 -10.2299 -273.685 437.53 105.128)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
            </defs>
            <rect
              width="322"
              height="348"
              fill="url(#nos-hero-tarjeta-relleno)"
              fillOpacity="0.87"
              stroke="url(#nos-hero-tarjeta-trazo)"
              strokeWidth="8"
            />
          </svg>
          <Image
            src="/icons/nosotros/cada-cliente.svg"
            alt=""
            width={73}
            height={72}
            className="relative h-[71.87px] w-[72.97px] design:absolute design:top-[50.1px] design:left-[40.5px]"
          />
          <blockquote className="relative mt-6 text-[30px] leading-[32px] font-light whitespace-pre-line text-white design:absolute design:top-[150px] design:left-[34px] design:mt-0 design:text-[36px] design:leading-[37px]">
            {'"cada cliente\nque llega a la\noficina '}
            <span className="text-vernal-accent">{'lleva a\nmi familia"'}</span>
          </blockquote>
        </figure>

        <FloatingCta className="design:top-[885px] design:right-[3px]" />
      </div>
    </section>
  );
}
