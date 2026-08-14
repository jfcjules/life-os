# Calendar Implementation Checklist

Fecha de arranque sugerida: viernes 14 de agosto de 2026.

Objetivo: convertir el mockup actual de Calendar en funcionalidades reales, trabajando user story por user story, con commits pequenos y verificables.

## Estado de cierre

- [x] Calendar MVP implementado con eventos de hoy, filtros por space, labels, modal de creacion local, persistencia en `localStorage` y connected items.
- [x] Verificaciones locales completadas: `npm run lint`, `npm run build` y `GET /calendar` con status 200.
- [x] Servidor local levantado en `http://localhost:3000/calendar`.
- [x] Branch publicada en GitHub.
- [ ] PR pendiente de creacion.
- Nota: `AGENTS.md` queda fuera del scope de Calendar y no se incluye en los commits/PR.
- Nota: US-03 y US-04 estan implementadas funcionalmente, pero no tienen commit propio separado; quedaron cubiertas por los commits de modelo, timeline y formulario.

## 0. Punto de partida

- [ ] Confirmar que el repo local abre bien en Visual Studio Code.
- [x] Confirmar que Docker, Git y Node estan disponibles.
- [x] Confirmar que el repo remoto en GitHub esta conectado.
- [x] Revisar el estado actual del repo:

```bash
git status
```

- [x] Identificar cambios ya existentes y decidir si se quedan en un commit base.
- [x] Correr la app local:

```bash
npm run dev
```

- [x] Abrir Calendar en el navegador y tomar como referencia el mockup actual.

## 1. Congelar la base actual

- [x] Revisar cambios sin commitear.
- [x] Confirmar que los cambios actuales corresponden al mockup/documentacion base.
- [x] Correr lint antes de guardar la base:

```bash
npm run lint
```

- [x] Correr build si lint pasa:

```bash
npm run build
```

- [x] Hacer commit base si todo esta correcto:

```bash
git add .
git commit -m "chore(calendar): capture calendar mockup and stories baseline"
```

- [x] Subir la branch si aplica:

```bash
git push
```

## 2. Crear branch de trabajo

- [x] Crear una branch para la primera historia real:

```bash
git switch -c codex/calendar-us-02-todays-events
```

- [x] Confirmar que se esta trabajando en la branch correcta:

```bash
git branch --show-current
```

## 3. Elegir la primera user story

Primera historia recomendada:

- [x] `US-02 - View today's events`

Razon: es read-only, valida la estructura visual, el modelo de datos y los componentes sin meterse todavia en formularios, modal, validaciones o persistencia.

Archivos de referencia:

- [x] `docs/user_stories/calendar/us-02-view-todays-events.md`
- [x] `src/app/calendar/page.tsx`
- [x] `src/components/design-system/`

## 4. Preparar modelo de datos de Calendar

- [x] Crear carpeta de feature:

```text
src/features/calendar/
```

- [x] Crear tipos base:

```text
src/features/calendar/types.ts
```

- [x] Definir `CalendarEvent`.
- [x] Definir `CalendarSpace` con valores `Personal` y `Couple`.
- [x] Definir `CalendarRelation` con valores iniciales:
  - [x] `Reminder`
  - [x] `Chore`
  - [x] `Finance`
  - [x] `Pet`
- [x] Definir campos minimos del evento:
  - [x] `id`
  - [x] `title`
  - [x] `startsAt`
  - [x] `endsAt` opcional
  - [x] `space`
  - [x] `relation`
  - [x] `location`
  - [x] `people`
- [x] Crear seed data temporal:

```text
src/features/calendar/data.ts
```

- [x] Mover los eventos hardcodeados de `page.tsx` hacia `data.ts`.
- [x] Ordenar eventos por hora usando `startsAt`.
- [x] Mantener datos simples mientras no exista persistencia real.

## 5. Extraer componentes reales desde el mockup

- [x] Crear carpeta de componentes de Calendar:

```text
src/features/calendar/components/
```

- [x] Extraer `CalendarTimeline`.
- [x] Extraer `CalendarEventRow`.
- [x] Extraer `CalendarSpaceFilter`.
- [x] Extraer `CalendarViewToggle`.
- [x] Extraer `WeekPreview`.
- [x] Extraer `ConnectedItemsPanel`.
- [x] Extraer chips/badges si se repiten mucho.
- [x] Dejar `src/app/calendar/page.tsx` como composicion de alto nivel.
- [x] Mantener el estilo alineado con `src/components/design-system/`.

## 6. Implementar US-02 - View today's events

- [x] Leer la historia completa y sus Acceptance Criteria.
- [x] Mostrar una seccion claramente etiquetada como `Today's events`.
- [x] Mostrar la fecha visible del dia actual.
- [x] Mostrar eventos de hoy.
- [x] Ordenar eventos por hora ascendente.
- [x] Mostrar por evento:
  - [x] Hora
  - [x] Titulo
  - [x] Space
  - [x] Relation/tag
  - [x] Location
  - [x] People
- [x] Manejar estado vacio cuando no haya eventos.
- [x] Confirmar que no se implementan cosas fuera de scope de US-02.
- [x] Revisar responsive en desktop y mobile.
- [x] Correr verificacion:

```bash
npm run lint
npm run build
```

- [x] Commit de US-02:

```bash
git add .
git commit -m "feat(calendar): show todays events"
```

## 7. Implementar US-05 - Filter calendar by space

- [x] Crear estado de filtro: `All`, `Personal`, `Couple`.
- [x] Conectar los botones existentes del filtro a estado real.
- [x] Filtrar eventos visibles segun el space seleccionado.
- [x] Actualizar `aria-pressed` correctamente.
- [x] Mostrar empty state si el filtro no tiene eventos.
- [x] Confirmar que el filtro afecta solo lo que esta dentro del scope.
- [x] Correr:

