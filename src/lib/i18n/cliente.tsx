"use client";

import { createContext, useCallback, useContext } from "react";
import { traducir, type Idioma } from "@/lib/i18n/idiomas";

/**
 * El idioma para los componentes de cliente. El layout monta el proveedor con
 * el `lang` de la ruta; dentro, `useT()` da la misma `t()` que usa el servidor.
 */
const ContextoIdioma = createContext<Idioma>("es");

export function ProveedorIdioma({ idioma, children }: { idioma: Idioma; children: React.ReactNode }) {
  return <ContextoIdioma.Provider value={idioma}>{children}</ContextoIdioma.Provider>;
}

export function useIdioma(): Idioma {
  return useContext(ContextoIdioma);
}

export function useT(): (texto: string) => string {
  const idioma = useContext(ContextoIdioma);
  return useCallback((texto: string) => traducir(idioma, texto), [idioma]);
}
