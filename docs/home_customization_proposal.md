# Life OS — Propuesta inicial: Home personalizable

> Estado: Propuesta de producto y arquitectura conceptual; no implementada.
> Fecha: 2026-10-31
> Alcance: Personalización del dashboard/overview de Home. No autoriza cambios de código, datos ni entregas.
> Relación: Desarrolla la intención de [FW-03](future_work.md); no cambia su estatus de trabajo futuro ni la precedencia de las decisiones existentes.

---

## 1. Objetivo

Proponer que Home sea un dashboard personalizable de orientación diaria: cada persona elige qué resúmenes de módulos existentes quiere ver, los agrega o quita, define un tamaño permitido y decide su orden.

Home sigue siendo un agregador de información, no una base de datos paralela ni un dashboard analítico de alta densidad. Los widgets deben reutilizar las fuentes y resúmenes que ya pertenecen a cada módulo; Home no crea cálculos, registros, reglas de filtrado ni flujos especiales.

Esta propuesta complementa, pero no reemplaza:

- `FW-03`, que mantiene la personalización de Home como trabajo futuro y deja abierta la relación entre preferencias y espacios.
- `FW-02`, que exige que datos, totales, resúmenes, widgets y acciones correspondan al espacio activo cuando esa dirección se implemente.
- `DD-06` de [UI design direction](design_direction.md), que pide una lectura diaria dominante, pocas piezas secundarias y estados vacíos sin inventar datos.

El Home v1 y Concept A existentes son antecedentes visuales y de composición. No prueban que los widgets, Quick Add ni su configuración descritos allí sean comportamiento confirmado.

## 2. Principios de la propuesta

1. **Reutilizar antes que duplicar.** Cada widget adapta una lectura existente de su módulo. No se construye una lógica de negocio, almacenamiento o cálculo exclusiva de Home.
2. **Orientación, no saturación.** La selección inicial debe ser pequeña y útil. La cuadrícula no debe convertir Home en una pared de métricas ni desplazar la prioridad diaria definida por DD-06.
3. **Personalización con límites claros.** La persona puede elegir, quitar, ordenar y cambiar entre tamaños predeterminados, pero no colocar elementos en coordenadas arbitrarias ni definir ancho y alto libres.
4. **Vista limpia fuera de edición.** Los controles de configuración solo aparecen en un modo editar explícito; la lectura normal prioriza contenido y navegación hacia el módulo de origen.
5. **Accesibilidad y estabilidad primero.** V1 usa controles alcanzables por teclado —mover arriba, mover abajo y cambiar tamaño— con etiquetas y confirmación de estado. El drag-and-drop no es necesario para personalizar.
6. **El espacio activo gobierna el contenido.** Un widget no combina datos de Personal y Couple ni redefine filtros del módulo. La decisión pendiente es si la *preferencia de composición* se comparte o se guarda por espacio.
7. **Compatibilidad desde el inicio.** La configuración se versiona, se valida al cargar y tolera widgets retirados o que ya no estén disponibles.

## 3. Experiencia propuesta para V1

### 3.1 Lectura normal de Home

Fuera del modo editar, Home muestra únicamente la composición elegida y sus estados de contenido. Cada widget conserva una ruta o acción de lectura hacia su módulo de origen cuando corresponda. No muestra asas de arrastre, selectores de tamaño ni acciones de eliminación.

El Home normal conserva una jerarquía editorial: una lectura prioritaria del día y una cantidad limitada de widgets secundarios. Si una fuente no tiene datos, el widget debe reutilizar un estado vacío aprobado por su módulo o uno de orientación que no fabrique contenido.

### 3.2 Modo editar

Una acción explícita, por ejemplo `Editar Home`, entra y sale del modo editar sin cambiar los datos de los módulos. En ese modo la persona puede:

- Abrir un catálogo de widgets disponibles.
- Agregar un widget permitido.
- Quitar un widget ya seleccionado.
- Moverlo una posición arriba o abajo en la secuencia.
- Elegir uno de sus tamaños permitidos: pequeño, mediano o grande.

Los cambios actualizan la composición guardada: widgets elegidos, orden y tamaño. La interacción final de guardado —inmediata o mediante una acción de confirmar— queda pendiente de decidir, pero debe comunicar claramente que la preferencia se guardó o que no se aplicó.

### 3.3 Catálogo inicial

