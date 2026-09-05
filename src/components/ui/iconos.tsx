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
