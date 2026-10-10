import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * "Hoy, al frente de un equipo que piensa igual" — frame `181:2125`, export del
 * 2026-09-13, rango y=2282..3165. Coordenadas relativas a la sección.
 *
 *   fondo    1923×883, VOLTEADO en horizontal (el archivo aplica
 *            matrix(−1 0 0 1 …) al rect, así que la foto y el degradado van en espejo):
 *              1. la foto al 23%, dibujada 2054×1370 en (−24, −325) antes del espejo
 *              2. el degradado, ya calculado en espejo:
 *                 linear-gradient(276.29deg, #171717 9.22% → transparente 68.95%)
 *   titular  centrado en x960, líneas base 147 y 214, Poppins 64/300;
 *            "Hoy, al frente de un" en cian y "equipo que piensa igual" en blanco
 *   cuerpo   x549 y265, caja de 820, 16/17 justificado, dos párrafos
 *   botón    x797 y452  277×52
 *   tira     y595, cinco fotos de 382/381×288 con 3px de separación
 *            (en el export anterior eran huecos grises; ya tienen foto)
 *
 * MÓVIL (artboard `924:1031`, rango y=3228..4111, 883 de alto): titular a
 * 32/33 en x45, cuerpo a 16/17 en x41 con caja de 320, botón de 277×52 en
 * (41, +509) y la tira en 2×2 de 199/202×151 desde +599.
 *
 * En ese artboard el botón dice "Conoce al equipo completo" y la tira son
 * cuatro fotos distintas de las cinco de escritorio. Desde el 2026-10-09 el
 * móvil va tal cual, por decisión de Roberto: su botón lleva a /nuestro-equipo
 * y la tira usa las cuatro fotos del artboard, con su mismo encuadre.
 */

const TIRA = [
  { left: 0, ancho: 382 },
  { left: 385, ancho: 381 },
  { left: 769, ancho: 382 },
  { left: 1154, ancho: 381 },
  { left: 1538, ancho: 382 },
];

/** La tira del lienzo de 402: cuatro fotos propias, en dos filas. */
const TIRA_MOVIL = [
  { left: 0, top: 599, ancho: 199 },
  { left: 200, top: 599, ancho: 202 },
  { left: 0, top: 751, ancho: 199 },
  { left: 200, top: 751, ancho: 201 },
];

export function NosotrosHoy() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden movil:h-[883px] movil:bg-[#0B0B0B] design:h-[883px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -scale-x-100 movil:inset-auto movil:top-0 movil:left-0 movil:h-[883px] movil:w-[402px] design:inset-auto design:top-0 design:left-0 design:h-[883px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/hoy-fondo.webp"
          alt=""
          width={2054}
          height={1370}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.23] movil:hidden design:inset-auto design:top-[-325px] design:left-[-24px] design:h-[1370px] design:w-[2054px] design:max-w-none design:object-fill"
        />
        <Image
          src="/images/nosotros/hoy-fondo-movil.webp"
          alt=""
          width={1079}
          height={719}
          className="absolute hidden opacity-[0.23] movil:top-0 movil:left-[-363px] movil:block movil:h-[719px] movil:w-[1079px] movil:max-w-none"
        />
        {/* Dentro del espejo, con el ángulo tal cual lo trae el archivo. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(354.47deg,#171717_371.16%,#00000000_412.48%)] movil:block" />
      </div>
      {/* El degradado va fuera del espejo porque ya está calculado volteado. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(276.29deg,#171717_9.22%,#17171700_68.95%)] movil:hidden design:inset-auto design:top-0 design:left-0 design:h-[883px] design:w-[1923px]"
      />

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 apilada:py-20 movil:h-[883px] movil:max-w-none movil:p-0 design:h-[883px] design:max-w-[1920px] design:p-0">
        <h2 className="text-[34px] leading-[40px] font-light sm:text-[44px] sm:leading-[52px] movil:absolute movil:top-[61px] movil:left-[45px] movil:w-[330px] movil:text-left movil:text-[32px] movil:leading-[33px] design:absolute design:top-[91px] design:left-0 design:w-[1920px] design:text-center design:text-[64px] design:leading-[67px]">
          {/* En el lienzo de 402 parte en tres líneas y "un" va en blanco. */}
          <span className="text-vernal-accent">Hoy, al frente de</span>
          <br className="hidden movil:inline" />{" "}
          <span className="text-vernal-accent movil:text-white">un</span>{" "}
          <span className="text-white">
            equipo <br className="hidden design:inline" />
            que <br className="hidden movil:inline" />
            piensa igual
          </span>
        </h2>

        <p className="mt-6 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify movil:absolute movil:top-[192px] movil:left-[41px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[265px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          {"Hoy, el Abogado Vernal lidera un equipo de más de 50 personas, repartido en sus oficinas de inmigración en Dallas, Houston, Austin y Fort Worth, cuatro ciudades de Texas donde la comunidad hispana enfrenta, todos los días, las mismas dudas que él mismo vio enfrentar a su familia.\n\nDetrás de cada una de esas oficinas hay abogados, paralegales y personal de apoyo que comparten un mismo criterio al momento de contratar: que les importe la historia de la persona que tienen enfrente, no solo su expediente."}
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[277px] apilada:w-[277px] movil:hidden design:absolute design:top-[452px] design:left-[797px] design:mt-0"
        >
          Agenda tu consulta
        </ButtonLink>
        <ButtonLink
          href="/nuestro-equipo"
          className="hidden movil:absolute movil:top-[509px] movil:left-[41px] movil:flex movil:w-[277px]"
        >
          Conoce al equipo completo
        </ButtonLink>

        {/* Tira de cinco fotos de clientes del despacho; en el lienzo de 402 son
            otras cuatro, en dos filas. */}
        <ul className="mt-12 grid grid-cols-2 gap-[3px] sm:grid-cols-5 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:h-full movil:w-full design:absolute design:top-[595px] design:left-0 design:mt-0 design:block design:h-[288px] design:w-full">
          {TIRA.map((t, i) => (
            <li
              key={t.left}
              className={`relative aspect-[382/288] overflow-hidden last:col-span-2 last:aspect-[764/288] sm:last:col-span-1 sm:last:aspect-[382/288] design:absolute design:top-0 design:left-[var(--x)] design:aspect-auto design:h-[288px] design:w-[var(--w)] movil:hidden`}
              style={
                {
                  "--x": `${t.left}px`,
                  "--w": `${t.ancho}px`,
                } as React.CSSProperties
              }
            >
              <Image
                src={`/images/nosotros/tira-${i + 1}.webp`}
                alt="Clientes del despacho con su documentación migratoria"
                fill
                sizes="(min-width: 1280px) 382px, (min-width: 640px) 20vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
          {TIRA_MOVIL.map((t, i) => (
            <li
              key={`movil-${t.left}-${t.top}`}
              className="hidden overflow-hidden movil:absolute movil:top-[var(--my)] movil:left-[var(--mx)] movil:block movil:h-[151px] movil:w-[var(--mw)]"
              style={
                {
                  "--mx": `${t.left}px`,
                  "--my": `${t.top}px`,
                  "--mw": `${t.ancho}px`,
                } as React.CSSProperties
              }
            >
              <Image
                src={`/images/nosotros/tira-movil-${i + 1}.webp`}
                alt="Clientes del despacho con su documentación migratoria"
                fill
                sizes="202px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
