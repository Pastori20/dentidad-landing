/**
 * Genera las capturas de producto para la sección demo de la landing.
 *
 * IMPORTANTE: corre contra el SaaS levantado en MODO DEMO (usuarios y datos
 * ficticios). Nunca contra producción — las capturas se publican y los datos de
 * pacientes son información de salud.
 *
 * Levantar el SaaS en modo demo (en el repo odonto-next):
 *   printf 'BETTER_AUTH_SECRET=\nBETTER_AUTH_URL=\nDATABASE_URL=\n' > .env.production.local
 *   npm run build && npx next start --hostname 127.0.0.1 --port 3100
 *   node scripts/capturar-demo.mjs      # (desde este repo)
 *   rm .env.production.local            # NO olvidarse
 *
 * UN SOLO contexto de browser: sembramos y navegamos una vez a tamaño desktop,
 * capturamos, y después cambiamos el viewport a mobile y volvemos a capturar.
 * Los datos sembrados viven en el estado de la app, así que con dos contextos
 * habría que sembrar dos veces (y el mobile ni siquiera tiene selector de fecha).
 */
import { chromium } from "file:///C:/Users/Pastori/OneDrive/Desktop/Bautista/OdontoApp/odonto-next/node_modules/playwright-core/index.mjs";
import { mkdir } from "node:fs/promises";

const BASE = "http://127.0.0.1:3100";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "public/screens/demo";

// La proporción tiene que ser IDÉNTICA entre pasos: si no, el marco de la
// sección salta al fundir de una captura a la siguiente.
const DESKTOP = { width: 1440, height: 900 }; // 16:10
const MOBILE = { width: 500, height: 1000 }; // 1:2

/** Los turnos del demo están en fechas fijas y pasadas; la última es abril 2026. */
const DIA_CON_TURNOS = "2026-03-31"; // 3 turnos (src/data/mock/appointments.ts)

/**
 * La app navega distinto según el ancho: desktop tiene sidebar + pestañas
 * clínicas, mobile tiene bottom nav + drawer "Más".
 *
 * Dos trampas que costaron corridas:
 * - Los textos de navegación están DUPLICADOS en el DOM (sidebar y drawer
 *   conviven), así que todo selector va con `:visible`. Sin eso `.first()`
 *   agarra el oculto y el click nunca ocurre.
 * - El sidebar dice "Facturacion" (sin tilde) y el drawer "Facturación" (con
 *   tilde). No es un typo: son textos distintos.
 * - El odontograma NO está en el drawer: el drawer colapsa las 5 secciones
 *   clínicas en "Ficha", y adentro hay un strip de pestañas.
 */
const PASOS = [
  { id: "agenda", desktop: ["Turnos"], mobile: ["Turnos"], fecha: DIA_CON_TURNOS },
  { id: "ficha", desktop: ["Ficha"], mobile: ["Más", "Ficha"] },
  {
    id: "odontograma",
    desktop: ["Ficha", "Odontograma"],
    mobile: ["Más", "Ficha", "Odontograma"],
  },
  { id: "caja", desktop: ["Facturacion"], mobile: ["Más", "Facturación"] },
];

/**
 * El demo no trae un solo movimiento de caja, así que Facturación sale toda en
 * $0 — y una caja vacía en la landing dice "acá no trabaja nadie".
 * Los sembramos con el formulario real de la app: no tocamos ni la base ni los
 * mocks del SaaS. Importes INVENTADOS, ningún paciente real.
 */
const PAGOS_DEMO = [
  { concepto: "Limpieza y flúor", importe: "38000", medio: "Efectivo" },
  { concepto: "Conducto molar", importe: "145000", medio: "Transferencia" },
  { concepto: "Corona de porcelana", importe: "210000", medio: "Tarjeta credito" },
  { concepto: "Control y radiografía", importe: "25000", medio: "Efectivo" },
];

/**
 * Turnos de HOY. Sembrarlos es más robusto que navegar el calendario: el
 * selector de fecha es un popover propio y en mobile ni siquiera existe, así
 * que con navegación la agenda mobile quedaba siempre vacía.
 * Motivos INVENTADOS; el paciente es el del demo.
 */
