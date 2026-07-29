# Design System — "Producto a la vista"

**Landing comercial de Dentidad** (`dentidad.com`)
**Creado:** 2026-07-29 · **Estado:** dirección aprobada, pendiente de implementar
**Fuente de verdad visual.** Leer antes de tocar cualquier cosa de UI en este repo.

---

## 1. Contexto

**Qué es:** landing comercial estática (Next 15 SSG) del SaaS odontológico Dentidad.
El producto real vive aparte, en `app.dentidad.com`.

**Para quién:** odontólogos argentinos dueños de su consultorio, 30-60 años. No son
early adopters. Vienen de papel, Excel o sistemas de hace 20 años. Escépticos de
software y de que "otro sistema más" les complique el día.

**Objetivo de conversión:** registro self-serve en `app.dentidad.com/registro`
(14 días gratis, sin tarjeta).

**De dónde llega el tráfico:** anuncios pagos de Meta. O sea **frío y mayormente
mobile**. Esto manda sobre cualquier otra consideración: si algo solo luce en
desktop, está mal priorizado.

---

## 2. La tesis

> Todos los competidores venden con la foto de un odontólogo sonriendo.
> Ninguno muestra el software funcionando.
> Dentidad tiene un producto real, terminado y capturable.
> **El scroll es el demo que nadie tiene que apretar play.**

Todo lo que sigue existe para servir esa frase. Si una decisión de diseño no la
sirve, sobra.

---

## 3. Lo que está LOCKEADO (no se toca)

La identidad ya existe y **debe coincidir con la app**. Esto no es un rebrand.

| Token | Valor | Uso |
|---|---|---|
| `navy` | `#063760` | Fondo de héroe, texto sobre claro, superficies oscuras |
| `navy-500` | `#185FA5` | Azul de apoyo, degradés |
| `mint` | `#00C9A7` | Acento sobre oscuro, CTAs |
| `mint-deep` | `#00A085` | Acento sobre claro (fondos, no texto chico) |
| `mint-soft` | `#B7F2E5` | Tintes, hovers |
| `bg` | `#F4F6F8` | Fondo claro |
| `ink` | `#111827` | Texto principal |
| `ink-2` | `#475569` | Texto secundario |

Ya están en `tailwind.config.ts`. **Usar los tokens, nunca hex hardcodeado.**

**Tipografía:** DM Sans (display + body) + DM Mono (eyebrows en mayúscula con
tracking). Cargadas por `next/font`. No agregar fuentes.

**Contraste:** WCAG AA obligatorio. Para texto verde sobre fondo claro usar
`mint-text` (`#00765F`), NO `mint-deep` — no cumple AA en texto chico.

---

## 4. Lo que aprendimos de la competencia (2026-07-29)

Cuatro landings del rubro, capturadas en vivo con Playwright. Las capturas no se
versionan (repo público, y envejecen rápido): lo que vale es la tabla de abajo.

| Competidor | Cómo se presenta | Qué le robamos / evitamos |
|---|---|---|
| **OdontoApp** | Navy + verde, titular blanco pesado, "14 días gratis", WhatsApp flotante | ⚠️ **Casi idéntico a Dentidad hoy.** De acá sale la necesidad de despegarse |
| **AgendaPro** | Foto de consultorio a sangre, avatares de prueba social bajo el fold | La prueba social temprana funciona |
| **DentalTec** | Números duros: "64% menos rechazos", "15+ obras sociales", "+2000 profesionales" | El competidor serio. Gana con proof, no con diseño |
| **Bilog** | Celeste corporativo, carrusel de novedades | El "software de hace 20 años". Contra este ganamos solos |

**Los dos hallazgos que mandan:**

1. **Convergencia:** Dentidad y OdontoApp son gemelas. Un odontólogo no las
   distingue. El hero **centrado** de Dentidad es lo que más la genériza — los
   cuatro competidores usan asimetría.
2. **Hueco abierto:** ninguno muestra el producto funcionando y **ninguno anima
   nada**. Ahí está nuestra ventaja injusta.

---

## 5. Sistema de motion

### Principio rector

**La página acompaña, nunca secuestra.** El visitante siempre controla el scroll.
Ni un solo píxel de scroll-jacking.

### Decisión técnica: `sticky` + framer-motion (NO GSAP)

