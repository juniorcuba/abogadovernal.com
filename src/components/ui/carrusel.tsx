"use client";

import { useCallback, useState, type ReactNode } from "react";

/**
 * Carrusel de rotación infinita.
 *
 * Las secciones del diseño colocan cada tarjeta en una coordenada X fija. En vez
 * de desplazar una tira (que rompería esas posiciones), aquí lo que rota es el
 * ORDEN de los datos: las ranuras se quedan donde el archivo las pone y cambia
 * qué elemento cae en cada una. Así el carrusel es infinito por construcción
 * —nunca hay un extremo— y el diseño se respeta al píxel.
 *
 * `children` recibe el elemento y el índice de RANURA (no el del dato), que es lo
 * que hace falta para posicionarlo.
 */
type Props<T> = {
  items: T[];
  children: (item: T, ranura: number) => ReactNode;
  className?: string;
  /** Recibe los controles para pintar las flechas donde el diseño las coloca. */
  controles?: (c: {
    anterior: () => void;
    siguiente: () => void;
    puede: boolean;
  }) => ReactNode;
};

export function Carrusel<T>({ items, children, className, controles }: Props<T>) {
  const [inicio, setInicio] = useState(0);
  const n = items.length;

  const anterior = useCallback(() => setInicio((i) => (i - 1 + n) % n), [n]);
  const siguiente = useCallback(() => setInicio((i) => (i + 1) % n), [n]);

  const vista = Array.from({ length: n }, (_, i) => items[(inicio + i) % n]);

  return (
    <>
      <ul className={className}>{vista.map((item, i) => children(item, i))}</ul>
      {controles?.({ anterior, siguiente, puede: n > 1 })}
    </>
  );
}
