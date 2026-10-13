/**
 * Texto de la Política de Privacidad — artboard "VERNAL - POLITICAS DE
 * PRIVACIDAD" (nodo 425:2203, export del 2026-09-13), EN INGLÉS.
 *
 * El despacho pidió el 2026-10-12 que este texto y el de términos y condiciones
 * vayan en inglés por la TCPA, también en la versión en español del sitio (la
 * revisión de las campañas A2P 10DLC la hacen en inglés). Es una traducción
 * nuestra del texto en español del artboard, apartado por apartado y sin
 * añadir ni quitar nada: PENDIENTE de que la revise un abogado del despacho. El
 * original en español está en el historial de git (commit anterior a este).
 *
 * Es un texto legal (consentimiento de SMS/WhatsApp): no se reescribe ni se
 * "mejora". Cualquier cambio tiene que venir del cliente.
 *
 * Datos de contacto: Houston es "Suite 105" (el artboard traía "Ste 580") y el
 * teléfono de este documento es el 833-887-7273, que el despacho pidió mantener
 * aquí aunque el resto del sitio use otro. Austin y Fort Worth van con la forma
 * del artboard ("suite 745", sin "Suite").
 *
 * `negrita` se conserva por si el diseño vuelve a distinguir apartados.
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
  { tipo: "titulo", nivel: 2, texto: "1. Introduction", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "The Law Office of ",
      { texto: "Vernal Farnum Mejia", cian: true },
      " is an immigration law firm located in Texas with offices in Dallas, Houston, Austin and Fort Worth. This Privacy Policy describes how The Law Office of Vernal Farnum Mejia collects, uses, stores and protects the personal information provided by the users of our website and our immigration legal services.",
    ],
  },
  {
    tipo: "parrafo",
    texto: [
      "By using our website or providing us with personal information through any of our registration forms, you accept the practices described in this Privacy Policy.",
    ],
  },
  {
    tipo: "parrafo",
    texto: [
      "By communicating with us through our contact channels, you agree that the firm may collect and store different types of personal data, obtained from various sources, including:",
    ],
  },
  {
    tipo: "lista",
    items: [
      {
        texto: "Data you share with us directly:",
        sub: [
          "When filling out forms or questionnaires in digital ads on Facebook, Instagram, Google, TikTok, YouTube, landing pages, or when registering for an event.",
          "Through organic channels, such as messages on Messenger, Instagram and TikTok, forms on the website, Google Business Profile chats, emails and text messages.",
        ],
      },
      {
        texto: "Data from telephone contact:",
        sub: [
          "When you contact us at the telephone numbers published on our social media, advertising campaigns or website.",
        ],
      },
      {
        texto: "Data from your browsing on the site:",
        sub: [
          "Information collected through cookies and devices, including IP address, pages visited and the date of each visit.",
        ],
      },
      {
        texto: "Data obtained from third parties:",
        sub: ["Provided by the firm's attorneys, paralegals and representatives of the firm."],
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "2. Information We Collect", negrita: false },
  {
    tipo: "titulo",
    nivel: 3,
    texto: "2.1 Personal Information Provided Voluntarily",
    negrita: false,
  },
  {
    tipo: "parrafo",
    texto: ["We may collect personal information that you provide to us directly, including:"],
  },
  {
    tipo: "lista",
    items: [
      { texto: "Full name" },
      { texto: "Email address" },
      { texto: "Telephone number" },
      {
        texto:
          "Country of origin and immigration status (only when strictly necessary to evaluate your case)",
      },
      {
        texto:
          "Legal or personal documentation submitted as part of our services (only when strictly necessary to evaluate your case)",
      },
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "2.2 Information Collected Automatically", negrita: false },
  {
    tipo: "parrafo",
    texto: ["We may collect non-identifiable information through tools such as cookies, including:"],
  },
  {
    tipo: "lista",
    items: [
      { texto: "IP address" },
      { texto: "Browser type" },
      { texto: "Pages visited on our site" },
      { texto: "Browsing time" },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "3. Use of Information", negrita: false },
  {
    tipo: "lista",
    items: [
      { texto: "The information collected may be used to:" },
      { texto: "Provide legal advice and evaluate immigration cases" },
      { texto: "Respond to inquiries or requests" },
      { texto: "Improve our website and services" },
      { texto: "Comply with legal or regulatory requirements" },
      {
        texto:
          "Communicate with you through transactional and informational WhatsApp messages, SMS or telephone calls related to your case or legal consultation",
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "4. Disclosure of Information", negrita: false },
  { tipo: "parrafo", texto: ["We do not share personal information with third parties except:"] },
  {
    tipo: "lista",
    items: [
      { texto: "When necessary for the legal representation of the client" },
      { texto: "When the client explicitly authorizes it" },
      { texto: "To comply with legal or regulatory obligations or court orders" },
      {
        texto:
          "We do not share, sell or provide your mobile telephone number or your messaging consent data (SMS/WhatsApp) to third parties or affiliates for marketing or promotional purposes.",
      },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "5. Information Security", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "We implement reasonable technical and administrative measures to protect personal information against unauthorized access, loss or disclosure.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "6. Data Retention", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Personal information is retained only for as long as necessary to fulfill the purposes described in this Policy or as required by law.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "7. A2P 10DLC Compliance", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "To comply with A2P 10DLC requirements and ensure transparency in the use of SMS and WhatsApp messaging, we inform you of the following:",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.1 Express Consent (Opt-In)", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "By providing your telephone number to The Law Office of Vernal Farnum Mejia through forms on our website, direct messages, WhatsApp or any other means, you give explicit consent to receive:",
    ],
  },
  {
    tipo: "lista",
    items: [
      { texto: "Appointment confirmations" },
      { texto: "Communications about your case" },
      { texto: "Informational or administrative messages" },
      { texto: "Updates related to our legal services" },
    ],
  },
  {
    tipo: "parrafo",
    pegado: true,
    texto: [
      "The messages and calls we send are strictly service-related and informational, directly related to your immigration case. We do not use these channels for promotional or marketing messaging.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.2 Cancellation (Opt-Out)", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      'You may cancel the receipt of messages at any time by replying with the word "STOP". After receiving your request, we will stop sending you messages, except those necessary to comply with legal or regulatory obligations.',
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.3 Message Charges", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Depending on your mobile carrier, standard message and data rates may apply. The Firm is not responsible for charges generated by your telephone company.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.4 Message Frequency", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Message frequency may vary depending on the case or the stage of the legal service. We are committed to sending only relevant communications.",
    ],
  },
  { tipo: "titulo", nivel: 3, texto: "7.5 Use of Data for Messaging", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Your telephone number will be used exclusively for purposes related to the provision of our legal services and communications authorized by you. We do not share, sell or provide your mobile telephone number or your messaging consent data to third parties or affiliates for marketing or promotional purposes.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "8. User Rights", negrita: false },
  { tipo: "parrafo", texto: ["You have the right to:"] },
  {
    tipo: "lista",
    items: [
      { texto: "Access your personal information" },
      { texto: "Request corrections" },
      { texto: "Request the deletion of your information when applicable" },
      { texto: "Revoke the consent provided" },
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "9. Links to External Sites", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "Our site may contain links to external websites. We are not responsible for their privacy practices.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "10. Changes to This Policy", negrita: false },
  {
    tipo: "parrafo",
    texto: [
      "We may update this Policy periodically. The most recent version will be available on our website.",
    ],
  },

  { tipo: "titulo", nivel: 2, texto: "11. Contact", negrita: false },
  { tipo: "parrafo", texto: ["Addresses of Our Offices:"] },
  {
    tipo: "lineas",
    lineas: [
      "Dallas: 7929 Brookriver Dr #540, Dallas, TX 75247",
      "Houston: 10333 Harwin Dr. Suite 105, Houston, TX 77036",
      "Austin: 13809 Research Blvd suite 745, Austin, TX 78750",
      "Fort Worth: 2001 Beach St #225, Fort Worth, TX 76103",
      "San Antonio: 1802 NE LOOP 410 Ste 120 San Antonio TX 78217",
      "Telephone: +1 833-887-7273",
    ],
  },
  { tipo: "parrafo", texto: ["Last updated: August 2026"] },
];
