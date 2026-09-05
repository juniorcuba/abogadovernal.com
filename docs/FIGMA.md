# Figma — ABOGADO VERNAL WEB

**File key:** `bLvHCKcgOJNlCPJyO4L6te`
**Página:** `0:1` (única del documento)
**Homepage:** nodo `1:2` — "VERNAL - HOMEPAGE", 1920 × 8282 px

El canvas también contiene variantes descartadas y capturas de referencia de otros
despachos (Thomas J Henry, etc.) a la derecha. **No son parte del diseño a construir.**

## Cómo leer el archivo

Se accede con el MCP oficial de Figma (`claude_ai_Figma`), autenticado como
`rjr.eh1996@gmail.com`. No hace falta token de API ni el servidor MCP local de Dev Mode.

- `get_metadata` → estructura del árbol (ids, nombres, posiciones, tamaños)
- `get_design_context` → código de referencia + screenshot + assets del nodo
- `get_variable_defs` → variables locales del archivo
- `download_assets` → imágenes originales y SVGs de un subárbol

**Regla:** ningún color, tamaño o texto se estima de una captura. Todo sale del nodo.
Las URLs de assets de Figma expiran en ~7 días: descargar a `public/` al usarlas.

### Límite del MCP

El plan Starter tiene **cuota de llamadas al MCP** y se agota rápido (~15 llamadas).
Cuando salte `tool call limit`, la alternativa es la API REST con un token personal,
que no tiene ese tope:

```bash
curl -s -H "X-Figma-Token: $(cat ~/.figma-token)"   "https://api.figma.com/v1/files/bLvHCKcgOJNlCPJyO4L6te/nodes?ids=NODO"
```

Para guardar el token sin que pase por el chat:

```
powershell -ExecutionPolicy Bypass -File scripts/figma-token.ps1
```

Lanzar el script **antes** de ir a copiar el token: se queda esperando a que aparezca
en el portapapeles, así no hay que pelearse por él. Se crea en Figma → Configuración →
Seguridad → Tokens de acceso personal, con permiso **solo** de lectura de
«File content» y todo lo demás en «No access».

Nunca imprimir el token, ni pegarlo en el chat, ni volcarlo a un log. Se usa siempre
leído en línea dentro de la cabecera, como en el `curl` de arriba.

## Tokens ya extraídos

| Token | Valor | Origen |
|---|---|---|
| `--color-vernal-accent` | `#08b6ff` | nodo `6:56` (teléfono del header) |
| `--color-vernal-navy` | `#172339` | stop 0 del degradado `6:91` |
| `--color-vernal-ink` | `#0f0f0f` | stop 1 del degradado `6:91` |
| `--shadow-vernal-1` | `8px 18px 37.1px #00000082` | variable "Vernal Shadow 1" |
| `--shadow-vernal-2` | `8px 36px 37.1px #000000D6` | variable "Vernal Shadow 2" |
| `--shadow-vernal-header` | `0 4px 33.3px 12px rgba(0,0,0,.06)` | nodo `6:91` |
| `--color-vernal-green` | `#00b567` | nodo `97:45` (CTA) |
| `--color-vernal-steel` | `#40629f` | stop final del degradado `18:7` |
| `bg-vernal-card` | `linear-gradient(216.12deg, …0.71)` | nodo `18:7` |
| Tipografía | Poppins 200i / 300 / 400 / 600 / 700i | nodos `6:87`, `6:23`, `6:50`, `6:3`, `6:87` |

### Escala tipográfica confirmada

| Uso | Valor | Nodo |
|---|---|---|
| h1 hero | SemiBold 82px, leading 1.04, uppercase | `6:3` |
| Claim hero | Light 36px, leading 1.04 | `6:23` |
| CTA | SemiBold / Regular 21px, color `#172339` | `95:2`, `18:21` |
| Nav, botones | Regular 16px | `6:50`, `6:48` |
| Campos de formulario | Regular 15px, negro | `6:40` |
| Aviso de consentimiento | ExtraLight Italic 12px, leading 1.17, justificado | `6:87` |

## La fuente buena: el export SVG de la frame, SIN "Outline text"

