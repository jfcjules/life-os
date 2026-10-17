# Life OS — Dirección de diseño de interfaz

> Fecha de registro: 2026-10-16
> Estado: Dirección visual aprobada; pendiente de alcance e implementación.
> Referencia: Biblioteca visual de Life OS.

## Propósito y alcance

Este documento registra la dirección visual que debe acercar Life OS al carácter de la Biblioteca visual: editorial, calmado, intencional y con jerarquía clara.

No modifica funcionalidades, modelos de datos, reglas de espacios ni criterios de aceptación existentes. Tampoco convierte los patrones conceptuales de la Biblioteca visual en comportamiento implementado. Cualquier cambio funcional debe definirse y aprobarse por separado.

## Estado documental y precedencia

La fuente de inspiración es la [Biblioteca visual de Life OS v0.1](https://life-os-biblioteca-visual.jfcjules.chatgpt.site/). Es un archivo de referencias y demostraciones, no una especificación de producto ni una prueba de comportamiento implementado.

- Este documento conserva la autoridad de [UX Decisions](ux_decisions.md) para paleta, contraste y tokens semánticos de color.
- Cuando exista una contradicción sobre tipografía de display, DD-01 de este documento prevalece sobre la guía tipográfica anterior: `Azeret Mono` sigue siendo la fuente operativa; la serif queda limitada a los roles editoriales definidos aquí.
- [Future Work](future_work.md) mantiene la autoridad sobre comportamientos futuros, especialmente espacio activo, sidebar colapsable y personalización de Home. Esta dirección no los adelanta ni los vuelve requisitos implementados.

## Trazabilidad con la Biblioteca visual

Cada referencia debe usarse por su intención visual, no copiando literalmente su contenido o interacción.

| Decisión o tema | Referencia de la Biblioteca | Lectura permitida |
| --- | --- | --- |
| Jerarquía editorial y respiración | Hero, FND—01 «El shell calmado» | Contraste entre orientación, contenido y detalles operativos. |
| Roles y jerarquía de acciones | FND—05 «Acciones con tacto» | Una acción principal y apoyos claramente subordinados. |
| Home y orientación diaria | REF—03 «Resumen que respira» | Una lectura dominante antes de los detalles; no define widgets ni datos nuevos. |
| Personal/Couple | TGH—04 «Dos ritmos, una vista» | El espacio debe ser explícito; no autoriza una vista combinada `All`. |
| Finance | REF—07 «Gasto, sin ansiedad» | El balance o la lectura principal anteceden a la enumeración de cifras. |
| Confirmaciones compartidas | TGH—08 «Pausa para decidir juntos» | Las decisiones con efecto requieren una pausa clara; el flujo real se define por módulo. |

## Diagnóstico de la interfaz actual

Life OS ya comparte la base cromática de la dirección deseada:

- Fondo azul grisáceo y tinta oscura para una lectura serena.
- Azul de acción y acentos verde, lila, rosa y ámbar con significado semántico.
- Bordes sutiles, esquinas suaves y sombras moderadas.

La diferencia principal no es la paleta: es la jerarquía. La interfaz actual usa la tipografía monoespaciada y contenedores tipo tarjeta casi en todos los niveles. Eso hace que las pantallas sean funcionales, pero reduce el contraste entre orientación, contenido importante y detalles operativos.

## Dirección acordada

### DD-01 — Dos roles tipográficos

Mantener `Azeret Mono` para interfaz, navegación, fechas, cantidades, filtros, formularios, tablas y listas. Su función es dar precisión y consistencia operativa.

Incorporar una familia serif de display —la referencia inicial es `Georgia, "Times New Roman", serif`, como en la Biblioteca visual— para títulos de página, encabezados de secciones importantes y una métrica verdaderamente prioritaria por pantalla cuando aporte contexto.

La serif no se usa en campos de captura, filas densas, controles, etiquetas, cantidades comparables ni textos largos. El objetivo es crear contraste de jerarquía, no transformar Life OS en una landing page.

Antes de aplicarla en código, el rol se expresa como un token separado, con el fallback de referencia mientras se valida una fuente final:

```css
--font-display: Georgia, "Times New Roman", serif;
```

La revisión visual debe definir para cada módulo qué título recibe ese rol, su tamaño, interlineado y límite de líneas. No se adopta una segunda fuente para texto largo mediante esta decisión.

### DD-02 — Sistema de color aprobado y distribución controlada

Life OS adopta la paleta documentada en la Biblioteca visual y en [UX Decisions](ux_decisions.md): porcelana `#F8F9FC` para la página, blanco `#FFFFFF` para superficies elevadas, azul pálido `#E6EDF9` para la lectura focal, azul de decisión `#466AC5`, tinta `#091225` y divisor `#D6DDE8`.

La aplicación debe usar más espacio de fondo y menos bloques azulados permanentes. El azul de acción señala una decisión; las señales semánticas explican estado o categoría; una superficie tonal se reserva para el bloque focal de cada pantalla. Los demás elementos deben respirar sobre el fondo de página o una superficie blanca elevada.

### DD-03 — Jerarquía editorial en los encabezados

Cada módulo puede usar esta composición, adaptada al nivel de densidad de la pantalla:

1. Etiqueta monoespaciada pequeña para módulo, contexto o índice.
2. Título principal serif, con una línea de propósito breve cuando sea útil.
3. Acciones y filtros en una franja funcional separada, no compitiendo con el título.

No todos los encabezados necesitan el mismo tamaño. Una vista de lista o formulario compacto debe conservar una jerarquía contenida; Home, Calendar y el resumen de Finance son los lugares donde la composición editorial aporta más valor.

### DD-04 — Menos superficies anidadas

Los `Panel` y `Card` no deben envolver automáticamente cada grupo de información. Por pantalla, debe existir un bloque focal con mayor presencia y solo las tarjetas secundarias necesarias para escanear o actuar.

En particular:

- Evitar una tarjeta de resumen dentro de un panel tonal que ya está dentro de otra superficie visual.
- Reservar sombra visible para acciones, diálogos o elementos seleccionados.
- Usar divisores finos, espaciado y tipografía para agrupar antes de añadir un borde.
- Conservar las esquinas suaves actuales; el cambio buscado es de ritmo y jerarquía, no de forma geométrica.

### DD-05 — Sidebar silenciosa y contexto de espacio inequívoco

La sidebar debe conservar la navegación persistente, pero perder peso visual frente al contenido. La meta es una navegación más silenciosa: fondo más cercano al de la página, divisores finos, marca compacta y estados activos precisos.

El selector Personal/Couple sigue siendo global y visible. Su nuevo tratamiento visual no debe duplicar selectores locales ni modificar la regla de que el espacio activo determina qué datos, totales, widgets y acciones se muestran o crean.

La posible sidebar colapsable sigue siendo trabajo futuro. Esta dirección solo define cómo debe sentirse la variante expandida y no autoriza cambios de comportamiento de navegación.

### DD-06 — Home es la primera pantalla a rediseñar

Home debe pasar de un estado vacío genérico a una pantalla de orientación diaria. La estructura propuesta es:

- Un encabezado editorial que diga qué importa ahora.
- Un bloque principal con la prioridad, siguiente evento o estado del día.
- Pocas piezas secundarias: resumen breve, acceso rápido y recordatorios próximos.
- Quick actions visibles pero subordinadas a la lectura del día.

El contenido debe respetar el espacio activo y las preferencias de personalización futuras. Esta decisión de diseño complementa FW-03; no define todavía qué widgets se implementarán ni cómo se configurarán.

El bloque principal solo puede mostrar una prioridad, un evento o un recordatorio cuando ese dato ya exista en el alcance aprobado y corresponda al espacio activo. Si no existe, se debe diseñar un estado vacío o de orientación sin inventar una fuente de datos, automatización o nueva quick action.

### DD-07 — Calendar debe priorizar la agenda

Calendar debe tratar la línea de tiempo del día como su superficie dominante. Los elementos conectados, resúmenes semanales y estados vacíos se presentan como soporte, no como paneles de peso equivalente.

La pantalla puede usar el encabezado editorial, una agenda vertical con ritmo tipográfico y señales de color para relaciones o categorías. Los filtros, cambio Today/Week y creación de eventos conservan un tratamiento de control compacto y legible.

### DD-08 — Finance debe contar una historia antes de enumerar cifras

Finance debe tener una lectura inicial clara: período seleccionado, balance y la relación entre income, expenses y savings. Esa lectura puede vivir en una sola superficie principal; las métricas secundarias, la gráfica y los detalles operativos la acompañan sin competir con ella.

Las filas de expenses, filtros, periodos, edición y acciones destructivas mantienen su densidad funcional y tipografía monoespaciada. La dirección visual no cambia los cálculos, la propiedad de los registros ni los controles existentes.

## Detalles recurrentes que sí se adoptan

- Etiquetas pequeñas en mayúsculas monoespaciadas para contexto, conteo o estado.
- Divisores de baja intensidad en lugar de más contenedores.
- Un punto, color o pequeño indicador para señalar estado antes de recurrir a una etiqueta grande.
- Estados activos claros mediante superficie elevada, borde o sombra sutil, no mediante color intenso en todos los controles.
- Movimiento corto y discreto en hover o apertura; nunca animación decorativa que entorpezca tareas repetitivas.

## Criterios de validación antes de extender la dirección

- **Legibilidad y jerarquía:** validar que la serif aparece solo en el título o métrica focal y que las listas, filtros, cantidades y formularios conservan lectura monoespaciada operativa.
- **Accesibilidad:** conservar foco visible, contraste de texto y controles según [UX Decisions](ux_decisions.md), objetivos táctiles adecuados y alternativa sin movimiento cuando la persona prefiera reducir animaciones.
- **Responsive:** revisar como mínimo la pantalla compacta, una pantalla intermedia y escritorio; la composición editorial puede reordenarse, pero no debe ocultar contexto de espacio, acciones ni controles.
- **Alcance:** confirmar contra la historia o especificación del módulo que ningún mockup, tarjeta o flujo de la Biblioteca haya añadido datos, filtros, automatizaciones o criterios de aceptación no aprobados.
- **Revisión por pantalla:** no extender un patrón tras aprobarlo solo en teoría. Cada módulo debe compararse visualmente con su contenido real antes de reutilizarlo.

## Límites de la dirección

- No usar títulos serif grandes en tablas, formularios, listas extensas ni controles de alta frecuencia.
- No trasladar literalmente la estructura de una página de presentación a una aplicación diaria.
- No reemplazar los patrones de filtros aprobados por botones genéricos; se conservan su forma, estados y responsividad.
- No presentar las ideas futuras de Home, sidebar o espacio activo como comportamiento ya implementado.
- Todo cambio de UI debe conservar accesibilidad, legibilidad, foco visible y comportamiento responsive.

## Secuencia recomendada cuando se autorice la implementación

1. Crear tokens de tipografía display y variantes reutilizables de encabezado, superficie y etiqueta contextual.
2. Aplicar la nueva jerarquía a Home, sin definir funcionalidades nuevas fuera de las ya documentadas.
3. Aplicar la composición a Calendar.
4. Aplicar la composición a Finance, preservando controles y cálculos.
5. Ajustar sidebar y componentes compartidos después de validar las tres pantallas principales.

Cada etapa debe revisarse visualmente antes de extender la dirección a los demás módulos.
