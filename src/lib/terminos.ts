/**
 * Texto de los Términos y Condiciones — LITERAL del artboard "VERNAL - TERMINOS
 * Y CONDICIONES" (nodo 809:1815, export del 2026-09-26).
 *
 * Como la política de privacidad, es un documento legal: no se reescribe ni se
 * "mejora". Cualquier cambio viene del cliente.
 *
 * El teléfono del punto 9, "833-887-7273", es el correcto (confirmado el 2026-10-09).
 */

/** El recuadro cian de arriba: el descargo de responsabilidad. */
export const descargoInmigracion = {
  titulo: "Descargo de responsabilidad de inmigración",
  /** Los trozos en negrita van marcados, como en el archivo. */
  parrafo: [
    "The Law Office of Vernal Farnum Mejia es una firma privada y ",
    { negrita: "no está afiliada ni es parte del Departamento de Seguridad Nacional (DHS), USCIS, ICE, CBP ni ninguna agencia gubernamental." },
    " La información proporcionada en este sitio es únicamente de carácter general y ",
    { negrita: "no constituye asesoría legal." },
    " Las decisiones migratorias dependen de múltiples factores y resultados pasados no garantizan resultados futuros. Se recomienda a los usuarios consultar directamente con uno de nuestros abogados para recibir orientación legal personalizada.",
  ] as (string | { negrita: string })[],
};

export const actualizacion = "Última actualización: Diciembre 2025";

export type SeccionTerminos = { titulo: string; parrafo: string };

export const terminos: SeccionTerminos[] = [
  {
    titulo: "1. Aceptación de los Términos",
    parrafo:
      "Al acceder o utilizar este sitio web, usted acepta cumplir con los presentes Términos y Condiciones. Si no está de acuerdo, debe abstenerse de utilizarlo.",
  },
  {
    titulo: "2. Uso del Sitio Web",
    parrafo:
      "Este sitio web proporciona información general sobre servicios legales de inmigración. El contenido es meramente informativo y no constituye asesoría legal.",
  },
  {
    titulo: "3. No Existe Relación Abogado-Cliente",
    parrafo:
      "El uso del sitio web o el envío de un formulario de contacto no crea una relación abogado-cliente. Esta solo se formaliza mediante acuerdo por escrito.",
  },
  {
    titulo: "4. Propiedad Intelectual",
    parrafo:
      "Todo el contenido del sitio, incluyendo textos, logotipos y documentos, es propiedad de la Firma y no puede ser reproducido sin autorización.",
  },
  {
    titulo: "5. Limitación de Responsabilidad",
    parrafo:
      "La Firma no garantiza que el contenido del sitio sea exacto, completo o actualizado. No seremos responsables de daños derivados del uso del sitio o de confiar en su contenido.",
  },
  {
    titulo: "6. Enlaces a Terceros",
    parrafo:
      "Nuestro sitio puede contener enlaces a páginas de terceros. No nos hacemos responsables por su contenido o políticas.",
  },
  {
    titulo: "7. Modificaciones",
    parrafo:
      "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las actualizaciones se publicarán en esta misma página.",
  },
  {
    titulo: "8. Legislación Aplicable",
    parrafo:
      "Estos Términos se regirán por las leyes aplicables en el estado de Texas, Estados Unidos.",
  },
  {
    titulo: "9. Contacto",
    parrafo: "Si tiene dudas sobre estos Términos, puede llamarnos al:",
  },
];

/** El teléfono del punto 9, que en el archivo es un enlace. */
export const telefonoTerminos = { texto: "833-887-7273", href: "tel:+18338877273" };
