# Life OS UX Decisions

> Status: Active UX direction
> Document type: UX decisions / visual system source of truth
> Last updated: October 17, 2026
> Sources: Figma files "Paleta life-os" and "font-life-os"

---

## Document precedence

This document remains the source of truth for the approved color system, contrast guidance, semantic color tokens, and the operational use of `Azeret Mono`.

[UI design direction](design_direction.md) complements this document. Its DD-01 supersedes the earlier single-font interpretation only for page titles, key section headings, and one truly focal metric per screen: those limited editorial roles may use the documented display serif. Navigation, controls, filters, forms, tables, dense lists, dates, and comparable amounts continue to use `Azeret Mono`.

The display serif is not a new long-form reading font and does not by itself authorize product or interaction changes.

---

# 1. Color System

Esta paleta es la dirección visual aprobada y publicada en la Biblioteca visual de Life OS. Debe tratarse como una decisión de UX del producto, no como estilos aislados.

La interfaz debe sentirse calmada, organizada, suave y clara. El color debe ayudar a entender jerarquia y prioridad de acciones sin hacer que la app se sienta ruidosa.

## 1.1 Core Tokens

| Token | Color | Uso previsto |
| --- | --- | --- |
| `--background-page` | `#F8F9FC` | Porcelana: fondo global y base de las pantallas. |
| `--surface-raised` | `#FFFFFF` | Blanco: cards, listas, formularios, diálogos y navegación. |
| `--surface-focal` | `#E6EDF9` | Azul de lectura: un bloque principal por pantalla. |
| `--color-action-primary` | `#466AC5` | Azul de decisión: confirmar, crear o avanzar. |
| `--text-primary` | `#091225` | Tinta: títulos, cifras y controles. |
| `--border-subtle` | `#D6DDE8` | Divisores y estructura ligera. |

## 1.2 Semantic Signals

| Token | Color | Uso previsto |
| --- | --- | --- |
| `--color-semantic-income` | `#4D8063` | Avance, ingreso o resultado positivo. |
| `--color-semantic-expense` | `#A25F71` | Gasto, cuidado o salida de recursos. |
| `--color-semantic-attention` | `#94612C` | Atención, plan o recordatorio que requiere revisión. |
| `--color-semantic-context` | `#6F5B9A` | Contexto, pausa o información relacional. |

Las señales semánticas acompañan texto, iconos o etiquetas; nunca son el único indicador de estado.

## 1.3 Button Hierarchy

Los botones primary usan `#466AC5` con texto blanco. Se reservan para la única acción que mueve a la persona hacia adelante o confirma una decisión.

Usar botones primary para la accion que mueve a la persona hacia adelante o confirma una decision:

* Accept
* Confirm
* Save
* Next
* Continue
* Create
* Submit

Los botones secondary usan una superficie neutra clara, borde sutil y tinta. Deben apoyar la acción principal sin competir por la atención.

Usar botones secondary para acciones de apoyo o menor prioridad:

* Cancel
* Go back
* Previous
* Dismiss
* Later
* Edit secondary details

Cuando un boton primary y uno secondary aparezcan juntos, la accion secundaria normalmente debe ir a la izquierda de la accion principal.

## 1.4 Background And Surfaces

El fondo global del contenido debe usar `#F8F9FC`.

La sidebar, las cards, listas y formularios deben usar `#FFFFFF`. El azul pálido `#E6EDF9` se reserva para una única superficie focal por pantalla: una métrica, estado o lectura inicial que merece prioridad.

Esto crea una separación clara entre página y contenido sin depender de bordes o sombras pesadas. Los bordes, cuando sean necesarios, deben ser sutiles y aclarar estructura más que decorar. La distribución orientativa es 70% página clara, 20% superficies blancas y 10% foco, acciones y señales.

## 1.5 Contrast Guidance

Usar un color de texto oscuro sobre estas superficies claras y medias. Color recomendado para texto principal:

| Token | Color |
| --- | --- |
| `text-primary` | `#091225` |
| `text-muted` | `#566378` |

Chequeos de contraste:

| Fondo | Texto | Contraste | Decision |
| --- | --- | --- | --- |
| `#466AC5` primary button | `#FFFFFF` | 5.09:1 | AA para texto normal. |
| `#F8F9FC` page background | `#091225` | 17.73:1 | Contraste fuerte. |
| `#FFFFFF` raised surface | `#091225` | 18.67:1 | Contraste fuerte. |
| `#E6EDF9` focal surface | `#091225` | 15.87:1 | Contraste fuerte. |
| `#4D8063` semantic income | `#FFFFFF` | 4.58:1 | AA; no reducir el texto ni usar peso demasiado fino. |

No sustituir texto, iconos o foco visible por color únicamente.

## 1.6 Implementation Notes

Estos colores deben convertirse en tokens semanticos del tema de la app en vez de usarse directamente en todos los componentes.

Nombres de tokens sugeridos:

