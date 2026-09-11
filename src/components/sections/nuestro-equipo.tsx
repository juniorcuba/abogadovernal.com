"use client";

// Cliente porque su carrusel necesita estado. Un componente de servidor no
// puede pasar funciones de render a uno de cliente.
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Carrusel } from "@/components/ui/carrusel";

/**
 * "Nuestro equipo" — nodos del rango y=2559..3269 de la frame 1:2.
 * Coordenadas relativas al inicio de la sección (y absoluta − 2559).
 *
 * El fondo son CINCO capas apiladas, todas del export SVG de la frame:
 *   1. linear-gradient(80.23deg, #172339 28.78%, #0F0F0F 43.26%)
 *   2. textura 1800×982 en (−247, +120), opacidad 0.12
 *   3. Estatua de la Libertad 1426×2535 en (+100, −587), opacidad 0.31, hard-light
 *   4. linear-gradient(264.10deg, #0F0F10 29.89%, #172339 transparente 70.20%)
 *   5. linear-gradient(80.13deg, #172339 11.03%, negro transparente 33.61%)
 *
 *   barra   95:3     x215 y130  12×443  #08b6ff
 *   título  17:3     x279 y122  309×134 Poppins 600 64px lh1.04 UPPER, blanco
 *   cuerpo  17:4     x279 y286  580×287 Poppins 400 16px, con el nombre en #08b6ff
 *   botón   51:8     x279 y521  277×52
 *   claim   104:85   x1041 y141 530×37  Poppins 300 36px
 *   fotos            x915 / x1255.6 / x1596.3, y322, 325×387
 *   fundido          x1484 y211 437×498, apaga el borde derecho del carrusel
 *
 * El emparejamiento foto↔nombre viene de la posición X en el archivo, no de
 * reconocer caras: no se debe adivinar la identidad de personas reales.
 *
 * En el lienzo móvil (y=3465..4582) el fondo lleva las mismas dos fotos —la
 * bandera y la estatua, comprobado por proporción de origen— pero con otros
 * degradados, otra opacidad y otro encuadre. Del carrusel solo se ve UNA ranura:
 * las otras dos se ocultan, así que las flechas siguen rotando los datos igual.
 * No están ni la barra cian ni el claim "Latinos luchando por Latinos...".
 *
 *   título  x41 y59    46/600 blanco, dos líneas de 48
 *   cuerpo  x41 y186   16/400 justificado, caja de 315
 *   botón   x41 y559   277×52
 *   nombre  centrado y671   18/600 cian
 *   cargo   centrado y694   12/600
 *   foto    x45 y744   313×373
 *   flechas 55×55 en y895, x18 y x323
 */

/** Ranuras del archivo; se quedan fijas y rota quién cae en cada una. */
const ranuras = [{ left: 915 }, { left: 1255.6 }, { left: 1596.3 }];

const equipo = [
  {
    nombre: "Vernal Farnum",
    cargo: "Abogado fundador",
    foto: "/images/equipo/vernal-farnum.webp",
    // El cargo del fundador va en verde; el resto en blanco.
    cargoClase: "text-[#27ffa2]",
  },
  {
    nombre: "Marysol Rogel",
    cargo: "Asistente legal",
    foto: "/images/equipo/marysol-rogel.webp",
    cargoClase: "text-white",
  },
  {
    nombre: "Katiuska Rodriguez",
    cargo: "Asistente legal en tribunales",
    foto: "/images/equipo/katiuska-rodriguez.webp",
    cargoClase: "text-white",
  },
];

