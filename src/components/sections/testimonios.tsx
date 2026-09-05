"use client";

// Cliente porque su carrusel necesita estado. Un componente de servidor no
// puede pasar funciones de render a uno de cliente.
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Carrusel } from "@/components/ui/carrusel";
import { SelloVerificado } from "@/components/ui/iconos";

/**
 * Testimonios de clientes — nodos del rango y=6077..6917 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 6077).
 *
 * En el archivo esta sección SOLAPA 25px con la del live (que acaba en 6102),
 * de ahí el margen negativo. Las secciones no se apilan contiguas.
 *
 *   fondo   1923×843  linear-gradient(351.95deg, #0F0F0F 31.23%, #172339 66.26%)
 *   fotos   x211/595/979/1363, y120, 359×415, cada una con su propio degradado
 *           cian por abajo (los porcentajes varían ligeramente entre tarjetas)
 *   título  69:13   x489 y588  946×109  dos líneas, la primera en #08b6ff
 *   botón   83:145  x818 y697  277×52
 *
 * OJO: "Nombre cliente / Ajuste de estatus" es TEXTO DE RELLENO del diseño, igual
 * en las cuatro tarjetas. Hay que pedirle al cliente los nombres y casos reales
 * antes de publicar, y su consentimiento para usarlos.
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
      className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 hidden h-[55px] w-[55px] shrink-0 cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 design:flex"
    >
      {hacia === "izquierda" ? "←" : "→"}
    </button>
  );
}

export function Testimonios() {
  return (
    <section
      className="relative overflow-hidden design:-mt-[25px] design:h-[843px]"
      style={{
        backgroundImage:
          "linear-gradient(351.95deg, #0F0F0F 31.23%, #172339 66.26%)",
      }}
    >
      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[843px] design:p-0">
        <Carrusel
          items={testimonios}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 design:block"
          controles={({ anterior, siguiente }) => (
            <>
              <div className="relative z-20 design:absolute design:top-[300px] design:left-[171px]">
                <Flecha hacia="izquierda" onClick={anterior} />
              </div>
              <div className="relative z-20 design:absolute design:top-[300px] design:left-[1694px]">
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
                className="relative h-[415px] overflow-hidden design:absolute design:top-[120px] design:left-[var(--x)] design:w-[359px]"
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
                <div className="absolute bottom-[22px] left-[22px] flex items-center gap-x-[10px] design:right-[22px] design:bottom-[29px] design:left-[22px] design:justify-center design:gap-x-[9px]">
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

        <p className="mt-12 text-center text-[24px] leading-[25px] font-light design:absolute design:top-[588px] design:left-[489px] design:mt-0 design:w-[946px] design:leading-[37px] design:text-[36px]">
          <span className="text-vernal-accent block">
            Historias reales, nuevos comienzos.
          </span>
          <span className="block text-white">
            Conoce lo que nuestros clientes tienen que contar.
          </span>
        </p>

        <div className="mt-8 flex justify-center design:absolute design:top-[697px] design:left-[818px] design:mt-0 design:block">
          <ButtonLink href="/testimoniales" className="w-full sm:w-[277px]">
            Ver más testimonios
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
