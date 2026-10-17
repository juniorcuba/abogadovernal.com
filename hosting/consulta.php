<?php
/*
 * POST /api/consulta — versión PHP del formulario "Agenda tu consulta", para el
 * hosting sin Node (GoDaddy: Apache + PHP). El .htaccess manda aquí /api/consulta.
 *
 * Es el GEMELO de src/app/api/consulta/route.servidor.ts y de src/lib/consulta.ts:
 * mismas reglas, mismos códigos de respuesta y el mismo JSON al CRM. Si cambias
 * una regla, cámbiala en los dos sitios. `npm run test:php` comprueba que la
 * validación y el JSON sigan coincidiendo con los de TypeScript.
 *
 * Defensas, en este orden (lo barato primero), igual que la versión de Node:
 *   método       solo POST
 *   origen       solo envíos hechos desde este mismo sitio (Origin, o Referer si
 *                falta): corta el CSRF y los POST sueltos
 *   tamaño       máximo 20 KB, JSON o formulario
 *   señuelo      el campo oculto "sitio_web" relleno es un bot: se contesta
 *                "recibido" sin mandar nada
 *   límite       5 envíos por IP cada 10 minutos
 *   validación   todo se valida y se limpia aquí, diga lo que diga el navegador
 *   idempotencia cada formulario manda un `envio_id`; repetido en 10 minutos no
 *                vuelve a ir al CRM. La marca es un archivo creado en modo "x",
 *                que es atómico: dos peticiones a la vez no pueden crearlo las
 *                dos (hace de la restricción UNIQUE que no hay sin base de datos).
 *
 * Diferencia buscada con Node: la IP sale SOLO de REMOTE_ADDR. En este hosting no
 * hay proxy delante, así que X-Forwarded-For lo pondría el visitante y le bastaría
 * cambiarlo para saltarse el límite.
 *
 * Secretos y datos viven en `privado/` (config.php con la URL del webhook, las
 * marcas de envío y el registro). Esa carpeta la cierran DOS capas: su propio
 * .htaccess (Require all denied) y una regla del .htaccess raíz. config.php no
 * está en el repo: lo genera scripts/desplegar-ftp.sh a partir de .env.local.
 *
 * El registro (privado/consulta.log.php) lleva un resumen ENMASCARADO de cada
 * envío, igual que en Render: iniciales, correo recortado y cuatro últimos
 * dígitos. Empieza por "<?php exit; ?>": aunque alguien llegara a pedirlo, PHP lo
 * ejecutaría y no enseñaría nada.
 *
 * Compatible con PHP 7.4 en adelante (no se sabe qué versión tiene el hosting).
 */

declare(strict_types=1);

const DIEZ_MINUTOS = 600;
const MAX_POR_IP = 5;
const MAX_BYTES = 20000;
const ESPERA_CRM = 10;

/** Las opciones del desplegable, tal como las quiere ver el CRM. */
const OFICINAS = ['Dallas', 'Fort Worth', 'Houston', 'Austin', 'San Antonio', 'Oficina virtual'];
/** Lo que manda el desplegable en inglés para la opción que no es una ciudad. */
const OFICINA_ALIAS = ['Virtual office' => 'Oficina virtual'];
const LIMITES = ['nombre' => 120, 'correo' => 254, 'comentarios' => 2000, 'pagina' => 200];

/* ======================= lógica pura (gemela de src/lib/consulta.ts) ======================= */

/**
 * Largo como lo cuenta JavaScript (unidades UTF-16), para que los límites
 * coincidan al carácter con los de la versión de Node, emojis incluidos.
 */
function largo16(string $s): int
{
    if (function_exists('mb_convert_encoding')) {
        return intdiv(strlen(mb_convert_encoding($s, 'UTF-16LE', 'UTF-8')), 2);
    }
    $n = 0;
    foreach (preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $c) {
        $n += strlen($c) === 4 ? 2 : 1;
    }
    return $n;
}

/** Recorta a `max` unidades UTF-16 sin partir un carácter. */
function recorte16(string $s, int $max): string
{
    if (largo16($s) <= $max) return $s;
    $out = '';
    $n = 0;
    foreach (preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $c) {
        $w = strlen($c) === 4 ? 2 : 1;
        if ($n + $w > $max) break;
        $out .= $c;
        $n += $w;
    }
    return $out;
}

