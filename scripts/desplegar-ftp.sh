#!/usr/bin/env bash
# Sube out/ al hosting de GoDaddy por FTP cifrado (FTPS explícito, certificado
# verificado). Basado en el de marlenebatta.com, que corre en este tipo de hosting.
#
#   npm run build:estatico && bash scripts/desplegar-ftp.sh
#
# Por defecto va a las PRUEBAS: 2020.abogadovernal.com, cuya carpeta es la raíz de
# la cuenta FTP DevAbigail. Para otro destino: SITIO=https://... DESTINO=carpeta/
#
# Las credenciales NO están aquí: se leen de ~/.vernal-ftp.netrc (fuera del repo).
# La URL del webhook del CRM tampoco: se lee de .env.local (LEAD_WEBHOOK_URL), se
# escribe en privado/config.php directamente en el servidor y nunca se imprime.
#
# El formulario SOLO se sube si el dominio tiene un certificado HTTPS válido: sin
# él, los datos de quien escribe viajarían sin cifrar. Sin certificado se sube el
# resto del sitio y el formulario queda fuera hasta el siguiente despliegue.
#
# No borra nada en el servidor: solo crea o reemplaza. Sube primero los recursos y
# al final .htaccess, que es lo que "enciende" el sitio. Un curl por archivo, a
# propósito: con muchos archivos en una sola llamada este hosting respondía 451 y
# dejaba archivos de 0 bytes sin que curl fallara. Por eso al final se comprueba
# todo por HTTP.
set -uo pipefail
HOST=ftp.prod.phx3.secureserver.net      # el nombre que coincide con el certificado del FTP
IP=107.180.41.148                        # el servidor de abogadovernal.com
SITIO=${SITIO:-https://2020.abogadovernal.com}
DESTINO=${DESTINO:-}                     # carpeta dentro de la cuenta FTP ("" = su raíz)
NETRC="$HOME/.vernal-ftp.netrc"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ/out" || { echo "Falta out/: corre antes npm run build:estatico"; exit 1; }
[ -f es/index.html ] || { echo "Falta out/es/index.html: corre antes npm run build:estatico"; exit 1; }
[ -f "$NETRC" ] || { echo "Falta $NETRC con las credenciales del FTP"; exit 1; }

# ¿HTTPS válido? Si no, se comprueba por http y el formulario no se sube.
dominio=${SITIO#https://}; dominio=${dominio#http://}; dominio=${dominio%%/*}
if curl -s -o /dev/null -m 20 "https://$dominio/"; then
  COMPROBAR="https://$dominio"; FORMULARIO=1
else
  COMPROBAR="http://$dominio"; FORMULARIO=0
  echo "AVISO: https://$dominio no tiene un certificado válido. Se sube el sitio SIN el formulario."
fi

# Sin cortes: cada archivo se sube con un nombre temporal y, ya completo, se
# renombra sobre el definitivo (el renombrado es instantáneo).
subir() {
  local origen=$1 remoto=$2 nombre=${2##*/}
  curl --silent --show-error --fail --ssl-reqd --ftp-create-dirs --max-time 180 --retry 2 \
    --resolve "$HOST:21:$IP" --netrc-file "$NETRC" -T "$origen" "ftp://$HOST/$DESTINO$remoto.subiendo" \
    -Q "-RNFR $nombre.subiendo" -Q "-RNTO $nombre" -o /dev/null
}

fallos=0
mapfile -t recursos < <(find . -type f ! -path ./.htaccess | sed 's|^\./||' | sort)
if [ "$FORMULARIO" = 0 ]; then
  mapfile -t recursos < <(printf '%s\n' "${recursos[@]}" | grep -v '^consulta\.php$')
fi
echo "Subiendo ${#recursos[@]} archivos a $dominio…"
saltados=0
for f in "${recursos[@]}"; do
  # /_next/static lleva la huella del contenido en el nombre: si ya está en el
  # servidor con el mismo tamaño, es el mismo archivo y no se vuelve a subir.
  case "$f" in _next/static/*)
    if [ "$(curl -s -o /dev/null -m 30 -w "%{http_code} %{size_download}" "$COMPROBAR/$f")" = "200 $(stat -c %s "$f")" ]; then
      saltados=$((saltados + 1)); continue
    fi ;;
  esac
  subir "$f" "$f" || { echo "  FALLO: $f"; fallos=$((fallos + 1)); }
done
echo "($saltados sin cambios, no se resubieron)"

# La configuración del formulario, con el secreto: se arma en un temporal, se
# sube y se borra. Nunca toca out/ ni el repo.
if [ "$FORMULARIO" = 1 ]; then
  webhook=$(grep -E '^LEAD_WEBHOOK_URL=' "$RAIZ/.env.local" 2>/dev/null | head -1 | cut -d= -f2- | tr -d '\r' | sed -E "s/^['\"]|['\"]$//g")
  if [ -z "$webhook" ]; then
    echo "  FALLO: no hay LEAD_WEBHOOK_URL en .env.local; el formulario respondería 'servicio no disponible'"
    fallos=$((fallos + 1))
  else
    tmp=$(mktemp)
    trap 'rm -f "$tmp"' EXIT
    # var_export de PHP escapa la URL sea cual sea su contenido. Va por variable de
    # entorno, no en la línea de órdenes, para que no salga en la lista de procesos.
    W="$webhook" php -r 'echo "<?php\n// Generado por scripts/desplegar-ftp.sh. NO va en el repo: lleva el secreto del CRM.\nreturn " . var_export(["webhook" => getenv("W")], true) . ";\n";' > "$tmp"
    subir "$tmp" privado/config.php || { echo "  FALLO: privado/config.php"; fallos=$((fallos + 1)); }
    rm -f "$tmp"
    unset webhook
  fi
fi

[ "$fallos" -eq 0 ] || { echo "$fallos archivos no subieron: NO se activa la versión nueva."; exit 1; }

echo "Activando (.htaccess)…"
subir .htaccess .htaccess || { echo "FALLO al activar"; exit 1; }

echo "Comprobando por $COMPROBAR…"
mal=0
for f in "${recursos[@]}"; do
  case "$f" in *.php|privado/*) continue ;; esac   # PHP se ejecuta y privado/ está cerrado: no se comparan
  esperado=$(stat -c %s "$f")
  # -L: lo que vive en es/ se pide por su dirección sin /es (la redirección lo lleva).
  real=$(curl -s -L -o /dev/null -m 30 -w "%{http_code} %{size_download}" "$COMPROBAR/$f")
  # El hosting añade su script de monitoreo al final de los .html: ahí solo se exige el 200.
  case "$f" in *.html) [ "${real%% *}" = 200 ] || { echo "  MAL: $f → $real"; mal=$((mal + 1)); } ;;
    *) [ "$real" = "200 $esperado" ] || { echo "  MAL: $f → $real (esperado $esperado)"; mal=$((mal + 1)); } ;; esac
done
for cerrado in privado/ privado/config.php .htaccess; do
  c=$(curl -s -o /dev/null -m 20 -w "%{http_code}" "$COMPROBAR/$cerrado")
  [ "$c" = 403 ] || { echo "  MAL: $cerrado responde $c y debería estar cerrado (403)"; mal=$((mal + 1)); }
done
[ "$mal" -eq 0 ] && echo "Listo: todo coincide en $COMPROBAR." || { echo "$mal comprobaciones fallaron."; exit 1; }
[ "$FORMULARIO" = 1 ] || echo "RECUERDA: el formulario NO está subido. Activa el certificado y vuelve a desplegar."
