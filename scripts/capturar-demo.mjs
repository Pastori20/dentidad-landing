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
 * Los datos sembrados viven en `localStorage` (modo demo), así que sobreviven al
 * recargar y no hace falta sembrar dos veces.
 *
 * ⚠ Al pasar a mobile hay que RECARGAR y volver el scroll a cero. La primera
 * corrida no lo hacía y salieron mal dos de las cuatro capturas mobile: la app
 * quedaba montada con el layout de escritorio y, como la agenda y el
 * odontograma desbordan a lo ancho, el screenshot agarraba la página corrida a
 * la derecha. Se veían como recortes rotos del escritorio, con el texto cortado
 * en los dos bordes — justo lo contrario de lo que la sección quiere mostrar.
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
  // `fecha` es solo de desktop: en mobile no hay selector de día, por eso los
  // turnos se siembran para HOY y la agenda mobile los muestra sin navegar.
  { id: "agenda", desktop: ["Turnos"], mobile: ["Turnos"], fecha: DIA_CON_TURNOS, soloDesktop: true },
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

/** Clave del snapshot del modo demo (persistencia en `localStorage`). */
const SNAPSHOT_KEY = "odontoapp:workspace:v1";

/**
 * El modal abierto. `:visible` no es decorativo: puede haber más de un overlay
 * `fixed inset-0 z-50` en el DOM (uno oculto que quedó de un paso anterior), y
 * `.first()` a secas agarraba ese — sus campos no son editables y el `fill`
 * moría por timeout. Así se sembraban cero turnos, en silencio.
 */
const modalDe = (page) => page.locator("div.fixed.inset-0.z-50:visible").first();

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
  // Si ya había sesión, `goto` cae directo en el workspace y esta función
  // volvía al instante — el primer click salía antes de que la app hidratara y
  // el paso fallaba con "no encontré Turnos". Se espera el workspace.
  await page
    .locator('button:has-text("Turnos"):visible')
    .first()
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => {});
  await page.waitForTimeout(800);
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
    // La X de varios modales no tiene texto: se cierra por `aria-label`. Sin
    // esto, el modal de editar turno (que se abre al tocar un turno de la
    // lista en mobile) quedaba abierto y bloqueaba toda la corrida.
    for (const sel of [
      'button[aria-label="Cerrar"]',
      'button:has-text("Cerrar")',
      'button:has-text("Cancelar")',
      'button:has-text("Volver")',
    ]) {
      await modalDe(page).locator(sel).first()
        .click({ timeout: 1500, force: true }).catch(() => {});
      await page.waitForTimeout(350);
      if (!(await modalDe(page).count())) return;
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(400);
  }
}

/**
 * Deja un paciente seleccionado, que es lo que necesitan los pasos de ficha y
 * odontograma.
 *
 * En mobile la pestaña del bottom nav se llama **"Paciente"** (singular) y lleva
 * derecho a la ficha; en desktop es "Pacientes" y hay que elegir una fila de la
 * lista. No es lo mismo: buscar "Pacientes" en mobile no encuentra nada, y
 * entonces el click de fila caía sobre un TURNO de la agenda, que abre una hoja
 * de acciones. Esa hoja tapa el bottom nav y todos los pasos siguientes fallan.
 */
async function elegirPaciente(page, plataforma = "desktop") {
  if (plataforma === "mobile") {
    await clickSuave(page, "Paciente", 2200);
    return;
  }
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

/**
 * Turnos para HOY, escritos directo en el snapshot del modo demo.
 *
 * La agenda mobile no tiene selector de día: muestra la semana actual, así que
 * sin turnos de hoy sale vacía y una agenda vacía en la landing dice "acá no
 * trabaja nadie". Cargarlos por el formulario resultó frágil (el modal pide
 * elegir paciente en un buscador propio y su contenedor nunca queda quieto para
 * Playwright). Copiar los turnos que el demo YA trae, movidos a hoy, usa los
 * mismos datos ficticios y no depende de la UI.
 */
async function sembrarTurnosDeHoy(page) {
  const cargados = await page.evaluate((key) => {
    const snap = JSON.parse(localStorage.getItem(key) || "{}");
    if (!Array.isArray(snap.appointments)) {
      return 0;
    }
    const hoy = new Date();
    const ymd = [
      hoy.getFullYear(),
      String(hoy.getMonth() + 1).padStart(2, "0"),
      String(hoy.getDate()).padStart(2, "0"),
    ].join("-");

    const base = snap.appointments.filter((a) => a.kind === "appointment").slice(0, 3);
    if (base.length === 0) {
      return 0;
    }
    const nuevos = base.map((a, i) => ({ ...a, id: `apt-demo-hoy-${i}`, date: ymd }));
    // Idempotente: volver a correr el script no acumula turnos.
    snap.appointments = [
      ...snap.appointments.filter((a) => !String(a.id).startsWith("apt-demo-hoy-")),
      ...nuevos,
    ];
    localStorage.setItem(key, JSON.stringify(snap));
    return nuevos.length;
  }, SNAPSHOT_KEY);

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
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

/**
 * Vuelve el scroll a cero: el de la ventana y el de CUALQUIER contenedor que
 * scrollee a lo ancho (la grilla de la agenda y las arcadas del odontograma
 * tienen `overflow-x-auto`). Sin esto la captura sale corrida y con el texto
 * cortado en el borde izquierdo.
 */
async function scrollAlOrigen(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    for (const el of document.querySelectorAll("*")) {
      if (el.scrollLeft > 0) {
        el.scrollLeft = 0;
      }
    }
  });
  await page.waitForTimeout(350);
}

