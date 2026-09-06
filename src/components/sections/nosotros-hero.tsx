import Image from "next/image";

/**
 * Hero de /nosotros — rango y=9..781 de la frame `181:2125`.
 *
 * Del export SVG del artboard:
 *   fondo   x−3 y9  1920×772, tres capas:
 *             1. el retrato dibujado 992×1487 en (+928, −77)
 *             2. linear-gradient(83.90deg, #101010 51.24% → #1C2639 transp. 86.03%)
 *             3. negro al 20%
 *   h1      x239 y296/381   Poppins 82 peso 600, interlineado 85
 *   cuerpo  x227 y442       Poppins 16/400 justificado, 16 líneas de 17
 *   cita    x1194 y656/693  Poppins 36 peso 300; "lleva a mi familia" en #08B6FF
 *
 * El CTA flotante NO va aquí: en el archivo está en y886 y este hero acaba en
 * 781, así que pertenece a la sección siguiente.
 *
 * El texto va LITERAL del archivo, incluido "Vernal Farum" sin la ene: es una
 * errata del diseño y se deja para que la página siga siendo comparable.
 */
export function NosotrosHero() {
  return (
    // −128 para meterse debajo de la cabecera, como el resto de heros.
    <section className="bg-vernal-ink relative -mt-[128px] overflow-hidden design:h-[781px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-[9px] design:left-[-3px] design:h-[772px] design:w-[1920px]"
      >
        <Image
          src="/images/nosotros/hero-retrato.webp"
          alt=""
          width={992}
          height={1487}
          priority
          className="absolute inset-0 h-full w-full object-cover object-[70%_20%] design:inset-auto design:top-[-77px] design:left-[928px] design:h-[1487px] design:w-[992px] design:max-w-none design:object-fill"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(83.90deg, #101010 51.24%, rgb(28 38 57 / 0) 86.03%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[152px] pb-16 lg:px-12 design:block design:h-[781px] design:max-w-[1920px] design:p-0">
        <h1 className="text-[46px] leading-[48px] font-semibold uppercase text-white sm:text-[62px] sm:leading-[64px] design:absolute design:top-[225px] design:left-[239px] design:leading-[85px] design:text-[82px]">
          Abogado
          <br />
          Vernal
        </h1>

        <p className="mt-8 text-[16px] leading-[22px] whitespace-pre-line text-white design:absolute design:top-[428px] design:left-[227px] design:mt-0 design:w-[788px] design:text-justify design:leading-[17px] max-w-[680px] design:max-w-none">
          {"Antes de convertirse en abogado de inmigración, el Abogado Vernal Farum ya conocía el peso de ese sistema desde adentro. Nació en Panamá, pero su historia con la inmigración a Estados Unidos comenzó mucho antes de que él mismo decidiera ejercer el derecho: comenzó viendo a sus propios hermanos cruzar esa frontera legal, y a su madre enfrentar una sanción por una falta administrativa que la ley consideró severa.\n\nNo aprendió sobre el proceso migratorio en un salón de clases. Lo aprendió en su propia casa.\n\nPor eso, cuando dice que “cada cliente que llega a la oficina lleva a mi familia”, no es una frase hecha, es literal. Cada caso de inmigración que revisa, cada petición familiar, cada proceso de residencia, le recuerda lo que vivió su propia gente.\n\nEsa cercanía con el sistema migratorio de Estados Unidos y con lo que significa navegarlo sin ayuda, es lo que lo llevó a fundar Vernal Farnum Mejía & Associates, un despacho de inmigración en Texas donde cada caso se atiende con la misma seriedad y cuidado con la que él hubiera querido que atendieran a los suyos."}
        </p>

        <p className="mt-10 text-[26px] leading-[30px] font-light text-white sm:text-[30px] sm:leading-[34px] design:absolute design:top-[623px] design:left-[1194px] design:mt-0 design:w-[560px] design:leading-[37px] design:text-[36px]">
          {"“cada cliente que llega a la oficina "}
          <span className="text-vernal-accent">lleva a mi familia”</span>
        </p>
      </div>
    </section>
  );
}
