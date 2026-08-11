# Tasks: Demo scroll-driven "Un día en tu consultorio"

**Feature**: demo-scroll · **Spec**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)

## Fase 1 — Assets (bloqueante)

- [x] **T001** `scripts/capturar-demo.mjs` — levanta el SaaS en modo demo, siembra
  datos ficticios y fotografía los cuatro módulos a viewport fijo.
- [x] **T002** Capturas desktop 1440×900 (16:10) y mobile 500×1000 (1:2).
- [x] **T003** Odontograma en mobile resuelto sin pedir rotar el teléfono.
- [x] **T004** Revisadas una por una: ningún dato de paciente real.

## Fase 2 — Primitivas de motion

- [x] **T005** `components/motion/Reveal.tsx` — entrada única, `opacity` + `y`.
- [x] **T006** `components/motion/RevealGroup.tsx` — entrada escalonada (70 ms).
- [x] **T007** `FadeInSection.tsx` pasa a ser alias de `Reveal`, misma firma, sin
  tocar a sus llamadores.

## Fase 3 — La sección

- [x] **T008** `demo-steps.ts` — los 4 pasos como datos.
- [x] **T009** `DemoScroll.tsx` — sticky + `useScroll`, marcos desktop y mobile.
- [x] **T010** `DemoStep.tsx` — capa por paso con su etiqueta y su notificación.
- [x] **T011** `DemoStatic.tsx` — versión documento para movimiento reducido.
- [x] **T012** Montada en `app/page.tsx`, entre `PromoBanner` y `Features`.

## Fase 4 — Verificación

- [x] **T013** `npm run build` y `npx tsc --noEmit` en verde.
- [x] **T014** Navegador real midiendo el DOM.
- [ ] **T015** Cierre: `AGENTS.md`, commit, PR.

## Lo que costó la Fase 1 (y por qué el script quedó como quedó)

Las cuatro capturas mobile de la primera corrida **no servían**: dos eran
recortes del layout de escritorio con el texto cortado en los dos bordes. La
causa no era el recorte sino el script: cambiaba el viewport sobre la página ya
montada y no volvía el scroll a cero, así que la app seguía en su layout de
escritorio y el screenshot agarraba la página corrida a la derecha. Se arregló
recargando al pasar a mobile y poniendo en cero el scroll de la ventana **y** el
de los contenedores con `overflow-x`.

De paso salieron cuatro trampas más, todas anotadas en el script:

1. **La agenda mobile salía vacía.** No tiene selector de día, y los turnos del
   demo están en marzo. Ahora se copian los turnos del demo a la fecha de hoy
   escribiendo el snapshot de `localStorage`. Cargarlos por el formulario se
   probó y se descartó: el modal pide elegir paciente en un buscador propio y su
   contenedor nunca queda quieto para Playwright (`fill` muere por timeout).
2. **`modalDe` agarraba un overlay oculto** de un paso anterior: sus campos no
   son editables y todo fallaba en silencio. Ahora es `:visible`.
3. **La X de los modales no tiene texto**, se cierra por `aria-label`. Sin eso el
   modal de editar turno quedaba abierto y bloqueaba la corrida entera.
4. **En mobile la pestaña es "Paciente", en singular.** Buscar "Pacientes" no
   encontraba nada y el click de fila caía sobre un turno, abriendo una hoja que
   tapa el bottom nav.

## Resultado de la verificación (2026-08-11)

`npm run build` y `npx tsc --noEmit` en verde. **`npm run lint` no se pudo
correr: este repo no tiene ESLint configurado** y el comando abre un asistente
interactivo. Configurarlo es una decisión aparte, no de esta feature.

En Chrome real (`scripts/_verificar-demo.mjs`, midiendo con `page.evaluate`), 21
checks en verde:

| Check | Resultado |
|---|---|
| Marco quieto (FR-7) | misma posición exacta en 0.05/0.30/0.60/0.95 del recorrido |
| Los 4 pasos en orden (FR-6) | dominante = 0,1,2,3,3 |
| Meseta (FR-10) | opacidades idénticas en 0.30/0.35/0.40 |
| Sin marco en blanco | el paso 4 sigue visible al final |
| Anclas del header (FR-15) | `#faq` llega a la sección |
| Mobile | sin scroll horizontal; sin aviso de rotar (FR-17) |
| Movimiento reducido (FR-19) | los 4 pasos como documento, sin sticky |
| Sin JavaScript (FR-20) | los 4 pasos están en el HTML servido |
| Consola | sin errores propios |

Dos bugs reales que encontró la medición y que **a ojo no se veían**:

- **El paso 1 reaparecía.** Con el mapa de arreglos de `useTransform`, su
  opacidad bajaba a 0 y después subía linealmente hasta 1 al final del
  recorrido: un fantasma encima del último paso. El `y` del mismo arreglo sí
  clampaba bien. Se reemplazó por una función explícita.
- **Parpadeo entre pasos.** La salida de uno terminaba justo donde empezaba la
  entrada del siguiente, así que había un instante con las cuatro capas en cero.
  Ahora la entrada arranca un 30% antes y se cruzan.

## Pendiente de producto

**El odontograma no tiene vista mobile.** A 500px la app reemplaza las arcadas
por una tarjeta "Mejor en horizontal", y publicarla sería anunciar que no anda
en el teléfono. El paso mobile muestra un recorte legible de siete piezas por
arcada, tomado de la vista de escritorio, y lo aclara en pantalla. Si se quiere
mostrar el odontograma como pantalla de teléfono, hay que hacerle una vista
mobile en el SaaS — es trabajo del otro repo.
