import Image from "next/image";

/**
 * "El caso que lo confirmó todo" — frame `181:2125`, export del 2026-09-13,
 * rango y=1634..2282. Coordenadas relativas a la sección.
 *
 *   fondo    x1, 1923×648, cuatro capas:
 *              1. #08B6FF
 *              2. bandera en hard-light al 42% (recortada a su zona visible)
 *              3. degradado RADIAL girado −31.4891° centrado en (1436.5, 324) con
 *                 radios 570.514×1693.05: cian transparente 11.04% → #0F71A3 al
 *                 46.7% en 14.70% → #172339 al 100%. Va en un <svg> porque CSS no
 *                 sabe girar un radial.
 *              4. linear-gradient(241.63deg, negro 0.96% → transparente 41.42%)
 *   barra    x243 y165  12×351  #08B6FF
 *   titular  x296 y186  Poppins 64/700, tracking −0.03em, BLANCO, dos líneas de 67
 *   cuerpo   x296 y362  caja de 580, 16/17 justificado, blanco; la última frase en negrita
 *   tarjeta  x1053 y79  506×492, con la Vernal Shadow 1:
 *              1. #08B6FF   2. foto   3. linear-gradient(179.13deg, #172339
 *              transparente 17.94% → opaco 65.48%)   4. trazo radial de 6 por dentro
 *            cita centrada en 32/300 (la primera mitad en cian) y la firma en 24/700 cian
 *
 * "Vernal Farum", sin la ene, va literal del archivo.
 *
 * MÓVIL (artboard `924:1031`, rango y=2230..3228, 998 de alto): lo mismo en una
 * columna. Ahí el fondo no lleva el radial girado sino dos degradados lineales,
 * la barra cian desaparece y el titular parte en tres líneas.
 *
 * Ese artboard repite en esta banda el mismo párrafo que en la anterior (el de
 * la misión). Se mantiene el texto de escritorio: la misma URL no puede servir
 * contenidos distintos según el ancho. Pendiente de preguntar al diseñador.
 */
