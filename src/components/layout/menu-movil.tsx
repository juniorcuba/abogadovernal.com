"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "@/components/ui/enlace";
import { Logo } from "@/components/ui/logo";
import { sedes } from "@/lib/sedes";
import { site, socialsCabecera } from "@/lib/site";
import { SelectorIdioma } from "@/components/layout/selector-idioma";
import { useT } from "@/lib/i18n/cliente";

/**
 * Menú móvil — artboards `VESPER AGENCY LANDING - MENU` (402×886, con las
 * sedes abiertas) y `… MENU MOBILE FULL` (402×979, con las sedes y "Nosotros"
 * abiertos). Los dos son el mismo menú en dos estados: la diferencia son los
 * 85 que ocupa el desplegable de "Nosotros".
 *
 *   fondo      #0F0F10 con el radial azul del archivo (centro en 69, 650)
 *   líneas     0.5 en #2C4167 bajo cada renglón, de x34 a x380
 *   flechas    blanca de 18 al final de cada renglón de un desplegable, y un
 *              triángulo cian de 14×12 en los dos que despliegan
 *   cabecera   el aspa, el logo y ES/EN en las mismas coordenadas que la barra
 *   primer     "Inicio" con la caja en y131; de ahí para abajo, 20/21 a x43
 *   plegados   "Nosotros" y "Áreas de practica & servicios" abren a x106, y las
 *              sedes llevan delante el icono de edificio de 17×18 en x70
 *   teléfono   y812 centrado, los cuatro iconos de 25 en y849 (paso 36)
 *   legal      8/300 centrado en y911.5
 *
 * El archivo coloca cada renglón a mano y los huecos bailan entre 19 y 29; aquí
 * van 28 arriba y 20 dentro de los desplegables, que es lo que más se repite.
 *
 * "Testimoniales" va entre las sedes y "Blogs", como en el artboard. Estuvo
 * fuera hasta el 2026-10-11, igual que en el menú de escritorio.
 */

const ENLACE =
  "block text-[20px] leading-[21px] font-light text-white transition-colors hover:text-vernal-accent";

/** Renglón de primer nivel: texto a x43 y línea de 0.5 por debajo, de x34 a x380. */
const FILA = "border-b-[0.5px] border-[#2C4167] pl-[9px] pt-[15px] pb-[13px]";
/** Renglón de un desplegable: mismo trazo, más apretado y con la flecha a la derecha. */
const SUBFILA = "border-b-[0.5px] border-[#2C4167] pt-[12px] pb-[9px]";
const SUBENLACE =
  "flex items-center justify-between pr-[16px] text-[20px] leading-[21px] font-light text-white transition-colors hover:text-vernal-accent";

