/**
 * Entradas del blog — frame `703:807` de Figma (/blog, 2026-09-26).
 *
 * Cada tarjeta lleva a su artículo de `articulo.ts` por `slug`. Las fotos y sus
 * encuadres son los del archivo; títulos, entradillas y etiquetas son ya los de
 * los artículos reales (2026-10-12): la primera es la del diseño y las otras
 * cinco, las del documento del despacho. La tercera tarjeta era en el archivo
 * "Esta nueva política podría acercarte a tu visa.", que no tiene artículo: su
 * hueco y su foto son ahora del de ajuste de estatus.
 *
 * Las etiquetas salen de los filtros de /blog, elegidas a mano: el documento no
 * trae ninguna.
 *
 * `foto` es el encuadre exacto dentro de la tarjeta de 438×575. `heroFoco` es
 * el `object-position` de esa misma foto en la cabecera del artículo: en 1920
 * la caja es tan apaisada que solo cabe media foto, y sin él se corta la cara.
 */
export type EntradaBlog = {
  slug: string;
  imagen: string;
  titulo: string;
  resumen: string;
  etiquetas: string[];
  foto: { w: number; h: number; x: number; y: number };
  heroFoco?: string;
};

export const entradasBlog: EntradaBlog[] = [
  {
    slug: "visa-vawa-camino-libertad-residencia",
    imagen: "/images/testimoniales/blog-1.webp",
    titulo: "Visa VAWA: Tu camino\nhacia la libertad y la\nresidencia legal en EE.\nUU.",
    resumen:
      "Vivir en Estados Unidos bajo el temor constante a la deportación es un reto enorme...",
    etiquetas: ["Visa VAWA", "Naturalización"],
    foto: { w: 1183, h: 649, x: -493, y: -51 },
  },
  {
    slug: "importancia-documentos-migratorios",
    imagen: "/images/testimoniales/blog-2.webp",
    titulo: "La importancia de\ntener en orden tus\ndocumentos",
    resumen:
      "Una de las cosas que más retrasa o complica un caso migratorio no es, casi nunca, la ley...",
    etiquetas: ["Documentos"],
    foto: { w: 905, h: 496, x: -69, y: -92 },
  },
  {
    slug: "ajuste-de-estatus-como-aplicar",
    imagen: "/images/testimoniales/blog-3.webp",
    titulo: "Ajuste de estatus:\ncómo aplicar, en\ntérminos generales",
    resumen:
      '"Ajuste de estatus" es uno de esos términos que escuchamos todo el tiempo en consulta...',
    etiquetas: ["Ajuste de estatus", "Petición Familiar"],
    foto: { w: 1183, h: 649, x: -408, y: -74 },
    heroFoco: "50% 0%",
  },
  {
    slug: "visa-t-puede-cambiar-tu-situacion",
    imagen: "/images/blog/articulo-4.webp",
    titulo: "Conoce cómo la\nVisa T puede\ncambiar tu situación",
    resumen:
      "La Visa T existe para una razón muy concreta: proteger a personas que han sido víctimas...",
    etiquetas: ["Visa T", "Visas Humanitarias"],
    foto: { w: 685, h: 459, x: -82, y: -9 },
    heroFoco: "50% 0%",
  },
  {
    slug: "habeas-corpus-que-es-quienes-lo-solicitan",
    imagen: "/images/blog/articulo-5.webp",
    titulo: "¿De qué se trata el\nHabeas Corpus y\nquiénes lo solicitan?",
    resumen:
      "En los últimos meses hemos escuchado mucho esta palabra en noticias relacionadas con...",
    etiquetas: ["Habeas Corpus", "Deportación"],
    foto: { w: 476, h: 718, x: 0, y: -117 },
    heroFoco: "50% 15%",
  },
  {
    slug: "requisitos-visa-vawa",
    imagen: "/images/blog/articulo-6.webp",
    titulo: "Requisitos para la\nVisa VAWA: lo que\ndebes saber si has\nvivido abuso",
    resumen:
      "Cuando hablamos de VAWA, muchas personas piensan que solo aplica para mujeres o que es...",
    etiquetas: ["Visa VAWA", "Visas Humanitarias"],
    foto: { w: 856, h: 575, x: -182, y: -58 },
    heroFoco: "50% 0%",
  },
];

/**
 * La y del título dentro de la tarjeta de 438×575. El archivo la coloca a mano
 * según las líneas que ocupe: 248.4 con cuatro y de 265 a 280 con tres. `tabla`
 * es la del hueco en el diseño, que solo vale si el título que cae ahí tiene
 * las mismas líneas que el del archivo.
 */
export function topTitulo(titulo: string, tabla: number): number {
  if (titulo.split("\n").length >= 4) return 248.4;
  return tabla < 260 ? 268.4 : tabla;
}

/**
 * Las tres que cierran /testimoniales. El archivo de testimoniales titula la
 * primera "Requisitos para la Visa VAWA" sobre la foto de la primera de /blog:
 * se queda con esa foto y ese título, y lleva al artículo de los requisitos.
 */
export const entradasBlogPortada: EntradaBlog[] = [
  {
    ...entradasBlog[5],
    imagen: entradasBlog[0].imagen,
    foto: entradasBlog[0].foto,
    titulo: "Requisitos para la\nVisa VAWA",
  },
  entradasBlog[1],
  entradasBlog[2],
];

/**
 * Filtros de /blog. El archivo marca cuatro como activos (fondo azul marino) y
 * el resto con solo el borde; aquí el estado vive en el componente.
 */
export const filtrosBlog = [
  { texto: "Visa U", ancho: 77, activo: true },
  { texto: "Visa VAWA", ancho: 111, activo: true },
  { texto: "Petición Familiar", ancho: 155, activo: false },
  { texto: "Naturalización", ancho: 139, activo: false },
  { texto: "Deportación", ancho: 132, activo: false },
  { texto: "Visa T", ancho: 77, activo: true },
  { texto: "Visas juveniles", ancho: 137, activo: false },
  { texto: "Visa K1", ancho: 81, activo: false },
  { texto: "Habeas Corpus", ancho: 139, activo: false },
  { texto: "Visas Humanitarias", ancho: 178, activo: false },
];
