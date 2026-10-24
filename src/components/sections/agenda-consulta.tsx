import Image from "next/image";
import { CamposConsulta } from "@/components/ui/campos-consulta";
import { idiomaActual, t } from "@/lib/i18n/servidor";
import { FormularioConsulta } from "@/components/ui/formulario-consulta";

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
 *
 * En el lienzo de 402 se queda sin título y sin texto. Desde el export del
 * 2026-10-11 ("… FAQ MOBILE", y1926) mide 402×943 —antes 1012—, con la foto
 * más pequeña para que se vea la cabeza entera:
 *
 *   fondo    la misma foto, 908×359 en (−397, 0), y encima
 *            linear-gradient(356.51°, negro 64.47% → transparente 77.30%)
 *   sello    125.7×125.7 en (246.3, 249.9)
 *   campos   x38 y395, caja de 325; el aviso respira 27.5
 */
export function AgendaConsulta({
  solape = 0,
  solapeMovil = 0,
}: {
  solape?: number;
  /** Lo que se mete sobre la sección anterior en el lienzo de 402. */
  solapeMovil?: number;
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#0F0F10] movil:mt-[calc(var(--solape-movil)*-1)] movil:h-[943px] design:mt-[calc(var(--solape)*-1)] design:h-[755px] design:overflow-visible design:bg-transparent"
      style={{ "--solape": `${solape}px`, "--solape-movil": `${solapeMovil}px` } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/agenda/fondo.webp"
          alt=""
          width={1923}
          height={760}
          sizes="(min-width: 1280px) 1920px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-60 sm:opacity-100 movil:top-0 movil:left-[-397px] movil:h-[359px] movil:w-[908px] movil:max-w-none movil:opacity-100 movil:object-fill design:w-[1920px] design:max-w-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0F0F10_30%,#0F0F1000_75%)] movil:bg-[linear-gradient(356.51deg,#000000_64.47%,#00000000_77.30%)] design:hidden" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 movil:h-[943px] movil:max-w-none movil:p-0 design:h-[755px] design:max-w-[1920px] design:p-0">
        {/* En escritorio, siempre en una línea. En inglés ("Book your
            consultation") a 64 px mide 881 y no cabe en los 722 del diseño: en
            dos líneas pisaba el texto de abajo y en una tocaba la cabeza del
            abogado. Por eso en inglés baja a 52 px, que ocupa lo mismo que el
            español. */}
        <h2
          className={`text-[38px] leading-[42px] font-semibold uppercase movil:hidden sm:text-[48px] sm:leading-[52px] design:absolute design:left-[265px] design:w-max design:whitespace-nowrap ${
            idiomaActual() === "en"
              ? "design:top-[151px] design:text-[52px] design:leading-[54px]"
              : "design:top-[145.23px] design:text-[64px] design:leading-[66.56px]"
          }`}
        >
          <span className="text-white">{t("Agenda")}</span>{" "}
          <span className="text-vernal-accent">{t("tu consulta")}</span>
        </h2>
        <p className="mt-4 max-w-[541px] text-[16px] leading-[20px] text-white movil:hidden sm:text-justify design:absolute design:top-[232.77px] design:left-[271px] design:mt-0 design:w-[541px] design:leading-[16.64px]">
          {t("Cambios en las leyes de inmigración, consejos prácticos")}
          <br className="hidden sm:inline" />{t(" y respuestas a las dudas más comunes de nuestra comunidad.")}
        </p>

        <FormularioConsulta className="mt-8 max-w-[565px] movil:absolute movil:top-[395px] movil:left-[38px] movil:mt-0 movil:w-[325px] movil:max-w-none design:absolute design:top-[297.42px] design:left-[265px] design:mt-0 design:w-[565px] design:max-w-none">
          <CamposConsulta espaciado="bloque" />
        </FormularioConsulta>

        {/* Sello. El SVG sale del export de TESTIMONIALES con el giro ya
            aplicado, así que va como una caja cuadrada sin transformar. */}
        <Image
          src="/images/agenda/sello-immigration-lawyer.svg"
          alt=""
          aria-hidden
          width={240}
          height={240}
          className="pointer-events-none absolute hidden movil:top-[249.9px] movil:left-[246.3px] movil:block movil:h-[125.7px] movil:w-[125.7px] movil:max-w-none design:top-[456px] design:left-[1433px] design:block design:h-[239.22px] design:w-[239.22px] design:max-w-none"
        />
      </div>
    </section>
  );
}
