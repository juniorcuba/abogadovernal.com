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
 *
 * En el lienzo móvil (y=4582..6104, 1522 de alto) las tarjetas pasan a una
 * columna de 324×180 en x36, con la sombra Vernal 1, y el círculo del icono baja
 * a 64.8. Fotos y fondo son los MISMOS archivos que en escritorio (comprobado
 * contra los del export móvil: diferencia media < 1/255), solo cambia el
 * encuadre, así que van por variables CSS y no hay que bajar nada más.
 *
 * Los textos de las tarjetas no se pueden reproducir con un ancho común: la 1
 * corta antes de "y" (ancho < 222) y la 4 necesita 233. Cada una lleva el suyo,
 * acotado con los cortes del archivo. El bloque va centrado en vertical a
 * 125.75 de la tarjeta, que es donde caen tanto los de tres líneas como el de
 * cuatro.
 */

const tarjetas = [
  {
    texto: "Brindar orientación legal clara y honesta en cada etapa del proceso migratorio",
    foto: "/images/compromiso/tarjeta-1.webp",
    icono: "/icons/compromiso/icono-1.svg",
    left: 226,
    movil: { top: 337, circulo: 24, texto: 216, img: { w: 403, h: 467, x: 0, y: -219 } },
    // Cada icono está centrado en una x distinta dentro de su tarjeta (72–78px).
    iconoLeft: 298.5 - 226 - 37.5,
    img: { w: 381, h: 520, x: -3, y: -214 },
  },
  {
    texto: "Acompañar a las familias inmigrantes para que puedan reunirse y permanecer juntas legalmente",
    foto: "/images/compromiso/tarjeta-2.webp",
    icono: "/icons/compromiso/icono-2.svg",
    left: 523,
    movil: { top: 539, circulo: 17, texto: 236, img: { w: 324, h: 432, x: 0, y: -65 } },
    iconoLeft: 600.5 - 523 - 37.5,
    img: { w: 357, h: 476, x: -39, y: -52 },
  },
  {
    texto: "Defender a quienes enfrentan procesos de deportación o situaciones de vulnerabilidad legal",
    foto: "/images/compromiso/tarjeta-3.webp",
    icono: "/icons/compromiso/icono-3.svg",
    left: 820,
    movil: { top: 735, circulo: 23, texto: 252, img: { w: 467, h: 320, x: -71, y: -70 } },
    iconoLeft: 896.5 - 820 - 37.5,
    img: { w: 603, h: 413, x: -176, y: -90 },
  },
  {
    texto: "Empoderar a los inmigrantes con el conocimiento de sus derechos, dentro y fuera de la corte",
    foto: "/images/compromiso/tarjeta-4.webp",
    icono: "/icons/compromiso/icono-4.svg",
    left: 1117,
    movil: { top: 937, circulo: 21.6, texto: 240, img: { w: 324, h: 486, x: 0, y: -153 } },
    iconoLeft: 1190.5 - 1117 - 37.5,
    img: { w: 414, h: 621, x: -43, y: -172 },
  },
  {
    texto: "Contribuir a que más familias latinas construyan un futuro estable y seguro en este país",
    foto: "/images/compromiso/tarjeta-5.webp",
    icono: "/icons/compromiso/icono-5.svg",
    left: 1414,
    movil: { top: 1139, circulo: 28, texto: 228, img: { w: 324, h: 486, x: 0, y: -153 } },
    iconoLeft: 1491.5 - 1414 - 37.5,
    img: { w: 394, h: 591, x: -57, y: -107 },
  },
];

