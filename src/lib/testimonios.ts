/**
 * Testimonios de /testimoniales — frame `453:469` de Figma (2026-09-26).
 *
 * Cada tarjeta mide 454×436 y lleva la foto redonda (166 de diámetro) montada
 * sobre el borde superior. El texto va centrado, con la cita en cian, y abajo el
 * nombre, el tipo de caso y la ciudad.
 *
 * `nombreArriba` es la y del nombre dentro de la tarjeta: el archivo la coloca a
 * mano según lo que ocupe el texto, no a una distancia fija del borde.
 *
 * OJO: son casos de clientes reales con nombre y ciudad. Antes de publicar hace
 * falta su consentimiento por escrito, y el archivo escribe "Forth Worth".
 */
export type Trozo = string | { cian: string };

export type Testimonio = {
  foto: string;
  /**
   * El texto, línea a línea tal como lo parte el archivo: en el lienzo de 1920
   * cada una va en su renglón y por debajo fluyen como un párrafo normal.
   */
  lineas: Trozo[][];
  nombre: string;
  caso: string;
  ciudad: string;
  /** y del nombre dentro de la tarjeta; el archivo la coloca a mano. */
  nombreArriba: number;
  /** y del bloque de texto; también va a mano, según cuántos renglones ocupe. */
  textoArriba: number;
};

export const testimonios: Testimonio[] = [
  {
    foto: "/images/testimoniales/avatar-1.webp",
    nombre: "María R.",
    caso: "Petición Familiar",
    ciudad: "Dallas, TX",
    nombreArriba: 342.75,
    textoArriba: 146,
    lineas: [
      ["Después de más de dos años separada de "],
      ["su esposo, María llegó a Abogado Vernal "],
      ["buscando claridad sobre cómo reunir a su "],
      ["familia. Con una petición familiar bien "],
      ["preparada, hoy su esposo vive con ella en "],
      ["Dallas. ", { cian: "\"No sabía por dónde empezar, y " }],
      [{ cian: "ellos me explicaron todo paso a paso\" " }],
      ["cuenta María en el video de su testimonio. "],
    ],
  },
  {
    foto: "/images/testimoniales/avatar-2.webp",
    nombre: "Carlos M",
    caso: "Asilo Político",
    ciudad: "Houston, TX",
    nombreArriba: 342.75,
    textoArriba: 145,
    lineas: [
      ["Carlos llegó a Estados Unidos huyendo de una "],
      ["situación que ponía en riesgo su vida. Después "],
      ["de meses de incertidumbre, nuestro equipo en "],
      ["Houston lo ayudó a preparar un caso de asilo "],
      ["sólido, con toda la evidencia necesaria para "],
      ["respaldar su solicitud. Hoy, Carlos tiene la "],
      ["protección legal que buscaba. ", { cian: "\"Sentí que por " }],
      [{ cian: "fin alguien escuchaba mi historia completa, no " }],
      [{ cian: "solo mi caso\" " }, "comparte en su testimonio. "],
    ],
  },
  {
    foto: "/images/testimoniales/avatar-3.webp",
    nombre: "Familia Torres.",
    caso: "Visa U",
    ciudad: "Forth Worth, TX",
    nombreArriba: 352.75,
    textoArriba: 145,
    lineas: [
      ["Después de ser víctimas de un delito y "],
      ["colaborar con las autoridades durante la "],
      ["investigación, la familia Torres calificaba para "],
      ["una Visa U, pero no lo sabían hasta que "],
      ["llegaron a Abogado Vernal. Nuestro equipo en "],
      ["Fort Worth los guio en todo el proceso, desde la "],
      ["certificación policial hasta la solicitud final. "],
      ["Hoy, la familia cuenta con protección "],
      ["migratoria y un camino claro hacia la "],
      ["residencia permanente. "],
    ],
  },
  {
    foto: "/images/testimoniales/avatar-4.webp",
    nombre: "Rosa L.",
    caso: "Naturalización",
    ciudad: "Austin, TX",
    nombreArriba: 345.75,
    textoArriba: 137,
    lineas: [
      ["Después de años como residente "],
      ["permanente, Rosa quería dar el siguiente "],
      ["paso, pero no sabía si cumplía con todos "],
      ["los requisitos. En nuestra oficina de Austin, "],
      ["revisamos su caso, la preparamos para el "],
      ["examen cívico, y la acompañamos hasta "],
      ["su entrevista final. Hoy, Rosa es ciudadana "],
      ["americana. ", { cian: "\"Nunca pensé que el proceso " }],
      [{ cian: "pudiera sentirse tan claro\" " }, "dice en su "],
      ["video. "],
    ],
  },
  {
    foto: "/images/testimoniales/avatar-5.webp",
    nombre: "Jorge P.",
    caso: "Defensa contra la deportación",
    ciudad: "Dallas, TX",
    nombreArriba: 345.75,
    textoArriba: 133,
    lineas: [
      ["Jorge enfrentaba un proceso de "],
      ["deportación que amenazaba con "],
      ["separarlo de su familia. Nuestro equipo en "],
      ["Dallas evaluó su caso a fondo y encontró "],
      ["una vía de defensa que muchos abogados "],
      ["anteriores no habían considerado. "],
      ["Después de varias audiencias, Jorge pudo "],
      ["permanecer legalmente en el país junto a "],
      ["sus hijos. ", { cian: "\"Fueron los únicos que realmente " }],
      [{ cian: "pelearon por mí\" " }, "recuerda. "],
    ],
  },
  {
    foto: "/images/testimoniales/avatar-6.webp",
    nombre: "Ana G.",
    caso: "Visa VAWA",
    ciudad: "Houston, TX",
    nombreArriba: 343.75,
    textoArriba: 138,
    lineas: [
      ["Ana vivió años de violencia doméstica antes "],
      ["de encontrar el valor de buscar ayuda. En "],
      ["Abogado Vernal, le explicamos que podía "],
      ["solicitar su propio estatus migratorio bajo "],
      ["VAWA, sin que su agresor lo supiera ni tuviera "],
      ["que autorizarlo. Hoy, Ana tiene su residencia y "],
      ["una vida completamente independiente. ", { cian: "\"Me " }],
      [{ cian: "devolvieron el control de mi propia historia\" " }],
      ["comparte con nosotros. "],
    ],
  },
];

/**
 * Las tres entradas del blog que cierran la página. El archivo repite la misma
 * entradilla y las mismas etiquetas en las tres: texto de relleno, pendiente de
 * los artículos reales.
 */
export const entradasBlog = [
  {
    imagen: "/images/testimoniales/blog-1.webp",
    titulo: "Requisitos para la\nVisa VAWA",
    lineas: 2,
    /** Encuadre del archivo dentro de la tarjeta de 438×575. */
    foto: { w: 1183, h: 649, x: -493, y: -51 },
  },
  {
    imagen: "/images/testimoniales/blog-2.webp",
    titulo: "La importancia de\ntener en orden tus\ndocumentos",
    lineas: 3,
    foto: { w: 905, h: 496, x: -69, y: -92 },
  },
  {
    imagen: "/images/testimoniales/blog-3.webp",
    titulo: "Esta nueva política\npodría acercarte a\ntu visa.",
    lineas: 3,
    foto: { w: 1183, h: 649, x: -408, y: -74 },
  },
];

export const entradaBlogResumen =
  "Si eres ciudadano o residente permanente en Dallas y quieres reunirte con tu cónyuge, hijos...";

export const entradaBlogEtiquetas = ["Visa VAWA", "Naturalización"];
