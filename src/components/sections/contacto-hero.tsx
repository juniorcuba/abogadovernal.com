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
 * El fondo (grupo 620:1132) son tres capas sobre la caja de 1920×1142:
 *   1. la MISMA foto del hero de la home, estirada al 201.22% de alto
 *   2. otra vez, al 216.9% (su alto natural, 2477)
 *   3. el abogado con la tableta, en x15.91% y0.02%, 92.75%×115.63%
 *   4. linear-gradient(261.45deg, transparente 29.227% → negro 66.945%)
 * Las dos primeras solo se ven en la franja izquierda, casi negra, antes de
 * donde empieza la tercera; por eso reutilizan el archivo de la home.
 *
 * MÓVIL (artboard `1001:1948`, 402×3804, rango y=0..1392; export del
 * 2026-10-11, `CONTACTO MOBILE.svg`, que sustituye al `MOBILE (9)`): foto
 * 1032.5×765.4 en (−351.6, 0) sobre una caja de 785, con
 * linear-gradient(209.24deg, transparente 16.99% → #0F0F10 65.04%); sello de
 * 120 centrado en (317, 244); titular en +320, claim en +475 y cuerpo en +575
 * (todo 87–89 más arriba que en el export anterior). El titular y el claim son
 * los PROPIOS del artboard ("Contacto Abogado Vernal" / "Estamos para
 * ayudarte, sin importar dónde te encuentres."). La foto pide 260vw: a 100vw
 * salía borrosa.
 *
 * FRANJA APILADA (sin diseño): la foto va en una banda de 640 arriba, con el
 * abogado a la vista y el sello a su lado, y el texto centrado debajo. Antes
 * la foto ocupaba toda la sección y el abogado quedaba detrás del texto, bajo
 * la capa oscura.
 */
export function ContactoHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] movil:-mt-[106px] movil:h-[1392px] design:h-[1142px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 movil:h-[785px] movil:w-[402px] design:h-[1142px] design:w-[1920px]"
      >
        <div className="absolute inset-0 hidden overflow-hidden design:block">
          <Image
            src="/images/movil/hero-fondo.webp"
            alt=""
            width={1920}
            height={2477}
            sizes="1920px"
            className="absolute top-[0.03%] left-0 h-[201.22%] w-full max-w-none"
          />
        </div>
        <div className="absolute inset-0 hidden overflow-hidden design:block">
          <Image
            src="/images/movil/hero-fondo.webp"
            alt=""
            width={1920}
            height={2477}
            sizes="1920px"
            className="absolute top-[0.04%] left-0 h-[216.9%] w-full max-w-none"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden apilada:top-[60px] apilada:bottom-auto apilada:h-[640px]">
          <Image
            src="/images/contacto/hero-abogado.webp"
            alt=""
            width={2671}
            height={1981}
            priority
            sizes="(min-width: 1280px) 1781px, (max-width: 560px) 260vw, 120vw"
            className="absolute inset-0 h-full w-full object-cover object-right apilada:object-[58%_0%] movil:top-0 movil:left-[-351.6px] movil:h-[765.4px] movil:w-[1032.5px] movil:max-w-none movil:object-fill design:top-[0.02%] design:left-[15.91%] design:h-[115.63%] design:w-[92.75%] design:max-w-none design:object-fill"
          />
        </div>
        <div className="absolute inset-0 hidden bg-[linear-gradient(261.45deg,#00000000_29.227%,#000000_66.945%)] design:block" />
        <div className="absolute inset-x-0 top-[60px] hidden h-[640px] bg-[linear-gradient(180deg,#0F0F1000_38%,#0F0F10_86%)] apilada:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(209.24deg,#0F0F0F00_16.99%,#0F0F10_65.04%)] movil:block" />
      </div>

      <div className="relative mx-auto flex max-w-[1040px] flex-col gap-y-8 px-6 pt-[168px] pb-20 lg:px-12 apilada:items-center apilada:pt-[470px] apilada:text-center movil:block movil:h-[1392px] movil:max-w-none movil:p-0 design:block design:h-[1142px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[48px] leading-[50px] uppercase sm:text-[64px] sm:leading-[67px] movil:absolute movil:top-[320px] movil:left-[38px] movil:w-[330px] movil:text-[46px] movil:leading-[48px] design:absolute design:top-[217px] design:left-[237px] design:w-[914px] design:text-[82px] design:leading-[85.28px]">
          <span className="text-vernal-accent block movil:hidden">Contáctanos</span>
          <span className="block text-white movil:hidden">en Texas</span>
          {/* El artboard de 402 trae otro titular, en tres líneas. */}
          <span className="hidden text-white movil:block">Contacto</span>
          <span className="text-vernal-accent hidden movil:block">
            Abogado
            <br />
            Vernal
          </span>
        </h1>

        <p className="max-w-[541px] text-[28px] leading-[30px] font-light text-white movil:absolute movil:top-[475px] movil:left-[38px] movil:w-[330px] movil:max-w-none movil:text-[24px] movil:leading-[25px] design:absolute design:top-[406px] design:left-[237px] design:w-[541px] design:text-[36px] design:leading-[37.44px]">
          <span className="movil:hidden">
            <span className="text-vernal-accent">Estamos para ayudarte, en </span>
            Dallas, Houston, Austin, Fort Worth y San Antonio.
          </span>
          <span className="hidden movil:inline">
            <span className="block">Estamos para ayudarte,</span>
            <span className="text-vernal-accent">sin importar dónde te encuentres.</span>
          </span>
        </p>

        <p className="max-w-[580px] text-[16px] leading-[20px] text-white sm:text-justify apilada:text-center movil:absolute movil:top-[575px] movil:left-[42px] movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[547px] design:left-[237px] design:w-[580px] design:leading-[16.64px]">
          Cuéntanos tu situación migratoria y te orientamos sin compromiso. Nuestro equipo de
          abogados de inmigración está listo para atenderte en la oficina más cercana a ti, o de
          forma virtual.
        </p>

        <form className="w-full max-w-[648px] bg-[linear-gradient(212.18deg,rgb(23_35_57/0.71)_28.639%,rgb(64_98_159/0.71)_76.265%)] p-[38px] apilada:text-left movil:absolute movil:top-[782px] movil:left-0 movil:h-[610px] movil:w-[402px] movil:max-w-none movil:bg-[linear-gradient(232.08deg,rgb(23_35_57/0.71)_28.64%,rgb(64_98_159/0.71)_76.27%)] movil:pt-[39px] movil:pr-[39px] movil:pb-0 movil:pl-[38px] design:absolute design:top-[660px] design:left-[223px] design:h-[482px] design:w-[648px] design:max-w-none design:pt-[32px] design:pr-[45px] design:pb-0 design:pl-[38px]">
          <CamposConsulta />
        </form>

        {/* Sello: el mismo que en AgendaConsulta, medido sobre este archivo. */}
        <Image
          src="/images/agenda/sello-immigration-lawyer.svg"
          alt=""
          aria-hidden
          width={240}
          height={240}
          className="pointer-events-none absolute hidden apilada:top-[300px] apilada:left-[calc(50%+120px)] apilada:block apilada:h-[150px] apilada:w-[150px] movil:top-[176.8px] movil:left-[249.5px] movil:block movil:h-[134px] movil:w-[134px] movil:max-w-none design:top-[504px] design:left-[1479px] design:block design:h-[239.22px] design:w-[239.22px] design:max-w-none"
        />
      </div>
    </section>
  );
}
