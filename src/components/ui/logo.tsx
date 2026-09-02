import Image from "next/image";

/**
 * Logo Abogado Vernal — nodo Figma 6:72 ("Layer_1"), 111×78.
 * En el archivo son dos capas superpuestas: el bloque completo (6:72) y el
 * grupo "ABOGADO" encima (6:73), posicionado con inset 7.34% 6.25% 46.4% 6.31%.
 * Se replican ambas: pintar solo una deja el logo a medias.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={`relative h-[78px] w-[111px] shrink-0 overflow-clip ${className ?? ""}`}
    >
      <Image
        src="/brand/logo-vernal.svg"
        alt=""
        fill
        priority
        className="object-contain"
      />
      <span className="absolute inset-[7.34%_6.25%_46.4%_6.31%]">
        <Image
          src="/brand/logo-vernal-mark.svg"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </span>
    </div>
  );
}
