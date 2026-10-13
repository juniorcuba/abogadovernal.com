"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useIdioma, useT } from "@/lib/i18n/cliente";
import { rutaEnIdioma } from "@/lib/i18n/idiomas";
import { site } from "@/lib/site";

/**
 * El <form> de "Agenda tu consulta": manda los campos a /api/consulta y, si se
 * entregan al CRM, lleva a la página de gracias. Los campos los pone quien lo
 * usa (`CamposConsulta`); esto solo es el envío.
 *
 * Además de lo que se ve, manda:
 *   envio_id   una clave por intento, para que un doble clic o un reintento no
 *              llegue dos veces al CRM (la comprueba el servidor)
 *   idioma     en qué idioma se estaba navegando
 *   pagina     desde qué página se envió (es la "campaña" del CRM)
 *   sitio_web  un campo señuelo, invisible: si llega relleno es un bot
 *
 * Sin JavaScript sigue funcionando: el formulario hace un POST normal y el
 * servidor redirige a la página de gracias.
 *
 * La validación de verdad está en el servidor; aquí solo hay la del navegador
 * (`required`, `type="email"`).
 */
const RUTA = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/consulta`;

const ROTULOS: Record<string, string> = {
  nombre: "Nombre",
  telefono: "Teléfono",
  correo: "Correo",
  oficina: "Oficina o modalidad de atención:",
  comentarios: "Comentarios",
};

export function FormularioConsulta({ className, children }: { className?: string; children: React.ReactNode }) {
  const t = useT();
  const idioma = useIdioma();
  const router = useRouter();
  const envioId = useRef<string | null>(null);
  // El estado tarda un render en cambiar; esto corta el segundo clic al instante.
  const enCurso = useRef(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enCurso.current) return;
    enCurso.current = true;
    setEnviando(true);
    setError(null);

    const datos: Record<string, string> = {};
    for (const [clave, valor] of new FormData(evento.currentTarget)) {
      if (typeof valor === "string") datos[clave] = valor;
    }
    // La misma clave mientras se reintenta este envío; una nueva tras el éxito.
    envioId.current ??= crypto.randomUUID();
    datos.envio_id = envioId.current;
    datos.idioma = idioma;
    datos.pagina = window.location.pathname;

    try {
      const respuesta = await fetch(RUTA, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (respuesta.ok) {
        envioId.current = null;
        router.push(rutaEnIdioma(idioma, "/gracias"));
        return;
      }
      const cuerpo: { error?: string; campos?: string[] } = await respuesta.json().catch(() => ({}));
      if (cuerpo.error === "datos" && cuerpo.campos?.length) {
        const campos = cuerpo.campos.map((c) => t(ROTULOS[c] ?? c).replace(/:$/, "")).join(", ");
        setError(`${t("Revisa estos datos y vuelve a enviar:")} ${campos}.`);
      } else if (cuerpo.error === "limite") {
        setError(`${t("Has hecho varios envíos seguidos. Espera unos minutos o llámanos al")} ${site.phone}.`);
      } else {
        setError(`${t("No pudimos enviar tu mensaje. Inténtalo de nuevo o llámanos al")} ${site.phone}.`);
      }
    } catch {
      setError(`${t("No pudimos enviar tu mensaje. Inténtalo de nuevo o llámanos al")} ${site.phone}.`);
    }
    enCurso.current = false;
    setEnviando(false);
  }

  return (
    <form
      action={RUTA}
      method="post"
      onSubmit={enviar}
      aria-busy={enviando}
      className={`${className ?? ""} ${enviando ? "[&_button[type=submit]]:pointer-events-none [&_button[type=submit]]:opacity-60" : ""}`}
    >
      <input type="hidden" name="idioma" value={idioma} />
      {/* Señuelo para bots: fuera de la vista y del orden de tabulación. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <label>
          Sitio web
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {children}
      {error && (
        <p role="alert" className="mt-3 text-[13px] leading-[17px] font-medium text-[#FFB4B4]">
          {error}
        </p>
      )}
    </form>
  );
}