```bash
npm run lint
npm run build
```

- [x] Commit:

```bash
git add .
git commit -m "feat(calendar): filter events by space"
```

## 8. Implementar US-03 - Assign event to a space

- [x] Confirmar que todos los eventos tienen `space`.
- [x] Mostrar visualmente si un evento es `Personal` o `Couple`.
- [x] Hacer que los eventos compartidos sean faciles de identificar.
- [x] Preparar el tipo para que el formulario de Add event pueda elegir space despues.
- [x] Correr:

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

- [x] Confirmar lista MVP de labels:
  - [x] `Reminder`
  - [x] `Chore`
  - [x] `Finance`
  - [x] `Pet`
- [x] Mostrar label en cada evento.
- [x] Usar estilos consistentes para cada label.
- [x] Evitar categorias fuera del MVP.
- [x] Preparar el tipo para que el formulario de Add event pueda elegir label despues.
- [x] Correr:

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

- [x] Crear modal o panel de Add event.
- [x] Abrirlo desde el boton `Add event`.
- [x] Permitir cancelar sin guardar.
- [x] Definir campos requeridos:
  - [x] Title
  - [x] Date
  - [x] Start time
  - [x] Space
- [x] Definir campos opcionales:
  - [x] End time
  - [x] Location
  - [x] People
  - [x] Relation/tag
- [x] Validar que los campos requeridos existan.
- [x] Crear evento en estado local.
- [x] Insertar el evento en la timeline ordenada.
- [x] Limpiar el formulario despues de guardar.
- [x] No implementar sync, calendario externo ni backend todavia.
- [x] Correr:

```bash
npm run lint
npm run build
```

- [x] Commit:

```bash
git add .
git commit -m "feat(calendar): create local events"
```

## 11. Decidir persistencia MVP

Opcion recomendada para esta etapa:

- [x] Empezar con estado en React.
- [x] Agregar `localStorage` si se necesita que sobreviva al refresh.
- [x] Posponer base de datos hasta tener claro login, usuarios y sync.

Si se usa `localStorage`:

- [x] Cargar eventos guardados al abrir Calendar.
- [x] Guardar cambios cuando se cree un evento.
- [x] Mantener seed data solo como fallback/demo.
- [x] Correr:

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

- [x] Revisar la historia y scope.
- [x] Definir estructura de `ConnectedItem`.
- [x] Relacionar connected items con eventos proximos.
- [x] Mostrar tipo, due text y space.
- [x] Mantenerlo como data local por ahora.
- [x] No implementar integraciones reales con Reminders, Chores o Finance todavia.
- [x] Correr:

```bash
npm run lint
npm run build
```

- [x] Commit:

```bash
git add .
git commit -m "feat(calendar): show connected preparation items"
```

## 13. Definition of Done por cada historia

Cada user story se considera lista solo si:

- [x] Cumple todos sus Acceptance Criteria.
- [x] No incluye features fuera de scope.
- [x] Se ve bien en desktop.
- [x] Se ve bien en mobile.
- [x] No rompe navegacion del app shell.
- [x] Usa componentes existentes cuando aplican.
- [x] Tiene tipos claros.
- [x] `npm run lint` pasa.
- [x] `npm run build` pasa.
- [ ] Tiene commit propio.

## 14. Checklist diaria de trabajo

Antes de empezar:

- [ ] Pull/revisar remoto si corresponde.
- [x] Confirmar branch activa.
- [x] Leer la user story del dia.
- [x] Leer Acceptance Criteria.
- [x] Abrir la ruta de Calendar localmente.

Durante:

- [x] Trabajar en cambios pequenos.
- [x] Probar visualmente despues de cada bloque importante.
- [ ] No mezclar dos historias grandes en el mismo commit.
- [x] Anotar decisiones abiertas en docs si aparecen.

Antes de cerrar:

- [x] Correr lint.
- [x] Correr build.
- [x] Revisar `git diff`.
- [x] Commit.
- [x] Push si ya esta estable.
- [x] Anotar siguiente paso.

## 15. Primer bloque recomendado para manana

Duracion sugerida: 60 a 90 minutos.

- [ ] Abrir repo en VS Code.
- [x] Revisar `git status`.
- [x] Correr `npm run dev`.
- [x] Abrir Calendar.
- [x] Leer `US-02`.
- [x] Crear branch `codex/calendar-us-02-todays-events`.
- [x] Crear `src/features/calendar/types.ts`.
- [x] Crear `src/features/calendar/data.ts`.
- [x] Mover eventos hardcodeados desde `src/app/calendar/page.tsx`.
- [x] Renderizar eventos desde data tipada.
- [x] Correr `npm run lint`.
- [x] Si todo pasa, hacer primer commit de la historia.

## 16. Orden recomendado de historias

- [x] US-02 - View today's events
- [x] US-05 - Filter calendar by space
- [x] US-03 - Assign event to a space
- [x] US-04 - Add tags or relationship labels
- [x] US-01 - Create new calendar event
- [x] US-06 - Show connected items for upcoming events

## 17. Decisiones abiertas para no bloquear manana

- [x] Default view: Today o Week.
- [x] Si `Couple` se mantiene como unico shared space del MVP.
- [x] Si `Pet` entra como relation label desde el primer release.
- [x] Si recurrence entra en US-01 o se pospone.
- [x] Si se usara `localStorage` antes de backend.
- [x] Si se necesita vista Month en esta etapa o queda fuera.