/** Flecha blanca de 18×16 que cierra cada renglón de un desplegable (x346..364). */
function Flecha() {
  return (
    <svg aria-hidden width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
      <path
        d="M0 8H17M11 2L17 8L11 14"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuMovil() {
  const t = useT();
  const [abierto, setAbierto] = useState(false);
  // Los dos pueden estar abiertos a la vez: asi los ensena el artboard FULL.
  const [desplegados, setDesplegados] = useState<Record<"nosotros" | "areas", boolean>>({
    nosotros: false,
    areas: false,
  });
  const alternar = (cual: "nosotros" | "areas") =>
    setDesplegados((d) => ({ ...d, [cual]: !d[cual] }));

  // Bloquear el scroll del fondo mientras el panel está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-label={t("Abrir menú")}
        aria-expanded={abierto}
        className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center movil:absolute movil:top-[23px] movil:left-[25px] movil:h-[24px] movil:w-[36px]"
      >
        {/* El icono del lienzo móvil no es el de escritorio: son tres trazos de
            3px ESCALONADOS —36, 28 y 19— en x25 y y25/35/46 del artboard. */}
        <span
          aria-hidden
          className="relative block h-[16px] w-[26px] movil:h-[24px] movil:w-[36px]"
        >
          <span className="absolute top-0 left-0 h-[2px] w-full bg-white movil:h-[3px]" />
          <span className="absolute top-[7px] left-0 h-[2px] w-full bg-white movil:top-[10px] movil:h-[3px] movil:w-[28px]" />
          <span className="absolute top-[14px] left-0 h-[2px] w-full bg-white movil:top-[21px] movil:h-[3px] movil:w-[19px]" />
        </span>
      </button>

      {/* El panel se monta en el lienzo y no aqui dentro: la cabecera va al 95% de
          opacidad y un hijo suyo no puede ser mas opaco que ella, asi que la
          pagina (y la propia hamburguesa) se transparentaban por debajo. Va al
          lienzo y no a <body> para conservar el zoom del artboard. */}
      {abierto &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("Menú")}
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#0F0F10] bg-[radial-gradient(1639px_326px_at_69px_650px,#172339_0%,#0F0F0F_100%)]"
        >
          {/* Cabecera del panel, en las coordenadas de la barra de siempre. */}
          <div className="relative h-[70px] shrink-0">
            <button
              type="button"
              onClick={cerrar}
              aria-label={t("Cerrar menú")}
              className="absolute top-[18px] left-[22px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center"
            >
              <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1 1L19 19M19 1L1 19"
                  stroke="#08B6FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Link href="/" onClick={cerrar} className="absolute top-[18px] left-[171px] block h-[46px] w-[57px] apilada:left-1/2 apilada:-translate-x-1/2 [&>div]:!h-full [&>div]:!w-full">
              <Logo />
            </Link>
            <SelectorIdioma className="absolute top-[24px] left-[327px] flex gap-x-[12px] text-[14px] leading-[15px] font-medium apilada:right-[28px] apilada:left-auto" />
          </div>

          <nav className="pt-[61px] pb-[40px]">
            {/* Las líneas del archivo van de x34 a x380; el texto, a x43. */}
            <ul className="mr-[22px] ml-[34px]">
              <li className={`${FILA} pt-0`}>
                <Link href="/" onClick={cerrar} className={ENLACE}>
                  {t("Inicio")}
                </Link>
              </li>

              <li>
                <div className={FILA}>
                  <Desplegable
                    etiqueta={t("Nosotros")}
                    abierto={desplegados.nosotros}
                    alternar={() => alternar("nosotros")}
                  />
                </div>
                {desplegados.nosotros && (
                  <ul>
                    <li className={SUBFILA}>
                      <Link href="/nosotros" onClick={cerrar} className={`${SUBENLACE} pl-[72px]`}>
                        {t("Abogado Vernal")}
                        <Flecha />
                      </Link>
                    </li>
                    <li className={SUBFILA}>
                      <Link
                        href="/nuestro-equipo"
                        onClick={cerrar}
                        className={`${SUBENLACE} pl-[72px]`}
                      >
                        {t("Nuestro Equipo")}
                        <Flecha />
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <div className={`${FILA} pb-[9px]`}>
                  <Desplegable
                    etiqueta={[t("Áreas de practica"), t("& servicios")]}
                    abierto={desplegados.areas}
                    alternar={() => alternar("areas")}
                  />
                </div>
                {desplegados.areas && (
                  <ul>
                    {sedes.map((s) => (
                      <li key={s.slug} className={`${SUBFILA} first:pt-[19px]`}>
                        <Link
                          href={`/areas-de-servicio/${s.slug}`}
                          onClick={cerrar}
                          className={`${SUBENLACE} pl-[36px]`}
                        >
                          <span className="flex items-center gap-x-[19px]">
                            <Image
                              src="/icons/menu/edificio.svg"
                              alt=""
                              aria-hidden
                              width={17}
                              height={18}
                              className="h-[18px] w-[17px] shrink-0"
                            />
                            {t(s.rotulo)}
                          </span>
                          <Flecha />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className={FILA}>
                <Link href="/testimoniales" onClick={cerrar} className={ENLACE}>
                  {t("Testimoniales")}
                </Link>
              </li>
              <li className={FILA}>
                <Link href="/blog" onClick={cerrar} className={ENLACE}>
                  {t("Blogs")}
                </Link>
              </li>
              <li className={FILA}>
                {/* Era "FAQS" (retirada el 2026-10-12); lleva a /eb-1a desde el 2026-10-17. */}
                <Link href="/eb-1a" onClick={cerrar} className={`${ENLACE} font-normal`}>
                  {t("EB1")}
                </Link>
              </li>
              <li className={FILA}>
                <Link href="/contacto" onClick={cerrar} className={`${ENLACE} font-normal`}>
                  {t("Contacto")}
                </Link>
              </li>
            </ul>

            <p className="mt-[36px] text-center text-[16px] leading-[17px] text-white">
              {t("Llamanós")}{" "}
              <a href={site.phoneHref} className="text-vernal-accent font-bold transition-colors hover:text-white">
                {site.phone}
              </a>
            </p>

            <ul className="mt-[21px] flex justify-center gap-x-[11px]">
              {socialsCabecera.map((s) => (
                <li key={s.label} className="flex shrink-0">
                  <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                    <Image
                      src={s.icon}
                      alt=""
                      width={25}
                      height={25}
                      className="h-[25px] w-[25px] max-w-none"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-[37px] text-center text-[8px] leading-[9px] font-light text-white">
              {t("© 2026 – ABOGADO VERNAL. All right reserved.")}
              <br />
              <Link href={site.privacyUrl} onClick={cerrar} className="hover:text-vernal-accent">
                {t("Políticas de privacidad.")}
              </Link>{" "}
              <Link href={site.termsUrl} onClick={cerrar} className="hover:text-vernal-accent">
                {t("Términos y condiciones")}
              </Link>
            </p>
          </nav>
        </div>,
          document.querySelector('[class^="modo-"]') ?? document.body,
        )}
    </div>
  );
}

/** Fila que abre un submenú. El triángulo mira abajo abierto y cerrado, como en el archivo. */
function Desplegable({
  etiqueta,
  abierto,
  alternar,
}: {
  etiqueta: string | string[];
  abierto: boolean;
  alternar: () => void;
}) {
  const lineas = Array.isArray(etiqueta) ? etiqueta : [etiqueta];
  return (
    <button
      type="button"
      onClick={alternar}
      aria-expanded={abierto}
      className="flex w-full cursor-pointer items-start justify-between gap-x-4 text-left text-[20px] leading-[21px] font-light text-white transition-colors hover:text-vernal-accent"
    >
      <span>
        {lineas.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </span>
      {/* Triángulo relleno de 14×12, como en el archivo (x352..366). */}
      <svg
        aria-hidden
        width="14"
        height="12"
        viewBox="0 0 14 12"
        className="mt-[6px] mr-[14px] shrink-0"
      >
        <path d="M7 12L0.072 0H13.928L7 12Z" fill="#08B6FF" />
      </svg>
    </button>
  );
}