/** Texto de una línea: sin caracteres de control y con los espacios recogidos. */
function linea($valor): string
{
    if (!is_string($valor) || !preg_match('//u', $valor)) return '';
    $v = preg_replace('/[\x{0000}-\x{001F}\x{007F}]/u', ' ', $valor);
    $v = preg_replace('/(*UCP)\s+/u', ' ', $v);
    return trim($v, " ");
}

/** Texto de varias líneas: conserva los saltos, quita el resto de controles. */
function parrafo($valor): string
{
    if (!is_string($valor) || !preg_match('//u', $valor)) return '';
    $v = preg_replace("/\r\n?/", "\n", $valor);
    $v = preg_replace('/[\x{0000}-\x{0009}\x{000B}-\x{001F}\x{007F}]/u', ' ', $v);
    $v = preg_replace('/[ \t]+/', ' ', $v);
    $v = preg_replace("/\n{3,}/", "\n\n", $v);
    return preg_replace('/(*UCP)^\s+|\s+$/u', '', $v);
}

const CORREO = '/(*UCP)^[^\s@<>"\']+@[^\s@<>"\']+\.[^\s@<>"\']{2,}$/u';

/**
 * El teléfono se guarda como lo escribió la persona, pero solo con los
 * caracteres propios de un teléfono, y tiene que traer entre 7 y 15 dígitos.
 */
function telefono($valor): ?string
{
    $texto = linea($valor);
    if (!preg_match('/^[0-9+()\-. ]+$/', $texto)) return null;
    $digitos = preg_replace('/\D/', '', $texto);
    $n = strlen($digitos);
    return ($n >= 7 && $n <= 15) ? $texto : null;
}

/** La ruta de la página: empieza por "/" y no trae nada raro. */
function rutaLimpia($valor): string
{
    $texto = linea($valor);
    if (substr($texto, 0, 1) !== '/' || substr($texto, 0, 2) === '//') return '/';
    $ruta = preg_split('/[?#]/', $texto)[0];
    return preg_match('#^/[A-Za-z0-9\-._~/]*$#', $ruta) ? substr($ruta, 0, LIMITES['pagina']) : '/';
}

/**
 * @return array{ok:true,consulta:array}|array{ok:false,errores:list<string>}
 */
function validarConsulta(array $datos): array
{
    $errores = [];

    $nombre = linea($datos['nombre'] ?? null);
    $ln = largo16($nombre);
    if ($ln < 2 || $ln > LIMITES['nombre']) $errores[] = 'nombre';

    $tel = telefono($datos['telefono'] ?? null);
    if ($tel === null) $errores[] = 'telefono';

    $correo = mb_strtolower(linea($datos['correo'] ?? null), 'UTF-8');
    if (largo16($correo) > LIMITES['correo'] || !preg_match(CORREO, $correo)) $errores[] = 'correo';

    // La oficina es obligatoria y tiene que ser una de las del desplegable.
    $bruta = linea($datos['oficina'] ?? null);
    $oficina = OFICINA_ALIAS[$bruta] ?? $bruta;
    if (!in_array($oficina, OFICINAS, true)) $errores[] = 'oficina';

    $comentarios = parrafo($datos['comentarios'] ?? null);
    if (largo16($comentarios) > LIMITES['comentarios']) $errores[] = 'comentarios';

    if ($errores || $tel === null) return ['ok' => false, 'errores' => $errores];

    return [
        'ok' => true,
        'consulta' => [
            'nombre' => $nombre,
            'telefono' => $tel,
            'correo' => $correo,
            'oficina' => $oficina,
            'comentarios' => $comentarios,
            'idioma' => (($datos['idioma'] ?? null) === 'en') ? 'en' : 'es',
            'pagina' => rutaLimpia($datos['pagina'] ?? null),
        ],
    ];
}

/** Fecha como la escribe Date.prototype.toISOString(): "2026-10-13T17:00:00.000Z". */
function isoMs(int $ms): string
{
    return gmdate('Y-m-d\TH:i:s', intdiv($ms, 1000)) . sprintf('.%03dZ', $ms % 1000);
}

