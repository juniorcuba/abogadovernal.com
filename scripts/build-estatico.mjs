// Genera out/ listo para subir a un hosting Apache + PHP (GoDaddy): la
// exportación estática de Next + lo que hay en hosting/ (.htaccess, 404.php y
// el formulario en PHP). Ver la cabecera de next.config.ts.
//
//   npm run build:estatico
//
// Por defecto es el build de PRUEBAS (2020.abogadovernal.com): sin indexar y sin
// forzar HTTPS. Para cambiarlo, por entorno:
//   NEXT_PUBLIC_SITE_URL=https://abogadovernal.com   dominio de los metadatos
//   NEXT_PUBLIC_NOINDEX=false                        indexable (producción)
//   FORZAR_HTTPS=1                                   redirige http → https
//
// No toca .next/ (es del servidor de desarrollo que comparten las sesiones):
// construye en .next-estatico/.
import { execSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";

const sitio = process.env.NEXT_PUBLIC_SITE_URL || "https://2020.abogadovernal.com";
const noindex = process.env.NEXT_PUBLIC_NOINDEX !== "false";
const https = process.env.FORZAR_HTTPS === "1";

const env = {
  ...process.env,
  DESTINO: "estatico",
  NEXT_PUBLIC_SITE_URL: sitio,
  NEXT_PUBLIC_NOINDEX: noindex ? "true" : "false",
};

rmSync(".next-estatico", { recursive: true, force: true });
rmSync("out", { recursive: true, force: true });
execSync(`node node_modules/next/dist/bin/next build`, { stdio: "inherit", env });
// Con `output: "export"` y un distDir propio, Next 16 deja la exportación en el
// distDir y no en out/: se mueve.
renameSync(".next-estatico", "out");

for (const f of ["out/es/index.html", "out/en/index.html", "out/es/no-encontrada/index.html"]) {
  if (!existsSync(f)) throw new Error(`La exportación no generó ${f}`);
}

// hosting/ → out/, salvo un config.php real si alguien lo dejó ahí por error:
// ese archivo lleva el secreto y solo lo sube el script de despliegue.
cpSync("hosting", "out", {
  recursive: true,
  filter: (origen) => !/[\\/]privado[\\/]config\.php$/.test(origen),
});

// .htaccess: se activan o se quitan las líneas marcadas.
const marcas = { "@HTTPS@": https, "@NOINDEX@": noindex };
const htaccess = readFileSync("out/.htaccess", "utf8")
  .split("\n")
  .flatMap((linea) => {
    for (const [marca, activa] of Object.entries(marcas)) {
      const m = linea.match(new RegExp(`^(\\s*)# ${marca} ?(.*)$`));
      if (m) return activa ? [m[1] + m[2]] : [];
    }
    return [linea];
  })
  .join("\n");
writeFileSync("out/.htaccess", htaccess);

writeFileSync("out/robots.txt", noindex ? "User-agent: *\nDisallow: /\n" : "User-agent: *\nAllow: /\n");

console.log(
  `\nout/ listo para ${sitio}` +
    `\n  indexable: ${noindex ? "no (pruebas)" : "SÍ"}` +
    `\n  fuerza HTTPS: ${https ? "sí" : "no (actívalo con FORZAR_HTTPS=1 cuando el certificado sea válido)"}`,
);
