# Contexto Actual del Proyecto — Parvularias

> **Última actualización:** 02/06/2026

---

## Stack técnico

| Herramienta | Versión | Uso |
|---|---|---|
| Astro | 6.4.2 | Framework frontend (modo: `static`, próximo a cambiarse a `server`) |
| GSAP + ScrollTrigger | 3.15.0 | Animaciones |
| @astrojs/netlify | 7.0.11 | Adapter para Netlify SSR |
| WordPress Studio | — | WordPress local para desarrollo |
| Node.js | 22+ | Runtime |

---

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Nav.astro              # Menú responsivo con hamburguesa
│   │   ├── Footer.astro           # Footer 3 columnas
│   │   ├── Hero.astro             # Componente hero reutilizable
│   │   ├── BlogCard.astro         # Card de publicación
│   │   ├── BlogCarousel.astro     # Carrusel horizontal con GSAP
│   │   ├── Timeline.astro         # Línea de tiempo vertical
│   │   ├── CategoriaFilter.astro  # Filtro de categorías
│   │   └── ContactForm.astro      # Formulario de contacto con Netlify Forms
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro       # Layout global (head, nav, footer, slot)
│   │
│   ├── pages/
│   │   ├── index.astro            # Home: Hero 200vh (3 etapas), Últimos relatos, Objetivos, RRSS
│   │   ├── quienes-somos.astro    # Misión, visión, historia, equipo
│   │   ├── la-investigacion.astro # Metodología + cronología
│   │   ├── publicaciones/
│   │   │   ├── index.astro        # Lista con filtro por categorías
│   │   │   └── [slug].astro       # Post individual (rutas dinámicas estáticas)
│   │   ├── contacto.astro         # Formulario + info de contacto
│   │   └── 404.astro              # Página no encontrada
│   │
│   ├── lib/
│   │   ├── posts.js               # Datos estáticos placeholder (7 posts)
│   │   ├── categorias.js          # Categorías estáticas
│   │   └── wordpress.js           # (Futuro) Funciones para WPGraphQL
│   │
│   ├── styles/
│   │   └── global.css             # Sistema de diseño completo (color system, tipografía, radios, sombras)
│   │
│   └── utils/
│       └── gsap.js                # Helpers GSAP (fadeInUp, staggerItems, fadeInLeft, etc.)
│
├── public/
│   ├── favicon.ico
│   └── favicon.svg
│
├── astro.config.mjs               # Config: output: 'static', adapter Netlify
├── package.json
├── tsconfig.json
├── .env                           # WP_URL=http://localhost/... (variable de entorno)
└── .env.example
```

---

## Páginas del sitio (13 rutas)

| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `index.astro` | ✅ Hero 3 etapas (200vh), carrusel, objetivos, RRSS |
| `/quienes-somos` | `quienes-somos.astro` | ✅ Misión, visión, timeline, equipo |
| `/la-investigacion` | `la-investigacion.astro` | ✅ Metodología, cronología |
| `/publicaciones` | `publicaciones/index.astro` | ✅ Lista con filtro por categorías |
| `/publicaciones/[slug]` | `publicaciones/[slug].astro` | ✅ 7 posts individuales |
| `/contacto` | `contacto.astro` | ✅ Formulario + info |
| `/404` | `404.astro` | ✅ Página 404 |

---

## Diseño visual (color-System.md aplicado)

**Paleta aplicada en `global.css`:**

- **Primary (Verde Petróleo):** `--color-primary: #256A6F`
- **Secondary (Verde Oliva):** `--color-secondary: #7C804D`
- **Accent (Terracota):** `--color-accent: #BF5B2B`
- **Tipografía:** `Inter` (body) + `Source Sans 3` (headings)
- **Modo oscuro:** Soportado vía `[data-theme="dark"]`
- **Radios:** `--radius-sm` (4px) a `--radius-2xl` (24px)
- **Sombras:** `--shadow-sm` a `--shadow-xl`

---

## Estado de las fases

| Fase | Estado |
|---|---|
| 0 — Setup del entorno | ✅ |
| 1 — Estructura base (Layout + CSS) | ✅ |
| 2 — Páginas con contenido placeholder | ✅ (en refinamiento) |
| 3 — Animaciones GSAP avanzadas | ⬜ Pendiente |
| 4 — WordPress Studio + contenido real | ⬜ Pendiente |
| 5 — Conectar Astro → WP API | ⬜ Pendiente |
| 6 — Deploy a producción | ⬜ Pendiente |

---

## Próximos pasos acordados

1. Cambiar `astro.config.mjs` a `output: 'server'` para SSR (posts nuevos sin rebuild)
2. Ajustar `[slug].astro` para SSR
3. Instalar WordPress Studio y crear contenido real
4. Conectar Astro a WP via WPGraphQL
5. Deploy a Netlify + Hostinger (WordPress en subdominio `api.tudominio.com`)
