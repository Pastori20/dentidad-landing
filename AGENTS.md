# Agents.md — Dentidad Landing (comercial)

> **Lectura obligatoria antes de tocar código.** Si abrís una sesión y este archivo no fue leído todavía, leelo primero.
> **Encoding:** mantener este archivo guardado en UTF-8 para evitar texto roto en terminales o editores.

## Qué es este proyecto

Landing comercial estática de Dentidad. Es la página que ve un visitante nuevo cuando llega a `dentidad.com` — explica el producto, las funcionalidades, planes y permite "solicitar acceso".

- **No tiene login, ni base de datos, ni backend.** Es 100% estática (Next.js SSG).
- El **sistema SaaS real** (login, fichas clínicas, etc.) vive en otro repo: `Bautista/OdontoApp/odonto-next/` → `app.dentidad.com`.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js **15** (App Router) |
| UI | React 19 |
| Estilos | Tailwind CSS **v3** (paleta Dentidad en `tailwind.config.ts`) |
| Fonts | DM Sans + DM Mono vía `next/font` |
| Markdown | `marked` (para renderizar `/terminos` y `/privacidad`) |
| Image | Custom `<ScreenTile>` con detección de archivos vía `fs` |
| Hosting | Vercel (proyecto `dentidad-landing`) |
| Dominios | `dentidad.com` + `www.dentidad.com` |

## Estructura

```
app/
├── layout.tsx          # Root layout + metadata SEO + JSON-LD
├── page.tsx            # Orquesta secciones del home
├── globals.css         # Tokens + utilidades + .legal-prose para .md
├── sitemap.ts          # Sitemap (incluye /, /terminos, /privacidad)
├── terminos/page.tsx   # Renderiza terminos-y-condiciones.md
└── privacidad/page.tsx # Renderiza politica-de-privacidad.md
components/
├── Header.tsx          # Sticky nav con menú mobile
├── Hero.tsx            # Banner + 2 ScreenTiles (KPIs + agenda)
├── Problem.tsx         # 3 dolores del consultorio
├── Features.tsx        # 7 features en zigzag (con CropImage / ScreenTile / Placeholder)
├── Roadmap.tsx         # 5 cards de "Próximamente"
├── Differentiation.tsx # Tabla Excel vs Dentidad (table en desktop, cards en mobile)
├── Audience.tsx        # 3 cards "¿Para quién es Dentidad?"
├── FAQ.tsx             # Accordion de 8 preguntas
├── Pricing.tsx         # Placeholder "definiendo planes"
├── CTA.tsx             # Sección final con mailto + wa.me
├── Footer.tsx          # 4 columnas con datos de Solvianweb
├── Logo.tsx            # Wordmark Dent (navy) + idad (mint)
├── ScreenTile.tsx      # Renderiza PNGs pre-recortados a tamaño natural
├── CropImage.tsx       # Renderiza un crop con background-image + position + zoom (legacy)
└── LegalLayout.tsx     # Layout simplificado para /terminos y /privacidad
content/legal/
├── terminos-y-condiciones.md
└── politica-de-privacidad.md
lib/
└── legal.ts            # Lee y parsea los .md con marked
public/screens/
├── hero-kpis.png       # Recorte del banner + 4 KPIs del dashboard
├── hero-agenda.png     # Recorte de la agenda de hoy con turnos
├── odo-procedimientos.png
├── odo-completo.png
├── agenda-header.png
├── agenda-turnos.png
├── agenda-referencias.png
├── ficha-paciente.png
├── ficha-datos.png
├── ficha-antecedentes.png
├── ficha-anamnesis.png
├── evoluciones.png
├── caja-paciente.png
├── caja-movimientos.png
└── galeria.png
```

## Estado actual (snapshot operativo)

**Última actualización: 14 de mayo de 2026.**
> Actualizar al cerrar cada sesión grande.

### Dominios
- **Producción**: `dentidad.com` + `www.dentidad.com` (split: el sistema vive en `app.dentidad.com`)
- URL técnica de Vercel: `dentidad-landing.vercel.app`

### Estado del deploy
- Deploy actual en Vercel desde CLI (`npx vercel --prod`).
- **No tiene integración con GitHub todavía.** Cada cambio requiere `npx vercel --prod` manual.
- _Mejora pendiente_: conectar GitHub para deploy automático por push.

### Datos de contacto en código (hard-coded)
- Email: `info.dentidad@gmail.com` (en `CTA.tsx` y `Footer.tsx`)
- WhatsApp: `5493571549321` (formato wa.me sin `+`)
- Dirección legal: "Río Tercero, Córdoba, Argentina"

### Pendientes técnicos
- [ ] **Generar `og-image.png`** (1200×630) en `public/`. Sin esto, los previews en redes salen rotos.
- [ ] Conectar con GitHub para deploys automáticos.
- [ ] Limpiar el texto "ChatGPT Image 1..." de los nombres de archivo en `galeria.png` (editar la imagen o renombrar los assets en la app y volver a tomar la screen).
- [ ] Borrar PNGs sin usar en `public/screens/`:
  - `dashboard.png`, `odontograma.png`, `agenda.png`, `caja.png` (originales sin recortar)
  - `hero-resumen.png` (descartado del hero)
  - `ficha-completa.png` (usado solo para recortar con `sharp`)
