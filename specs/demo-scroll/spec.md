# Feature Specification: Demo scroll-driven "Un día en tu consultorio"

**Feature**: demo-scroll
**Status**: Especificada
**Created**: 2026-07-29
**Rama**: `claude/design-system-motion`
**Guía de diseño**: [docs/design-system-producto-a-la-vista.md](../../docs/design-system-producto-a-la-vista.md)

## Resumen

Convertir el scroll de la landing en el demo del producto. Una sección donde el
marco del dispositivo queda quieto en pantalla y la pantalla de adentro recorre
un día real de trabajo — entra un turno, se abre la ficha, se marca el
odontograma, se cobra — al ritmo del visitante.

Más las primitivas de motion que reemplazan al único componente de animación que
existe hoy (`FadeInSection`), y que van a reusar las features siguientes.

## Por qué

Los cuatro competidores del rubro (OdontoApp, AgendaPro, DentalTec, Bilog)
venden con la foto de un odontólogo sonriendo. **Ninguno muestra el software
funcionando y ninguno anima nada.** Dentidad tiene un producto real y
capturable: mostrarlo trabajando es la diferencia que nadie más puede copiar
rápido.

## Alcance

### Entra

- Primitivas de motion reusables (reveal, stagger) que reemplazan a `FadeInSection`.
- La sección demo con su comportamiento sticky, en desktop y en mobile.
- **Generación de las capturas de producto** que la sección necesita (ver
  "Problema de assets" abajo) — sin esto la feature no se puede construir.

### No entra (features aparte)

- Hero asimétrico y titular por resultado.
- Pase de motion editorial al resto de las secciones.
- El largo de la página (10 pantallas).
- Cualquier cambio en la app SaaS. Este repo es solo la landing.

## Problema de assets (bloqueante, descubierto al medir)

Las capturas que hay en `public/screens/` **no sirven para esta sección**. Son
recortes hechos para el zigzag de Features, no pantallas completas:

| Captura | Medidas | Proporción |
|---|---|---|
| `agenda-referencias.png` | 1046×114 | 9.18 |
| `ficha-paciente.png` | 1120×170 | 6.59 |
| `caja-movimientos.png` | 1093×501 | 2.18 |
| `agenda-turnos.png` | 1062×709 | 1.50 |

Un marco fijo que haga crossfade entre una banda de 9.18 y algo de 1.50 **salta
visualmente**. Se ve roto.

Además, en mobile `odontograma-mobile.png` es **apaisada** (1500×736) mientras
las otras tres son verticales (736×1500) — porque el odontograma pide girar el
teléfono.

**Resolución:** generar capturas nuevas, completas y de proporción consistente,
levantando el SaaS **en modo demo** (sin base real) y fotografiando cada módulo
a un viewport fijo.

- **Requisito no negociable:** las capturas se toman con **datos de demostración**.
  Nunca datos de pacientes reales — es información de salud.
- Se guardan aparte de las actuales para no romper Features (que las usa como están).

## Requerimientos funcionales

### Primitivas de motion

- **FR-1**: Existe una primitiva de entrada que revela un elemento cuando entra
  en pantalla: aparece y sube unos píxeles, una sola vez, con una curva suave.
- **FR-2**: Existe una variante que revela a los hijos de forma escalonada, con
  un retardo corto entre uno y otro.
- **FR-3**: Las animaciones MUST limitarse a desplazamiento y opacidad. Prohibido
  animar desenfoques, sombras, medidas o rotaciones en 3D: re-rasterizan y
  producen tirones.
- **FR-4**: Ninguna animación de entrada dura más de 800ms.
- **FR-5**: Las primitivas reemplazan a `FadeInSection` sin regresiones visibles
  donde ya se usa.

### La sección demo

- **FR-6**: La sección recorre **cuatro pasos** en orden: entra un turno → se
  abre la ficha → se marca el odontograma → se cobra y factura.
- **FR-7**: Mientras se recorre, el marco del dispositivo MUST permanecer quieto
  y centrado en pantalla; lo que cambia es su contenido.
- **FR-8**: El avance MUST estar atado al scroll del visitante. Nada de
  reproducción automática ni de temporizadores.
- **FR-9**: El visitante MUST conservar el control del scroll en todo momento. Si
  scrollea fuerte, pasa de largo la sección: es correcto.
- **FR-10**: Cada paso MUST tener una **meseta**: un tramo donde queda quieto el
  tiempo suficiente para leerlo. Reparto por paso: entrada 0-20%, meseta 20-70%,
  salida 70-100%.
