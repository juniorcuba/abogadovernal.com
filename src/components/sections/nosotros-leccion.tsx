import Image from "next/image";
import { Logo } from "@/components/ui/logo";

/**
 * "Una lección que su propia familia le enseñó" — frame `181:2125`, export del
 * 2026-09-13, rango y=1026..1634. Coordenadas relativas a la sección.
 *
 *   fondo    1923×608, dos capas:
 *              1. foto al 17%, dibujada 1484×990 en (+601, −316)
 *              2. linear-gradient(77.82deg, #171717 35.65% → transparente 51.41%)
 *   vídeo    x243 y96  733×425: foto 733×489 en (0, −32); trazo de 8 por dentro
 *            con degradado lineal cian → #172339 y sombra 8/36 al 84%.
 *            Dentro, "Familia Vernal" (20/300) abajo a la izquierda y el logo a
 *            67×47 abajo a la derecha. La foto viene desenfocada en el archivo.
 *   titular  x1064, líneas base 170/207/244, Poppins 36/300; "familia le enseñó" en cian
 *   cuerpo   x1064 y309, caja de 580, 16/17 justificado
 */
export function NosotrosLeccion() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden design:h-[608px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-0 design:left-0 design:h-[608px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/leccion-fondo-2.webp"
          alt=""
          width={1484}
          height={990}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.17] design:inset-auto design:top-[-316px] design:left-[601px] design:h-[990px] design:w-[1484px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(77.82deg,#171717_35.65%,#00000000_51.41%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1040px] gap-x-12 gap-y-10 px-6 py-16 md:grid-cols-2 md:items-center lg:px-12 design:block design:h-[608px] design:max-w-[1920px] design:p-0">
        <div className="relative aspect-[733/425] w-full shadow-[8px_36px_37.1px_rgb(0_0_0/0.84)] design:absolute design:top-[96px] design:left-[243px] design:aspect-auto design:h-[425px] design:w-[733px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/nosotros/leccion-video-2.webp"
              alt="El abogado Vernal Farnum Mejía con su familia"
              width={1466}
              height={978}
              className="absolute top-[-7.5%] left-0 h-[115%] w-full max-w-none object-cover design:top-[-32px] design:h-[489px] design:w-[733px] design:object-fill"
            />
          </div>
          {/* Trazo con degradado: rect de 725×417 centrado sobre un trazo de 8,
              que queda justo por dentro del borde de la foto. */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
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
          <p className="absolute bottom-[8%] left-[7%] text-[16px] leading-[18px] font-light text-white sm:text-[20px] design:top-[364px] design:bottom-auto design:left-[52px] design:leading-[21px]">
            Familia Vernal
          </p>
          {/* Logo a 67×47: el componente trae su tamaño de 111×78 en la clase base,
              así que se escala desde un contenedor en vez de pisarle las clases. */}
          <span className="absolute right-[5%] bottom-[8%] h-[34px] w-[48px] design:top-[338px] design:right-auto design:bottom-auto design:left-[615px] design:h-[47px] design:w-[67px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>
        </div>

        <div>
          <h2 className="text-[28px] leading-[32px] font-light text-white sm:text-[32px] sm:leading-[36px] design:absolute design:top-[139px] design:left-[1064px] design:w-[420px] design:leading-[37px] design:text-[36px]">
            {"Una lección que "}
            <br className="hidden design:inline" />
            {"su propia "}
            <span className="text-vernal-accent">
              familia <br className="hidden design:inline" />
              le enseñó
            </span>
          </h2>

          <p className="mt-6 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify design:absolute design:top-[309px] design:left-[1064px] design:mt-0 design:w-[580px] design:max-w-none design:leading-[17px]">
            {"A lo largo de su carrera, ha visto de cerca cómo una mala asesoría legal puede cambiar por completo el rumbo de una familia, no tuvo que buscar lejos para entenderlo. Su propio hermano vivió un proceso migratorio que pudo haber terminado de forma muy distinta, de no ser porque buscó la orientación correcta a tiempo.\n\nEsa experiencia marcó cómo entiende el costo real de un mal proceso legal, no en dinero, sino en tiempo con la familia que nunca se recupera."}
          </p>
        </div>
      </div>
    </section>
  );
}