export function NuestroEquipo() {
  return (
    <section
      className="relative overflow-hidden movil:h-[1117px] design:h-[710px]"
      style={{
        backgroundImage:
          "linear-gradient(80.23deg, #172339 28.78%, #0F0F0F 43.26%)",
      }}
    >
      {/* El degradado de base cambia de ángulo entre lienzos y no se puede meter
          en un `style`, que no entiende de variantes: va como capa opaca encima. */}
      <div
        aria-hidden
        className="pointer-events-none hidden movil:absolute movil:inset-0 movil:block"
        style={{
          backgroundImage:
            "linear-gradient(88.69deg, #172339 28.78%, #0F0F0F 43.26%)",
        }}
      />
      <Image
        src="/images/equipo/fondo-textura.webp"
        alt=""
        aria-hidden
        width={1800}
        height={982}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] movil:inset-auto movil:top-[527px] movil:left-[-349px] movil:h-[635px] movil:w-[1164px] movil:max-w-none movil:object-fill movil:opacity-[0.26] movil:mix-blend-soft-light design:inset-auto design:top-[120px] design:left-[-247px] design:h-[982px] design:w-[1800px]"
      />
      <Image
        src="/images/equipo/fondo-libertad.webp"
        alt=""
        aria-hidden
        width={1426}
        height={2535}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.31] mix-blend-hard-light movil:inset-auto movil:top-[356px] movil:left-[-37px] movil:h-[1176px] movil:w-[661px] movil:max-w-none movil:object-fill movil:opacity-[0.34] design:inset-auto design:top-[-587px] design:left-[100px] design:h-[2535px] design:w-[1426px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 movil:hidden"
        style={{
          backgroundImage:
            "linear-gradient(264.10deg, #0F0F10 29.89%, rgb(23 35 57 / 0) 70.20%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 movil:hidden"
        style={{
          backgroundImage:
            "linear-gradient(80.13deg, #172339 11.03%, rgb(0 0 0 / 0) 33.61%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none hidden movil:absolute movil:inset-0 movil:block"
        style={{
          backgroundImage:
            "linear-gradient(354.54deg, #0F0F10 13.80%, rgb(23 35 57 / 0) 33.35%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none hidden movil:absolute movil:inset-0 movil:block"
        style={{
          backgroundImage:
            "linear-gradient(190.40deg, #172339 46.51%, rgb(0 0 0 / 0) 63.08%)",
        }}
      />

      <div className="relative mx-auto max-w-[1040px] design:max-w-[1920px] px-6 py-16 lg:px-12 movil:h-[1117px] movil:p-0 design:h-[710px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-accent hidden design:absolute design:top-[130px] design:left-[215px] design:block design:h-[443px] design:w-[12px]"
        />

        <h2 className="text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] movil:absolute movil:top-[54px] movil:left-[41px] movil:w-[230px] movil:leading-[48px] movil:text-[46px] design:absolute design:top-[122px] design:left-[279px] design:w-[309px] design:leading-[67px] design:text-[64px]">
          Nuestro
          <br />
          equipo
        </h2>

        <p className="mt-8 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line design:text-justify text-white movil:absolute movil:top-[189px] movil:left-[41px] movil:mt-0 movil:w-[315px] movil:max-w-none movil:text-justify design:absolute design:top-[286px] design:left-[279px] design:mt-0 design:w-[580px]">
          {"En Texas, Estados Unidos, la oficina del "}
          <span className="text-vernal-accent font-bold">
            Abogado Vernal Farnum Mejía
          </span>
          {" se dedica a defender los derechos de los inmigrantes. Su compromiso es simple: proteger los derechos de cada cliente y acompañarlo hasta que logre un estatus legal en este país.\n\nA lo largo de su trayectoria, la firma ha acompañado a más de 15,000 personas en la obtención de su permiso de trabajo, su residencia, su ciudadanía y mucho más, ayudando a cerca de 10,000 familias a reunirse o permanecer juntas en Estados Unidos. Lo hace porque el equipo comparte esa misma experiencia migratoria: para ellos, cada caso no es solo un expediente, es una historia que entienden de cerca."}
        </p>

        <ButtonLink
          href="/nosotros"
          className="mt-8 w-full sm:w-[277px] movil:absolute movil:top-[559px] movil:left-[41px] movil:mt-0 movil:w-[277px] design:absolute design:top-[521px] design:left-[279px] design:mt-0"
        >
          Conoce al equipo completo
        </ButtonLink>

        <p className="mt-12 text-[24px] leading-[25px] font-light text-white movil:hidden design:absolute design:top-[141px] design:left-[1041px] design:mt-0 design:w-[530px] design:leading-[37px] design:text-[36px]">
          Latinos luchando <span className="text-vernal-accent">por Latinos...</span>
        </p>

        {/* Carrusel del equipo. Las flechas van donde el archivo las coloca:
            55×55 en (899, 3026) y (1552, 3026) absolutos → y467 de la sección. */}
        <Carrusel
          items={equipo}
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:h-full movil:w-full design:absolute design:top-0 design:left-0 design:mt-0 design:block design:h-full design:w-full"
          controles={({ anterior, siguiente }) => (
            <>
              <button
                type="button"
                onClick={anterior}
                aria-label="Miembro anterior del equipo"
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 hidden h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[895px] movil:left-[18px] movil:flex movil:shadow-none design:absolute design:top-[467px] design:left-[899px] design:flex"
              >
                ←
              </button>
              <button
                type="button"
                onClick={siguiente}
                aria-label="Siguiente miembro del equipo"
                className="bg-vernal-accent text-vernal-navy shadow-vernal-1 z-20 hidden h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full text-[22px] transition-opacity hover:opacity-90 movil:absolute movil:top-[895px] movil:left-[323px] movil:flex movil:shadow-none design:absolute design:top-[467px] design:left-[1552px] design:flex"
              >
                →
              </button>
            </>
          )}
        >
          {(p, i, relevo) => (
            <li
              key={ranuras[i].left}
              /* El móvil enseña una sola ranura. Las otras dos se ocultan en vez
                 de no renderizarse: así las flechas siguen girando los mismos
                 datos y quien esté en la ranura 0 es quien se ve. */
              className={`design:absolute design:top-[253px] design:left-[var(--x)] design:w-[325px] ${
                i === 0
                  ? "movil:absolute movil:top-0 movil:left-0 movil:h-full movil:w-full"
                  : "movil:hidden"
              }`}
              style={{ "--x": `${ranuras[i].left}px` } as React.CSSProperties}
            >
              {/* La `key` con el relevo obliga a remontar en cada giro, que es lo
                  que vuelve a disparar la animación de entrada. Sin ella React
                  reutiliza el nodo y el cambio de abogado es un salto seco. */}
              <div key={relevo} className="animate-vernal-relevo">
                <p className="text-vernal-accent text-center text-[18px] leading-[19px] font-semibold uppercase movil:absolute movil:top-[674px] movil:left-0 movil:w-[402px]">
                  {p.nombre}
                </p>
                <p
                  className={`text-center text-[12px] leading-[12px] font-semibold uppercase movil:absolute movil:top-[697px] movil:left-0 movil:w-[402px] ${p.cargoClase}`}
                >
                  {p.cargo}
                </p>
                <Image
                  src={p.foto}
                  alt={`${p.nombre}, ${p.cargo}`}
                  width={325}
                  height={387}
                  className="mt-[47px] h-[387px] w-[325px] object-contain movil:absolute movil:top-[744px] movil:left-[45px] movil:mt-0 movil:h-[373px] movil:w-[313px]"
                />
              </div>
            </li>
          )}
        </Carrusel>

        {/* Fundido del borde derecho del carrusel. */}
        <div
          aria-hidden
          className="pointer-events-none hidden design:absolute design:top-[211px] design:left-[1484px] design:block design:h-[498px] design:w-[437px]"
          style={{
            backgroundImage:
              "linear-gradient(269.97deg, rgb(15 15 16 / 0.84) 31.71%, rgb(14 14 16 / 0) 87.52%)",
          }}
        />
        {/* El mismo recurso en móvil, pero apagando la esquina de abajo a la
            derecha en vez del lateral. */}
        <div
          aria-hidden
          className="pointer-events-none hidden movil:absolute movil:top-[649px] movil:left-[207px] movil:block movil:h-[468px] movil:w-[194px]"
          style={{
            backgroundImage:
              "linear-gradient(289.18deg, rgb(15 15 16 / 0.84) 21.93%, rgb(14 14 16 / 0) 43.89%)",
          }}
        />
      </div>
    </section>
  );
}
