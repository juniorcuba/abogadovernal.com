/**
 * El artículo del blog — frame `802:564` de Figma ("VERNAL - VISTA ARTICULO",
 * 1920×4346) y su móvil, el artboard de 402×7273.
 *
 * El cuerpo del archivo es UN solo bloque de texto de 16/17 justificado en una
 * caja de 1070 desde x250, con los títulos encima en 24 y los saltos de párrafo
 * como líneas en blanco. Aquí se guarda ya troceado: `pegado` marca los
 * párrafos que en el archivo van en la línea siguiente, sin línea en blanco.
 *
 * OJO, para preguntar antes de publicarlo:
 *   - los dos enlaces del penúltimo párrafo apuntaban en el archivo a
 *     `abogadovernal.com/...?utm_source=gemini`: el sitio viejo, y con una marca
 *     de que el texto salió de Gemini. Aquí van a páginas de este sitio.
 *   - "No esperes mas" y "No te pierdas las ultimas noticias" van sin tilde,
 *     como el archivo.
 *
 * Ese primer artículo es el del archivo de diseño. Los otros cinco llegaron el
 * 2026-10-12 en un documento del despacho y van literales (solo sin los dobles
 * espacios), con sus subtítulos como títulos de nivel 1 y sus listas con viñeta
 * o numeradas. Todos cierran con el teléfono que trae el documento, que NO es
 * el general del sitio (`site.phone`): es el que el despacho escribió ahí.
 * Ninguno trae foto para el cuerpo.
 */
export type TrozoArticulo =
  | string
  | { fuerte: string }
  | { enlace: string; href: string };

export type NodoArticulo =
  | { tipo: "parrafo"; trozos: TrozoArticulo[]; pegado?: boolean }
  | { tipo: "titulo"; texto: string }
  | { tipo: "titulo2"; texto: string }
  | { tipo: "lista"; items: TrozoArticulo[][]; estilo?: "vinetas" | "numeros" }
  | { tipo: "imagen" };

export type Articulo = {
  slug: string;
  titulo: string[];
  /** Para la etiqueta meta description. */
  descripcion: string;
  /** La foto del nodo `imagen` del cuerpo, si el artículo lo lleva. */
  imagen?: string;
  cuerpo: NodoArticulo[];
};

const p = (texto: string): NodoArticulo => ({ tipo: "parrafo", trozos: [texto] });
const h = (texto: string): NodoArticulo => ({ tipo: "titulo", texto });
const lista = (items: string[], estilo: "vinetas" | "numeros" = "vinetas"): NodoArticulo => ({
  tipo: "lista",
  estilo,
  items: items.map((i) => [i]),
});

/** El cierre que repiten los cinco artículos del documento. */
const cierre: NodoArticulo[] = [
  { tipo: "parrafo", trozos: [{ enlace: "+1 469-809-1181", href: "tel:+14698091181" }] },
  { tipo: "parrafo", pegado: true, trozos: ["Oficinas en Austin, Dallas, Fort Worth, Houston y San Antonio"] },
];

