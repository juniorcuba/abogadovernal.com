import Image from "next/image";

/**
 * Campo del formulario del hero — nodos 6:39/6:41/6:43/6:44/6:94 (fondo) y
 * 6:40/6:42/6:45/6:46/6:95 (etiqueta).
 * Fondo rgba(255,255,255,0.97), sin radio, 52px de alto.
 * Icono a 12px del borde, etiqueta 17px después, Poppins Regular 15px negro.
 */

type FieldProps = {
  name: string;
  label: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  type?: "text" | "email" | "tel";
  required?: boolean;
  className?: string;
};

export function Field({
  name,
  label,
  icon,
  iconWidth,
  iconHeight,
  type = "text",
  required,
  className,
}: FieldProps) {
  return (
    <div
      className={`flex h-[52px] items-center bg-white/97 pl-3 ${className ?? ""}`}
    >
      <Image
        src={icon}
        alt=""
        width={iconWidth}
        height={iconHeight}
        style={{ width: iconWidth, height: iconHeight }}
        className="max-w-none shrink-0"
      />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        aria-label={label}
        className="ml-[17px] h-full w-full bg-transparent text-[15px] leading-[1.04] text-black outline-none placeholder:text-black"
      />
    </div>
  );
}

/** Variante textarea para "Comentarios" (nodo 6:94, 565×52). */
export function FieldArea({
  name,
  label,
  icon,
  iconWidth,
  iconHeight,
  className,
}: Omit<FieldProps, "type" | "required">) {
  return (
    <div
      className={`flex h-[52px] items-center bg-white/97 pl-3 ${className ?? ""}`}
    >
      <Image
        src={icon}
        alt=""
        width={iconWidth}
        height={iconHeight}
        style={{ width: iconWidth, height: iconHeight }}
        className="max-w-none shrink-0"
      />
      <textarea
        id={name}
        name={name}
        rows={1}
        placeholder={label}
        aria-label={label}
        className="ml-[17px] h-full w-full resize-none bg-transparent pt-[17px] text-[15px] leading-[1.04] text-black outline-none placeholder:text-black"
      />
    </div>
  );
}

/**
 * Desplegable "Oficina o modalidad de atención" — nodos 6:44 (fondo del campo),
 * 6:46 (etiqueta, 169×35: DOS líneas) y 129:2237 ("Group 108"): botón de 50×52
 * en #08b6ff con un triángulo de 14×14 en #172339, pegado al borde derecho.
 *
 * La etiqueta de dos líneas va superpuesta porque un <select> nativo no la parte;
 * se oculta sola al elegir opción (ver .select-placeholder en globals.css).
 */
export function FieldSelect({
  name,
  label,
  icon,
  iconWidth,
  iconHeight,
  options,
  className,
}: Omit<FieldProps, "type" | "required"> & { options: string[] }) {
  return (
    <div className={`relative flex h-[52px] items-center bg-white/97 pl-3 ${className ?? ""}`}>
      <Image
        src={icon}
        alt=""
        width={iconWidth}
        height={iconHeight}
        style={{ width: iconWidth, height: iconHeight }}
        className="max-w-none shrink-0"
      />
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-label={label}
        className="ml-[17px] h-full w-full appearance-none bg-transparent pr-[50px] text-[15px] leading-[1.04] text-black outline-none"
      >
        <option value="" disabled hidden />
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="select-placeholder pointer-events-none absolute top-1/2 left-[48px] w-[169px] -translate-y-1/2 text-[15px] leading-[1.17] text-black"
      >
        {label}
      </span>
      <span
        aria-hidden
        className="bg-vernal-accent pointer-events-none absolute inset-y-0 right-0 flex w-[50px] items-center justify-center"
      >
        <span className="border-t-[14px] border-r-[7px] border-l-[7px] border-t-vernal-navy border-r-transparent border-l-transparent" />
      </span>
    </div>
  );
}
