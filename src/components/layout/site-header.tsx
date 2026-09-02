import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { navItems, site, socials } from "@/lib/site";

/**
 * Header del sitio — nodo Figma 6:92 ("Group 1"), 1920×128.
 *
 * Geometría exacta del artboard:
 *   grupo izq.  x201..819    Nosotros / Áreas de servicio / Áreas de practica /
 *                            Testimoniales, separación uniforme de 52px
 *   logo        x905  y25    111×78, centrado exacto (centro 960.5 = centro del lienzo)
 *   grupo der.  x1125..1571  Blogs / FAQS / Contacto / teléfono, separación de 48px
 *   redes       x1597..1754  30×30 (Instagram 29×30), separación de 12px,
 *                            a 26px del teléfono
 *
 * Dos detalles del archivo que no son obvios:
 *  - El logo está centrado verticalmente (y25, alto 78 → centro 64), pero los
 *    enlaces y las redes van ~16px MÁS ABAJO (centro ~80). De ahí el pt de 32
 *    sobre una caja de 128: el contenido se centra en 80 y el logo se posiciona aparte.
 *  - Los grupos izquierdo (618px) y derecho (629px) no miden lo mismo, así que
 *    `justify-between` dejaba el logo 12px descentrado. Va en absoluto.
 *
 * Estático, como en el archivo: el hero se mete por debajo con -mt-[128px] y se ve
 * a través del 95% de opacidad, igual que el fondo 6:88 que arranca en y=9.
 *
 * El Figma solo trae el artboard de escritorio (1920). Los cortes de aquí abajo
 * son decisiones de implementación, no del diseño:
 *   - < lg (1024): falta el menú móvil (hamburguesa). PENDIENTE de diseño.
 *   - < 2xl (1536): se ocultan las redes; el nav completo + teléfono no caben con ellas.
 */

const leftNav = navItems.slice(0, 4);
const rightNav = navItems.slice(4);

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-[16px] leading-[1.04] whitespace-nowrap text-white transition-colors hover:text-vernal-accent"
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-vernal-grad shadow-vernal-header relative z-50 opacity-95">
      <div className="relative mx-auto flex h-[128px] max-w-[1920px] items-center justify-between gap-x-8 px-6 lg:px-10 design:pt-[32px] design:pr-[166px] design:pl-[201px]">
        <nav className="hidden items-center gap-x-6 lg:flex xl:gap-x-8 design:gap-x-[52px]">
          {leftNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <Link
          href="/"
          aria-label={site.name}
          className="design:absolute design:top-[25px] design:left-1/2 design:-translate-x-1/2"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 design:gap-x-[26px]">
          <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 design:gap-x-[48px]">
            <nav className="hidden items-center gap-x-6 lg:flex xl:gap-x-8 design:gap-x-[48px]">
              {rightNav.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>

            <a
              href={site.phoneHref}
              className="text-vernal-accent text-[16px] leading-[1.04] font-bold whitespace-nowrap"
            >
              {site.phone}
            </a>
          </div>

          <ul className="hidden shrink-0 items-center gap-x-[12px] 2xl:flex">
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
                    className="max-w-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
