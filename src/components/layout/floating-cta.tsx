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
 *
 * En el lienzo móvil deja de ser un flotante a la derecha y pasa a ocupar el
 * ancho entero en y672: verde de 37 y cian de 62.
 */
export function FloatingCta({ className }: { className?: string } = {}) {
  return (
    // La `y` la pone quien lo usa: en la home cae dentro del hero y en /nosotros
    // dentro de la sección siguiente, porque ese hero es más corto.
    <div
      className={`absolute right-0 z-10 hidden w-[349px] movil:top-[672px] movil:right-auto movil:left-[-2px] movil:block movil:w-[403px] design:block ${
        className ?? "design:top-[886px]"
      }`}
    >
      <Link
        href="/contacto"
        className="bg-vernal-green shadow-vernal-1 flex h-[37px] items-center justify-center text-[21px] leading-[22px] font-semibold text-vernal-navy transition-opacity hover:opacity-90 movil:text-[15px] movil:leading-[16px] movil:shadow-none"
      >
        ¡Agenda tu consulta!
      </Link>
      <a
        href={site.phoneHref}
        className="bg-vernal-accent shadow-vernal-1 flex h-[73px] items-center justify-center gap-[15px] text-[21px] leading-[22px] text-vernal-navy transition-opacity hover:opacity-90 movil:h-[62px] movil:gap-[13px] movil:pr-[22px] movil:pb-[8px] movil:text-[15px] movil:leading-[16px] movil:font-normal movil:shadow-none"
      >
        <Image
          src="/icons/chat.svg"
          alt=""
          width={41}
          height={35}
          style={{ width: 41, height: 35.279 }}
          className="max-w-none shrink-0 movil:!h-[25px] movil:!w-[29px]"
        />
        Chat en Vivo
      </a>
    </div>
  );
}
