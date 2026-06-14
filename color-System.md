# Design System - FONDECYT Formación Práctica Identidad Profesional Docente

## Objetivos UX

- Cumplir WCAG AA como mínimo.
- Mantener legibilidad en modo claro y oscuro.
- Permitir crecimiento futuro (dashboard, LMS, portal de alumnos, blog, etc.).
- Mantener coherencia con la identidad institucional.

---

# Paleta Principal

## Primary (Verde Petróleo)

| Token | Valor |
|---------|---------|
| primary-50 | #EDF7F7 |
| primary-100 | #D6ECEC |
| primary-200 | #AED9D9 |
| primary-300 | #84C2C3 |
| primary-400 | #5BAAAC |
| primary-500 | #256A6F |
| primary-600 | #1E575B |
| primary-700 | #184649 |
| primary-800 | #123438 |
| primary-900 | #0C2326 |

## Secondary (Verde Oliva)

| Token | Valor |
|---------|---------|
| secondary-50 | #F5F6EF |
| secondary-100 | #E8EAD8 |
| secondary-200 | #D2D6B3 |
| secondary-300 | #BCC28D |
| secondary-400 | #A5AE68 |
| secondary-500 | #7C804D |
| secondary-600 | #65683F |
| secondary-700 | #4E5031 |
| secondary-800 | #383A24 |
| secondary-900 | #222316 |

## Accent (Terracota)

| Token | Valor |
|---------|---------|
| accent-50 | #FDF3ED |
| accent-100 | #FBE4D5 |
| accent-200 | #F5C8AB |
| accent-300 | #EFAE84 |
| accent-400 | #E38855 |
| accent-500 | #BF5B2B |
| accent-600 | #A14921 |
| accent-700 | #813A1A |
| accent-800 | #622B13 |
| accent-900 | #431C0C |

## Warning / Learning

| Token | Valor |
|---------|---------|
| warning-50 | #FFF7E7 |
| warning-100 | #FEEFC9 |
| warning-200 | #FDE092 |
| warning-300 | #FAD05C |
| warning-400 | #F0B83C |
| warning-500 | #D9961F |
| warning-600 | #B77917 |
| warning-700 | #8E5C11 |
| warning-800 | #653F0B |
| warning-900 | #3D2505 |

---

# Estados del Sistema

| Estado | Color |
|---------|---------|
| Success | #15803D |
| Error | #DC2626 |
| Info | #2563EB |
| Warning | #D97706 |

---

# Modo Claro

## Backgrounds

| Token | Valor |
|---------|---------|
| background | #FFFFFF |
| background-soft | #F8FAFC |
| background-muted | #F1F5F9 |

## Surface

| Token | Valor |
|---------|---------|
| surface | #FFFFFF |
| surface-hover | #F8FAFC |
| surface-elevated | #FFFFFF |

## Bordes

| Token | Valor |
|---------|---------|
| border-subtle | #E2E8F0 |
| border-default | #CBD5E1 |
| border-strong | #94A3B8 |

## Texto

| Token | Valor |
|---------|---------|
| text-primary | #0F172A |
| text-secondary | #475569 |
| text-muted | #64748B |
| text-disabled | #94A3B8 |
| text-inverse | #FFFFFF |

---

# Modo Oscuro

## Backgrounds

| Token | Valor |
|---------|---------|
| background | #0F172A |
| background-soft | #162033 |
| background-muted | #1E293B |

## Surface

| Token | Valor |
|---------|---------|
| surface | #1E293B |
| surface-hover | #263549 |
| surface-elevated | #334155 |

## Bordes

| Token | Valor |
|---------|---------|
| border-subtle | #334155 |
| border-default | #475569 |
| border-strong | #64748B |

## Texto

| Token | Valor |
|---------|---------|
| text-primary | #F8FAFC |
| text-secondary | #CBD5E1 |
| text-muted | #94A3B8 |
| text-disabled | #64748B |

---

# Tipografía

## Principal

- Inter
- Source Sans 3

## Escala tipográfica

| Token | Tamaño |
|---------|---------|
| text-xs | 12px |
| text-sm | 14px |
| text-base | 16px |
| text-lg | 18px |
| text-xl | 20px |
| text-2xl | 24px |
| text-3xl | 30px |
| text-4xl | 36px |
| text-5xl | 48px |

---

# Radios

| Token | Valor |
|---------|---------|
| radius-sm | 4px |
| radius-md | 8px |
| radius-lg | 12px |
| radius-xl | 16px |
| radius-2xl | 24px |

---

# Sombras

| Token | Valor |
|---------|---------|
| shadow-sm | 0 1px 2px rgba(0,0,0,.05) |
| shadow-md | 0 4px 6px rgba(0,0,0,.07) |
| shadow-lg | 0 10px 15px rgba(0,0,0,.1) |
| shadow-xl | 0 20px 25px rgba(0,0,0,.12) |

---

# Variables CSS para Astro

```css
:root {
  --color-primary: #256A6F;
  --color-secondary: #7C804D;
  --color-accent: #BF5B2B;

  --color-bg: #FFFFFF;
  --color-surface: #FFFFFF;

  --color-text: #0F172A;
  --color-text-secondary: #475569;

  --color-border: #CBD5E1;
}

[data-theme="dark"] {
  --color-primary: #5BAAAC;
  --color-secondary: #A5AE68;
  --color-accent: #E38855;

  --color-bg: #0F172A;
  --color-surface: #1E293B;

  --color-text: #F8FAFC;
  --color-text-secondary: #CBD5E1;

  --color-border: #475569;
}
```
