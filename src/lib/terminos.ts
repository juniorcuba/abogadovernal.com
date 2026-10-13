/**
 * Texto de los Términos y Condiciones — artboard "VERNAL - TERMINOS Y
 * CONDICIONES" (nodo 809:1815, export del 2026-09-26), EN INGLÉS.
 *
 * Como la política de privacidad, va en inglés por la TCPA desde el 2026-10-12,
 * también en la versión en español del sitio. Es una traducción nuestra del
 * texto en español del artboard, sin añadir ni quitar nada: PENDIENTE de que la
 * revise un abogado del despacho. El original en español está en el historial
 * de git.
 *
 * Es un documento legal: no se reescribe ni se "mejora". Cualquier cambio viene
 * del cliente.
 *
 * El teléfono del punto 9 es el 833-887-7273: el despacho pidió mantenerlo en
 * los textos legales aunque el resto del sitio use otro.
 */

/** El recuadro cian de arriba: el descargo de responsabilidad. */
export const descargoInmigracion = {
  titulo: "Immigration Disclaimer",
  /** Los trozos en negrita van marcados, como en el archivo. */
  parrafo: [
    "The Law Office of Vernal Farnum Mejia is a private firm and ",
    { negrita: "is not affiliated with or part of the Department of Homeland Security (DHS), USCIS, ICE, CBP or any government agency." },
    " The information provided on this site is of a general nature only and ",
    { negrita: "does not constitute legal advice." },
    " Immigration decisions depend on multiple factors, and past results do not guarantee future results. Users are advised to consult directly with one of our attorneys to receive personalized legal guidance.",
  ] as (string | { negrita: string })[],
};

export const actualizacion = "Last updated: December 2025";

export type SeccionTerminos = { titulo: string; parrafo: string };

export const terminos: SeccionTerminos[] = [
  {
    titulo: "1. Acceptance of the Terms",
    parrafo:
      "By accessing or using this website, you agree to comply with these Terms and Conditions. If you do not agree, you must refrain from using it.",
  },
  {
    titulo: "2. Use of the Website",
    parrafo:
      "This website provides general information about immigration legal services. The content is for informational purposes only and does not constitute legal advice.",
  },
  {
    titulo: "3. No Attorney-Client Relationship",
    parrafo:
      "Use of the website or the submission of a contact form does not create an attorney-client relationship. Such a relationship is only formalized by written agreement.",
  },
  {
    titulo: "4. Intellectual Property",
    parrafo:
      "All content on the site, including text, logos and documents, is the property of the Firm and may not be reproduced without authorization.",
  },
  {
    titulo: "5. Limitation of Liability",
    parrafo:
      "The Firm does not guarantee that the content of the site is accurate, complete or up to date. We will not be liable for damages arising from the use of the site or from reliance on its content.",
  },
  {
    titulo: "6. Third-Party Links",
    parrafo:
      "Our site may contain links to third-party pages. We are not responsible for their content or policies.",
  },
  {
    titulo: "7. Modifications",
    parrafo:
      "We reserve the right to modify these Terms and Conditions at any time. Updates will be published on this same page.",
  },
  {
    titulo: "8. Governing Law",
    parrafo:
      "These Terms shall be governed by the applicable laws of the State of Texas, United States.",
  },
  {
    titulo: "9. Contact",
    parrafo: "If you have questions about these Terms, you may call us at:",
  },
];

/** El teléfono del punto 9, que en el archivo es un enlace. */
export const telefonoTerminos = { texto: "833-887-7273", href: "tel:+18338877273" };
