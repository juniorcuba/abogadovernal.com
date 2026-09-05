"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navItems, site, socials } from "@/lib/site";

/**
 * Menú móvil.
 *
 * NO viene del Figma: el archivo solo trae el artboard de escritorio de 1920 y no
 * hay diseño para anchos menores. Esto es una solución de oficio para que el sitio
 * sea usable y no se vea roto al compartirlo, construida con los tokens y la
 * tipografía del diseño. Sustituir cuando llegue el diseño móvil real.
 */
export function MenuMovil() {
  const [abierto, setAbierto] = useState(false);

  // Bloquear el scroll del fondo mientras el panel está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-label="Abrir menú"
        aria-expanded={abierto}
        className="flex h-[44px] w-[44px] items-center justify-center"
      >
        <span aria-hidden className="relative block h-[16px] w-[26px]">
          <span className="absolute top-0 left-0 h-[2px] w-full bg-white" />
          <span className="absolute top-[7px] left-0 h-[2px] w-full bg-white" />
          <span className="absolute top-[14px] left-0 h-[2px] w-full bg-white" />
        </span>
      </button>

      {abierto && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-vernal-ink/98">
          <div className="flex h-[128px] shrink-0 items-center justify-between px-6">
            <Image
              src="/brand/logo-vernal.svg"
              alt={site.name}
              width={90}
              height={63}
              className="h-[63px] w-[90px]"
            />
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar menú"
              className="flex h-[44px] w-[44px] items-center justify-center text-[30px] leading-none text-white"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6">
            <ul className="flex flex-col gap-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAbierto(false)}
                    className="block border-b border-white/10 py-4 text-[20px] leading-[21px] text-white transition-colors hover:text-vernal-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={site.phoneHref}
              className="text-vernal-accent mt-8 block text-[22px] leading-[23px] font-bold"
            >
              {site.phone}
            </a>

            <ul className="mt-6 mb-10 flex items-center gap-x-[14px]">
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
          </nav>
        </div>
      )}
    </div>
  );
}
