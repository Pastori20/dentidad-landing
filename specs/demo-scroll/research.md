# Research: Demo scroll-driven

**Feature**: demo-scroll · **Fecha**: 2026-07-29

Todo lo de acá se verificó midiendo el repo o leyendo la doc, no de memoria.

## R-1 — Cómo se hace el "pin" sin secuestrar el scroll

**Decisión:** `position: sticky` de CSS para fijar, `useScroll` de framer-motion
para el progreso.

La sección exterior mide `240vh`. Adentro, un contenedor `sticky top-0 h-screen`
se queda pegado mientras el padre pasa. `useScroll({ target, offset: ["start start", "end end"] })`
devuelve un valor 0→1 del recorrido, y con `useTransform` se derivan opacidad y
desplazamiento de cada paso.

**Por qué así y no GSAP ScrollTrigger `pin`:**
- `pin` reemplaza el elemento por un spacer y lo posiciona por JS en cada frame.
  En iOS, durante el momentum scroll el navegador no dispara eventos a la misma
  cadencia → el elemento "patina" respecto del dedo.
- `sticky` lo resuelve el compositor del navegador. No hay JS en el camino del
  scroll, así que no puede desincronizarse.
- GSAP son ~50kb más. framer-motion ya está (`^12.40.0`).

**Alternativas descartadas:**
- Scroll suavizado (Lenis/Locomotive) → **rechazado**: reemplaza el scroll nativo.
  En un público que llega de un anuncio en su teléfono, el scroll tiene que
  sentirse como su teléfono.
- IntersectionObserver por pasos → sirve para revelar, no para atar al progreso.
  Sin progreso continuo no hay meseta controlable.

## R-2 — El reparto de cada paso (la meseta)

**Decisión:** 4 pasos, cada uno ocupa 25% del recorrido. Dentro de su tramo:
entrada 0-20%, **meseta 20-70%**, salida 70-100%.

La meseta es lo que separa esto de un carrusel mareado. Sin ella, el contenido
se mueve todo el tiempo y no da tiempo a leer la etiqueta. Es la misma lección
que ya se aprendió en el portfolio (`meseta 50-80%` por escena).

Con 240vh de sección y ~100vh de viewport, el recorrido útil es ~140vh → cada
paso son ~35vh de scroll, de los cuales ~17vh quieto. A velocidad normal de
lectura eso alcanza para leer una etiqueta corta.

## R-3 — El problema de los assets (bloqueante)

**Medido, no supuesto.** Proporciones en `public/screens/`:

| Archivo | Medidas | Proporción |
|---|---|---|
| `agenda-referencias.png` | 1046×114 | 9.18 |
| `ficha-paciente.png` | 1120×170 | 6.59 |
| `caja-movimientos.png` | 1093×501 | 2.18 |
| `agenda-turnos.png` | 1062×709 | 1.50 |

Son **recortes** para el zigzag de Features, no pantallas. Un marco fijo que
funda entre 9.18 y 1.50 salta.

**Decisión:** generar capturas nuevas desde el SaaS en **modo demo**, todas al
mismo viewport.

- El SaaS está en `C:\Users\Pastori\OneDrive\Desktop\Bautista\OdontoApp\odonto-next`.
- Modo demo = build con `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` y `DATABASE_URL`
  vacías → `getAuthMode()` devuelve `"demo"` y la app usa usuarios ficticios.
  Verificado en esta misma máquina.
- **Gotcha ya conocido:** Next lee `.env.local` y pisa las variables de entorno
  del shell. Hay que usar `.env.production.local` (que tiene prioridad mayor) y
  **borrarlo al terminar**. Está en `.gitignore` (`.env*`).
- Viewport de captura: 1440×900 desktop, 500×900 mobile (por debajo de 500px el
  headless de Windows recorta).
- **Datos de demostración únicamente.** Nunca pacientes reales.

**Alternativa descartada:** adaptar el marco a proporciones variables
(top-align + recorte). Funciona pero se ve peor y arrastra el problema para
siempre. Las capturas consistentes sirven además para el hero asimétrico que
viene después.

## R-4 — El odontograma en mobile (FR-17)

**Hallazgo:** `mobile/odontograma-mobile.png` es apaisada (1500×736) porque el
odontograma real muestra un aviso de "girá el dispositivo" en pantallas chicas.

Trasladarle esa fricción al visitante de un anuncio sería malo: el paso diría
"para ver esto, girá el teléfono".

**Decisión:** en mobile, el paso 3 muestra un **recorte legible del odontograma**
(un cuadrante con dientes marcados), no la arcada completa. Se lee, se entiende
qué es, y no pide nada.

**Alternativa si al verlo no convence:** reemplazar el paso 3 en mobile por
"Historia clínica" (que sí tiene vista vertical natural) y dejar el odontograma
solo en desktop. Queda anotado; se decide viendo el resultado.

## R-5 — Reemplazar `FadeInSection`

**Hallazgo:** `components/FadeInSection.tsx` ya hace lo correcto en lo esencial
— `whileInView`, `viewport={{ once: true }}`, y respeta `useReducedMotion`
devolviendo un `div` pelado.

**Decisión:** no se tira, se **generaliza**. Se agrega `Reveal` (con dirección y
retardo) y `RevealGroup` (escalonado), y `FadeInSection` queda como un alias
delgado para no tocar los llamadores existentes en esta feature.

Menos superficie de cambio = menos riesgo de romper secciones que hoy andan.

## R-6 — Sin saltos de diseño (SC-5)

Las capturas son grandes (hasta 373KB). En el marco sticky se muestran varias.

**Decisión:** `next/image` con `sizes` explícito y `priority` **solo** en la
primera; las otras tres en lazy. El contenedor reserva la proporción con
`aspect-ratio` para que no haya salto cuando cargan.

Como las cuatro van a tener la **misma proporción** (R-3), un solo
`aspect-ratio` sirve para todas.

## R-7 — Movimiento reducido (FR-19)

**Decisión:** con `prefers-reduced-motion`, la sección se renderiza como una
**lista vertical de los 4 pasos**, cada uno con su captura, etiqueta y texto.
Sin `sticky`, sin altura de 240vh, sin transformaciones.

No es una degradación pobre: es la misma información en formato documento. El
patrón ya está probado en el portfolio (modo no-JS como documento estático).
