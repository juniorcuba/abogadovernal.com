import Image from "next/image";
import { FlechaEnlace } from "@/components/ui/iconos";
import Link from "next/link";

/**
 * "Conocé al abogado Vernal" — nodos del rango y=1751..2559 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 1751).
 *
 *   fondo       59:38    #0F0F10 con una foto al 25%, dibujada a 1923×1283 con
 *                        desplazamiento (+446, −211). Del export SVG de la frame.
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
 *
 * En el lienzo móvil (y=2230..3466) cambia la mitad de la sección:
 *
 *   fondo    la misma foto, dibujada 1056×704 en (−298, +548), más un degradado
 *            que tapa de negro la mitad de arriba
 *   retrato  ya no se compone en el navegador: el archivo trae un banner de
 *            313×313 con el degradado azul incrustado, y debajo un rect cian
 *            que solo asoma un par de píxeles. No hay "VERNAL" ni "texas lawyer"
 *   enlace   "Conoce mi historia" no está en el diseño móvil
 *
 * Las dos composiciones se excluyen con `hidden`/`movil:hidden` y no con una
 * sola imagen intercambiada, para que cada lienzo descargue solo la suya: las
 * de next/image son diferidas, y una diferida dentro de un display:none no
 * llega a pedirse nunca.
 */
export function BioVernal() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden movil:h-[1236px] design:h-[808px]">
      <Image
        src="/images/bio/fondo-bio.webp"
        alt=""
        aria-hidden
        width={1923}
        height={1283}
        className="pointer-events-none absolute top-0 right-0 h-full w-auto object-cover opacity-25 movil:top-[548px] movil:right-auto movil:left-[-298px] movil:h-[704px] movil:w-[1056px] movil:max-w-none movil:object-fill design:top-[-211px] design:right-auto design:left-[446px] design:h-[1283px] design:w-[1923px]"
      />
      {/* Solo en móvil: oscurece la mitad de arriba y deja ver la foto abajo. */}
      <div
        aria-hidden
        className="pointer-events-none hidden movil:absolute movil:inset-0 movil:block"
        style={{
          backgroundImage:
            "linear-gradient(183.14deg, #171717 49.71%, rgb(0 0 0 / 0) 61.47%)",
        }}
      />
      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 design:h-[808px] design:p-0">
        {/* Composición del móvil: el rect cian y encima el banner ya compuesto. */}
        <div className="hidden movil:absolute movil:top-[49px] movil:left-[43px] movil:block movil:h-[315px] movil:w-[315px]">
          <div className="bg-vernal-accent absolute top-[84px] left-[1px] h-[230px] w-[314px]" />
          <Image
            src="/images/movil/bio-banner.webp"
            alt="El abogado Vernal Farnum Mejía"
            width={313}
            height={313}
            className="absolute top-0 left-0 h-[313px] w-[313px]"
          />
        </div>

        {/* Composición: rectángulo cian, "VERNAL" detrás y el retrato recortado. */}
        <div className="relative mx-auto h-[300px] w-full max-w-[340px] sm:h-[380px] sm:w-[385px] sm:max-w-none movil:hidden design:absolute design:top-[108px] design:left-[278px] design:mx-0 design:h-[547px] design:w-[554px]">
          <div className="bg-vernal-accent absolute top-[102px] left-[2px] h-[278px] w-[381px] design:top-[147px] design:left-[3px] design:h-[400px] design:w-[548px]" />
          <p
            aria-hidden
            className="text-vernal-accent absolute top-[14px] left-0 text-[56px] leading-[59px] font-semibold uppercase sm:text-[101px] sm:leading-[105px] design:top-[20px] design:leading-[152px] design:text-[146px]"
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
            className="text-shadow-vernal-1 absolute top-[344px] left-[21px] text-[24px] leading-[25px] font-bold tracking-[14px] text-[#0f0f10] uppercase design:top-[496px] design:left-[30px] design:leading-[36px] design:text-[35px] design:tracking-[21px]"
          >
            texas lawyer
          </p>
        </div>

        <Link
          href="/nosotros"
          className="mt-8 flex items-center justify-center gap-x-[10px] text-[16px] leading-[17px] text-white transition-colors hover:text-vernal-accent movil:hidden design:absolute design:top-[683px] design:left-[464px] design:mt-0"
        >
          Conoce mi historia
          <FlechaEnlace />
        </Link>

        <h2 className="mt-12 text-[38px] leading-[40px] font-semibold uppercase sm:text-[48px] movil:absolute movil:top-[424px] movil:left-[46px] movil:mt-0 movil:w-[300px] movil:leading-[48px] movil:text-[46px] design:absolute design:top-[138px] design:left-[924px] design:mt-0 design:w-[587px] design:leading-[67px] design:text-[64px]">
          <span className="block text-white">Conocé al</span>
          <span className="text-vernal-accent block">abogado Vernal</span>
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line design:text-justify text-white movil:absolute movil:top-[601px] movil:left-[41px] movil:mt-0 movil:w-[315px] movil:max-w-none movil:text-justify design:absolute design:top-[335px] design:left-[924px] design:mt-0 design:w-[580px]">
          {"Antes de convertirse en abogado de inmigración, el "}
          <span className="text-vernal-accent">Abogado Vernal</span>
          {" ya conocía el peso de ese sistema desde adentro. Nació en Panamá, pero su historia con inmigración en Estados Unidos comenzó mucho antes de que él mismo decidiera ejercer el derecho: comenzó viendo a sus propios hermanos cruzar esa frontera legal, y a su madre enfrentar una sanción por una falta administrativa que la ley consideró severa.\n\nNo aprendió sobre el proceso migratorio en un salón de clases. Lo aprendió en su propia casa.\n\nPor eso, cuando dice que \"cada cliente que llega a la oficina lleva a mi familia\", no es una frase hecha, es literal. Cada caso de inmigración que revisa, cada petición familiar, cada proceso de residencia, le recuerda lo que vivió su propia gente.\n\nEsa cercanía con el sistema migratorio de Estados Unidos y con lo que significa navegarlo sin ayuda es lo que lo llevó a fundar Vernal Farnum Mejía & Associates, un despacho de inmigración en Texas donde cada caso se atiende con la misma seriedad y cuidado con la que él hubiera querido que atendieran a los suyos."}
        </p>
      </div>
    </section>
  );
}
