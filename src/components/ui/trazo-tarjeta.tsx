/**
 * Trazo de 11 del borde de las tarjetas, centrado en el borde (5.5 fuera y 5.5
 * dentro), con el degradado radial girado del archivo.
 */
export function TrazoTarjeta({
  id,
  ancho,
  alto,
  transformacion,
  grosor = 11,
  movil,
}: {
  id: string;
  ancho: number;
  alto: number;
  transformacion: string;
  grosor?: number;
  /**
   * El mismo trazo para el lienzo de 402. Ahí la tarjeta la mide su contenido,
   * así que el SVG se estira a la caja: la diferencia con el alto del archivo
   * es de unos pocos píxeles y el degradado no se entera.
   */
  movil?: { ancho: number; alto: number; transformacion: string; grosor?: number };
}) {
  return (
    <>
    <svg
      aria-hidden
      className="pointer-events-none absolute hidden overflow-visible design:block"
      style={{ left: 0, top: 0, width: ancho, height: alto }}
      viewBox={`0 0 ${ancho} ${alto}`}
    >
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={transformacion}>
          <stop stopColor="#172339" />
          <stop offset="1" stopColor="#0F0F0F" />
        </radialGradient>
      </defs>
      <rect width={ancho} height={alto} fill="none" stroke={`url(#${id})`} strokeWidth={grosor} />
    </svg>
    {movil && (
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible movil:block"
        viewBox={`0 0 ${movil.ancho} ${movil.alto}`}
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id={`${id}-movil`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={movil.transformacion}>
            <stop stopColor="#172339" />
            <stop offset="1" stopColor="#0F0F0F" />
          </radialGradient>
        </defs>
        <rect width={movil.ancho} height={movil.alto} fill="none" stroke={`url(#${id}-movil)`} strokeWidth={movil.grosor ?? 11} />
      </svg>
    )}
    </>
  );
}

