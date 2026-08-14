# Calendar Implementation Checklist

Fecha de arranque sugerida: viernes 14 de agosto de 2026.

Objetivo: convertir el mockup actual de Calendar en funcionalidades reales, trabajando user story por user story, con commits pequenos y verificables.

## 0. Punto de partida

- [ ] Confirmar que el repo local abre bien en Visual Studio Code.
- [ ] Confirmar que Docker, Git y Node estan disponibles.
- [ ] Confirmar que el repo remoto en GitHub esta conectado.
- [ ] Revisar el estado actual del repo:

```bash
git status
```

- [ ] Identificar cambios ya existentes y decidir si se quedan en un commit base.
- [ ] Correr la app local:

```bash
npm run dev
```

- [ ] Abrir Calendar en el navegador y tomar como referencia el mockup actual.

## 1. Congelar la base actual

- [ ] Revisar cambios sin commitear.
- [ ] Confirmar que los cambios actuales corresponden al mockup/documentacion base.
- [ ] Correr lint antes de guardar la base:

```bash
npm run lint
```

- [ ] Correr build si lint pasa:

```bash
npm run build
```

- [ ] Hacer commit base si todo esta correcto:

```bash
git add .
git commit -m "chore(calendar): capture calendar mockup and stories baseline"
```

- [ ] Subir la branch si aplica:

```bash
git push
```

## 2. Crear branch de trabajo

- [ ] Crear una branch para la primera historia real:

```bash
git switch -c codex/calendar-us-02-todays-events
```

- [ ] Confirmar que se esta trabajando en la branch correcta:

```bash
git branch --show-current
```

## 3. Elegir la primera user story

Primera historia recomendada:

- [ ] `US-02 - View today's events`

Razon: es read-only, valida la estructura visual, el modelo de datos y los componentes sin meterse todavia en formularios, modal, validaciones o persistencia.

Archivos de referencia:

- [ ] `docs/user_stories/calendar/us-02-view-todays-events.md`
- [ ] `src/app/calendar/page.tsx`
- [ ] `src/components/design-system/`

## 4. Preparar modelo de datos de Calendar

- [ ] Crear carpeta de feature:

```text
src/features/calendar/
```

- [ ] Crear tipos base:

```text
src/features/calendar/types.ts
```

- [ ] Definir `CalendarEvent`.
- [ ] Definir `CalendarSpace` con valores `Personal` y `Couple`.
- [ ] Definir `CalendarRelation` con valores iniciales:
  - `Reminder`
  - `Chore`
  - `Finance`
  - `Pet`
- [ ] Definir campos minimos del evento:
  - `id`
  - `title`
  - `startsAt`
  - `endsAt` opcional
  - `space`
  - `relation`
  - `location`
  - `people`
- [ ] Crear seed data temporal:

```text
src/features/calendar/data.ts
```

- [ ] Mover los eventos hardcodeados de `page.tsx` hacia `data.ts`.
- [ ] Ordenar eventos por hora usando `startsAt`.
- [ ] Mantener datos simples mientras no exista persistencia real.

## 5. Extraer componentes reales desde el mockup

- [ ] Crear carpeta de componentes de Calendar:

```text
src/features/calendar/components/
```

- [ ] Extraer `CalendarTimeline`.
- [ ] Extraer `CalendarEventRow`.
- [ ] Extraer `CalendarSpaceFilter`.
- [ ] Extraer `CalendarViewToggle`.
- [ ] Extraer `WeekPreview`.
- [ ] Extraer `ConnectedItemsPanel`.
- [ ] Extraer chips/badges si se repiten mucho.
- [ ] Dejar `src/app/calendar/page.tsx` como composicion de alto nivel.
- [ ] Mantener el estilo alineado con `src/components/design-system/`.

## 6. Implementar US-02 - View today's events

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Mostrar una seccion claramente etiquetada como `Today's events`.
- [ ] Mostrar la fecha visible del dia actual.
- [ ] Mostrar eventos de hoy.
- [ ] Ordenar eventos por hora ascendente.
- [ ] Mostrar por evento:
  - [ ] Hora
  - [ ] Titulo
  - [ ] Space
  - [ ] Relation/tag
  - [ ] Location
  - [ ] People
- [ ] Manejar estado vacio cuando no haya eventos.
- [ ] Confirmar que no se implementan cosas fuera de scope de US-02.
- [ ] Revisar responsive en desktop y mobile.
- [ ] Correr verificacion:

```bash
npm run lint
npm run build
```

- [ ] Commit de US-02:

```bash
git add .
git commit -m "feat(calendar): show todays events"
```

## 7. Implementar US-05 - Filter calendar by space

- [ ] Crear estado de filtro: `All`, `Personal`, `Couple`.
- [ ] Conectar los botones existentes del filtro a estado real.
- [ ] Filtrar eventos visibles segun el space seleccionado.
- [ ] Actualizar `aria-pressed` correctamente.
- [ ] Mostrar empty state si el filtro no tiene eventos.
- [ ] Confirmar que el filtro afecta solo lo que esta dentro del scope.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): filter events by space"
```

## 8. Implementar US-03 - Assign event to a space

- [ ] Confirmar que todos los eventos tienen `space`.
- [ ] Mostrar visualmente si un evento es `Personal` o `Couple`.
- [ ] Hacer que los eventos compartidos sean faciles de identificar.
- [ ] Preparar el tipo para que el formulario de Add event pueda elegir space despues.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): mark events by space"
```

