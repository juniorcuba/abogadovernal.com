"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import type { NavItem } from "@/lib/site";

/** La página actual, o una hija suya (las sedes cuelgan de /areas-de-servicio). */
export function esActivo(ruta: string, href: string) {
  if (href === "/") return ruta === "/";
  return ruta === href || ruta.startsWith(`${href}/`);
}

/**
 * Enlace del menú de escritorio. La página en la que se está va en cian, como en
 * el componente "navbar - desktop" (770:3099).
 *
 * `x` e `y` son la posición dentro de su grupo en el lienzo de 1920; por debajo
 * del lienzo el enlace fluye en el nav.
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
  const activo = esActivo(usePathname(), item.href);
  const color = activo ? "text-vernal-accent" : "text-white hover:text-vernal-accent";

  if (item.lineas) {
    // Dos líneas centradas, 16px con interlineado 1.04: la caja de 143 empieza
    // en la x del archivo y 8px por encima del resto de enlaces.
    return (
      <Link
        href={item.href}
        aria-current={activo ? "page" : undefined}
        className={`text-center text-[16px] leading-[16.64px] whitespace-nowrap transition-colors design:absolute design:top-[var(--y)] design:left-[var(--x)] design:w-[143px] ${color}`}
        style={{ "--x": `${x}px`, "--y": `${y - 8}px` } as CSSProperties}
      >
        <span className="block">{item.lineas[0]}</span>
        <span className="block">{item.lineas[1]}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={activo ? "page" : undefined}
      className={`text-[16px] leading-[17px] whitespace-nowrap transition-colors design:absolute design:top-[var(--y)] design:left-[var(--x)] ${color}`}
      style={{ "--x": `${x}px`, "--y": `${y}px` } as CSSProperties}
    >
      {item.label}
    </Link>
  );
}
