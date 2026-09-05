"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

/** Ancho del artboard de Figma. Toda la maqueta está posicionada sobre él. */
const ANCHO_DISENO = 1920;

/** Por debajo de esto se usa la maqueta apilada en vez del diseño escalado. */
const MINIMO = 1280;

/**
 * useLayoutEffect avisa por consola cuando se ejecuta en el servidor, donde no
 * hay layout que medir. En el cliente sí lo queremos: corre antes de pintar, así
 * que la escala ya está puesta en el primer fotograma tras hidratar.
 */
const useEfectoDeLayout =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Lienzo del diseño.
 *
 * El diseño solo existe a 1920. Cuando esa medida era un media query, cualquiera
 * con un portátil de 1366 o 1440 —o sea, casi todo el mundo— veía adaptaciones
 * improvisadas por mí en lugar del diseño real, y de ahí venía el "se ve muy
 * distinto" en algunas secciones.
 *
 * Aquí el contenido se maqueta SIEMPRE a 1920 y se escala para caber en la
 * ventana: a 1440 se ve el diseño tal cual, solo que más pequeño. Cero invención,
 * porque es el diseño mismo.
 *
 * Se escala con `zoom` y no con `transform: scale()` porque zoom sí participa en
 * el flujo, así que la altura del documento se ajusta sola; con transform habría
 * que compensarla a mano. A cambio, zoom NO afecta a los media queries
 * (comprobado), y por eso `design:` es una clase y no un breakpoint: si fuera un
 * breakpoint nunca se activaría a 1440 aunque el lienzo interno midiera 1920.
 */
export function LienzoDiseno({ children }: { children: ReactNode }) {
  const [escala, setEscala] = useState<number | null>(null);

  useEfectoDeLayout(() => {
    const medir = () => {
      // clientWidth y no innerWidth: descuenta la barra de scroll. Con innerWidth
      // el lienzo quedaría unos píxeles más ancho que el hueco disponible y
      // aparecería scroll horizontal.
      const w = document.documentElement.clientWidth;
      setEscala(w >= MINIMO ? Math.min(1, w / ANCHO_DISENO) : null);
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const enDiseno = escala !== null;

  return (
    // El script en línea de layout.tsx ya deja puestos clase y estilo antes de
    // hidratar, así que el marcado del servidor y el del cliente no coinciden a
    // propósito. suppressHydrationWarning evita que React deshaga ese trabajo.
    <div
      suppressHydrationWarning
      className={enDiseno ? "modo-diseno" : undefined}
      style={enDiseno ? { width: ANCHO_DISENO, zoom: escala } : undefined}
    >
      {children}
    </div>
  );
}
