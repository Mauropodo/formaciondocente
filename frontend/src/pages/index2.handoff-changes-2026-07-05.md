# Registro de cambios handoff `question-story`

Fecha: `2026-07-05`

## Archivo respaldado

- Backup exacto del estado actual:
  - `frontend/src/pages/index2.astro.backup-handoff-gsap-2026-07-05-0115`

## Cambios recientes aplicados sobre `index2.astro`

1. Se eliminó la lógica de handoff manual basada en:
   - clase CSS `story-stack--handoff`
   - variable inline `--bg-freeze-top`
   - cálculo con `getBoundingClientRect()` para fijar el fondo

2. Se agregó una nueva lógica GSAP para el tramo final:
   - se selecciona `storyBg = document.querySelector(".bg")`
   - se crea un `ScrollTrigger` final con:
     - `trigger: voicesSection`
     - `start: "bottom bottom"`
     - `end: "+=100vh"`
     - `scrub: 1`
     - `pin: storyBg`
     - `pinSpacing: false`

3. El overlap de `question-story` quedó controlado por GSAP:
   - custom property `--question-overlap`
   - animada desde `0px` hasta `-window.innerHeight`

4. Se removió del CSS la regla:
   - `.story-stack.story-stack--handoff .bg { ... }`

## Cómo volver a la versión anterior a este experimento

Si se necesita volver al estado exacto previo a estos últimos cambios de handoff GSAP:

1. Copiar el respaldo sobre el archivo actual:
   - origen: `frontend/src/pages/index2.astro.backup-handoff-gsap-2026-07-05-0115`
   - destino: `frontend/src/pages/index2.astro`

2. Eliminar este archivo de registro si ya no hace falta:
   - `frontend/src/pages/index2.handoff-changes-2026-07-05.md`

## Observación actual

- Estado reportado por usuario: "el fondo ahora no se ve".
- Este registro se creó antes de intentar una nueva corrección, para que el estado actual quede documentado y reversible.