```css
:root {
  --background-page: #F8F9FC;
  --surface-raised: #FFFFFF;
  --surface-focal: #E6EDF9;
  --surface-subtle: #F1F4F8;
  --color-action-primary: #466AC5;
  --color-action-secondary: var(--surface-subtle);
  --text-primary: #091225;
  --border-subtle: #D6DDE8;
  --color-semantic-income: #4D8063;
  --color-semantic-expense: #A25F71;
  --color-semantic-attention: #94612C;
  --color-semantic-context: #6F5B9A;
}
```

`--surface-subtle` es un apoyo neutro derivado para selección, hover y acción secundaria; no reemplaza la superficie focal ni introduce una señal semántica nueva.

Los componentes deben referenciar intencion semantica, como `action-primary`, `action-secondary`, `background-page` y `surface-content`, en vez de nombres de paleta como `primary-400`.

---

# 2. Typography

La fuente operativa base del proyecto sera `Azeret Mono`.

Fuente tomada del archivo de Figma "font-life-os". El archivo identifica:

| Propiedad | Valor |
| --- | --- |
| Typeface | `Azeret Mono` |
| Colophon | `Displaay / Martin Vacha` |

## 2.1 Usage Direction

`Azeret Mono` debe tratarse como la tipografia principal de Life OS. La fuente puede reforzar una sensacion de sistema personal, ordenado y operativo, pero debe usarse con cuidado para mantener buena legibilidad.

Usos recomendados:

* Navegacion principal.
* Titulos de secciones funcionales o densas; los encabezados editoriales siguen la excepción acotada de [UI design direction](design_direction.md).
* Labels, estados, fechas y metadatos.
* Botones primary y secondary.
* Texto de UI donde la claridad y estructura sean mas importantes que una lectura larga.

Para textos largos, notas extensas o parrafos densos, validar legibilidad en pantalla antes de confirmar el uso exclusivo de `Azeret Mono`.

## 2.2 Implementation Notes

La fuente debe configurarse como token global de tipografia, no declararse manualmente componente por componente.

Token sugerido:

```css
:root {
  --font-sans: "Azeret Mono", monospace;
}
```

En Next.js, si se usa Google Fonts, el nombre tecnico esperado suele ser `Azeret_Mono`. Confirmar la fuente final disponible antes de implementarla en codigo.

---

# 3. Finance — Expense creation (FIN-02)

> Status: Confirmed UI decision
> Scope: The `Add expense` form in `/finance`. This is a visual-direction decision; it does not change the finance data model or business rules.

## 3.1 Confirmed composition

- **Surface:** Expense creation opens in the existing centered modal. Do not replace it with an anchored sheet, drawer, or a new capture surface. This preserves the modal convention already used by Finance, Quick Add, and the current expense story.
- **Field rhythm:** Keep compact, responsive field pairs where they already help scanning. In particular, Amount and Date remain a pair from the intermediate breakpoint upward and stack only when the viewport requires it. Do not impose a one-column form on larger screens.
- **Actions:** Keep the normal action hierarchy: `Add expense` is the primary confirmation and `Cancel` is the supporting action. Do not introduce a separate “discrete save” treatment.
- **Form content:** Keep Expense name, Amount, Date, Category, Goal, and the optional budget and goal relationships. Budget association remains derived from the expense date and selected budget concept; do not add a separate budget selector.
- **Filters and sorting:** Recompose the existing controls as a distinct, compact functional band, visually separate from the page heading and the expense list. Preserve the available Category, Goal, Tag, and Period filters, sorting options, selected states, and all underlying behavior; this is a presentation change, not a new filtering model.

## 3.2 Behavior and scope to preserve

- Preserve the behavior of the existing Category, Goal, Tag, and Period filters; sorting; selected-expense detail; period totals; and budget calculations. Their visual arrangement may change only as defined by the functional-band direction above.
- Keep editing and removal behavior unchanged. Removal continues to require explicit confirmation.
- This decision does not add tags to the creation form, modify category rules, change budget or goal relationships, or alter deletion behavior.

## 3.3 Implementation and validation boundary

- This FIN-02 record governs the existing `ExpenseForm` composition only. The approved Expenses workspace redesign is recorded in [Finance Expenses Redesign](finance/expenses.md) and may update `finance-workspace.tsx`, `expense-history.tsx`, `expense-row.tsx`, and `expense-detail.tsx` without changing the finance data model or business rules.
- Validate desktop, intermediate, and compact layouts, retaining visible focus, sufficient contrast, keyboard navigation, existing filter/sort behavior, and deletion confirmation.
- Run `npm run lint` and `npm run build` when implementing either visual direction.

---

# 4. Open UX Decisions

Estas decisiones todavia necesitan confirmacion de producto/diseno:

* Estados hover, active, focus y disabled para botones primary y secondary.
* Escala tipografica final para headings, body, labels y botones, incluyendo el rol acotado de `--font-display`.
* Si `Azeret Mono` sera tambien la fuente para textos largos o si se necesitara una fuente secundaria para lectura extendida; esta pregunta no incluye la serif de display ya definida para encabezados.
