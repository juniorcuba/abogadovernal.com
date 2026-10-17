# Sesiones en paralelo — contexto común

Este archivo lo carga cada sesión de Claude Code al abrir el proyecto (lo importa
`CLAUDE.md`). Sirve para que varias sesiones trabajen a la vez en vistas
distintas con el mismo punto de partida. Si aprendes algo que las otras sesiones
necesitan, añádelo aquí.

## Cómo se reparte el trabajo

Todas las sesiones comparten **la misma carpeta, la misma rama (`main`) y un solo
servidor local**. No hay worktrees: esta máquina no aguanta tres servidores de
desarrollo a la vez.

Roberto asigna a cada sesión **un carril** (una vista) al empezar. Los archivos
de cada vista:

| Carril | Página | Componentes | Datos |
|---|---|---|---|
| Nosotros | `src/app/[lang]/nosotros/` | `src/components/sections/nosotros-*.tsx` | — |
| Testimoniales | `src/app/[lang]/testimoniales/` | `sections/testimoniales.tsx` | `src/lib/testimonios.ts` |
| Nuestro equipo | `src/app/[lang]/nuestro-equipo/` | `sections/equipo.tsx` | `src/lib/equipo.ts` |
| Sedes | `src/app/[lang]/areas-de-servicio/[sede]/` | `sections/sede.tsx` | `src/lib/sedes.ts` |
| Blog y artículo | `src/app/[lang]/blog/` | `sections/blog-listado.tsx`, `articulo.tsx`, `tarjeta-articulo.tsx` | `src/lib/blog.ts`, `articulo.ts` |
| FAQs | `src/app/[lang]/faqs/` | `sections/faqs-*.tsx`, `ui/lista-preguntas.tsx` | `src/lib/preguntas.ts` |
| Contacto | `src/app/[lang]/contacto/` | `sections/contacto-hero.tsx` | — |
| Home | `src/app/[lang]/page.tsx` | `hero`, `sobre-nosotros`, `bio-vernal`, `nuestro-equipo`, `nuestro-compromiso`, `servicios`, `como-trabajamos`, `transmisiones`, `testimonios` | — |

Las imágenes de cada vista van en su carpeta de `public/images/<vista>/`.

### Reglas para no pisarse

1. **Toca solo los archivos de tu carril.** Antes de editar un archivo compartido,
   dilo y espera el visto bueno de Roberto. Son compartidos: `src/app/[lang]/layout.tsx`,
   `src/app/globals.css`, `src/lib/site.ts`, todo `src/components/layout/`, todo
   `src/components/ui/`, y las secciones que usan varias páginas
   (`blog-resenas.tsx`, `agenda-consulta.tsx`, `bloque-preguntas.tsx`).
2. **Commits solo de tus archivos**, nombrándolos: `git add <rutas>`. Nunca
   `git add -A`, `git add .` ni `git commit -a`: se llevarían el trabajo a medias
   de otra sesión. Si `git status` enseña cambios que no son tuyos, déjalos.
3. **No hagas push.** Lo pide Roberto, y a una sola sesión. Tampoco `pull`,
   `rebase`, `stash`, `reset` ni `checkout` de archivos: afectan a todas.
4. Si git responde `index.lock`, otra sesión está en medio de un commit: espera
   unos segundos y repite. No borres el lock.
5. **Un solo servidor**, en `http://localhost:3100` (por `localhost`, no por
   `127.0.0.1`). Antes de arrancar uno comprueba si ya responde. No lo pares ni
   borres `.next/` sin avisar: tumba la vista previa de las otras sesiones. Para
   arrancarlo: `node node_modules/next/dist/bin/next dev -p 3100` en segundo plano.
6. Si un estilo nuevo no aparece aunque el código esté bien, el servidor no lo
   recogió: pasa cuando un archivo se guarda dos veces muy seguidas. Vuelve a
   guardar ese archivo (un cambio mínimo y deshacerlo) y recarga. Solo si eso no
   basta, avisa a Roberto antes de reiniciar el servidor.

## Cómo está hecho el sitio

Next.js 16 (lee `AGENTS.md`: no es el Next que conoces). Cada página se maqueta
sobre un lienzo fijo que se escala a la ventana (`components/layout/lienzo-diseno.tsx`):

| Ancho de ventana | Modo | Variante de Tailwind | Qué es |
|---|---|---|---|
| ≥ 1280 | escritorio | `design:` | El artboard de 1920, escalado (también crece por encima de 1920) |
| 561–1279 | apilada | `apilada:` | **No tiene diseño**: criterio propio |
| ≤ 560 | móvil | `movil:` | El artboard de 402, escalado |

