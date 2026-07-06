# FIGMA Style System

Fuente: Figma `Sin título` (`pN4kJD50X3v8Oe0HgOygPW`), páginas y frames de cabecera, inicio, voces docentes y contacto.

## Intención visual

Sistema cálido, editorial y artesanal. La interfaz se apoya en fondos marfil, acentos terracota, texto vino oscuro, tipografía serif para títulos y monoespaciada para navegación y microcopys.

## Paleta base

- `--color-bg`: `#f9f4f1`
- `--color-bg-soft`: `#f4ebe6`
- `--color-surface`: `#f9f5f2`
- `--color-surface-elevated`: `#ffffff`
- `--color-border`: `rgba(98, 4, 4, 0.12)`
- `--color-text-primary`: `#620404`
- `--color-text-secondary`: `#514444`
- `--color-primary`: `#be572a`
- `--color-primary-strong`: `#a94822`
- `--color-accent`: `#d2892d`
- `--color-teal`: `#3b959e`
- `--color-coral`: `#c36438`

## Tipografías

- Títulos H1-H4: `Playfair Display`
- Cuerpo y párrafos: `Inter`
- Navegación, pills, labels y CTA pequeños: `Inconsolata`
- Formularios: `Roboto`

## Estructura de texturas

- Sombra principal: ligera, de papel recortado
- Sombra secundaria: más suave para tarjetas elevadas
- Bordes: delgados y cálidos, nunca negros puros
- Radios: 12px a 24px según el nivel de énfasis

## Componentes base

- Botones primarios en terracota
- Botones secundarios con borde terracota
- Cards editoriales con fondo marfil
- Pills de categoría monoespaciadas
- Inputs de búsqueda y filtros con borde suave
- Navbar flotante sobre panel beige

## Aplicación al proyecto

- Variables globales en `frontend/src/styles/global.css`
- Tipografías cargadas en `frontend/src/layouts/BaseLayout.astro`
- Header y footer alineados con estos tokens

## Nota de uso

Este archivo sirve como referencia editable para re-aplicar el sistema visual en otras páginas o futuras iteraciones sin volver a interpretar el Figma desde cero.
