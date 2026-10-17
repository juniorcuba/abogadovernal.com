<?php
// Página 404 propia. Este hosting ignora `ErrorDocument` para archivos estáticos
// (devuelve un "404 Not Found" de texto plano), pero sí respeta un 404 emitido
// desde PHP: el .htaccess manda aquí todo lo que no existe. La página la genera
// el build en los dos idiomas (src/app/[lang]/no-encontrada/page.estatico.tsx).
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Robots-Tag: noindex');
$original = $_SERVER['REDIRECT_URL'] ?? ($_SERVER['REQUEST_URI'] ?? '/');
$idioma = preg_match('#^/en(/|$)#', $original) ? 'en' : 'es';
readfile(__DIR__ . "/$idioma/no-encontrada/index.html");
