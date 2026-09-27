import Image from "next/image";
import { preguntasFrecuentes } from "@/lib/preguntas";

/**
 * Cuerpo de /faqs — frame `770:625` de Figma, rango y=0..1738.
 *
 *   fondo    banda de 1923×1674 desde y128, VOLTEADA en horizontal
 *            (matrix(-1 0 0 1 1923 128) en el archivo): negro, la foto de la
 *            abogada al 18% (dibujada 2585×2052 en −662,−378) y
 *            linear-gradient(92.91°, negro 20.64% → transparente 69.50%).
 *            El volteo se aplica al contenedor, así que dentro las coordenadas
 *            son las del archivo (el ancho se recorta de 1923 a 1920, que es el
 *            lienzo). La banda acaba en 1802 y se mete 64px bajo el
 *            bloque "Agenda", cuyo banner tiene transparente esa franja.
 *   título   centrado, líneas base 256.9/323.9/390.9, Poppins 64/300; las dos
 *            primeras líneas en cian y las dos últimas en blanco
 *   entrada  x549 y448, caja de 820, 16/17 justificado
 *   lista    x240, 1441 de ancho, filas de 109 separadas por un trazo blanco;
 *            pregunta 24/300 a +38, "Ver respuesta" 20/500 a +1207 y el "+"
 *            41/300 a +1364
 *
 * La fila 6 del archivo mide 105 en vez de 109 y su contenido sube 4px: se
 * reproduce tal cual (ver `preguntasFrecuentes`).
 *
 * OJO: el archivo trae las preguntas y el botón, pero NINGUNA respuesta. Hasta
 * que el cliente las escriba, las filas no son desplegables: sería un botón que
 * no abre nada. En cuanto lleguen, esto pasa a acordeón.
 */

/** Alto de fila y desplazamiento del contenido, fila a fila, según el archivo. */
const FILAS = preguntasFrecuentes.map((p) => ({
  texto: p.texto,
  alto: p.alto ?? 109,
  arriba: p.arriba ?? 44,
}));

export function FaqsPreguntas() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-black design:h-[1738px] design:overflow-visible">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:top-[128px] design:h-[1674px] design:w-[1920px] design:[transform:scaleX(-1)]"
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          priority
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] design:top-[-378px] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(92.91deg,#000000_20.64%,#00000000_69.50%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1738px] design:max-w-[1920px] design:p-0">
        <h1 className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] design:absolute design:top-[201px] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]">
          <span className="text-vernal-accent">
            Las dudas que más <br className="hidden design:inline" />
            escuchamos,
          </span>{" "}
          <span className="text-white">
            respondidas <br className="hidden design:inline" />
            con claridad.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify design:absolute design:top-[448px] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]">
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ul className="mt-10 border-b border-white design:absolute design:top-[580px] design:left-[240px] design:mt-0 design:w-[1441px]">
          {FILAS.map((f) => (
            <li
              key={f.texto}
              className="relative flex flex-col gap-y-2 border-t border-white py-5 sm:flex-row sm:items-center sm:justify-between design:block design:h-[var(--alto)] design:py-0"
              style={{ "--alto": `${f.alto}px` } as React.CSSProperties}
            >
              <span
                className="text-[20px] leading-[24px] font-light text-white design:absolute design:top-[var(--arriba)] design:left-[38px] design:text-[24px] design:leading-[25px]"
                style={{ "--arriba": `${f.arriba}px` } as React.CSSProperties}
              >
                {f.texto}
              </span>
              {/* Sin respuestas en el archivo: esto es el rótulo del diseño, no un
                  enlace, para no ofrecer algo que no abre. */}
              <span
                aria-hidden
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium design:contents design:text-[20px]"
                style={
                  {
                    "--arriba": `${f.arriba}px`,
                    "--mas": `${f.arriba - 10.8}px`,
                  } as React.CSSProperties
                }
              >
                <span className="design:absolute design:top-[var(--arriba)] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span className="text-[34px] leading-none font-light design:absolute design:top-[var(--mas)] design:left-[1364px] design:text-[41px] design:leading-[42px]">
                  +
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