const TURNOS_DEMO = [
  { hora: "09:00", motivo: "Control de ortodoncia", estado: "Confirmado" },
  { hora: "10:30", motivo: "Limpieza y flúor", estado: "Confirmado con recordatorio" },
  { hora: "12:00", motivo: "Conducto molar", estado: "Pendiente" },
];

const modalDe = (page) => page.locator("div.fixed.inset-0.z-50").first();

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
    await page.locator('form:has(input[type="password"]) button[type="submit"]').first().click();
    await page.waitForTimeout(4000);
  }
}

/** Click tolerante por texto visible. Timeout corto a propósito: un fallo lento multiplica la corrida. */
async function clickSuave(page, texto, ms = 1600) {
  for (const sel of [
    `button:has-text("${texto}"):visible`,
    `[role="tab"]:has-text("${texto}"):visible`,
  ]) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) {
        await el.click({ timeout: 4000 });
        await page.waitForTimeout(ms);
        return true;
      }
    } catch {
      // tapado, animándose o fuera de pantalla
    }
  }
  return false;
}

/**
 * Cierra cualquier modal abierto. CRÍTICO: el overlay es `fixed inset-0 z-50` y
 * si queda abierto intercepta todos los clicks siguientes — un modal colgado
 * hace fallar la corrida entera, no solo el paso que lo abrió.
 */