const vawaCamino: Articulo = {
  slug: "visa-vawa-camino-libertad-residencia",
  titulo: ["Visa VAWA: Tu camino hacia la", "libertad y la residencia legal en", "EE. UU."],
  descripcion:
    "Qué es la Visa VAWA, a quién protege y qué beneficios da: independencia del agresor, permiso de trabajo, residencia permanente y protección para tus hijos.",
  imagen: "/images/blog/articulo-cuerpo.webp",
  cuerpo: [
  { tipo: "parrafo", trozos: ["Vivir en Estados Unidos bajo el temor constante a la deportación es un reto enorme, pero esa carga se vuelve aún más pesada cuando se sufren situaciones de abuso o maltrato intrafamiliar. Muchas personas desconocen que las leyes migratorias estadounidenses ofrecen vías de protección específicas para quienes atraviesan estos momentos oscuros. Una de las alternativas más poderosas es la ", { fuerte: "Visa VAWA (Violence Against Women Act o Ley de Violencia Contra la Mujer)." }] },
  { tipo: "parrafo", trozos: ["A pesar de su nombre, este beneficio no es exclusivo para mujeres: está diseñado para proteger a mujeres, hombres, padres e hijos que hayan sufrido abuso físico, verbal o emocional a manos de un cónyuge, padre o hijo que sea ciudadano estadounidense o residente permanente."] },
  { tipo: "titulo", texto: "1. Independencia total del agresor" },
  { tipo: "parrafo", trozos: ["Uno de los mayores temores de quienes sufren abuso dentro del hogar es depender de su pareja o familiar para tramitar su estatus migratorio. Muchas veces, el agresor utiliza la petición de papeles como una herramienta de control o amenaza."] },
  { tipo: "parrafo", pegado: true, trozos: ["La gran ventaja de autopeticionar bajo VAWA mediante el Formulario I-360 es que no necesitas el consentimiento, apoyo o firma del agresor. Todo el trámite se realiza de forma confidencial a través del Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS), garantizando que tu peticionario maltratador nunca se entere del proceso."] },
  { tipo: "titulo", texto: "2. Acceso a un Permiso de Trabajo y Seguro Social" },
  { tipo: "parrafo", trozos: ["Al ser aprobada tu solicitud (y en muchos casos, mientras el trámite está pendiente en combinación con el ajuste de estatus), recibes un Permiso de Trabajo (EAD) y un Número de Seguro Social (SSN)."] },
  { tipo: "parrafo", pegado: true, trozos: ["Obtener esta documentación de forma legal te otorga:"] },
  { tipo: "lista", items: [["Autonomía financiera: La libertad de trabajar legalmente y generar tus propios ingresos."], ["Seguridad laboral: Protección frente a abusos laborales."], ["Tranquilidad personal: Capacidad para independizarte y construir un hogar seguro para ti y tus hijos."]] },
  { tipo: "titulo", texto: "3. Posibilidad de obtener la Residencia Permanente (Green Card)" },
  { tipo: "parrafo", trozos: ["El beneficio principal de la Visa VAWA es que representa un puente directo hacia la Residencia Permanente (Green Card). Una vez que tu autopetición es aprobada (o en paralelo si cumples con las categorías inmediatas), puedes presentar el ajuste de estatus."] },
  { tipo: "parrafo", pegado: true, trozos: ["A diferencia de otros procesos de inmigración, la ley contempla ciertas exenciones para los solicitantes de VAWA, lo que facilita superar barreras como entradas no autorizadas o ciertos tipos de presencia ilegal en el país."] },
  { tipo: "titulo", texto: "4. Beneficios para tus hijos (Derivados)" },
  { tipo: "parrafo", trozos: ["La protección no solo se limita a la persona principal. Si tienes hijos solteros menores de 21 años, puedes incluirlos en tu solicitud como beneficiarios derivados. Esto les permite obtener protección contra la deportación, acceso a permisos de trabajo y, eventualmente, la residencia legal junto contigo."] },
  { tipo: "parrafo", pegado: true, trozos: ["La importancia de contar con asesoría legal experta"] },
  { tipo: "parrafo", trozos: ["Demostrar un caso de VAWA requiere reunir evidencias delicadas, como testimonios, reportes policiales, evaluaciones psicológicas o registros médicos. Dado que cada detalle cuenta para convencer a los oficiales de USCIS, contar con el respaldo de un equipo legal con experiencia en casos humanitarios y de inmigración es crucial."] },
  { tipo: "parrafo", trozos: ["Firmas especializadas como las del ", { enlace: "Abogado Vernal", href: "/" }, " comprenden de primera mano el impacto emocional que sufren las familias inmigrantes en estas circunstancias. En la oficina legal del ", { enlace: "Abogado Vernal", href: "/" }, " se aborda cada caso de ", { enlace: "Visa U y Visa VAWA", href: "/areas-de-servicio" }, " con empatía, confidencialidad y una defensa firme. Su equipo bilingüe se dedica a guiar a las víctimas paso a paso para que puedan recuperar su tranquilidad y estatus legal sin miedo."] },
  { tipo: "imagen" },
  { tipo: "titulo2", texto: "¿Estás listo para dar el primer paso?" },
  { tipo: "parrafo", trozos: ["Nadie merece vivir en el anonimato ni bajo el yugo del abuso. Si crees que calificas para el beneficio de la Visa VAWA o necesitas analizar las opciones legales para tu situación particular, no enfrentes este camino en soledad."] },
  { tipo: "parrafo", trozos: [{ fuerte: "No esperes mas para solicitar una consulta y recibir la orientación transparente y humana que necesitas para transformar tu futuro en Estados Unidos." }] },
  ],
};

