import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * Hero de /areas-de-servicio — rango y=0..991 de la frame `211:750`.
 *
 * El fondo son DOS paneles de 963×991 uno al lado del otro, no una foto a lo
 * ancho. Todo sale del export SVG del artboard:
 *
 *   izquierda  x6    963×991  degradado radial #172339 → #0F0F0F
 *   derecha    x972  963×991  foto del skyline al 72% + degradado 80.38°
 *   abogado    x452 y271  668×725  foto 672×710 desplazada (−24,+15) + degradado 204.18°
 *   botón      x237 y801  224×52   #08B6FF
 *   listado    x1114..1639, cinco filas de 109 con una línea de 0.5 encima
 *
 * El artboard mide 1920 pero los paneles empiezan en x6 y acaban en x1935: el
 * diseño se sale 15px por la derecha y deja 6 a la izquierda. Se respeta tal cual
 * y la sección recorta lo que sobra.
 */

/**
 * Las cinco filas del listado, con las coordenadas del archivo:
 *   linea = y de la línea de 0.5 que va encima de la fila
 *   base  = línea base del nombre de la ciudad
 *   nx/nb = x y línea base del número
 *
 * El número no comparte línea base con la ciudad ni la misma x en todas las
 * filas: el archivo las tiene una a una, y se copian tal cual en vez de
 * calcularlas, que es lo que las dejaría descuadradas.
 */
const ciudades = [
  { nombre: "Dallas", n: "01", linea: 340, base: 410, nx: 1577, nb: 407, activa: true },
  { nombre: "Houston", n: "02", linea: 449, base: 519, nx: 1573, nb: 514 },
  { nombre: "Austin", n: "03", linea: 558, base: 628, nx: 1573, nb: 625 },
  { nombre: "Forth Worth", n: "04", linea: 667, base: 737, nx: 1572, nb: 734 },
  { nombre: "San Antonio", n: "05", linea: 776, base: 846, nx: 1572, nb: 843 },
];

export function AreasHero() {
  return (
    // −128 para meterse debajo de la cabecera, igual que el hero de la home.
    <section className="bg-vernal-ink relative -mt-[128px] overflow-hidden design:h-[991px]">
      {/* Panel derecho: skyline de Dallas. Va primero porque en el archivo el
          panel izquierdo se dibuja encima. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:top-0 design:left-[972px] design:h-[991px] design:w-[963px]"
      >
        <Image
          src="/images/areas/skyline-dallas.webp"
          alt=""
          width={1766}
          height={1178}
          className="absolute max-w-none opacity-[0.72] design:top-[-141px] design:left-[119px] design:h-[1178px] design:w-[1766px]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(80.38deg, #0F0F10 37.34%, rgb(15 15 16 / 0.31) 68.15%)",
          }}
        />
      </div>

      {/* Panel izquierdo. El radial del archivo va girado −66°, cosa que CSS no
          sabe hacer; se aproxima con la elipse alineada equivalente (los radios
          salen de proyectar los ejes girados sobre los ejes de la caja). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:top-0 design:left-[6px] design:h-[991px] design:w-[963px]"
        style={{
          backgroundImage:
            "radial-gradient(45.68% 64.95% at 0% 84.71%, #172339 0%, #0F0F0F 100%)",
        }}
      />

      {/* El abogado. La foto es mayor que su caja y se recorta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:top-[271px] design:left-[452px] design:h-[725px] design:w-[668px]"
      >
        <Image
          src="/images/areas/abogado-locaciones.webp"
          alt=""
          width={672}
          height={710}
          priority
          className="absolute max-w-none design:top-[15px] design:left-[-24px] design:h-[710px] design:w-[672px]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(204.18deg, rgb(15 15 15 / 0) 4.41%, #0F0F0F 93.21%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1920px] px-6 pt-[168px] pb-20 lg:px-12 design:h-[991px] design:p-0">
        <h1 className="text-[40px] leading-[42px] font-normal uppercase sm:text-[52px] design:absolute design:top-[286px] design:left-[237px] design:leading-[67px] design:text-[64px]">
          <span className="text-vernal-accent block">Áreas de</span>
          <span className="text-vernal-accent block">practica</span>
          <span className="block text-white">&amp; servicios</span>
        </h1>

        <p className="mt-6 text-[26px] leading-[28px] font-light text-white design:absolute design:top-[528px] design:left-[237px] design:mt-0 design:leading-[37px] design:text-[36px]">
          Justicia sin
          <br />
          fronteras
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[224px] design:absolute design:top-[801px] design:left-[237px] design:mt-0"
        >
          Explora las opciones
        </ButtonLink>

        {/* Listado de ciudades. De momento son enlaces al ancla de cada ciudad
            en el bloque de abajo; el diseño no define otro comportamiento. */}
        <div className="mt-12 design:absolute design:top-0 design:left-0 design:mt-0 design:h-full design:w-full">
          <p className="text-vernal-accent text-[18px] leading-[19px] font-light design:absolute design:top-[287px] design:left-[1120px] design:text-[20px] design:leading-[21px]">
            Seleccione la ciudad
          </p>

          <ul className="mt-6 design:mt-0">
            {ciudades.map((c) => (
              <li key={c.n}>
                <span
                  aria-hidden
                  className="hidden bg-white/100 design:absolute design:top-[var(--linea)] design:left-[1114px] design:block design:h-[0.5px] design:w-[525px]"
                  style={{ "--linea": `${c.linea}px` } as React.CSSProperties}
                />
                <a
                  href={`#${c.nombre.toLowerCase().replace(/ /g, "-")}`}
                  className={`block py-3 text-[28px] leading-[29px] font-semibold uppercase design:absolute design:top-[var(--base)] design:left-[1119.5px] design:py-0 design:text-[40px] design:leading-[42px] ${
                    c.activa ? "text-vernal-accent" : "text-white"
                  }`}
                  style={{ "--base": `${c.base - 34}px` } as React.CSSProperties}
                >
                  {c.nombre}
                </a>
                <span
                  aria-hidden
                  className="hidden text-[32px] leading-[33px] font-light text-white design:absolute design:top-[var(--num)] design:left-[var(--nx)] design:block"
                  style={
                    {
                      "--num": `${c.nb - 28}px`,
                      "--nx": `${c.nx}px`,
                    } as React.CSSProperties
                  }
                >
                  {c.n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
