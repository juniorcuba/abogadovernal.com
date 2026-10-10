/**
 * Preguntas frecuentes — frame `770:625` de Figma (/faqs) y sus estados de
 * apertura, el frame "FAQ ANIMACION" (`770:2776`, exports "FAQ 10" a "FAQ 19").
 *
 * "FAQ 10" es la lista con todas cerradas; cada uno de los demás abre una.
 * De ahí salen las respuestas y la geometría del acordeón:
 *
 *   fila cerrada  109 de alto (la sexta, 105)
 *   fila abierta  193, siempre, lleve la respuesta dos, tres o cuatro renglones
 *   pregunta      24/300 blanca, línea base a +64.9 del borde de la fila
 *   respuesta     20/400 cian, x58, caja de 987 justificada, interlineado 21;
 *                 la primera línea base la coloca el archivo a mano en cada
 *                 fila, de ahí `respuestaArriba`
 *   el "+"        gira −45° y se convierte en aspa al abrirse
 *
 * En el lienzo de 402 (artboard "VESPER AGENCY LANDING - MOBILE (8)") el
 * acordeón se rehace: filas de 122 (la sexta 115, la séptima 113, la décima
 * 126), pregunta 18/300 a x42 con la caja colocada a mano fila por fila
 * (`arribaMovil`), columna derecha centrada en x312 con el rótulo partido en
 * dos renglones, respuesta 15/400 a +121 del borde de la fila y, abierta, el
 * rótulo pasa a "Cerrar" con un aspa de 13 en vez del "+" girado.
 *
 * OJO con el contenido, para preguntarle al cliente:
 *   - la última pregunta se queda sin cerrar ("remota/digital", sin signo)
 *   - "Si," sin tilde al principio de la última respuesta
 */
export type TrozoRespuesta = string | { correo: string };

export type PreguntaFrecuente = {
  texto: string;
  alto?: number;
  arriba?: number;
  /** Alto de la fila cerrada en el lienzo de 402. */
  altoMovil: number;
  /** y del borde de caja de la pregunta dentro de la fila, en movil. */
  arribaMovil: number;
  /** El texto va por trozos porque el archivo enlaza el correo. */
  respuesta: TrozoRespuesta[];
  /** y de la primera línea base de la respuesta dentro de la fila abierta. */
  respuestaArriba: number;
};

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    texto: "¿Cuál es el horario de atención al cliente en la Oficina del Abogado Vernal?",
    respuesta: ["Nuestras oficinas están abiertas de lunes a viernes de 9:00 a.m. a 6:00 p.m. Dallas y Houston prestan servicio los sábados de 10:00 a.m. a 4:00 p.m."],
    respuestaArriba: 117.5,
    altoMovil: 122,
    arribaMovil: 23,
  },
  {
    texto: "¿Cómo puedo hacer una consulta?",
    respuesta: ["En la oficina del Abogado Vernal puede realizar su consulta en persona o virtual. También puede solicitarla en nuestra línea de atención al cliente 833-887-7273 o a nuestro correo electrónico ", { correo: "info@farnumlawfirm.com" }],
    respuestaArriba: 110.5,
    altoMovil: 122,
    arribaMovil: 41,
  },
  {
    texto: "¿Necesito hacer una cita para ser atendido por un abogado?",
    respuesta: ["En la oficina del Abogado Vernal la consulta inicial tiene un costo de $100 dólares de manera presencial o Video Consulta."],
    respuestaArriba: 114.5,
    altoMovil: 122,
    arribaMovil: 41,
  },
  {
    texto: "¿Quién me atenderá en mi primera consulta?",
    respuesta: ["Su consulta inicial será atendida por un abogado de inmigración experto, quien se encargará de escucharlo y evaluar su caso. Nuestro abogado le brindará la información sobre el proceso adecuado para usted."],
    respuestaArriba: 108.5,
    altoMovil: 122,
    arribaMovil: 41,
  },
  {
    texto: "¿Qué idioma habla el personal en la oficina del abogado Vernal?",
    respuesta: ["Nuestro personal es bilingüe así que está en la capacidad de hablar, escribir y comprender tanto inglés, como español, lo que nos permite atenderte en el idioma de tu preferencia."],
    respuestaArriba: 114.5,
    altoMovil: 122,
    arribaMovil: 36,
  },
  {
    texto: "¿Su oficina acepta planes de pago?",
    alto: 105,
    arriba: 40,
    respuesta: ["Contamos con planes de pago en situaciones y casos especiales, ten en cuenta que esto varía según el costo del proceso. Sin embargo, contamos con una colaboración con empresas que pueden ayudarte a brindarte opciones de financiamiento dependiendo tu caso."],
    respuestaArriba: 107.5,
    altoMovil: 115,
    arribaMovil: 33,
  },
  {
    texto: "¿Cuáles son las formas de pago aceptadas?",
    respuesta: ["Aceptamos pagos en efectivo, cheques personales, tarjetas débito y crédito: Visa, Money Orders, Mastercard, Discover y American Express. Si no puedes asistir a la oficina y para tu comodidad puedes realizar pagos vía telefónica con tu tarjeta al número 833-887-7273 y en nuestra página web en la sección pagos en línea."],
    respuestaArriba: 97.5,
    altoMovil: 113,
    arribaMovil: 31,
  },
  {
    texto: "¿El abogado Vernal puede tomar mi caso así lo haya iniciado en otra firma?",
    respuesta: ["Siempre es necesario una evaluación por lo que solicitar su consulta inicial es importante para poder brindar toda la información necesaria."],
    respuestaArriba: 114.5,
    altoMovil: 122,
    arribaMovil: 26,
  },
  {
    texto: "¿El abogado Vernal me puede representar incluso si vivo fuera del estado de Texas?",
    respuesta: ["Por supuesto que sí, las leyes de inmigración son de carácter federal y estamos completamente listos y disponibles para ofrecerle una representación legal efectiva en cualquier parte de los Estados Unidos."],
    respuestaArriba: 107.5,
    altoMovil: 122,
    arribaMovil: 22,
  },
  {
    texto: "¿Puedo solicitar una aplicación de manera remota/digital",
    respuesta: ["Si, contamos con un intake digital a través del cual podrá dejar sus datos con los cuales nuestro equipo de abogados podrá realizar un análisis y poder determinar cuál será la mejor propuesta a su solicitud."],
    respuestaArriba: 106.5,
    altoMovil: 126,
    arribaMovil: 35,
  },
];

/** Alto de una fila abierta, el mismo para todas. */
export const ALTO_ABIERTA = 193;

/** Las cinco que el archivo repite en cada página de sede, en su mismo orden. */
export const preguntasSede = preguntasFrecuentes.slice(0, 5);