async function capturar(page, dir, plataforma) {
  for (const paso of PASOS) {
    await cerrarModal(page);
    let ok = true;
    for (const salto of paso[plataforma]) {
      if (!(await clickSuave(page, salto))) {
        ok = false;
        console.log(`  ! "${paso.id}": no encontré "${salto}"`);
        // Listar lo que SÍ hay ahorra la corrida siguiente: casi siempre el
        // texto del botón cambió, o hay una hoja/modal tapando la navegación.
        const visibles = await page.locator("button:visible").allInnerTexts();
        console.log(`     hay: ${JSON.stringify(visibles.slice(0, 10))}`);
      }
    }
    const fijaFecha = paso.fecha && !(paso.soloDesktop && plataforma === "mobile");
    if (fijaFecha && !(await fijarFecha(page, paso.fecha))) {
      console.log(`  ! "${paso.id}": no pude fijar ${paso.fecha}`);
      ok = false;
    }
    await page.waitForTimeout(900);
    await scrollAlOrigen(page);

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
console.log(`sembré ${await sembrarTurnosDeHoy(page)} turnos de hoy`);

// Recargar después de sembrar: si algún modal quedó colgado, su overlay
// `fixed inset-0 z-50` intercepta TODOS los clicks siguientes y la corrida de
// capturas falla entera. Recargar lo barre y los datos están en localStorage.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await login(page);
await elegirPaciente(page);

console.log("desktop 1440x900:");
await capturar(page, `${OUT}/desktop`, "desktop");

console.log("mobile 500x1000:");
await page.setViewportSize(MOBILE);
// Recargar es lo que hace que la app se monte con SU layout mobile (bottom nav,
// drawer, arcadas compactas) en vez de quedarse con el de escritorio encogido.
// Los datos sembrados están en localStorage, así que sobreviven.
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await login(page);
await elegirPaciente(page, "mobile");
// Tocar una fila en mobile abre el modal de editar turno: hay que barrerlo.
await cerrarModal(page);
await capturar(page, `${OUT}/mobile`, "mobile");

await ctx.close();
await browser.close();

/**
 * El odontograma NO tiene vista mobile: a 500px la app reemplaza las arcadas por
 * una tarjeta que dice "Mejor en horizontal". Publicar eso en la landing sería
 * anunciar que el odontograma no anda en el teléfono, y además la spec lo
 * prohíbe (FR-17).
 *
 * Se recorta un tramo de las dos arcadas de la captura de escritorio: siete
 * piezas por arcada, con la restauración marcada y la extracción. Es la parte
 * distintiva y, al ser un recorte ACOTADO, los números de pieza siguen
 * leyéndose en un teléfono — la banda entera de 32 piezas, metida en el ancho
 * de un celular, quedaba ilegible. Los bordes caen entre tarjetas y entre
 * piezas, así que se ve deliberado y no como un screenshot cortado.
 */
const { default: sharp } = await import("sharp");
await sharp(`${OUT}/desktop/odontograma.png`)
  .extract({ left: 630, top: 1112, width: 762, height: 545 })
  .toFile(`${OUT}/mobile/odontograma-arcadas.png`);
console.log("recorté mobile/odontograma-arcadas.png (el odontograma no tiene vista mobile)");

console.log("listo");