/** El JSON para el CRM. Los ocho campos acordados, en el mismo orden. */
function cargaParaCrm(array $c, string $sitio, int $ahoraMs): array
{
    $nota = '[Sitio web] Idioma: ' . ($c['idioma'] === 'en' ? 'inglés' : 'español') . '. '
        . 'Aceptó el aviso de mensajes SMS/WhatsApp al enviar el formulario: ' . isoMs($ahoraMs) . '.';
    return [
        'full_name' => $c['nombre'],
        'phone' => $c['telefono'],
        'email' => $c['correo'],
        'office' => $c['oficina'],
        'comments' => $c['comentarios'] !== '' ? $c['comentarios'] . "\n\n" . $nota : $nota,
        'source' => 'Sitio Web Abogado Vernal',
        'platform' => 'Sitio Web',
        'campaign' => rtrim($sitio, '/') . $c['pagina'],
    ];
}

/** Lo que se puede escribir de un envío en el registro: nada personal entero. */
function resumenParaRegistro(array $c): array
{
    $partes = explode('@', $c['correo'], 2);
    $usuario = $partes[0];
    $dominio = $partes[1] ?? '';
    $digitos = preg_replace('/\D/', '', $c['telefono']);
    $iniciales = [];
    foreach (array_filter(explode(' ', $c['nombre']), 'strlen') as $parte) {
        $iniciales[] = mb_strtoupper(mb_substr($parte, 0, 1, 'UTF-8'), 'UTF-8') . '.';
    }
    return [
        'nombre' => implode(' ', $iniciales),
        'correo' => recorte16($usuario, 2) . '***@' . $dominio,
        'telefono' => '***' . substr($digitos, -4),
        'oficina' => $c['oficina'],
        'idioma' => $c['idioma'],
        'pagina' => $c['pagina'],
        'comentarios' => largo16($c['comentarios']) . ' caracteres',
    ];
}

/* ======================= el endpoint ======================= */

function configuracion(): array
{
    static $c = null;
    if ($c !== null) return $c;
    $dir = getenv('VERNAL_DATOS') ?: __DIR__ . '/privado';
    $c = [
        'datos' => $dir,
        'webhook' => '',
        // Dominio que se apunta en "campaign". Vacío = el propio dominio desde el
        // que llega el envío; en pruebas eso deja los contactos marcados con
        // 2020.abogadovernal.com y se distinguen de los reales en el CRM.
        'sitio' => '',
        'telefono' => '+1 469-809-1181',
        // Solo para pruebas locales: no llama al CRM, escribe la carga en el registro.
        'simular' => getenv('VERNAL_SIMULAR_CRM') === '1',
    ];
    if (is_file($dir . '/config.php')) {
        $extra = include $dir . '/config.php';
        if (is_array($extra)) $c = array_merge($c, $extra);
    }
    return $c;
}

function directorioDatos(): string
{
    $d = configuracion()['datos'] . '/datos';
    if (!is_dir($d)) @mkdir($d, 0700, true);
    return $d;
}

/** Una línea por envío, enmascarada. */
function apuntar(string $resultado, array $detalle = []): void
{
    $archivo = configuracion()['datos'] . '/consulta.log.php';
    $nuevo = !is_file($archivo);
    $linea = '[consulta] ' . json_encode(
        ['resultado' => $resultado, 'cuando' => isoMs((int) round(microtime(true) * 1000))] + $detalle,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    ) . "\n";
    @file_put_contents($archivo, ($nuevo ? "<?php exit; ?>\n" : '') . $linea, FILE_APPEND | LOCK_EX);
}

function mismoSitio(): bool
{
    $anfitrion = strtolower($_SERVER['HTTP_HOST'] ?? '');
    $procedencia = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
    if ($anfitrion === '' || $procedencia === '') return false;
    $p = parse_url($procedencia);
    if (!is_array($p) || empty($p['host'])) return false;
    $host = strtolower($p['host']) . (isset($p['port']) ? ':' . $p['port'] : '');
    return $host === $anfitrion;
}

/**
 * Límite por IP con ventana fija desde el primer envío, como RegistroTemporal.
 * Devuelve cuántos lleva en la ventana. El archivo se nombra con un hash: no se
 * guardan IPs en claro.
 */
function contarIp(string $ip, int $ahora): int
{
    $archivo = directorioDatos() . '/ip-' . hash('sha256', $ip);
    $f = @fopen($archivo, 'c+');
    if ($f === false) return 1; // si no se puede llevar la cuenta, no se bloquea a nadie
    flock($f, LOCK_EX);
    $e = json_decode((string) stream_get_contents($f), true);
    if (is_array($e) && ($e['hasta'] ?? 0) > $ahora) {
        $e['veces'] = (int) $e['veces'] + 1;
    } else {
        $e = ['hasta' => $ahora + DIEZ_MINUTOS, 'veces' => 1];
    }
    ftruncate($f, 0);
    rewind($f);
    fwrite($f, json_encode($e));
    fflush($f);
    flock($f, LOCK_UN);
    fclose($f);
    return $e['veces'];
}

