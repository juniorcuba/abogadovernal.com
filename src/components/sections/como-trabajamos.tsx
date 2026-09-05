import Image from "next/image";
import { offices } from "@/lib/site";

/**
 * "Cómo es nuestro trabajo" — nodos del rango y=4746..5414 de la frame 1:2.
 * Incluye también el bloque "5 SEDES" y las cinco direcciones: en el archivo van
 * dentro de esta misma sección, no en la siguiente.
 * Coordenadas relativas al inicio de la sección (y absoluta − 4746).
 *
 *   fondo    59:41   1923×668, degradado azul en diagonal
 *   mapa             imagen del mapa de Texas, a la izquierda
 *   marcadores 104:78 x324 y151 · 104:75 x416 y115 · 104:72 x458 y287 ·
 *              104:69 x405 y364 · 83:111 x626 y251, todos de 36.46×36.46
 *   título   59:42   x1021 y84  657×134  Poppins 600 64px lh1.04 UPPER, blanco
 *   cuerpo   59:43   x1021 y239 580×189  Poppins 400 16px lh1.04 justificado
 *   "5 SEDES" 83:104 x172 y416 684×183   ~176px, blanco
 *   subtítulo 83:105 x189 y590 560×47    ~45px
 *   sedes    97:29   x944 y462 798×108   5 columnas de 130, separadores de 3px
 *                    ciudad en #08b6ff, dirección blanca, 16px lh1.04
 *
 * PENDIENTE (la API de Figma sigue en 429): los handles exactos del degradado del
 * fondo —el ángulo de 129° está estimado midiendo el render, no leído del archivo—
 * el modo de fusión del mapa, y los SVG reales de los marcadores, que aquí van
 * aproximados en CSS.
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
    <section
      className="relative overflow-hidden design:h-[668px]"
      style={{
        backgroundImage:
          "linear-gradient(129deg, #0696d6 0%, #013451 45%, #013451 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[668px] design:p-0">
        {/* Mapa de Texas. Escala y posición DEDUCIDAS, no leídas del archivo: la
            separación Fort Worth→Houston entre mis marcadores (302px) frente a la
            del mapa original (~413px) da un factor de 0.73, y de ahí el desplazamiento.
            Las posiciones de las etiquetas en el original se midieron a ojo, así que
            esto tiene un margen de ±20px. Confirmar con la caja del nodo cuando la
            API de Figma vuelva a responder. */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-auto h-[300px] w-full max-w-[560px] design:absolute design:top-[10px] design:left-[-137px] design:mx-0 design:h-[561px] design:w-[1029px] design:max-w-none"
        >
          <Image
            src="/images/trabajo/mapa-texas.webp"
            alt=""
            fill
            sizes="1029px"
            className="object-contain opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Marcadores: van en coordenadas exactas del archivo, relativas a la sección. */}
        {marcadores.map((m) => (
          <span
            key={`${m.left}-${m.top}`}
            aria-hidden
            className="absolute hidden h-[36px] w-[36px] items-center justify-center rounded-full border-[5px] border-[#3ee66b] bg-[#0b3b2a] design:flex"
            style={{
              left: m.left,
              top: m.top,
              boxShadow: "0 0 26px 9px rgb(62 230 107 / 0.55)",
            }}
          >
            <span className="h-[10px] w-[10px] rounded-full bg-[#3ee66b]" />
          </span>
        ))}

        <h2 className="mt-10 text-[38px] leading-[1.04] font-semibold text-white uppercase sm:text-[48px] design:absolute design:top-[84px] design:left-[1021px] design:mt-0 design:w-[657px] design:text-[64px]">
          Cómo es
          <br />
          nuestro trabajo
        </h2>

        <p className="mt-6 max-w-[580px] text-[16px] leading-[1.04] whitespace-pre-line text-justify text-white design:absolute design:top-[239px] design:left-[1021px] design:mt-0 design:w-[580px]">
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

        <p className="mt-10 text-center text-[72px] leading-[1.04] font-semibold text-white uppercase design:absolute design:top-[416px] design:left-[172px] design:mt-0 design:w-[684px] design:text-left design:text-[176px]">
          5 sedes
        </p>
        <p className="text-center text-[20px] leading-[1.04] font-semibold text-white uppercase design:absolute design:top-[590px] design:left-[189px] design:w-[560px] design:text-left design:text-[45px]">
          operando en el estado
        </p>

        {/* Cinco columnas de 130 con paso de 167; los separadores de 3px caen a
            17px del final de cada columna (x1091, 1258, 1425, 1592 en el archivo). */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 design:absolute design:top-[462px] design:left-[944px] design:mt-0 design:block design:h-[108px] design:w-[798px]">
          {offices.map((office, i) => (
            <li
              key={office.city}
              className="text-[16px] leading-[1.04] text-white design:absolute design:top-[17px] design:w-[130px]"
              style={{ left: i * 167 }}
            >
              <span className="text-vernal-accent block font-bold">{office.city}</span>
              {office.address}
            </li>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <li
              key={`sep-${i}`}
              aria-hidden
              className="hidden bg-white design:absolute design:top-0 design:block design:h-[108px] design:w-[3px]"
              style={{ left: 147 + i * 167 }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