- [ ] Decidir si se conserva o se borra `CropImage.tsx` (legacy, ya no se usa en ninguna feature).

---

# 🤝 Workflow con dos agentes (Claude + Codex)

Este repo lo manejan **dos agentes en paralelo**:

- **Claude (Anthropic)** — vía Claude Code en VS Code (autor de la implementación inicial)
- **Codex (OpenAI)** — vía ChatGPT/Codex

## Reglas de oro

1. **Nadie pushea a `main` directamente.** Rama → push → PR → merge.
2. **Prefijos de rama obligatorios:**
   - `claude/<feature>`
   - `codex/<feature>`
   - `fix/<descripcion>` para bugfixes urgentes (anotar autor en commit message)
3. **Un solo agente a la vez sobre el mismo archivo.**
4. **Antes de empezar:**
   ```powershell
   git checkout main
   git pull
   git checkout -b claude/<feature>
   ```
5. **Al terminar:**
   - Commit + push
   - Actualizar "Estado actual" arriba si hay cambios relevantes
   - PR si está terminada; sino, anotar en "En progreso"

## En progreso ahora

> Anotar tareas a medio hacer para que el otro agente las vea.

- _(nada en progreso)_

## División de trabajo sugerida

| Tipo de tarea | Quién |
|---|---|
| Copy, microcopy, traducciones | **Claude** |
| Recortes nuevos de screenshots con `sharp` | **Claude** (sabe usar el script) |
| Nueva sección en la landing (zigzag) | **Claude** (ya hizo el patrón) |
| Mejoras de SEO / metadata / sitemap | **Claude** |
| Optimización de imágenes (webp/avif), perf | Cualquiera |
| Integración con backend (Klaviyo/Resend para captura de leads) | **Codex** |
| Conectar GitHub a Vercel | Vos (manual, no agente) |

## Convenciones de código

- **Tailwind v3**: usar tokens — `navy`, `mint`, `mint-deep`, `mint-soft`, `ink`, `bg`. **No hex hardcodeados** salvo SVG inline.
- **Imágenes de screens**: van en `public/screens/` con nombre semántico `<seccion>-<contenido>.png`. Ej: `caja-movimientos.png`.
- **Componentes para imágenes**:
  - `<ScreenTile src="/screens/x.png" alt="..." />` para PNGs ya recortados — los renderiza a tamaño natural con next/image. Detecta automáticamente si el archivo existe.
  - `<CropImage>` (legacy) recorta con CSS si el archivo es muy grande y no querés generar uno nuevo. **Preferir ScreenTile.**
- **Server vs client**: por defecto server. Solo `"use client"` en FAQ.tsx y Header.tsx (necesitan estado).
- **Accesibilidad**: tap targets ≥ 44px, focus rings visibles (`focus-visible:ring-mint`), `aria-expanded` en accordion, alt descriptivo en imágenes.

## Workflow específico de la landing

### Agregar un recorte de screenshot nuevo

1. Bautista guarda el PNG en `C:\Users\Pastori\OneDrive\Desktop\Bautista\Imagenes del sisitema para landing\` con cualquier nombre.
2. El agente:
   - Lo lee con `Read` tool para identificarlo.
   - Lo copia a `public/screens/` con nombre semántico.
   - Lo agrega como `<ScreenTile>` en el componente de la feature correspondiente.
3. Si Bautista pide "el screenshot es una pantalla entera, pero solo quiero la parte X":
   - Usar `sharp` (ya está como dep transitiva) para recortar:
   ```javascript
   // Script Node temporal
   const sharp = require('sharp');
   await sharp('public/screens/x.png')
     .extract({ left: 0, top: 180, width: 1120, height: 280 })
     .toFile('public/screens/x-recortado.png');
   ```

### Editar copy de legales

- Editar el `.md` en `content/legal/`. Se renderiza automáticamente en `/terminos` y `/privacidad` la próxima vez.
- No editar HTML — solo el `.md`.

### Cambiar email o WhatsApp

- `components/CTA.tsx` líneas 1-3 (constants `EMAIL` y `WHATSAPP_NUMBER`)
- `components/Footer.tsx` líneas 4-5 (mismas constants)
- Mismo cambio en los 2 archivos.

## Comandos importantes

```powershell
# Dev
npm run dev

# Build (verificar que pasa antes de cualquier push)
npm run build

# Deploy producción (manual mientras no haya GitHub integration)
npx vercel --prod
```

## Reglas suaves

- **Tono Dentidad** en copy: profesional, claro, rioplatense ("vos" / "tu consultorio"), sin marketing forzado. **No prometer**: setup en X minutos, integraciones que no están (ARCA, MercadoPago, portal del paciente), multi-sede, cumplimiento Ley 25.326 como claim sin asesoría legal.
- **Lo que sí se puede claim**: agenda, ficha clínica, odontograma, caja diaria, evoluciones, anamnesis, galería, roles de equipo, obras sociales argentinas precargadas, backup, acceso desde múltiples dispositivos.
- **Pendientes con label "Próximamente"** en la sección Roadmap: ARCA, multi-sede, portal del paciente, consentimientos digitales, reportes/analíticas.

## Brief original

El documento de spec original de la landing (con copy aprobado por Bautista, sección por sección, mapeo de assets) vive en el chat del usuario, no en el repo. Si necesitás referenciarlo, **pedíselo a Bautista** — no improvises copy nuevo si podés evitarlo.

