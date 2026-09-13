import { offices } from "@/lib/site";

/**
 * Páginas de sede de /areas-de-servicio/[sede]. Salen de cinco artboards de
 * Figma con la MISMA plantilla (1920×5563) y distinto contenido:
 *
 *   Dallas 494:722 · Houston 547:678 · Austin 547:929 ·
 *   Fort Worth 547:1179 · San Antonio 547:1597
 *
 * Los archivos exportados de Austin, Fort Worth y San Antonio se llaman
 * "Houston (1/2/3)"; la ciudad se identificó por el contenido.
 *
 * Lo que de verdad cambia entre ciudades (comprobado comparando los cinco
 * exports con el nombre de la ciudad normalizado): el rótulo, el párrafo del
 * hero, la foto del hero y su encuadre, la introducción de "Visas humanitarias"
 * y, en Fort Worth y San Antonio, la composición del fondo del hero.
 *
 * CORRECCIONES respecto al archivo, a revisar con el cliente:
 *   - En las cuatro sedes que no son Dallas, los cuerpos de las tarjetas siguen
 *     diciendo "en Dallas" (copiados de la plantilla). Aquí se pone la ciudad de
 *     la página, porque si no, la página de Houston ofrecería servicios en Dallas.
 *   - La dirección de la sede es la de Dallas en los cinco archivos. Aquí va la
 *     de cada oficina, de src/lib/site.ts.
 *
 * LITERAL del archivo, pendiente de confirmar:
 *   - "FORTH WORTH, TX" / "en Forth Worth" en el rótulo y los títulos (el
 *     párrafo del hero sí dice "Fort Worth").
 *   - Las tarjetas de Visa K1 y Habeas Corpus llevan el texto de Deportación y
 *     de Visas Juveniles: el diseñador aún no ha escrito los suyos.
 */

export type Hero = {
  /** Fondo radial #172339 → #0F0F0F y mapa en hard-light. Solo en tres sedes. */
  conMapa: boolean;
  /** y de la caja de la foto y los degradados: 0, o 64 en Fort Worth y San Antonio. */
  top: number;
  foto: { src: string; left: number; width: number };
  /** Segundo degradado del hero; cambia de ángulo y paradas entre sedes. */
  degradado: string;
};

export type Sede = {
  slug: string;
  /** Nombre correcto de la ciudad, para textos y metadatos. */
  ciudad: string;
  /** Cómo la escribe el archivo en rótulo y títulos. */
  nombreDiseno: string;
  rotulo: string;
  intro: string;
  introHumanitarias: string;
  direccion: string;
  hero: Hero;
};

function direccionDe(ciudad: string) {
  const o = offices.find((of) => of.city === ciudad);
  if (!o) throw new Error(`Sin oficina para ${ciudad}`);
  return `${o.address}, United States`;
}

const DEGRADADO_BASE = "linear-gradient(254.02deg,#0F0F1000 41.97%,#0F0F10 63.39%)";
const INTRO_HUMANITARIAS_COMUN =
  "Protección legal para quienes han sido víctimas de violencia o delitos graves:";

