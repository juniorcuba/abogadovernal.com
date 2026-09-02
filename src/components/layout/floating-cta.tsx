import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * CTA flotante del hero — nodo 18:25 ("Group 2"), x1571 y886, 349px de ancho,
 * pegado al borde derecho (1571 + 349 = 1920).
 *   barra superior 97:45  349×37   #00b567, texto 21px SemiBold #172339
 *   barra inferior 18:20  349×73   #08b6ff, texto 21px Regular #172339
 *   icono chat     18:22  41×35.279
 * Ambas barras llevan "Vernal Shadow 1".
 */
export function FloatingCta() {
  return (
    <div className="absolute top-[886px] right-0 z-10 hidden w-[349px] design:block">
      <Link
        href="/contacto"
        className="bg-vernal-green shadow-vernal-1 flex h-[37px] items-center justify-center text-[21px] leading-[1.04] font-semibold text-vernal-navy transition-opacity hover:opacity-90"
      >
        ¡Agenda tu consulta!
      </Link>
      <a
        href={site.phoneHref}
        className="bg-vernal-accent shadow-vernal-1 flex h-[73px] items-center justify-center gap-[15px] text-[21px] leading-[1.04] text-vernal-navy transition-opacity hover:opacity-90"
      >
        <Image
          src="/icons/chat.svg"
          alt=""
          width={41}
          height={35}
          style={{ width: 41, height: 35.279 }}
          className="max-w-none shrink-0"
        />
        Chat en Vivo
      </a>
    </div>
  );
}
