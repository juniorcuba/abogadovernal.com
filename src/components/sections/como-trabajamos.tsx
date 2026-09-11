import Image from "next/image";
import { offices } from "@/lib/site";

/**
 * "Cómo es nuestro trabajo" — nodos del rango y=4746..5414 de la frame 1:2.
 * Incluye también el bloque "5 SEDES" y las cinco direcciones: en el archivo van
 * dentro de esta misma sección, no en la siguiente.
 * Coordenadas relativas al inicio de la sección (y absoluta − 4746).
 *
 *   fondo    59:41   tres capas apiladas, todas del export SVG:
 *                      1. cian plano #08B6FF
 *                      2. mapa 1437×784 en (−445, −102), opacidad 0.92, multiply
 *                      3. degradado 112.07deg de #057EBC transparente al 4.70%
 *                         hasta #023451 opaco al 46.06%  ← esto oscurece la derecha
 *   marcadores 104:78 x324 y151 · 104:75 x416 y115 · 104:72 x458 y287 ·
 *              104:69 x405 y364 · 83:111 x626 y251, todos de 36.46×36.46
 *   título   59:42   x1021 y84  657×134  Poppins 600 64px lh1.04 UPPER, blanco
 *   cuerpo   59:43   x1021 y239 580×189  Poppins 400 16px lh1.04 justificado
 *   "5 SEDES" 83:104 x172 y416 684×183   ~176px, blanco
 *   subtítulo 83:105 x189 y590 560×47    ~45px
 *             las DOS líneas llevan la "Vernal Shadow 1" como sombra de texto:
 *             un único filtro del export las cubre (x186 y5186, 660×189)
 *   sedes    97:29   x944 y462 798×108   5 columnas de 130, separadores de 3px
 *                    ciudad en #08b6ff, dirección blanca, 16px lh1.04
 *
 * Fondo, mapa y sus transformaciones salen del export SVG de la frame. Antes estaban
 * estimados y estaban mal: había deducido un degradado de 129° que no existe, y el
 * mapa a 1029×561 cuando en realidad va a 1437×784.
 *
 *   sedes    97:29   las direcciones van CENTRADAS en su columna, no a la izquierda
 *
 * Lienzo móvil (y=7103..8644, 1541 de alto), todo apilado en una columna:
 *   mapa      el mismo archivo, 1007×549 en (−464, −55), multiply al 92%
 *   degradado 182.63deg, del #023451 transparente al 9.66% a opaco al 32.45%
 *   "5 SEDES" 83px centrado en y345; subtítulo 35px en y431. La sombra NO es la
 *             Vernal 1: baja 36 en vez de 18 y va al 84% de opacidad
 *   título    x48 y560, tres líneas de 48
 *   cuerpo    x48 y724, caja de 303 justificada
 *   sedes     centradas en x201, separadas por rayas de 228×3
 *
 * El render de Figma de hoy trae otro mapa en esta franja (relieve sin
 * marcadores). El export SVG que se usa aquí es el de los marcadores, igual que
 * en escritorio: hay que confirmarlo con el diseñador.
 */

/**
 * Sedes en el móvil. Los cortes de las direcciones no salen de un ancho común
 * (Fort Worth necesita menos de 233 y Austin al menos 237), así que cada una
 * lleva el suyo, acotado con sus propios cortes y centrado en x201.
 */
const sedesMovil = [
  { top: 1036, ancho: 220 },
  { top: 1132, ancho: 215 },
  { top: 1228, ancho: 230 },
  { top: 1321, ancho: 260 },
  { top: 1421, ancho: 250 },
];
const separadoresMovil = [1108, 1204, 1296, 1397];

// `m*` son las del lienzo móvil: esquina de una caja de 27.65 (anillo de radio
// 12.32 con trazo de 3), sacadas de los centros del export.
const marcadores = [
  { left: 324, top: 151, mleft: 70.0, mtop: 132.3 },
  { left: 416, top: 115, mleft: 139.77, mtop: 105.0 },
  { left: 458, top: 287, mleft: 171.61, mtop: 235.43 },
  { left: 405, top: 364, mleft: 131.42, mtop: 293.82 },
  { left: 626, top: 251, mleft: 299.0, mtop: 208.13 },
];

