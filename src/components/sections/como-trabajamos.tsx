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
 *   sedes    97:29   x944 y462 798×108   5 columnas de 130, separadores de 3px
 *                    ciudad en #08b6ff, dirección blanca, 16px lh1.04
 *
 * Fondo, mapa y sus transformaciones salen del export SVG de la frame. Antes estaban
 * estimados y estaban mal: había deducido un degradado de 129° que no existe, y el
 * mapa a 1029×561 cuando en realidad va a 1437×784.
 *
 * Los marcadores siguen aproximados en CSS: el SVG los trae como paths y no he
 * extraído sus vectores.
 */

const marcadores = [
  { left: 324, top: 151 },
  { left: 416, top: 115 },
  { left: 458, top: 287 },
  { left: 405, top: 364 },
  { left: 626, top: 251 },
];

export function ComoTrabajamos() {
  return (
    <section className="relative overflow-hidden bg-[#023451] design:bg-vernal-accent design:h-[668px]">
      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[668px] design:p-0">
        {/* Mapa de Texas: multiply sobre el cian. El original tiene fondo blanco y
            el multiply lo hace desaparecer dejando solo el relieve. */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-auto hidden h-[300px] w-full max-w-[560px] design:absolute design:block design:top-[-102px] design:left-[-445px] design:mx-0 design:h-[784px] design:w-[1437px] design:max-w-none"
        >
          <Image
            src="/images/trabajo/mapa-texas.webp"
            alt=""
            fill
            sizes="1437px"
            className="object-contain opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Capa 3: el degradado que apaga la mitad derecha. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden design:block"
          style={{
            backgroundImage:
              "linear-gradient(112.07deg, rgb(5 126 188 / 0) 4.70%, #023451 46.06%)",
          }}
        />

        {/* Marcadores: van en coordenadas exactas del archivo, relativas a la sección. */}
        {marcadores.map((m) => (
          <span
            key={`${m.left}-${m.top}`}
            aria-hidden
            className="absolute hidden h-[36px] w-[36px] items-center justify-center rounded-full border-[5px] border-[#3ee66b] bg-[#0b3b2a] design:top-[var(--y)] design:left-[var(--x)] design:flex"
            style={
              {
                "--x": `${m.left}px`,
                "--y": `${m.top}px`,
                boxShadow: "0 0 26px 9px rgb(62 230 107 / 0.55)",
              } as React.CSSProperties
            }
          >
            <span className="h-[10px] w-[10px] rounded-full bg-[#3ee66b]" />
          </span>
        ))}

        <h2 className="mt-10 text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] design:absolute design:top-[84px] design:left-[1021px] design:mt-0 design:w-[657px] design:leading-[67px] design:text-[64px]">
          Cómo es
          <br />
          nuestro trabajo
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line design:text-justify text-white design:absolute design:top-[239px] design:left-[1021px] design:mt-0 design:w-[580px]">
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

        <p className="mt-10 text-center text-[72px] leading-[75px] font-semibold text-white uppercase design:absolute design:top-[416px] design:left-[172px] design:mt-0 design:w-[684px] design:text-left design:leading-[183px] design:text-[176px]">
          5 sedes
        </p>
        <p className="text-center text-[20px] leading-[21px] font-semibold text-white uppercase design:absolute design:top-[590px] design:left-[189px] design:w-[560px] design:text-left design:leading-[47px] design:text-[45px]">
          operando en el estado
        </p>

        {/* Cinco columnas de 130 con paso de 167; los separadores de 3px caen a
            17px del final de cada columna (x1091, 1258, 1425, 1592 en el archivo). */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 design:absolute design:top-[462px] design:left-[944px] design:mt-0 design:block design:h-[108px] design:w-[798px]">
          {offices.map((office, i) => (
            <li
              key={office.city}
              className="text-[16px] leading-[17px] font-light text-white design:absolute design:top-[17px] design:left-[var(--x)] design:w-[130px]"
              style={{ "--x": `${i * 167}px` } as React.CSSProperties}
            >
              <span className="text-vernal-accent block font-bold">{office.city}</span>
              {office.address}
            </li>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <li
              key={`sep-${i}`}
              aria-hidden
              className="hidden bg-white design:absolute design:top-0 design:left-[var(--x)] design:block design:h-[108px] design:w-[3px]"
              style={{ "--x": `${147 + i * 167}px` } as React.CSSProperties}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
