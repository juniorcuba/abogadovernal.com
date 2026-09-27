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
}: {
  id: string;
  ancho: number;
  alto: number;
  transformacion: string;
  grosor?: number;
}) {
  return (
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
  );
}