const vawaRequisitos: Articulo = {
  slug: "requisitos-visa-vawa",
  titulo: ["Requisitos para la Visa VAWA:", "lo que debes saber si has", "vivido abuso"],
  descripcion:
    "Qué es una autopetición VAWA, quién podría calificar y qué evidencia se suele pedir, explicado en términos generales por el equipo del Abogado Vernal.",
  cuerpo: [
    p("Cuando hablamos de VAWA (Violence Against Women Act), muchas personas piensan que solo aplica para mujeres o que es un proceso imposible de lograr sin el apoyo de quien las ha lastimado. Ninguna de las dos cosas es cierta. Desde nuestra experiencia llevando estos casos, queremos explicarte en términos generales cómo funciona, para que sepas si esta puede ser una opción para ti."),
    h("¿Qué es una autopetición VAWA?"),
    p("Es un proceso que permite a ciertas personas pedir su propio estatus migratorio sin depender de que su abusador los patrocine, algo pensado específicamente para romper esa dependencia. Se presenta ante USCIS mediante el Formulario I-360."),
    h("¿Quién podría calificar?"),
    p("En términos generales, hemos visto que pueden aplicar personas que han sido víctimas de abuso por parte de:"),
    lista([
      "Un cónyuge (esposo o esposa) que sea ciudadano americano o residente permanente incluso si ya están divorciados, cuando el divorcio ocurrió en los últimos dos años y está relacionado con el abuso.",
      "Un padre o madre ciudadano americano o residente permanente, si la persona es menor de 21 años y no está casada.",
      "Un padrastro o madrastra, bajo ciertas condiciones similares.",
      "Un padre adoptivo, si la adopción ocurrió antes de los 16 años.",
      "Un hijo o hijastro ciudadano americano, si quien aplica es el padre o madre y el hijo ya es mayor de 21 años.",
    ]),
    p("Cada caso es distinto y estos son lineamientos generales, no una lista cerrada ni una garantía de elegibilidad."),
    h("¿Qué más se suele pedir?"),
    p("Además de la relación con el abusador, normalmente se evalúa:"),
    lista([
      "Evidencia del abuso sufrido.",
      "Buena conducta moral.",
      "En el caso de cónyuges, que el matrimonio se haya formado de buena fe y no únicamente para obtener un beneficio migratorio.",
    ]),
    p("La evidencia puede incluir desde tu propia declaración hasta documentos compartidos, fotos, comunicación con tu pareja, o testimonios de personas que conocieron la relación, mientras más completo el expediente, mejor."),
    h("Esto no es un consejo legal"),
    p("Todo lo anterior es información general, no una evaluación de tu caso. Cada situación migratoria tiene detalles distintos que pueden cambiar por completo lo que aplica o no tiempo en el país, historial migratorio, evidencia disponible, entre otros factores. Por eso, antes de sacar conclusiones sobre tu propio caso, lo mejor es hablar directamente con un abogado."),
    p("Si crees que esta puede ser tu situación, agenda una consulta con nosotros y revisemos juntos qué opciones tienes."),
    ...cierre,
  ],
};

const documentos: Articulo = {
  slug: "importancia-documentos-migratorios",
  titulo: ["La importancia de tener en", "orden tus documentos", "migratorios"],
  descripcion:
    "Por qué los documentos incompletos, vencidos o sin traducir retrasan un caso migratorio, y cuáles conviene tener listos desde el principio.",
  cuerpo: [
    p("Una de las cosas que más retrasa o complica un caso migratorio no es, casi nunca, la ley en sí es la falta de documentos, o tenerlos incompletos, vencidos o sin traducir. Después de acompañar muchos procesos, esto es algo que vemos una y otra vez, y queremos compartirte por qué vale la pena tomárselo en serio desde el principio."),
    h("¿Por qué pesa tanto este tema?"),
    p("Cada trámite migratorio se construye, en buena parte, sobre evidencia: quién eres, qué relación tienes con otras personas, desde cuándo estás en el país, qué ha pasado en tu historial. Si esa evidencia no está completa o no se presenta de forma correcta, el proceso se puede retrasar meses o, en algunos casos, derivar en una negación que pudo evitarse."),
    h("Documentos que, en general, conviene tener listos"),
    p("Esto varía según el tipo de caso, pero hay algunos documentos que casi siempre terminan siendo relevantes:"),
    lista([
      "Pasaporte vigente y cualquier identificación oficial.",
      "Acta de nacimiento, con traducción certificada si no está en inglés.",
      "Acta de matrimonio o de divorcio, si aplica.",
      "Registro de entradas y salidas del país (Formulario I-94).",
      "Historial de direcciones y empleo.",
      "Documentos de procesos legales previos, si los hay incluyendo cualquier antecedente, aunque parezca menor.",
      "Evidencia de la relación con otras personas involucradas en el caso (fotos, comunicación, documentos compartidos), cuando aplique.",
    ]),
    h("Pequeños errores que generan grandes atrasos"),
    p("En nuestra experiencia, los problemas más comunes no son dramáticos, son simples: un nombre mal escrito entre documentos, una traducción no certificada, una fecha que no coincide, un documento que se perdió y nunca se reemplazó. Nada de esto suele ser imposible de resolver, pero sí toma tiempo, tiempo que se suma directamente al de tu proceso."),
    h("Esto no sustituye una asesoría legal"),
    p("Qué documentos necesitas exactamente depende por completo del tipo de caso que tengas, y solo un abogado puede decirte con precisión qué te falta y qué no. Esta guía es un punto de partida general, no una lista completa ni garantizada para tu situación particular."),
    p("Si quieres que revisemos juntos qué tienes y qué te falta, agenda una consulta con nosotros."),
    ...cierre,
  ],
};

