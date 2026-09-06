/**
 * Identificador de ancla de una sede.
 *
 * Vive aquí y no en el acordeón porque el listado del hero es un componente de
 * servidor y el acordeón uno de cliente: llamar a una función exportada por un
 * módulo `"use client"` desde el servidor revienta el build.
 */
export function anclaSede(ciudad: string) {
  return ciudad.toLowerCase().replace(/ /g, "-");
}