El catálogo presenta nombre, propósito, módulo de origen, tamaños disponibles y estado de disponibilidad. Su primera selección debe limitarse a lecturas que tengan una fuente confirmada. Ejemplos de candidatos, no compromisos de implementación, son:

| Candidato | Módulo o fuente | Lectura que podría reutilizar | Estado en esta propuesta |
| --- | --- | --- | --- |
| Resumen de gastos del mes | Finance | Total y resumen ya definidos para el periodo activo | Candidato prioritario si se expone una lectura reutilizable. |
| Próximos recordatorios | Reminders | Elementos próximos del módulo | Candidato sujeto a la fuente y estado vacío del módulo. |
| Próximos eventos | Calendar | Agenda o próximos eventos del módulo | Candidato sujeto a la fuente y estado vacío del módulo. |
| Notas | Notes | Resumen de notas recientes o fijadas | Candidato futuro; no crea Notes ni su modelo de datos. |
| Hábitos | Habits | Progreso o próximos hábitos | Candidato futuro; no crea Habits ni su modelo de datos. |

V1 no presupone que todos los candidatos estén disponibles. Un widget se incorpora al catálogo solo después de que su módulo, lectura y estados estén definidos; la ausencia de un módulo no se resuelve con datos de ejemplo ni con una implementación especial de Home.

## 4. Restricciones de tamaños y layout

La composición es una cuadrícula responsive de ranuras y tamaños semánticos. No es un lienzo libre.

| Tamaño | Intención | Restricción propuesta |
| --- | --- | --- |
| Pequeño | Lectura breve o acceso a un dato puntual | Ocupa una ranura compacta; no admite contenido que requiera una lista o gráfica extensa. |
| Mediano | Resumen operativo | Ocupa dos ranuras compactas equivalentes; sirve para una lectura breve con contexto. |
| Grande | Lectura principal o lista resumida | Ocupa el ancho disponible de una fila lógica; debe seguir siendo un resumen y enlazar al módulo para el detalle. |

Reglas de layout:

- El registro de cada widget declara qué tamaños admite; no todos deben soportar los tres.
- En escritorio, la cuadrícula puede distribuir pequeño, mediano y grande en una fila de varias columnas. En ancho intermedio reduce columnas; en compacto todos ocupan el ancho disponible y conservan su orden lógico.
- El tamaño expresa prioridad y densidad, no una coordenada ni dimensiones ajustables por píxeles.
- El motor coloca widgets por su `order` secuencial, llena espacios de manera predecible y evita huecos intencionales o solapamientos.
- Cambiar tamaño o mover arriba/abajo puede reacomodar las filas, pero nunca cambia los datos mostrados ni el contexto del espacio activo.
- Los puntos de corte exactos, alturas de plantilla y número de columnas son decisiones de diseño/implementación posteriores. No se fijan aquí sin una revisión visual con contenido real.

## 5. Arquitectura conceptual de configuración

### 5.1 Registro central de widgets

La propuesta usa un catálogo o registro central, no condicionales dispersos dentro de Home. Cada definición de widget debe declarar, de forma conceptual:

- Identificador estable y versión de la definición.
- Módulo de origen, título, descripción y estado de disponibilidad.
- Tamaño predeterminado y conjunto de tamaños permitidos.
- Lectura o adaptador del módulo que consume, incluidos sus estados de carga, vacío o no disponible.
- Reglas de visibilidad compatibles con el espacio activo y con las capacidades reales del módulo.
- Estrategia de compatibilidad o migración cuando cambie o se retire.

El contrato común permite que Home solo organice instancias. Cada módulo conserva la propiedad de sus consultas, cálculos, permisos, filtros, enlaces y estados vacíos. Un widget no debe escribir datos de otro módulo.

### 5.2 Configuración guardada

Como mínimo, la preferencia persistida necesita guardar la versión de esquema y, por cada widget elegido, un identificador de la definición, su orden y su tamaño. Conceptualmente:

```text
HomeConfiguration
  schemaVersion
  widgets[]
    widgetId
    order
    size
    optional widget-specific preferences
```

El mecanismo de almacenamiento, sincronización y asociación con una cuenta no está decidido por este documento. La configuración debe tratarse como una preferencia de interfaz; no sustituye ni replica datos de Finance, Calendar, Reminders u otros módulos.

