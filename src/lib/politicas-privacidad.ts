/**
 * Texto de la Política de Privacidad — LITERAL del artboard "VERNAL - POLITICAS
 * DE PRIVACIDAD" (nodo 425:2203, export del 2026-09-13).
 *
 * Es un texto legal (A2P 10DLC, consentimiento de SMS/WhatsApp): no se reescribe
 * ni se "mejora". Cualquier cambio tiene que venir del cliente.
 *
 * PENDIENTE DE CONFIRMAR CON EL CLIENTE antes de publicar, porque no coincide
 * con los datos del resto del sitio (src/lib/site.ts):
 *   - Teléfono: aquí "+1 833-887-7273"; en el resto del sitio "+ 1-833-877-7273".
 *   - Houston: aquí "Ste 580"; en el resto "Suite 105".
 *   - Austin y Fort Worth también cambian la forma ("suite 745", sin "Suite").
 * Se deja literal porque es un documento legal: si los datos están mal, se
 * corrigen en ambos sitios a la vez, no solo en uno.
 *
 * El diseño pone los apartados 1 a 4 (y 2.1, 2.2) en negrita y del 5 al 11 en
 * peso normal. Se respeta tal cual; `negrita` lo recoge.
 */

/** Un trozo de texto; `cian` lo pinta en #08B6FF. */
export type Trozo = string | { texto: string; cian: true };

export type Bloque =
  | { tipo: "titulo"; nivel: 2 | 3; texto: string; negrita: boolean }
  | { tipo: "parrafo"; texto: Trozo[] }
  /** Líneas cortadas a mano, sin justificar (las direcciones). */
  | { tipo: "lineas"; lineas: string[] }
  | { tipo: "lista"; items: { texto: string; sub?: string[] }[] };

/**
 * `pegado: true` = sin la línea en blanco de separación que llevan todos los
 * demás bloques. En el archivo solo pasa una vez: el párrafo que sigue a la
 * lista del 7.1.
 */
export type BloqueConHueco = Bloque & { pegado?: true };

