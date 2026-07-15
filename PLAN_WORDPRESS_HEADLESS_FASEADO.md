# Plan de Implementacion WordPress Headless por Fases

## Contexto

Este documento consolida:

- El requerimiento base recibido en el archivo adjunto `pasted-text.txt`.
- Las decisiones tomadas en este chat antes de comenzar cualquier implementacion.
- El flujo de trabajo acordado para avanzar por fases, con pausas de validacion.
- Los criterios para mantener cada cambio reversible.

Fecha de consolidacion: 2026-07-14

## Objetivo General

Integrar la seccion `/publicaciones` con WordPress Headless en `https://cms.identidadprofesional.cl`, reemplazando por completo los datos mock actuales por contenido dinamico obtenido desde el REST API de WordPress.

Esta etapa no incluye el detalle del post en `/publicaciones/[slug]`.

El objetivo es dejar unicamente el listado de publicaciones, con la arquitectura preparada para una futura Fase 2 de detalle sin rehacer la base.

## Arquitectura Objetivo

```text
Internet
  |
  v
identidadprofesional.cl
  |
  v
Netlify (Astro)
  |
  |-- Landing (Static)
  |-- Institucional (Static)
  |-- Servicios (Static)
  |-- Contacto (Static)
  `-- Publicaciones (SSR on-demand)
         |
         v
