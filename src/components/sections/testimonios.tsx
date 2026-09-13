"use client";

// Cliente porque su carrusel necesita estado. Un componente de servidor no
// puede pasar funciones de render a uno de cliente.
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Carrusel } from "@/components/ui/carrusel";
import { SelloVerificado } from "@/components/ui/iconos";

/**
 * Testimonios de clientes — rango y=6102..6920 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 6102).
 *
 * Hasta el export del 2026-09-13 el fondo arrancaba en 6077 y solapaba 25px con
 * el live. Ahora empieza justo donde acaba el live y mide 818: el contenido no se
 * movió, así que todas las y de dentro bajan 25 respecto a las de antes.
 *
 *   fondo   1923×818  linear-gradient(352.19deg, #0F0F0F 31.23%, #172339 66.26%)
 *   fotos   x211/595/979/1363, y95, 359×415, cada una con su propio degradado
 *           cian por abajo (los porcentajes varían ligeramente entre tarjetas)
 *   título  69:13   x489 y563  946×109  dos líneas, la primera en #08b6ff
 *   botón   83:145  x822 y672  277×52
 *
 * OJO: "Nombre cliente / Ajuste de estatus" es TEXTO DE RELLENO del diseño, igual
 * en las cuatro tarjetas. Hay que pedirle al cliente los nombres y casos reales
 * antes de publicar, y su consentimiento para usarlos.
 *
 * Lienzo móvil (y=9634..10290): una sola tarjeta de 299×345 en x50 y43, que es
 * la de escritorio escalada exactamente ×0.8329 (foto, recorte, degradado y
 * sello salen proporcionales). En vez de reescribir cada medida se le aplica
 * `zoom`. Ojo: con zoom, el `top`/`left` del propio elemento también se escala,
 * así que se escriben divididos entre 0.8329.
 *
 * El rect de fondo mide 398×818 y la sección siguiente lo tapa desde y656: aquí
 * la sección mide 656 y el fondo va en una capa de 398×818 recortada, para que
 * el degradado reparta igual que en el archivo.
 */

/** Lo que es de la RANURA: posición y degradado, fijos según el archivo. */
const ranuras = [
  { left: 211, deg: 180.0, ini: 61.4, fin: 106.51 },
  { left: 595, deg: 178.22, ini: 62.38, fin: 105.57 },
  { left: 979, deg: 177.81, ini: 56.91, fin: 106.45 },
  { left: 1363, deg: 179.14, ini: 54.43, fin: 101.52 },
];

/** Lo que ROTA: la foto y su recorte. */
const testimonios = [
  { foto: "/images/testimonios/cliente-1.webp", img: { w: 565, h: 423, x: -112, y: -8 } },
  { foto: "/images/testimonios/cliente-2.webp", img: { w: 359, h: 479, x: 0, y: -32 } },
  { foto: "/images/testimonios/cliente-3.webp", img: { w: 359, h: 479, x: 0, y: -32 } },
  { foto: "/images/testimonios/cliente-4.webp", img: { w: 379, h: 415, x: -10, y: 0 } },
];

function Flecha({
  hacia,
  onClick,
}: {
  hacia: "izquierda" | "derecha";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hacia === "izquierda" ? "Testimonio anterior" : "Testimonio siguiente"}
      className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 hidden h-[55px] w-[55px] shrink-0 cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:flex movil:h-[47px] movil:w-[47px] movil:text-[19px] design:flex"
    >
      {hacia === "izquierda" ? "←" : "→"}
    </button>
  );
}

export function Testimonios() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(351.95deg,#0F0F0F_31.23%,#172339_66.26%)] movil:h-[656px] movil:bg-none design:h-[818px] design:bg-[linear-gradient(352.19deg,#0F0F0F_31.23%,#172339_66.26%)]">
      <div
        aria-hidden
        className="pointer-events-none hidden movil:absolute movil:top-0 movil:left-0 movil:block movil:h-[818px] movil:w-[398px] movil:bg-[linear-gradient(326.46deg,#0F0F0F_31.23%,#172339_66.26%)]"
      />
      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[656px] movil:p-0 design:h-[818px] design:p-0">
        <Carrusel
          items={testimonios}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 movil:block design:block"
          controles={({ anterior, siguiente }) => (
            <>
              <div className="relative z-20 movil:absolute movil:top-[183px] movil:left-[24px] design:absolute design:top-[275px] design:left-[171px]">
                <Flecha hacia="izquierda" onClick={anterior} />
              </div>
              <div className="relative z-20 movil:absolute movil:top-[183px] movil:left-[325px] design:absolute design:top-[275px] design:left-[1694px]">
                <Flecha hacia="derecha" onClick={siguiente} />
              </div>
            </>
          )}
        >
          {(t, i, relevo) => {
            const r = ranuras[i];
            return (
              <li
                key={r.left}
                className={`relative h-[415px] overflow-hidden design:absolute design:top-[95px] design:left-[var(--x)] design:w-[359px] ${
                  i === 0
                    ? "movil:absolute movil:top-[51.63px] movil:left-[60.03px] movil:w-[359px] movil:[zoom:0.8329]"
                    : "movil:hidden"
                }`}
                style={{ "--x": `${r.left}px` } as React.CSSProperties}
              >
                <Image
                  key={relevo}
                  src={t.foto}
                  alt=""
                  aria-hidden
                  width={t.img.w}
                  height={t.img.h}
                  className="animate-vernal-relevo absolute max-w-none object-cover"
                  style={{ left: t.img.x, top: t.img.y, width: t.img.w, height: t.img.h }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(${r.deg}deg, rgb(8 182 255 / 0) ${r.ini}%, #08B6FF ${r.fin}%)`,
                  }}
                />
                {/* El grupo sello+texto va CENTRADO en la tarjeta (en el archivo
                    ocupa 178 de los 359 y su centro coincide con el de la foto),
                    no pegado a la izquierda. El hueco entre sello y texto es 9. */}
                <div className="absolute bottom-[22px] left-[22px] flex items-center gap-x-[10px] movil:right-[22px] movil:bottom-[29px] movil:justify-center movil:gap-x-[9px] design:right-[22px] design:bottom-[29px] design:left-[22px] design:justify-center design:gap-x-[9px]">
                  <SelloVerificado className="shrink-0" />
                  <span className="text-white">
                    <span className="block text-[16px] leading-[17px] font-bold">
                      Nombre cliente
                    </span>
                    <span className="block text-[16px] leading-[17px]">
                      Ajuste de estatus
                    </span>
                  </span>
                </div>
              </li>
            );
          }}
        </Carrusel>

        <p className="mt-12 text-center text-[24px] leading-[25px] font-light movil:absolute movil:top-[432px] movil:left-[31px] movil:mt-0 movil:w-[340px] design:absolute design:top-[563px] design:left-[489px] design:mt-0 design:w-[946px] design:leading-[37px] design:text-[36px]">
          <span className="text-vernal-accent block">
            Historias reales, nuevos comienzos.
          </span>
          <span className="block text-white">
            Conoce lo que nuestros clientes tienen que contar.
          </span>
        </p>

        <div className="mt-8 flex justify-center movil:absolute movil:top-[560px] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[672px] design:left-[822px] design:mt-0 design:block">
          <ButtonLink href="/testimoniales" className="w-full sm:w-[277px] movil:w-[277px]">
            Ver más testimonios
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
