# Implementation Plan: Demo scroll-driven

**Feature**: demo-scroll · **Rama**: `claude/design-system-motion`
**Spec**: [spec.md](./spec.md) · **Research**: [research.md](./research.md)
**Guía**: [docs/design-system-producto-a-la-vista.md](../../docs/design-system-producto-a-la-vista.md)

## Contexto técnico

| Ítem | Valor |
|---|---|
| Framework | Next.js 15 (App Router, SSG) |
| UI | React 19, Tailwind v3 |
| Motion | framer-motion `^12.40.0` (ya instalado) |
| Dependencias nuevas | **Ninguna** |
| Backend / datos / env vars | **Ninguno** |

## Arquitectura

```
components/motion/
├── Reveal.tsx           # primitiva: entrada única (opacity + y)
└── RevealGroup.tsx      # primitiva: entrada escalonada

components/demo/
├── DemoScroll.tsx       # orquesta: sticky + useScroll + reparto de pasos
├── DemoStep.tsx         # un paso: captura + etiqueta + notificación
├── DemoStatic.tsx       # versión documento (reduced-motion / sin JS)
└── demo-steps.ts        # los 4 pasos como datos (texto, captura, notificación)

components/FadeInSection.tsx   # queda como alias delgado de Reveal

public/screens/demo/           # capturas NUEVAS (consistentes)
├── desktop/{agenda,ficha,odontograma,caja}.png
└── mobile/{agenda,ficha,odontograma,caja}.png

scripts/capturar-demo.mjs      # genera las capturas desde el SaaS en modo demo
```

**Por qué los pasos van en un archivo de datos:** el orden y el copy se van a
tocar cuando lleguen los números del anuncio. Que sea data y no JSX hace que
cambiarlo no sea tocar la animación.

## Fases

### Fase 1 — Assets (bloqueante, va primero)

Sin capturas consistentes no se puede construir la sección.

1. Script `scripts/capturar-demo.mjs`: levanta el SaaS en modo demo, entra con
   el usuario ficticio, navega a cada módulo y captura a viewport fijo.
   - Desktop 1440×900, mobile 500×900.
   - **`.env.production.local` con las 3 variables de auth vacías**, y se borra
     al terminar (gotcha de R-3: `.env.local` pisa el entorno del shell).
2. Recortar cada captura a una proporción única (16:10 desktop, 3:4 mobile).
3. Para el odontograma en mobile: recorte de un cuadrante legible (R-4).
4. **Revisar una por una que no haya datos de pacientes reales** antes de
   commitear. Es información de salud.

**Verificación de fase:** las 8 capturas existen, todas con la misma proporción
por plataforma, y el texto se lee.

### Fase 2 — Primitivas de motion

5. `Reveal.tsx`: `opacity 0→1` + `y 20→0`, `once: true`,
   `cubic-bezier(0.22, 1, 0.36, 1)`, 600ms. Props: `delay`, `y`, `className`.
6. `RevealGroup.tsx`: escalonado de 70ms entre hijos.
7. `FadeInSection.tsx` pasa a ser un alias de `Reveal` (misma firma) para no
   tocar sus llamadores actuales.

**Verificación:** las secciones que hoy usan `FadeInSection` se ven igual.

### Fase 3 — La sección demo

8. `demo-steps.ts`: los 4 pasos como datos (etiqueta, alt, captura desktop/mobile,
   texto de notificación).
9. `DemoScroll.tsx`:
   - Sección `240vh` (desktop) / `160vh` (mobile).
   - `sticky top-0 h-screen` adentro.
   - `useScroll({ target, offset: ["start start", "end end"] })`.
   - Reparto por paso con meseta 20-70% (R-2).
   - `useReducedMotion()` → si es true, devuelve `<DemoStatic />`.
10. `DemoStep.tsx`: captura con `next/image` (proporción reservada, `priority`
    solo en la primera) + etiqueta + notificación con el lenguaje de la app.
11. `DemoStatic.tsx`: los 4 pasos como lista vertical, sin sticky ni transforms.
12. Montar en `app/page.tsx` entre `PromoBanner` y `Features`.

### Fase 4 — Verificación

13. `npm run lint` + `npm run build` en verde.
14. Navegador real (Playwright + Chrome instalado, midiendo con `page.evaluate`):
    - Los 4 pasos aparecen al scrollear y el marco no se mueve.
    - Cada paso tiene su meseta (medir que el progreso se queda quieto).
    - Scroll rápido: pasa de largo, no atrapa.
    - Mobile 500px: sin scroll horizontal, sin aviso de rotar.
    - `prefers-reduced-motion`: los 4 pasos visibles, sin sticky.
    - Sin saltos de diseño al cargar las capturas.
15. Capturas de evidencia desktop + mobile.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| El sticky se siente pesado en un teléfono real | Plan B ya especificado (FR-18): swipe horizontal. La sección es data-driven, cambiar el contenedor no toca los pasos |
| El texto de la UI no se lee en mobile | Se recorta a la región legible (FR-14). Es criterio de aceptación de la Fase 1, no se descubre al final |
| Las capturas pesan y frenan la carga | `next/image`, lazy salvo la primera, proporción reservada |
| Romper secciones que hoy usan `FadeInSection` | Se mantiene como alias con la misma firma; no se tocan los llamadores |
| Filtrar datos de pacientes en una captura | Modo demo (datos ficticios) + revisión manual una por una antes de commitear |

## Fuera de alcance

Hero asimétrico · titular por resultado · motion editorial en el resto de las
secciones · el largo de la página · cualquier cambio en el SaaS.

## Próximo paso

`tasks.md` y a implementar.
