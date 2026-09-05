import Image from "next/image";
import Link from "next/link";

/**
 * "Conocé al abogado Vernal" — nodos del rango y=1751..2559 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 1751).
 *
 *   fondo       59:38    1923×808, oscuro con un retrato difuminado a la derecha
 *   composición 129:211  x278 y108  554×547
 *     rect cian 129:192  +3,+147  548×400  #08b6ff
 *     "VERNAL"  129:193  +0,+20   Poppins 600 146px #08b6ff UPPER (detrás)
 *     retrato   129:194  +8,+0    546×546 (recorte con transparencia)
 *     "texas lawyer" 129:195  +30,+496  Poppins 700 35px #0f0f10,
 *                    tracking 21px, UPPER, con Vernal Shadow 1
 *   título      11:106   x924 y138  587×134  Poppins 600 64px lh1.04
 *                        línea 1 blanca, línea 2 #08b6ff
 *   cuerpo      11:108   x924 y335  580×336  Poppins 400 16px lh1.04 justificado,
 *                        blanco, con "Abogado Vernal" en #08b6ff
 *   enlace      129:223  x464 y683  "Conoce mi historia" + flecha
 */
export function BioVernal() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden design:h-[808px]">
      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[808px] design:p-0">
        {/* Composición: rectángulo cian, "VERNAL" detrás y el retrato recortado. */}
        <div className="relative mx-auto h-[380px] w-[385px] design:absolute design:top-[108px] design:left-[278px] design:mx-0 design:h-[547px] design:w-[554px]">
          <div className="bg-vernal-accent absolute top-[102px] left-[2px] h-[278px] w-[381px] design:top-[147px] design:left-[3px] design:h-[400px] design:w-[548px]" />
          <p
            aria-hidden
            className="text-vernal-accent absolute top-[14px] left-0 text-[101px] leading-[1.04] font-semibold uppercase design:top-[20px] design:text-[146px]"
          >
            VERNAL
          </p>
          <Image
            src="/images/bio/vernal-retrato.webp"
            alt="El abogado Vernal Farnum Mejía"
            width={546}
            height={546}
            className="absolute top-0 left-[6px] h-[380px] w-[380px] object-cover design:left-[8px] design:h-[546px] design:w-[546px]"
          />
          <p
            aria-hidden
            className="shadow-vernal-1 absolute top-[344px] left-[21px] text-[24px] leading-[1.04] font-bold tracking-[14px] text-[#0f0f10] uppercase design:top-[496px] design:left-[30px] design:text-[35px] design:tracking-[21px]"
            style={{ textShadow: "8px 18px 37.1px rgb(0 0 0 / 0.51)" }}
          >
            texas lawyer
          </p>
        </div>

        <Link
          href="/nosotros"
          className="mt-8 flex items-center justify-center gap-x-[10px] text-[16px] leading-[1.04] text-white transition-colors hover:text-vernal-accent design:absolute design:top-[683px] design:left-[464px] design:mt-0"
        >
          Conoce mi historia
          <span aria-hidden className="text-[18px]">
            &rarr;
          </span>
        </Link>

        <h2 className="mt-12 text-[38px] leading-[1.04] font-semibold uppercase sm:text-[48px] design:absolute design:top-[138px] design:left-[924px] design:mt-0 design:w-[587px] design:text-[64px]">
          <span className="block text-white">Conocé al</span>
          <span className="text-vernal-accent block">abogado Vernal</span>
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[1.04] whitespace-pre-line text-justify text-white design:absolute design:top-[335px] design:left-[924px] design:mt-0 design:w-[580px]">
          {"Antes de convertirse en abogado de inmigración, el "}
          <span className="text-vernal-accent">Abogado Vernal</span>
          {" ya conocía el peso de ese sistema desde adentro. Nació en Panamá, pero su historia con inmigración en Estados Unidos comenzó mucho antes de que él mismo decidiera ejercer el derecho: comenzó viendo a sus propios hermanos cruzar esa frontera legal, y a su madre enfrentar una sanción por una falta administrativa que la ley consideró severa.\n\nNo aprendió sobre el proceso migratorio en un salón de clases. Lo aprendió en su propia casa.\n\nPor eso, cuando dice que “cada cliente que llega a la oficina lleva a mi familia”, no es una frase hecha, es literal. Cada caso de inmigración que revisa, cada petición familiar, cada proceso de residencia, le recuerda lo que vivió su propia gente.\n\nEsa cercanía con el sistema migratorio de Estados Unidos y con lo que significa navegarlo sin ayuda es lo que lo llevó a fundar Vernal Farnum Mejía & Associates, un despacho de inmigración en Texas donde cada caso se atiende con la misma seriedad y cuidado con la que él hubiera querido que atendieran a los suyos."}
        </p>
      </div>
    </section>
  );
}
