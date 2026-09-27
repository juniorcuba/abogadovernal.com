/**
 * Las once fichas de /nuestro-equipo — frame `770:403` de Figma (2026-09-27).
 *
 * OJO: de esta página NO hay export SVG todavía, solo el render del artboard.
 * Los nombres y los cargos se leyeron del render y las fotos son recortes suyos
 * (carpeta images/equipo/ficha): sirven para ver la página montada, pero hay que
 * sustituirlas por el export cuando llegue. Las medidas de la retícula también
 * están tomadas sobre el render, así que son aproximadas.
 *
 * "Yannellys M · Nombre puesto" está así en el archivo: falta su cargo.
 */
export type Ficha = {
  nombre: string;
  cargo: string;
  foto: string;
  /** El cargo del fundador va en verde; el resto en blanco. */
  verde?: true;
};

export const equipo: Ficha[] = [
  { nombre: "Vernal Farnum", cargo: "Abogado fundador", foto: "/images/equipo/ficha/vernal-farnum.webp", verde: true },
  { nombre: "Racquel Medina", cargo: "Chief Legal Strategy", foto: "/images/equipo/ficha/racquel-medina.webp" },
  { nombre: "Alok Mohato", cargo: "Abogado", foto: "/images/equipo/ficha/alok-mohato.webp" },
  { nombre: "Marysol Rogel", cargo: "Asistente legal", foto: "/images/equipo/ficha/marysol-rogel.webp" },
  { nombre: "Adriana Roman", cargo: "Asistente legal", foto: "/images/equipo/ficha/adriana-roman.webp" },
  { nombre: "Edna Chavez", cargo: "Gestora de casos", foto: "/images/equipo/ficha/edna-chavez.webp" },
  { nombre: "Cecilia Scaiola.", cargo: "Paralegal", foto: "/images/equipo/ficha/cecilia-scaiola.webp" },
  { nombre: "Pedro Vargas", cargo: "Paralegal", foto: "/images/equipo/ficha/pedro-vargas.webp" },
  { nombre: "Vianery Rincon", cargo: "Recepcionista", foto: "/images/equipo/ficha/vianery-rincon.webp" },
  { nombre: "Lorena Gomez", cargo: "Atención a clientes", foto: "/images/equipo/ficha/lorena-gomez.webp" },
  { nombre: "Yannellys M", cargo: "Nombre puesto", foto: "/images/equipo/ficha/yannellys-m.webp" },
];

/**
 * Centros de columna y y de cada fila, medidos sobre el render: se localizaron
 * en él los píxeles del cian de los nombres y se tomaron su centro y su altura.
 * Las filas van de 368 en 368 y la foto empieza 27px por debajo de la mayúscula
 * del nombre.
 *
 * Los recortes de `ficha/` salen de esas mismas cajas del render y el fondo de
 * la franja (`rejilla-fondo.webp`) es el render con esas cajas y los textos
 * borrados, así que al recolocarlos encaja sin costuras.
 */
export const rejillaEquipo = {
  centros: [405, 749, 1093, 1432],
  filas: [1113, 1481, 1849],
  /** Caja de la foto y hueco entre la mayúscula del nombre y su borde superior. */
  foto: { ancho: 250, alto: 290, desde: 27 },
};
