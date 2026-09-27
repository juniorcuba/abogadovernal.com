import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { equipo, rejillaEquipo } from "@/lib/equipo";

/**
 * /nuestro-equipo — frame `770:403` de Figma (1920 × 4486).
 *
 * Del hero hay datos exactos (get_design_context del nodo 770:624); del resto
 * solo el render del artboard, así que las medidas están tomadas sobre él y son
 * aproximadas. Cuando llegue el export SVG hay que repasarlas y cambiar las
 * fotos, que hoy son recortes del propio render.
 *
 *   hero        0..897
 *   el equipo   897..2270: título y las once fichas en 4 + 4 + 3
 *   compromiso  2270..3263: título, tres párrafos y el vídeo
 *   agenda      3263..4018 (el bloque compartido)
 *   footer      4018..4486
 */

export function EquipoHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[897px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden design:h-[897px] design:w-[1918px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1918 897" preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="equipo-hero-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(122.39 36.025 -43.27 30.361 113.53 295.08)"
            >
              <stop stopColor="#172339" />
              <stop offset="0.5" stopColor="#131924" />
              <stop offset="1" stopColor="#0F0F0F" />
            </radialGradient>
          </defs>
          <rect width="1918" height="897" fill="url(#equipo-hero-radial)" />
        </svg>
        <Image
          src="/images/equipo/hero-fondo.webp"
          alt=""
          width={1024}
          height={723}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-[0.24] mix-blend-plus-lighter"
        />
        <div className="absolute inset-0 bg-[linear-gradient(79.01deg,#000000_31.331%,#00000000_43.945%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(294.62deg,#000000_10.638%,#0A0A0A00_48.231%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[897px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] design:absolute design:top-[216px] design:left-[243px] design:text-[36px] design:leading-[37.44px]">
          Tu defensa en Texas
        </p>

        <h1 className="mt-3 text-[40px] leading-[44px] font-semibold uppercase sm:text-[58px] sm:leading-[62px] design:absolute design:top-[271px] design:left-[237px] design:mt-0 design:w-[752px] design:text-[82px] design:leading-[85.28px]">
          <span className="text-white">Hoy, al frente de </span>
          <span className="text-vernal-accent">un equipo que piensa igual</span>
        </h1>

        <div className="mt-8 max-w-[680px] space-y-5 text-[16px] leading-[22px] text-white design:absolute design:top-[550px] design:left-[243px] design:mt-0 design:w-[580px] design:max-w-none design:space-y-0 design:text-justify design:leading-[17px]">
          <p>
            Hoy, el <span className="text-vernal-accent">Abogado Vernal</span> lidera un equipo
            de más de 50 personas, repartido en sus oficinas de inmigración en Dallas, Houston,
            Austin y Fort Worth, cuatro ciudades de Texas donde la comunidad hispana enfrenta,
            todos los días, las mismas dudas que él mismo vio enfrentar a su familia.
          </p>
          <p className="design:mt-[17px]">
            Detrás de cada una de esas oficinas hay abogados, paralegales y personal de apoyo
            que comparten un mismo criterio al momento de contratar: que les importe la historia
            de la persona que tienen enfrente, no solo su expediente.
          </p>
        </div>

        <ButtonLink
          href="/contacto"
          className="mt-8 w-full sm:w-[224px] apilada:w-[224px] design:absolute design:top-[757px] design:left-[243px] design:mt-0"
        >
          Agenda tu consulta
        </ButtonLink>
      </div>
    </section>
  );
}

