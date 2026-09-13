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
 */

const TIRA = [
  { left: 0, ancho: 382 },
  { left: 385, ancho: 381 },
  { left: 769, ancho: 382 },
  { left: 1154, ancho: 381 },
  { left: 1538, ancho: 382 },
];

export function NosotrosHoy() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden design:h-[883px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -scale-x-100 design:inset-auto design:top-0 design:left-0 design:h-[883px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/hoy-fondo.webp"
          alt=""
          width={2054}
          height={1370}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.23] design:inset-auto design:top-[-325px] design:left-[-24px] design:h-[1370px] design:w-[2054px] design:max-w-none design:object-fill"
        />
      </div>
      {/* El degradado va fuera del espejo porque ya está calculado volteado. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(276.29deg,#171717_9.22%,#17171700_68.95%)] design:inset-auto design:top-0 design:left-0 design:h-[883px] design:w-[1923px]"
      />

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[883px] design:max-w-[1920px] design:p-0">
        <h2 className="text-[34px] leading-[40px] font-light sm:text-[44px] sm:leading-[52px] design:absolute design:top-[91px] design:left-0 design:w-[1920px] design:text-center design:text-[64px] design:leading-[67px]">
          <span className="text-vernal-accent">Hoy, al frente de un</span>{" "}
          <span className="text-white">
            equipo <br className="hidden design:inline" />
            que piensa igual
          </span>
        </h2>

        <p className="mt-6 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify design:absolute design:top-[265px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          {"Hoy, el Abogado Vernal lidera un equipo de más de 50 personas, repartido en sus oficinas de inmigración en Dallas, Houston, Austin y Fort Worth, cuatro ciudades de Texas donde la comunidad hispana enfrenta, todos los días, las mismas dudas que él mismo vio enfrentar a su familia.\n\nDetrás de cada una de esas oficinas hay abogados, paralegales y personal de apoyo que comparten un mismo criterio al momento de contratar: que les importe la historia de la persona que tienen enfrente, no solo su expediente."}
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[277px] design:absolute design:top-[452px] design:left-[797px] design:mt-0"
        >
          Agenda tu consulta
        </ButtonLink>

        {/* Tira de cinco fotos de clientes del despacho. */}
        <ul className="mt-12 grid grid-cols-2 gap-[3px] sm:grid-cols-5 design:absolute design:top-[595px] design:left-0 design:mt-0 design:block design:h-[288px] design:w-full">
          {TIRA.map((t, i) => (
            <li
              key={t.left}
              className="relative aspect-[382/288] overflow-hidden last:col-span-2 last:aspect-[764/288] sm:last:col-span-1 sm:last:aspect-[382/288] design:absolute design:top-0 design:left-[var(--x)] design:aspect-auto design:h-[288px] design:w-[var(--w)]"
              style={{ "--x": `${t.left}px`, "--w": `${t.ancho}px` } as React.CSSProperties}
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
        </ul>
      </div>
    </section>
  );
}
