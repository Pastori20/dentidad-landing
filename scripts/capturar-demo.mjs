/**
 * Genera las capturas de producto para la sección demo de la landing.
 *
 * IMPORTANTE: corre contra el SaaS levantado en MODO DEMO (usuarios y datos
 * ficticios). Nunca contra producción — las capturas se publican y los datos de
 * pacientes son información de salud.
 *
 * Cómo levantar el SaaS en modo demo (en el repo odonto-next):
 *   printf 'BETTER_AUTH_SECRET=\nBETTER_AUTH_URL=\nDATABASE_URL=\n' > .env.production.local
 *   npm run build && npx next start --hostname 127.0.0.1 --port 3100
 *   # ...correr este script...
 *   rm .env.production.local      # NO olvidarse
 *
 * Uso:  node scripts/capturar-demo.mjs
 */
import { chromium } from "file:///C:/Users/Pastori/OneDrive/Desktop/Bautista/OdontoApp/odonto-next/node_modules/playwright-core/index.mjs";
import { mkdir } from "node:fs/promises";

const BASE = "http://127.0.0.1:3100";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "public/screens/demo";

// Viewports fijos: la proporción tiene que ser IDÉNTICA entre pasos, si no el
// marco salta al fundir de uno a otro.
const DESKTOP = { width: 1440, height: 900 }; // 16:10
const MOBILE = { width: 500, height: 1000 }; // 1:2

/**
 * Los turnos del demo viven en fechas FIJAS del pasado (la última es abril 2026),
 * así que "hoy" siempre cae en una agenda vacía. Una agenda con 0 turnos en la
 * landing transmite "acá no trabaja nadie" — hay que posicionarse en un día con
 * actividad. El 31/03/2026 es el que más tiene (3 turnos).
 * Fuente: src/data/mock/appointments.ts del SaaS.
 */
const DIA_CON_TURNOS = "2026-03-31";

/**
 * Los mismos 4 pasos, pero la app navega distinto según el ancho:
 * desktop tiene sidebar + pestañas clínicas; mobile tiene bottom nav + drawer "Más".
 * Por eso cada paso lleva su propia ruta de clicks por plataforma.
 *
 * OJO: los textos de navegación están DUPLICADOS en el DOM (sidebar de desktop y
 * drawer de mobile conviven), así que todos los selectores llevan `:visible` —
 * sin eso, `.first()` agarra el que está oculto y el click nunca ocurre.
 */
const PASOS = [
  { id: "agenda", desktop: ["Turnos"], mobile: ["Turnos"], fecha: DIA_CON_TURNOS },
  { id: "ficha", desktop: ["Ficha"], mobile: ["Más", "Ficha"] },
  // El odontograma NO está en el drawer de mobile: el drawer colapsa las 5
  // secciones clínicas en "Ficha", y adentro hay un strip de pestañas.
  {
    id: "odontograma",
    desktop: ["Ficha", "Odontograma"],
    mobile: ["Más", "Ficha", "Odontograma"],
  },
  // OJO: el sidebar de desktop dice "Facturacion" (sin tilde) y el drawer de
  // mobile dice "Facturación" (con tilde). No es un typo, son textos distintos.
  { id: "caja", desktop: ["Facturacion"], mobile: ["Más", "Facturación"] },
];

async function login(page) {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() =>
    localStorage.setItem("dentidad:cookie-notice-acknowledged-v1", "true"),
  );
  await page.reload({ waitUntil: "networkidle" });
  const email = page.locator('input[type="email"]').first();
  if (await email.count()) {
    await email.fill("admin@dentidad.demo");
    await page.locator('input[type="password"]').first().fill("Admin12345!");
    await page
      .locator('form:has(input[type="password"]) button[type="submit"]')
      .first()
      .click();
    await page.waitForTimeout(4000);
  }
}

