import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import type { PreguntaFrecuente } from "@/lib/preguntas";

/**
 * Banda de preguntas frecuentes. Aparece en /faqs (con las diez), y al cierre de
 * /testimoniales y /blog (con las cinco primeras). Siempre es la misma foto al
 * 18% sobre negro, VOLTEADA en horizontal, con su degradado, el titular
 * centrado, la entradilla y las filas de 109 separadas por un trazo blanco.
 *
 * Cambian de una página a otra el alto, la y de la foto, el ángulo del
 * degradado y las posiciones; por eso van por props.
 *
 * Aquí las filas NO se despliegan: estas bandas tienen el alto cerrado en el
 * archivo y abrir una las descuadraría. Cada fila lleva a /faqs, que es donde
 * está el acordeón con las respuestas.
 *
 * En el lienzo de 402 la banda es la misma en todas partes: 1192 de alto, la
 * foto dibujada 1792×1423 en (−841, −99), el título a +52 en x47, la
 * entradilla a +216 en x42, las filas de 122 a +389 (x33, 336 de ancho) y el
 * botón a +1050 en x62. Por eso va con valores por defecto y solo se pasa
 * `movil` si alguna página se sale de ahí.
 */

/** Geometría de la banda en el lienzo de 402. */
const MOVIL = { alto: 1192, titulo: 52, entrada: 216, lista: 389, boton: 1050 };

export function BloquePreguntas({
  preguntas,
  alto,
  fotoArriba,
  gradiente,
  tops,
  boton,
  bandaArriba = 0,
  className = "",
}: {
  preguntas: PreguntaFrecuente[];
  alto: number;
  /** y de la foto dentro de la banda (el archivo la sube para encuadrarla). */
  fotoArriba: number;
  gradiente: string;
  tops: { titulo: number; entrada: number; lista: number; boton?: number };
  boton?: { texto: string; href: string };
  /** y donde empieza la banda oscura dentro de la sección. */
  bandaArriba?: number;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden bg-black movil:h-[var(--alto-movil)] design:h-[var(--alto)] ${className}`}
      style={
        { "--alto": `${alto}px`, "--alto-movil": `${MOVIL.alto}px` } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden movil:top-0 movil:h-[var(--alto-movil)] movil:w-[402px] movil:[transform:scaleX(-1)] design:top-[var(--bt)] design:h-[var(--bh)] design:w-[1920px] design:[transform:scaleX(-1)]"
        style={
          {
            "--bt": `${bandaArriba}px`,
            "--bh": `${alto - bandaArriba}px`,
            "--alto-movil": `${MOVIL.alto}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] movil:inset-auto movil:top-[-99px] movil:left-[-841px] movil:h-[1423px] movil:w-[1792px] movil:max-w-none movil:object-fill design:top-[var(--fy)] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
          style={{ "--fy": `${fotoArriba}px` } as React.CSSProperties}
        />
        {/* El degradado cambia por página; el del lienzo de 402 es el mismo
            en todas, así que va aparte. */}
        <div className="absolute inset-0 movil:hidden" style={{ backgroundImage: gradiente }} />
        <div className="absolute inset-0 hidden movil:block movil:bg-[linear-gradient(165.95deg,#000000_11.90%,#00000000_35.49%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[var(--alto-movil)] movil:max-w-none movil:p-0 design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h2
          className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] movil:absolute movil:top-[var(--tm)] movil:left-[47px] movil:w-[320px] movil:text-left movil:text-[32px] movil:leading-[33px] design:absolute design:top-[var(--t)] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]"
          style={
            {
              "--t": `${tops.titulo}px`,
              "--tm": `${MOVIL.titulo}px`,
            } as React.CSSProperties
          }
        >
          <span className="movil:hidden">
            <span className="text-vernal-accent">
              Las dudas que más <br className="hidden design:inline" />
              escuchamos,
            </span>{" "}
            <span className="text-white">
              respondidas <br className="hidden design:inline" />
              con claridad.
            </span>
          </span>
          <span className="hidden movil:block">
            <span className="text-vernal-accent">
              Las dudas que <br />
              más escuchamos,
            </span>{" "}
            <span className="text-white">
              respondidas con <br />
              claridad.
            </span>
          </span>
        </h2>

        <p
          className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify movil:absolute movil:top-[var(--tm)] movil:left-[42px] movil:mt-0 movil:w-[320px] movil:max-w-none movil:text-justify movil:leading-[17px] design:absolute design:top-[var(--t)] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]"
          style={
            {
              "--t": `${tops.entrada}px`,
              "--tm": `${MOVIL.entrada}px`,
            } as React.CSSProperties
          }
        >
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ul
          className="mt-10 border-b border-white movil:absolute movil:top-[var(--tm)] movil:left-[33px] movil:mt-0 movil:w-[336px] movil:border-b-0 design:absolute design:top-[var(--t)] design:left-[239px] design:mt-0 design:w-[1441px]"
          style={
            {
              "--t": `${tops.lista}px`,
              "--tm": `${MOVIL.lista}px`,
            } as React.CSSProperties
          }
        >
          {preguntas.map((p) => (
            <li
              key={p.texto}
              className="relative border-t border-white movil:h-[122px] design:h-[var(--alto)]"
              style={{ "--alto": `${p.alto ?? 109}px` } as React.CSSProperties}
            >
              <Link
                href="/faqs"
                className="group flex flex-col gap-y-2 py-5 sm:flex-row sm:items-center sm:justify-between movil:block movil:h-full movil:py-0 design:block design:h-full design:py-0"
              >
              <span
                className="text-[20px] leading-[24px] font-light text-white movil:absolute movil:top-[28px] movil:left-[9px] movil:w-[210px] movil:text-[18px] movil:leading-[19px] design:absolute design:top-[var(--a)] design:left-[38px] design:text-[24px] design:leading-[25px]"
                style={{ "--a": `${p.arriba ?? 44}px` } as React.CSSProperties}
              >
                {p.texto}
              </span>
              <span
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium group-hover:underline movil:absolute movil:top-[30px] movil:left-[234px] movil:block movil:w-[90px] movil:gap-x-0 movil:text-center movil:text-[16px] movil:leading-[17px] design:contents design:text-[20px]"
                style={
                  {
                    "--a": `${p.arriba ?? 44}px`,
                    "--mas": `${(p.arriba ?? 44) - 10.5}px`,
                  } as React.CSSProperties
                }
              >
                <span className="movil:block design:absolute design:top-[var(--a)] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span
                  aria-hidden
                  className="text-[34px] leading-none font-light movil:absolute movil:top-[38.5px] movil:left-0 movil:w-full movil:text-[32px] movil:leading-[32px] design:absolute design:top-[var(--mas)] design:left-[1364px] design:text-[41px] design:leading-[42px]"
                >
                  +
                </span>
              </span>
              </Link>
            </li>
          ))}
        </ul>

        {boton && tops.boton !== undefined && (
          <div
            className="mt-10 flex justify-center movil:absolute movil:top-[var(--tm)] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[var(--t)] design:left-[821px] design:mt-0 design:block"
            style={
              {
                "--t": `${tops.boton}px`,
                "--tm": `${MOVIL.boton}px`,
              } as React.CSSProperties
            }
          >
            <ButtonLink href={boton.href} className="w-full sm:w-[277px] apilada:w-[277px]">
              {boton.texto}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
