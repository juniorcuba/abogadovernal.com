import Image from "next/image";
import { CamposConsulta } from "@/components/ui/campos-consulta";

/**
 * Hero de la homepage — nodos del rango y=0..1142 de la frame 1:2.
 *
 * Geometría exacta del artboard (1920), export del 2026-09-26:
 *   fondo   x-3 y0 1920×1142. El archivo apila tres fotos; la última, la del
 *           abogado sentado, se dibuja 1988×2565 en (−15, +28) y tapa a las
 *           otras dos salvo una franja de 28px que queda bajo la cabecera, así
 *           que aquí va solo esa. Ya no lleva el degradado a #0F0F10 de antes.
 *   h1      6:3    x223  y276  565×255    Poppins 600 82px lh1.04 UPPER
 *   claim   6:23   x1260 y319  440×109    Poppins 300 36px lh1.04 (93px más arriba
 *                                         que en el export anterior)
 *   tarjeta 18:7   x223  y583  648×559    degradado 216.12° #172339 28.64% →
 *                                         #40629F 76.27% al 71%; antes era plano
 *   campos         x264/558 y622/697, 271×52; comentarios 565×52; enviar 224×52
 *                  (el relleno de la tarjeta pasa de 38/32 a 41/39)
 *   aviso   6:87   x271  y917  558×56     (7px más adentro que los campos)
 *   CTA     18:25  x1568 y883  349        ahora flotante en todo el sitio (floating-cta.tsx)
 *
 * A partir de `design` (1920px) se posiciona en absoluto para clavar esas
 * coordenadas. Por debajo, los mismos elementos fluyen apilados.
 */
export function Hero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden movil:-mt-[106px] movil:h-[1308px] design:h-[1142px]">
      <div className="absolute inset-0 movil:inset-auto movil:top-[-2px] movil:left-0 movil:h-[700px] movil:w-[402px] design:top-0 design:left-[-3px] design:h-[1142px] design:w-[1920px]">
        {/* Escritorio y móvil llevan fotos DISTINTAS: en el lienzo de 1920 la
            del abogado sentado (export del 2026-09-26) y en el de 402 la de
            antes. Ninguna lleva `priority`: con carga diferida, la que queda en
            display:none no se llega a pedir, así que cada lienzo baja una sola
            foto. Con `priority` el navegador se baja las dos. */}
        <Image
          src="/images/hero-escritorio-2026.webp"
          alt=""
          width={1920}
          height={2477}
          sizes="1988px"
          className="absolute inset-0 h-full w-full object-cover object-[62%_top] movil:hidden design:top-[28px] design:left-[-15px] design:h-[2565px] design:w-[1988px] design:max-w-none design:object-fill"
        />
        <Image
          src="/images/movil/hero-fondo.webp"
          alt=""
          width={1920}
          height={2477}
          sizes="1095px"
          className="hidden movil:!static movil:!ml-[-381px] movil:!mt-[27px] movil:!block movil:!h-[1413px] movil:!w-[1095px] movil:!max-w-none movil:!object-fill"
        />
        {/* Degradado del archivo móvil; en escritorio no lo lleva. */}
        <div
          aria-hidden
          className="absolute inset-0 hidden movil:block"
          style={{
            backgroundImage:
              "linear-gradient(198.53deg, rgb(15 15 15 / 0) 51.15%, #0F0F10 85.37%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[1040px] flex-col gap-y-10 px-6 pt-[168px] pb-20 lg:px-12 movil:block movil:h-[1308px] movil:max-w-none movil:p-0 design:block design:h-[1142px] design:w-[1920px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[44px] leading-[46px] font-semibold uppercase sm:text-[62px] movil:absolute movil:top-[406px] movil:left-[38px] movil:text-[46px] movil:leading-[48px] design:absolute design:top-[276px] design:left-[223px] design:w-[565px] design:leading-[85px] design:text-[82px]">
          <span className="block text-white">abogado de</span>
          <span className="text-vernal-accent block">inmigración</span>
          <span className="text-vernal-accent block">en texas</span>
        </h1>

        <p className="max-w-[440px] text-[26px] leading-[27px] font-light text-white movil:absolute movil:top-[563px] movil:left-[38px] movil:w-[282px] movil:max-w-none movil:text-[24px] movil:leading-[25px] design:absolute design:top-[319px] design:left-[1260px] design:w-[440px] design:max-w-none design:leading-[37px] design:text-[36px]">
          <span className="text-vernal-accent">Somos inmigrantes</span> como tú y
          defendemos tus derechos.
        </p>

        <form className="bg-vernal-card w-full max-w-[648px] p-[38px] movil:absolute movil:top-[698px] movil:left-0 movil:h-[610px] movil:w-[402px] movil:max-w-none movil:px-[38px] movil:pt-[39px] movil:pb-0 design:absolute design:top-[583px] design:left-[223px] design:h-[559px] design:w-[648px] design:max-w-none design:bg-[linear-gradient(216.12deg,rgb(23_35_57/0.71)_28.64%,rgb(64_98_159/0.71)_76.27%)] design:pt-[39px] design:pr-[42px] design:pb-0 design:pl-[41px]">
          <CamposConsulta />
        </form>
      </div>
    </section>
  );
}