export const sedes: Sede[] = [
  {
    slug: "dallas",
    ciudad: "Dallas",
    nombreDiseno: "Dallas",
    rotulo: "Dallas, TX",
    intro:
      "En nuestra oficina de Dallas, ayudamos a la comunidad inmigrante a resolver su situación legal con orientación clara y acompañamiento en cada paso del proceso. Conoce las áreas en las que podemos ayudarte desde nuestra sede en Dallas:",
    introHumanitarias:
      "Existen distintas protecciones migratorias diseñadas para personas que han sido víctimas de violencia o delitos graves. Desde Dallas, ofrecemos representación en:",
    direccion: direccionDe("Dallas"),
    hero: {
      conMapa: true,
      top: 0,
      foto: { src: "/images/sedes/dallas-foto.webp", left: 608, width: 1312 },
      degradado: DEGRADADO_BASE,
    },
  },
  {
    slug: "houston",
    ciudad: "Houston",
    nombreDiseno: "Houston",
    rotulo: "Houston, TX",
    intro:
      "Houston es una de las ciudades con mayor población inmigrante de Texas, y también una de las que enfrenta más dudas sobre cómo navegar el sistema migratorio. Desde nuestra oficina en Houston, ofrecemos representación legal en las siguientes áreas:",
    introHumanitarias:
      "Houston también es sede de representación en tres tipos de protección para víctimas:",
    direccion: direccionDe("Houston"),
    hero: {
      conMapa: true,
      top: 0,
      foto: { src: "/images/sedes/houston-foto.webp", left: 571, width: 1349 },
      degradado: DEGRADADO_BASE,
    },
  },
  {
    slug: "austin",
    ciudad: "Austin",
    nombreDiseno: "Austin",
    rotulo: "Austin, TX",
    intro:
      "En la capital de Texas, muchas familias inmigrantes buscan claridad sobre su situación legal sin saber por dónde empezar. Nuestra oficina en Austin está aquí para acompañarte en cada una de estas áreas:",
    introHumanitarias: INTRO_HUMANITARIAS_COMUN,
    direccion: direccionDe("Austin"),
    hero: {
      conMapa: true,
      top: 0,
      foto: { src: "/images/sedes/austin-foto.webp", left: 685, width: 1235 },
      degradado: DEGRADADO_BASE,
    },
  },
  {
    slug: "fort-worth",
    ciudad: "Fort Worth",
    nombreDiseno: "Forth Worth",
    rotulo: "Forth Worth, TX",
    intro:
      "La comunidad inmigrante de Fort Worth enfrenta procesos legales que pueden sentirse abrumadores sin la orientación correcta. Desde nuestra oficina local, ofrecemos representación en:",
    introHumanitarias: INTRO_HUMANITARIAS_COMUN,
    direccion: direccionDe("Fort Worth"),
    hero: {
      conMapa: false,
      top: 64,
      foto: { src: "/images/sedes/fort-worth-foto.webp", left: 685, width: 1235 },
      degradado: "linear-gradient(253.51deg,#0F0F1000 42%,#0F0F10 59.79%)",
    },
  },
  {
    slug: "san-antonio",
    ciudad: "San Antonio",
    nombreDiseno: "San Antonio",
    rotulo: "San Antonio, TX",
    intro:
      "San Antonio es una de las ciudades con mayor crecimiento de comunidad inmigrante en Texas, y nuestra oficina está aquí para acompañarte en cada etapa de tu proceso migratorio. Desde nuestra sede en San Antonio, ofrecemos representación en las siguientes áreas:",
    introHumanitarias: INTRO_HUMANITARIAS_COMUN,
    direccion: direccionDe("San Antonio"),
    hero: {
      conMapa: false,
      top: 64,
      foto: { src: "/images/sedes/san-antonio-foto.webp", left: 747, width: 1173 },
      degradado: "linear-gradient(256.15deg,#0F0F1000 32.64%,#0F0F10 56.25%)",
    },
  },
];

export function sedePorSlug(slug: string) {
  return sedes.find((s) => s.slug === slug);
}

/** Slug de la página de sede a partir del nombre que use cualquier listado. */
export function slugDeCiudad(nombre: string) {
  const n = nombre.toLowerCase();
  return sedes.find(
    (s) => s.ciudad.toLowerCase() === n || s.nombreDiseno.toLowerCase() === n,
  )?.slug;
}

/** Servicios de las tarjetas. El orden es el del archivo, fila a fila. */
export type Servicio = {
  id: string;
  titulo: string;
  /** Texto con `{ciudad}` donde va el nombre de la sede. */
  texto: string;
  /**
   * Hueco entre el final del título y el primer renglón, en px: el archivo lo
   * ajusta a mano en cada tarjeta.
   */
  hueco: number;
};

const TEXTO_DEPORTACION =
  "Si tú o un familiar enfrenta un proceso de deportación, contar con representación legal puede marcar la diferencia entre permanecer en el país o no. Nuestro equipo en {ciudad} te representa en corte de inmigración, evalúa qué defensas legales aplican a tu caso, como cancelación de remoción, asilo, o ajuste de estatus, y te acompaña en cada audiencia hasta resolver tu situación.";
