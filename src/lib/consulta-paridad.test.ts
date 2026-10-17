// Paridad entre las dos versiones del formulario: la de Node (src/lib/consulta.ts,
// la que corre en Render) y la de PHP (hosting/consulta.php, la del hosting de
// GoDaddy). Las dos tienen que validar igual y mandar al CRM el mismo JSON.
//
//   npm run test:php     (necesita `php` en el PATH; si no está, se salta)
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { cargaParaCrm, resumenParaRegistro, validarConsulta } from "./consulta.ts";

const AHORA = new Date("2026-10-13T17:00:00.000Z");

const buena = {
  nombre: "  María   Pérez ",
  telefono: "(214) 555-0123",
  correo: "Maria@Example.com",
  oficina: "Dallas",
  comentarios: "Quiero saber si califico.\r\n\r\n\r\n\r\nGracias.",
  idioma: "es",
  pagina: "/contacto?utm=x#form",
};

/** Los casos de consulta.test.ts y los raros que solo importan al comparar dos lenguajes. */
const CASOS: Record<string, unknown>[] = [
  buena,
  { ...buena, comentarios: "" },
  { ...buena, oficina: "" },
  { ...buena, oficina: undefined },
  { ...buena, oficina: "Virtual office", idioma: "en" },
  { nombre: "A", telefono: "llámame", correo: "sin-arroba", oficina: "Miami", comentarios: "x".repeat(2001) },
  { ...buena, telefono: "12345" },
  { ...buena, telefono: "1234567890123456" },
  { ...buena, telefono: "+1 469-809-1181" },
  { ...buena, nombre: { $gt: "" }, correo: ["a@b.co"] },
  { ...buena, nombre: "Ana\u0000\nLópez" },
  { ...buena, correo: "a@b.co", comentarios: "" },
  // Espacios que no son el de siempre, y tabuladores.
  { ...buena, nombre: " José \tLuis " },
  { ...buena, comentarios: "  \t hola\t\tqué tal  \n\n\n\n adiós \t " },
  // Emojis: JavaScript los cuenta como dos. El límite tiene que caer igual.
  { ...buena, comentarios: "😀".repeat(1000) },
  { ...buena, comentarios: "😀".repeat(1001) },
  { ...buena, nombre: "😀" },
  // Mayúsculas fuera del ASCII en el correo y en las iniciales.
  { ...buena, nombre: "ángel ÑOÑO élite", correo: "ÁNGEL@Ejemplo.COM" },
  { ...buena, correo: "a b@c.co" },
  { ...buena, correo: "<a@b.co>" },
  { ...buena, correo: "x".repeat(250) + "@b.co" },
  // Tipos que no son texto.
  { ...buena, telefono: 2145550123 },
  { ...buena, idioma: "fr" },
  { ...buena, pagina: "//evil.example/x" },
  { ...buena, pagina: "/a<script>" },
  { ...buena, pagina: "/en/areas-de-servicio/dallas" },
  { ...buena, pagina: "/" + "a".repeat(300) },
  { ...buena, pagina: 5 },
  {},
];

const hayPhp = spawnSync("php", ["-v"]).status === 0;

test("PHP y TypeScript validan igual y mandan al CRM el mismo JSON", { skip: !hayPhp && "php no está en el PATH" }, () => {
  const php = JSON.parse(
    execFileSync("php", ["scripts/paridad-consulta.php", String(AHORA.getTime())], {
      input: JSON.stringify(CASOS),
      encoding: "utf8",
    }),
  ) as unknown[];

  assert.equal(php.length, CASOS.length);
  CASOS.forEach((caso, i) => {
    const v = validarConsulta(caso);
    const ts: Record<string, unknown> = { validacion: v };
    if (v.ok) {
      ts.carga = cargaParaCrm(v.consulta, "https://abogadovernal.com", AHORA);
      ts.resumen = resumenParaRegistro(v.consulta);
    }
    // JSON de ida y vuelta: undefined desaparece igual que en PHP.
    assert.deepEqual(php[i], JSON.parse(JSON.stringify(ts)), `caso ${i}: ${JSON.stringify(caso).slice(0, 80)}`);
  });
});