/** Click tolerante por texto visible. Si no está, sigue de largo. */
async function clickSuave(page, texto, ms = 1600) {
  for (const sel of [
    `button:has-text("${texto}"):visible`,
    `[role="tab"]:has-text("${texto}"):visible`,
    `a:has-text("${texto}"):visible`,
  ]) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) {
        await el.click({ timeout: 3500 });
        await page.waitForTimeout(ms);
        return true;
      }
    } catch {
      // tapado o fuera de pantalla — probamos el siguiente selector
    }
  }
  return false;
}

/** Selecciona el primer paciente, para que Ficha y Odontograma tengan contenido. */
async function elegirPaciente(page) {
  await clickSuave(page, "Pacientes");
  try {
    const fila = page.locator('tbody tr:visible, li button:visible').first();
    if (await fila.count()) {
      await fila.click({ timeout: 3500 });
      await page.waitForTimeout(1800);
    }
  } catch {
    // en mobile la lista es otra; el demo ya trae un paciente seleccionado
  }
}

/**
 * Mueve la agenda a una fecha concreta.
 *
 * El selector de fecha NO es un `input[type=date]`: es un popover propio
 * (src/components/ui/date-picker.tsx del SaaS) con dos `<select>` — mes (0-11) y
 * año — más la grilla de días. Por eso no sirve `fill()`.
 */
async function fijarFecha(page, ymd) {
  const [anio, mes, dia] = ymd.split("-");
  try {
    const trigger = page.locator(`button:has-text("/${anio}"):visible`).first();
    if (!(await trigger.count())) return false;
    await trigger.click({ timeout: 3500 });
    await page.waitForTimeout(900);

    const selects = page.locator("select:visible");
    if ((await selects.count()) < 2) return false;
    await selects.nth(0).selectOption(String(Number(mes) - 1)); // 0-indexado
    await selects.nth(1).selectOption(anio);
    await page.waitForTimeout(700);

    // Día exacto dentro de la grilla (no `has-text`, que haría match parcial).
    const diaBtn = page
      .locator("button:visible")
      .filter({ hasText: new RegExp(`^${Number(dia)}$`) })
      .first();
    if (!(await diaBtn.count())) return false;
    await diaBtn.click({ timeout: 3500 });
    await page.waitForTimeout(2200);
    return true;
  } catch {
    return false;
  }
}

async function capturar(page, dir, plataforma) {
  for (const paso of PASOS) {
    // Cerrar cualquier drawer/modal abierto del paso anterior: si queda abierto
    // tapa la navegación y terminamos fotografiando el drawer.
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(500);

    const ruta = paso[plataforma];
    let llegue = true;
    for (const salto of ruta) {
      if (!(await clickSuave(page, salto))) {
        llegue = false;
        console.log(`  ! "${paso.id}": no encontré "${salto}"`);
      }
    }

    if (paso.fecha && !(await fijarFecha(page, paso.fecha))) {
      console.log(`  ! no pude fijar la fecha ${paso.fecha} — la agenda va a salir vacía`);
      llegue = false;
    }

    await page.waitForTimeout(900);

    // Aviso de "girá el dispositivo": el paso del odontograma en mobile NO puede
    // pedirle eso a un visitante que viene de un anuncio (FR-17).
    const pideRotar = await page.evaluate(() =>
      /gir[áa] (el|tu)|rot[áa] (el|tu)|horizontal para ver/i.test(document.body.innerText),
    );

    await page.screenshot({ path: `${dir}/${paso.id}.png` });
    console.log(
      `  ${llegue ? "ok" : "??"} ${paso.id}${pideRotar ? "   ⚠ PIDE ROTAR EL TELÉFONO" : ""}`,
    );
  }
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

await mkdir(`${OUT}/desktop`, { recursive: true });
await mkdir(`${OUT}/mobile`, { recursive: true });

console.log("desktop 1440x900:");
{
  const ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await login(page);
  await elegirPaciente(page);
  await capturar(page, `${OUT}/desktop`, "desktop");
  await ctx.close();
}

console.log("mobile 500x1000:");
{
  const ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await login(page);
  await elegirPaciente(page);
  await capturar(page, `${OUT}/mobile`, "mobile");
  await ctx.close();
}

await browser.close();
console.log("listo");
