/**
 * Textos propios de cada sede — artboards "VERNAL - AREAS DE SERVICIO - <ciudad>"
 * del export del 2026-10-11.
 *
 * Hasta ese export las seis tarjetas y las tres visas humanitarias decían lo
 * mismo en todas las ciudades, cambiando solo el nombre. Ahora Houston, Austin,
 * Fort Worth y San Antonio traen su propia redacción; Dallas se queda con la
 * plantilla de `sedes.ts`. Este archivo se generó del export y va literal: no
 * se corrige ni se unifica.
 *
 * `visas` solo aparece donde la ciudad cambia alguna respecto a la plantilla;
 * las que el archivo deja sin frase resaltada llevan `destacado` vacío.
 */
export type VisaHumanitaria = { titulo: string; antes: string; destacado: string; despues: string };

export const textosDeSede: Record<
  string,
  { servicios: Record<string, string>; visas?: Partial<Record<string, VisaHumanitaria>> }
> = {
  "houston": {
    servicios: {
      "peticion-familiar":
        "¿Tienes un familiar que quieres traer a Estados Unidos, o ya iniciaste el proceso y no sabes en qué etapa vas? Nuestro equipo en Houston revisa tu situación específica, sea que califiques como familiar inmediato o dentro de alguna categoría de preferencia, y te explica con claridad los tiempos de espera reales, no los que aparecen en internet sin contexto de tu caso.",
      "naturalizacion":
        "El camino hacia la ciudadanía americana tiene varios requisitos que muchas personas desconocen: tiempo de residencia continua, presencia física en el país, y buen carácter moral, entre otros. En Houston te ayudamos a confirmar que cumples con cada uno antes de presentar tu solicitud, y te preparamos para el examen y la entrevista final.",
      "deportacion":
        "Enfrentar una corte de inmigración sin representación legal reduce significativamente tus probabilidades de un resultado favorable. Desde Houston, evaluamos qué alivio migratorio puede aplicar a tu situación, cancelación de remoción, asilo defensivo, ajuste de estatus, y te representamos en cada audiencia hasta que tu caso se resuelva.",
      "visas-juveniles":
        "Cuando un menor ha sido abandonado, maltratado o descuidado por alguno de sus padres, puede calificar para el Estatus Especial de Menor Inmigrante. Este es un proceso de dos pasos: primero una corte de familia debe emitir una orden especial, y después se presenta la solicitud migratoria. En Houston acompañamos a la familia en ambas etapas.",
      "visa-k1":
        "Si vives en Houston, eres ciudadano americano, y tu pareja vive en otro país, la visa K1 te permite traerla a Estados Unidos específicamente para casarse, con un plazo de 90 días desde su llegada para formalizar el matrimonio. Te ayudamos a armar la petición y reunir la evidencia necesaria de la relación.",
      "habeas-corpus":
        "Cuando alguien está detenido por autoridades migratorias y consideras que esa detención es ilegal o injustificada, el recurso de Habeas Corpus permite impugnarla directamente ante una corte federal. Son casos donde el tiempo importa, y nuestro equipo en Houston actúa con la urgencia que requieren.",
    },
    visas: {
      "Visa VAWA": { titulo: "Visa VAWA", antes: "Para quienes han sufrido violencia doméstica de un cónyuge, padre o hijo con ciudadanía o residencia, permitiendo solicitar estatus propio sin que el agresor lo sepa o lo autorice.", destacado: "", despues: "" },
      "Visa T": { titulo: "Visa T", antes: "para sobrevivientes de trata de personas, con camino a la residencia si colaboran con la investigación del caso.", destacado: "", despues: "" },
      "Visa U": { titulo: "Visa U", antes: "Para víctimas de delitos graves que hayan sido útiles a las autoridades durante la investigación o el proceso judicial", destacado: "", despues: "" },
    },
  },
  "austin": {
    servicios: {
      "peticion-familiar":
        "Reunir a tu familia empieza con entender qué categoría aplica a tu caso. En Austin evaluamos tu relación con quien solicita (cónyuge, hijo, padre, hermano) y te explicamos con precisión los tiempos de espera según tu categoría específica, no estimaciones genéricas.",
      "naturalizacion":
        "Convertirte en ciudadano requiere cumplir requisitos de tiempo, presencia y conducta que no siempre son evidentes. Desde Austin, confirmamos que estás listo antes de presentar tu solicitud, y te acompañamos hasta tu entrevista y examen final con USCIS",
      "deportacion":
        "Un proceso de deportación sin abogado casi siempre termina peor. En Austin analizamos qué defensas puede tener tu caso, asilo, cancelación de remoción, ajuste de estatus y te representamos en cada audiencia frente al juez.",
      "visas-juveniles":
        "Para menores que han vivido abandono, maltrato o negligencia por parte de sus padres, existe una vía de protección migratoria especial. El proceso inicia en una corte de familia estatal, y en Austin te guiamos en cada etapa hasta la solicitud final ante inmigración.",
      "visa-k1":
        "Si resides en Austin y quieres traer a tu pareja desde el extranjero para casarse, la visa K1 es el camino, con 90 días desde su llegada para formalizar el matrimonio. Te apoyamos en preparar la evidencia de la relación y la petición completa.",
      "habeas-corpus":
        "Ante una detención migratoria que consideras ilegal o injusta, este recurso permite impugnarla directamente ante una corte federal. En Austin actuamos con la rapidez que estos casos exigen.",
    },
    visas: {
      "Visa VAWA": { titulo: "Visa VAWA", antes: "Para sobrevivientes de violencia doméstica que buscan su propio estatus, sin depender del agresor.", destacado: "", despues: "" },
      "Visa T": { titulo: "Visa T", antes: "Para víctimas de trata de personas que colaboran con la investigación de su caso.", destacado: "", despues: "" },
    },
  },
  "fort-worth": {
    servicios: {
      "peticion-familiar":
        "Reunir a tu familia en Estados Unidos depende de entender bien tu categoría de parentesco y los tiempos reales de espera. En Fort Worth revisamos tu caso específico para darte información precisa, no genérica.",
      "naturalizacion":
        "El camino a la ciudadanía tiene requisitos de residencia continua, presencia física y buena conducta. Te ayudamos, desde Fort Worth, a confirmar que cumples cada uno antes de iniciar tu solicitud, y te preparamos para la entrevista y el examen.",
      "deportacion":
        "Si enfrentas un proceso ante la corte de inmigración, contar con representación puede cambiar el resultado de tu caso. Evaluamos alternativas legales disponibles, como asilo o cancelación de remoción y te acompañamos en cada audiencia.",
      "visas-juveniles":
        "Menores que han sufrido abandono, maltrato o negligencia por parte de sus padres pueden calificar para protección especial migratoria, que inicia con una orden de corte de familia. En Fort Worth te acompañamos en todo el proceso.",
      "visa-k1":
        "¿Tu prometido(a) vive fuera del país? Te ayudamos a tramitar la visa K1 para traerlo a Estados Unidos, con 90 días para casarse tras su llegada, incluyendo la preparación de toda la evidencia necesaria.",
      "habeas-corpus":
        "Cuando una detención migratoria parece injusta o ilegal, este recurso legal permite impugnarla ante una corte federal. Nuestro equipo en Fort Worth entiende la urgencia de este tipo de casos.",
    },
  },
  "san-antonio": {
    servicios: {
      "peticion-familiar":
        "Si buscas reunir a tu familia en Estados Unidos, evaluamos tu categoría de parentesco y te explicamos con claridad los tiempos de espera reales para tu caso específico, sin promesas genéricas.",
      "naturalizacion":
        "Te acompañamos en tu camino hacia la ciudadanía americana: confirmamos que cumples con los requisitos de residencia, presencia física y buena conducta, y te preparamos para tu examen y entrevista final.",
      "deportacion":
        "Si enfrentas un proceso ante la corte de inmigración, te representamos de forma remota en cada etapa, evaluando qué defensas legales, asilo, cancelación de remoción, ajuste de estatus, pueden aplicar a tu situación.",
      "visas-juveniles":
        "Para menores que han sufrido abandono, maltrato o negligencia por parte de sus padres, existe una protección migratoria especial. Te guiamos en el proceso completo, desde la corte de familia hasta la solicitud ante inmigración.",
      "visa-k1":
        "Si tu pareja vive en el extranjero, te ayudamos a tramitar la visa K1 para traerla a Estados Unidos, con 90 días para formalizar el matrimonio tras su llegada.",
      "habeas-corpus":
        "Ante una detención migratoria injusta o ilegal, este recurso permite impugnarla ante una corte federal. Actuamos con la rapidez que estos casos requieren, sin importar la distancia.",
    },
  },
};
