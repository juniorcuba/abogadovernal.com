import Image from "next/image";

/**
 * "El caso que lo confirmó todo" — rango y=1391..2039 de la frame `181:2125`.
 * Coordenadas relativas al inicio de la sección (y − 1391).
 *
 *   fondo    x1 y1391  1923×648, dos capas:
 *              1. la foto dibujada 2903×1936 en (−490, −842)
 *              2. #08B6FF al 86% encima
 *   titular  x288 y1579  Poppins 66 peso 400 NEGRO  "EL CASO QUE"
 *            x288 y1646/1713  Poppins 64 peso 600 #172339  "LO CONFIRMO / TODO"
 *   cuerpo   x288 y1773  Poppins 16/400 #172339, siete líneas de 17
 *   tarjeta  x1089 y1470  535×492, tres capas:
 *              1. #08B6FF plano
 *              2. la foto al 51%, dibujada 1086×1628 en (−263, −260)
 *              3. linear-gradient(200.50deg, #08B6FF transp. 47.11% → opaco 92.10%)
 *            dentro, la cita CENTRADA en Poppins 36 peso 300 y la firma en 24 bold
 *
 * El titular usa dos tamaños y dos colores distintos —66/400 en negro y 64/600 en
 * #172339—, que en el archivo son dos capas de texto separadas, no una.
 */
export function NosotrosCaso() {
  return (
    <section className="relative overflow-hidden bg-[#08B6FF] design:h-[648px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-0 design:left-[1px] design:h-[648px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/caso-fondo.webp"
          alt=""
          width={2903}
          height={1936}
          className="absolute inset-0 h-full w-full object-cover design:inset-auto design:top-[-842px] design:left-[-490px] design:h-[1936px] design:w-[2903px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[#08B6FF] opacity-[0.86]" />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 design:block design:h-[648px] design:max-w-[1920px] design:p-0">
        <div>
          <h2 className="uppercase design:contents">
            <span className="block text-[38px] leading-[42px] font-normal text-black sm:text-[48px] sm:leading-[52px] design:absolute design:top-[137px] design:left-[288px] design:leading-[69px] design:text-[66px]">
              El caso que
            </span>
            <span className="text-vernal-navy mt-1 block text-[38px] leading-[42px] font-semibold sm:text-[48px] sm:leading-[52px] design:absolute design:top-[202px] design:left-[288px] design:mt-0 design:w-[560px] design:leading-[67px] design:text-[64px]">
              Lo confirmo
              <br />
              todo
            </span>
          </h2>

          <p className="text-vernal-navy mt-6 text-[16px] leading-[22px] design:absolute design:top-[371px] design:left-[288px] design:mt-0 design:w-[580px] design:leading-[17px] max-w-[680px] design:max-w-none">
            Entre los casos que marcaron su carrera como abogado de inmigración en
            Texas, destaca uno que llegó casi por accidente: una familia con un menor
            que enfrentaba una situación médica delicada, y que ya había sido
            rechazada por varios abogados antes de encontrarlo a él. Con creatividad
            legal, su equipo encontró un camino migratorio que permitió a la familia
            acceder a la atención médica que necesitaban en Estados Unidos.
          </p>
        </div>

        {/* Tarjeta de la cita. */}
        <div className="relative overflow-hidden bg-[#08B6FF] px-8 py-10 design:absolute design:top-[79px] design:left-[1089px] design:h-[492px] design:w-[535px] design:px-0 design:py-0">
          <Image
            src="/images/nosotros/caso-cita.webp"
            alt=""
            aria-hidden
            width={1086}
            height={1628}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.51] design:inset-auto design:top-[-260px] design:left-[-263px] design:h-[1628px] design:w-[1086px] design:max-w-none design:object-fill"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(200.50deg, rgb(8 182 255 / 0) 47.11%, #08B6FF 92.10%)",
            }}
          />

          <p className="relative text-center text-[26px] leading-[32px] font-light text-black sm:text-[30px] sm:leading-[36px] design:absolute design:top-[105px] design:left-0 design:w-full design:leading-[37px] design:text-[36px]">
            “No hay un hito económico que me interese más que realmente ayudar a una
            persona que lo necesita”
          </p>

          <p className="relative mt-6 text-center text-[20px] leading-[24px] font-bold text-black design:absolute design:top-[378px] design:left-0 design:mt-0 design:w-full design:leading-[25px] design:text-[24px]">
            Abogado Vernal Farum.
          </p>
        </div>
      </div>
    </section>
  );
}
