import Image from "next/image";
import { CamposConsulta } from "@/components/ui/campos-consulta";

/**
 * Hero de /contacto — frame 615:867 (2026-09-19), rango y=0..1142. Geometría
 * del grupo 733:5323:
 *
 *   título   x237 y217, Poppins 400 82px, interlineado 1.04, MAYÚSCULAS;
 *            "Contáctanos" en cian y "en Texas" en blanco
 *   claim    x237 y406, 541 de ancho, Poppins 300 36/1.04; "Estamos para
 *            ayudarte, en" en cian y las cinco ciudades en blanco
 *   texto    x237 y547, 580 de ancho, 16/1.04 justificado
 *   tarjeta  x223 y660, 648×482, linear-gradient(212.18deg, #172339 al 71% →
 *            #40629F al 71%); dentro, la rejilla de CamposConsulta con el mismo
 *            relleno que el hero de la home (38 a la izquierda, 32 arriba)
 *   sello    "Texas Lawyer" (620:1131) en x1466 y522, el mismo del bloque Agenda
 *
 * La etiqueta "Teléfono" del archivo queda DETRÁS de la caja blanca y no se ve;
 * aquí se muestra, como en el resto de formularios.
 *
 * PENDIENTE: la foto de fondo (grupo 620:1132, el abogado sentado con la tableta
 * frente a la bandera). El MCP de Figma llegó a su límite antes de poder
 * descargarla; hasta tenerla, el fondo es el oscuro de la página.
 */
export function ContactoHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[1142px]">
      <div className="relative mx-auto flex max-w-[1040px] flex-col gap-y-8 px-6 pt-[168px] pb-20 lg:px-12 design:block design:h-[1142px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[48px] leading-[50px] uppercase sm:text-[64px] sm:leading-[67px] design:absolute design:top-[217px] design:left-[237px] design:w-[914px] design:text-[82px] design:leading-[85.28px]">
          <span className="text-vernal-accent block">Contáctanos</span>
          <span className="block text-white">en Texas</span>
        </h1>

        <p className="max-w-[541px] text-[28px] leading-[30px] font-light text-white design:absolute design:top-[406px] design:left-[237px] design:w-[541px] design:text-[36px] design:leading-[37.44px]">
          <span className="text-vernal-accent">Estamos para ayudarte, en </span>
          Dallas, Houston, Austin, Fort Worth y San Antonio.
        </p>

        <p className="max-w-[580px] text-[16px] leading-[20px] text-white sm:text-justify design:absolute design:top-[547px] design:left-[237px] design:w-[580px] design:leading-[16.64px]">
          Cuéntanos tu situación migratoria y te orientamos sin compromiso. Nuestro equipo de
          abogados de inmigración está listo para atenderte en la oficina más cercana a ti, o de
          forma virtual.
        </p>

        <form className="w-full max-w-[648px] bg-[linear-gradient(212.18deg,rgb(23_35_57/0.71)_28.639%,rgb(64_98_159/0.71)_76.265%)] p-[38px] design:absolute design:top-[660px] design:left-[223px] design:h-[482px] design:w-[648px] design:max-w-none design:pt-[32px] design:pr-[45px] design:pb-0 design:pl-[38px]">
          <CamposConsulta />
        </form>

        {/* Sello: la misma caja girada que en AgendaConsulta. */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden items-center justify-center design:top-[522px] design:left-[1466px] design:flex design:h-[256.213px] design:w-[257.57px]"
        >
          <div className="flex-none rotate-[-13.7deg] skew-x-[0.14deg]">
            <div className="relative h-[211.941px] w-[212.937px]">
              <div className="absolute inset-[-9.01%_-21.18%_-26%_-13.67%]">
                <Image
                  src="/images/agenda/sello-texas-lawyer.svg"
                  alt=""
                  width={287}
                  height={286}
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
