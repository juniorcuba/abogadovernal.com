"use client";

import { useState } from "react";

/**
 * Botón de play que, al pulsarlo, monta el vídeo de YouTube dentro de la misma
 * caja, encima de la carátula (2026-10-12; en el archivo los plays son enlaces
 * de prototipo a YouTube y Roberto los pidió incrustados).
 *
 * El iframe ocupa el contenedor posicionado más cercano (`absolute inset-0`),
 * así que el botón tiene que ir dentro de la caja del vídeo. No se carga nada
 * de YouTube hasta que la persona pulsa: ni peso ni cookies de terceros antes
 * de eso, y el dominio es el de privacidad mejorada (youtube-nocookie.com).
 *
 * `embed` es lo que va tras `/embed/`: el id de un vídeo ("zor7RwZACfk") o una
 * lista ("videoseries?list=…"). `claseMarco` redondea el iframe como la caja.
 */
export function VideoYoutube({
  embed,
  titulo,
  etiqueta,
  claseBoton,
  claseMarco = "",
  children,
}: {
  embed: string;
  /** Título accesible del iframe. */
  titulo: string;
  /** aria-label del botón de play. */
  etiqueta: string;
  claseBoton: string;
  claseMarco?: string;
  children: React.ReactNode;
}) {
  const [activo, setActivo] = useState(false);

  if (activo) {
    const union = embed.includes("?") ? "&" : "?";
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${embed}${union}autoplay=1&rel=0`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className={`absolute inset-0 z-30 h-full w-full border-0 bg-black ${claseMarco}`}
      />
    );
  }

  return (
    <button type="button" aria-label={etiqueta} onClick={() => setActivo(true)} className={claseBoton}>
      {children}
    </button>
  );
}
