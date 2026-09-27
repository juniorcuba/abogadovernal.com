import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

/**
 * Banda de preguntas frecuentes. Aparece en /faqs (con las diez), y al cierre de
 * /testimoniales y /blog (con las cinco primeras). Siempre es la misma foto al
 * 18% sobre negro, VOLTEADA en horizontal, con su degradado, el titular
 * centrado, la entradilla y las filas de 109 separadas por un trazo blanco.
 *
 * Cambian de una página a otra el alto, la y de la foto, el ángulo del
 * degradado y las posiciones; por eso van por props.
 */
export type FilaPregunta = { texto: string; alto?: number; arriba?: number };

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
  preguntas: FilaPregunta[];
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
      className={`relative overflow-hidden bg-black design:h-[var(--alto)] ${className}`}
      style={{ "--alto": `${alto}px` } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:top-[var(--bt)] design:h-[var(--bh)] design:w-[1920px] design:[transform:scaleX(-1)]"
        style={
          {
            "--bt": `${bandaArriba}px`,
            "--bh": `${alto - bandaArriba}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src="/images/faqs/hero-fondo.webp"
          alt=""
          width={1024}
          height={813}
          sizes="(min-width: 1280px) 2585px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18] design:top-[var(--fy)] design:left-[-662px] design:h-[2052px] design:w-[2585px] design:max-w-none design:object-fill"
          style={{ "--fy": `${fotoArriba}px` } as React.CSSProperties}
        />
        <div className="absolute inset-0" style={{ backgroundImage: gradiente }} />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[var(--alto)] design:max-w-[1920px] design:p-0">
        <h2
          className="text-center text-[34px] leading-[40px] font-light sm:text-[48px] sm:leading-[52px] design:absolute design:top-[var(--t)] design:left-0 design:w-[1920px] design:text-[64px] design:leading-[67px]"
          style={{ "--t": `${tops.titulo}px` } as React.CSSProperties}
        >
          <span className="text-vernal-accent">
            Las dudas que más <br className="hidden design:inline" />
            escuchamos,
          </span>{" "}
          <span className="text-white">
            respondidas <br className="hidden design:inline" />
            con claridad.
          </span>
        </h2>

        <p
          className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[22px] text-white sm:text-justify design:absolute design:top-[var(--t)] design:left-[549px] design:mt-0 design:w-[820px] design:max-w-none design:leading-[17px]"
          style={{ "--t": `${tops.entrada}px` } as React.CSSProperties}
        >
          Cada semana, en nuestras oficinas de Texas escuchamos las mismas preguntas una
          y otra vez señal de que hay información que no siempre es fácil de encontrar,
          o que se presta a confusión. Aquí reunimos las dudas más comunes de nuestra
          comunidad, explicadas de forma simple y directa.
        </p>

        <ul
          className="mt-10 border-b border-white design:absolute design:top-[var(--t)] design:left-[239px] design:mt-0 design:w-[1441px]"
          style={{ "--t": `${tops.lista}px` } as React.CSSProperties}
        >
          {preguntas.map((p) => (
            <li
              key={p.texto}
              className="relative flex flex-col gap-y-2 border-t border-white py-5 sm:flex-row sm:items-center sm:justify-between design:block design:h-[var(--alto)] design:py-0"
              style={{ "--alto": `${p.alto ?? 109}px` } as React.CSSProperties}
            >
              <span
                className="text-[20px] leading-[24px] font-light text-white design:absolute design:top-[var(--a)] design:left-[38px] design:text-[24px] design:leading-[25px]"
                style={{ "--a": `${p.arriba ?? 44}px` } as React.CSSProperties}
              >
                {p.texto}
              </span>
              {/* El archivo no trae las respuestas: esto es el rótulo del diseño,
                  no un enlace, para no ofrecer algo que no abre. */}
              <span
                aria-hidden
                className="text-vernal-accent flex shrink-0 items-center gap-x-6 text-[18px] leading-[21px] font-medium design:contents design:text-[20px]"
                style={
                  {
                    "--a": `${p.arriba ?? 44}px`,
                    "--mas": `${(p.arriba ?? 44) - 10.5}px`,
                  } as React.CSSProperties
                }
              >
                <span className="design:absolute design:top-[var(--a)] design:left-[1207px]">
                  Ver respuesta
                </span>
                <span className="text-[34px] leading-none font-light design:absolute design:top-[var(--mas)] design:left-[1364px] design:text-[41px] design:leading-[42px]">
                  +
                </span>
              </span>
            </li>
          ))}
        </ul>

        {boton && tops.boton !== undefined && (
          <div
            className="mt-10 flex justify-center design:absolute design:top-[var(--t)] design:left-[821px] design:mt-0 design:block"
            style={{ "--t": `${tops.boton}px` } as React.CSSProperties}
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
