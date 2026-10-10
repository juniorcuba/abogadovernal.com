import Image from "next/image";

/**
 * "+15,000 personas asesoradas" — frame `181:2125`, export del 2026-09-13,
 * rango y=3168..3961 (3px por debajo de "Hoy": entre medias asoma el fondo de
 * la página). Coordenadas relativas a la sección.
 *
 *   fondo    1923×793, tres capas:
 *              1. la foto al 23%, dibujada 1230×1640 en (−257, −387)
 *              2. linear-gradient(87.98deg, negro transparente 37.78% → #171717 48.93%)
 *              3. textura en soft-light al 59% (recortada a su zona visible, x795)
 *   cifra    x618, línea base 65, Poppins 176/600, BLANCA
 *   subtítulo x686, línea base 125, Poppins 45/600, blanco
 *            Las dos llevan una sombra común: 7/6, σ29.2, negro al 100%
 *   cuerpo   x549 y224, caja de 820, 16/17 justificado; dos frases en cian y los
 *            medios en negrita
 *   logos    Telemundo 143×112 en x634 · Univision 86×112 en x916 ·
 *            Estrella TV 98×116 en x1141, sobre y541–545
 *
 * La cifra se sale 88px por arriba, sobre la tira de fotos: por eso la sección no
 * lleva overflow-hidden y el recorte va en la capa del fondo.
 *
 * El cierre de la cita va con las comillas descompensadas del archivo: abre con
 * la recta y cierra con la tipográfica.
 *
 * MÓVIL (artboard `924:1031`, rango y=4130..4746, 616 de alto, 19px por debajo
 * de la banda anterior): la cifra a 82 centrada y asomando 48 por arriba, el
 * subtítulo a 21 y los tres logos en (59,+105), (253,+107) y (155,+255).
 *
 * Ese artboard NO trae el párrafo de esta banda. Desde el 2026-10-09 el móvil
 * va tal cual, por decisión de Roberto: el párrafo se oculta en ese ancho y la
 * banda mide los 616 del archivo.
 */
export function NosotrosCifras() {
  return (
    <section className="bg-vernal-ink relative movil:mt-[19px] design:mt-[3px] design:h-[793px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden movil:inset-auto movil:top-0 movil:left-[-4px] movil:h-[616px] movil:w-[406px] design:inset-auto design:top-0 design:left-0 design:h-[793px] design:w-[1920px]"
      >
        <Image
          src="/images/nosotros/cifras-fondo.webp"
          alt=""
          width={1245}
          height={1660}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.23] movil:inset-auto movil:top-[184px] movil:left-[-28px] movil:h-[616px] movil:w-[462px] movil:max-w-none movil:object-fill design:inset-auto design:top-[-387px] design:left-[-257px] design:h-[1640px] design:w-[1230px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(87.98deg,#00000000_37.78%,#171717_48.93%)] movil:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(359.41deg,#00000000_45.06%,#171717_55.62%)] movil:block" />
        <Image
          src="/images/nosotros/cifras-textura.webp"
          alt=""
          width={1128}
          height={793}
          className="absolute inset-0 hidden h-full w-full object-cover opacity-[0.59] mix-blend-soft-light design:inset-auto design:top-0 design:left-[795px] design:block design:h-[793px] design:w-[1128px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 apilada:py-20 movil:max-w-none movil:p-0 design:h-[793px] design:max-w-[1920px] design:p-0">
        {/* La banda del lienzo de 402 mide lo que la franja del archivo. */}
        <div aria-hidden className="hidden movil:block movil:h-[616px]" />

        <div className="drop-shadow-[7px_6px_29.2px_#000] movil:contents design:absolute design:inset-0">
          <p className="text-center text-[76px] leading-[80px] font-semibold text-white sm:text-[110px] sm:leading-[114px] movil:absolute movil:top-[-47.7px] movil:left-0 movil:w-full movil:text-center movil:text-[82px] movil:leading-[86px] movil:drop-shadow-[4px_3px_14px_#000] design:absolute design:top-[-88px] design:left-[618px] design:text-left design:text-[176px] design:leading-[183px]">
            +15,000
          </p>
          <p className="text-center text-[24px] leading-[28px] font-semibold text-white uppercase sm:text-[32px] sm:leading-[36px] movil:absolute movil:top-[36.35px] movil:left-0 movil:w-full movil:text-center movil:text-[21px] movil:leading-[22px] movil:drop-shadow-[4px_3px_14px_#000] design:absolute design:top-[86px] design:left-[686px] design:text-left design:text-[45px] design:leading-[47px]">
            Personas asesoradas
          </p>
        </div>

        <p className="mx-auto mt-10 max-w-[680px] text-[16px] leading-[22px] whitespace-pre-line text-white sm:text-justify movil:hidden design:absolute design:top-[224px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          {"Ese enfoque se refleja en los números. A lo largo de su trayectoria, "}
          <span className="text-vernal-accent">
            el despacho ha acompañado a más de 15,000 personas en su proceso migratorio,
          </span>
          {" desde peticiones familiares hasta casos de asilo y defensa contra la deportación y ha ayudado a cerca de 10,000 familias a reunirse o permanecer juntas en Estados Unidos.\n\nPero para el Abogado Vernal, ese número no se mide en casos cerrados, sino en las cenas familiares, los cumpleaños y los momentos cotidianos que esas 10,000 familias pudieron volver a compartir gracias a un proceso bien llevado.\n\nSu firma ha sido mencionada en medios como "}
          <strong className="font-bold">Univisión, Telemundo y Estrella TV</strong>
          {" pero su filosofía sigue siendo la misma desde el primer día: contratar personas a quienes de verdad les importe la historia de cada cliente, no solo su caso, y construir, como él lo describe, una firma "}
          <span className="text-vernal-accent">{'"imperfectamente honesta”'}</span>
        </p>

        {/* Logos de los medios que lo han mencionado. */}
        <ul className="mt-12 flex items-center justify-center gap-x-10 movil:contents design:contents">
          <li className="movil:absolute movil:top-[105px] movil:left-[59px] design:absolute design:top-[544.89px] design:left-[634px]">
            <Image src="/icons/nosotros/telemundo.svg" alt="Telemundo" width={143} height={112} className="h-[70px] w-auto movil:h-[101px] movil:w-[129px] design:h-[112.28px] design:w-[143px]" />
          </li>
          <li className="movil:absolute movil:top-[107px] movil:left-[253px] design:absolute design:top-[545px] design:left-[916px]">
            <Image src="/icons/nosotros/univision.svg" alt="Univision" width={86} height={112} className="h-[70px] w-auto movil:h-[101px] movil:w-[77px] design:h-[112px] design:w-[86px]" />
          </li>
          <li className="movil:absolute movil:top-[255px] movil:left-[155px] design:absolute design:top-[541px] design:left-[1141px]">
            <Image src="/icons/nosotros/estrella-tv.svg" alt="Estrella TV" width={98} height={116} className="h-[72px] w-auto movil:h-[104px] movil:w-[88px] design:h-[116.2px] design:w-[98px]" />
          </li>
        </ul>
      </div>
    </section>
  );
}
