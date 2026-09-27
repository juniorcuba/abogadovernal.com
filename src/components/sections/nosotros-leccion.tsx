import Image from "next/image";
import { Logo } from "@/components/ui/logo";

/**
 * "Una lección que su propia familia le enseñó" — frame `181:2125`, export del
 * 2026-09-13, rango y=1026..1634. Coordenadas relativas a la sección.
 *
 *   fondo    1923×608, dos capas:
 *              1. foto al 17%, dibujada 1484×990 en (+601, −316)
 *              2. linear-gradient(77.82deg, #171717 35.65% → transparente 51.41%)
 *   vídeo    x243 y96  733×425; trazo de 8 por dentro con degradado lineal
 *            cian → #172339 y sombra 8/36 al 84%. Dentro, "Familia Vernal"
 *            (20/300) abajo a la izquierda y el logo a 67×47 abajo a la derecha.
 *            FOTO: la del archivo (desenfocada, 733×489 en 0,−32) la cambió el
 *            cliente por DSC00324 (el abogado en la sala, bajo el texto de la
 *            misión), recortada a 733×425 y exportada a 2x.
 *   titular  x1053, líneas base 160.9/227.9/294.9, Poppins 64/300 con interlineado
 *            67; "familia" y "le enseñó" en cian
 *   cuerpo   x1064 y348, caja de 580, 16/17 justificado
 *
 * MÓVIL (artboard `924:1031`, 402×7042, rango y=1349..2230): la misma banda
 * apilada — vídeo arriba (28, +85, 340×197 con trazo de 5), titular a 32/33 en
 * x45 y cuerpo a 16/17 en x41, caja de 320.
 *
 * OJO: ese artboard pone aquí OTRO texto (el de la misión, "En Texas, Estados
 * Unidos, la oficina del Abogado Vernal Farnum Mejía…") y la foto del equipo en
 * vez de la que eligió el cliente. Servir textos distintos según el ancho en la
 * misma URL no es buena idea, así que se mantiene el contenido de escritorio y
 * solo se toma la composición. Pendiente de preguntar al diseñador.
 */
export function NosotrosLeccion() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden movil:h-[881px] movil:bg-black design:h-[608px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 movil:inset-auto movil:top-0 movil:left-[-4px] movil:h-[881px] movil:w-[403px] design:inset-auto design:top-0 design:left-0 design:h-[608px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/leccion-fondo-2.webp"
          alt=""
          width={1484}
          height={990}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.17] movil:inset-auto movil:top-[604px] movil:left-[-7px] movil:h-[305px] movil:w-[458px] movil:max-w-none movil:object-fill design:inset-auto design:top-[-316px] design:left-[601px] design:h-[990px] design:w-[1484px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(77.82deg,#171717_35.65%,#00000000_51.41%)] movil:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(172.27deg,#171717_70.88%,#00000000_78.44%)] movil:block" />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 apilada:max-w-[880px] apilada:px-10 apilada:py-20 movil:block movil:h-[881px] movil:max-w-none movil:p-0 design:block design:h-[608px] design:max-w-[1920px] design:p-0">
        <div className="relative aspect-[733/425] w-full shadow-[8px_36px_37.1px_rgb(0_0_0/0.84)] movil:absolute movil:top-[85px] movil:left-[28px] movil:aspect-auto movil:h-[197px] movil:w-[340px] design:absolute design:top-[96px] design:left-[243px] design:aspect-auto design:h-[425px] design:w-[733px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/nosotros/leccion-foto-mision.webp"
              alt="El abogado Vernal Farnum Mejía en la sala de juntas del despacho, bajo el texto de la misión"
              width={1466}
              height={850}
              sizes="(min-width: 1280px) 733px, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {/* Trazo con degradado: rect de 725×417 centrado sobre un trazo de 8,
              que queda justo por dentro del borde de la foto. */}
          {/* En el lienzo de 402 el trazo es de 5, no de 8. */}
          <svg
            aria-hidden
            className="absolute inset-0 hidden h-full w-full movil:block"
            viewBox="0 0 340 197"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="nos-leccion-trazo-movil"
                x1="260"
                y1="7.6"
                x2="298"
                y2="221.4"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#08B6FF" />
                <stop offset="1" stopColor="#172339" />
              </linearGradient>
            </defs>
            <rect
              x="2.5"
              y="2.5"
              width="335"
              height="192"
              stroke="url(#nos-leccion-trazo-movil)"
              strokeWidth="5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full movil:hidden"
            viewBox="0 0 733 425"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="nos-leccion-trazo"
                x1="561"
                y1="16.5"
                x2="642"
                y2="477.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#08B6FF" />
                <stop offset="1" stopColor="#172339" />
              </linearGradient>
            </defs>
            <rect
              x="4"
              y="4"
              width="725"
              height="417.122"
              stroke="url(#nos-leccion-trazo)"
              strokeWidth="8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* El artboard móvil no lleva este rótulo. */}
          <p className="absolute bottom-[8%] left-[7%] text-[16px] leading-[18px] font-light text-white sm:text-[20px] movil:hidden design:top-[364px] design:bottom-auto design:left-[52px] design:leading-[21px]">
            Familia Vernal
          </p>
          {/* Logo a 67×47: el componente trae su tamaño de 111×78 en la clase base,
              así que se escala desde un contenedor en vez de pisarle las clases. */}
          <span className="absolute right-[5%] bottom-[8%] h-[34px] w-[48px] movil:top-[156.7px] movil:right-auto movil:bottom-auto movil:left-[285.2px] movil:h-[22px] movil:w-[31px] design:top-[338px] design:right-auto design:bottom-auto design:left-[615px] design:h-[47px] design:w-[67px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>
        </div>

        <div className="movil:contents">
          <h2 className="text-[28px] leading-[32px] font-light text-white sm:text-[32px] sm:leading-[36px] movil:absolute movil:top-[339px] movil:left-[45px] movil:w-[330px] movil:text-[32px] movil:leading-[33px] design:absolute design:top-[104px] design:left-[1053px] design:w-[700px] design:leading-[67px] design:text-[64px] design:font-light">
            {"Una lección que "}
            <br className="hidden movil:inline design:inline" />
            {"su propia "}
            <span className="text-vernal-accent">
              familia <br className="hidden movil:inline design:inline" />
              le enseñó
            </span>
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify movil:absolute movil:top-[470px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[348px] design:left-[1064px] design:mt-0 design:w-[580px] design:max-w-none design:leading-[17px]">
            {"A lo largo de su carrera, ha visto de cerca cómo una mala asesoría legal puede cambiar por completo el rumbo de una familia, no tuvo que buscar lejos para entenderlo. Su propio hermano vivió un proceso migratorio que pudo haber terminado de forma muy distinta, de no ser porque buscó la orientación correcta a tiempo.\n\nEsa experiencia marcó cómo entiende el costo real de un mal proceso legal, no en dinero, sino en tiempo con la familia que nunca se recupera."}
          </p>
        </div>
      </div>
    </section>
  );
}
