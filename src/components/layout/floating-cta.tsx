import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * CTA flotante — nodo 18:25 ("Group 2"), 349px de ancho.
 *   barra superior 97:45  349×37   #00b567, texto 21px SemiBold #172339
 *   barra inferior 18:20  349×73   #08b6ff, texto 21px Regular #172339
 *   icono chat     18:22  41×35.279
 * Ambas barras llevan "Vernal Shadow 1".
 *
 * En el archivo está en el hero de cada página (en la home, x1568 y883, a 3px
 * del borde derecho). Aquí es FIJO y acompaña al scroll por todo el sitio, así
 * que se pinta una sola vez desde layout.tsx.
 *
 *   escritorio  a 3px del borde derecho y 60px del inferior: en una ventana de
 *               1920×1080 cae casi donde lo pone el archivo (y≈910)
 *   móvil       barra de ancho entero pegada abajo: verde de 37 y cian de 62,
 *               como en el diseño de 402
 *   intermedio  sin diseño; el de escritorio a la derecha
 *
 * `fixed` funciona dentro del lienzo porque `zoom` no crea bloque contenedor
 * (un transform sí lo haría), y las distancias se escalan con él.
 */
export function FloatingCta() {
  return (
    <div className="fixed right-0 bottom-6 z-40 w-[300px] movil:right-auto movil:bottom-0 movil:left-0 movil:w-[402px] design:right-[3px] design:bottom-[60px] design:w-[349px]">
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
