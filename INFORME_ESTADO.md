# Informe de Estado del Proyecto Parvularias

> **Fecha del informe:** 11 de julio de 2026
> **Estado actual:** Fase 2 completada (parcialmente), en desarrollo activo

---

## Resumen Ejecutivo

El proyecto **Parvularias** es un sitio web académico/institucional sobre construcción de identidad profesional docente en educación parvularia. Utiliza un stack moderno con Astro como framework frontend, GSAP para animaciones avanzadas y WordPress como CMS headless (pendiente de integrar).

El proyecto se encuentra en una fase de desarrollo activo, con la estructura base completada y un diseño visual distintivo inspirado en Figma. Sin embargo, hay varios problemas técnicos pendientes de resolver.

---

## Stack Técnico

| Herramienta | Versión | Estado |
|---|---|---|
| **Node.js** | 22+ | Requerido |
| **Astro** | 6.4.2 | Instalado |
| **GSAP + ScrollTrigger** | 3.15.0 | Instalado |
| **@astrojs/netlify** | 7.0.11 | Instalado |
| **WordPress Studio** | - | No instalado (pendiente) |
| **Netlify** | - | Pendiente de configurar |

---

## Estructura del Proyecto

```
Sitio Parbularias/
├── frontend/                    # Proyecto Astro (repositorio Git principal)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav.astro              # Menú responsivo con hamburguesa
│   │   │   ├── Footer.astro           # Footer 4 columnas con logo "Colaboran"
│   │   │   ├── VoicePostCard.astro    # Card individual de voz docente
│   │   │   └── VoicePostDeck.astro    # Deck de cards de voces docentes
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro       # Layout base (head, nav, footer, slot)
│   │   ├── pages/
│   │   │   ├── index.astro            # Home principal (HERO FINAL)
│   │   │   ├── index2.astro           # Home alternativo (HERO BUBBLES)
│   │   │   ├── index3.astro           # Versión adicional
│   │   │   ├── index - copia.astro    # Backup
│   │   │   ├── index.bkp3.astro       # Backup
│   │   │   ├── index-test.astro       # Testing
│   │   │   ├── quienes-somos.astro    # Misión, visión, equipo
│   │   │   ├── la-investigacion.astro # Metodología + cronología
│   │   │   ├── publicaciones/
│   │   │   │   ├── index.astro        # Lista con filtro por categorías
│   │   │   │   └── [slug].astro       # Post individual
│   │   │   ├── contacto.astro         # Formulario + info
│   │   │   ├── contacto2.astro        # Versión alternativa
│   │   │   └── 404.astro              # Página no encontrada
│   │   ├── lib/
│   │   │   ├── posts.js               # Datos estáticos (7 posts placeholder)
│   │   │   ├── categorias.js          # Categorías estáticas
│   │   │   └── wordpress.js           # (Futuro) Funciones WP API
│   │   ├── styles/
│   │   │   └── global.css             # Sistema de diseño completo
│   │   ├── assets/
│   │   │   └── figma-mcp/             # Assets importados desde Figma
│   │   │       ├── inicio/            # Imágenes del hero y home
│   │   │       │   ├── logo.png
│   │   │       │   ├── hero-1.png
│   │   │       │   ├── hero-2.png
│   │   │       │   ├── relato-thumb.png
│   │   │       │   ├── galeria-2.png
│   │   │       │   ├── galeria-3.png
│   │   │       │   ├── galeria-5.png
│   │   │       │   ├── galeria-6.png
│   │   │       │   └── colaboran.png
│   │   │       └── quienes-somos/
│   │   │           ├── profile1.png
│   │   │           ├── profile2.png
│   │   │           └── logo.png
│   │   └── utils/
│   │       └── gsap.js                # Helpers GSAP (fadeInUp, staggerItems, etc.)
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── FONDO A.svg
│   │   ├── indexfig.html              # Referencia Figma
│   │   └── images/
│   │       └── quienes-somos/
│   ├── dist/                          # Build de producción (generado)
│   ├── astro.config.mjs
│   ├── package.json
│   ├── .env                           # Variables de entorno (WP_URL, SITE_URL)
│   ├── .env.example
│   ├── astro-err.log                  # Log de errores
│   └── astro-out.log                  # Log de salida
│
├── DESIGN_SYSTEM_BASE.md              # Design system detallado
├── FIGMA_STYLE_SYSTEM.md              # Estilos exportados desde Figma
├── color-System.md                    # Paleta de colores original
├── CONTEXTO_ACTUAL.md                 # Contexto técnico actualizado
├── PLAN_PROYECTO.md                   # Plan de desarrollo por fases
├── PROMPT_IA.md                       # Instrucciones para IA
└── test.html                          # Pruebas
```

