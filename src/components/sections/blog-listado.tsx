import Image from "next/image";
import Link from "next/link";
import { FlechaEnlace } from "@/components/ui/iconos";
import { TarjetaArticulo } from "@/components/sections/tarjeta-articulo";
import { entradasBlog, filtrosBlog } from "@/lib/blog";

/**
 * /blog — frame `703:807` de Figma (2026-09-26).
 *
 *   hero     0..875: radial girado + la foto al 68% en plus-lighter y dos
 *            degradados; todo VOLTEADO en horizontal
 *   listado  875..2511 sobre blanco: titular, buscador, filtros y seis tarjetas
 *
 * Los filtros vienen marcados a mano en el archivo (cuatro activos); aquí se
 * pintan igual, pero todavía no filtran nada: no hay artículos reales.
 */

/** x/y de cada chip dentro de la banda blanca, en el orden de `filtrosBlog`. */
const CHIPS = [
  { left: 1005, top: 111 },
  { left: 1092, top: 111 },
  { left: 1214, top: 112 },
  { left: 1381, top: 112 },
  { left: 1532, top: 112 },
  { left: 1006, top: 148 },
  { left: 1093, top: 149 },
  { left: 1242, top: 149 },
  { left: 1335, top: 149 },
  { left: 1486, top: 149 },
];

/** Posición de cada tarjeta y y del título, que el archivo coloca a mano. */
const TARJETAS = [
  { left: 252.5, top: 257.5, titulo: 248.4 },
  { left: 740.5, top: 257.5, titulo: 265.4 },
  { left: 1228.5, top: 257.5, titulo: 268.4 },
  { left: 252.5, top: 875.5, titulo: 275.4 },
  { left: 740.5, top: 875.5, titulo: 275.4 },
  { left: 1228.5, top: 875.5, titulo: 280.4 },
];

export function BlogHero() {
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] design:h-[875px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden design:h-[875px] design:w-[1918px] design:[transform:scaleX(-1)]"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1918 875" preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="blog-hero-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(1223.9 351.413 -432.699 296.167 113.526 287.841)"
            >
              <stop stopColor="#172339" />
              <stop offset="1" stopColor="#0F0F0F" />
            </radialGradient>
          </defs>
          <rect width="1918" height="875" fill="url(#blog-hero-radial)" />
        </svg>
        <Image
          src="/images/blog/hero-fondo.webp"
          alt=""
          width={1024}
          height={691}
          priority
          sizes="(min-width: 1280px) 1416px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.68] mix-blend-plus-lighter design:top-[-8px] design:left-[191px] design:h-[956px] design:w-[1416px] design:max-w-none design:object-fill"
        />
        <div className="absolute inset-0 bg-[linear-gradient(84.01deg,#000000_12.36%,#0A0A0A00_25.46%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(290.65deg,#000000_42.40%,#00000000_80.13%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[875px] design:max-w-[1920px] design:p-0">
        <p className="text-[24px] leading-[26px] font-light text-white sm:text-[30px] design:absolute design:top-[231px] design:left-[246px] design:text-[36px] design:leading-[37.44px]">
          Blog de Inmigración Abogado Vernal, Texas
        </p>

        <h1 className="mt-3 text-[40px] leading-[44px] uppercase sm:text-[58px] sm:leading-[62px] design:absolute design:top-[285px] design:left-[241px] design:mt-0 design:w-[1300px] design:text-[82px] design:leading-[85px]">
          <span className="block text-white">Información clara,</span>
          <span className="text-vernal-accent block">para mantenerte al día.</span>
        </h1>

        <div className="mt-8 max-w-[680px] space-y-5 text-[16px] leading-[22px] text-white design:absolute design:top-[486px] design:left-[247px] design:mt-0 design:w-[620px] design:max-w-none design:space-y-0 design:text-justify design:leading-[17px]">
          <p>
            El proceso migratorio en Estados Unidos puede sentirse abrumador, sobre todo
            cuando la información que encuentras en internet es confusa, contradictoria, o
            simplemente no aplica a tu situación. Por eso creamos este espacio: un blog de
            inmigración escrito por el equipo de Abogado Vernal, pensado para mantener
            informada a nuestra comunidad en Texas sobre los temas migratorios que más le
            afectan.
          </p>
          <p className="design:mt-[17px]">
            Aquí encontrarás artículos sobre los trámites migratorios más comunes,
            actualizaciones sobre cambios recientes en las leyes de inmigración, y
            respuestas a las preguntas que más escuchamos de nuestra comunidad en Dallas,
            Houston, Austin, Fort Worth y San Antonio.
          </p>
        </div>

        {/* Aviso legal, como el del formulario: 12 en extralight cursiva. */}
        <p className="mt-6 max-w-[680px] text-[12px] leading-[16px] font-extralight text-white italic design:absolute design:top-[722px] design:left-[247px] design:mt-0 design:w-[700px] design:max-w-none design:leading-[14px]">
          Este contenido tiene fines informativos y no debe tomarse como asesoría legal.
          migratorio es distinto, y la única forma de saber qué aplica a tu situación es
          través de una consulta directa con nuestro equipo.
        </p>
      </div>
    </section>
  );
}

