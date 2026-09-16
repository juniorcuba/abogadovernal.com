import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { MenuMovil } from "@/components/layout/menu-movil";
import { AvisoCookies } from "@/components/layout/aviso-cookies";
import { navItems, site, socials } from "@/lib/site";

/**
 * Header del sitio — frame 1:2, 1920×128. Medidas del export SVG del 2026-09-13.
 *
 *   enlaces   Inicio x242 · Nosotros x336 · Áreas de práctica x454 ·
 *             Testimoniales x644 · Blogs x802 | logo | FAQS x1083 ·
 *             Contacto x1169 · "Llamanós" x1289 · teléfono x1366.8
 *             Poppins 16/400, línea base y84.1
 *   logo      x905 y25  111×78, centrado exacto (centro 960.5)
 *   redes     25×25 en y64, x1545 / 1581 / 1617 / 1653 (paso de 36)
 *
 * En 1920 cada pieza va en su x del archivo: los grupos no tienen separación
 * uniforme (52, 64 y 86 px entre enlaces), así que un `gap` no los reproduce.
 * "Llamanós" va literal, con la tilde del archivo.
 *
 * Estático, como en el archivo: el hero se mete por debajo con -mt-[128px] y se ve
 * a través del 95% de opacidad.
 *
 * Por debajo de 1280 no hay diseño de cabecera de escritorio; lo de ahí es
 * criterio propio:
 *   - < xl (1280): menú hamburguesa (ver menu-movil.tsx).
 *   - < 2xl (1536): se ocultan las redes; el nav completo + teléfono no caben.
 *
 * Tamaño mínimo: el lienzo se reduce con la ventana y a 1280 el menú se leía a
 * 10,7px. Los dos grupos (izquierda: 242–845; derecha: 1083–1678) se amplían
 * con `scale: var(--menu)` (ver globals.css) desde el lado del logo hacia fuera,
 * así el texto no baja de 13px y el logo sigue centrado. A 1560 o más --menu vale
 * 1 y todo queda en las x del archivo.
 */

/** x de cada enlace en el lienzo de 1920, en el orden de `navItems`. */
const X_DISENO = [242, 336, 454, 644, 802, 1083, 1169];
const IZQUIERDA = 5;

/** Origen de cada grupo en el lienzo; los enlaces se colocan relativos a él. */
const GRUPO_IZQ = { x: 242, y: 70 };
const GRUPO_DER = { x: 1083, y: 64 };

function NavLink({
  label,
  href,
  x,
  y,
}: {
  label: string;
  href: string;
  x: number;
  y: number;
}) {
  return (
    <Link
      href={href}
      className="text-[16px] leading-[17px] whitespace-nowrap text-white transition-colors hover:text-vernal-accent design:absolute design:top-[var(--y)] design:left-[var(--x)]"
      style={{ "--x": `${x}px`, "--y": `${y}px` } as React.CSSProperties}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    // El aviso de cookies va FUERA del <header>: la cabecera lleva opacidad del
    // 95% y el aviso es negro puro en el archivo.
    <div className="relative z-50">
      <header className="bg-vernal-grad shadow-vernal-header relative opacity-95 movil:bg-none movil:opacity-100 movil:shadow-none">
        {/* En el lienzo móvil la cabecera son DOS filas: el degradado radial de
            402×70 con menú, logo e idioma, y debajo una barra cian de 36 con el
            teléfono. En escritorio es una sola de 128. */}
        <div className="relative mx-auto flex h-[128px] max-w-[1920px] items-center justify-between gap-x-3 px-5 sm:gap-x-8 sm:px-6 lg:px-10 movil:h-[70px] movil:px-0 design:block design:p-0">
          <div
            aria-hidden
            className="bg-vernal-grad pointer-events-none absolute inset-0 hidden movil:block"
          />
          <MenuMovil />
  
          <nav className="hidden items-center gap-x-6 xl:flex xl:gap-x-8 design:absolute design:top-[70px] design:left-[242px] design:block design:h-[17px] design:w-[603px] design:origin-right design:[scale:var(--menu)]">
            {navItems.slice(0, IZQUIERDA).map((item, i) => (
              <NavLink
                key={item.href}
                {...item}
                x={X_DISENO[i] - GRUPO_IZQ.x}
                y={0}
              />
            ))}
          </nav>
  
          <Link
            href="/"
            aria-label={site.name}
            className="static translate-x-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 xl:static xl:translate-x-0 movil:absolute movil:top-[16px] movil:left-[172px] movil:translate-x-0 design:absolute design:top-[25px] design:left-1/2 design:-translate-x-1/2"
          >
            <Logo className="movil:h-[40px] movil:w-[57px]" />
          </Link>
  
          <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 movil:hidden design:absolute design:top-[64px] design:left-[1083px] design:block design:h-[25px] design:w-[595px] design:origin-left design:[scale:var(--menu)]">
            <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 design:contents">
              <nav className="hidden items-center gap-x-6 xl:flex xl:gap-x-8 design:contents">
                {navItems.slice(IZQUIERDA).map((item, i) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    x={X_DISENO[IZQUIERDA + i] - GRUPO_DER.x}
                    y={GRUPO_IZQ.y - GRUPO_DER.y}
                  />
                ))}
              </nav>
  
              <a
                href={site.phoneHref}
                className="text-[13px] leading-[17px] whitespace-nowrap sm:text-[16px] design:absolute design:top-[6px] design:left-[206px]"
              >
                {/* Solo el diseño de 1920 lo trae; por debajo no cabe. */}
                <span className="hidden text-white design:inline">Llamanós </span>
                <span className="text-vernal-accent font-bold">{site.phone}</span>
              </a>
            </div>
  
            <ul className="hidden shrink-0 items-center gap-x-[12px] 2xl:flex design:absolute design:top-0 design:left-[462px] design:flex design:gap-x-[11px]">
              {socials.map((social) => (
                <li key={social.label} className="flex shrink-0">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={social.width}
                      height={social.height}
                      style={{ width: social.width, height: social.height }}
                      className="max-w-none design:!h-[25px] design:!w-[25px]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Selector de idioma. SOLO está en el diseño móvil: el de escritorio no
              lo trae. De momento es un rótulo, sin traducción detrás. */}
          <p
            aria-hidden
            className="hidden text-[14px] leading-[15px] font-medium movil:absolute movil:top-[24px] movil:left-[327px] movil:flex movil:gap-x-[12px]"
          >
            <span className="text-white">ES</span>
            <span className="text-[#323B4C]">EN</span>
          </p>
        </div>
  
        {/* Segunda fila del móvil: barra cian de 36 con el teléfono. */}
        <a
          href={site.phoneHref}
          className="bg-vernal-accent hidden items-center justify-center gap-x-[9px] movil:flex movil:h-[36px]"
        >
          <span className="text-vernal-navy text-[13px] leading-[14px]">
            ¡Llámanos y agenda hoy!
          </span>
          <span className="text-[13px] leading-[14px] font-bold text-white">
            {site.phone}
          </span>
        </a>
      </header>
      <AvisoCookies />
    </div>
  );
}