---

## Estado de las Páginas

### Páginas Principales

| Página | Archivo | Estado | Notas |
|---|---|---|---|
| **Inicio** | `index.astro` | ✅ Funcional | Hero con animaciones CSS, sección de voces, scroll reveal |
| **Inicio Bubbles** | `index2.astro` | ✅ Funcional | Versión alternativa con bubbles SVG y scroll-triggered animations |
| **Quiénes Somos** | `quienes-somos.astro` | ✅ Funcional | Misión, visión, equipo |
| **La Investigación** | `la-investigacion.astro` | ✅ Funcional | Metodología y cronología |
| **Publicaciones** | `publicaciones/index.astro` | ✅ Funcional | Lista con filtro por categorías |
| **Post Individual** | `publicaciones/[slug].astro` | ✅ Funcional | Rutas dinámicas estáticas |
| **Contacto** | `contacto.astro` | ✅ Funcional | Formulario + información |
| **404** | `404.astro` | ✅ Funcional | Página no encontrada |

### Páginas Alternativas/Testing

| Archivo | Estado | Notas |
|---|---|---|
| `index-test.astro` | ⚠️ Testing | Versión de prueba |
| `index - copia.astro` | 📁 Backup | Copia de seguridad |
| `index.bkp3.astro` | 📁 Backup | Copia de seguridad |
| `contacto2.astro` | ✅ Funcional | Versión alternativa de contacto |

---

## Sistema de Diseño

### Paleta de Colores (Implementada)

| Color | Primary | Secondary | Tertiary | Accent |
|---|---|---|---|---|
| **Light** | `#be572a` (Terracota) | `#8a6a59` (Marrón) | `#3b959e` (Teal) | `#d2892d` (Dorado) |
| **Dark** | `#d2892d` (Dorado) | `#d8c3b6` (Beige) | `#70c0c8` (Cyan) | `#e3a154` (Naranja) |

### Tipografía (Implementada)

| Uso | Fuente | Tamaño |
|---|---|---|
| **Headings** | Playfair Display, serif | clamp(2.2rem-4.8rem) |
| **Body** | Inter, sans-serif | 16px base |
| **UI/Monospace** | Inconsolata, monospace | 14-18px |
| **Formularios** | Roboto, sans-serif | - |

### Variables CSS Definidas

- **Colores:** 40+ variables (primary, secondary, tertiary, accent, bg, surface, text, border)
- **Tipografía:** 9 tamaños de texto (text-xs a text-5xl)
- **Espaciado:** 5 gaps (xs a xl)
- **Bordes:** 5 radios + pill
- **Sombras:** 6 sombras + paper + card + cutout
- **Layout:** max-width 1200px, nav-height 70px
- **Transiciones:** 0.28s ease
- **Modo oscuro:** Soportado via `[data-theme="dark"]`

---

## Componentes Implementados

### `Nav.astro`
- ✅ Menú responsive con hamburguesa móvil
- ✅ Logo circular con imagen importada desde Figma
- ✅ Navegación horizontal en desktop
- ✅ Animación de entrada fade-in
- ✅ Panel desplegable con backdrop-filter
- ⚠️ Enlace a `/contacto2` en lugar de `/contacto`

