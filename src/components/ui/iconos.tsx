/**
 * Iconos vectoriales sacados del export SVG de la frame 1:2.
 *
 * Los paths van tal cual salen del archivo, solo trasladados al origen para que
 * el viewBox empiece en 0,0. No están redibujados a ojo.
 */

/**
 * Flecha de los enlaces de texto ("Conoce mi historia", botón del newsletter).
 * Original en el archivo: x625..645.7, y2435.9..2450.1.
 *
 * Antes esto era el carácter "→" de la tipografía, que tiene otra proporción:
 * la punta del archivo es más pequeña y el asta más larga.
 */
export function FlechaEnlace({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 21 15"
      width={21}
      height={15}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.707 8.21C21.098 7.82 21.098 7.18 20.707 6.79L14.343 0.43C13.953 0.04 13.319 0.04 12.929 0.43C12.538 0.82 12.538 1.45 12.929 1.84L18.586 7.5L12.929 13.16C12.538 13.55 12.538 14.18 12.929 14.57C13.319 14.96 13.953 14.96 14.343 14.57L20.707 8.21ZM0 7.5V8.5H20V7.5V6.5H0V7.5Z" />
    </svg>
  );
}

/**
 * Sello de verificado de las tarjetas de testimonios: disco blanco de 33 con el
 * tick RECORTADO, no dibujado encima. Por eso el tick toma el color de lo que
 * haya detrás —la foto de la tarjeta— y cambia de una tarjeta a otra.
 *
 * El recorte sale de que el path trae el círculo y el tick como subtrazos
 * opuestos; con `fill-rule="evenodd"` el segundo agujerea al primero.
 */
export function SelloVerificado({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 33 33"
      width={33}
      height={33}
      fill="white"
      fillRule="evenodd"
      aria-hidden
      className={className}
    >
      <path d="M33 16.5C33 25.62 25.615 33 16.5 33C7.385 33 0 25.62 0 16.5C0 7.38 7.385 0 16.5 0C25.615 0 33 7.38 33 16.5ZM8.477 18.13L12.791 22.4C13.537 23.15 14.781 23.18 15.548 22.4L24.685 13.16C25.431 12.41 25.172 11.2 24.49 10.56C23.809 9.93 22.642 9.76 21.917 10.49L14.164 18.25L11.213 15.33C10.434 14.56 9.169 14.65 8.466 15.38C7.763 16.1 7.677 17.32 8.488 18.13H8.477Z" />
    </svg>
  );
}

/**
 * "Abrir en una pestaña nueva", al final de cada área de práctica del acordeón
 * de /areas-de-servicio. Caja de 22 en el archivo.
 */
export function IconoEnlaceExterno({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      width={22}
      height={22}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.14 14C18.26 13.28 18.8 12.91 19.42 12.91C20.01 12.9 20.72 13.3 20.72 14.01V19.51C20.72 21.06 19.37 22 17.91 22H2.86C1.15 22 0 20.83 0 19.12L0.01 4.04C0.01 2.64 0.95 1.31 2.42 1.3H8.05C8.69 1.3 9.15 2 9.07 2.56C9.15 3.38 8.52 3.9 7.75 3.89H2.62V19.39H18.13L18.14 14Z" />
      <path d="M19.37 4.51L12.5 11.33C11.98 11.84 11.2 11.7 10.76 11.25C10.25 10.74 10.24 9.95 10.77 9.41L17.49 2.68L14.14 2.59C13.46 2.52 13 2.07 12.96 1.38C12.92 0.75 13.31 0.01 14.03 0.01L20.91 0C21.39 0 22 0.46 22 0.99L21.99 8.08C21.99 8.72 21.21 9.07 20.71 9.06C20.06 9.04 19.55 8.65 19.44 7.99L19.37 4.51V4.51Z" />
    </svg>
  );
}
