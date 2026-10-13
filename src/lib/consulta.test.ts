// Pruebas de la lógica del formulario: `npm test`.
import assert from "node:assert/strict";
import { test } from "node:test";
import { cargaParaCrm, RegistroTemporal, rutaLimpia, validarConsulta } from "./consulta.ts";

const buena = {
  nombre: "  María   Pérez ",
  telefono: "(214) 555-0123",
  correo: "Maria@Example.com",
  oficina: "Dallas",
  comentarios: "Quiero saber si califico.\r\n\r\n\r\n\r\nGracias.",
  idioma: "es",
  pagina: "/contacto?utm=x#form",
};

test("acepta un envío correcto y lo normaliza", () => {
  const r = validarConsulta(buena);
  assert.ok(r.ok);
  assert.equal(r.consulta.nombre, "María Pérez");
  assert.equal(r.consulta.telefono, "(214) 555-0123");
  assert.equal(r.consulta.correo, "maria@example.com");
  assert.equal(r.consulta.comentarios, "Quiero saber si califico.\n\nGracias.");
  assert.equal(r.consulta.pagina, "/contacto");
});

test("la oficina y los comentarios son opcionales", () => {
  const r = validarConsulta({ ...buena, oficina: "", comentarios: "" });
  assert.ok(r.ok);
  assert.equal(r.consulta.oficina, "");
});

test("la oficina virtual llega igual desde el formulario en inglés", () => {
  const r = validarConsulta({ ...buena, oficina: "Virtual office", idioma: "en" });
  assert.ok(r.ok);
  assert.equal(r.consulta.oficina, "Oficina virtual");
  assert.equal(r.consulta.idioma, "en");
});

test("rechaza lo que no vale y dice qué campo", () => {
  const r = validarConsulta({
    nombre: "A",
    telefono: "llámame",
    correo: "sin-arroba",
    oficina: "Miami",
    comentarios: "x".repeat(2001),
  });
  assert.ok(!r.ok);
  assert.deepEqual(r.errores, ["nombre", "telefono", "correo", "oficina", "comentarios"]);
});

test("rechaza teléfonos con pocos o demasiados dígitos", () => {
  assert.ok(!validarConsulta({ ...buena, telefono: "12345" }).ok);
  assert.ok(!validarConsulta({ ...buena, telefono: "1234567890123456" }).ok);
  assert.ok(validarConsulta({ ...buena, telefono: "+1 469-809-1181" }).ok);
});

test("no deja pasar campos que no son texto", () => {
  const r = validarConsulta({ ...buena, nombre: { $gt: "" }, correo: ["a@b.co"] });
  assert.ok(!r.ok);
  assert.deepEqual(r.errores, ["nombre", "correo"]);
});

test("quita los caracteres de control del nombre", () => {
  const r = validarConsulta({ ...buena, nombre: "Ana\u0000\nLópez" });
  assert.ok(r.ok);
  assert.equal(r.consulta.nombre, "Ana López");
});

test("la ruta de la página no acepta dominios ni caracteres raros", () => {
  assert.equal(rutaLimpia("/en/areas-de-servicio/dallas"), "/en/areas-de-servicio/dallas");
  assert.equal(rutaLimpia("//evil.example/x"), "/");
  assert.equal(rutaLimpia("https://evil.example"), "/");
  assert.equal(rutaLimpia("/a<script>"), "/");
  assert.equal(rutaLimpia(undefined), "/");
});

test("arma el JSON del CRM con los ocho campos acordados", () => {
  const r = validarConsulta(buena);
  assert.ok(r.ok);
  const carga = cargaParaCrm(r.consulta, "https://abogadovernal.com/", new Date("2026-10-13T17:00:00Z"));
  assert.deepEqual(Object.keys(carga), [
    "full_name", "phone", "email", "office", "comments", "source", "platform", "campaign",
  ]);
  assert.equal(carga.source, "Sitio Web Abogado Vernal");
  assert.equal(carga.platform, "Sitio Web");
  assert.equal(carga.campaign, "https://abogadovernal.com/contacto");
  assert.match(carga.comments, /^Quiero saber si califico\.\n\nGracias\.\n\n\[Sitio web\] Idioma: español\./);
  assert.match(carga.comments, /2026-10-13T17:00:00\.000Z/);
});

test("sin comentarios, el campo lleva solo la nota del sitio", () => {
  const r = validarConsulta({ ...buena, comentarios: "", idioma: "en" });
  assert.ok(r.ok);
  const carga = cargaParaCrm(r.consulta, "https://abogadovernal.com", new Date("2026-10-13T17:00:00Z"));
  assert.match(carga.comments, /^\[Sitio web\] Idioma: inglés\./);
});

test("el registro temporal cuenta dentro de la ventana y olvida después", () => {
  const reg = new RegistroTemporal(1000);
  assert.equal(reg.contar("ip", 0), 1);
  assert.equal(reg.contar("ip", 500), 2);
  assert.ok(reg.tiene("ip", 999));
  assert.ok(!reg.tiene("ip", 1000));
  assert.equal(reg.contar("ip", 1500), 1);
  reg.quitar("ip");
  assert.ok(!reg.tiene("ip", 1600));
});

test("el registro temporal no crece sin límite", () => {
  const reg = new RegistroTemporal(60_000, 3);
  for (const k of ["a", "b", "c", "d", "e"]) reg.contar(k, 0);
  assert.ok(!reg.tiene("a", 1));
  assert.ok(reg.tiene("e", 1));
});
