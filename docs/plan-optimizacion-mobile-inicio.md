# Plan de Optimizacion Mobile para `inicio.astro`

## Objetivo
Mejorar la fluidez de las animaciones en celular en [frontend/src/pages/inicio.astro](C:/Users/mwill/Documents/CODEX/Sitio%20Parbularias/frontend/src/pages/inicio.astro), reduciendo micro saltos y carga de render sin desarmar la narrativa visual del sitio.

## Diagnostico resumido
Las causas mas probables del comportamiento poco fluido en mobile son:

- Exceso de trabajo en `scroll`: listeners manuales + `ScrollTrigger` activos al mismo tiempo.
- Multiples capas `fixed`, `sticky` y `pin` en una sola pagina.
- SVG grandes con `filter: drop-shadow(...)` y fondos clonados.
- Handoffs visuales pesados entre secciones.
- Muchas animaciones concurrentes en el mismo tramo.

## Opciones elegibles

### Opcion A. Limpiar listeners manuales de scroll
Que incluye:

- Revisar `updateHeroFade()`, `updateConnectMotion()` y `updateQuestionStoryHandoff()`.
- Eliminar en mobile los listeners manuales que hoy solo mantienen estado visual.
- Dejar que `ScrollTrigger` controle mas entradas/salidas por si solo.

Impacto esperado:

- Alto en fluidez general.
- Menos trabajo por frame durante scroll.

Riesgo:

- Bajo a medio.
- Puede requerir recalibrar timings de aparicion.

Combinable con:

- B, C, D, E

### Opcion B. Version mobile mas liviana de efectos visuales
Que incluye:

- Reducir o quitar `drop-shadow` en SVG grandes solo en mobile.
- Simplificar sombras de bubbles y paneles.
- Revisar si el `bgFreezeLayer` puede apagarse en mobile.

Impacto esperado:

- Alto en equipos medianos o lentos.
- Mejora estabilidad visual y reduce tirones.

Riesgo:

- Bajo.
- Cambia un poco el acabado visual, no la estructura.

Combinable con:

- A, C, D, E

### Opcion C. Simplificar handoffs entre secciones en mobile
Que incluye:

- Hacer mas liviano el paso `voices -> question-story`.
- Reducir overlay, opacidad y transform simultaneos.
- Mantener el efecto narrativo, pero con menos capas activas.

Impacto esperado:

- Medio a alto.
- Ataca una zona donde suelen sentirse saltos.

Riesgo:

- Medio.
- Puede alterar la sensacion de continuidad si no se recalibra bien.

Combinable con:

- A, B, D

### Opcion D. Reducir cantidad de animaciones concurrentes en mobile
Que incluye:

- Hacer que cada tramo tenga una sola idea principal de animacion.
- Evitar que bubbles, handoff, fondo y texto importante entren todos a la vez.
- Retrasar o simplificar animaciones secundarias.

Impacto esperado:

- Medio.
- Mejora legibilidad y sensacion de control.

Riesgo:

- Bajo.
- Cambia mas el ritmo que la estructura.

Combinable con:

- A, B, C, E

### Opcion E. Ajustar tecnica de triggers mobile
Que incluye:

- Revisar triggers por bubble para evitar recalculos innecesarios.
- Usar `ScrollTrigger.batch()` donde convenga.
- Revisar `invalidateOnRefresh` y puntos de `start` en mobile.

Impacto esperado:

- Medio.
- Mejora consistencia y reduce activaciones raras.

Riesgo:

- Medio.
- Requiere probar bien el comportamiento al subir y bajar scroll.

Combinable con:

- A, B, D

## Packs recomendados

### Pack 1. Conservador
Incluye:

- A + B

Ventaja:

- Mejor relacion impacto/riesgo.
- Mantiene casi intacto el diseño actual.

Ideal si:

- Quieres mejorar fluidez sin rehacer narrativa.

### Pack 2. Balanceado
Incluye:

- A + B + D

Ventaja:

- Baja bastante la carga y ordena mejor el ritmo mobile.

Ideal si:

- Quieres una mejora visible y segura.

### Pack 3. Profundo
Incluye:

- A + B + C + D + E

Ventaja:

- Es la optimizacion mas completa.

Costo:

- Requiere mas iteracion visual y pruebas.

Ideal si:

- Quieres dejar `inicio` realmente afinado para celular.

## Recomendacion
Mi recomendacion es partir por `Pack 2: A + B + D`.

Por que:

- Ataca las causas mas probables del lag.
- Evita intervenir de inmediato en las partes mas delicadas del storytelling.
- Nos deja una base mas limpia antes de tocar handoffs complejos.

## Orden sugerido de implementacion
1. Limpiar listeners manuales redundantes en mobile.
2. Quitar o reducir filtros pesados y sombras en mobile.
3. Simplificar animaciones secundarias concurrentes.
4. Probar en telefono real.
5. Solo si aun hay saltos, intervenir handoff y triggers avanzados.

## Archivo afectado principal

- [frontend/src/pages/inicio.astro](C:/Users/mwill/Documents/CODEX/Sitio%20Parbularias/frontend/src/pages/inicio.astro)