const visaT: Articulo = {
  slug: "visa-t-puede-cambiar-tu-situacion",
  titulo: ["Conoce cómo la Visa T puede", "cambiar tu situación"],
  descripcion:
    "Qué es la Visa T para víctimas de trata humana, quién podría calificar y qué beneficios puede traer, en términos generales.",
  cuerpo: [
    p("La Visa T existe para una razón muy concreta: proteger a personas que han sido víctimas de trata humana, ya sea laboral o sexual, y darles una vía migratoria que no dependa de quien las explotó. Si has vivido esta situación o conoces a alguien que la vivió, aquí te explicamos en términos generales de qué se trata."),
    h("¿Qué es la Visa T?"),
    p("Es un estatus migratorio (T Nonimmigrant Status) pensado para víctimas de trata humana severa. Se solicita ante USCIS con el Formulario I-914."),
    h("¿Quién podría calificar en términos generales?"),
    p("Según los lineamientos de USCIS, se suele considerar que una persona podría calificar si:"),
    lista([
      "Fue o es víctima de una forma severa de trata humana (laboral o sexual, según la definición legal federal).",
      "Está físicamente en Estados Unidos (o en un puerto de entrada) como consecuencia de esa trata.",
      "Ha cooperado con solicitudes razonables de las autoridades, salvo que fuera menor de edad cuando ocurrió la trata, o que no pueda cooperar por trauma físico o psicológico.",
      "Enfrentaría un daño extremo e inusual si fuera removida del país.",
      "Es admisible, o puede calificar para una exención de ciertas causas de inadmisibilidad.",
    ]),
    h("¿Qué beneficios puede traer?"),
    p("En términos generales, este estatus puede incluir:"),
    lista([
      "Estadía inicial de hasta 4 años, con posibilidad de extensión en algunos casos.",
      "Autorización de trabajo.",
      "Acceso a ciertos beneficios federales y estatales.",
      "Un posible camino hacia la residencia permanente (green card).",
      "La posibilidad de que ciertos familiares también apliquen como derivados.",
    ]),
    h("Esto no es garantía ni asesoría legal"),
    p("Cada uno de estos puntos depende enormemente del caso específico, la evidencia disponible, el tipo de trata, el historial migratorio, y más. Esta información es general y no sustituye una evaluación real de tu situación."),
    p("Si crees que esto puede aplicar para ti o para alguien que conoces, agenda una consulta con nosotros para revisarlo con cuidado."),
    ...cierre,
  ],
};

