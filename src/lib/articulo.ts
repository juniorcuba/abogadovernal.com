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
 * Por ahora solo hay un artículo escrito; los otros cinco del listado siguen
 * con el texto de relleno, así que todos muestran este.
 */
export type TrozoArticulo =
  | string
  | { fuerte: string }
  | { enlace: string; href: string };

export type NodoArticulo =
  | { tipo: "parrafo"; trozos: TrozoArticulo[]; pegado?: boolean }
  | { tipo: "titulo"; texto: string }
  | { tipo: "titulo2"; texto: string }
  | { tipo: "lista"; items: TrozoArticulo[][] }
  | { tipo: "imagen" };

export type Articulo = {
  slug: string;
  titulo: string[];
  etiquetas: string[];
  imagen: string;
  cuerpo: NodoArticulo[];
};

export const articulo: Articulo = {
  slug: "visa-vawa-camino-libertad-residencia",
  titulo: ["Visa VAWA: Tu camino hacia la", "libertad y la residencia legal en", "EE. UU."],
  etiquetas: ["Visa VAWA", "Naturalización"],
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