### `Footer.astro`
- ✅ 4 columnas: Mapa de sitio, Otras investigaciones, Colaboran, Redes
- ✅ Logo de colaboradores
- ✅ Enlaces a LinkedIn e Instagram
- ✅ Animación fade-in al hacer scroll (IntersectionObserver)
- ⚠️ Contenido placeholder en "Otras Investigaciones"

### `VoicePostCard.astro`
- ✅ Card individual de voz docente
- ✅ Estilos inline con colores teal/orange/coral
- ✅ Sombra paper distintiva

### `VoicePostDeck.astro`
- ✅ Deck de cards con rotación CSS
- ✅ Datos desde `posts.js`
- ⚠️ Componente con errores reportados en logs

---

## Animaciones GSAP

### Helpers Implementados (`utils/gsap.js`)

```javascript
fadeInUp()      // Animación hacia arriba con scroll trigger
fadeInDown()    // Animación hacia abajo con scroll trigger
staggerItems()  // Items escalonados
fadeInLeft()    // Animación desde izquierda
fadeInRight()   // Animación desde derecha
scaleIn()       // Animación de escala
```

### Animaciones CSS Activas

- ✅ **Hero:** Fade-in con slide de imágenes
- ✅ **Navbar:** Fade-in al cargar
- ✅ **Bubbles:** Aparición con scroll-triggered SVG animations
- ✅ **Footer:** Fade-up al hacer scroll
- ✅ **Caras Carousel:** Scroll infinito horizontal
- ✅ **Question Story:** Scroll-triggered parallax effect

---

## Errores y Problemas Detectados

### Errores Críticos

1. **`allBackgroundBubbles is not defined`**
   - **Archivo:** `index2.astro`
   - **Problema:** Variable no definida en el script
   - **Impacto:** Error de renderizado en homepage alternativo
   - **Solución:** Definir la variable o corregir la referencia

2. **`Could not import /src/components/VoicePostDeck.astro`**
   - **Archivo:** `index.astro`
   - **Problema:** Importación fallida del componente
   - **Impacto:** Homepage principal no carga correctamente
   - **Solución:** Verificar que el componente existe y la ruta es correcta

3. **`EBUSY: resource busy or locked`**
   - **Archivo:** `index2.astro`
   - **Problema:** Archivo bloqueado por otro proceso
   - **Impacto:** Build falla intermitentemente
   - **Solución:** Cerrar procesos que bloqueen el archivo

### Errores Menores

4. **Archivos de backup innecesarios**
   - `index - copia.astro`
   - `index.bkp3.astro`
   - **Solución:** Eliminar o mover a carpeta de backups

5. **Título incorrecto en homepage**
   - `<title>Sin título - Figma Home</title>`
   - **Solución:** Actualizar a "Parvularias - Inicio"

---

## Dependencias

### Producción

```json
{
  "astro": "^6.4.2",
  "@astrojs/netlify": "^7.0.11",
  "gsap": "^3.15.0"
}
```

### Requisitos del Sistema

- Node.js 22.12.0 o superior
- npm (incluido con Node)

---

## Estado de las Fases del Plan

| Fase | Estado | Progreso |
|---|---|---|
| **Fase 0** — Setup del entorno | ✅ Completada | 100% |
| **Fase 1** — Estructura base (Layout + CSS) | ✅ Completada | 100% |
| **Fase 2** — Páginas con contenido placeholder | ⚠️ En progreso | 85% |
| **Fase 3** — Animaciones GSAP avanzadas | ⚠️ Parcial | 40% |
| **Fase 4** — WordPress Studio + contenido real | ⬜ Pendiente | 0% |
| **Fase 5** — Conectar Astro → WP API | ⬜ Pendiente | 0% |
| **Fase 6** — Deploy a producción | ⬜ Pendiente | 0% |

### Detalle Fase 2

- ✅ Crear `lib/posts.js` con 7 posts placeholder
- ✅ Crear `lib/categorias.js`
- ✅ Crear componentes: VoicePostCard, VoicePostDeck
- ✅ Crear páginas principales
- ⚠️ Corregir errores de importación
- ⚠️ Limpiar archivos de backup