- **FR-11**: Cada paso muestra una etiqueta corta que nombra lo que está pasando.
- **FR-12**: Cada paso muestra una notificación con el lenguaje real de la app
  (ej. avisos de turno, de cobro), que entra y se va con el paso.
- **FR-13**: Las capturas MUST NOT deformarse. Se permite escalar y fundir; no se
  permite estirar, torcer ni rotar en 3D.
- **FR-14**: Si el texto de la interfaz no resulta legible al tamaño mostrado,
  MUST recortarse a la región legible en vez de achicar la captura entera.
- **FR-15**: La sección MUST NOT romper la navegación por anclas del header.

### Mobile

- **FR-16**: En mobile la sección tiene su propio diseño, con capturas verticales
  y un recorrido más corto. No es la versión de desktop reducida.
- **FR-17**: El paso del odontograma MUST resolverse sin pedirle al visitante que
  gire el teléfono ni mostrar el aviso de rotación de la app.
- **FR-18**: Si al probarlo en un teléfono real el comportamiento sticky se
  siente pesado, MUST poder cambiarse a un recorrido horizontal por deslizamiento
  sin rehacer la sección.

### Accesibilidad y degradación

- **FR-19**: Con movimiento reducido activado, la página MUST quedar como un
  documento estático completo: los cuatro pasos visibles con su etiqueta, sin
  transformaciones ni comportamiento sticky.
- **FR-20**: Todo el contenido de la sección MUST estar en el HTML servido. No se
  esconde contenido detrás de una animación.
- **FR-21**: Las capturas MUST tener texto alternativo descriptivo.
- **FR-22**: Contraste WCAG AA en etiquetas y notificaciones.

### Marca

- **FR-23**: Colores por tokens de `tailwind.config.ts` (`navy`, `mint`, `ink`,
  `bg`). Prohibido hex hardcodeado.
- **FR-24**: Sin dependencias nuevas.

## Escenarios de aceptación

1. **Odontólogo en desktop** baja por la landing → la sección se fija, ve los
   cuatro pasos encadenados, entiende de qué se trata el sistema sin hacer clic.
2. **Odontólogo en mobile desde un anuncio** → el recorrido se siente natural con
   el pulgar, nunca siente que la página se le traba.
3. **Visitante apurado** scrollea fuerte → pasa de largo sin quedar atrapado.
4. **Visitante con movimiento reducido** → ve los cuatro pasos como una lista
   estática, con toda la información.
5. **Visitante sin JavaScript** → la sección se lee como documento; el contenido
   está.
6. **Lector de pantalla** → recorre los pasos con su etiqueta y descripción, sin
   contenido inaccesible.
7. **Scroll hacia arriba** → el recorrido se deshace igual de fluido.

## Casos borde

- Ventana muy baja (portátil chico): el marco no debe cortarse ni tapar la
  etiqueta.
- Cambio de orientación en mobile a mitad de recorrido: no debe quedar en un
  estado intermedio raro.
- Conexión lenta: las capturas no deben aparecer de golpe a destiempo ni mover el
  layout (sin saltos de diseño).
- Zoom del navegador al 200%: la sección sigue siendo usable.
- Llegada directa por ancla a una sección posterior: no debe romperse.

## Success Criteria

- **SC-1**: Un odontólogo que nunca vio Dentidad entiende, sin hacer clic, que el
  sistema cubre agenda, ficha, odontograma y cobros.
- **SC-2**: El texto de la interfaz en las capturas es legible en un teléfono a
  distancia normal de lectura.
- **SC-3**: Nadie percibe que la página le "secuestra" el scroll: si empuja
  fuerte, avanza.
- **SC-4**: Con movimiento reducido no se pierde ni una sola pieza de
  información.
- **SC-5**: La sección no empeora la velocidad de carga percibida ni produce
  saltos de diseño.
- **SC-6**: Ninguna captura contiene datos de pacientes reales.
- **SC-7**: `npm run build` y `npm run lint` en verde, sin dependencias nuevas.
- **SC-8**: Verificado en navegador real, midiendo el DOM — no a ojo.

## Supuestos

- El visitante llega de un anuncio, es la primera vez que ve el producto, y está
  en un teléfono.
- Cuatro pasos es la cantidad correcta: alcanza para mostrar alcance y es poco
  para no cansar.
- Las capturas nuevas se generan desde el SaaS en modo demo, disponible en
  `Bautista/OdontoApp/odonto-next` de esta misma máquina.
- La sección convive con Features (no la reemplaza en esta feature); si después
  se decide que Features sobra, va en otra ronda.

## Dependencias

- Capturas nuevas y consistentes (bloqueante, ver arriba).
- Ninguna dependencia npm nueva. Sin backend, sin datos, sin variables de entorno.
