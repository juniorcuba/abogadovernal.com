/**
 * Preguntas frecuentes — frame `770:625` de Figma (/faqs), 2026-09-26.
 *
 * El archivo trae las diez preguntas, el rótulo "Ver respuesta" y el "+", pero
 * NINGUNA respuesta: están pendientes del cliente.
 *
 * `alto` y `arriba` solo aparecen donde el archivo se sale de la retícula: la
 * fila 6 mide 105 en vez de 109 y su contenido sube 4px.
 *
 * LITERAL del archivo, pendiente de confirmar: la última pregunta se queda sin
 * cerrar ("remota/digital", sin signo final).
 */
export type PreguntaFrecuente = {
  texto: string;
  alto?: number;
  arriba?: number;
};

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  { texto: "¿Cuál es el horario de atención al cliente en la Oficina del Abogado Vernal?" },
  { texto: "¿Cómo puedo hacer una consulta?" },
  { texto: "¿Necesito hacer una cita para ser atendido por un abogado?" },
  { texto: "¿Quién me atenderá en mi primera consulta?" },
  { texto: "¿Qué idioma habla el personal en la oficina del abogado Vernal?" },
  { texto: "¿Su oficina acepta planes de pago?", alto: 105, arriba: 40 },
  { texto: "¿Cuáles son las formas de pago aceptadas?" },
  { texto: "¿El abogado Vernal puede tomar mi caso así lo haya iniciado en otra firma?" },
  { texto: "¿El abogado Vernal me puede representar incluso si vivo fuera del estado de Texas?" },
  { texto: "¿Puedo solicitar una aplicación de manera remota/digital" },
];

/** Las cinco que el archivo repite en cada página de sede, en su mismo orden. */
export const preguntasSede = preguntasFrecuentes.slice(0, 5).map((p) => p.texto);
