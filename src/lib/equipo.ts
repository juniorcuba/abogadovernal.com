/**
 * Las fichas de /nuestro-equipo — frame `770:403` de Figma.
 *
 * Todo sale del export `VERNAL - NUESTRO EQUIPO (1).svg` (2026-10-11): los
 * nombres, los cargos, el orden y los recortes con alfa de
 * `images/equipo/ficha`. Respecto al del 2026-09-27 entra Luis Escorcia, la
 * tercera fila queda Luis · Lorena · Yannellys · Vianery, Lorena pasa a
 * "Paralegal" y Yannellys ya trae apellido y cargo.
 *
 * El archivo escribe "Receptionista"; aquí va "Recepcionista".
 *
 * El 2026-10-21 Roberto pidió quitar a Cecilia Scaiola de todo el sitio: quedan
 * once, y la última fila de la rejilla va centrada (ver `posicion` en
 * sections/equipo.tsx).
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
  { nombre: "Pedro Vargas", cargo: "Paralegal", foto: "/images/equipo/ficha/pedro-vargas.webp" },
  { nombre: "Luis Escorcia", cargo: "Paralegal", foto: "/images/equipo/ficha/luis-escorcia.webp" },
  { nombre: "Lorena Gomez", cargo: "Paralegal", foto: "/images/equipo/ficha/lorena-gomez.webp" },
  { nombre: "Yannellys Mendoza", cargo: "Human Resources Manager", foto: "/images/equipo/ficha/yannellys-m.webp" },
  { nombre: "Vianery Rincon", cargo: "Recepcionista", foto: "/images/equipo/ficha/vianery-rincon.webp" },
];

/**
 * La retícula, en coordenadas de la franja (que empieza en y897 del artboard).
 *
 * `izquierdas` es la x de cada foto y `filas` la y de la caja del nombre, que
 * sale de su línea base (1126.8, 1494.8 y 1862.8 en el archivo) restándole los
 * 15.8 que van de la caja a la base con 18/19. El cargo cae 22.1 más abajo y la
 * foto empieza 61.8 por debajo de la caja del nombre.
 */
export const rejillaEquipo = {
  /** x de la foto; el texto va centrado sobre ella. */
  izquierdas: [294, 637, 987, 1324],
  filas: [214, 582, 950],
  /** Caja de la foto y separación desde la caja del nombre. */
  foto: { ancho: 226, alto: 269, desde: 61.8 },
  /** Separación entre la caja del nombre y la del cargo. */
  cargoDesde: 27.2,
};
