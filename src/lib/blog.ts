/**
 * Entradas del blog — frame `703:807` de Figma (/blog, 2026-09-26).
 *
 * El archivo repite la misma entradilla y las mismas dos etiquetas en las seis
 * tarjetas: es texto de relleno, pendiente de los artículos reales. Los títulos
 * sí son distintos y van literales, con sus erratas ("¿De que se trata…").
 *
 * `foto` es el encuadre exacto dentro de la tarjeta de 438×575.
 */
export type EntradaBlog = {
  imagen: string;
  titulo: string;
  foto: { w: number; h: number; x: number; y: number };
};

export const entradasBlog: EntradaBlog[] = [
  {
    imagen: "/images/testimoniales/blog-1.webp",
    titulo: "Visa VAWA: Tu camino\nhacia la libertad y la\nresidencia legal en EE.\nUU.",
    foto: { w: 1183, h: 649, x: -493, y: -51 },
  },
  {
    imagen: "/images/testimoniales/blog-2.webp",
    titulo: "La importancia de\ntener en orden tus\ndocumentos",
    foto: { w: 905, h: 496, x: -69, y: -92 },
  },
  {
    imagen: "/images/testimoniales/blog-3.webp",
    titulo: "Esta nueva política\npodría acercarte a\ntu visa.",
    foto: { w: 1183, h: 649, x: -408, y: -74 },
  },
  {
    imagen: "/images/blog/articulo-4.webp",
    titulo: "Conoce como la\nVisa T puede\ncambiar tu situación",
    foto: { w: 685, h: 459, x: -82, y: -9 },
  },
  {
    imagen: "/images/blog/articulo-5.webp",
    titulo: "¿De que se trata el\nHabeas Corpus y\nquienes solicitan?",
    foto: { w: 476, h: 718, x: 0, y: -117 },
  },
  {
    imagen: "/images/blog/articulo-6.webp",
    titulo: "La Visa VAWA te\nrespalda si cumples\nestos requisitos",
    foto: { w: 856, h: 575, x: -182, y: -58 },
  },
];

/** Las tres primeras son las que también cierran /testimoniales. */
export const entradasBlogPortada = entradasBlog.slice(0, 3);

export const entradaBlogResumen =
  "Si eres ciudadano o residente permanente en Dallas y quieres reunirte con tu cónyuge, hijos...";

export const entradaBlogEtiquetas = ["Visa VAWA", "Naturalización"];

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
