# Prompt para trabajar con IA en el proyecto Parvularias

---

## Contexto del proyecto

Soy desarrollador del sitio **Parvularias**, un sitio web sobre desarrollo infantil. El proyecto usa **Astro** con **GSAP** para animaciones y **WordPress headless** como CMS.

El repositorio está en `C:\Users\mwill\Documents\CODEX\Sitio Parbularias\`. El frontend está en `frontend/`.

### Stack técnico

- **Astro** 6.4.2 con adapter `@astrojs/netlify`
- **GSAP** 3.15.0 + ScrollTrigger para animaciones
- **WordPress Studio** como CMS local
- **Node.js** 22+
- **Variable de entorno:** `WP_URL` para conectar con WordPress API

### Estructura actual de `src/`

```
src/
├── components/        # Nav, Footer, Hero, BlogCard, BlogCarousel, Timeline, CategoriaFilter, ContactForm
├── layouts/           # BaseLayout (head, nav, footer, slot)
├── pages/             # index, quienes-somos, la-investigacion, publicaciones/, contacto, 404
├── lib/               # posts.js (datos placeholder), categorias.js, wordpress.js (WP API helper)
├── styles/            # global.css (color system completo)
└── utils/             # gsap.js (helpers de animación: fadeInUp, staggerItems, etc.)
```

### Diseño visual

Sistema de diseño definido en `color-System.md`. Variables CSS en `global.css`:
- **Primary:** Verde petróleo `#256A6F`
- **Secondary:** Verde oliva `#7C804D`
- **Accent:** Terracota `#BF5B2B`
- **Fonts:** Inter (body) + Source Sans 3 (headings)
- **Soporte:** Modo oscuro vía `[data-theme="dark"]`

### Homepage

Hero de 200vh dividido en 3 etapas con revelación por scroll:
1. Título "Conectar / para crecer"
2. Subtítulo
3. Botones CTA

Luego: Últimos relatos (carrusel), Objetivos (4 cards), RRSS.

---

## Instrucciones para la IA

1. **Siempre leer el archivo completo antes de editarlo.**
2. **Mantener el sistema de diseño** del `color-System.md` y las variables CSS de `global.css`.
3. **GSAP** se importa como `import { gsap } from "gsap"` y `ScrollTrigger` como `import { ScrollTrigger } from "gsap/ScrollTrigger"`.
4. **Los componentes Astro** usan `---` para frontmatter y `<script>` para JS del lado cliente.
5. **No agregar comentarios** en el código a menos que sea necesario.
6. **Ejecutar `npm run build`** después de cualquier cambio para verificar que no hay errores.
7. **Actualizar `PLAN_PROYECTO.md`** al completar cada tarea marcando los checkboxes.

---

## Tarea actual

[DESCRIBE AQUÍ LA TAREA ESPECÍFICA QUE QUIERES QUE REALICE LA IA]
