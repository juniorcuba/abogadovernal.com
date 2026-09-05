import Link from "next/link";

/**
 * Botón del diseño — nodos 6:47/6:48 (Enviar), 51:8/51:9, 73:37/73:38, 73:34/73:35.
 * Todos comparten forma: 52px de alto, sin radio, fondo #08b6ff y
 * texto Poppins Regular 16px en #172339.
 */

const base =
  "inline-flex h-[52px] items-center justify-center px-6 text-[16px] leading-[17px] transition-opacity hover:opacity-90";

const variants = {
  accent: "bg-vernal-accent text-vernal-navy",
  green: "bg-vernal-green text-vernal-navy",
} as const;

type Variant = keyof typeof variants;

export function Button({
  children,
  variant = "accent",
  className,
  type = "submit",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "submit" | "button";
}) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "accent",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