**Al exportar el SVG hay que desmarcar "Outline text"** (Export → SVG → los tres
puntos). Por defecto está activado y convierte todo el texto en trazos: el export
queda sin una sola etiqueta `<text>` y hay que deducir la tipografía midiendo.

Desmarcado, el SVG trae `font-size`, `font-weight`, `font-style` y `letter-spacing`
de cada texto. Conviene marcar también **"Include 'id' attribute"**, que añade los
identificadores de nodo y permite trazar cada elemento.

Con eso el SVG cubre TODO y la API de Figma deja de hacer falta.


**El archivo no es nuestro.** Pertenece al diseñador, vive en un plan Starter y él
lo sigue editando. Eso importa por dos motivos:

1. Los límites de la API los marca **el plan donde vive el archivo**, no el nuestro.
   En Starter son ~6-20 peticiones **al mes**, no por minuto. Se agotan en una sesión.
2. El diseño es un blanco móvil: conviene confirmar con el diseñador qué secciones
   están cerradas antes de clavarlas al píxel.

La salida es pedirle un **export SVG de la frame** (Figma → seleccionar frame →
Export → SVG). No consume cuota y para casi todo es MEJOR que la API:

| Dato | API | SVG |
|---|---|---|
| Degradados (ángulo y paradas) | ambiguo | **exacto, en coordenadas absolutas** |
| Colores planos | sí | sí |
| Posición y tamaño de imágenes | sí | **sí, con su matriz de escala** |
| Modos de fusión y opacidades | sí | sí |
| Las imágenes en sí | URLs que caducan | **embebidas en base64** |
| Tipografía | sí | **no** (el texto se exporta como paths) |

Lo único que el SVG no da es la tipografía. Para eso: medir el ancho de una línea
en el render PNG y calibrarlo contra la fuente real (ver más abajo).

### Los degradados: el SVG manda

Derivar el ángulo CSS de los `gradientHandlePositions` de la API **da valores
incorrectos**: el segundo handle no es el punto final del eje. La tarjeta del hero
salía a 209.48deg cuando la real es 216.12deg. El SVG trae `x1,y1,x2,y2` absolutos
y la conversión es directa:

```
angulo = atan2(dx, -dy)
L      = |w·sin(a)| + |h·cos(a)|
parada = proyeccion del punto sobre el eje centrado en la caja, / L, + 0.5
```

### Los fondos son pilas de capas, no un color

Casi todas las secciones apilan tres cosas y hacen falta las tres. Ejemplo de
"cómo es nuestro trabajo": cian plano `#08B6FF` + el mapa al 92% en `multiply` +
un degradado `112.07deg` de transparente a `#023451`. Yo había deducido del render
un único degradado de 129° que no existe en el archivo.

## Verificación de fidelidad

Hay un arnés de captura y comparación en el scratchpad de la sesión (`shot/`), con
`playwright-core` apuntando al Chrome del sistema:

- `shot.js <url> <salida> <ancho> [y0] [y1]` — captura a un ancho exacto.
  **Usar siempre página completa y recortar después**: con `clip` fuera del viewport
  Playwright devuelve negro.
- `measure.js` / `measure-footer.js` — comparan cajas y tipografía reales contra las
  coordenadas del artboard y marcan las que se desvían más de 1px.

Con la frame renderizada por la API (`/v1/images`) se hace un diff por bloques.

**El servidor de desarrollo cachea las imágenes optimizadas en memoria.** Si se
cambia un archivo de `public/`, sigue sirviendo el anterior aunque el disco y las
URLs `/_next/image` ya estén bien. Solo se limpia reiniciando `next dev`; borrar
`.next/cache/images` no basta. Perdí un buen rato con esto.

**Límites de la API.** El MCP tiene una cuota baja en plan Starter (~15 llamadas) y
la API REST aplica un límite por coste que, al dispararse, bloquea también las
peticiones pequeñas durante bastantes minutos. Conviene traerse el árbol de una vez
(`?ids=1:2`) y trabajar sobre el JSON en local, en lugar de pedir nodo a nodo.
Referencia: hero 0 bloques con diferencia; footer 28, todos en texto pequeño con
desfases de 0–2px, que es la diferencia de rasterizado entre Figma y Chrome.

### Interlineado: usar píxeles, no proporciones

