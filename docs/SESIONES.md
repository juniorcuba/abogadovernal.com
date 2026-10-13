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
| Nosotros | `src/app/nosotros/` | `src/components/sections/nosotros-*.tsx` | — |
| Testimoniales | `src/app/testimoniales/` | `sections/testimoniales.tsx` | `src/lib/testimonios.ts` |
| Nuestro equipo | `src/app/nuestro-equipo/` | `sections/equipo.tsx` | `src/lib/equipo.ts` |
| Sedes | `src/app/areas-de-servicio/[sede]/` | `sections/sede.tsx` | `src/lib/sedes.ts` |
| Blog y artículo | `src/app/blog/` | `sections/blog-listado.tsx`, `articulo.tsx`, `tarjeta-articulo.tsx` | `src/lib/blog.ts`, `articulo.ts` |
| FAQs | `src/app/faqs/` | `sections/faqs-*.tsx`, `ui/lista-preguntas.tsx` | `src/lib/preguntas.ts` |
| Contacto | `src/app/contacto/` | `sections/contacto-hero.tsx` | — |
| Home | `src/app/page.tsx` | `hero`, `sobre-nosotros`, `bio-vernal`, `nuestro-equipo`, `nuestro-compromiso`, `servicios`, `como-trabajamos`, `transmisiones`, `testimonios` | — |

Las imágenes de cada vista van en su carpeta de `public/images/<vista>/`.

### Reglas para no pisarse

1. **Toca solo los archivos de tu carril.** Antes de editar un archivo compartido,
   dilo y espera el visto bueno de Roberto. Son compartidos: `src/app/layout.tsx`,
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
- "Ver retransmisiones" lleva a los directos del canal; "Mas información" de las sedes, a
  Contacto; tras enviar un formulario, la página `/gracias` (sin overlay).
- "Testimoniales" está en el menú; la página sigue sin indexar.
- La página índice `/areas-de-servicio` se quitó (2026-10-11): redirige a Dallas
  y las cinco sedes cuelgan del desplegable del menú, igual que "Nosotros".
- Pendiente de Roberto: quitar los nombres de los testimonios y dejar solo el
  proceso (nota del cliente); si entra el chat en vivo; destino de los formularios.
- Las erratas del diseño ("Forth Worth", "Áreas de practica", "Vernal Farum"…)
  se respetan hasta que el cliente diga.

## Cómo le gusta trabajar a Roberto

Español, directo y corto. Primero entrega y luego pregunta; las preguntas, en
una sola ronda. Sin texto de relleno: si pregunta algo concreto, responde eso.
Cuando reporta algo con una captura, reprodúcelo antes de tocar, y si un arreglo
no quedó, no lo discutas: vuelve a mirar.
