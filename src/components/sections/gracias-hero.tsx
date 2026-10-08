import Image from "next/image";
import { socialsCabecera } from "@/lib/site";

/**
 * Página de gracias — frame `795:454`, rango y=0..938.
 *
 *   fondo    y−3, 1920×938: la foto 1768×914 en (+386, +64) y
 *            linear-gradient(264.43°, transparente 39.18% → negro 63.90%)
 *   check    x243 y198, 50×50, en verde #00B567
 *   titular  x237, líneas base 328.2 y 413.2, Poppins 82/400 MAYÚSCULAS
 *   texto    x237 desde y467, 16/17
 *   tarjeta  x241 y641, 407×293, radial girado al 87%: el aviso de las
 *            transmisiones y los cuatro iconos de redes de 25 en y859
 *
 * El lienzo de 402 sale de "VESPER AGENCY LANDING - GRACIAS MOBILE" (402×1922):
 *
 *   fondo    banda de 402×786 desde y−2, con la foto dibujada 968×500 en
 *            (−150.5, +51) y dos degradados encima
 *   check    x38 y237, los mismos 50×50
 *   titular  x38 y305, 40/42 en dos renglones
 *   texto    x42, caja de 320, 16/17; el segundo párrafo a y492
 *   tarjeta  x41 y625, 315×156: el radial, el texto 20/21 a (+23, +21) y los
 *            cuatro iconos de 25 a (+23, +105)
 */
export function GraciasHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] movil:-mt-[106px] movil:h-[792px] design:h-[938px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden movil:top-[-2px] movil:h-[786px] movil:w-[402px] design:top-[-3px] design:h-[938px] design:w-[1920px]"
      >
        <Image
          src="/images/gracias/hero.webp"
          alt=""
          width={1664}
          height={860}
          priority
          sizes="(min-width: 1280px) 1768px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-70 movil:top-[51px] movil:left-[-150.5px] movil:h-[500px] movil:w-[968px] movil:max-w-none movil:object-fill movil:opacity-100 design:top-[64px] design:left-[386px] design:h-[914px] design:w-[1768px] design:max-w-none design:object-fill design:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(264.43deg,#00000000_39.18%,#000000_63.90%)] movil:bg-[linear-gradient(200.78deg,#0F0F0F00_21.14%,#0F0F10_51.92%)]" />
        {/* El lienzo de 402 lleva un segundo degradado que el de 1920 no tiene. */}
        <div className="absolute inset-0 hidden movil:block movil:bg-[linear-gradient(350.64deg,#0F0F1000_64.22%,#0F0F10_87.99%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[792px] movil:max-w-none movil:p-0 design:h-[938px] design:max-w-[1920px] design:p-0">
        <Image
          src="/icons/gracias/check.svg"
          alt=""
          aria-hidden
          width={50}
          height={50}
          className="h-[50px] w-[50px] movil:absolute movil:top-[237px] movil:left-[38px] design:absolute design:top-[198px] design:left-[243px]"
        />

        <h1 className="mt-6 text-[44px] leading-[48px] uppercase sm:text-[62px] sm:leading-[66px] movil:absolute movil:top-[305px] movil:left-[38px] movil:mt-0 movil:w-[330px] movil:text-[40px] movil:leading-[42px] design:absolute design:top-[257px] design:left-[237px] design:mt-0 design:w-[1200px] design:text-[82px] design:leading-[85px]">
          <span className="block">
            <span className="text-vernal-accent">¡Gracias</span>{" "}
            <span className="text-white">por</span>
          </span>
          <span className="block text-white">contactarnos!</span>
        </h1>

        <p className="mt-6 max-w-[680px] text-[16px] leading-[22px] text-white movil:absolute movil:top-[407px] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[467px] design:left-[237px] design:mt-0 design:w-[700px] design:max-w-none design:leading-[17px]">
          Hemos recibido tu información.{" "}
          <span className="text-vernal-accent">
            Un miembro de nuestro equipo se pondrá en contacto contigo pronto para
            orientarte sobre tu caso.
          </span>
        </p>

        <p className="mt-5 max-w-[680px] text-[16px] leading-[22px] text-white movil:absolute movil:top-[492px] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[518px] design:left-[237px] design:mt-0 design:w-[640px] design:max-w-none design:leading-[17px]">
          Mientras tanto, no te pierdas nuestras transmisiones en vivo Inmigrantes Como Tú
          cada martes a las 5:00 p.m., donde el Abogado Vernal responde preguntas y
          comparte las últimas actualizaciones en inmigración.
        </p>

        {/* Tarjeta de redes, con el mismo radial girado que las otras tarjetas. */}
        <div className="relative mt-10 max-w-[407px] movil:absolute movil:top-[625px] movil:left-[41px] movil:mt-0 movil:h-[156px] movil:w-[315px] movil:max-w-none design:absolute design:top-[641px] design:left-[241px] design:mt-0 design:h-[293px] design:w-[407px] design:max-w-none">
          <div aria-hidden className="absolute inset-0 overflow-hidden opacity-[0.87]">
            <div className="absolute inset-0 bg-[#0F0F0F]" />
            <div
              className="absolute top-[-100px] left-[-100px] h-[200px] w-[200px] origin-center bg-[radial-gradient(circle_closest-side,#172339_0%,#0F0F0F_100%)] movil:[transform:matrix(6.77299,-3.33238,0.879357,0.491855,10.8152,117.434)] design:[transform:matrix(8.75636,-6.19165,1.13686,0.91388,13.861,219.77)]"
              style={{ transform: "matrix(8.75636, -6.19165, 1.13686, 0.91388, 13.861, 219.77)" }}
            />
          </div>

          <p className="relative p-8 text-[28px] leading-[32px] font-light text-white sm:text-[32px] movil:absolute movil:top-[21px] movil:left-[23px] movil:w-[235px] movil:p-0 movil:text-[20px] movil:leading-[21px] design:absolute design:top-[87px] design:left-[32px] design:p-0 design:text-[36px] design:leading-[37px]">
            {/* En 402 el archivo parte las tres líneas en otro sitio, así que
                ahí fluyen y las parte la caja. */}
            <span className="block text-white movil:inline">Síguenos en redes</span>{" "}
            <span className="text-vernal-accent block movil:inline">para no perderte</span>{" "}
            <span className="text-vernal-accent block movil:inline">el próximo live.</span>
          </p>

          <ul className="relative flex gap-x-[11px] px-8 pb-8 movil:absolute movil:top-[105px] movil:left-[23px] movil:p-0 design:absolute design:top-[218px] design:left-[32px] design:p-0">
            {socialsCabecera.map((s) => (
              <li key={s.label} className="flex shrink-0">
                <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                  <Image
                    src={s.icon}
                    alt=""
                    width={25}
                    height={25}
                    className="h-[25px] w-[25px] max-w-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
