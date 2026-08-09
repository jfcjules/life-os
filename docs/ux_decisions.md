# Life OS UX Decisions

> Status: Active UX direction
> Document type: UX decisions / visual system source of truth
> Last updated: August 7, 2026
> Sources: Figma files "Paleta life-os" and "font-life-os"

---

# 1. Color System

Estos colores definen la primera direccion visual de Life OS. Deben tratarse como decisiones de UX del producto, no como estilos aislados.

La interfaz debe sentirse calmada, organizada, suave y clara. El color debe ayudar a entender jerarquia y prioridad de acciones sin hacer que la app se sienta ruidosa.

## 1.1 Core Tokens

| Token | Color | Uso previsto |
| --- | --- | --- |
| `primary` | `#5F80D4` | Botones de accion primaria: accept, confirm, save, continue, next, submit, create y otras acciones principales de avance. |
| `secondary` | `#CFD9F2` | Botones secundarios: cancel, go back, dismiss, previous, later y acciones de apoyo que suelen ir a la izquierda de la accion principal. |
| `page-background` | `#E9ECF2` | Fondo general del contenido de la pagina. Debe ser la base de pantallas completas y areas principales de la app. |
| `content-surface` | `#E3E9F7` | Relleno de cards, paneles, secciones, formularios y otros elementos que contienen contenido. |

## 1.2 Button Hierarchy

Los botones primary usan `#5F80D4` como color principal de relleno.

Usar botones primary para la accion que mueve a la persona hacia adelante o confirma una decision:

* Accept
* Confirm
* Save
* Next
* Continue
* Create
* Submit

Los botones secondary usan `#CFD9F2` como color principal de relleno.

Usar botones secondary para acciones de apoyo o menor prioridad:

* Cancel
* Go back
* Previous
* Dismiss
* Later
* Edit secondary details

Cuando un boton primary y uno secondary aparezcan juntos, la accion secundaria normalmente debe ir a la izquierda de la accion principal.

## 1.3 Background And Surfaces

El fondo global del contenido debe usar `#E9ECF2`.

Las cards y contenedores de contenido deben usar `#E3E9F7`.

Esto crea una separacion suave entre pagina y contenido sin depender de bordes o sombras pesadas. Los bordes, cuando sean necesarios, deben ser sutiles y aclarar estructura mas que decorar.

## 1.4 Contrast Guidance

Usar un color de texto oscuro sobre estas superficies claras y medias. Color recomendado para texto principal:

| Token | Color |
| --- | --- |
| `text-primary` | `#081120` |
| `text-muted` | `#2D3542` |

Chequeos de contraste:

| Fondo | Texto | Contraste | Decision |
| --- | --- | --- | --- |
| `#5F80D4` primary button | `#081120` | 4.97:1 | Aceptable para texto normal. |
| `#5F80D4` primary button | `#FFFFFF` | 3.80:1 | Evitar en texto normal de botones; solo usar en texto grande o bold. |
| `#CFD9F2` secondary button | `#081120` | 13.37:1 | Contraste fuerte. |
| `#E9ECF2` page background | `#081120` | 15.97:1 | Contraste fuerte. |
| `#E3E9F7` content surface | `#081120` | 15.53:1 | Contraste fuerte. |

Si un boton primary debe usar texto blanco por razones visuales o de marca, usar una variante mas oscura para el relleno en lugar de `#5F80D4`.

## 1.5 Implementation Notes

Estos colores deben convertirse en tokens semanticos del tema de la app en vez de usarse directamente en todos los componentes.

Nombres de tokens sugeridos:

```css
:root {
  --color-action-primary: #5F80D4;
  --color-action-secondary: #CFD9F2;
  --color-background-page: #E9ECF2;
  --color-surface-content: #E3E9F7;
  --color-text-primary: #081120;
  --color-text-muted: #2D3542;
}
```

Los componentes deben referenciar intencion semantica, como `action-primary`, `action-secondary`, `background-page` y `surface-content`, en vez de nombres de paleta como `primary-400`.

---

# 2. Typography

La fuente base del proyecto sera `Azeret Mono`.

Fuente tomada del archivo de Figma "font-life-os". El archivo identifica:

| Propiedad | Valor |
| --- | --- |
| Typeface | `Azeret Mono` |
| Colophon | `Displaay / Martin Vacha` |

## 2.1 Usage Direction

`Azeret Mono` debe tratarse como la tipografia principal de Life OS. La fuente puede reforzar una sensacion de sistema personal, ordenado y operativo, pero debe usarse con cuidado para mantener buena legibilidad.

Usos recomendados:

* Navegacion principal.
* Titulos de secciones.
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

# 3. Open UX Decisions

Estas decisiones todavia necesitan confirmacion de producto/diseno:

* Estados hover, active, focus y disabled para botones primary y secondary.
* Color de borde para cards e inputs.
* Si los botones primary deben usar texto oscuro por default o una variante primary mas oscura con texto blanco.
* Colores de error, warning, success e info.
* Escala tipografica final para headings, body, labels y botones usando `Azeret Mono`.
* Si `Azeret Mono` sera tambien la fuente para textos largos o si habra una fuente secundaria para lectura extendida.
