import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { offices, site, socials } from "@/lib/site";

/**
 * Footer — nodos del rango y=7794..8262 de la frame 1:2 (fondo 41:13, alto 468).
 * Todos los valores leídos del archivo por la API REST. Las coordenadas de abajo
 * son relativas al inicio del footer (y absoluta − 7794).
 *
 *   fondo   41:13  degradado lineal vertical #172339 5.95% → #0f0f0f 82.68%
 *   claim   59:73  x211  y84   347×55   Poppins 300 22px lh1.04
 *   logo    41:21  x904  y59   111×78
 *   cta     59:75  x1237 y103           Poppins 400 14px
 *   correo  83:123 x1343 y84            Poppins 400 14px
 *   tel     59:71  x1383 y102  141×17   Poppins 700 16px #08b6ff
 *   redes          x1548 y87   30×30, separación 12px
 *   sedes   62:76..101:64  x283 y220, 5 columnas de 230 con hueco de 51
 *                          Poppins 300 16px centrado; la ciudad en 700 dentro
 *                          del mismo nodo de texto
 *   línea   62:80  x101  y333  1745, trazo blanco de 0.5px
 *   legal   59:74  y394  288×24  Poppins 300 12px centrado, dos líneas,
 *                                con los enlaces subrayados
 *
 * Igual que el hero: a partir de `design` (1920) se posiciona en absoluto para
 * clavar esas coordenadas; por debajo, los mismos elementos fluyen apilados.
 */
export function SiteFooter() {
  return (
    <footer className="bg-vernal-footer relative text-white design:h-[468px]">
      <div className="relative mx-auto max-w-[1920px] px-6 pt-[84px] pb-10 lg:px-12 design:h-full design:p-0">
        <p className="text-center text-[22px] leading-[23px] font-light design:absolute design:top-[84px] design:left-[211px] design:w-[347px] design:text-left">
          {site.tagline}
        </p>

        <Link
          href="/"
          aria-label={site.name}
          className="mt-10 flex justify-center design:absolute design:top-[59px] design:left-[904px] design:mt-0 design:block"
        >
          <Logo />
        </Link>

        <Link
          href="/contacto"
          className="mt-8 block text-center text-[14px] leading-[15px] transition-colors hover:text-vernal-accent design:absolute design:top-[103px] design:left-[1237px] design:mt-0"
        >
          Agenda tu consulta
        </Link>

        <a
          href={`mailto:${site.email}`}
          className="mt-3 block text-center text-[14px] leading-[15px] transition-colors hover:text-vernal-accent design:absolute design:top-[84px] design:left-[1343px] design:mt-0"
        >
          {site.email}
        </a>

        <a
          href={site.phoneHref}
          className="text-vernal-accent mt-2 block text-center text-[16px] leading-[17px] font-bold whitespace-nowrap design:absolute design:top-[102px] design:left-[1383px] design:mt-0"
        >
          {site.phone}
        </a>

        <ul className="mt-6 flex items-center justify-center gap-x-[12px] design:absolute design:top-[87px] design:left-[1548px] design:mt-0">
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

        <ul className="mt-14 grid grid-cols-2 justify-items-center gap-x-[51px] gap-y-10 sm:grid-cols-3 design:absolute design:top-[220px] design:left-[283px] design:mt-0 design:grid-cols-[repeat(5,230px)] design:gap-y-0">
          {offices.map((office) => (
            <li
              key={office.city}
              className="max-w-[230px] text-center text-[16px] leading-[17px] font-light design:w-[230px] design:max-w-none"
            >
              <span className="font-bold">{office.city}</span>
              <br />
              {office.address}
            </li>
          ))}
        </ul>

        <hr className="mt-14 border-0 border-t-[0.5px] border-white design:absolute design:top-[333px] design:left-[101px] design:mt-0 design:w-[1745px]" />

        <p className="mt-6 text-center text-[12px] leading-[12px] font-light design:absolute design:top-[394px] design:left-1/2 design:mt-0 design:w-[288px] design:-translate-x-1/2">
          © 2026 – ABOGADO VERNAL. All right reserved.
          <br />
          <a href={site.privacyUrl} className="underline hover:text-vernal-accent">
            Políticas de privacidad.
          </a>
          {"  "}
          <a href={site.termsUrl} className="underline hover:text-vernal-accent">
            Términos y condiciones
          </a>
        </p>
      </div>
    </footer>
  );
}
