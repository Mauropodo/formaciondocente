# Plan Completo: Sitio Parbularias

> **Stack:** Astro + WordPress Headless + GSAP + ScrollTrigger  
> **Estado:** ✅ Fase 2 — Páginas con contenido placeholder (completada)  
> **Última actualización:** 31/05/2026

---

## Estructura del proyecto

```
C:\Users\mwill\Documents\CODEX\Sitio Parbularias\
│
├── frontend/                    # Proyecto Astro (repositorio Git principal)
│   ├── public/
│   │   ├── assets/
│   │   │   ├── js/
│   │   │   │   └── animaciones.js          # GSAP global utilities
│   │   │   └── img/
│   │   │       └── placeholder-hero.jpg    # Placeholder
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Hero.astro
│   │   │   ├── BlogCard.astro
│   │   │   ├── BlogCarousel.astro
│   │   │   ├── Timeline.astro
│   │   │   ├── CategoriaFilter.astro
│   │   │   └── ContactForm.astro
│   │   │
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   │
│   │   ├── lib/
│   │   │   ├── wordpress.js                # Fase 4-5 — funciones WP API
│   │   │   ├── posts.js                    # Fase 1-2 — datos estáticos (placeholder)
│   │   │   └── categorias.js               # Fase 1-2 — datos estáticos
│   │   │
│   │   ├── pages/
│   │   │   ├── index.astro                 # Inicio
│   │   │   ├── quienes-somos.astro
│   │   │   ├── la-investigacion.astro
│   │   │   ├── publicaciones/
│   │   │   │   ├── index.astro             # Lista + categorías
│   │   │   │   └── [slug].astro            # Post individual
│   │   │   ├── contacto.astro
│   │   │   └── 404.astro
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   └── utils/
│   │       └── gsap.js                     # Config GSAP + ScrollTrigger defaults
│   │
│   ├── .env
│   ├── .env.example
│   ├── astro.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── database/                    # Backups de WP (opcional)
    └── wordpress.sql
```

---

## Stack técnico

| Herramienta | Versión | Uso |
|---|---|---|
| Node.js | 20+ | Runtime para Astro |
| npm | 10+ | Gestor de paquetes |
| Astro | Última | Framework frontend (SSG / SSR) |
| GSAP + ScrollTrigger | Última | Animaciones |
| WordPress Studio | Última | WordPress local para desarrollo |
| WordPress Hosting | — | WordPress en producción |
| Netlify / Vercel | — | Hosting del frontend estático |
| MariaDB + HeidiSQL | — | BD local (setup del usuario) |

---

## Páginas del sitio

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Hero animado + carrusel de últimas publicaciones |
| `/quienes-somos` | Quiénes Somos | Misión, visión, equipo |
| `/la-investigacion` | La Investigación | Timeline o carrusel con hitos |
| `/publicaciones` | Publicaciones | Lista con filtro por categorías |
| `/publicaciones/[slug]` | Post individual | Contenido de cada entrada |
| `/contacto` | Contacto | Formulario + datos de contacto |
| `/404` | 404 | Página no encontrada |

---

## Categorías de publicaciones (WordPress)

- Desarrollo Infantil
- Salud
- Nutrición
- Estimulación Temprana

---

## Plan de fases

### Fase 0 — Setup del entorno local

- [x] Crear carpeta del proyecto
- [x] `npm create astro@latest frontend`
- [x] `npm install gsap`
- [x] `npm install @astrojs/netlify`
- [x] Verificar que `npm run build` funciona

### Fase 1 — Estructura base: Layout + CSS

- [x] Crear `BaseLayout.astro` (head, nav, footer, slot)
- [x] Crear `global.css` (reset, variables, tipografía, responsive)
- [x] Crear `Nav.astro` (menú de navegación)
- [x] Crear `Footer.astro`
- [x] Crear `utils/gsap.js` (helpers de animación)
- [x] Actualizar `index.astro` con hero animado
- [x] Configurar `.env` y `astro.config.mjs`

### Fase 2 — Páginas con contenido placeholder

