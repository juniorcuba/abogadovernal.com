import Image from "next/image";

/**
 * "Sobre nosotros" — nodos del rango y=1142..1751 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 1142).
 *
 *   fondo     17:5    #08b6ff, 609 de alto
 *   barra     8:105   x215 y135  12×351  #172339
 *   título    6:93    x271 y127  354×134  Poppins 600 64px lh1.04 UPPER #172339
 *   texto     8:97    x279 y302  580×209  Poppins 400 16px lh1.04 justificado, negro
 *                     ("Abogado Vernal Farnum Mejía" en 700)
 *   carrusel  129:148 x924 y0    990×609
 *             ventana x932 y36   982×573 (recorta)
 *             fotos   634×442 a y65, paso de 674
 *   fundidos          x902 y0 y x1729 y0, 185×609, 270deg: opaco a la derecha
 *   cifra     22:88   x1025 y358  Poppins 600 176px blanco
 *             22:89   x1265 y532  Poppins 600 45px UPPER blanco
 *
 * El duotono azul no viene de imágenes tintadas. El relleno del archivo lleva tres
 * cosas encadenadas, y hacen falta las tres:
 *   filters.saturation = -1  →  grayscale(1)
 *   opacity = 0.81           →  opacity-[0.81]
 *   blendMode = HARD_LIGHT   →  mix-blend-hard-light
 * Con la foto en gris, hard-light sobre el cian mapea el gris medio exactamente al
 * cian y reparte el resto a azules más claros y más oscuros. En color no funciona:
 * un rojo puro sale intacto.
 *
 * Las fotos de public/ ya vienen recortadas según el imageTransform de cada relleno,
 * que no coincide con lo que haría object-cover.
 */

const fotos = [
  "/images/nosotros/nosotros-1.jpg",
  "/images/nosotros/nosotros-2.jpg",
  "/images/nosotros/nosotros-3.jpg",
  "/images/nosotros/nosotros-4.jpg",
];

export function SobreNosotros() {
  return (
    <section className="bg-vernal-accent relative overflow-hidden design:h-[609px]">
      {/* Carrusel: la tira se duplica para que el bucle no tenga corte. */}
      <div className="relative h-[320px] overflow-hidden design:absolute design:top-[36px] design:left-[932px] design:h-[573px] design:w-[982px]">
        {/* El desplazamiento inicial (x1080 dentro de una ventana que empieza en
            x932) va en un envoltorio estático, para no romper el bucle. */}
        <div className="design:translate-x-[148px]">
          <div className="animate-vernal-marquee flex w-max gap-[40px] design:pt-[29px]">
            {[...fotos, ...fotos].map((src, i) => (
              <div
                key={`${src}-${i}`}
                /* El cian va aquí dentro a propósito: el transform del marquee crea
                   un contexto de apilamiento, así que mix-blend-mode no alcanza el
                   fondo de la sección. El respaldo tiene que estar en este contexto. */
                className="bg-vernal-accent relative h-[280px] w-[400px] shrink-0 design:h-[442px] design:w-[634px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="634px"
                  className="object-cover opacity-[0.81] grayscale mix-blend-hard-light"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fundidos laterales hacia el cian del fondo. */}
      <div
        aria-hidden
        className="pointer-events-none hidden design:absolute design:top-0 design:left-[902px] design:block design:h-[609px] design:w-[185px]"
        style={{
          backgroundImage:
            "linear-gradient(270deg, var(--color-vernal-accent) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none hidden design:absolute design:top-0 design:left-[1729px] design:block design:h-[609px] design:w-[185px]"
        style={{
          backgroundImage:
            "linear-gradient(270deg, var(--color-vernal-accent) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[609px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-navy hidden design:absolute design:top-[135px] design:left-[215px] design:block design:h-[351px] design:w-[12px]"
        />

        <h2 className="text-vernal-navy text-[38px] leading-[40px] font-semibold uppercase sm:text-[48px] design:absolute design:top-[127px] design:left-[271px] design:w-[354px] design:leading-[67px] design:text-[64px]">
          Sobre
          <br />
          nosotros
        </h2>

        {/* Un solo bloque con salto doble, como el nodo 8:97: así la línea en
            blanco entre párrafos mide exactamente un interlineado, en vez de un
            margen aproximado entre dos <p>. */}
        <p className="mt-8 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line text-justify text-black design:absolute design:top-[302px] design:left-[279px] design:mt-0 design:w-[580px]">
          {"En Texas, Estados Unidos, la oficina del "}
          <span className="font-bold">Abogado Vernal Farnum Mejía</span>
          {" se dedica a defender los derechos de los inmigrantes. Su compromiso es simple: proteger los derechos de cada cliente y acompañarlo hasta que logre un estatus legal en este país.\n\nA lo largo de su trayectoria, la firma ha acompañado a más de 15,000 personas en la obtención de su permiso de trabajo, su residencia, su ciudadanía y mucho más, ayudando a cerca de 10,000 familias a reunirse o permanecer juntas en Estados Unidos. Lo hace porque el equipo comparte esa misma experiencia migratoria: para ellos, cada caso no es solo un expediente, es una historia que entienden de cerca."}
        </p>

        <p className="mt-10 text-center text-[72px] leading-[75px] font-semibold text-white uppercase design:absolute design:top-[358px] design:left-[1025px] design:mt-0 design:text-left design:leading-[183px] design:text-[176px]">
          +10,000
        </p>
        <p className="text-center text-[24px] leading-[25px] font-semibold text-white uppercase design:absolute design:top-[532px] design:left-[1265px] design:text-left design:leading-[47px] design:text-[45px]">
          familias reunidas
        </p>
      </div>
    </section>
  );
}