La configuración debe validar estos límites al guardar y al leer:

- `widgetId` existe y está habilitado en el registro.
- `size` pertenece a los tamaños permitidos por ese widget.
- `order` produce una secuencia determinista.
- Los valores desconocidos o de versiones anteriores se migran o se ignoran de forma segura, sin impedir que Home cargue.

### 5.3 Esquema y widgets retirados

`schemaVersion` permite migrar configuraciones en vez de asumir que toda persona tiene el formato más nuevo. El registro también debe poder marcar un widget como activo, temporalmente no disponible o retirado.

Al encontrar una instancia retirada o inválida:

1. Home no debe fallar ni mostrar contenido inventado.
2. La vista normal puede ocultarla de forma segura y conservar el resto de la composición.
3. El modo editar debe explicar que el widget ya no está disponible y ofrecer quitarlo.
4. Una migración explícita puede reemplazarlo solo si existe una equivalencia aprobada; no debe elegir un widget distinto silenciosamente.

Esto mantiene el modelo compatible con una futura implementación de drag-and-drop: ese gesto solo actualizaría el mismo campo `order`, sin introducir coordenadas nuevas ni romper preferencias existentes.

## 6. Alcance excluido de V1

Esta propuesta no incluye:

- Implementación de código, migración de datos, persistencia, sincronización, pruebas ni entrega.
- Un lienzo libre, posicionamiento absoluto, redimensionamiento por píxeles o solapamiento de widgets.
- Drag-and-drop como requisito de la primera versión.
- Crear módulos, entidades o datos de ejemplo para Notes, Habits, Reminders, Calendar u otra fuente que aún no tenga una lectura confirmada.
- Nuevos cálculos, filtros, permisos o reglas de negocio exclusivas de Home.
- Personalización de sidebar, navegación global o Quick Add. FW-03 la mantiene como posibilidad futura, no como parte de esta V1.
- Vista combinada `All` o comportamiento que contradiga la futura regla de espacio activo de FW-02.

## 7. Evolución futura posible

Una vez validada V1 con controles explícitos, se podría evaluar:

- Drag-and-drop accesible como atajo adicional para reordenar, manteniendo mover arriba/abajo como alternativa estable.
- Ajustes propios de un widget cuando su módulo tenga un contrato claro, por ejemplo un rango de tiempo permitido.
- Plantillas iniciales o sugerencias basadas en módulos que ya tengan contenido, siempre editables por la persona.
- Preferencias independientes por espacio, si se confirma que Personal y Couple requieren composiciones distintas.
- Sincronización entre dispositivos, historial de cambios o recuperación de una composición predeterminada.
- Nuevos widgets a medida que Notes, Habits u otros módulos estén definidos y tengan fuentes reutilizables.

Ninguna de estas posibilidades está confirmada como alcance de producto o implementación.

## 8. Preguntas y decisiones pendientes

| Tema | Decisión pendiente |
| --- | --- |
| Alcance de la preferencia | ¿Una composición por persona se comparte entre Personal y Couple, o se guarda una por espacio? FW-03 lo deja abierto. |
| Selección de V1 | ¿Qué lecturas de Finance, Calendar y Reminders están listas para reutilizar sin crear adaptaciones de negocio? |
| Duplicados | ¿Un tipo de widget puede añadirse más de una vez con configuraciones distintas, o V1 limita una instancia por definición? |
| Guardado | ¿Los controles aplican y guardan de inmediato o existe una confirmación al salir del modo editar? |
| Recuperación | ¿Debe existir una composición inicial/restablecer valores predeterminados y cómo se presenta sin borrar datos de módulos? |
| Retiro de widgets | ¿Cuánto tiempo se conserva una configuración retirada antes de eliminarla tras una migración aprobada? |
| Diseño responsive | ¿Cuáles son las alturas y puntos de corte finales para cada tamaño tras validar contenido real en escritorio, intermedio y compacto? |

## 9. Criterio para autorizar implementación posterior

Antes de implementar, una historia posterior debe confirmar el conjunto de widgets V1, el alcance por espacio, el destino de la configuración, los contratos de cada fuente y la experiencia de guardado. La implementación deberá preservar las reglas y datos de los módulos, validar teclado/foco/lectores de pantalla, revisar el layout responsive y tratar estados vacíos o widgets retirados sin fallos.
