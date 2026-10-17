import { notFound } from "next/navigation";

/**
 * Cualquier ruta que no exista cae aquí y sale por `not-found.tsx`, que así se
 * pinta dentro del layout y en el idioma de la ruta.
 */
export default function NoExiste() {
  notFound();
}