`design:`, `movil:` y `apilada:` son clases, no breakpoints. Las posiciones de
`design:` y `movil:` son las coordenadas del artboard, sacadas del export, no
medidas a ojo. Cada componente lleva arriba un comentario con el nodo de Figma,
el rango `y` de su banda y lo que se decidió: léelo antes de tocar.

Sobre la franja apilada, lo que Roberto ha pedido: textos, titulares y botones
**centrados**; las fotos tienen que **llenar su caja** (las medidas fijas de 1920
dejan franjas vacías); que nada tape la cara de una persona; aire arriba y abajo.

## Idiomas (español e inglés)

El sitio está en dos idiomas desde el 2026-10-12. El español es la raíz
(`/nosotros`) y el inglés cuelga de `/en` (`/en/nosotros`). Por dentro es una
sola ruta, `src/app/[lang]/...`: `next.config.ts` reescribe la raíz a `/es`.

- **El texto en español es la clave.** En el código se escribe en español y se
  envuelve en `t("…")`; el inglés está en `src/lib/i18n/en.ts` (lo que pinta
  algún componente de cliente) y `en-servidor.ts` (lo demás). Una cadena sin
  traducir no rompe nada: sale en español.
- Componente de servidor: `import { t } from "@/lib/i18n/servidor"`. Componente
  de cliente: `const t = useT()` de `@/lib/i18n/cliente`. Los textos que vienen
  de datos (`src/lib/*.ts`) se pasan por `t()` donde se pintan.
- **Si cambias o añades un texto en español, añade su traducción** con la misma
  cadena exacta como clave. Si no, en `/en` saldrá en español.
- Los enlaces internos van con el `Link` de `@/components/ui/enlace` (o
  `ButtonLink`), que antepone `/en` solo; no uses el de `next/link`.
- Cada página llama a `fijarIdioma((await params).lang)` y saca sus metadatos
  con `metadatos(lang, ruta, {...})`.
- El inglés no tiene diseño: va en las mismas cajas que el español. Tras tocar
  textos, `node scripts/revision/idiomas.mjs http://localhost:3100 /ruta 1440`
  (y `402`) lista los que en inglés ocupan más renglones que en español.
- **Política de privacidad y términos y condiciones van en inglés en los dos
  idiomas** (lo pidió el despacho por la TCPA). No pasan por `t()`.

## El diseño

El conector de Figma casi no tiene cuota. La fuente son los **exports SVG** que
Roberto deja en `C:\Users\rjreh\Downloads` (SVG, "Outline text" desmarcado, un
artboard por archivo). Los que hay:

- Escritorio (1920): `VERNAL - HOMEPAGE (3).svg`, `VERNAL - NOSOTROS (1).svg`,
  `VERNAL - NUESTRO EQUIPO.svg`, y en `Downloads\vernal\`: BLOGS, CONTACTO, FAQS,
  GRACIAS, TERMINOS Y CONDICIONES, TESTIMONIALES.
- Móvil (402): `VESPER AGENCY LANDING - HOME MOBILE.svg` (home, 2026-10-11),
  `VESPER AGENCY LANDING - MOBILE (3).svg` (nosotros), el resto en
  `Downloads\Nueva carpeta\` y `Downloads\Nueva carpeta (2)\`.
- Componentes sueltos (carruseles, overlays, cintillos): `Downloads\Nueva carpeta (3)\`.

Para identificar un export, mira su tamaño y sus textos con `textos.py`. No hay
artboard móvil de `/areas-de-servicio`, de términos ni de testimoniales.

## Dos destinos de build: Render y GoDaddy (2026-10-17)

Además de Render (Node), el sitio sale como **estático para el hosting de
GoDaddy** del despacho (Apache + PHP, sin Node), de momento en las pruebas
`2020.abogadovernal.com`. Lo explica la cabecera de `next.config.ts`. Lo que
afecta al trabajo de todos:

- `npm run build:estatico` genera `out/` (construye en `.next-estatico/`, no
  toca `.next/` ni el servidor de desarrollo). `bash scripts/desplegar-ftp.sh`
  lo sube; **solo con permiso de Roberto**, como un push.
- Un archivo de `app/` que **solo pueda existir con servidor** (una ruta POST,
  una página que lea cookies, una ruta comodín) se llama `*.servidor.ts(x)`; uno
  que solo exista en el estático, `*.estatico.tsx`. Hoy:
  `api/consulta/route.servidor.ts` y `[...resto]/page.servidor.tsx`. Si creas
  una página normal no tienes que hacer nada.
- En el estático **no hay `rewrites` ni `redirects`**: los repite
  `hosting/.htaccess`. Si tocas uno en `next.config.ts`, cámbialo también allí.
- El formulario tiene un **gemelo en PHP**, `hosting/consulta.php`. Si cambias
  la validación o el JSON del CRM en `src/lib/consulta.ts`, cámbialo también en
  el PHP y pasa `npm run test:php`, que compara los dos.

## Cómo comprobar un cambio

Herramientas en `scripts/revision/` (lanzar desde la raíz del repo):

```bash
# Captura de una sección a un ancho dado (402 móvil, 900 apilada, 1440 escritorio)
MSYS_NO_PATHCONV=1 node scripts/revision/captura.mjs <dirSalida> http://localhost:3100/nosotros \
  "402:texto de la sección:nombre" "900:texto de la sección:nombre" "1440:texto de la sección:nombre"

