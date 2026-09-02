/**
 * Datos de contacto y sedes de la firma.
 * Fuente: archivo de Figma "ABOGADO-VERNAL-WEB" (nodos 6:56, 83:123, 62:76–101:64).
 * Verificar contra el cliente antes de publicar: son datos de contacto reales.
 */

export const site = {
  name: "Abogado Vernal",
  legalName: "The Law Office Of Vernal Farnum Mejía",
  url: "https://abogadovernal.com",
  phone: "+ 1-833-877-7273", // literal del archivo (nodos 6:56 y 59:71), con espacio tras el +
  phoneHref: "tel:+18338777273",
  email: "info@farnumlawfirm.com",
  tagline: "Somos inmigrantes como tú y defendemos tus derechos.",
  /**
   * URLs de los hyperlinks del aviso legal (nodo 59:74). Apuntan al sitio actual;
   * al migrar habrá que decidir si se sirven como rutas propias de Next.
   */
  privacyUrl: "https://abogadovernal.com/politicas_privacidad.html",
  termsUrl: "https://abogadovernal.com/terminos_condiciones.html",
} as const;

export type Office = {
  city: string;
  address: string;
};

export const offices: Office[] = [
  { city: "Dallas", address: "7929 Brookriver Dr #540, Dallas, TX 75247" },
  { city: "Fort Worth", address: "2001 Beach St Suite #225, Fort Worth, TX 76103" },
  { city: "Houston", address: "10333 Harwin Dr. Suite 105, Houston, TX 77036" },
  { city: "Austin", address: "13809 Research Blvd Suite 745, Austin, TX 78750" },
  { city: "San Antonio", address: "1802 NE Loop 410 Ste 120, San Antonio, TX 78217" },
];

export type NavItem = {
  label: string;
  href: string;
};

/** Nav del header, en el orden del diseño (nodos 6:89, 6:50, 6:51, 6:52, 6:53, 6:54, 6:55). */
export const navItems: NavItem[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Áreas de servicio", href: "/areas-de-servicio" },
  { label: "Áreas de práctica", href: "/areas-de-practica" },
  { label: "Testimoniales", href: "/testimoniales" },
  { label: "Blogs", href: "/blog" },
  { label: "FAQS", href: "/faqs" },
  { label: "Contacto", href: "/contacto" },
];

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  /** Tamaño exacto del nodo en Figma. Instagram mide 29×30, no 30×30. */
  width: number;
  height: number;
};

/** Iconos exportados de Figma (nodos 21:82, 21:79, 21:73, 21:69). URLs pendientes de confirmar. */
export const socials: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "/icons/social/facebook.svg", width: 30, height: 30 },
  { label: "TikTok", href: "#", icon: "/icons/social/tiktok.svg", width: 30, height: 30 },
  { label: "Instagram", href: "#", icon: "/icons/social/instagram.svg", width: 29, height: 30 },
  { label: "YouTube", href: "#", icon: "/icons/social/youtube.svg", width: 30, height: 30 },
];