const ajuste: Articulo = {
  slug: "ajuste-de-estatus-como-aplicar",
  titulo: ["Ajuste de estatus: cómo aplicar,", "en términos generales"],
  descripcion:
    "Qué es el ajuste de estatus, quién podría calificar y cómo es el proceso del Formulario I-485 a grandes rasgos.",
  cuerpo: [
    p('"Ajuste de estatus" es uno de esos términos que escuchamos todo el tiempo en consulta, pero que pocas veces se explica con claridad. En este blog te contamos, de forma general, en qué consiste y cómo funciona el proceso, para que llegues con más contexto a tu propia situación.'),
    h("¿Qué es el ajuste de estatus?"),
    p("Es el proceso que permite a ciertas personas que ya están en Estados Unidos solicitar la residencia permanente (green card) sin tener que salir del país para hacer el trámite consular. Se presenta ante USCIS con el Formulario I-485."),
    h("¿Quién podría calificar, en general?"),
    p("USCIS reconoce distintas categorías bajo las cuales alguien podría ajustar su estatus, entre ellas:"),
    lista([
      "Por relación familiar (con una petición I-130 aprobada).",
      "Por empleo (con una petición I-140 aprobada).",
      "Como inmigrante especial (por ejemplo, trabajadores religiosos).",
      "Como asilado o refugiado, si se cumplen los requisitos de residencia.",
      "Como víctima de trata humana u otros crímenes (estatus T o U).",
      "A través de programas especiales, como la lotería de visas de diversidad.",
    ]),
    p('En general, también se requiere estar físicamente presente en el país, haber sido admitido o "parole" de forma legal, tener un número de visa disponible en tu categoría, y contar con una petición subyacente aprobada o presentada al mismo tiempo.'),
    h("¿Cómo es el proceso, a grandes rasgos?"),
    lista(
      [
        "Confirmar que se cumple con los requisitos de elegibilidad, incluyendo que la fecha de prioridad esté vigente.",
        "Reunir los documentos de soporte.",
        "Completar el Formulario I-485.",
        "Pagar las tarifas correspondientes y presentar la solicitud.",
        "Asistir a la cita de biometría.",
        "Asistir a la entrevista de ajuste de estatus, que se requiere en la mayoría de los casos.",
      ],
      "numeros",
    ),
    h("Esto no sustituye una asesoría legal"),
    p("Cada categoría tiene sus propios requisitos y excepciones, y la elegibilidad real depende de tu historial migratorio completo. Esta explicación es general y no debe tomarse como garantía de que calificas, eso solo se puede determinar revisando tu caso particular."),
    p("Si quieres saber si puedes ajustar tu estatus, agenda una consulta con nosotros."),
    ...cierre,
  ],
};

const habeas: Articulo = {
  slug: "habeas-corpus-que-es-quienes-lo-solicitan",
  titulo: ["¿De qué se trata el Habeas", "Corpus y quiénes lo solicitan?"],
  descripcion:
    "Qué es el habeas corpus en una detención migratoria, quién puede presentarlo y qué puede lograr, explicado en términos generales.",
  cuerpo: [
    p("En los últimos meses hemos escuchado mucho esta palabra en noticias relacionadas con detenciones migratorias. Aquí te explicamos, en términos generales, qué es el habeas corpus y por qué se ha vuelto una herramienta tan mencionada."),
    h("¿Qué es el habeas corpus?"),
    p("Es una herramienta legal que permite que un juez independiente revise si una detención es legal o no. Aplica a cualquier detención por parte del gobierno de Estados Unidos, ya sea en un proceso migratorio o criminal, y, en términos generales, no depende de la ciudadanía de la persona detenida: incluso alguien indocumentado puede presentar una petición."),
    h("¿Quién puede solicitarlo?"),
    p("En general, puede presentarlo:"),
    lista([
      "La propia persona detenida, incluso sin representación legal.",
      'Un "next friend" por ejemplo, un familiar, cónyuge o pareja, en su nombre.',
      "Un abogado, en representación de la persona detenida.",
    ]),
    h("¿Qué puede lograr?"),
    p("Una petición de habeas corpus puede resultar en que un juez revise si la detención cumple con la ley, y en algunos casos, en la liberación de la persona mientras continúa su proceso migratorio por separado. Es importante ser claros en algo: presentar la petición no garantiza la liberación, depende por completo de los hechos de cada caso."),
    h("El contexto actual"),
    p("Este tema ha tomado mucha relevancia recientemente: se han reportado decenas de miles de peticiones de habeas corpus presentadas en cortes federales de todo el país desde 2025, y algunos jueces han hecho referencia a cientos de casos donde se han otorgado este tipo de peticiones. Es una herramienta que, en la práctica, se está usando cada vez más."),
    h("Esto no es asesoría legal"),
    p("Si tú o alguien que conoces está detenido y crees que esta puede ser una opción, el tiempo importa, y los detalles de cada caso cambian por completo lo que se puede o no hacer. Esta información es general y no sustituye hablar directamente con un abogado sobre la situación específica."),
    p("Si necesitas orientación, contáctanos lo antes posible."),
    ...cierre,
  ],
};

/** En el orden de las tarjetas de /blog (`entradasBlog`). */
export const articulos: Articulo[] = [vawaCamino, documentos, ajuste, visaT, habeas, vawaRequisitos];

export function buscarArticulo(slug: string): Articulo | undefined {
  return articulos.find((a) => a.slug === slug);
}
