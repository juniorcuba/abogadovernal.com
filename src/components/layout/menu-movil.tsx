"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { sedes } from "@/lib/sedes";
import { site, socialsCabecera } from "@/lib/site";

/**
 * Menú móvil — artboards `VESPER AGENCY LANDING - MENU` (402×886, con las
 * sedes abiertas) y `… MENU MOBILE FULL` (402×979, con las sedes y "Nosotros"
 * abiertos). Los dos son el mismo menú en dos estados: la diferencia son los
 * 85 que ocupa el desplegable de "Nosotros".
 *
 *   fondo      #0F0F10 a toda la pantalla, sin el degradado de la cabecera
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
 * OJO: el artboard trae "Testimoniales" en el menú. Se deja fuera, como en el
 * de escritorio, hasta que haya consentimiento firmado de los clientes.
 */

const ENLACE =
  "block text-[20px] leading-[21px] font-light text-white transition-colors hover:text-vernal-accent";

export function MenuMovil() {
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
        aria-label="Abrir menú"
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

      {abierto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#0F0F10]"
        >
          {/* Cabecera del panel, en las coordenadas de la barra de siempre. */}
          <div className="relative h-[70px] shrink-0">
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar menú"
              className="absolute top-[18px] left-[22px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center"
            >
              <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1 1L19 19M19 1L1 19"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Link href="/" onClick={cerrar} className="absolute top-[16px] left-[172px] block">
              <Logo className="h-[40px] w-[57px]" />
            </Link>
            <div className="absolute top-[24px] left-[327px] flex gap-x-[12px] text-[14px] leading-[15px] font-medium">
              <span className="text-white">ES</span>
              <span className="text-[#323B4C]">EN</span>
            </div>
          </div>

          <nav className="px-[43px] pt-[61px] pb-[40px]">
            <ul className="flex flex-col gap-y-[28px]">
              <li>
                <Link href="/" onClick={cerrar} className={ENLACE}>
                  Inicio
                </Link>
              </li>

              <li>
                <Desplegable
                  etiqueta="Nosotros"
                  abierto={desplegados.nosotros}
                  alternar={() => alternar("nosotros")}
                />
                {desplegados.nosotros && (
                  <ul className="mt-[26px] flex flex-col gap-y-[20px] pl-[63px]">
                    <li>
                      <Link href="/nosotros" onClick={cerrar} className={ENLACE}>
                        Abogado Vernal
                      </Link>
                    </li>
                    <li>
                      <Link href="/nuestro-equipo" onClick={cerrar} className={ENLACE}>
                        Nuestro Equipo
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Desplegable
                  etiqueta={["Áreas de practica", "& servicios"]}
                  abierto={desplegados.areas}
                  alternar={() => alternar("areas")}
                />
                {desplegados.areas && (
                  <ul className="mt-[28px] flex flex-col gap-y-[20px]">
                    {sedes.map((s) => (
                      <li key={s.slug} className="flex items-center gap-x-[16px] pl-[27px]">
                        <Image
                          src="/icons/menu/edificio.svg"
                          alt=""
                          aria-hidden
                          width={17}
                          height={18}
                          className="h-[18px] w-[17px] shrink-0"
                        />
                        <Link
                          href={`/areas-de-servicio/${s.slug}`}
                          onClick={cerrar}
                          className={ENLACE}
                        >
                          {s.rotulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link href="/blog" onClick={cerrar} className={ENLACE}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/faqs" onClick={cerrar} className={`${ENLACE} font-normal`}>
                  FAQS
                </Link>
              </li>
              <li>
                <Link href="/contacto" onClick={cerrar} className={`${ENLACE} font-normal`}>
                  Contacto
                </Link>
              </li>
            </ul>

            <p className="mt-[51px] text-center text-[16px] leading-[17px] text-white">
              Llamanós{" "}
              <a href={site.phoneHref} className="text-vernal-accent font-bold">
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
              © 2026 – ABOGADO VERNAL. All right reserved.
              <br />
              <Link href={site.privacyUrl} onClick={cerrar} className="hover:text-vernal-accent">
                Políticas de privacidad.
              </Link>{" "}
              <Link href={site.termsUrl} onClick={cerrar} className="hover:text-vernal-accent">
                Términos y condiciones
              </Link>
            </p>
          </nav>
        </div>
      )}
    </div>
  );
}

/** Fila que abre un submenú. El archivo no dibuja flecha; la añadimos nosotros. */
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
      <svg
        aria-hidden
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        className={`mt-[7px] shrink-0 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
      >
        <path d="M1 1L7 7L13 1" stroke="#08B6FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