/**
 * Marca un envío como en curso o entregado. Devuelve false si ya estaba marcado
 * en los últimos diez minutos (es un repetido). Atómica: modo "x".
 */
function marcarEnvio(string $clave, int $ahora): bool
{
    $archivo = directorioDatos() . '/envio-' . $clave;
    for ($intento = 0; $intento < 2; $intento++) {
        $f = @fopen($archivo, 'x');
        if ($f !== false) {
            fclose($f);
            return true;
        }
        $hora = @filemtime($archivo);
        if ($hora !== false && $hora > $ahora - DIEZ_MINUTOS) return false;
        @unlink($archivo); // caducada: se borra y se vuelve a intentar una vez
    }
    return false;
}

function desmarcarEnvio(string $clave): void
{
    @unlink(directorioDatos() . '/envio-' . $clave);
}

/** De vez en cuando, fuera las marcas caducadas. */
function limpiar(int $ahora): void
{
    if (random_int(1, 50) !== 1) return;
    foreach (glob(directorioDatos() . '/{ip-,envio-}*', GLOB_BRACE) ?: [] as $f) {
        $t = @filemtime($f);
        if ($t !== false && $t < $ahora - 2 * DIEZ_MINUTOS) @unlink($f);
    }
}

/** Lee el cuerpo como JSON (con JavaScript) o como formulario (sin él). */
function leerCuerpo(): ?array
{
    $largo = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($largo > MAX_BYTES) return null;
    $texto = (string) file_get_contents('php://input', false, null, 0, MAX_BYTES + 1);
    if (strlen($texto) > MAX_BYTES) return null;
    $tipo = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($tipo, 'application/json') !== false) {
        $datos = json_decode($texto, true);
        // Un objeto JSON, no una lista ni un valor suelto.
        if (!is_array($datos) || ($datos !== [] && array_keys($datos) === range(0, count($datos) - 1))) return null;
        return ['datos' => $datos, 'json' => true];
    }
    if (strpos($tipo, 'application/x-www-form-urlencoded') !== false) {
        parse_str($texto, $datos);
        return ['datos' => $datos, 'json' => false];
    }
    return null;
}

/**
 * Con JavaScript el formulario espera JSON. Sin él, el navegador navega: si fue
 * bien se le lleva a la página de gracias, y si no, a un texto corto.
 */
function responder(array $cuerpo, int $estado, bool $json, string $idioma): void
{
    http_response_code($estado);
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    if ($cuerpo['ok']) {
        http_response_code(303);
        header('Location: ' . ($idioma === 'en' ? '/en' : '') . '/gracias/');
        exit;
    }
    $tel = configuracion()['telefono'];
    header('Content-Type: text/plain; charset=utf-8');
    echo $idioma === 'en'
        ? "We could not send your message. Please go back and try again, or call us at $tel."
        : "No pudimos enviar tu mensaje. Vuelve atrás e inténtalo de nuevo, o llámanos al $tel.";
    exit;
}

/** Llama al webhook del CRM. Devuelve [ok, código o motivo]. */
function enviarAlCrm(string $destino, array $carga): array
{
    $cuerpo = json_encode($carga, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (function_exists('curl_init')) {
        $ch = curl_init($destino);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $cuerpo,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => ESPERA_CRM,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);
        $ok = curl_exec($ch);
        $estado = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $error = curl_errno($ch);
        curl_close($ch);
        if ($ok === false || $error !== 0) return [false, 'sin conexión'];
        return [$estado >= 200 && $estado < 300, $estado];
    }
    $ctx = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $cuerpo,
        'timeout' => ESPERA_CRM,
        'ignore_errors' => true,
    ]]);
    $r = @file_get_contents($destino, false, $ctx);
    if ($r === false || empty($http_response_header[0])) return [false, 'sin conexión'];
    preg_match('#\s(\d{3})\s#', $http_response_header[0], $m);
    $estado = (int) ($m[1] ?? 0);
    return [$estado >= 200 && $estado < 300, $estado];
}

