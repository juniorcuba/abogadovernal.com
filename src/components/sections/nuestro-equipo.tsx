import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

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
 */

const equipo = [
  {
    nombre: "Vernal Farnum",
    cargo: "Abogado fundador",
    foto: "/images/equipo/vernal-farnum.webp",
    // El cargo del fundador va en verde; el resto en blanco.
    cargoClase: "text-[#27ffa2]",
    left: 915,
  },
  {
    nombre: "Marysol Rogel",
    cargo: "Asistente legal",
    foto: "/images/equipo/marysol-rogel.webp",
    cargoClase: "text-white",
    left: 1255.6,
  },
  {
    nombre: "Katiuska Rodriguez",
    cargo: "Asistente legal en tribunales",
    foto: "/images/equipo/katiuska-rodriguez.webp",
    cargoClase: "text-white",
    left: 1596.3,
  },
];

export function NuestroEquipo() {
  return (
    <section
      className="relative overflow-hidden design:h-[710px]"
      style={{
        backgroundImage:
          "linear-gradient(80.23deg, #172339 28.78%, #0F0F0F 43.26%)",
      }}
    >
      <Image
        src="/images/equipo/fondo-textura.webp"
        alt=""
        aria-hidden
        width={1800}
        height={982}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] design:inset-auto design:top-[120px] design:left-[-247px] design:h-[982px] design:w-[1800px]"
      />
      <Image
        src="/images/equipo/fondo-libertad.webp"
        alt=""
        aria-hidden
        width={1426}
        height={2535}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.31] mix-blend-hard-light design:inset-auto design:top-[-587px] design:left-[100px] design:h-[2535px] design:w-[1426px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(264.10deg, #0F0F10 29.89%, rgb(23 35 57 / 0) 70.20%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(80.13deg, #172339 11.03%, rgb(0 0 0 / 0) 33.61%)",
        }}
      />

      <div className="relative mx-auto max-w-[1920px] px-6 py-16 lg:px-12 design:h-[710px] design:p-0">
        <div
          aria-hidden
          className="bg-vernal-accent hidden design:absolute design:top-[130px] design:left-[215px] design:block design:h-[443px] design:w-[12px]"
        />

        <h2 className="text-[38px] leading-[40px] font-semibold text-white uppercase sm:text-[48px] design:absolute design:top-[122px] design:left-[279px] design:w-[309px] design:leading-[67px] design:text-[64px]">
          Nuestro
          <br />
          equipo
        </h2>

        <p className="mt-8 max-w-[580px] text-[16px] leading-[17px] whitespace-pre-line text-justify text-white design:absolute design:top-[286px] design:left-[279px] design:mt-0 design:w-[580px]">
          {"En Texas, Estados Unidos, la oficina del "}
          <span className="text-vernal-accent font-bold">
            Abogado Vernal Farnum Mejía
          </span>
          {" se dedica a defender los derechos de los inmigrantes. Su compromiso es simple: proteger los derechos de cada cliente y acompañarlo hasta que logre un estatus legal en este país.\n\nA lo largo de su trayectoria, la firma ha acompañado a más de 15,000 personas en la obtención de su permiso de trabajo, su residencia, su ciudadanía y mucho más, ayudando a cerca de 10,000 familias a reunirse o permanecer juntas en Estados Unidos. Lo hace porque el equipo comparte esa misma experiencia migratoria: para ellos, cada caso no es solo un expediente, es una historia que entienden de cerca."}
        </p>

        <ButtonLink
          href="/nosotros"
          className="mt-8 w-full sm:w-[277px] design:absolute design:top-[521px] design:left-[279px] design:mt-0"
        >
          Conoce al equipo completo
        </ButtonLink>

        <p className="mt-12 text-[24px] leading-[25px] font-light text-white design:absolute design:top-[141px] design:left-[1041px] design:mt-0 design:w-[530px] design:leading-[37px] design:text-[36px]">
          Latinos luchando <span className="text-vernal-accent">por Latinos...</span>
        </p>

        {/* Carrusel del equipo */}
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 design:absolute design:top-0 design:left-0 design:mt-0 design:block design:h-full design:w-full">
          {equipo.map((p) => (
            <li
              key={p.nombre}
              className="design:absolute design:top-[253px] design:w-[325px]"
              style={{ left: p.left }}
            >
              <p className="text-vernal-accent text-center text-[18px] leading-[19px] font-semibold uppercase">
                {p.nombre}
              </p>
              <p
                className={`text-center text-[12px] leading-[12px] font-semibold uppercase ${p.cargoClase}`}
              >
                {p.cargo}
              </p>
              <Image
                src={p.foto}
                alt={`${p.nombre}, ${p.cargo}`}
                width={325}
                height={387}
                className="mt-[47px] h-[387px] w-[325px] object-contain"
              />
            </li>
          ))}
        </ul>

        {/* Fundido del borde derecho del carrusel. */}
        <div
          aria-hidden
          className="pointer-events-none hidden design:absolute design:top-[211px] design:left-[1484px] design:block design:h-[498px] design:w-[437px]"
          style={{
            backgroundImage:
              "linear-gradient(269.97deg, rgb(15 15 16 / 0.84) 31.71%, rgb(14 14 16 / 0) 87.52%)",
          }}
        />
      </div>
    </section>
  );
}
