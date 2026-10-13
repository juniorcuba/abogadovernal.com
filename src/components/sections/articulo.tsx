import Image from "next/image";
import Link from "@/components/ui/enlace";
import { TarjetaArticulo } from "@/components/sections/tarjeta-articulo";
import { entradasBlog, topTitulo, type EntradaBlog } from "@/lib/blog";
import type { Articulo as DatosArticulo, NodoArticulo, TrozoArticulo } from "@/lib/articulo";
import { t } from "@/lib/i18n/servidor";

/**
 * La vista de un artículo — frame `802:564` de Figma, 1920 × 4346.
 *
 * |    y | alto | bloque                                   | estado |
 * |------|------|------------------------------------------|--------|
 * |    0 |  639 | hero: chip, antetítulo, titular y etiquetas | propio |
 * |  639 | 1813 | banda blanca: el cuerpo y la tarjeta lateral | propio |
 * | 2291 |  890 | banda cian con tres artículos            | propio |
 * | 3123 |  755 | "Agenda tu consulta"                     | el compartido, 58 encima |
 * | 3878 |  468 | footer                                   | el de siempre |
 *
 * El cuerpo es una columna de 1070 desde x250, 16/17 justificado; los párrafos
 * se separan por una línea en blanco (17) salvo los marcados `pegado`, que van
 * en la línea siguiente. Los títulos van en 24 y respiran 18 arriba y 16 abajo,
 * menos el que sigue a la lista, que respira 35.
 *
 * El lienzo de 402 sale de "VESPER AGENCY LANDING - MOBILE (15)" (402 x 7273):
 *
 *   hero    0..735, con el fondo en espejo; el chip a (40, 106) y el titular
 *           en caja estrecha, que el archivo parte en siete renglones
 *   cuerpo  735..3597 sobre blanco: columna de 325 desde x38, 15/16, con los
 *           títulos de nivel 1 al mismo tamaño que el texto, solo en azul
 *           marino; la foto de 351×198, que aquí sí lleva un trazo cian de 5,
 *           y la tarjeta lateral a (33, 2469), que
 *           conserva la geometría de 1920 (297×345)
 *   cian    3597..5268 con las tres entradas · agenda 5232 · footer
 *
 * Esas medidas son las del artículo del archivo (el de la Visa VAWA). Desde el
 * 2026-10-12 hay seis, de largos distintos, así que la banda blanca ya no tiene
 * alto fijo: el cuerpo va en flujo y la banda mide lo que mida el texto, con
 * los mismos márgenes (65 arriba y 67.5 bajo el botón en 1920; 37 arriba, la
 * tarjeta 32.6 bajo el botón y 48 al final en 402). Con el artículo del archivo
 * sale la misma altura de antes. En 1920 la tarjeta lateral sigue en y708 en
 * ese artículo; en los demás, que son más cortos y no llevan foto, sube a y65,
 * a la altura del primer párrafo, y la banda no baja de lo que ella ocupa.
 *
 * La cabecera usa la foto de la tarjeta del artículo. La del archivo tiene su
 * encuadre a mano; las demás se ajustan con `object-cover` y `heroFoco`.
 */

/** Posición de cada tarjeta de la banda cian, en el orden del archivo. */
const TARJETAS = [
  { left: 252.5, titulo: 248.4 },
  { left: 740.5, titulo: 265.4 },
  { left: 1228.5, titulo: 268.4 },
];

/** El artículo del archivo de diseño: el único con la foto encuadrada a mano. */
const SLUG_DISENO = "visa-vawa-camino-libertad-residencia";

export function Articulo({ articulo }: { articulo: DatosArticulo }) {
  const entrada = entradasBlog.find((e) => e.slug === articulo.slug) ?? entradasBlog[0];
  return (
    <>
      <ArticuloHero articulo={articulo} entrada={entrada} />
      <ArticuloCuerpo articulo={articulo} />
      <ArticuloMas slug={articulo.slug} />
    </>
  );
}

