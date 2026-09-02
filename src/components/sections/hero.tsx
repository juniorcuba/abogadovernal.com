import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Field, FieldArea, FieldSelect } from "@/components/ui/field";
import { ConsentNotice } from "@/components/ui/consent-notice";
import { FloatingCta } from "@/components/layout/floating-cta";
import { offices } from "@/lib/site";

/**
 * Hero de la homepage — nodos del rango y=0..1142 de la frame 1:2.
 *
 * Geometría exacta del artboard (1920):
 *   fondo   6:88   x-3   y9    1920×1231  (se recorta abajo: la sección mide 1142)
 *   h1      6:3    x223  y276  565×255    Poppins 600 82px lh1.04 UPPER
 *   claim   6:23   x1300 y412  440×109    Poppins 300 36px lh1.04
 *   tarjeta 18:7   x223  y583  648×559    padding izq 38 / der 45 / sup 32
 *   campos         x261/555 y615/690, 271×52; comentarios 565×52; enviar 224×52
 *   aviso   6:87   x268  y910  558×56     (7px más adentro que los campos)
 *   CTA     18:25  x1571 y886  349        pegado al borde derecho
 *
 * A partir de `design` (1920px) se posiciona en absoluto para clavar esas
 * coordenadas. Por debajo, los mismos elementos fluyen apilados.
 */
export function Hero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden design:h-[1142px]">
      <div className="absolute inset-0 design:top-[9px] design:left-[-3px] design:h-[1231px] design:w-[1920px]">
        <Image
          src="/images/hero-vernal.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1920px] flex-col gap-y-10 px-6 pt-[168px] pb-20 lg:px-12 design:block design:h-[1142px] design:w-[1920px] design:p-0">
        <h1 className="text-[44px] leading-[1.04] font-semibold uppercase sm:text-[62px] design:absolute design:top-[276px] design:left-[223px] design:w-[565px] design:text-[82px]">
          <span className="block text-white">abogado de</span>
          <span className="text-vernal-accent block">inmigración</span>
          <span className="text-vernal-accent block">en texas</span>
        </h1>

        <p className="max-w-[440px] text-[26px] leading-[1.04] font-light text-white design:absolute design:top-[412px] design:left-[1300px] design:w-[440px] design:max-w-none design:text-[36px]">
          <span className="text-vernal-accent">Somos inmigrantes</span> como tú y
          defendemos tus derechos.
        </p>

        <form className="bg-vernal-card w-full max-w-[648px] p-[38px] design:absolute design:top-[583px] design:left-[223px] design:h-[559px] design:w-[648px] design:max-w-none design:pt-[32px] design:pr-[45px] design:pb-0 design:pl-[38px]">
          <div className="grid grid-cols-1 gap-[23px] sm:grid-cols-2">
            <Field name="nombre" label="Nombre" icon="/icons/form/user.svg" iconWidth={17} iconHeight={19} required />
            <Field name="telefono" label="Teléfono" type="tel" icon="/icons/form/phone.svg" iconWidth={22} iconHeight={22} required />
            <Field name="correo" label="Correo" type="email" icon="/icons/form/mail.svg" iconWidth={18} iconHeight={14} required />
            {/* Las opciones son las 5 sedes; falta confirmar si hay modalidades
                no presenciales (virtual, telefónica) que el Figma no lista. */}
            <FieldSelect name="oficina" label="Oficina o modalidad de atención:" icon="/icons/form/office.svg" iconWidth={21} iconHeight={22} options={offices.map((o) => o.city)} />
            <FieldArea name="comentarios" label="Comentarios" icon="/icons/form/comment.svg" iconWidth={20} iconHeight={20} className="sm:col-span-2" />
          </div>

          <Button className="mt-[21px] w-full sm:w-[224px]">Enviar</Button>

          {/* El aviso va 7px más adentro que los campos (x268 vs x261). */}
          <ConsentNotice className="mt-[20px] design:ml-[7px]" />
        </form>

        <FloatingCta />
      </div>
    </section>
  );
}
