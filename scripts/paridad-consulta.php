<?php
/*
 * Lado PHP de la prueba de paridad (src/lib/consulta-paridad.test.ts).
 * Lee por stdin una lista JSON de envíos y devuelve, para cada uno, lo que
 * dicen las funciones de hosting/consulta.php: la validación y, si pasa, el
 * JSON para el CRM y el resumen para el registro.
 */
declare(strict_types=1);
define('CONSULTA_SOLO_FUNCIONES', true);
require __DIR__ . '/../hosting/consulta.php';

$entrada = json_decode((string) stream_get_contents(STDIN), true);
$ahoraMs = (int) $argv[1];
$salida = [];
foreach ($entrada as $datos) {
    $v = validarConsulta($datos);
    $fila = ['validacion' => $v];
    if ($v['ok']) {
        $fila['carga'] = cargaParaCrm($v['consulta'], 'https://abogadovernal.com', $ahoraMs);
        $fila['resumen'] = resumenParaRegistro($v['consulta']);
    }
    $salida[] = $fila;
}
echo json_encode($salida, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