El portfolio de Bautista usa GSAP + ScrollTrigger con pin real. **Acá no.**

| | GSAP ScrollTrigger `pin` | `position: sticky` + `useScroll` ← **elegido** |
|---|---|---|
| Dependencia | +1 (~50kb) | Ninguna, framer-motion ya está |
| iOS | El pin pelea con el momentum scroll | Nativo del navegador |
| Fallo sin JS | Queda el pin-spacer roto | Documento normal |
| Efecto visual | Idéntico | Idéntico |

`position: sticky` hace el pin en CSS; `useScroll({ target, offset })` da el
progreso 0→1 para atar (scrub) lo que pase adentro. Mismo resultado, sin fricción.

**Regla:** nada de librerías de scroll suavizado (Lenis, Locomotive). En un
público que llega de un anuncio, el scroll tiene que sentirse como su teléfono.

### Escala de motion

| Nivel | Qué es | Dónde |
|---|---|---|
| **Reveal** | opacity 0→1 + y 16-24px, una vez, disparado al entrar | Casi todo. Reemplaza al `FadeInSection` actual |
| **Stagger** | Reveal escalonado, 60-80ms entre hijos | Grillas: dolores, features, planes |
| **Scrub** | Atado al progreso de scroll (parallax, líneas que se dibujan, contadores) | Acentos puntuales |
| **Sticky-scrub** | Sticky + scrub. **Uno solo en toda la página** | El demo (§6) |

**Curvas y tiempos:**
- Entrada: `cubic-bezier(0.22, 1, 0.36, 1)`, 500-700ms
- Micro-interacción (hover, tap): 150-250ms
- Scrub: sin duración, lo maneja el scroll
- Nada dura más de 800ms

**Solo animar `transform` y `opacity`.** Nada de animar `filter`, `box-shadow`,
`width`/`height` ni rotaciones 3D: re-rasterizan y producen tirones. Lección ya
aprendida en el portfolio.

### `prefers-reduced-motion` (obligatorio)

Con reduced-motion la página es **un documento estático completo**: todo visible,
sin transformaciones, sin sticky-scrub (el demo pasa a ser una grilla de las 4
capturas con su etiqueta). Nunca se esconde contenido detrás de una animación
que no va a correr.

---

## 6. El momento pinned — "Un día en tu consultorio"

**El corazón de la landing.** Reemplaza (o precede) a la sección Features actual.

### Cómo funciona

La sección mide ~200-240vh. Adentro, un contenedor `sticky` mantiene el marco del
dispositivo fijo en pantalla mientras el scroll avanza. **La pantalla adentro del
marco cambia**, recorriendo un día real de trabajo:

| Paso | Captura (ya existe) | Etiqueta |
|---|---|---|
| 1 | `public/screens/agenda-turnos.png` | Entra un turno |
| 2 | `public/screens/ficha-paciente.png` | Abrís la ficha |
| 3 | `public/screens/odo-completo.png` | Marcás el odontograma |
| 4 | `public/screens/caja-movimientos.png` | Cobrás y facturás |

Cada paso: la captura entra con crossfade + un desplazamiento mínimo, aparece su
etiqueta corta, y entra **una notificación** con el lenguaje de la app (patrón
`OverlayNotis`, ya probado en el portfolio de Bautista).

### Reglas

- **Meseta obligatoria.** Cada paso descansa quieto ~40% de su tramo. Sin meseta
  el usuario no llega a leer y se marea. Reparto por paso: entrada 0-20% ·
  meseta 20-70% · salida 70-100%.
- **La captura nunca se deforma.** Escala y crossfade, nada de warp ni 3D.
- **Texto de la UI legible o no se muestra.** Si a ese tamaño no se lee, se recorta
  a la región que sí se lee (`object-position`), no se achica todo.
- **Sin scroll-jacking.** Si el usuario tira fuerte, pasa de largo. Está bien.

### Mobile (no es una versión degradada, es su propio diseño)

En mobile el sticky se acorta a ~140vh y se usan las capturas verticales que ya
existen: `screens/mobile/agenda-mobile.png`, `ficha-mobile.png`,
`odontograma-mobile.png`, `caja-mobile.png`.

Si al medir en un teléfono real el sticky se siente pesado, **el plan B es
scroll horizontal por swipe** (4 tarjetas, sin sticky). Decidir con el dispositivo
en la mano, no en el emulador.