export function BlogListado() {
  return (
    <section className="relative overflow-hidden bg-white design:h-[1636px]">
      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 design:h-[1636px] design:max-w-[1920px] design:p-0">
        <h2 className="text-vernal-navy text-[26px] leading-[32px] font-light sm:text-[32px] design:absolute design:top-[56.8px] design:left-[247px] design:text-[36px] design:leading-[37.44px] design:text-black">
          No te pierdas las ultimas noticias
        </h2>

        {/* Buscador. Todavía no busca: no hay artículos que indexar. */}
        <form className="relative mt-8 flex max-w-[680px] design:absolute design:top-[126px] design:left-[247.5px] design:mt-0 design:w-[792px]">
          <label htmlFor="buscar-articulos" className="sr-only">
            Buscar artículos
          </label>
          <Image
            src="/icons/blog/lupa.svg"
            alt=""
            aria-hidden
            width={24}
            height={23}
            className="pointer-events-none absolute top-1/2 left-[12.5px] h-[23px] w-[24px] -translate-y-1/2 design:top-[13.5px] design:translate-y-0"
          />
          <input
            id="buscar-articulos"
            name="q"
            type="search"
            placeholder="Buscar artículos"
            className="h-[51px] w-full bg-white/97 pl-[46.5px] text-[15px] leading-[16px] text-black outline-none design:w-[668px]"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="bg-vernal-navy relative flex h-[52px] w-[70px] shrink-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-90 design:w-[124px]"
          >
            <FlechaEnlace className="h-[15px] w-[25px]" />
          </button>
        </form>

        <ul className="mt-6 flex flex-wrap gap-2 design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
          {filtrosBlog.map((f, i) => (
            <li
              key={f.texto}
              className="design:absolute design:top-[var(--t)] design:left-[var(--l)]"
              style={
                {
                  "--t": `${CHIPS[i].top}px`,
                  "--l": `${CHIPS[i].left}px`,
                  "--w": `${f.ancho}px`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className={`flex h-[30px] cursor-pointer items-center justify-center rounded-[4px] px-3 text-[16px] leading-[17px] font-medium transition-colors design:h-[var(--h)] design:w-[var(--w)] design:px-0 ${
                  f.activo
                    ? "bg-vernal-navy text-white"
                    : "text-vernal-navy border border-vernal-navy/60 hover:bg-vernal-navy/10"
                }`}
                style={{ "--h": `${f.activo ? 30 : 28}px` } as React.CSSProperties}
              >
                {f.texto}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
          {entradasBlog.map((e, i) => (
            <TarjetaArticulo
              key={e.titulo}
              entrada={e}
              arriba={TARJETAS[i].titulo}
              icono={{ left: 40.5, top: TARJETAS[i].titulo - 51 }}
              id={`blog-trazo-${i}`}
              className="design:top-[var(--t)] design:left-[var(--l)]"
              estilo={
                {
                  "--t": `${TARJETAS[i].top}px`,
                  "--l": `${TARJETAS[i].left}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </ul>

        <div className="mt-10 flex justify-center design:absolute design:top-[1520px] design:left-[821px] design:mt-0 design:block">
          <Link
            href="/blog"
            className="bg-vernal-navy text-vernal-accent flex h-[52px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px]"
          >
            Cargar más
          </Link>
        </div>
      </div>
    </section>
  );
}