https://cms.identidadprofesional.cl
WordPress Headless / REST API
```

## Restriccion Principal de Renderizado

- Mantener todas las paginas actuales en modo `Static`.
- Solo la seccion `/publicaciones` debera usar renderizado dinamico `SSR on-demand`.
- No convertir el proyecto completo a SSR.

## Estado Actual Detectado en el Proyecto

Ubicacion revisada: `C:\Users\mwill\Documents\CODEX\Sitio Parbularias\frontend`

Hallazgos:

- El proyecto ya usa `@astrojs/netlify`.
- El archivo `frontend/astro.config.mjs` sigue con `output: 'static'`.
- La pagina de publicaciones actual esta en `frontend/src/pages/publicaciones/index.astro`.
- El detalle actual esta en `frontend/src/pages/publicaciones/[slug].astro`.
- Los datos mock actuales viven en:
  - `frontend/src/lib/posts.js`
  - `frontend/src/lib/categorias.js`
- Los componentes clave actuales son:
  - `frontend/src/components/BlogCard.astro`
  - `frontend/src/components/CategoriaFilter.astro`
- Hoy `/publicaciones` usa mocks directos y mantiene filtros y paginacion en la propia pagina.

## Reglas de Trabajo Acordadas en Este Chat

- Trabajar por fases.
- No avanzar automaticamente a la siguiente fase.
- Al terminar cada fase:
  - detenerse
  - explicar los cambios realizados
  - esperar aprobacion antes de continuar
- Consultar cada decision importante antes de ejecutarla.
- Antes de instalar cualquier dependencia:
  - mostrar la lista
  - esperar aprobacion
- Antes de modificar `astro.config.mjs`, cambiar renderizado, instalar paquetes o tocar componentes compartidos, pedir autorizacion explicita.

## Criterio de Reversibilidad Acordado

Peticion del usuario:

> "si, siempre para todo el plan deja una forma de poder deshacer algun cambio."

Interpretacion operativa:

- Cada fase debe dejar una salida reversible.
- Evitar eliminar de inmediato codigo previo mientras siga siendo util como respaldo.
- Preferir migraciones graduales sobre reemplazos destructivos.
- Mantener cambios acotados por fase para facilitar rollback manual.
- Explicar al cierre de cada fase que se cambio y que sigue intacto.
- Si en una fase hay reemplazo de comportamiento, procurar que la estructura anterior permanezca disponible hasta confirmar estabilidad.

## Decisiones Tomadas en Este Chat

### Decision 1: Mantener respaldo temporal de mocks

Consulta realizada:

- Si en la Fase 1 se podian mantener `src/lib/posts.js` y `src/lib/categorias.js` como respaldo temporal mientras se migra a `services`.

Decision del usuario:

- Si.

Decision operativa:

- En la Fase 1 no se eliminaran inmediatamente los mocks actuales.
- Primero se construira la nueva arquitectura y luego se migrara el consumo.
- La eliminacion de codigo viejo se evaluara solo cuando la migracion ya este estable y aprobada.

### Decision 2: Duda sobre TypeScript en la nueva capa

Consulta realizada:

- Si la nueva capa de arquitectura (`services`, `types`, `config`) debia implementarse en TypeScript.

Respuesta entregada al usuario:

- TypeScript en la nueva capa ayuda a:
  - desacoplar mejor el contrato de datos entre Astro y WordPress
  - detectar cambios del API
  - hacer mas segura la migracion por fases
  - preparar mejor cliente HTTP, normalizacion y manejo de errores
- Contras:
  - agrega trabajo inicial
  - conviviria con una base que hoy mezcla `.js` y `.astro`
  - puede haber algo de friccion menor en imports y consistencia

Recomendacion entregada:

- Usar TypeScript solo en la nueva capa de datos, no migrar todo el proyecto.

Estado actual:

- Aun pendiente de confirmacion final del usuario como decision formal.

### Decision 3: No tocar aun SSR global ni `astro.config.mjs`

Consulta realizada:

- Si en la Fase 1 podiamos evitar tocar `astro.config.mjs` y dejar la activacion SSR para una fase posterior.

Decision del usuario:

- Si me parece bien.

Decision operativa:

- La Fase 1 no modificara `astro.config.mjs`.
- El cambio de renderizado se tratara recien en la fase correspondiente y con aprobacion previa.

### Decision 4: Impacto potencial sobre GSAP

Consulta del usuario:

- "y eos afecta gsap ?"

Respuesta entregada:

- No, en principio no afecta GSAP si TypeScript se limita a `services`, `types` y `config`.
- GSAP esta hoy en la capa visual y utilitaria, no en la capa de datos.
- Solo podria haber impacto indirecto si se cambia markup, IDs, clases o estructura DOM usada por animaciones.
- El plan exige no romper GSAP ni animaciones existentes.

Decision operativa:

- Tratar GSAP como area protegida.
- No modificar animaciones existentes salvo necesidad estricta y aprobada.

### Decision 5: Crear documento detallado antes de ejecutar cualquier fase

Solicitud del usuario:

- "ok, antes de ejecutar cualquie fase, crea un Archivo MD detallado con cada paso de cada fase incluyendo Todo lo de este chat, y las decicones tomadas en conjunto"

Decision operativa:

- Este documento se crea antes de iniciar cualquier implementacion.
- Sera la referencia de trabajo para validar cada fase antes de ejecutarla.

## Confirmaciones Obligatorias Antes de Continuar

Segun el requerimiento original, Codex no debe asumir configuraciones. Antes de avanzar en las fases correspondientes, se debe confirmar:

### Configuracion

- URL definitiva de WordPress para `PUBLIC_WORDPRESS_URL`
- Confirmacion de que el REST API responde correctamente
- Confirmacion de que Astro ya puede operar con el adaptador SSR de Netlify en el contexto requerido

### WordPress

- Cantidad de publicaciones por pagina
- Confirmacion de si todas las publicaciones tendran imagen destacada
- Confirmacion de si el autor sera publico
- Formato de fecha deseado, aunque en esta etapa no se muestre aun

### Astro

Se debe pedir autorizacion antes de:

- modificar `astro.config.mjs`
- instalar dependencias
- cambiar el modo de renderizado
- modificar componentes compartidos

## Fases del Trabajo

## Fase 1 - Reestructuracion del Proyecto

### Objetivo

Preparar una arquitectura limpia, desacoplada y escalable antes de integrar WordPress real.

### Estructura objetivo

```text
src/
  components/
  pages/
  services/
    wordpress/
      client.ts o client.js
      posts.ts o posts.js
      categories.ts o categories.js
  types/
    post.ts
    category.ts
  utils/
  config/
  middleware/
