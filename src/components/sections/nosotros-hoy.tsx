import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * "Hoy, al frente de un equipo que piensa igual" — rango y=2034..2917 de la
 * frame `181:2125`. Coordenadas relativas al inicio de la sección (y − 2034).
 *
 *   fondo    x0 y2034  1923×883, dos capas:
 *              1. la foto al 23%, dibujada 2054×1370 en (−24, −325)
 *              2. linear-gradient(77.02deg, #171717 41.45% → transparente 69.65%)
 *   titular  x647 y2214   Poppins 64 peso 300 #08B6FF  "Hoy, al frente de un"
 *            x576 y2281   Poppins 64 peso 300 blanco   "equipo que piensa igual"
 *   cuerpo   x549 y2371   Poppins 16/400, seis líneas de 17
 *   botón    x822 y2512   277×52
 *   tira     y2629, cinco huecos de 382×288 con 3px de separación
 *
 * Las dos líneas del titular no comparten x ni caja: en el archivo son dos capas
 * de texto sueltas, cada una con la suya, así que se copian tal cual.
 */

/** Los cinco huecos de la tira, tal como están en el archivo. */
const HUECOS = [
  { left: 0, ancho: 382, color: "#818181" },
  { left: 385, ancho: 381, color: "#D9D9D9" },
  { left: 769, ancho: 382, color: "#818181" },
  { left: 1154, ancho: 381, color: "#D9D9D9" },
  { left: 1538, ancho: 382, color: "#818181" },
];

export function NosotrosHoy() {
  return (
    <section className="bg-vernal-ink relative overflow-hidden design:h-[883px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 design:inset-auto design:top-0 design:left-0 design:h-[883px] design:w-[1923px]"
      >
        <Image
          src="/images/nosotros/hoy-fondo.webp"
          alt=""
          width={2054}
          height={1370}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.23] design:inset-auto design:top-[-325px] design:left-[-24px] design:h-[1370px] design:w-[2054px] design:max-w-none design:object-fill"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(77.02deg, #171717 41.45%, rgb(0 0 0 / 0) 69.65%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[883px] design:max-w-[1920px] design:p-0">
        <h2 className="text-[34px] leading-[40px] font-light sm:text-[44px] sm:leading-[52px] design:contents">
          <span className="text-vernal-accent block design:absolute design:top-[122px] design:left-[647px] design:leading-[67px] design:text-[64px]">
            Hoy, al frente de un
          </span>
          <span className="block text-white design:absolute design:top-[189px] design:left-[576px] design:leading-[67px] design:text-[64px]">
            equipo que piensa igual
          </span>
        </h2>

        <p className="mt-6 text-[16px] leading-[22px] text-white design:absolute design:top-[320px] design:left-[549px] design:mt-0 design:w-[822px] design:text-justify design:leading-[17px] max-w-[680px] design:max-w-none">
          Hoy, el Abogado Vernal lidera un equipo de más de 50 personas, repartido en
          sus oficinas de inmigración en Dallas, Houston, Austin y Fort Worth, cuatro
          ciudades de Texas donde la comunidad hispana enfrenta, todos los días, las
          mismas dudas que él mismo vio enfrentar a su familia. Detrás de cada una de
          esas oficinas hay abogados, paralegales y personal de apoyo que comparten un
          mismo criterio al momento de contratar: que les importe la historia de la
          persona que tienen enfrente, no solo su expediente.
        </p>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[277px] design:absolute design:top-[478px] design:left-[822px] design:mt-0"
        >
          Agenda tu consulta
        </ButtonLink>

        {/* Tira de cinco fotos. En el archivo son rectángulos grises vacíos: el
            diseñador aún no ha puesto las imágenes. Se dejan tal cual para que se
            vea que faltan, en vez de rellenarlos con algo inventado. */}
        <ul
          aria-hidden
          className="mt-12 grid grid-cols-5 gap-[3px] design:absolute design:top-[595px] design:left-0 design:mt-0 design:block design:h-[288px] design:w-full"
        >
          {HUECOS.map((h) => (
            <li
              key={h.left}
              className="aspect-[382/288] design:absolute design:top-0 design:left-[var(--x)] design:aspect-auto design:h-[288px] design:w-[var(--w)]"
              style={
                {
                  "--x": `${h.left}px`,
                  "--w": `${h.ancho}px`,
                  backgroundColor: h.color,
                } as React.CSSProperties
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