**Figma redondea el interlineado a píxeles enteros al renderizar.** El archivo
declara `lineHeightPx = 16.64` para el cuerpo de 16px, pero pinta 17px por línea.
Chrome mantiene el fraccionario, y sobre 20 líneas eso acumula 7px.

Por eso todo el proyecto usa `leading-[17px]` y no `leading-[1.04]`. La regla:

    interlineado en px = round(tamaño × 1.04)     (o × 1.17 donde el archivo lo diga)

Durante un tiempo esto estuvo documentado aquí como "una tolerancia inevitable del
rasterizado". **Era falso.** Corregirlo bajó el diff del bio de 101 bloques a 1.

### Trampa de Tailwind con el breakpoint `design`

`--breakpoint-design` **debe ir en `rem`** (`120rem`), no en px. Tailwind ordena los
media queries por valor y no sabe comparar px con los suyos, que van en rem: declarado
como `1920px` se emitía ANTES que `sm`/`lg`/`xl`/`2xl` y perdía contra ellos, así que
cosas como `design:text-[82px]` no llegaban a aplicarse nunca.

## Mapa de secciones de la homepage (`1:2`, de arriba abajo)

| y | Sección | Nodos clave | Estado |
|---|---|---|---|
| 0 | Header + nav + logo + redes | `6:92` | ✅ implementado |
| 9 | Hero + formulario de contacto | `6:88`, `18:7`, `6:39`–`6:48`, `6:87` (consentimiento SMS) | ✅ implementado |
| 886 | CTA flotante "Agenda tu consulta" / Chat en vivo | `18:25` | ✅ implementado |
| 1142 | Sobre nosotros + carrusel + stat "+10,000 familias reunidas" | `6:93`, `8:97`, `129:148`, `24:92` | pendiente |
| 1751 | Conocé al abogado Vernal (bio) | `11:106`, `11:108`, `129:211`, `129:223` | pendiente |
| 2559 | Nuestro equipo + carrusel de abogados | `17:3`, `17:4`, `174:1671`, `104:85` | pendiente |
| 3269 | Nuestro compromiso + 5 tarjetas | `28:103`, `28:104`, `129:1170`–`129:1239`, `97:60` | pendiente |
| 4078 | Nuestros servicios + botón consulta | `59:35`, `59:36`, `73:37`, `129:1293` | pendiente |
| 4746 | Cómo es nuestro trabajo | `59:42`, `59:43`, grupos `83:111`, `104:69`–`104:78` | pendiente |
| 5414 | 5 sedes + direcciones + live de los martes | `83:107`, `97:29`, `67:3`, `97:30`, `73:34` | pendiente |
| 6077 | Testimonios en video | `69:13`, `129:2084`, `83:145` | pendiente |
| 6917 | Blog / "Mantente informado" + newsletter | `83:149`, `83:67`–`83:74`, `83:69` (consentimiento SMS) | pendiente |
| 7366 | Reseñas de Google | `83:151`, `177:2018`, `83:186` | pendiente |
| 7794 | Footer: 5 sedes, contacto, redes, legal | `41:13`, `62:76`–`101:64`, `59:74` | ✅ implementado |

## Assets descargados

- `public/brand/logo-vernal.svg` — logo completo (nodo `6:72` / `b0ab638f…`)
- `public/brand/logo-vernal-mark.svg` — parte superior del logo (nodo `6:73`)
- `public/icons/social/{facebook,tiktok,instagram,youtube}.svg` — nodos `21:82`, `21:79`, `21:73`, `21:69`
  (Instagram mide 29×30, los otros 30×30; el footer reutiliza estos mismos)
- `public/images/hero-vernal.jpg` — export del nodo `6:88`, 1917×1231 (PNG 2.1MB → JPEG q88 142KB)
- `public/icons/form/{user,phone,mail,office,comment}.svg` — nodos `97:32`, `97:36`, `97:41`, `129:2220`, `97:50`
- `public/icons/chat.svg` — nodo `18:22`, 41×35.279

## Textos legales que ya están en el archivo

No inventar ni parafrasear. El consentimiento SMS/WhatsApp aparece literal en los
nodos `6:87` (formulario del hero) y `83:69` (newsletter), y el copyright en `59:74`.