- [x] Crear `lib/posts.js` con datos estáticos (7 posts de ejemplo)
- [x] Crear `lib/categorias.js` con categorías estáticas
- [x] Crear `Hero.astro` con placeholders
- [x] Crear `BlogCard.astro`
- [x] Crear `BlogCarousel.astro` con navegación GSAP
- [x] Crear `CategoriaFilter.astro`
- [x] Crear `Timeline.astro`
- [x] Crear `ContactForm.astro`
- [x] Crear `index.astro` — Inicio con hero + cards animadas
- [x] Crear `quienes-somos.astro` — Misión, visión, historia, equipo
- [x] Crear `la-investigacion.astro` — Metodología + cronología
- [x] Crear `publicaciones/index.astro` — Lista con filtros por categoría
- [x] Crear `publicaciones/[slug].astro` — Post individual (rutas dinámicas)
- [x] Crear `contacto.astro` — Formulario + info de contacto
- [x] Crear `404.astro`

### Fase 3 — Animaciones GSAP

- [ ] Crear `utils/gsap.js` con funciones helper
- [ ] Hero: fadeIn + slideUp al cargar
- [ ] Navbar: cambio de fondo al hacer scroll
- [ ] Secciones: fadeIn al hacer scroll (ScrollTrigger)
- [ ] Timeline: stagger animation (elementos aparecen uno a uno)
- [ ] BlogCarousel: animación de entrada + navegación con GSAP
- [ ] BlogCard: hover scale + shadow
- [ ] Contacto: fadeIn desde abajo

### Fase 4 — WordPress Studio + contenido real

- [ ] Instalar WordPress Studio
- [ ] Crear sitio: `sitio-parbularias.local`
- [ ] Instalar plugins: ACF, Custom Post Type UI, Yoast SEO
- [ ] Crear categorías en WP
- [ ] Crear entradas de blog de prueba
- [ ] Configurar menús en WP

### Fase 5 — Conectar Astro con WordPress API

- [ ] Crear `lib/wordpress.js` (getPosts, getPost, getCategorias)
- [ ] Configurar `.env` con WP_URL
- [ ] Reemplazar imports de datos estáticos por API calls
- [ ] Probar que las páginas funcionan con datos de WP

### Fase 6 — Deploy a producción

- [ ] Migrar WP Studio → hosting real (Hostinger/SiteGround/etc.)
- [ ] Crear repo en GitHub
- [ ] Subir `frontend/` a GitHub
- [ ] Conectar repo a Netlify
- [ ] Configurar variable de entorno `WP_URL` en Netlify
- [ ] Configurar dominio personalizado
- [ ] Probar sitio en producción

---

## Detalles técnicos importantes

### Astro: SSG vs SSR

- **Fase 1-5:** `output: 'static'` — genera HTML en build. Posts nuevos requieren rebuild.
- **Futuro (opcional):** `output: 'server'` con adapter de Netlify — contenido dinámico sin rebuild.

### GSAP

- Gratuito para sitios web públicos
- Sin licencia de pago necesaria
- ScrollTrigger incluido en el bundle de GSAP

### Formulario de contacto

Astro no tiene backend. Opciones para producción:
- **Netlify Forms** (gratis, integrado con Netlify)
- **Formspree** (gratis hasta 50 submissions/mes)
- **Web3Forms** (gratis 250 submissions/mes)

### Conexión WP → Astro

En desarrollo:
```
WP Studio: http://sitio-parbularias.local/wp-json
Astro dev: http://localhost:4321
```

En producción:
```
WP Hosting: https://www.tudominio.com/wp-json
Astro build → Netlify: https://www.tudominio.com
```

---

## Reglas del proyecto

1. **Este archivo se actualiza después de cada fase completada.**
2. Marcar los checkboxes `[ ]` como `[x]` cuando una tarea esté terminada.
3. Actualizar la sección "Estado" al inicio del archivo con la fase actual.
4. Agregar notas, problemas encontrados o decisiones técnicas en cada fase.

---

## Notas / Decisiones técnicas

*(Espacio para registrar decisiones importantes durante el desarrollo)*

| Fecha | Decisión / Nota |
|---|---|---|
| — | — |
