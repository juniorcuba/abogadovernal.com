"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { sedes } from "@/lib/sedes";
import type { NavItem } from "@/lib/site";

/** La página actual, o una hija suya (las sedes cuelgan de /areas-de-servicio). */
export function esActivo(ruta: string, href: string) {
  if (href === "/") return ruta === "/";
  return ruta === href || ruta.startsWith(`${href}/`);
}

type Opcion = { label: string; href: string; edificio?: true };

/**
 * Lo que despliega cada enlace con menú. Vive aquí y no en `site.ts` porque
 * `sedes.ts` ya importa de `site.ts`: al revés sería un ciclo.
 */
const MENUS: Record<NonNullable<NavItem["menu"]>, Opcion[]> = {
  nosotros: [
    { label: "Abogado Vernal", href: "/nosotros" },
    { label: "Nuestro equipo", href: "/nuestro-equipo" },
  ],
  sedes: sedes.map((s) => ({
    label: s.rotulo,
    href: `/areas-de-servicio/${s.slug}`,
    edificio: true,
  })),
};

/**
 * Enlace del menú de escritorio. La página en la que se está va en cian, como en
 * el componente "navbar - desktop" (770:3099).
 *
 * `x` e `y` son la posición dentro de su grupo en el lienzo de 1920; por debajo
 * del lienzo el enlace fluye en el nav.
 *
 * Los que llevan `menu` despliegan al pasar el ratón o al recibir el foco
 * (componentes "drop menu 1" y "drop menu 2" de la página RECURSOS, export del
 * 2026-10-09). "Áreas de práctica & servicios" ya no tiene página propia: su
 * rótulo es un botón y solo abre las sedes.
 */
export function NavLink({
  item,
  x,
  y,
}: {
  item: NavItem;
  x: number;
  y: number;
}) {
  const ruta = usePathname();
  const activo =
    !item.sinActivo &&
    (esActivo(ruta, item.href) ||
      (item.menu ? MENUS[item.menu].some((o) => esActivo(ruta, o.href)) : false));
  const color = activo ? "text-vernal-accent" : "text-white hover:text-vernal-accent";

  // Dos líneas centradas, 16px con interlineado 1.04: la caja de 143 empieza en
  // la x del archivo y 8px por encima del resto de enlaces.
  const texto = item.lineas
    ? `text-center text-[16px] leading-[16.64px] whitespace-nowrap transition-colors ${color}`
    : `text-[16px] leading-[17px] whitespace-nowrap transition-colors ${color}`;
  const contenido = item.lineas ? (
    <>
      <span className="block">{item.lineas[0]}</span>
      <span className="block">{item.lineas[1]}</span>
    </>
  ) : (
    item.label
  );
  const caja = `design:absolute design:top-[var(--y)] design:left-[var(--x)] ${item.lineas ? "design:w-[143px]" : ""}`;
  const posicion = {
    "--x": `${x}px`,
    "--y": `${item.lineas ? y - 8 : y}px`,
  } as CSSProperties;

  if (!item.menu) {
    return (
      <Link
        href={item.href}
        aria-current={activo ? "page" : undefined}
        className={`${texto} ${caja}`}
        style={posicion}
      >
        {contenido}
      </Link>
    );
  }

  const opciones = MENUS[item.menu];
  return (
    <div className={`group relative ${caja}`} style={posicion}>
      {item.menu === "sedes" ? (
        <button
          type="button"
          aria-haspopup="true"
          className={`block w-full cursor-default ${texto}`}
        >
          {contenido}
        </button>
      ) : (
        <Link
          href={item.href}
          aria-current={activo ? "page" : undefined}
          aria-haspopup="true"
          className={`block ${texto}`}
        >
          {contenido}
        </Link>
      )}

      {/* El panel cuelga del borde de abajo de la cabecera (y128 del lienzo). El
          relleno de arriba es el hueco entre el rótulo y ese borde: forma parte
          del panel para que el ratón no "suelte" el menú al cruzarlo. */}
      <div
        className={`invisible absolute top-full left-0 z-50 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
          item.lineas ? "pt-[33px]" : "pt-[41px]"
        }`}
      >
        {/* 422 de ancho, degradado de negro a #111929 y Vernal Shadow 1. El archivo
            lo trae al 95%; aquí va opaco porque la cabecera ya aporta su 95% y con
            los dos se leía el aviso de cookies por debajo. */}
        <ul className="shadow-vernal-1 w-[422px] bg-[linear-gradient(247.1deg,#000000_18.6%,#111929_100%)]">
          {opciones.map((o) => (
            <li key={o.href} className="border-t border-[#172339] first:border-t-0">
              <Link
                href={o.href}
                aria-current={esActivo(ruta, o.href) ? "page" : undefined}
                className={`flex h-[58px] items-center justify-between pr-[43px] text-[16px] leading-[17px] whitespace-nowrap text-white transition-colors hover:text-vernal-accent ${
                  o.edificio ? "pl-[35px]" : "pl-[29px]"
                }`}
              >
                <span className="flex items-center gap-x-[19px]">
                  {o.edificio && (
                    <Image
                      src="/icons/menu/edificio.svg"
                      alt=""
                      aria-hidden
                      width={17}
                      height={18}
                      className="h-[18px] w-[17px] shrink-0"
                    />
                  )}
                  {o.label}
                </span>
                <svg
                  aria-hidden
                  width="31"
                  height="16"
                  viewBox="0 0 31 16"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M0 8H30M24 2L30 8L24 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
