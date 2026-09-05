import Image from "next/image";

/**
 * "Nuestro compromiso" — nodos del rango y=3269..4078 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 3269).
 *
 *   fondo   1923×808, tres capas del export SVG:
 *             1. #172339
 *             2. águila 2145×962 en (−730, −154), opacidad 0.44, soft-light
 *             3. linear-gradient(106.20deg, #172339 transparente 3.30% → opaco 71.02%)
 *   título  28:103  x582 y67   760×67   centrado, blanco
 *   texto   28:104  x583 y150  759×74   centrado, con el nombre en negrita
 *   tarjetas        x226/523/820/1117/1414, y240, 280×413, cada una:
 *             fondo linear-gradient(210.91deg, #40629F 7.57%, #172339 63.60%)
 *             foto propia
 *             linear-gradient(185.80deg, #08B6FF transparente 24.95% → opaco 71.30%)
 *             círculo blanco de 75 con su icono, centrado en y471 de la sección
 *   cita    97:60   x427 y697  1102×34  centrada, con parte en #08b6ff
 */

const tarjetas = [
  {
    texto: "Brindar orientación legal clara y honesta en cada etapa del proceso migratorio",
    foto: "/images/compromiso/tarjeta-1.webp",
    icono: "/icons/compromiso/icono-1.svg",
    left: 226,
    // Cada icono está centrado en una x distinta dentro de su tarjeta (72–78px).
    iconoLeft: 298.5 - 226 - 37.5,
    img: { w: 381, h: 520, x: -3, y: -214 },
  },
  {
    texto: "Acompañar a las familias inmigrantes para que puedan reunirse y permanecer juntas legalmente",
    foto: "/images/compromiso/tarjeta-2.webp",
    icono: "/icons/compromiso/icono-2.svg",
    left: 523,
    iconoLeft: 600.5 - 523 - 37.5,
    img: { w: 357, h: 476, x: -39, y: -52 },
  },
  {
    texto: "Defender a quienes enfrentan procesos de deportación o situaciones de vulnerabilidad legal",
    foto: "/images/compromiso/tarjeta-3.webp",
    icono: "/icons/compromiso/icono-3.svg",
    left: 820,
    iconoLeft: 896.5 - 820 - 37.5,
    img: { w: 603, h: 413, x: -176, y: -90 },
  },
  {
    texto: "Empoderar a los inmigrantes con el conocimiento de sus derechos, dentro y fuera de la corte",
    foto: "/images/compromiso/tarjeta-4.webp",
    icono: "/icons/compromiso/icono-4.svg",
    left: 1117,
    iconoLeft: 1190.5 - 1117 - 37.5,
    img: { w: 414, h: 621, x: -43, y: -172 },
  },
  {
    texto: "Contribuir a que más familias latinas construyan un futuro estable y seguro en este país",
    foto: "/images/compromiso/tarjeta-5.webp",
    icono: "/icons/compromiso/icono-5.svg",
    left: 1414,
    iconoLeft: 1491.5 - 1414 - 37.5,
    img: { w: 394, h: 591, x: -57, y: -107 },
  },
];

export function NuestroCompromiso() {
  return (
    <section className="bg-vernal-navy relative overflow-hidden design:h-[808px]">
      <Image
        src="/images/compromiso/fondo.webp"
        alt=""
        aria-hidden
        width={2145}
        height={962}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.44] mix-blend-soft-light design:inset-auto design:top-[-154px] design:left-[-730px] design:h-[962px] design:w-[2145px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(106.20deg, rgb(23 35 57 / 0) 3.30%, #172339 71.02%)",
        }}
      />

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[808px] design:p-0">
        <h2 className="text-center text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] design:absolute design:top-[67px] design:left-[582px] design:w-[760px] design:leading-[67px] design:text-[64px]">
          Nuestro compromiso
        </h2>

        <p className="mt-6 text-center text-[16px] leading-[17px] text-white design:absolute design:top-[150px] design:left-[583px] design:mt-0 design:w-[759px]">
          {"En la firma de "}
          <span className="font-bold">Vernal Farnum Mejia</span>
          {", nuestra misión es facilitar los sueños de nuestros clientes con honestidad, profesionalismo y amor, siempre tomando en cuenta sus mejores intereses y defendiendo lo más valioso que tiene todo ser humano: su familia."}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 design:mt-0 design:block">
          {tarjetas.map((t) => (
            <li
              key={t.left}
              className="relative h-[413px] overflow-hidden design:absolute design:top-[240px] design:w-[280px]"
              style={{
                left: t.left,
                backgroundImage:
                  "linear-gradient(210.91deg, #40629F 7.57%, #172339 63.60%)",
              }}
            >
              <Image
                src={t.foto}
                alt=""
                aria-hidden
                width={t.img.w}
                height={t.img.h}
                className="absolute max-w-none"
                style={{ left: t.img.x, top: t.img.y, width: t.img.w, height: t.img.h }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(185.80deg, rgb(8 182 255 / 0) 24.95%, #08B6FF 71.30%)",
                }}
              />
              <span
                aria-hidden
                className="absolute flex h-[75px] w-[75px] items-center justify-center rounded-full bg-white"
                style={{ left: t.iconoLeft, top: 231.5 - 37.5 }}
              >
                <Image src={t.icono} alt="" width={75} height={75} />
              </span>
              <p className="absolute right-[24px] bottom-[30px] left-[24px] text-[15px] leading-[16px] font-medium text-white">
                {t.texto}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[22px] leading-[23px] font-light text-white design:absolute design:top-[697px] design:left-[427px] design:mt-0 design:w-[1102px] design:leading-[35px] design:text-[34px]">
          “nuestra misión es{" "}
          <span className="text-vernal-accent">facilitar los sueños</span> de nuestros
          clientes”
        </p>
      </div>
    </section>
  );
}
