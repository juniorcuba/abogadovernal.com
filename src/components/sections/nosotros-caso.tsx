import Image from "next/image";

/**
 * "El caso que lo confirmó todo" — frame `181:2125`, export del 2026-09-13,
 * rango y=1634..2282. Coordenadas relativas a la sección.
 *
 *   fondo    x1, 1923×648, tres capas:
 *              1. #08B6FF
 *              2. bandera en hard-light al 42% (recortada a su zona visible)
 *              3. linear-gradient(78.82deg, cian transparente 41.99% → opaco 54.56%)
 *   barra    x243 y165  12×351  #172339
 *   titular  x296 y186  Poppins 64/700, tracking −0.03em, #172339, dos líneas de 67
 *   cuerpo   x296 y362  caja de 580, 16/17 justificado, #172339; la última frase en negrita
 *   tarjeta  x1053 y79  506×492, con la Vernal Shadow 1:
 *              1. #08B6FF   2. foto   3. linear-gradient(179.13deg, #172339
 *              transparente 17.94% → opaco 65.48%)   4. trazo radial de 6 por dentro
 *            cita centrada en 32/300 (la primera mitad en cian) y la firma en 24/700 cian
 *
 * "Vernal Farum", sin la ene, va literal del archivo.
 */
export function NosotrosCaso() {
  return (
    <section className="relative overflow-hidden bg-[#08B6FF] design:h-[648px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-0 design:left-[1px] design:h-[648px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/caso-bandera.webp"
          alt=""
          width={1314}
          height={648}
          className="absolute inset-0 h-full w-full object-cover object-left opacity-[0.42] mix-blend-hard-light design:right-auto design:w-[1314px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(78.82deg,#08B6FF00_41.99%,#08B6FF_54.56%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 design:block design:h-[648px] design:max-w-[1920px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-navy hidden design:absolute design:top-[165px] design:left-[243px] design:block design:h-[351px] design:w-[12px]"
        />

        <div>
          <h2 className="text-vernal-navy text-[38px] leading-[42px] font-bold tracking-[-0.03em] uppercase sm:text-[48px] sm:leading-[52px] design:absolute design:top-[186px] design:left-[296px] design:w-[700px] design:text-[64px] design:leading-[67px]">
            El caso que
            <br />
            lo confirmo todo
          </h2>

          <p className="text-vernal-navy mt-6 max-w-[680px] text-[16px] leading-[22px] sm:text-justify design:absolute design:top-[362px] design:left-[296px] design:mt-0 design:w-[580px] design:max-w-none design:leading-[17px]">
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

        <figure className="shadow-vernal-1 relative overflow-hidden bg-[#08B6FF] px-8 py-10 design:absolute design:top-[79px] design:left-[1053px] design:h-[492px] design:w-[506px] design:px-0 design:py-0">
          <Image
            src="/images/nosotros/caso-tarjeta.webp"
            alt=""
            aria-hidden
            width={1012}
            height={984}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(179.13deg,#17233900_17.94%,#172339_65.48%)]"
          />
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
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

          <blockquote className="relative pt-40 text-center text-[24px] leading-[28px] font-light text-white sm:text-[28px] sm:leading-[32px] design:absolute design:top-[254px] design:left-0 design:w-full design:pt-0 design:text-[32px] design:leading-[33px]">
            <span className="text-vernal-accent">
              &quot;No hay un hito económico <br className="hidden design:inline" />
              que me interese
            </span>{" "}
            más que <br className="hidden design:inline" />
            realmente ayudar a una <br className="hidden design:inline" />
            persona que lo necesita&quot;
          </blockquote>

          <figcaption className="text-vernal-accent relative mt-6 text-center text-[20px] leading-[24px] font-bold design:absolute design:top-[411px] design:left-0 design:mt-0 design:w-full design:text-[24px] design:leading-[25px]">
            Abogado Vernal Farum.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