async function cerrarModal(page) {
  for (let i = 0; i < 3; i += 1) {
    if (!(await modalDe(page).count())) return;
    for (const txt of ["Cerrar", "Cancelar", "Volver"]) {
      await modalDe(page).locator(`button:has-text("${txt}")`).first()
        .click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(350);
      if (!(await modalDe(page).count())) return;
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(400);
  }
}

async function elegirPaciente(page) {
  await clickSuave(page, "Pacientes", 2000);
  try {
    const fila = page.locator("li button:visible").first();
    if (await fila.count()) {
      await fila.click({ timeout: 4000 });
      await page.waitForTimeout(1800);
    }
  } catch {
    // el demo ya trae un paciente seleccionado
  }
}

async function sembrarTurnos(page) {
  await cerrarModal(page);
  await clickSuave(page, "Turnos", 2600);

  let cargados = 0;
  for (const turno of TURNOS_DEMO) {
    await cerrarModal(page);
    await clickSuave(page, "+ TURNO", 1400);
    const modal = modalDe(page);
    // Esperar EXPLÍCITAMENTE a que el modal se muestre. Chequear `count()` a
    // secas es una carrera: el modal aparece unos ms después y salíamos del
    // loop dejándolo abierto — y ese overlay bloquea todo lo que viene después.
    await modal.waitFor({ state: "visible", timeout: 6000 }).catch(() => {});
    if (!(await modal.count())) break;

    try {
      await modal.locator('input[type="text"]').first()
        .fill(turno.motivo, { timeout: 2500 });
      const selects = modal.locator("select");
      const n = await selects.count();
      // Orden observado: profesional · hora inicio · hora fin · estado.
      await selects.nth(0).selectOption({ index: 1 }).catch(() => {});
      await selects.nth(1).selectOption(turno.hora).catch(() => {});
      if (n >= 4) {
        await selects.nth(n - 1).selectOption({ label: turno.estado }).catch(() => {});
      }
      await modal.locator('button[type="submit"]').first().click({ timeout: 3000 });
      await page.waitForTimeout(1700);
      cargados += 1;
    } catch {
      // formulario distinto al esperado: seguimos con los que salgan
    }
    await cerrarModal(page);
  }
  await cerrarModal(page);
  return cargados;
}

async function sembrarPagos(page) {
  await cerrarModal(page);
  await clickSuave(page, "Facturacion", 2200);

  let cargados = 0;
  for (const pago of PAGOS_DEMO) {
    await cerrarModal(page);
    // NO confiar en el booleano del click: el modal abre con animación y
    // Playwright reporta timeout en su chequeo de estabilidad AUNQUE el click
    // haya entrado. Hay que preguntarle al DOM si el modal está.
    await clickSuave(page, "Registrar pago", 1400);
    const modal = modalDe(page);
    await modal.waitFor({ state: "visible", timeout: 6000 }).catch(() => {});
    if (!(await modal.count())) break;

    try {
      await modal.locator('button:has-text("Pago")').first().click({ timeout: 2500 });
      await page.waitForTimeout(400);
      await modal.locator('input[placeholder*="Limpieza"]').first()
        .fill(pago.concepto, { timeout: 2500 });
      await modal.locator('input[placeholder*="45000"]').first()
        .fill(pago.importe, { timeout: 2500 });
      await modal.locator("select").last()
        .selectOption({ label: pago.medio }).catch(() => {});
      await modal.locator('button[type="submit"]:has-text("Guardar")').first()
        .click({ timeout: 3000 });
      await page.waitForTimeout(1600);
      cargados += 1;
    } catch {
      // formulario distinto al esperado: mejor menos pagos que colgar la corrida
    }
    await cerrarModal(page);
  }
  await cerrarModal(page);
  return cargados;
}

/**
 * Mueve la agenda a una fecha. El selector NO es un `input[type=date]`: es un
 * popover propio (src/components/ui/date-picker.tsx) con dos `<select>` —
 * mes (0-indexado) y año — más la grilla de días. `fill()` no sirve.
 */
async function fijarFecha(page, ymd) {
  const [anio, mes, dia] = ymd.split("-");
  try {
    const trigger = page.locator(`button:has-text("/${anio}"):visible`).first();
    if (!(await trigger.count())) return false;
    await trigger.click({ timeout: 4000 });
    await page.waitForTimeout(900);

    const selects = page.locator("select:visible");
    if ((await selects.count()) < 2) return false;
    await selects.nth(0).selectOption(String(Number(mes) - 1));
    await selects.nth(1).selectOption(anio);
    await page.waitForTimeout(700);

    const diaBtn = page.locator("button:visible")
      .filter({ hasText: new RegExp(`^${Number(dia)}$`) }).first();
    if (!(await diaBtn.count())) return false;
    await diaBtn.click({ timeout: 4000 });
    await page.waitForTimeout(2200);
    return true;
  } catch {
    return false;
  }
}

async function capturar(page, dir, plataforma) {
  for (const paso of PASOS) {
    await cerrarModal(page);
    let ok = true;
    for (const salto of paso[plataforma]) {
      if (!(await clickSuave(page, salto))) {
        ok = false;
        console.log(`  ! "${paso.id}": no encontré "${salto}"`);
      }
    }
    if (paso.fecha && !(await fijarFecha(page, paso.fecha))) {
      console.log(`  ! "${paso.id}": no pude fijar ${paso.fecha}`);
      ok = false;
    }
    await page.waitForTimeout(900);

    // El odontograma en mobile muestra "girá el dispositivo": un visitante que
    // viene de un anuncio no va a girar nada (FR-17 del spec).
    const pideRotar = await page.evaluate(() =>
      /gir[áa] (el|tu)|rot[áa] (el|tu)|horizontal para/i.test(document.body.innerText),
    );

    await page.screenshot({ path: `${dir}/${paso.id}.png` });
    console.log(`  ${ok ? "ok" : "??"} ${paso.id}${pideRotar ? "   ⚠ PIDE ROTAR" : ""}`);
  }
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
await mkdir(`${OUT}/desktop`, { recursive: true });
await mkdir(`${OUT}/mobile`, { recursive: true });

const ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2 });
const page = await ctx.newPage();

await login(page);
await elegirPaciente(page);
console.log(`sembré ${await sembrarPagos(page)} pagos`);

console.log("desktop 1440x900:");
await capturar(page, `${OUT}/desktop`, "desktop");

console.log("mobile 500x1000:");
await page.setViewportSize(MOBILE);
await page.waitForTimeout(2000);
await capturar(page, `${OUT}/mobile`, "mobile");

await ctx.close();
await browser.close();
console.log("listo");