export const politicaPrivacidad: BloqueConHueco[] = [
  { tipo: "titulo", nivel: 2, texto: "1. Introducción", negrita: true },
  {
    tipo: "parrafo",
    texto: [
      "The Law Office of ",
      { texto: "Vernal Farnum Mejia", cian: true },
      " es una firma de abogados de inmigración ubicada en Texas con oficinas en Dallas, Houston, Austin y Fort Worth. Esta Política de Privacidad describe cómo The Law Office of Vernal Farnum Mejia recopila, utiliza, almacena y protege la información personal proporcionada por los usuarios de nuestro sitio web y nuestros servicios legales de inmigración.",
    ],
  },
  {
    tipo: "parrafo",
    texto: [
      "Al utilizar nuestro sitio web o proporcionarnos información personal por cualquiera de nuestros formularios de registro, usted acepta las prácticas descritas en esta Política de Privacidad.",
    ],
  },
  {
    tipo: "parrafo",
    texto: [
      "Al comunicarte con nosotros a través de nuestros canales de contacto, aceptas que la firma recopile y almacene distintos tipos de datos personales, obtenidos de diversas fuentes, entre ellas:",
    ],
  },
  {
    tipo: "lista",
    items: [
      {
        texto: "Datos que tú nos compartes directamente:",
        sub: [
          "Al llenar formularios o cuestionarios en anuncios digitales de Facebook, Instagram, Google, TikTok, YouTube, páginas de aterrizaje, o al registrarte en algún evento.",
          "A través de canales orgánicos, como mensajes en Messenger, Instagram y TikTok, formularios en el sitio web, chats de Google Business Profile, correos electrónicos y mensajes de texto.",
        ],
      },
      {
        texto: "Datos por contacto telefónico:",
        sub: [
          "Cuando te comunicas con nosotros a los números de teléfono publicados en nuestras redes sociales, campañas publicitarias o sitio web.",
        ],
      },
      {
        texto: "Datos de tu navegación en el sitio:",
        sub: [
          "Información recopilada mediante cookies y dispositivos, incluyendo dirección IP, páginas visitadas y fecha de cada visita.",
        ],
      },
      {
        texto: "Datos obtenidos de terceros:",
        sub: ["Proporcionados por abogados de la firma, paralegales, y representantes de la firma."],
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "2. Información que Recopilamos", negrita: true },
  {
    tipo: "titulo",
    nivel: 3,
    texto: "2.1 Información Personal Proporcionada Voluntariamente",
    negrita: true,
  },
  {
    tipo: "parrafo",
    texto: [
      "Podemos recopilar información personal que usted nos proporciona directamente, incluyendo:",
    ],
  },
  {
    tipo: "lista",
    items: [
      { texto: "Nombre completo" },
      { texto: "Dirección de correo electrónico" },
      { texto: "Número de teléfono" },
      {
        texto:
          "País de origen y situación migratoria (solo cuando sea estrictamente necesario para evaluar su caso)",
      },
      {
        texto:
          "Documentación legal o personal enviada como parte de nuestros servicios (solo cuando sea estrictamente necesario para evaluar su caso)",
      },
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "2.2 Información Recopilada Automáticamente", negrita: true },
  {
    tipo: "parrafo",
    texto: [
      "Podemos recopilar información no identificable mediante herramientas como cookies, incluyendo:",
    ],
  },
  {
    tipo: "lista",
    items: [
      { texto: "Dirección IP" },
      { texto: "Tipo de navegador" },
      { texto: "Páginas visitadas en nuestro sitio" },
      { texto: "Tiempo de navegación" },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "3. Uso de la Información", negrita: true },
  {
    tipo: "lista",
    items: [
      { texto: "La información recopilada puede ser utilizada para:" },
      { texto: "Proporcionar asesoría legal y evaluar casos migratorios" },
      { texto: "Responder a consultas o solicitudes" },
      { texto: "Mejorar nuestro sitio web y servicios" },
      { texto: "Cumplir con requerimientos legales o regulatorios" },
      {
        texto:
          "Comunicarnos con usted a través de mensajes transaccionales e informativos de WhatsApp, SMS o llamadas telefónicas relacionados con su caso o consulta legal",
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "4. Divulgación de la Información", negrita: true },
  { tipo: "parrafo", texto: ["No compartimos información personal con terceros excepto:"] },
  {
    tipo: "lista",
    items: [
      { texto: "Cuando sea necesario para la representación legal del cliente" },
      { texto: "Cuando el cliente lo autorice explícitamente" },
      { texto: "Para cumplir con obligaciones legales, regulatorias o decisiones judiciales" },
      {
        texto:
          "No compartimos, vendemos ni proporcionamos su número de teléfono móvil ni sus datos de consentimiento de mensajería (SMS/WhatsApp) a terceros o afiliados con fines de marketing o promocionales.",
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "5. Seguridad de la Información", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Implementamos medidas técnicas y administrativas razonables para proteger la información personal contra acceso no autorizado, pérdida o divulgación.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "6. Retención de Datos", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "La información personal se conserva únicamente durante el tiempo necesario para cumplir los fines descritos en esta Política o según lo exija la ley.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "7. Cumplimiento con A2P 10DLC", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Para cumplir con los requisitos de A2P 10DLC y garantizar la transparencia en el uso de mensajería SMS y WhatsApp, informamos lo siguiente:",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.1 Consentimiento Expreso (Opt-In)", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Al proporcionar su número telefónico a The Law Office of Vernal Farnum Mejia mediante formularios en nuestro sitio web, mensajes directos, WhatsApp o cualquier otro medio, usted otorga consentimiento explícito para recibir:",
    ],
  },
  {
    tipo: "lista",
    items: [
      { texto: "Confirmaciones de citas" },
      { texto: "Comunicaciones sobre su caso" },
      { texto: "Mensajes informativos o administrativos" },
      { texto: "Actualizaciones relacionadas con nuestros servicios legales" },
    ],
  },
  {
    tipo: "parrafo",
    pegado: true,
    texto: [
      "Los mensajes y llamadas que enviamos son estrictamente de servicio e informativos, relacionados directamente con su caso migratorio. No utilizamos estos canales para mensajería promocional o de marketing.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.2 Cancelación (Opt-Out)", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      'Usted puede cancelar la recepción de mensajes en cualquier momento respondiendo con la palabra "STOP". Después de recibir su solicitud, dejaremos de enviarle mensajes, excepto aquellos necesarios para cumplir con obligaciones legales o regulatorias.',
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.3 Cargos por Mensajes", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Dependiendo de su proveedor celular, pueden aplicar tarifas estándar de mensajes y datos. La Firma no es responsable por cargos generados por su compañía telefónica.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.4 Frecuencia de Mensajes", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "La frecuencia de mensajes puede variar según el caso o la etapa del servicio legal. Nos comprometemos a enviar únicamente comunicaciones relevantes.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.5 Uso de Datos para Mensajería", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Su número telefónico será utilizado exclusivamente para fines relacionados con la prestación de nuestros servicios legales y comunicaciones autorizadas por usted. No compartimos, vendemos ni proporcionamos su número de teléfono móvil ni sus datos de consentimiento de mensajería a terceros o afiliados con fines de marketing o promocionales.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "8. Derechos del Usuario", negrita: false },
  { tipo: "parrafo", texto: ["Usted tiene derecho a:"] },
  {
    tipo: "lista",
    items: [
      { texto: "Acceder a su información personal" },
      { texto: "Solicitar correcciones" },
      { texto: "Solicitar la eliminación de su información cuando aplicable" },
      { texto: "Revocar el consentimiento proporcionado" },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "9. Enlaces a Sitios Externos", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Nuestro sitio puede contener enlaces a sitios web externos. No somos responsables de sus prácticas de privacidad.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "10. Cambios a Esta Política", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Podemos actualizar esta Política periódicamente. La versión más reciente estará disponible en nuestro sitio web.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "11. Contacto", negrita: false },
  { tipo: "parrafo", texto: ["Direcciones de Nuestras Oficinas:"] },
  {
    tipo: "lineas",
    lineas: [
      "Dallas: 7929 Brookriver Dr #540, Dallas, TX 75247",
      "Houston: 10333 Harwin Dr. Ste 580, Houston, TX 77036",
      "Austin: 13809 Research Blvd suite 745, Austin, TX 78750",
      "Fort Worth: 2001 Beach St #225, Fort Worth, TX 76103",
      "San Antonio: 1802 NE LOOP 410 Ste 120 San Antonio TX 78217",
      "Teléfono: +1 833-887-7273",
    ],
  },
  { tipo: "parrafo", texto: ["Última actualización: Agosto 2026"] },
];