## 9. Implementar US-04 - Add tags or relationship labels

- [ ] Confirmar lista MVP de labels:
  - `Reminder`
  - `Chore`
  - `Finance`
  - `Pet`
- [ ] Mostrar label en cada evento.
- [ ] Usar estilos consistentes para cada label.
- [ ] Evitar categorias fuera del MVP.
- [ ] Preparar el tipo para que el formulario de Add event pueda elegir label despues.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): show event relationship labels"
```

## 10. Implementar US-01 - Create new calendar event

- [ ] Crear modal o panel de Add event.
- [ ] Abrirlo desde el boton `Add event`.
- [ ] Permitir cancelar sin guardar.
- [ ] Definir campos requeridos:
  - [ ] Title
  - [ ] Date
  - [ ] Start time
  - [ ] Space
- [ ] Definir campos opcionales:
  - [ ] End time
  - [ ] Location
  - [ ] People
  - [ ] Relation/tag
- [ ] Validar que los campos requeridos existan.
- [ ] Crear evento en estado local.
- [ ] Insertar el evento en la timeline ordenada.
- [ ] Limpiar el formulario despues de guardar.
- [ ] No implementar sync, calendario externo ni backend todavia.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): create local events"
```

## 11. Decidir persistencia MVP

Opcion recomendada para esta etapa:

- [ ] Empezar con estado en React.
- [ ] Agregar `localStorage` si se necesita que sobreviva al refresh.
- [ ] Posponer base de datos hasta tener claro login, usuarios y sync.

Si se usa `localStorage`:

- [ ] Cargar eventos guardados al abrir Calendar.
- [ ] Guardar cambios cuando se cree un evento.
- [ ] Mantener seed data solo como fallback/demo.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): persist local events"
```

## 12. Implementar US-06 - Connected items

- [ ] Revisar la historia y scope.
- [ ] Definir estructura de `ConnectedItem`.
- [ ] Relacionar connected items con eventos proximos.
- [ ] Mostrar tipo, due text y space.
- [ ] Mantenerlo como data local por ahora.
- [ ] No implementar integraciones reales con Reminders, Chores o Finance todavia.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(calendar): show connected preparation items"
```

## 13. Definition of Done por cada historia

Cada user story se considera lista solo si:

- [ ] Cumple todos sus Acceptance Criteria.
- [ ] No incluye features fuera de scope.
- [ ] Se ve bien en desktop.
- [ ] Se ve bien en mobile.
- [ ] No rompe navegacion del app shell.
- [ ] Usa componentes existentes cuando aplican.
- [ ] Tiene tipos claros.
- [ ] `npm run lint` pasa.
- [ ] `npm run build` pasa.
- [ ] Tiene commit propio.

## 14. Checklist diaria de trabajo

Antes de empezar:

- [ ] Pull/revisar remoto si corresponde.
- [ ] Confirmar branch activa.
- [ ] Leer la user story del dia.
- [ ] Leer Acceptance Criteria.
- [ ] Abrir la ruta de Calendar localmente.

Durante:

- [ ] Trabajar en cambios pequenos.
- [ ] Probar visualmente despues de cada bloque importante.
- [ ] No mezclar dos historias grandes en el mismo commit.
- [ ] Anotar decisiones abiertas en docs si aparecen.

Antes de cerrar:

- [ ] Correr lint.
- [ ] Correr build.
- [ ] Revisar `git diff`.
- [ ] Commit.
- [ ] Push si ya esta estable.
- [ ] Anotar siguiente paso.

## 15. Primer bloque recomendado para manana

Duracion sugerida: 60 a 90 minutos.

- [ ] Abrir repo en VS Code.
- [ ] Revisar `git status`.
- [ ] Correr `npm run dev`.
- [ ] Abrir Calendar.
- [ ] Leer `US-02`.
- [ ] Crear branch `codex/calendar-us-02-todays-events`.
- [ ] Crear `src/features/calendar/types.ts`.
- [ ] Crear `src/features/calendar/data.ts`.
- [ ] Mover eventos hardcodeados desde `src/app/calendar/page.tsx`.
- [ ] Renderizar eventos desde data tipada.
- [ ] Correr `npm run lint`.
- [ ] Si todo pasa, hacer primer commit de la historia.

## 16. Orden recomendado de historias

- [ ] US-02 - View today's events
- [ ] US-05 - Filter calendar by space
- [ ] US-03 - Assign event to a space
- [ ] US-04 - Add tags or relationship labels
- [ ] US-01 - Create new calendar event
- [ ] US-06 - Show connected items for upcoming events

## 17. Decisiones abiertas para no bloquear manana

- [ ] Default view: Today o Week.
- [ ] Si `Couple` se mantiene como unico shared space del MVP.
- [ ] Si `Pet` entra como relation label desde el primer release.
- [ ] Si recurrence entra en US-01 o se pospone.
- [ ] Si se usara `localStorage` antes de backend.
- [ ] Si se necesita vista Month en esta etapa o queda fuera.