/**
 * Resplandor de los marcadores, de los filtros del export SVG (filter2..filter11).
 * Cada marcador lleva dos capas: el anillo y el punto, cada una con su sombra.
 *
 *   feMorphology dilate 11  → extensión 11px
 *   feGaussianBlur σ 9.55   → desenfoque 19.1px (el radio CSS es 2σ)
 *   feOffset dx 3 dy -2     → desplazamiento
 *
 * Antes esto era un `0 0 26px 9px` verde a media opacidad puesto a ojo, y en el
 * render el marcador salía apagado al lado del archivo.
 */
const BRILLO_ANILLO = "3px -2px 19.1px 11px rgb(39 255 161)";
const BRILLO_PUNTO = "3px -2px 19.1px 11px rgb(21 255 154)";

export function ComoTrabajamos() {
  return (
    <section className="relative overflow-hidden bg-[#023451] movil:h-[1541px] movil:bg-vernal-accent design:bg-vernal-accent design:h-[668px]">
      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[1541px] movil:p-0 design:h-[668px] design:p-0">
        {/* Mapa de Texas: multiply sobre el cian. El original tiene fondo blanco y
            el multiply lo hace desaparecer dejando solo el relieve. */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-auto hidden h-[300px] w-full max-w-[560px] movil:absolute movil:top-[-55px] movil:left-[-464px] movil:mx-0 movil:block movil:h-[549px] movil:w-[1007px] movil:max-w-none design:absolute design:block design:top-[-102px] design:left-[-445px] design:mx-0 design:h-[784px] design:w-[1437px] design:max-w-none"
        >
          <Image
            src="/images/trabajo/mapa-texas.webp"
            alt=""
            fill
            sizes="1437px"
            className="object-contain opacity-90 mix-blend-multiply movil:opacity-[0.92]"
          />
        </div>

        {/* Capa 3: el degradado que apaga la mitad derecha. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(112.07deg,#057EBC00_4.70%,#023451_46.06%)] movil:block movil:bg-[linear-gradient(182.63deg,#02345100_9.66%,#023451_32.45%)] design:block"
        />

        {/* Marcadores: van en coordenadas exactas del archivo, relativas a la sección. */}
        {marcadores.map((m) => (
          <span
            key={`${m.left}-${m.top}`}
            aria-hidden
            className="absolute hidden h-[36.46px] w-[36.46px] movil:top-[var(--my)] movil:left-[var(--mx)] movil:block movil:h-[27.65px] movil:w-[27.65px] design:top-[var(--y)] design:left-[var(--x)] design:block"
            style={
              {
                "--x": `${m.left}px`,
                "--y": `${m.top}px`,
                "--mx": `${m.mleft}px`,
                "--my": `${m.mtop}px`,
              } as React.CSSProperties
            }
          >
            {/* El punto va ANTES del anillo aunque quede dentro: su resplandor se
                pinta encima de lo que ya haya, así que si fuera hijo del anillo le
                lavaría el borde y taparía el hueco entre los dos. */}
            <span
              className="bg-vernal-green absolute inset-[8.63px] rounded-full movil:inset-[6.53px]"
              style={{ boxShadow: BRILLO_PUNTO }}
            />
            <span
              className="border-vernal-green absolute inset-0 rounded-full border-[5px] movil:border-[3px]"
              style={{ boxShadow: BRILLO_ANILLO }}
            />
          </span>
        ))}

        <h2 className="mt-10 text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] movil:absolute movil:top-[560px] movil:left-[48px] movil:mt-0 movil:w-[240px] movil:leading-[48px] movil:text-[46px] design:absolute design:top-[84px] design:left-[1021px] design:mt-0 design:w-[657px] design:leading-[67px] design:text-[64px]">
          Cómo es
          <br />
          nuestro trabajo
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line design:text-justify text-white movil:absolute movil:top-[724px] movil:left-[48px] movil:mt-0 movil:w-[303px] movil:max-w-none movil:text-justify design:absolute design:top-[239px] design:left-[1021px] design:mt-0 design:w-[580px]">
          {"El equipo de cada oficina se pondrá en contacto contigo para agendar la fecha y hora de tu cita. "}
          <span className="text-vernal-accent">
            {"Durante tu consulta, serás atendido por el equipo del "}
            <span className="font-bold">Abogado Vernal</span>
            {", que puede incluir paralegales capacitados,"}
          </span>
          {" quienes te ayudarán a reunir toda la información necesaria sobre tu caso, o directamente por uno de los abogados de la firma.\n\nSi el "}
          <span className="font-bold">Abogado Vernal</span>
          {" se encuentra de visita en la oficina que corresponde, también podrás ser atendido directamente por él, con una cita previamente agendada."}
        </p>

        {/* La sombra va en el envoltorio, no en cada línea: en el archivo un único
            efecto cubre las dos (x186 y5186, 660×189), o sea que se desenfoca la
            silueta de las dos juntas una sola vez. Con una sombra por línea, las
            dos se suman en el hueco de en medio y sale más oscuro de la cuenta.

            El envoltorio ocupa toda la sección en modo diseño porque un elemento
            con `filter` pasa a ser el bloque contenedor de sus hijos absolutos:
            así las coordenadas de las dos líneas siguen siendo las del archivo.

            Queda un resto: en la franja entre las dos líneas sale ~14/255 más
            oscuro que el archivo. En una columna donde solo influye "5 SEDES" la
            caída coincide al 1-2, así que el desajuste está en cómo suma el
            archivo la sombra del subtítulo. No se aprecia a simple vista. */}
        <div className="drop-shadow-vernal-1 movil:absolute movil:inset-0 movil:drop-shadow-[8px_36px_18.55px_rgb(0_0_0/0.84)] design:absolute design:inset-0">
          <p className="mt-10 text-center text-[72px] leading-[75px] font-semibold text-white uppercase movil:absolute movil:top-[345px] movil:left-0 movil:mt-0 movil:w-[402px] movil:leading-[86px] movil:text-[83px] design:absolute design:top-[416px] design:left-[172px] design:mt-0 design:w-[684px] design:text-left design:leading-[183px] design:text-[176px]">
            5 sedes
          </p>
          <p className="text-center text-[20px] leading-[21px] font-semibold text-white uppercase movil:absolute movil:top-[431px] movil:left-[66px] movil:w-[270px] movil:leading-[36px] movil:text-[35px] design:absolute design:top-[590px] design:left-[189px] design:w-[560px] design:text-left design:leading-[47px] design:text-[45px]">
            operando en el estado
          </p>
        </div>

        {/* Cinco columnas de 130 con paso de 167; los separadores de 3px caen a
            17px del final de cada columna (x1091, 1258, 1425, 1592 en el archivo). */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 movil:absolute movil:inset-0 movil:mt-0 movil:block design:absolute design:top-[462px] design:left-[944px] design:mt-0 design:block design:h-[108px] design:w-[798px]">
          {offices.map((office, i) => (
            <li
              key={office.city}
              className="text-[16px] leading-[17px] font-light text-white movil:absolute movil:top-[var(--mt)] movil:left-[var(--ml)] movil:w-[var(--mw)] movil:text-center design:absolute design:top-[17px] design:left-[var(--x)] design:w-[130px] design:text-center"
              style={
                {
                  "--x": `${i * 167}px`,
                  "--mt": `${sedesMovil[i].top}px`,
                  "--mw": `${sedesMovil[i].ancho}px`,
                  "--ml": `${201 - sedesMovil[i].ancho / 2}px`,
                } as React.CSSProperties
              }
            >
              <span className="text-vernal-accent block font-bold">{office.city}</span>
              {office.address}
            </li>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <li
              key={`sep-${i}`}
              aria-hidden
              className="hidden bg-white movil:absolute movil:top-[var(--my)] movil:left-[87px] movil:block movil:h-[3px] movil:w-[228px] design:absolute design:top-0 design:left-[var(--x)] design:block design:h-[108px] design:w-[3px]"
              style={
                {
                  "--x": `${147 + i * 167}px`,
                  "--my": `${separadoresMovil[i]}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
