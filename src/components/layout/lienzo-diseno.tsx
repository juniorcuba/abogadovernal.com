"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Los dos artboards de Figma. Cada maqueta está posicionada sobre el suyo. */
const ANCHO_DISENO = 1920;
const ANCHO_MOVIL = 402;

/** Desde aquí se usa el lienzo de escritorio. */
const MINIMO_DISENO = 1280;

/**
 * Hasta aquí se usa el lienzo móvil. Ampliar un diseño de 402 más allá de esto
 * lo deja gigante: a 560 ya va al 1.39.
 */
const MAXIMO_MOVIL = 560;

/**
 * useLayoutEffect avisa por consola cuando se ejecuta en el servidor, donde no
 * hay layout que medir. En el cliente sí lo queremos: corre antes de pintar, así
 * que la escala ya está puesta en el primer fotograma tras hidratar.
 */
const useEfectoDeLayout =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type Lienzo = { clase: string; ancho: number; escala: number } | null;

/**
 * Qué lienzo toca.
 *
 * `ventana` (innerWidth) decide el lienzo y `util` (clientWidth) la escala. El
 * umbral tiene que ver el MISMO ancho que los media queries, que incluyen la
 * barra de scroll: en Windows, una ventana de 1280 deja 1263 útiles, y si el
 * umbral mirara esos 1263 elegiría la maqueta apilada mientras las clases `xl:`
 * (≥1280) ya se aplican. La cabecera quedaba a medio camino entre las dos, con
 * el logo descentrado.
 */
export function lienzoPara(ventana: number, util: number = ventana): Lienzo {
  const w = util;
  if (ventana >= MINIMO_DISENO) {
    return {
      clase: "modo-diseno",
      ancho: ANCHO_DISENO,
      escala: Math.min(1, w / ANCHO_DISENO),
    };
  }
  if (ventana <= MAXIMO_MOVIL) {
    return { clase: "modo-movil", ancho: ANCHO_MOVIL, escala: w / ANCHO_MOVIL };
  }
  return null;
}

/**
 * Lienzo del diseño.
 *
 * Hay DOS diseños, uno de 1920 y otro de 402, y ninguno cubre las medidas
 * intermedias. En vez de adaptarlos a ojo, cada uno se maqueta a su tamaño real
 * y se ESCALA para caber en la ventana: a 1440 se ve el de escritorio tal cual,
 * solo más pequeño, y a 430 el de móvil. Cero invención, porque es el diseño
 * mismo, y además se puede verificar midiendo contra el render del artboard.
 *
 *   ≥ 1280   lienzo de escritorio, 1920 escalado
 *   561–1279 maqueta apilada, que no la cubre ningún diseño y es criterio propio
 *   ≤ 560    lienzo móvil, 402 escalado
 *
 * Se escala con `zoom` y no con `transform: scale()` porque zoom sí participa en
 * el flujo, así que la altura del documento se ajusta sola; con transform habría
 * que compensarla a mano. A cambio, zoom NO afecta a los media queries
 * (comprobado), y por eso `design:` y `movil:` son clases y no breakpoints: si
 * fueran breakpoints nunca se activarían, porque las media queries siguen viendo
 * el ancho real de la ventana y no el del lienzo.
 */
export function LienzoDiseno({ children }: { children: ReactNode }) {
  const [lienzo, setLienzo] = useState<Lienzo>(null);

  useEfectoDeLayout(() => {
    const medir = () => {
      // La escala usa clientWidth y no innerWidth: descuenta la barra de scroll.
      // Con innerWidth el lienzo quedaría unos píxeles más ancho que el hueco
      // disponible y aparecería scroll horizontal.
      setLienzo(
        lienzoPara(window.innerWidth, document.documentElement.clientWidth),
      );
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  return (
    // El script en línea de layout.tsx ya deja puestos clase y estilo antes de
    // hidratar, así que el marcado del servidor y el del cliente no coinciden a
    // propósito. suppressHydrationWarning evita que React deshaga ese trabajo.
    <div
      suppressHydrationWarning
      className={lienzo?.clase}
      style={
        lienzo
          ? ({
              width: lienzo.ancho,
              zoom: lienzo.escala,
              "--escala": lienzo.escala,
            } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