```

### Regla central

- Toda comunicacion con WordPress debe pasar por `services/wordpress`.
- No usar `fetch()` directo desde componentes o paginas.

### Pasos detallados propuestos

1. Confirmar si la nueva capa se implementara en TypeScript o JavaScript.
2. Crear carpetas base:
   - `src/services/wordpress/`
   - `src/types/`
   - `src/config/`
   - `src/middleware/`
3. Definir contratos base para `Post` y `Category`.
4. Crear servicios iniciales desacoplados aunque aun lean datos mock temporalmente.
5. Redirigir la pagina `/publicaciones` para consumir la capa nueva en vez de `src/lib/*`.
6. Mantener intacta la experiencia visual actual en esta fase.
7. Dejar `src/lib/posts.js` y `src/lib/categorias.js` como respaldo temporal reversible.
8. Documentar al cierre:
   - que se movio
   - que sigue igual
   - que archivos viejos quedan como respaldo

### Riesgos a vigilar

- Romper imports existentes del home u otras paginas que usan `getLatestPosts`.
- Cambiar el contrato esperado por `BlogCard.astro`.
- Introducir mezcla inconsistente entre `.js`, `.ts` y `.astro`.

### Criterio de exito

- `/publicaciones` sigue viendose igual.
- La fuente ya no se consume directamente desde `src/lib/*` en la pagina objetivo.
- La nueva arquitectura queda lista para la integracion real.

## Fase 2 - Cliente WordPress

### Objetivo

Crear un cliente HTTP reutilizable y centralizado.

### Arquitectura deseada

```text
WordpressClient
  |
  v
PostsService
  |
  v
CategoriesService
  |
  v
UI
```

### Requisitos

- Permitir agregar facilmente:
  - timeout
  - retry
  - cache
  - logging
  - autenticacion
- No dejar URLs hardcodeadas.

### Variables de entorno

Crear:

- `PUBLIC_WORDPRESS_URL`

Ejemplo esperado:

- `https://cms.identidadprofesional.cl/wp-json`

Actualizar tambien:

- `frontend/.env.example`

### Pasos detallados propuestos

1. Solicitar confirmacion de la URL definitiva de WordPress.
2. Solicitar confirmacion de que el REST API responde.
3. Crear capa de configuracion para variables de entorno.
4. Implementar el cliente HTTP base.
5. Definir opciones extensibles para timeout, retry y futuros headers.
6. Ajustar `posts` y `categories` service para usar el cliente central.
7. Mantener aun el cambio acotado sin romper visualmente la pagina.

### Riesgos a vigilar

- Variables de entorno mal nombradas.
- Diferencias entre entorno local y Netlify.
- Dejar acoplamientos directos a la URL en archivos sueltos.

### Criterio de exito

- Existe un cliente central reutilizable.
- La URL vive en entorno y no en el codigo.
- La capa ya esta lista para consumir WordPress real.

## Fase 3 - Modelo de Datos

### Objetivo

Desacoplar totalmente la UI del formato REST de WordPress.

### Modelos requeridos

#### Post

- `id`
- `slug`
- `title`
- `excerpt`
- `date`
- `formattedDate`
- `imageUrl`
- `categories[]`
- `primaryCategory`
- `authorName`
- `link`

#### Category

- `id`
- `slug`
- `name`
- `count`

### Regla central

- La interfaz nunca debe depender directamente del JSON que devuelve WordPress.
- Toda transformacion debe hacerse dentro de `services`.

### Pasos detallados propuestos

1. Diseñar el contrato normalizado final.
2. Implementar funciones de mapeo desde respuesta REST hacia modelos internos.
3. Limpiar HTML del extracto y normalizar datos faltantes.
4. Preparar `formattedDate` aunque no se use visualmente aun.
5. Garantizar que la UI reciba un contrato estable.

### Riesgos a vigilar

- HTML en titulos y extractos.
- Posts sin imagen.
- Posts sin autor.
- Categorias vacias o sin color asignado.

### Criterio de exito

- La UI trabaja con modelos propios del proyecto.
- Ningun componente depende del shape REST de WordPress.

## Fase 4 - Integracion REST API

### Objetivo

Conectar realmente con WordPress usando solo los endpoints autorizados.

### Endpoints permitidos

- `/wp/v2/posts?_embed=1`
- `/wp/v2/categories`

### Restriccion de integracion

Usar `_embed=1` para obtener:

- imagen destacada
- categorias
- autor

Sin hacer multiples llamadas por cada post.

### Pasos detallados propuestos

1. Conectar `PostsService` al endpoint real de posts.
2. Conectar `CategoriesService` al endpoint real de categorias.
3. Implementar transformadores hacia modelos internos.
4. Verificar que el listado renderice datos reales.
5. Verificar respuestas incompletas y fallback de campos.

### Riesgos a vigilar

- Diferencias entre categorias embebidas y categorias de listado.
- Cambios en campos `_embedded`.
- Posts privados o sin contenido publico.

### Criterio de exito

- `/publicaciones` obtiene datos reales desde WordPress.
- No se requieren multiples requests por tarjeta.

## Fase 5 - Adaptacion del Listado de Publicaciones

### Objetivo

Reemplazar completamente los mocks actuales por publicaciones reales manteniendo el diseno existente.

### Reglas de URL que no se pueden romper

- `/publicaciones`
- `/publicaciones?categoria=slug`
- `/publicaciones?categoria=slug&pagina=2`

### Adaptacion visual obligatoria

No crear un nuevo diseno.

La implementacion debe parecer una evolucion del diseno actual, no un rediseño.

### Orden visual que debe conservar la tarjeta

1. Imagen
2. Titulo
3. Extracto
4. Categorias
5. Autor

### Restricciones visuales

No modificar:

- tipografia
- colores generales
- sombras
- radios
- estilo visual existente
- animaciones existentes

No generar imagenes nuevas.

### Reglas de contenido por tarjeta

#### Imagen

- Reemplazar el lateral degradado actual por imagen destacada real.
- Si no hay imagen destacada:
  - usar el degradado actual como fallback
  - no romper el layout

#### Titulo

- Mostrar el titulo de WordPress.
- Mantener la misma jerarquia visual.

#### Extracto

- Mostrar el extracto de WordPress.
- Eliminar etiquetas HTML.
- Respetar el numero de lineas actual.
- No cambiar la altura de las tarjetas.

#### Categorias

- Mostrar categorias reales del post.
- Mantener estilo actual de badges.
- Si una categoria no existe en el mapa de color:
  - usar color por defecto automaticamente

#### Autor

- Mostrarlo solo si WordPress lo entrega.
- Si no existe:
  - ocultar el bloque completo
  - no dejar espacios vacios

#### Fecha

- Mantenerla en el modelo de datos.
- No mostrarla en la interfaz en esta etapa.

### Filtros superiores

- Construirlos automaticamente desde WordPress.
- No usar listas locales.
- No mostrar categorias sin publicaciones.
- Mantener el sistema actual de filtros.

### Paginacion

Mantener exactamente el comportamiento actual:

- `?categoria=`
- `?pagina=`

### Manejo de errores

Implementar:

- timeout
- retry
- fallback visual
- estado vacio

Si WordPress no responde:

- mostrar mensaje amigable
- no romper la pagina

### Cache

Preparar estructura para futuro uso de:

- `Cache-Control`
- `s-maxage`
- `stale-while-revalidate`

En esta etapa:

- preparar la arquitectura
- no optimizar todavia

### SEO

No modificar:

- canonical
- OpenGraph
- Twitter Cards
- sitemap
- robots

### Protecciones tecnicas

No romper:

- GSAP
- animaciones
- componentes actuales
- responsive
- estilos existentes

### Pasos detallados propuestos

1. Confirmar cantidad de publicaciones por pagina.
2. Confirmar comportamiento esperado si faltan imagenes destacadas.
3. Confirmar visibilidad publica del autor.
4. Adaptar `BlogCard.astro` al contenido real sin rediseñar.
5. Adaptar `CategoriaFilter.astro` a categorias dinamicas.
6. Reemplazar el origen de datos mock por servicios reales.
7. Mantener paginacion y query params actuales.
8. Probar estados:
   - con datos
   - sin resultados
   - sin imagen
   - sin autor
   - fallo del API

### Criterio de exito

- El listado usa datos reales de WordPress.
- Los filtros son dinamicos.
- La paginacion funciona.
- El diseno sigue sintiendose el mismo.

## Preguntas Pendientes Antes de Iniciar la Implementacion

1. Confirmar decision final sobre TypeScript en la nueva capa:
   - opcion recomendada: TypeScript solo para `services`, `types` y `config`
   - alternativa: JavaScript en toda la nueva capa
2. Confirmar `PUBLIC_WORDPRESS_URL` definitiva.
3. Confirmar si el API REST responde correctamente desde el entorno actual.
4. Confirmar cantidad de publicaciones por pagina.
5. Confirmar si todas las publicaciones tendran imagen destacada.
6. Confirmar si el autor sera publico.
7. Confirmar formato de fecha deseado para el modelo.

## Orden de Ejecucion Recomendado

1. Cerrar la decision de TypeScript.
2. Ejecutar Fase 1 sin tocar SSR ni dependencias.
3. Revisar y aprobar Fase 1.
4. Confirmar configuracion WordPress y ejecutar Fase 2.
5. Revisar y aprobar Fase 2.
6. Ejecutar Fase 3.
7. Revisar y aprobar Fase 3.
8. Ejecutar Fase 4.
9. Revisar y aprobar Fase 4.
10. Ejecutar Fase 5.
11. Validar visual, filtros, errores y paginacion.

## Politica de Cierre por Fase

Al terminar cada fase se debe informar:

- archivos creados
- archivos modificados
- que sigue igual
- como queda reversible
- que decision debe aprobar el usuario antes de la siguiente fase

## Nota Final

No se iniciara ninguna fase de implementacion hasta que el usuario valide este documento y confirme la decision pendiente sobre TypeScript en la nueva capa.