export function NuestroCompromiso() {
  return (
    <section className="bg-vernal-navy relative overflow-hidden movil:h-[1522px] design:h-[808px]">
      <Image
        src="/images/compromiso/fondo.webp"
        alt=""
        aria-hidden
        width={2145}
        height={962}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.44] mix-blend-soft-light movil:inset-auto movil:top-[-120px] movil:left-[-386px] movil:h-[616px] movil:w-[1372px] movil:max-w-none movil:object-fill design:inset-auto design:top-[-154px] design:left-[-730px] design:h-[962px] design:w-[2145px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(106.20deg,#17233900_3.30%,#172339_71.02%)] movil:bg-[linear-gradient(112.40deg,#17233900_31.70%,#172339_66.41%)]"
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[1522px] movil:p-0 design:h-[808px] design:p-0">
        <h2 className="text-center text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] movil:absolute movil:top-[53px] movil:left-[31px] movil:w-[340px] movil:text-left movil:leading-[48px] movil:text-[46px] design:absolute design:top-[67px] design:left-[582px] design:w-[760px] design:leading-[67px] design:text-[64px]">
          Nuestro compromiso
        </h2>

        <p className="mt-6 text-center text-[16px] leading-[17px] text-white movil:absolute movil:top-[172px] movil:left-[36px] movil:mt-0 movil:w-[322px] movil:text-justify design:absolute design:top-[150px] design:left-[583px] design:mt-0 design:w-[759px]">
          {"En la firma de "}
          <span className="font-bold">Vernal Farnum Mejia</span>
          {", nuestra misión es facilitar los sueños de nuestros clientes con honestidad, profesionalismo y amor, siempre tomando en cuenta sus mejores intereses y defendiendo lo más valioso que tiene todo ser humano: su familia."}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 movil:mt-0 movil:block design:mt-0 design:block">
          {tarjetas.map((t) => (
            <li
              key={t.left}
              className="relative h-[413px] overflow-hidden bg-[linear-gradient(210.91deg,#40629F_7.57%,#172339_63.60%)] movil:absolute movil:top-[var(--mt)] movil:left-[36px] movil:h-[180px] movil:w-[324px] movil:bg-[linear-gradient(192.71deg,#40629F_7.57%,#172339_63.60%)] movil:shadow-vernal-1 design:absolute design:top-[240px] design:left-[var(--x)] design:w-[280px]"
              style={
                {
                  "--x": `${t.left}px`,
                  "--mt": `${t.movil.top}px`,
                  // Encuadre de la foto: escritorio (i*) y móvil (m*).
                  "--ix": `${t.img.x}px`,
                  "--iy": `${t.img.y}px`,
                  "--iw": `${t.img.w}px`,
                  "--ih": `${t.img.h}px`,
                  "--mx": `${t.movil.img.x}px`,
                  "--my": `${t.movil.img.y}px`,
                  "--mw": `${t.movil.img.w}px`,
                  "--mh": `${t.movil.img.h}px`,
                  "--il": `${t.iconoLeft}px`,
                  "--mc": `${t.movil.circulo}px`,
                  "--tw": `${t.movil.texto}px`,
                } as React.CSSProperties
              }
            >
              <Image
                src={t.foto}
                alt=""
                aria-hidden
                width={t.img.w}
                height={t.img.h}
                className="absolute top-[var(--iy)] left-[var(--ix)] h-[var(--ih)] w-[var(--iw)] max-w-none movil:top-[var(--my)] movil:left-[var(--mx)] movil:h-[var(--mh)] movil:w-[var(--mw)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(185.80deg,#08B6FF00_24.95%,#08B6FF_71.30%)] movil:bg-[linear-gradient(182.19deg,#08B6FF00_24.95%,#08B6FF_54.14%)]"
              />
              <span
                aria-hidden
                className="absolute top-[194px] left-[var(--il)] flex h-[75px] w-[75px] items-center justify-center rounded-full bg-white movil:top-[var(--mc)] movil:left-[34px] movil:h-[64.8px] movil:w-[64.8px]"
              >
                <Image
                  src={t.icono}
                  alt=""
                  width={75}
                  height={75}
                  className="movil:h-[64.8px] movil:w-[64.8px]"
                />
              </span>
              {/* Negro, no blanco: el archivo lo trae con fill "black". Va anclado
                  ARRIBA —anclarlo abajo dejaba el texto 32px más lejos del icono en
                  la tarjeta de 4 líneas— a 40 del borde izquierdo.
                  El ancho de 190 sale de acotarlo con los cortes de línea del
                  archivo: por debajo de 183 la tarjeta 2 parte una línea de más, y
                  a partir de ~193 las tarjetas 1, 4 y 5 juntan dos en una. */}
              <p className="absolute right-[24px] bottom-[30px] left-[24px] text-[16px] leading-[17px] text-white movil:top-[72px] movil:right-auto movil:bottom-0 movil:left-[34px] movil:flex movil:w-[var(--tw)] movil:items-center movil:text-[14px] movil:leading-[15px] movil:text-black design:top-[283px] design:right-auto design:bottom-auto design:left-[40px] design:w-[190px] design:text-black">
                {t.texto}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[22px] leading-[23px] font-light text-white movil:absolute movil:top-[1384px] movil:left-[61px] movil:mt-0 movil:w-[280px] movil:leading-[25px] movil:text-[24px] design:absolute design:top-[697px] design:left-[427px] design:mt-0 design:w-[1102px] design:leading-[37px] design:text-[36px]">
          “nuestra misión es{" "}
          <span className="text-vernal-accent">facilitar los sueños</span> de nuestros
          clientes”
        </p>
      </div>
    </section>
  );
}