export function EquipoRejilla() {
  const { centros, filas, foto } = rejillaEquipo;
  const posicion = (i: number) => {
    const fila = i < 4 ? 0 : i < 8 ? 1 : 2;
    const col = i - fila * 4;
    return { left: centros[col], top: filas[fila] };
  };

  return (
    <section className="relative overflow-hidden bg-black design:h-[1373px]">
      {/* La ciudad solo se ve en la parte de arriba: de la primera fila para
          abajo el archivo es negro puro. Es el propio render con los textos y
          los once retratos borrados. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/equipo/rejilla-fondo.webp"
          alt=""
          width={1920}
          height={1373}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1373px] design:max-w-[1920px] design:p-0">
        {/* En el archivo el título no está centrado: queda 40px a la izquierda. */}
        <h2 className="text-center text-[34px] leading-[40px] font-light text-white sm:text-[44px] design:absolute design:top-[80px] design:left-[776px] design:w-auto design:text-left design:text-[64px] design:leading-[66px]">
          El equipo
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 apilada:grid-cols-3 design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
          {equipo.map((f, i) => (
            <li
              key={f.nombre}
              className="text-center design:absolute design:top-[var(--t)] design:left-[var(--l)] design:w-[var(--w)] design:-translate-x-1/2"
              style={
                {
                  "--t": `${posicion(i).top - 897}px`,
                  "--l": `${posicion(i).left}px`,
                  "--w": `${foto.ancho}px`,
                } as React.CSSProperties
              }
            >
              {/* El nombre y el cargo van por encima de la foto: en el archivo
                  el cargo se mete unos píxeles dentro de ella. */}
              <p className="text-vernal-accent relative z-[1] text-[16px] leading-[18px] font-semibold uppercase design:text-[18px] design:leading-[19px]">
                {f.nombre}
              </p>
              <p
                className={`relative z-[1] mt-1 text-[11px] leading-[13px] font-semibold uppercase design:mt-[5px] design:text-[12px] design:leading-[13px] ${
                  f.verde ? "text-[#27ffa2]" : "text-white"
                }`}
              >
                {f.cargo}
              </p>
              <Image
                src={f.foto}
                alt={`${f.nombre}, ${f.cargo}`}
                width={foto.ancho}
                height={foto.alto}
                sizes="(min-width: 1280px) 250px, 40vw"
                className="mt-4 h-auto w-full object-contain design:absolute design:top-[var(--d)] design:left-0 design:mt-0 design:h-[var(--h)] design:w-full"
                style={
                  { "--d": `${foto.desde + 2}px`, "--h": `${foto.alto}px` } as React.CSSProperties
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * "Nuestro compromiso" — 1920×993 a partir de y2270 del artboard.
 *
 * Medidas tomadas sobre el render (no hay SVG): el título a 64/66 con la
 * mayúscula en y2355, los tres párrafos a 16/18.5 en 2459, 2527 y 2561, y la
 * tarjeta del vídeo en x437 y2633, 1046×554 con un borde de 5px en #172339.
 *
 * El fondo y el fotograma son recortes del propio render a los que se les ha
 * borrado el texto (relleno por difusión, `cambios/inpaint.py`): así el texto
 * vuelve a ser texto de verdad en lugar de estar pegado en la imagen.
 */
export function EquipoCompromiso() {
  return (
    <section className="relative overflow-hidden bg-[#0F0F10] design:h-[993px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/equipo/compromiso-fondo.webp"
          alt=""
          width={1920}
          height={993}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[993px] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[34px] leading-[40px] font-light sm:text-[44px] design:absolute design:top-[74px] design:left-0 design:w-full design:text-[64px] design:leading-[66px]">
          <span className="text-white">Nuestro </span>
          <span className="text-vernal-accent">compromiso</span>
        </h2>

        {/* Cada párrafo tiene su propia caja en el archivo: el primero es más
            estrecho que los otros dos y por eso parte antes. */}
        <div className="mx-auto mt-8 max-w-[880px] space-y-5 text-center text-[16px] leading-[22px] text-white design:contents">
          <p className="design:absolute design:top-[185px] design:left-1/2 design:w-[812px] design:-translate-x-1/2 design:text-center design:leading-[18.5px]">
            Una visa no solo representa un documento migratorio. Representa justicia, protección
            y una segunda oportunidad. Como abogado de inmigración, estos son los momentos que le
            dan sentido a lo que hacemos cada día.
          </p>
          <p className="design:absolute design:top-[253px] design:left-1/2 design:w-[880px] design:-translate-x-1/2 design:text-center design:leading-[18.5px]">
            Si tú también has sido víctima de un crimen y estás en EE.UU., podrías calificar para
            una Visa U.
          </p>
          <p className="design:absolute design:top-[287px] design:left-1/2 design:w-[880px] design:-translate-x-1/2 design:text-center design:leading-[18.5px]">
            <span className="text-vernal-accent">Agenda tu consulta hoy.</span> Revisamos tu caso
            con total confidencialidad. No estás solo. En las oficinas del Abogado Vernal,
            caminamos contigo desde el inicio hasta el final.
          </p>
        </div>

        {/* El borde de 5px va en la propia caja: las posiciones de dentro son
            relativas a la zona de relleno, ya descontado el borde. */}
        <div className="relative mt-12 aspect-[1046/554] w-full overflow-hidden rounded-[31px] border-[5px] border-[#172339] design:absolute design:top-[363px] design:left-[437px] design:mt-0 design:aspect-auto design:h-[554px] design:w-[1046px]">
          <Image
            src="/images/equipo/compromiso-video.webp"
            alt="Testimonio de una Visa U aprobada"
            width={1035}
            height={543}
            sizes="(min-width: 1280px) 1036px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <span
            aria-hidden
            className="absolute hidden text-[143px] leading-[143px] font-semibold tracking-[0.1em] whitespace-nowrap text-white/10 uppercase design:top-[370px] design:left-1/2 design:block design:-translate-x-1/2"
          >
            Aprobada
          </span>

          {/* Fuera del lienzo de 1920 la tarjeta es mucho más baja y las
              posiciones del archivo se pisarían: ahí el contenido se apila. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 design:block design:gap-0 design:px-0">
            <button
              type="button"
              aria-label="Ver el testimonio"
              className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/40 transition-transform hover:scale-105 sm:h-[76px] sm:w-[76px] design:absolute design:top-[235px] design:left-1/2 design:h-[97px] design:w-[97px] design:-translate-x-1/2 design:-translate-y-1/2"
            >
              <span
                aria-hidden
                className="ml-[4px] border-t-[10px] border-b-[10px] border-l-[17px] border-t-transparent border-b-transparent border-l-[#172339]/70 sm:ml-[6px] sm:border-t-[14px] sm:border-b-[14px] sm:border-l-[24px] design:border-t-[19px] design:border-b-[19px] design:border-l-[33px]"
              />
            </button>

            <VistoBueno className="absolute hidden design:top-[298px] design:left-[219px] design:block design:h-[54px] design:w-[54px]" />

            <p className="text-center text-[22px] leading-[26px] font-semibold uppercase sm:text-[34px] sm:leading-[38px] design:absolute design:top-[297px] design:left-1/2 design:w-full design:-translate-x-1/2 design:text-[55px] design:leading-[56px]">
              <span className="text-white design:block">Este momento </span>
              <span className="text-vernal-accent design:block">lo cambia todo</span>
            </p>

            <p className="text-vernal-accent text-center text-[15px] leading-[19px] font-light sm:text-[18px] sm:leading-[22px] design:absolute design:top-[432px] design:left-1/2 design:w-full design:-translate-x-1/2 design:text-[30px] design:leading-[31px]">
              Visa U Aprobada
            </p>
          </div>

          <span className="absolute hidden design:top-[446px] design:left-[45px] design:block design:h-[62px] design:w-[88px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>

          <span className="text-vernal-accent absolute hidden text-[20px] leading-[21px] font-light design:top-[481px] design:left-[855px] design:block">
            Canal Oficial
          </span>
        </div>
      </div>
    </section>
  );
}

/** El círculo con el visto que acompaña a "Este momento" dentro del vídeo. */
function VistoBueno({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" aria-hidden className={className}>
      <circle cx="27" cy="27" r="27" fill="#ffffff" />
      <path
        d="M15.5 27.5 23.5 35 38.5 19.5"
        stroke="#0F0F10"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
