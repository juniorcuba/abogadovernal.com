# abogadovernal.com

Sitio de **The Law Office Of Vernal Farnum Mejía** — despacho de inmigración en Texas
con sedes en Dallas, Fort Worth, Houston, Austin y San Antonio.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript estricto
- Tailwind CSS v4 (tokens en `src/app/globals.css` con `@theme`)
- Poppins vía `next/font/google`
- Sin backend por ahora: contenido en `src/lib/site.ts` y `src/content/`

## Arranque

```bash
npm install
npm run dev
```

Requiere **Node 22.13+ o 24** (el scaffold avisa de `EBADENGINE` con 22.11).

## Estructura

```
src/
  app/                 rutas (App Router)
  components/
    layout/            header, footer, chrome del sitio
    sections/          secciones de página, 1:1 con los bloques del Figma
    ui/                primitivas reutilizables (botones, campos, tarjetas)
  lib/                 datos del sitio, utilidades
  content/             copy largo extraído de Figma
public/
  brand/               logo
  icons/social/        iconos exportados de Figma
docs/FIGMA.md          mapa de nodos del diseño ← leer antes de tocar UI
```

## Diseño

El diseño vive en Figma y se lee con el MCP oficial. **Los valores salen del archivo,
nunca de una captura.** Ver [`docs/FIGMA.md`](docs/FIGMA.md) para el file key, el mapa
de nodos por sección y los tokens ya extraídos.

## Notas de implementación

- Los dos formularios (hero y newsletter) recogen PII y un **consentimiento explícito de
  SMS/WhatsApp**. Cuando se implementen: validación en servidor, registro del
  consentimiento con timestamp, y endpoint idempotente porque dispara SMS/email.
- Teléfono, correo y direcciones de las 5 sedes están en `src/lib/site.ts` tal como
  aparecen en el diseño. **Confirmar con el cliente antes de publicar.**