export function NosotrosCaso() {
  return (
    <section className="relative overflow-hidden bg-[#08B6FF] movil:h-[998px] design:h-[648px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 movil:inset-auto movil:top-0 movil:left-[-4px] movil:h-[998px] movil:w-[403px] design:inset-auto design:top-0 design:left-[1px] design:h-[648px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/caso-bandera.webp"
          alt=""
          width={1314}
          height={648}
          className="absolute inset-0 h-full w-full object-cover object-left opacity-[0.42] mix-blend-hard-light movil:hidden design:right-auto design:w-[1314px]"
        />
        <Image
          src="/images/nosotros/caso-bandera-movil.webp"
          alt=""
          width={1208}
          height={672}
          className="absolute hidden opacity-[0.42] mix-blend-hard-light movil:top-[348px] movil:left-[-366px] movil:block movil:h-[672px] movil:w-[1208px] movil:max-w-none"
        />
        <div className="absolute inset-0 hidden bg-[linear-gradient(0.41deg,#08B6FF00_22.63%,#0F71A377_34.37%,#172339_68.20%)] movil:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(0.06deg,#000000_0.05%,#00000000_38.92%)] movil:block" />
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full movil:hidden"
          viewBox="0 0 1923 648"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id="nos-caso-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1436.5 324) rotate(-31.4891) scale(570.514 1693.05)"
            >
              <stop offset="0.110405" stopColor="#08B6FF" stopOpacity="0" />
              <stop offset="0.146981" stopColor="#0F71A3" stopOpacity="0.46677" />
              <stop offset="1" stopColor="#172339" />
            </radialGradient>
          </defs>
          <rect width="1923" height="648" fill="url(#nos-caso-radial)" />
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(241.63deg,#000000_0.96%,#00000000_41.42%)] movil:hidden" />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 apilada:max-w-[880px] apilada:px-10 apilada:py-20 movil:block movil:h-[998px] movil:max-w-none movil:p-0 design:block design:h-[648px] design:max-w-[1920px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-accent hidden design:absolute design:top-[165px] design:left-[243px] design:block design:h-[351px] design:w-[12px]"
        />

        <div className="movil:contents">
          <h2 className="text-white text-[38px] leading-[42px] font-bold tracking-[-0.03em] uppercase sm:text-[48px] sm:leading-[52px] movil:absolute movil:top-[49px] movil:left-[42px] movil:w-[330px] movil:text-[46px] movil:leading-[48px] movil:font-semibold movil:tracking-normal design:absolute design:top-[186px] design:left-[296px] design:w-[700px] design:text-[64px] design:leading-[67px]">
            El caso que
            <br />
            lo confirmo
            <br className="hidden movil:inline" /> todo
          </h2>

          <p className="text-white mt-6 max-w-[680px] text-[16px] leading-[22px] sm:text-justify movil:absolute movil:top-[212px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[362px] design:left-[296px] design:mt-0 design:w-[580px] design:max-w-none design:leading-[17px]">
            Entre los casos que marcaron su carrera como abogado de inmigración en
            Texas, destaca uno que llegó casi por accidente: una familia con un menor
            que enfrentaba una situación médica delicada, y que ya había sido
            rechazada por varios abogados antes de encontrarlo a él.{" "}
            <strong className="font-bold">
              Con creatividad legal, su equipo encontró un camino migratorio que
              permitió a la familia acceder a la atención médica que necesitaban en
              Estados Unidos.
            </strong>
          </p>
        </div>

        <figure className="shadow-vernal-1 relative overflow-hidden bg-[#08B6FF] px-8 py-10 movil:absolute movil:top-[587px] movil:left-[37px] movil:h-[314px] movil:w-[328px] movil:px-0 movil:py-0 design:absolute design:top-[79px] design:left-[1053px] design:h-[492px] design:w-[506px] design:px-0 design:py-0">
          <Image
            src="/images/nosotros/caso-tarjeta.webp"
            alt=""
            aria-hidden
            width={1012}
            height={984}
            className="absolute inset-0 h-full w-full object-cover movil:hidden"
          />
          <Image
            src="/images/nosotros/caso-tarjeta-movil.webp"
            alt=""
            aria-hidden
            width={479}
            height={427}
            className="absolute hidden movil:top-[-51px] movil:left-[-76px] movil:block movil:h-[427px] movil:w-[479px] movil:max-w-none"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(179.13deg,#17233900_17.94%,#172339_65.48%)]"
          />
          {/* En el lienzo de 402 el trazo es de 6 sobre una caja de 322×308. */}
          <svg
            aria-hidden
            className="absolute inset-0 hidden h-full w-full movil:block"
            viewBox="0 0 328 314"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="nos-caso-trazo-movil"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(-284.1 -207.4 68.3 -101.4 212.1 233.9)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
            </defs>
            <rect
              x="3"
              y="3"
              width="322"
              height="308"
              fill="none"
              stroke="url(#nos-caso-trazo-movil)"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full movil:hidden"
            viewBox="0 0 506 492"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="nos-caso-trazo"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(-438.376 -325 105.348 -158.853 327.24 366.5)"
              >
                <stop stopColor="#172339" />
                <stop offset="1" stopColor="#0F0F0F" />
              </radialGradient>
            </defs>
            <rect
              x="3"
              y="3"
              width="500"
              height="486"
              fill="none"
              stroke="url(#nos-caso-trazo)"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <blockquote className="relative pt-40 text-center text-[24px] leading-[28px] font-light text-white sm:text-[28px] sm:leading-[32px] movil:absolute movil:top-[165px] movil:left-0 movil:w-full movil:pt-0 movil:text-[20px] movil:leading-[21px] design:absolute design:top-[254px] design:left-0 design:w-full design:pt-0 design:text-[32px] design:leading-[33px]">
            <span className="text-vernal-accent">
              &quot;No hay un hito económico{" "}
              <br className="hidden movil:inline design:inline" />
              que me interese
            </span>{" "}
            más que <br className="hidden movil:inline design:inline" />
            realmente ayudar a una <br className="hidden movil:inline design:inline" />
            persona que lo necesita&quot;
          </blockquote>

          <figcaption className="text-vernal-accent relative mt-6 text-center text-[20px] leading-[24px] font-bold movil:absolute movil:top-[262px] movil:left-0 movil:mt-0 movil:w-full movil:text-[16px] movil:leading-[17px] design:absolute design:top-[411px] design:left-0 design:mt-0 design:w-full design:text-[24px] design:leading-[25px]">
            Abogado Vernal Farum.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
