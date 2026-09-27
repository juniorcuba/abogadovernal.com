import Image from "next/image";
import { CamposConsulta } from "@/components/ui/campos-consulta";

/**
 * "Agenda tu consulta" — grupo 612:409 de las sedes (2026-09-19), el mismo que
 * cierran Contacto, Nuestro equipo, Testimoniales, Blogs y FAQs. 1920×755.
 * Coordenadas relativas al bloque:
 *
 *   fondo    banner--contacto1 (foto del abogado con la bandera), 1920×755. Las
 *            ~50 filas de arriba son transparentes: en el archivo el bloque se
 *            monta sobre la sección anterior y deja ver su fondo.
 *   título   x265 y145.23, Poppins 600 64px, interlineado 1.04, "tu consulta" en cian
 *   texto    x271 y232.77, 541 de ancho, 16/1.04 justificado, dos líneas
 *   campos   desde x265 y297.42: la misma rejilla que el formulario del hero
 *            (CamposConsulta), aviso 7px más adentro
 *   sello    "Texas Lawyer" en x1426 y443.65, caja 257.57×256.21, girado −13.7°
 *
 * `solape` es cuánto se mete sobre la sección anterior (71 en las sedes).
 */
export function AgendaConsulta({ solape = 0 }: { solape?: number }) {
  return (
    <section
      className="relative overflow-hidden bg-[#0F0F10] design:mt-[calc(var(--solape)*-1)] design:h-[755px] design:overflow-visible design:bg-transparent"
      style={{ "--solape": `${solape}px` } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/agenda/fondo.webp"
          alt=""
          width={1923}
          height={760}
          sizes="(min-width: 1280px) 1920px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-60 sm:opacity-100 design:w-[1920px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0F0F10_30%,#0F0F1000_75%)] design:hidden" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[755px] design:max-w-[1920px] design:p-0">
        <h2 className="text-[38px] leading-[42px] font-semibold uppercase sm:text-[48px] sm:leading-[52px] design:absolute design:top-[145.23px] design:left-[265px] design:w-[722px] design:text-[64px] design:leading-[66.56px]">
          <span className="text-white">Agenda</span>{" "}
          <span className="text-vernal-accent">tu consulta</span>
        </h2>
        <p className="mt-4 max-w-[541px] text-[16px] leading-[20px] text-white sm:text-justify design:absolute design:top-[232.77px] design:left-[271px] design:mt-0 design:w-[541px] design:leading-[16.64px]">
          Cambios en las leyes de inmigración, consejos prácticos
          <br className="hidden sm:inline" /> y respuestas a las dudas más comunes de nuestra comunidad.
        </p>

        <form className="mt-8 max-w-[565px] design:absolute design:top-[297.42px] design:left-[265px] design:mt-0 design:w-[565px] design:max-w-none">
          <CamposConsulta />
        </form>

        {/* Sello. El SVG sale del export de TESTIMONIALES con el giro ya
            aplicado, así que va como una caja cuadrada sin transformar. */}
        <Image
          src="/images/agenda/sello-immigration-lawyer.svg"
          alt=""
          aria-hidden
          width={240}
          height={240}
          className="pointer-events-none absolute hidden design:top-[456px] design:left-[1433px] design:block design:h-[239.22px] design:w-[239.22px] design:max-w-none"
        />
      </div>
    </section>
  );
}