# La misma zona del diseño, para comparar
node scripts/revision/recorte.cjs "<export.svg>" <salida.png> <x> <y> <ancho> <alto> [escala]

# Textos de un export con su posición, entre dos alturas del artboard
python -I scripts/revision/textos.py "<export.svg>" <yDesde> <yHasta>

# Fotos incrustadas de una banda, con el encuadre que les da el diseño
python -I scripts/revision/fotos.py "<export.svg>" <yDesde> <yHasta> <dirSalida>
```

Guarda capturas y recortes en tu carpeta temporal de sesión, no en el repo.

Antes de dar algo por hecho: captura a los tres anchos y **mírala**, y pasa
`node node_modules/typescript/bin/tsc --noEmit` y
`node node_modules/eslint/bin/eslint.js <tus archivos>`. Di qué comprobaste y qué
no. En Git Bash, `node` necesita `export PATH="/c/Program Files/nodejs:$PATH"`.

## Decisiones ya tomadas

- Teléfono para llamar **+1 469-809-1181** en todo el sitio (2026-10-12; sale
  de `site.phone`). El **833-887-7273** de antes se queda solo en políticas de
  privacidad y en términos y condiciones. El enlace de WhatsApp no se toca.
- Houston **10333 Harwin Dr. Suite 105** ("Ste 580" de algunos exports es errata).
- En móvil manda el artboard móvil, aunque su texto no coincida con escritorio.
  Excepción: `/politicas` y `/nuestro-equipo`, que se quedan como están.
- Los tres plays (home, nuestro equipo, testimoniales) montan el vídeo de
  YouTube dentro de su caja con `components/ui/video-youtube.tsx`; los enlaces
  salen de los prototipos del Figma (2026-10-12). El play de "Nuestros
  servicios" del home se quitó: ya no es un vídeo.
- La página /faqs está retirada por ahora (2026-10-12) y su enlace del menú dice
  "EB1". Desde el 2026-10-17 los dos llevan a la página `/eb-1a`, que la sustituye. Las preguntas desplegables de sedes, blog y
  testimoniales siguen, sin el botón "Ver más preguntas".
- "Ver retransmisiones" lleva a los vídeos en vivo de Facebook; "Mas información" de las sedes, a
  Contacto; tras enviar un formulario, la página `/gracias` (sin overlay).
- Los tres formularios de consulta envían a `POST /api/consulta`, que los
  entrega al CRM del despacho (LeadConnector) y lleva a `/gracias` (2026-10-13).
  La URL del webhook es un secreto: `LEAD_WEBHOOK_URL` en Render y en
  `.env.local`, nunca en el código. Los campos que recibe el CRM están en
  `src/lib/consulta.ts`; si cambias la validación, `npm test`. La oficina es obligatoria.
- El formulario de boletín "Mantente informado" se quitó el 2026-10-13: no
  enviaba a ningún sitio y el despacho no manda boletín. El bloque de reseñas
  quedó solo (`sections/blog-resenas.tsx` explica cómo recuperarlo).
- "Testimoniales" está en el menú; la página sigue sin indexar.
- La página índice `/areas-de-servicio` se quitó (2026-10-11): redirige a Dallas
  y las cinco sedes cuelgan del desplegable del menú, igual que "Nosotros".
- Pendiente de Roberto: quitar los nombres de los testimonios y dejar solo el
  proceso (nota del cliente).
- Las erratas del diseño ("Forth Worth", "Áreas de practica", "Vernal Farum"…)
  se respetan hasta que el cliente diga.

## Cómo le gusta trabajar a Roberto

Español, directo y corto. Primero entrega y luego pregunta; las preguntas, en
una sola ronda. Sin texto de relleno: si pregunta algo concreto, responde eso.
Cuando reporta algo con una captura, reprodúcelo antes de tocar, y si un arreglo
no quedó, no lo discutas: vuelve a mirar.
