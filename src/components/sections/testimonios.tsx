import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

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

const testimonios = [
  { foto: "/images/testimonios/cliente-1.webp", left: 211, img: { w: 565, h: 423, x: -112, y: -8 }, deg: 180.0, ini: 61.4, fin: 106.51 },
  { foto: "/images/testimonios/cliente-2.webp", left: 595, img: { w: 359, h: 479, x: 0, y: -32 }, deg: 178.22, ini: 62.38, fin: 105.57 },
  { foto: "/images/testimonios/cliente-3.webp", left: 979, img: { w: 359, h: 479, x: 0, y: -32 }, deg: 177.81, ini: 56.91, fin: 106.45 },
  { foto: "/images/testimonios/cliente-4.webp", left: 1363, img: { w: 379, h: 415, x: -10, y: 0 }, deg: 179.14, ini: 54.43, fin: 101.52 },
];

function Flecha({ hacia }: { hacia: "izquierda" | "derecha" }) {
  return (
    <button
      type="button"
      aria-label={hacia === "izquierda" ? "Anterior" : "Siguiente"}
      className="bg-vernal-accent text-vernal-navy hidden h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-[20px] transition-opacity hover:opacity-90 design:flex"
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
        <div className="design:absolute design:top-[311px] design:left-[176px]">
          <Flecha hacia="izquierda" />
        </div>
        <div className="design:absolute design:top-[311px] design:left-[1700px]">
          <Flecha hacia="derecha" />
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 design:block">
          {testimonios.map((t) => (
            <li
              key={t.left}
              className="relative h-[415px] overflow-hidden design:absolute design:top-[120px] design:w-[359px]"
              style={{ left: t.left }}
            >
              <Image
                src={t.foto}
                alt=""
                aria-hidden
                width={t.img.w}
                height={t.img.h}
                className="absolute max-w-none object-cover"
                style={{ left: t.img.x, top: t.img.y, width: t.img.w, height: t.img.h }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(${t.deg}deg, rgb(8 182 255 / 0) ${t.ini}%, #08B6FF ${t.fin}%)`,
                }}
              />
              <div className="absolute bottom-[22px] left-[22px] flex items-center gap-x-[10px]">
                <span
                  aria-hidden
                  className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-white text-[15px] leading-none text-vernal-accent"
                >
                  ✓
                </span>
                <span className="text-white">
                  <span className="block text-[14px] leading-[1.15] font-bold">
                    Nombre cliente
                  </span>
                  <span className="block text-[13px] leading-[1.15]">
                    Ajuste de estatus
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-[24px] leading-[1.04] font-light design:absolute design:top-[588px] design:left-[489px] design:mt-0 design:w-[946px] design:text-[36px]">
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
