import Image from "next/image";
import Link from "next/link";
import { FlechaEnlace } from "@/components/ui/iconos";
import { TrazoTarjeta } from "@/components/ui/trazo-tarjeta";
import { articulo } from "@/lib/articulo";
import { entradaBlogEtiquetas, entradaBlogResumen, type EntradaBlog } from "@/lib/blog";

/**
 * Tarjeta de artículo del blog: 438×575 con la foto a sangre, el chip "BLOG",
 * el título, la entradilla, el botón y dos etiquetas. Sale igual en /blog y al
 * cierre de /testimoniales, así que vive aparte.
 *
 * `arriba` es la y del título dentro de la tarjeta: el archivo la coloca a mano
 * según cuántas líneas ocupe.
 */
export function TarjetaArticulo({
  entrada,
  arriba,
  icono,
  id,
  estilo,
  className = "",
}: {
  entrada: EntradaBlog;
  arriba: number;
  /** El icono cambia de sitio entre páginas: sobre el título en /blog y abajo a la derecha en /testimoniales. */
  icono: { left: number; top: number };
  id: string;
  estilo?: React.CSSProperties;
  className?: string;
}) {
  return (
    <li
      className={`relative bg-[#172339] design:absolute design:h-[575px] design:w-[438px] ${className}`}
      style={estilo}
    >
      {/* El recorte va aquí dentro y no en la tarjeta: el trazo de 11 sobresale
          5.5 por fuera del borde y la tarjeta no debe cortarlo. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src={entrada.imagen}
          alt=""
          width={entrada.foto.w}
          height={entrada.foto.h}
          sizes="(min-width: 1280px) 438px, 100vw"
          className="absolute inset-0 h-full w-full object-cover design:top-[var(--fy)] design:left-[var(--fx)] design:h-[var(--fh)] design:w-[var(--fw)] design:max-w-none design:object-fill"
          style={
            {
              "--fx": `${entrada.foto.x}px`,
              "--fy": `${entrada.foto.y}px`,
              "--fw": `${entrada.foto.w}px`,
              "--fh": `${entrada.foto.h}px`,
            } as React.CSSProperties
          }
        />
        <div className="absolute inset-0 bg-black/[0.34]" />
        <div className="absolute inset-0 bg-[linear-gradient(212.75deg,#00000000_11.60%,#000000_56.09%)]" />
      </div>
      <TrazoTarjeta
        id={id}
        ancho={438}
        alto={575}
        transformacion="matrix(205.944 -3993.67 214.425 51.5967 18.14 592.81)"
      />

      <span className="bg-vernal-accent text-vernal-navy absolute top-[22px] right-[22px] flex items-center justify-center px-3 py-1 text-[16px] leading-[20px] font-medium design:top-[5.5px] design:right-auto design:left-[326.5px] design:h-[40px] design:w-[93px] design:p-0 design:text-[23px] design:leading-[24px]">
        BLOG
      </span>

      <div className="relative flex h-full flex-col justify-end p-6 design:block design:p-0">
        <Image
          src="/icons/blog/institucion.svg"
          alt=""
          aria-hidden
          width={35}
          height={35}
          className="mb-3 h-[35px] w-[35px] design:absolute design:top-[var(--iy)] design:left-[var(--ix)] design:mb-0"
          style={{ "--iy": `${icono.top}px`, "--ix": `${icono.left}px` } as React.CSSProperties}
        />
        <h3
          className="text-[26px] leading-[30px] font-light whitespace-normal text-white design:absolute design:whitespace-pre-line design:top-[var(--ty)] design:left-[40.5px] design:text-[32px] design:leading-[33.28px]"
          style={{ "--ty": `${arriba}px` } as React.CSSProperties}
        >
          {entrada.titulo}
        </h3>
        <p className="mt-3 text-[13px] leading-[16px] text-white design:absolute design:top-[391.5px] design:left-[40.5px] design:mt-0 design:w-[340px] design:leading-[14px]">
          {entradaBlogResumen}
        </p>
        <Link
          href={`/blog/${articulo.slug}`}
          className="bg-vernal-accent text-vernal-navy relative mt-5 flex h-[52px] w-full items-center pl-[25px] text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[223px] design:absolute design:top-[446.5px] design:left-[40.5px] design:mt-0 design:w-[223px]"
        >
          Leer articulo
          <FlechaEnlace className="ml-auto mr-[25px] h-[15px] w-[25px] shrink-0 design:absolute design:top-[18.5px] design:left-[171px] design:m-0" />
        </Link>
        <p className="mt-4 flex gap-x-[5px] text-[10px] leading-[12px] font-medium text-white design:absolute design:top-[527px] design:left-[40px] design:mt-0">
          {entradaBlogEtiquetas.map((t, k) => (
            <span
              key={t}
              className="flex items-center justify-center rounded-[3.5px] border border-white/40 px-2 py-[3px] design:h-[18px] design:w-[var(--w)] design:p-0"
              style={{ "--w": `${k === 0 ? 70 : 85}px` } as React.CSSProperties}
            >
              {t}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}
