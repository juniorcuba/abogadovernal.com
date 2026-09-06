import Image from "next/image";
import { FloatingCta } from "@/components/layout/floating-cta";

/**
 * "Una lección que su propia familia le enseñó" — rango y=781..1389 de la
 * frame `181:2125`. Coordenadas relativas al inicio de la sección (y − 781).
 *
 *   fondo    x0 y781  1923×608, dos capas:
 *              1. la foto de fondo al 25%, dibujada 1323×882 en (+707, −208)
 *              2. linear-gradient(71.49deg, #171717 41.45% → transparente 69.65%)
 *   foto     x218 y877  733×425, imagen 1151×864 desplazada (−220, −219) y
 *            encima linear-gradient(180deg, transparente → negro)
 *   titular  x1089 y998/1035  Poppins 36 peso 300; "familia le enseñó" en #08B6FF
 *   cuerpo   x1089 y1104      Poppins 16/400, nueve líneas de 17
 *
 * Aquí va el CTA flotante, que en el archivo está en y886: cae en esta sección
 * y no en el hero, que acaba en 781.
 */
export function NosotrosLeccion() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden design:h-[608px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-0 design:left-0 design:h-[608px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/leccion-fondo.webp"
          alt=""
          width={1323}
          height={882}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.25] design:inset-auto design:top-[-208px] design:left-[707px] design:h-[882px] design:w-[1323px] design:max-w-none design:object-fill"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(71.49deg, #171717 41.45%, rgb(0 0 0 / 0) 69.65%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 design:block design:h-[608px] design:max-w-[1920px] design:p-0">
        {/* La foto lleva un degradado a negro por abajo, del propio archivo. */}
        <div className="relative aspect-[733/425] w-full overflow-hidden design:absolute design:top-[96px] design:left-[218px] design:aspect-auto design:h-[425px] design:w-[733px]">
          <Image
            src="/images/nosotros/leccion-foto.webp"
            alt="El abogado Vernal Farnum Mejía con su familia"
            width={1151}
            height={864}
            className="absolute inset-0 h-full w-full object-cover design:inset-auto design:top-[-219px] design:left-[-220px] design:h-[864px] design:w-[1151px] design:max-w-none design:object-fill"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(0 0 0 / 0) 0%, #000000 100%)",
            }}
          />
        </div>

        <div>
          <h2 className="text-[28px] leading-[32px] font-light text-white sm:text-[32px] sm:leading-[36px] design:absolute design:top-[186px] design:left-[1089px] design:w-[435px] design:leading-[37px] design:text-[36px]">
            {"Una lección que su propia "}
            <span className="text-vernal-accent">familia le enseñó</span>
          </h2>

          <p className="mt-6 text-[16px] leading-[22px] whitespace-pre-line text-white design:absolute design:top-[309px] design:left-[1089px] design:mt-0 design:w-[580px] design:leading-[17px]">
            {"A lo largo de su carrera, ha visto de cerca cómo una mala asesoría legal puede cambiar por completo el rumbo de una familia, no tuvo que buscar lejos para entenderlo. Su propio hermano vivió un proceso migratorio que pudo haber terminado de forma muy distinta, de no ser porque buscó la orientación correcta a tiempo.\n\nEsa experiencia marcó cómo entiende el costo real de un mal proceso legal, no en dinero, sino en tiempo con la familia que nunca se recupera."}
          </p>
        </div>
      </div>

      <FloatingCta className="design:top-[105px]" />
    </section>
  );
}
