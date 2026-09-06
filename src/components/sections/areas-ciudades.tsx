"use client";

// Cliente porque el acordeón necesita estado.
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconoEnlaceExterno } from "@/components/ui/iconos";
import { anclaSede } from "@/lib/anclas";

/**
 * "Abogado de Inmigración en Dallas, TX" + acordeón de las cinco sedes.
 * Rango y=996..2603 de la frame `211:750`. Todo del export SVG del artboard.
 *
 *   fondo    x6 y996  1914×1607, dos capas:
 *              1. la bandera al 49%, dibujada 1985×1324 en (+332,−211)
 *              2. linear-gradient(196.07deg, #08B6FF transparente −4.89% → opaco 32.69%)
 *   h2       x237 y1161/1246/1331  Poppins 82 peso 400, interlineado 85
 *            "en" en blanco y "Dallas, TX" en #172339, misma línea
 *   texto    x237 y1383  Poppins 16/400, cuatro líneas de 17
 *   foto     x946 y1068  681×394, borde de 2 en #08B6FF,
 *            imagen 681×459 desplazada (0,−32)
 *   filas    líneas de separación en y1561/1670/1779/1888/1997 y el cierre en 2484,
 *            de x237 a x1678
 *
 * OJO con el acordeón: el resto de la página está posicionada en absoluto, pero
 * esto NO puede estarlo, porque al abrir una fila las de debajo tienen que bajar.
 * Va en flujo dentro de un contenedor absoluto, con las alturas del archivo: 109
 * por fila cerrada y 487 la abierta.
 *
 * El archivo trae la fila 05 abierta y por eso arranca así, aunque para el sitio
 * real lo lógico sería abrir Dallas, que es de quien habla el título. Pendiente
 * de decidir con el cliente.
 *
 * El texto de las sedes es PROVISIONAL: ver `parrafoProvisional`.
 */

/** Las cuatro áreas, tal como están en el archivo. */
const AREAS = [
  { texto: "Peticiones familiares", lineas: 1 },
  { texto: "Defensa Contra la\nDeportación en Dallas", lineas: 2 },
  { texto: "Visa K1 (Prometidos)\nen Dallas", lineas: 2 },
  { texto: "Visas Humanitarias\nen Dallas", lineas: 2 },
];

/**
 * Una fila por sede. Las líneas base van absolutas como en el archivo y de ahí
 * se saca el desplazamiento dentro de la fila: el diseño tiene sus manías —en la
 * 02 el número va 2px más alto y "Expandir" 6px— y se copian en vez de
 * regularizarlas.
 */
const SEDES = [
  { ciudad: "Dallas", n: "01", linea: 1561, bNum: 1628, bCiudad: 1631, bExp: 1622.5, bMas: 1629.85, xNum: 248 },
  { ciudad: "Houston", n: "02", linea: 1670, bNum: 1735, bCiudad: 1740, bExp: 1725.5, bMas: 1732.85, xNum: 244 },
  { ciudad: "Austin", n: "03", linea: 1779, bNum: 1846, bCiudad: 1849, bExp: 1840.5, bMas: 1847.85, xNum: 244 },
  { ciudad: "Forth Worth", n: "04", linea: 1888, bNum: 1955, bCiudad: 1958, bExp: 1950.5, bMas: 1957.85, xNum: 243 },
  { ciudad: "San Antonio", n: "05", linea: 1997, bNum: 2064, bCiudad: 2067, bExp: 2060.5, bMas: 2065.85, xNum: 243 },
];

/**
 * TEXTO PROVISIONAL. En el archivo solo existe el párrafo de San Antonio; aquí se
 * reutiliza cambiando el nombre de la ciudad para que las cinco sedes se vean
 * llenas mientras llega el texto real del cliente.
 *
 * Con "San Antonio" sale palabra por palabra el del archivo, así que la página
 * se puede seguir comparando contra el render.
 *
 * NO PUBLICAR ASÍ: son cinco párrafos idénticos hablando de ciudades distintas.
 */