const TEXTO_JUVENILES =
  "A través del Estatus de Menores Inmigrantes (SIJS), ayudamos a menores en {ciudad} que han sido abandonados, maltratados o descuidados por uno o ambos padres a obtener protección legal y, eventualmente, la residencia permanente. Este proceso requiere una orden de una corte estatal de familia antes de presentar la solicitud ante inmigración, te guiamos en ambas partes del proceso.";

export const servicios: Servicio[] = [
  {
    id: "peticion-familiar",
    titulo: "Petición Familiar",
    texto:
      "Si eres ciudadano o residente permanente en {ciudad} y quieres reunirte con tu cónyuge, hijos, padres o hermanos, podemos ayudarte a iniciar el proceso de petición familiar. Te orientamos sobre qué formulario corresponde a tu caso, qué documentos necesitas reunir, y cuánto tiempo puede tomar el proceso según tu situación específica. Cada categoría familiar tiene requisitos y tiempos de espera distintos, te ayudamos a entender exactamente en qué punto está tu caso y qué sigue.",
    hueco: 19,
  },
  {
    id: "naturalizacion",
    titulo: "Naturalización",
    texto:
      "Convertirte en ciudadano americano es uno de los pasos más importantes de tu proceso migratorio. Desde nuestra oficina en {ciudad}, te acompañamos en cada etapa de tu solicitud de naturalización: revisamos que cumplas con los requisitos de residencia continua, te preparamos para el examen cívico y de inglés, y te asesoramos en el llenado del formulario N-400 hasta tu entrevista final con USCIS.",
    hueco: 27,
  },
  { id: "deportacion", titulo: "Defensa Contra la Deportación", texto: TEXTO_DEPORTACION, hueco: 39 },
  { id: "visas-juveniles", titulo: "Visas Juveniles", texto: TEXTO_JUVENILES, hueco: 39 },
  // PENDIENTE: el archivo repite aquí el texto de Deportación.
  { id: "visa-k1", titulo: "Visa K1 (Prometidos)", texto: TEXTO_DEPORTACION, hueco: 31 },
  // PENDIENTE: el archivo repite aquí el texto de Visas Juveniles.
  { id: "habeas-corpus", titulo: "Habeas Corpus", texto: TEXTO_JUVENILES, hueco: 31 },
];

export const visasHumanitarias = [
  {
    titulo: "Visa VAWA",
    antes: "Si has sido ",
    destacado:
      "víctima de violencia doméstica por parte de un cónyuge, padre o hijo ciudadano o residente,",
    despues:
      " puedes solicitar tu propio estatus migratorio sin depender de tu agresor ni necesitar su conocimiento o aprobación.",
  },
  {
    titulo: "Visa T",
    antes: "Diseñada ",
    destacado: "para víctimas de trata de personas (laboral o sexual)",
    despues:
      ", ofrece protección migratoria y camino a la residencia permanente para quienes colaboran con las autoridades en la investigación del delito.",
  },
  {
    titulo: "Visa U",
    antes: "Disponible ",
    destacado:
      "para víctimas de ciertos delitos graves (como violencia doméstica, asalto o secuestro)",
    despues:
      " que han sido de utilidad para las autoridades en la investigación o enjuiciamiento del caso.",
  },
];

/**
 * Preguntas frecuentes de la plantilla. El archivo NO trae las respuestas, solo
 * el botón "Ver respuesta": hasta que el cliente las escriba, cada una lleva a
 * la página de preguntas frecuentes.
 */
export const preguntasSede = [
  "¿Cuál es el horario de atención al cliente en la Oficina del Abogado Vernal?",
  "¿Cómo puedo hacer una consulta?",
  "¿Necesito hacer una cita para ser atendido por un abogado?",
  "¿Quién me atenderá en mi primera consulta?",
  "¿Qué idioma habla el personal en la oficina del abogado Vernal?",
];