---

## 7. Layout

### Hero — pasar de centrado a asimétrico

**Hoy:** `components/Hero.tsx:30` → `max-w-4xl mx-auto text-center`.
Es el patrón más genérico de SaaS y es lo que nos hace gemelas de OdontoApp.

**Nuevo:** grilla de 2 columnas en `lg:` — titular, subtítulo, CTAs y chips de
confianza a la izquierda; el producto vivo a la derecha. En mobile se apila,
alineado a la izquierda (no centrado).

El acompañante de la derecha **no es una foto de stock**: es la app. Una captura
real con una notificación entrando en loop lento. Mostramos software, no gente
sonriendo.

### Espaciado y ritmo

- Base 4px. Escala: 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96
- Separación entre secciones: 96px mobile / 128px desktop
- Ancho máximo de contenido: 1200px. Texto corrido: máx. 65 caracteres
- Radios: `sm 8px` · `DEFAULT 12px` · `lg 16px` · `xl 24px` · `full`

### El largo de la página (deuda registrada)

Hoy: **8535px desktop / 8651px mobile ≈ 10 pantallas.** Es mucho para tráfico
frío que llega de un anuncio. No se ataca en esta ronda, pero queda anotado:
la decisión de compra se toma en la primera pantalla y media. Candidatos a
subir: prueba social y precio.

---

## 8. Copy

**Dirección: hablar por resultado, no por atributo.**
Hoy el titular dice *qué es* ("Tu consultorio, ordenado al detalle").
Debería decir *qué ganás*.

**Recomendado:** `Atendé más. Administrá menos.`
Alternativas: `Se te va media hora por día buscando una ficha.` ·
`Todo el consultorio en un sistema. En serio.`

**Reglas de voz:**
- Español rioplatense, voseo. Como le hablás a un colega, no a un cliente.
- Concreto sobre abstracto: "buscar una ficha" gana a "optimizar procesos".
- Sin jerga de software. El lector no sabe ni quiere saber qué es un CRM.
- Sin superlativos vacíos ("la mejor plataforma", "revolucionario").
- **Nunca inventar prueba social.** DentalTec dice "+2000 profesionales" porque
  los tiene. Si no tenemos el número, no se pone. Un solo consultorio real y
  nombrado vale más que una cifra inflada.

---

## 9. Reglas por componente

- **CTA primario:** fondo `mint`, texto `navy`, radio `full`. Uno solo por
  viewport. Siempre lleva a `/registro`.
- **CTA secundario:** borde, fondo transparente. Nunca compite con el primario.
- **Cards:** fondo blanco, borde `#E5E7EB`, sombra suave. Nada de degradés
  decorativos.
- **Eyebrows:** DM Mono, mayúsculas, `tracking-[0.18em]`, `mint` sobre oscuro /
  `mint-text` sobre claro.
- **WhatsApp flotante:** se queda. Los cuatro competidores lo tienen; en
  Argentina es table stakes.
- **Capturas de producto:** siempre reales, siempre con datos de demo.
  **Nunca datos de pacientes reales** — es información de salud.

### Anti-patrones (prohibidos)

Degradés violeta/púrpura · grilla de 3 columnas con íconos en círculos de color ·
todo centrado · radios burbuja uniformes en todo · botones con degradé ·
fotos de stock de gente sonriendo con una tablet · `system-ui` como fuente de
display · scroll suavizado por librería · animaciones que duren más de 800ms.

---

## 10. Decisiones

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-07-29 | Dirección "Producto a la vista" | Ningún competidor muestra el software funcionando ni anima nada |
| 2026-07-29 | `sticky` + framer-motion en vez de GSAP | El pin de GSAP pelea con iOS y suma dependencia; sticky es nativo. El tráfico es mobile |
| 2026-07-29 | UN solo momento sticky-scrub | La landing vende; varias secciones pinned frustran a un visitante apurado |
| 2026-07-29 | Hero asimétrico | El centrado nos hacía gemelas de OdontoApp |
| 2026-07-29 | Titular por resultado | "Ordenado al detalle" describe; "Atendé más" vende |
| 2026-07-29 | Marca sin cambios | Debe coincidir con la app. No es un rebrand |
| 2026-07-29 | El largo (10 pantallas) queda para otra ronda | Es un problema de estructura y copy, no de motion |