### Detalle Fase 3

- ✅ Animaciones CSS para hero
- ✅ Animación navbar fade-in
- ✅ Footer fade-up
- ✅ Scroll-triggered animations en bubbles
- ⚠️ GSAP helpers implementados pero no todos activos
- ⚠️ Falta integración completa de ScrollTrigger

---

## Próximos Pasos (Prioritarios)

### Inmediatos (1-2 días)

1. **Corregir error `allBackgroundBubbles`** en `index2.astro`
2. **Corregir importación de VoicePostDeck** en `index.astro`
3. **Limpiar archivos de backup** (index - copia, index.bkp3)
4. **Actualizar título** del homepage
5. **Corregir enlace de contacto** en Nav.astro (`/contacto2` → `/contacto`)

### Corto Plazo (1 semana)

6. **Eliminar archivos innecesarios** del proyecto raíz
7. **Completar Fase 3** de animaciones GSAP
8. **Probar build completo** sin errores
9. **Configurar Netlify** para deploy estático

### Mediano Plazo (2-4 semanas)

10. **Instalar WordPress Studio** y crear contenido real
11. **Implementar `wordpress.js`** para conectar con WP API
12. **Migrar datos placeholder** a WP
13. **Configurar dominio personalizado**
14. **Deploy a producción**

---

## Recomendaciones Técnicas

### Arquitectura

1. **Eliminar variantes de homepage innecesarias** — Mantener solo `index.astro` o `index2.astro`, no ambas
2. **Unificar estilos** — Algunos componentes usan estilos inline, otros scoped CSS
3. **Crear componente BaseLayout consistente** — Asegurar que todas las páginas usen el mismo layout

### Diseño

4. **Documentar sistema de diseño** — Mantener `DESIGN_SYSTEM_BASE.md` sincronizado con `global.css`
5. **Implementar modo oscuro** — Las variables CSS ya están definidas, falta la implementación visual
6. **Optimizar imágenes** — Las imágenes de Figma son PNG, considerar conversión a WebP

### Rendimiento

7. **Minimizar JavaScript** — Las animaciones CSS son ligeras, GSAP es necesario solo para interacciones complejas
8. **Implementar lazy loading** — Ya está en uso en algunas imágenes
9. **Configurar headers de caché** — En Netlify para assets estáticos

### Mantenimiento

10. **Usar .gitignore** — Asegurar que `dist/`, `node_modules/`, y logs no se suban a Git
11. **Crear scripts de build** — Para verificar que no hay errores antes de commits
12. **Implementar testing** — Aunque sea básico, para verificar que las páginas cargan

---

## Métricas del Proyecto

| Métrica | Valor |
|---|---|
| **Archivos .astro** | 15 |
| **Componentes** | 4 |
| **Páginas principales** | 7 |
| **Imágenes** | 12+ |
| **Variables CSS** | 40+ |
| **Líneas de código (aprox)** | 5,000+ |
| **Errores conocidos** | 3 críticos |
| **Build exitoso** | ⚠️ Parcial |

---

## Cambios Recientes

- **11/07/2026:** Importación de assets desde Figma MCP
- **11/07/2026:** Creación de componentes VoicePostCard y VoicePostDeck
- **11/07/2026:** Actualización de homepage con scroll animations
- **02/06/2026:** Última actualización de CONTEXTO_ACTUAL.md

---

## Notas para el Desarrollador

- El proyecto está en **modo estático** (`output: 'static'`). Para contenido dinámico sin rebuild, cambiar a `output: 'server'` (requiere SSR adapter)
- Las **imágenes están en `src/assets/`**, no en `public/`. Esto permite optimización automática de Astro
- El **sistema de diseño** ya está bien definido, solo falta implementación completa
- **GSAP es gratuito** para sitios web públicos, no requiere licencia
- **WordPress** es opcional — el sitio puede funcionar con datos estáticos indefinidamente

---

*Informe generado automáticamente el 11 de julio de 2026*
