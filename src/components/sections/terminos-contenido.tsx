import Image from "next/image";
import { TarjetaFirmaHonesta } from "@/components/ui/tarjeta-firma-honesta";
import {
  actualizacion,
  descargoInmigracion,
  terminos,
  telefonoTerminos,
} from "@/lib/terminos";

/**
 * Cuerpo de /terminos-y-condiciones — frame `809:1815`, rango y=0..1490.
 *
 * Misma composición que la política de privacidad: la foto del abogado a la
 * derecha fundida a negro, el titular a la izquierda y la tarjeta decorativa.
 *
 *   fondo      x8 y9, 1920×1231: la foto 1035×1552 en x885 y los dos degradados
 *   titular    x255 y217, Poppins 64/400 MAYÚSCULAS, dos líneas de 67
 *   fecha      x255 y372, 16/300
 *   descargo   x258 y420, caja cian de 846×226 con esquinas de 14
 *   apartados  x255 desde y693, caja de 845, títulos en cian y cuerpo en blanco,
 *              con una línea en blanco de separación (17px) entre bloques
 *   tarjeta    x1434 y701, la misma que en privacidad
 */
export function TerminosContenido() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[1490px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden apilada:h-[600px] movil:h-[500px] design:top-[9px] design:left-[8px] design:h-[1231px] design:w-[1920px]"
      >
        <Image
          src="/images/politicas/hero.webp"
          alt=""
          width={1035}
          height={1552}
          priority
          sizes="(min-width: 1280px) 1035px, 100vw"
          className="absolute top-0 right-0 h-full w-full object-cover object-[60%_20%] opacity-40 apilada:top-[104px] apilada:h-[470px] apilada:w-auto apilada:max-w-none apilada:object-contain apilada:object-right-top apilada:opacity-55 movil:top-[112px] movil:h-[360px] movil:w-auto movil:max-w-none movil:object-contain movil:object-right-top movil:opacity-45 design:right-auto design:left-[885px] design:h-[1552px] design:w-[1035px] design:max-w-none design:object-fill design:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0F0F0F66_0%,#0F0F0F_100%)] apilada:bg-[linear-gradient(90deg,#0F0F10_20%,#0F0F1000_95%),linear-gradient(180deg,#0F0F0F00_55%,#0F0F0F_100%)] movil:bg-[linear-gradient(90deg,#0F0F10_10%,#0F0F1066_60%,#0F0F1000_100%),linear-gradient(180deg,#0F0F0F00_50%,#0F0F0F_100%)] design:bg-[linear-gradient(245.74deg,#0F0F0F00_0.90%,#0F0F0F_46.16%)]" />
        <div className="absolute inset-0 hidden design:block design:bg-[linear-gradient(357.15deg,#0F0F0F_2.18%,#0F0F0F00_27.19%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1490px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[40px] leading-[42px] uppercase sm:text-[56px] sm:leading-[58px] design:absolute design:top-[217px] design:left-[255px] design:text-[64px] design:leading-[67px]">
          <span className="block text-white">
            Términos <span className="text-vernal-accent">y</span>
          </span>
          <span className="text-vernal-accent block">Condiciones</span>
        </h1>

        <p className="mt-4 text-[16px] leading-[20px] font-light text-white design:absolute design:top-[372px] design:left-[255px] design:mt-0 design:leading-[17px]">
          {actualizacion}
        </p>

        {/* Descargo de responsabilidad, sobre el recuadro cian. */}
        <div className="bg-vernal-accent mt-8 max-w-[846px] rounded-[14px] p-6 design:absolute design:top-[420px] design:left-[258px] design:mt-0 design:h-[226px] design:w-[846px] design:max-w-none design:p-0">
          <p className="text-[16px] leading-[22px] font-bold text-black design:absolute design:top-[37px] design:left-[40px] design:leading-[17px]">
            {descargoInmigracion.titulo}
          </p>
          <p className="mt-3 text-[16px] leading-[22px] text-black sm:text-justify design:absolute design:top-[71px] design:left-[40px] design:mt-0 design:w-[766px] design:leading-[17px]">
            {descargoInmigracion.parrafo.map((trozo, i) =>
              typeof trozo === "string" ? (
                <span key={i}>{trozo}</span>
              ) : (
                <strong key={i} className="font-bold">
                  {trozo.negrita}
                </strong>
              ),
            )}
          </p>
        </div>

        <div className="mt-10 max-w-[845px] text-[16px] leading-[22px] text-white design:absolute design:top-[693px] design:left-[255px] design:mt-0 design:w-[845px] design:max-w-none design:leading-[17px]">
          {terminos.map((s, i) => (
            <div key={s.titulo} className={i === 0 ? "" : "mt-6 design:mt-[17px]"}>
              <h2 className="text-vernal-accent">{s.titulo}</h2>
              <p className="mt-3 sm:text-justify design:mt-[17px]">
                {s.parrafo}
                {s.titulo.startsWith("9.") && (
                  <>
                    {" "}
                    <a href={telefonoTerminos.href} className="text-vernal-accent hover:underline">
                      {telefonoTerminos.texto}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          ))}
        </div>

        <TarjetaFirmaHonesta className="design:absolute design:top-[701px] design:left-[1434px]" />
      </div>
    </section>
  );
}
