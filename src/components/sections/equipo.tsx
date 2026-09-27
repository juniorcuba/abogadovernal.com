import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { equipo, rejillaEquipo } from "@/lib/equipo";

/**
 * /nuestro-equipo — frame `770:403` de Figma (1920 × 4486), leído del export
 * `VERNAL - NUESTRO EQUIPO.svg`.
 *
 *   hero        0..897
 *   el equipo   897..2266: título y las once fichas en 4 + 4 + 3
 *   compromiso  2266..3321: título, tres párrafos y el vídeo
 *   agenda      3263..4018 (el bloque compartido, que se mete 58 encima)
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
              gradientTransform="matrix(1223.9 360.248 -432.699 303.614 113.526 295.078)"
            >
              <stop stopColor="#172339" />
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
          sizes="(min-width: 1280px) 1404px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-[0.24] mix-blend-plus-lighter design:top-[44px] design:left-[535px] design:h-[991px] design:w-[1404px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(294.62deg,#000000_10.64%,#0A0A0A00_48.23%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(79.01deg,#000000_31.33%,#00000000_43.95%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[897px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] design:absolute design:top-[216px] design:left-[242px] design:text-[36px] design:leading-[37.44px]">
          Tu defensa en Texas
        </p>

        <h1 className="mt-3 text-[40px] leading-[44px] font-semibold uppercase sm:text-[58px] sm:leading-[62px] design:absolute design:top-[271px] design:left-[237px] design:mt-0 design:w-[752px] design:text-[82px] design:leading-[85px]">
          <span className="text-white">Hoy, al frente de </span>
          <span className="text-vernal-accent">un equipo que piensa igual</span>
        </h1>

        <div className="mt-8 max-w-[680px] space-y-5 text-[16px] leading-[22px] text-white design:absolute design:top-[551px] design:left-[243px] design:mt-0 design:w-[580px] design:max-w-none design:space-y-0 design:text-justify design:leading-[17px]">
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
  const { izquierdas, filas, foto, cargoDesde } = rejillaEquipo;
  const posicion = (i: number) => {
    const fila = i < 4 ? 0 : i < 8 ? 1 : 2;
    return { left: izquierdas[i - fila * 4], top: filas[fila] };
  };

  return (
    <section className="relative overflow-hidden bg-black design:h-[1369px]">
      {/* La ciudad va en soft-light al 68% sobre el degradado, y un segundo
          degradado la apaga de la primera fila hacia abajo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden design:w-[1920px]">
        <div className="absolute inset-0 bg-[linear-gradient(138.09deg,#172339_27.86%,#000000_86.54%)]" />
        <Image
          src="/images/equipo/rejilla-ciudad.webp"
          alt=""
          width={2525}
          height={1311}
          sizes="(min-width: 1280px) 2525px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.68] mix-blend-soft-light design:top-[-181px] design:left-[-357px] design:h-[1311px] design:w-[2525px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(1.33deg,#000000_57.22%,#0F0F1000_70.61%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1369px] design:max-w-[1920px] design:p-0">
        {/* En el archivo el título no está centrado: arranca en x776. */}
        <h2 className="text-center text-[34px] leading-[40px] font-light text-white sm:text-[44px] design:absolute design:top-[78.5px] design:left-[776px] design:w-auto design:text-left design:text-[64px] design:leading-[66px]">
          El equipo
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 apilada:grid-cols-3 design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
          {equipo.map((f, i) => (
            <li
              key={f.nombre}
              className="text-center design:absolute design:top-[var(--t)] design:left-[var(--l)] design:w-[var(--w)]"
              style={
                {
                  "--t": `${posicion(i).top}px`,
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
                className={`relative z-[1] mt-1 text-[11px] leading-[13px] font-semibold uppercase design:mt-[var(--cd)] design:text-[12px] design:leading-[13px] ${
                  f.verde ? "text-[#27ffa2]" : "text-white"
                }`}
                style={{ "--cd": `${cargoDesde - 19}px` } as React.CSSProperties}
              >
                {f.cargo}
              </p>
              <Image
                src={f.foto}
                alt={`${f.nombre}, ${f.cargo}`}
                width={500}
                height={596}
                sizes="(min-width: 1280px) 226px, 40vw"
                className="mt-4 h-auto w-full object-contain design:absolute design:top-[var(--d)] design:left-0 design:mt-0 design:h-[var(--h)] design:w-full"
                style={{ "--d": `${foto.desde}px`, "--h": `${foto.alto}px` } as React.CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * "Nuestro compromiso" — 1055 de alto desde y2266, de los que los últimos 58
 * quedan por debajo del bloque de "Agenda tu consulta".
 *
 * La tarjeta del vídeo es de 1040×548 en x440 y2636, con el radio de 31 y el
 * trazo de 5 centrado en el borde.
 */
export function EquipoCompromiso() {
  return (
    <section className="relative overflow-hidden bg-black design:h-[1055px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden design:w-[1923px]">
        <Image
          src="/images/equipo/compromiso-fondo.webp"
          alt=""
          width={1024}
          height={726}
          sizes="(min-width: 1280px) 1766px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.17] design:top-[-123px] design:left-[189px] design:h-[1178px] design:w-[1766px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(73.73deg,#171717_18.51%,#00000000_51.32%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1055px] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[34px] leading-[40px] font-light sm:text-[44px] design:absolute design:top-[77.5px] design:left-0 design:w-full design:text-[64px] design:leading-[66px]">
          <span className="text-white">Nuestro </span>
          <span className="text-vernal-accent">compromiso</span>
        </h2>

        {/* Cada párrafo tiene su propia caja en el archivo: el primero es más
            estrecho que los otros dos y por eso parte antes. */}
        <div className="mx-auto mt-8 max-w-[880px] space-y-5 text-center text-[16px] leading-[22px] text-white design:contents">
          <p className="design:absolute design:top-[191px] design:left-1/2 design:w-[812px] design:-translate-x-1/2 design:text-center design:leading-[17px]">
            Una visa no solo representa un documento migratorio. Representa justicia, protección
            y una segunda oportunidad. Como abogado de inmigración, estos son los momentos que le
            dan sentido a lo que hacemos cada día.
          </p>
          <p className="design:absolute design:top-[259px] design:left-1/2 design:w-[880px] design:-translate-x-1/2 design:text-center design:leading-[17px]">
            Si tú también has sido víctima de un crimen y estás en EE.UU., podrías calificar para
            una Visa U.
          </p>
          <p className="design:absolute design:top-[293px] design:left-1/2 design:w-[880px] design:-translate-x-1/2 design:text-center design:leading-[17px]">
            <span className="text-vernal-accent">Agenda tu consulta hoy.</span> Revisamos tu caso
            con total confidencialidad. No estás solo. En las oficinas del Abogado Vernal,
            caminamos contigo desde el inicio hasta el final.
          </p>
        </div>

        <div className="relative mt-12 aspect-[1040/548] w-full design:absolute design:top-[370px] design:left-[440px] design:mt-0 design:aspect-auto design:h-[548px] design:w-[1040px]">
          {/* El recorte va en una capa aparte para que el trazo, que sale 2.5
              por fuera del borde, no se corte. */}
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[31px] bg-[#D9D9D9]">
            <Image
              src="/images/equipo/compromiso-video.webp"
              alt=""
              width={1500}
              height={842}
              sizes="(min-width: 1280px) 1040px, 100vw"
              className="absolute inset-0 h-full w-full object-cover design:top-[-16px] design:left-0 design:h-[581px] design:w-[1040px] design:max-w-none design:object-fill"
            />
            <div className="absolute inset-0 bg-[linear-gradient(358.73deg,#000000_14.83%,#05050500_78.16%)]" />
          </div>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible design:block"
            viewBox="0 0 1040 548"
          >
            <rect
              x="0"
              y="0"
              width="1040"
              height="548"
              rx="31"
              fill="none"
              stroke="#172339"
              strokeWidth="5"
            />
          </svg>

          <span
            aria-hidden
            className="absolute hidden text-[154px] leading-[215.6px] font-bold whitespace-nowrap text-white/10 uppercase design:top-[327px] design:left-[84px] design:block"
          >
            Aprobada
          </span>

          {/* Fuera del lienzo de 1920 la tarjeta es mucho más baja y las
              posiciones del archivo se pisarían: ahí el contenido se apila. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 design:block design:gap-0 design:px-0">
            <button
              type="button"
              aria-label="Ver el testimonio"
              className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/40 transition-transform hover:scale-105 sm:h-[76px] sm:w-[76px] design:absolute design:top-[237px] design:left-[516px] design:h-[97px] design:w-[97px] design:-translate-x-1/2 design:-translate-y-1/2"
            >
              <span
                aria-hidden
                className="ml-[4px] border-t-[10px] border-b-[10px] border-l-[17px] border-t-transparent border-b-transparent border-l-[#172339]/70 sm:ml-[6px] sm:border-t-[14px] sm:border-b-[14px] sm:border-l-[24px] design:border-t-[19px] design:border-b-[19px] design:border-l-[33px]"
              />
            </button>

            <VistoBueno className="absolute hidden design:top-[300px] design:left-[221px] design:block design:h-[55px] design:w-[55px]" />

            <p className="text-center text-[22px] leading-[26px] font-semibold uppercase sm:text-[34px] sm:leading-[38px] design:absolute design:top-[298px] design:left-1/2 design:w-full design:-translate-x-1/2 design:text-[55px] design:leading-[57px]">
              <span className="text-white design:block">Este momento </span>
              <span className="text-vernal-accent design:block">lo cambia todo</span>
            </p>

            <p className="text-vernal-accent text-center text-[15px] leading-[19px] font-light sm:text-[18px] sm:leading-[22px] design:absolute design:top-[435px] design:left-1/2 design:w-full design:-translate-x-1/2 design:text-[30px] design:leading-[31px]">
              Visa U Aprobada
            </p>
          </div>

          <span className="absolute hidden design:top-[453.7px] design:left-[46.7px] design:block design:h-[58px] design:w-[83px] [&>div]:!h-full [&>div]:!w-full">
            <Logo />
          </span>

          <span className="text-vernal-accent absolute hidden text-[20px] leading-[21px] font-light design:top-[482.5px] design:left-[856px] design:block">
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
    <svg viewBox="0 0 55 55" fill="none" aria-hidden className={className}>
      <circle cx="27.5" cy="27.5" r="27.5" fill="#ffffff" />
      <path
        d="M16 28 24 35.5 39 20"
        stroke="#0F0F10"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