function atender(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        responder(['ok' => false, 'error' => 'metodo'], 405, true, 'es');
    }

    if (!mismoSitio()) {
        apuntar('rechazado: no viene de este sitio');
        responder(['ok' => false, 'error' => 'origen'], 403, true, 'es');
    }

    $cuerpo = leerCuerpo();
    if ($cuerpo === null) {
        apuntar('rechazado: formato o tamaño');
        responder(['ok' => false, 'error' => 'formato'], 400, true, 'es');
    }
    $datos = $cuerpo['datos'];
    $json = $cuerpo['json'];
    $idioma = (($datos['idioma'] ?? null) === 'en') ? 'en' : 'es';
    $ahora = time();
    limpiar($ahora);

    // Señuelo: una persona no rellena este campo. Se contesta como si hubiera ido bien.
    if (is_string($datos['sitio_web'] ?? null) && trim($datos['sitio_web']) !== '') {
        apuntar('descartado: bot (campo señuelo relleno)');
        responder(['ok' => true], 200, $json, $idioma);
    }

    if (contarIp($_SERVER['REMOTE_ADDR'] ?? 'desconocida', $ahora) > MAX_POR_IP) {
        apuntar('rechazado: demasiados envíos desde la misma IP');
        responder(['ok' => false, 'error' => 'limite'], 429, $json, $idioma);
    }

    // Sin JavaScript no llega la página: se saca de dónde vino la petición.
    if (!is_string($datos['pagina'] ?? null) || $datos['pagina'] === '') {
        $ref = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_PATH);
        $datos['pagina'] = is_string($ref) && $ref !== '' ? $ref : '/';
    }

    $validacion = validarConsulta($datos);
    if (!$validacion['ok']) {
        apuntar('rechazado: datos no válidos', ['campos' => $validacion['errores']]);
        responder(['ok' => false, 'error' => 'datos', 'campos' => $validacion['errores']], 400, $json, $idioma);
    }
    $consulta = $validacion['consulta'];
    $resumen = resumenParaRegistro($consulta);

    // Clave del envío: la del formulario si es un UUID; si no, una huella de su
    // contenido, para que reenviar lo mismo tampoco duplique.
    $propia = is_string($datos['envio_id'] ?? null) ? $datos['envio_id'] : '';
    $clave = preg_match('/^[0-9a-f-]{36}$/i', $propia)
        ? strtolower($propia)
        : hash('sha256', $consulta['correo'] . '|' . $consulta['telefono'] . '|' . $consulta['comentarios']);
    $envio = substr($clave, 0, 8);

    $cfg = configuracion();
    if ($cfg['webhook'] === '' && !$cfg['simular']) {
        apuntar('NO ENTREGADO: falta la URL del webhook en privado/config.php', ['envio' => $envio] + $resumen);
        responder(['ok' => false, 'error' => 'servicio'], 503, $json, $idioma);
    }

    // Se marca ANTES de mandar: un segundo clic mientras el primero sigue en
    // curso no dispara otro envío. Si el CRM falla, se desmarca para reintentar.
    if (!marcarEnvio($clave, $ahora)) {
        apuntar('repetido: ya estaba entregado, no se manda otra vez', ['envio' => $envio] + $resumen);
        responder(['ok' => true], 200, $json, $idioma);
    }

    $sitio = $cfg['sitio'] !== '' ? $cfg['sitio'] : 'https://' . strtolower($_SERVER['HTTP_HOST'] ?? 'abogadovernal.com');
    $carga = cargaParaCrm($consulta, $sitio, (int) round(microtime(true) * 1000));

    if ($cfg['simular']) {
        apuntar('SIMULADO: no se llama al CRM', ['envio' => $envio, 'carga' => $carga]);
        responder(['ok' => true], 200, $json, $idioma);
    }

    $inicio = microtime(true);
    [$ok, $codigo] = enviarAlCrm($cfg['webhook'], $carga);
    if (!$ok) {
        desmarcarEnvio($clave);
        apuntar('NO ENTREGADO: el CRM no lo aceptó', ['envio' => $envio, 'crm' => $codigo] + $resumen);
        responder(['ok' => false, 'error' => 'servicio'], 502, $json, $idioma);
    }

    apuntar('entregado al CRM', ['envio' => $envio, 'ms' => (int) round((microtime(true) - $inicio) * 1000)] + $resumen);
    responder(['ok' => true], 200, $json, $idioma);
}

// Se atiende la petición salvo cuando las pruebas cargan el archivo solo por sus
// funciones (scripts/paridad-consulta.php).
if (!defined('CONSULTA_SOLO_FUNCIONES')) {
    atender();
}