function parrafoProvisional(ciudad: string) {
  return (
    `${ciudad} es una de las ciudades con mayor crecimiento de comunidad ` +
    `inmigrante en Texas, y nuestra oficina está aquí para acompañarte en cada ` +
    `etapa de tu proceso migratorio. Desde nuestra sede en ${ciudad}, ofrecemos ` +
    `representación en las siguientes áreas:`
  );
}

/** Alto de la fila cerrada y de la abierta, del archivo. */
const ALTO_FILA = 109;

function Areas({ columna }: { columna: 0 | 1 }) {
  // Las dos columnas del archivo tienen exactamente los mismos cuatro enlaces.
  return (
    <ul className="design:w-[401px]">
      {AREAS.map((a) => (
        <li key={`${columna}-${a.texto}`} className="border-t-2 border-white/50">
          <a
            href="/areas-de-practica"
            className="flex items-start justify-between gap-x-4 py-[18px] text-[20px] leading-[25px] font-light text-white transition-opacity hover:opacity-80 design:h-[var(--alto)] design:py-0 design:pt-[21px] design:text-[24px]"
            style={
              { "--alto": `${a.lineas === 1 ? 75 : 92}px` } as React.CSSProperties
            }
          >
            <span className="whitespace-pre-line">{a.texto}</span>
            <IconoEnlaceExterno className="mt-[6px] shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function AreasCiudades() {
  // Por defecto la que trae el archivo abierta.
  const [abierta, setAbierta] = useState("San Antonio");

  // El listado del hero enlaza aquí por ancla. Sin esto el enlace desplaza hasta
  // una fila cerrada, que es peor que no enlazar. Se escucha el hash en vez de
  // compartir estado entre las dos secciones, que no son hermanas.
  useEffect(() => {
    const abrirSegunHash = () => {
      const ancla = decodeURIComponent(window.location.hash.slice(1));
      const sede = SEDES.find((s) => anclaSede(s.ciudad) === ancla);
      if (sede) setAbierta(sede.ciudad);
    };
    abrirSegunHash();
    window.addEventListener("hashchange", abrirSegunHash);
    return () => window.removeEventListener("hashchange", abrirSegunHash);
  }, []);

  return (
    <section className="relative overflow-hidden design:mt-[5px] design:h-[1607px]">
      {/* Fondo: bandera y encima el degradado cian, que arranca transparente y
          por eso arriba se ve el fondo oscuro de la página. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:left-[6px] design:w-[1914px]"
      >
        <Image
          src="/images/areas/bandera-estrellas.webp"
          alt=""
          width={1985}
          height={1324}
          className="absolute max-w-none opacity-[0.49] design:top-[-211px] design:left-[332px] design:h-[1324px] design:w-[1985px]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(196.07deg, rgb(8 182 255 / 0) -4.89%, #08B6FF 32.69%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[1607px] design:p-0">
        <h2 className="text-[44px] leading-[48px] font-normal text-white sm:text-[58px] design:absolute design:top-[94px] design:left-[237px] design:w-[760px] design:leading-[85px] design:text-[82px]">
          Abogado de
          <br />
          Inmigración
          <br />
          en <span className="text-vernal-navy">Dallas, TX</span>
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] text-white design:absolute design:top-[373px] design:left-[237px] design:mt-0 design:w-[580px] design:max-w-none">
          En nuestra oficina de Dallas, ayudamos a la comunidad inmigrante a
          resolver su situación legal con orientación clara y acompañamiento en cada
          paso del proceso. Conoce las áreas en las que podemos ayudarte desde
          nuestra sede en Dallas:
        </p>

        {/* Foto de la oficina, con su borde cian de 2. */}
        <div
          aria-hidden
          /* `outline` y no `border`: en el SVG el trazo de 2 va centrado en el
             borde del rect, así que la caja de la foto sigue midiendo 681×394
             enteros. Con `border` la imagen se metería 2px hacia dentro.
             Y `design:mt-0` porque el `mt-8` de la versión apilada, en un
             elemento absoluto, se suma al `top` y bajaba la foto 32px. */
          className="mt-8 hidden overflow-hidden outline-2 -outline-offset-1 outline-[#08B6FF] design:absolute design:top-[72px] design:left-[946px] design:mt-0 design:block design:h-[394px] design:w-[681px]"
        >
          <Image
            src="/images/areas/oficina-atencion.webp"
            alt=""
            width={681}
            height={459}
            className="absolute max-w-none design:top-[-32px] design:left-0 design:h-[459px] design:w-[681px]"
          />
        </div>

        {/* Acordeón. En flujo, no en absoluto: al abrir una fila las de debajo
            bajan, y con posiciones fijas eso no puede pasar. */}
        <div className="mt-12 design:absolute design:top-[564px] design:left-[237px] design:mt-0 design:w-[1441px]">
          {SEDES.map((s) => {
            const open = abierta === s.ciudad;
            return (
              <div key={s.n} id={anclaSede(s.ciudad)} className="relative scroll-mt-[128px]">
                <button
                  type="button"
                  onClick={() => setAbierta(open ? "" : s.ciudad)}
                  aria-expanded={open}
                  className="relative flex w-full cursor-pointer items-center border-t-2 border-white/50 py-6 text-left design:h-[var(--alto)] design:block design:py-0"
                  style={{ "--alto": `${ALTO_FILA}px` } as React.CSSProperties}
                >
                  <span
                    aria-hidden
                    className="mr-6 text-[24px] leading-[25px] font-light text-white design:absolute design:top-[var(--yn)] design:left-[var(--xn)] design:mr-0 design:text-[32px] design:leading-[33px]"
                    style={
                      {
                        "--yn": `${s.bNum - s.linea - 29}px`,
                        "--xn": `${s.xNum - 237}px`,
                      } as React.CSSProperties
                    }
                  >
                    {s.n}
                  </span>
                  <span
                    className="flex-1 text-[28px] leading-[29px] font-semibold text-white uppercase design:absolute design:top-[var(--yc)] design:left-[124.5px] design:flex-none design:text-[40px] design:leading-[42px]"
                    style={
                      { "--yc": `${s.bCiudad - s.linea - 35}px` } as React.CSSProperties
                    }
                  >
                    {s.ciudad}
                  </span>
                  <span
                    aria-hidden
                    className="text-[16px] leading-[17px] font-medium text-white design:absolute design:top-[var(--ye)] design:left-[1256px] design:text-[20px] design:leading-[21px]"
                    style={
                      { "--ye": `${s.bExp - s.linea - 18}px` } as React.CSSProperties
                    }
                  >
                    {open ? "Contraer" : "Expandir"}
                  </span>
                  {/* La equis del archivo es el mismo "+" girado 45°. */}
                  <span
                    aria-hidden
                    className={`ml-4 text-[30px] leading-none font-light text-white design:absolute design:top-[var(--ym)] design:left-[1364px] design:ml-0 design:text-[41px] ${
                      open ? "rotate-45" : ""
                    }`}
                    style={
                      { "--ym": `${s.bMas - s.linea - 36}px` } as React.CSSProperties
                    }
                  >
                    +
                  </span>
                </button>

                {open && (
                  <div /* 86 y no 71: el archivo pone el párrafo en x365 con 315 de ancho y la
                     primera columna en x766. Entre columnas sí son 71. */
                  className="pb-8 design:flex design:h-[378px] design:gap-x-[86px] design:pb-0 design:pl-[128px]">
                    <p className="max-w-[315px] text-[16px] leading-[17px] text-white design:w-[315px] design:pt-[7px]">
                      {parrafoProvisional(s.ciudad)}
                    </p>
                    <div className="mt-6 grid gap-x-[71px] sm:grid-cols-2 design:mt-0 design:flex">
                      <Areas columna={0} />
                      <Areas columna={1} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div aria-hidden className="border-t-2 border-white/50" />
        </div>
      </div>
    </section>
  );
}
