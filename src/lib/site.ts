/**
 * Datos de contacto y sedes de la firma.
 * Fuente: archivo de Figma "ABOGADO-VERNAL-WEB" (nodos 6:56, 83:123, 62:76–101:64).
 * Verificar contra el cliente antes de publicar: son datos de contacto reales.
 */

export const site = {
  name: "Abogado Vernal",
  legalName: "The Law Office Of Vernal Farnum Mejía",
  url: "https://abogadovernal.com",
  phone: "+ 1-833-887-7273", // el archivo (nodos 6:56 y 59:71) trae 877: es una errata, el cliente confirmó 887 el 2026-10-09
  phoneHref: "tel:+18338877273",
  email: "info@farnumlawfirm.com",
  tagline: "Somos inmigrantes como tú y defendemos tus derechos.",
  /**
   * Enlaces legales. Los dos son ya rutas propias; las URL antiguas
   * (/politicas_privacidad.html y /terminos_condiciones.html) redirigen a ellas
   * desde next.config.ts.
   */
  privacyUrl: "/politicas-de-privacidad",
  termsUrl: "/terminos-y-condiciones",
  /**
   * Canal de las transmisiones. El botón "Ver retransmisiones" del home iba a
   * /transmisiones, una página que el archivo de diseño no trae; hasta que la
   * haya, lleva al canal.
   */
  youtube: "https://www.youtube.com/@abogadovernal",
} as const;

export type Office = {
  city: string;
  address: string;
};

/**
 * Las direcciones van LITERALES del archivo de Figma, con su puntuación tal cual:
 * Austin sin comas y con "Tx", San Antonio con "LOOP" en mayúsculas. Están
 * pendientes de que el cliente las confirme; si las corrige, se corrigen aquí y
 * cambian a la vez en el footer y en el bloque de las 5 sedes.
 */
export const offices: Office[] = [
  { city: "Dallas", address: "7929 Brookriver Dr #540, Dallas, TX 75247" },
  { city: "Fort Worth", address: "2001 Beach St Suite #225, Fort Worth, TX 76103" },
  { city: "Houston", address: "10333 Harwin Dr. Suite 105, Houston, TX 77036" },
  { city: "Austin", address: "13809 Research Blvd Suite 745 Austin Tx 78750" },
  { city: "San Antonio", address: "1802 NE LOOP 410 Ste 120 San Antonio TX 78217" },
];

export type NavItem = {
  label: string;
  href: string;
  /** x del enlace en el lienzo de 1920; los huecos entre ellos no son iguales. */
  x: number;
  /** A qué lado del logo va. */
  grupo: "izq" | "der";
  /** Cómo parte el texto la cabecera de escritorio, si va en dos líneas. */
  lineas?: [string, string];
};

/**
 * Nav del header, en el orden del diseño (componente "navbar - desktop",
 * 770:3099, 2026-09-19). "Áreas de práctica & servicios" lleva a
 * /areas-de-servicio y a sus sedes; el archivo escribe "practica" sin tilde.
 *
 * TEMPORAL: "Testimoniales" (x644) está fuera hasta que lleguen los permisos
 * por escrito de los clientes que salen en esa página. Basta con descomentar la
 * línea para devolverla a su sitio; por eso la x va con cada enlace y no en una
 * lista aparte, para que quitar uno no descoloque a los demás.
 */
export const navItems: NavItem[] = [
  { label: "Inicio", href: "/", x: 242, grupo: "izq" },
  { label: "Nosotros", href: "/nosotros", x: 336, grupo: "izq" },
  {
    label: "Áreas de práctica & servicios",
    href: "/areas-de-servicio",
    x: 454,
    grupo: "izq",
    lineas: ["Áreas de práctica", "& servicios"],
  },
  // { label: "Testimoniales", href: "/testimoniales", x: 644, grupo: "izq" },
  { label: "Blogs", href: "/blog", x: 802, grupo: "izq" },
  { label: "FAQS", href: "/faqs", x: 1083, grupo: "der" },
  { label: "Contacto", href: "/contacto", x: 1169, grupo: "der" },
];

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  /** Tamaño exacto del nodo en Figma. Instagram mide 29×30, no 30×30. */
  width: number;
  height: number;
};

/**
 * Iconos exportados de Figma (nodos 21:82, 21:79, 21:73, 21:69), en el orden del
 * footer. URLs del componente "navbar - desktop" (770:3099); el archivo las trae
 * con espacios sobrantes y la de TikTok como "https:// www…", aquí ya limpias.
 */
export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/AbogadoVernal", icon: "/icons/social/facebook.svg", width: 30, height: 30 },
  { label: "TikTok", href: "https://www.tiktok.com/@abogadovernal", icon: "/icons/social/tiktok.svg", width: 30, height: 30 },
  { label: "Instagram", href: "https://www.instagram.com/abogadovernal", icon: "/icons/social/instagram.svg", width: 29, height: 30 },
  { label: "YouTube", href: "https://www.youtube.com/@abogadovernal", icon: "/icons/social/youtube.svg", width: 30, height: 30 },
];

/**
 * La cabecera de escritorio usa otros iconos (25×25, componente 770:3099) y otro
 * orden que el footer: Instagram antes que TikTok.
 */
export const socialsCabecera: SocialLink[] = ["Facebook", "Instagram", "TikTok", "YouTube"].map(
  (nombre) => {
    const s = socials.find((x) => x.label === nombre)!;
    return { ...s, icon: `/icons/social/cabecera-${nombre.toLowerCase()}.svg`, width: 25, height: 25 };
  },
);
