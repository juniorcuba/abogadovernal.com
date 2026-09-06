import Image from "next/image";

/**
 * "+15,000 personas asesoradas" — rango y=2920..3721 de la frame `181:2125`.
 * Coordenadas relativas al inicio de la sección (y − 2920).
 *
 *   fondo    x0 y2920  1923×801, dos capas:
 *              1. la foto al 23%, dibujada 1245×1660 en (−94, −337)
 *              2. linear-gradient(82.02deg, transparente 30.52% → #171717 58.67%)
 *   cifra    x618 y2985  Poppins 176 peso 600 #08B6FF
 *   subtítulo x686 y3045 Poppins 45 peso 600 #08B6FF
 *   cuerpo   x543 y3185  Poppins 16/400 blanco, doce líneas de 17
 *
 * El rect del fondo mide 1923 en el archivo y se sale 3px del lienzo. Las demás
 * secciones lo recortan con su `overflow-hidden`, pero esta no lo lleva —el
 * "+15,000" tiene que poder salirse por arriba—, así que aquí se corta a 1920.
 *
 * El texto acaba con “imperfectamente honesta” con las comillas descompensadas
 * en el archivo: abre con la recta y cierra con la tipográfica. Se deja igual.
 */
export function NosotrosCifras() {
  return (
    <section className="bg-vernal-ink relative design:h-[801px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:inset-auto design:top-0 design:left-0 design:h-[801px] design:w-[1920px]"
      >
        <Image
          src="/images/nosotros/cifras-fondo.webp"
          alt=""
          width={1245}
          height={1660}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.23] design:inset-auto design:top-[-337px] design:left-[-94px] design:h-[1660px] design:w-[1245px] design:max-w-none design:object-fill"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(82.02deg, rgb(0 0 0 / 0) 30.52%, #171717 58.67%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 design:h-[801px] design:max-w-[1920px] design:p-0">
        <p className="text-vernal-accent text-center text-[76px] leading-[80px] font-semibold sm:text-[110px] sm:leading-[114px] design:absolute design:top-[-88px] design:left-[618px] design:text-left design:leading-[183px] design:text-[176px]">
          +15,000
        </p>
        <p className="text-vernal-accent text-center text-[24px] leading-[28px] font-semibold uppercase sm:text-[32px] sm:leading-[36px] design:absolute design:top-[85px] design:left-[686px] design:text-left design:leading-[47px] design:text-[45px]">
          Personas asesoradas
        </p>

        <p className="mt-10 text-[16px] leading-[22px] whitespace-pre-line text-white design:absolute design:top-[251px] design:left-[543px] design:mt-0 design:w-[832px] design:text-justify design:leading-[17px]">
          {"Ese enfoque se refleja en los números. A lo largo de su trayectoria, el despacho ha acompañado a más de 15,000 personas en su proceso migratorio, desde peticiones familiares hasta casos de asilo y defensa contra la deportación y ha ayudado a cerca de 10,000 familias a reunirse o permanecer juntas en Estados Unidos.\n\nPero para el Abogado Vernal, ese número no se mide en casos cerrados, sino en las cenas familiares, los cumpleaños y los momentos cotidianos que esas 10,000 familias pudieron volver a compartir gracias a un proceso bien llevado.\n\nSu firma ha sido mencionada en medios como Univisión, Telemundo y Estrella TV pero su filosofía sigue siendo la misma desde el primer día: contratar personas a quienes de verdad les importe la historia de cada cliente, no solo su caso, y construir, como él lo describe, una firma \"imperfectamente honesta”"}
        </p>
      </div>
    </section>
  );
}