function ArticuloHero({ articulo, entrada }: { articulo: DatosArticulo; entrada: EntradaBlog }) {
  const delDiseno = articulo.slug === SLUG_DISENO;
  return (
    <section className="relative -mt-[128px] overflow-hidden bg-[#0F0F10] movil:-mt-[106px] movil:h-[735px] design:h-[639px]">
      {/* El archivo voltea la foto y los dos degradados en horizontal. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden [transform:scaleX(-1)] movil:h-[735px] movil:w-[402px] design:top-0 design:left-[6px] design:h-[639px] design:w-[1918px]"
      >
        <Image
          src={entrada.imagen}
          alt=""
          width={delDiseno ? 1408 : entrada.foto.w}
          height={delDiseno ? 768 : entrada.foto.h}
          priority
          sizes="(min-width: 1280px) 1918px, 100vw"
          className={`absolute inset-0 h-full w-full object-cover ${
            delDiseno
              ? "movil:top-0 movil:left-[-566px] movil:h-[632px] movil:w-[1158px] movil:max-w-none movil:object-fill design:top-[-47px] design:left-[-351px] design:h-[1122px] design:w-[2057px] design:max-w-none design:object-fill"
              : // Entre 561 y 1279 la foto empieza bajo la cabecera, que si no tapa la cara.
                "apilada:top-[128px] apilada:h-[calc(100%-128px)]"
          }`}
          style={delDiseno ? undefined : { objectPosition: entrada.heroFoco ?? "50% 30%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(81.83deg,#000000_12.36%,#0A0A0A00_25.46%)] movil:bg-[linear-gradient(156.97deg,#000000_-6.04%,#0A0A0A00_58.38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(304.98deg,#000000_20.77%,#00000000_66.11%)] movil:bg-[linear-gradient(323.90deg,#000000_50.38%,#00000000_65.60%)]" />
      </div>

      <div className="relative mx-auto max-w-[1040px] px-6 pt-[168px] pb-20 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[735px] movil:max-w-none movil:p-0 design:h-[639px] design:max-w-[1920px] design:p-0">
        <span className="bg-vernal-accent text-vernal-navy inline-flex items-center justify-center px-4 py-1 text-[18px] leading-[22px] font-medium movil:absolute movil:top-[106px] movil:left-[40px] movil:h-[40px] movil:w-[93px] movil:p-0 movil:text-[23px] movil:leading-[24px] design:absolute design:top-[128px] design:left-[250px] design:h-[40px] design:w-[93px] design:p-0 design:text-[23px] design:leading-[24px]">
          {t("BLOG")}
        </span>

        <p className="text-vernal-accent mt-6 text-[20px] leading-[24px] font-light sm:text-[24px] movil:absolute movil:top-[211px] movil:left-[38px] movil:mt-0 movil:text-[24px] movil:leading-[25px] design:absolute design:top-[272px] design:left-[247px] design:mt-0 design:text-[24px] design:leading-[25px]">
          {t("Abogado Vernal")}
        </p>

        {/* En 402 las etiquetas cuelgan del titular (25.5 por debajo), no de una
            y fija: el titular ocupa de cinco a ocho renglones según el artículo.
            Fuera de ese lienzo el envoltorio es `contents` y no cambia nada. */}
        <div className="contents movil:absolute movil:top-[248px] movil:left-[38px] movil:block movil:w-[290px]">
        <h1 className="mt-3 text-[30px] leading-[34px] font-light text-white sm:text-[40px] sm:leading-[44px] movil:mt-0 movil:text-[46px] movil:leading-[48px] design:absolute design:top-[316px] design:left-[246px] design:mt-0 design:w-[1000px] design:text-[40px] design:leading-[42px]">
          {articulo.titulo.map((linea) => (
            <span key={linea} className="design:block">
              {t(linea)}{" "}
            </span>
          ))}
        </h1>

        <ul className="mt-6 flex gap-x-[5px] text-[10px] leading-[12px] font-medium text-white movil:mt-[25.5px] design:absolute design:top-[463.5px] design:left-[247.5px] design:mt-0">
          {entrada.etiquetas.map((et) => (
            <li
              key={et}
              className="flex h-[18px] shrink-0 items-center justify-center rounded-[3.5px] border border-vernal-accent px-[9px] whitespace-nowrap"
            >
              {t(et)}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

function ArticuloCuerpo({ articulo }: { articulo: DatosArticulo }) {
  const delDiseno = articulo.slug === SLUG_DISENO;
  return (
    <section className="relative bg-white">
      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:max-w-none movil:px-0 movil:pt-0 movil:pb-[48px] design:min-h-[477.5px] design:max-w-[1920px] design:p-0">
        <div className="text-[16px] leading-[22px] text-black sm:text-justify movil:ml-[38px] movil:w-[325px] movil:pt-[37px] movil:text-justify movil:text-[15px] movil:leading-[16px] design:ml-[250px] design:w-[1070px] design:pt-[65px] design:pb-[67.5px] design:text-justify design:leading-[17px]">
          {articulo.cuerpo.map((nodo, i) => (
            <Nodo
              key={i}
              nodo={nodo}
              previo={articulo.cuerpo[i - 1]}
              primero={i === 0}
              imagen={articulo.imagen}
            />
          ))}

          <Link
            href="/contacto"
            className="bg-vernal-navy text-vernal-accent mt-10 flex h-[52px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px] movil:mt-[32px] movil:w-[277px] design:mt-[45px] design:w-[277px]"
          >
            {t("Agenda tu consulta")}
          </Link>
        </div>

        <TarjetaNoticias arriba={delDiseno ? 708 : 65} />
      </div>
    </section>
  );
}

/** La tarjeta oscura de la derecha; por debajo de 1280 va al final del cuerpo. */
function TarjetaNoticias({ arriba }: { arriba: number }) {
  return (
    <aside className="relative mt-12 overflow-hidden p-8 movil:mt-[32.6px] movil:ml-[33px] movil:h-[345px] movil:w-[297px] movil:p-0 design:absolute design:top-[var(--t)] design:left-[1381px] design:mt-0 design:h-[345px] design:w-[297px] design:p-0"
      style={{ "--t": `${arriba}px` } as React.CSSProperties}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 297 345"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient
            id="articulo-tarjeta"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(643.539 -726.131 83.5526 107.176 9.13 258.428)"
          >
            <stop stopColor="#172339" />
            <stop offset="1" stopColor="#0F0F0F" />
          </radialGradient>
        </defs>
        <rect width="297" height="345" fill="url(#articulo-tarjeta)" fillOpacity="0.87" />
      </svg>

      <Image
        src="/icons/blog/noticias.svg"
        alt=""
        aria-hidden
        width={71}
        height={64}
        className="relative h-[64px] w-[71px] movil:absolute movil:top-[31px] movil:left-[34px] design:absolute design:top-[31px] design:left-[34px]"
      />
      <p className="relative mt-4 text-[26px] leading-[28px] font-light text-white sm:text-[32px] sm:leading-[33px] movil:absolute movil:top-[111px] movil:left-[34px] movil:mt-0 movil:w-[230px] movil:text-[32px] movil:leading-[33px] design:absolute design:top-[118px] design:left-[34px] design:mt-0 design:w-[240px] design:text-[32px] design:leading-[33px]">
        {t("No te pierdas las ultimas noticias.")}
      </p>
      <Link
        href="/blog"
        className="bg-vernal-accent text-vernal-navy relative mt-6 flex h-[66px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 movil:absolute movil:top-[241px] movil:left-[32.3px] movil:mt-0 movil:w-[233px] design:absolute design:top-[241px] design:left-[32.3px] design:mt-0 design:w-[233px]"
      >
        {t("Leer mas articulos")}
      </Link>
    </aside>
  );
}

function ArticuloMas({ slug }: { slug: string }) {
  // Los tres primeros del listado que no sean el que se está leyendo.
  const otros = entradasBlog.filter((e) => e.slug !== slug).slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-[#08B6FF] movil:h-[1671px] design:h-[890px]">
      <div className="relative mx-auto max-w-[1040px] px-6 py-16 lg:px-12 apilada:max-w-[880px] apilada:px-10 movil:h-[1671px] movil:max-w-none movil:p-0 design:h-[890px] design:max-w-[1920px] design:p-0">
        <h2 className="text-center text-[28px] leading-[32px] font-light text-black sm:text-[36px] sm:leading-[38px] movil:absolute movil:top-[35px] movil:left-[61px] movil:w-[280px] movil:text-[32px] movil:leading-[33px] design:absolute design:top-[80px] design:left-0 design:w-full design:text-[36px] design:leading-[37.44px]">
          {t("No te pierdas las ultimas noticias")}
        </h2>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 apilada:grid-cols-2 movil:absolute movil:top-0 movil:left-0 movil:mt-0 movil:block movil:w-full design:absolute design:top-0 design:left-0 design:mt-0 design:block design:w-full">
          {otros.map((e, i) => (
            <TarjetaArticulo
              key={e.slug}
              entrada={e}
              arriba={topTitulo(e.titulo, TARJETAS[i].titulo)}
              icono={{ left: 40.5, top: topTitulo(e.titulo, TARJETAS[i].titulo) - 51 }}
              id={`articulo-trazo-${i}`}
              className="movil:absolute movil:top-[var(--mt)] movil:left-[23px] design:top-[165.5px] design:left-[var(--l)]"
              estilo={
                {
                  "--l": `${TARJETAS[i].left}px`,
                  "--mt": `${[127, 593, 1065][i]}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </ul>

        <div className="mt-10 flex justify-center movil:absolute movil:top-[1548px] movil:left-[62px] movil:mt-0 movil:block design:absolute design:top-[780px] design:left-[821px] design:mt-0 design:block">
          <Link
            href="/blog"
            className="bg-vernal-navy text-vernal-accent flex h-[52px] w-full items-center justify-center text-[16px] leading-[17px] transition-opacity hover:opacity-90 sm:w-[277px] apilada:w-[277px] movil:w-[277px]"
          >
            {t("Ver mas articulos")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Nodo({
  nodo,
  previo,
  primero,
  imagen,
}: {
  nodo: NodoArticulo;
  previo?: NodoArticulo;
  primero?: boolean;
  imagen?: string;
}) {
  if (nodo.tipo === "titulo" || nodo.tipo === "titulo2") {
    // Lo que respira por arriba depende de lo que venga antes: tras la lista
    // son 35 y tras la foto 58.5, no los 18 de después de un párrafo.
    const arriba =
      previo?.tipo === "imagen"
        ? "movil:mt-[40.8px] design:mt-[58.5px]"
        : previo?.tipo === "lista"
          ? "movil:mt-[16px] design:mt-[35px]"
          : "movil:mt-[16px] design:mt-[18px]";
    // En el lienzo de 402 los títulos de nivel 1 no crecen: se quedan en 15 y
    // solo cambian de color.
    const tamano =
      nodo.tipo === "titulo"
        ? "text-vernal-navy movil:text-[15px] movil:leading-[16px]"
        : "text-black movil:text-[20px] movil:leading-[21px]";
    return (
      <p
        className={`mt-8 mb-4 text-[20px] leading-[24px] sm:text-[24px] movil:mb-[16px] design:mb-[16px] design:text-[24px] design:leading-[25px] ${arriba} ${tamano}`}
      >
        {t(nodo.texto)}
      </p>
    );
  }

  if (nodo.tipo === "lista") {
    // La lista del archivo no lleva viñeta; las del documento sí, o número.
    const Lista = nodo.estilo === "numeros" ? "ol" : "ul";
    const marca =
      nodo.estilo === "numeros" ? "list-decimal" : nodo.estilo === "vinetas" ? "list-disc" : "";
    return (
      <Lista className={`mt-4 movil:mt-[16px] design:mt-[17px] ${marca}`}>
        {nodo.items.map((item, i) => (
          <li key={i} className={`movil:ml-[22px] design:ml-[24px] ${nodo.estilo ? "ml-5" : ""}`}>
            {item.map((t, j) => (
              <Trozo key={j} trozo={t} />
            ))}
          </li>
        ))}
      </Lista>
    );
  }

  if (nodo.tipo === "imagen") {
    if (!imagen) return null;
    // La caja recorta a 539×304 una foto de 539×357 subida 26.
    return (
      <span className="relative mt-8 block overflow-hidden movil:mt-[35.5px] movil:ml-[-12.5px] movil:h-[198px] movil:w-[351px] movil:border-[2.5px] movil:border-[#08B6FF] design:mt-[47.5px] design:ml-[4.5px] design:h-[304px] design:w-[539px]">
        <Image
          src={imagen}
          alt=""
          width={539}
          height={357}
          sizes="(min-width: 1280px) 539px, 100vw"
          className="h-auto w-full movil:absolute movil:top-[-17px] movil:left-0 movil:h-[231px] movil:w-[351px] movil:max-w-none design:absolute design:top-[-26px] design:left-0 design:h-[357px] design:w-[539px] design:max-w-none"
        />
      </span>
    );
  }

  return (
    <p className={nodo.pegado || primero ? "" : "mt-4 movil:mt-[16px] design:mt-[17px]"}>
      {nodo.trozos.map((t, j) => (
        <Trozo key={j} trozo={t} />
      ))}
    </p>
  );
}

function Trozo({ trozo }: { trozo: TrozoArticulo }) {
  if (typeof trozo === "string") return <>{t(trozo)}</>;
  if ("fuerte" in trozo) return <strong className="font-bold">{t(trozo.fuerte)}</strong>;
  return (
    <Link href={trozo.href} className="text-vernal-navy underline underline-offset-2">
      {t(trozo.enlace)}
    </Link>
  );
}
