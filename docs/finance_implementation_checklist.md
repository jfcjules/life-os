# Finance Implementation Checklist

Fecha de arranque sugerida: viernes 14 de agosto de 2026.

Objetivo: convertir las user stories de Finance en funcionalidades reales, trabajando user story por user story, con commits pequenos y verificables.

## 0. Punto de partida

- [x] Confirmar branch activa:

```bash
git branch --show-current
```

- [x] Revisar estado del repo:

```bash
git status
```

- [x] Confirmar que `src/app/finance/page.tsx` renderiza `FinanceWorkspace`.
- [x] Leer el indice de historias:

```text
docs/user_stories/finance/README.md
```

- [x] Leer la estructura tecnica recomendada:

```text
docs/finance_implementation_structure.md
```

- [x] Correr verificacion base antes de tocar Finance:

```bash
npm run lint
npm run build
```

## 1. Crear branch de trabajo

- [x] Crear branch para el primer bloque:

```bash
git switch -c codex/finance-us-01-add-expense
```

- [x] Confirmar branch:

```bash
git branch --show-current
```

## 2. Preparar estructura base de Finance

- [x] Crear carpeta de feature:

```text
src/features/finance/
```

- [x] Crear archivos base:

```text
src/features/finance/types.ts
src/features/finance/data.ts
src/features/finance/utils.ts
src/features/finance/storage.ts
```

- [x] Crear carpeta de componentes:

```text
src/features/finance/components/
```

- [x] Crear componente principal:

```text
src/features/finance/components/finance-workspace.tsx
```

- [x] Cambiar `src/app/finance/page.tsx` para renderizar solo `FinanceWorkspace`.
- [x] Mantener `page.tsx` como composicion de alto nivel, igual que Calendar.

## 3. Definir tipos MVP

- [x] Definir `FinanceSpace`:
  - [x] `Personal`
  - [x] `Couple`

- [x] Definir `FinanceOwnershipFilter`:
  - [x] `All`
  - [x] `Personal`
  - [x] `Couple`

- [x] Definir `FinancePeriod`:
  - [x] `Weekly`
  - [x] `Biweekly`
  - [x] `Monthly`

- [x] Definir `FinanceFrequency`:
  - [x] `One-time`
  - [x] `Weekly`
  - [x] `Monthly`
  - [x] `Yearly`

- [x] Definir `FinanceUser`.
- [x] Definir `FinanceTag`.
- [x] Definir `Expense`.
- [x] Definir `Budget`.
- [x] Definir `Income`.

Campos minimos de `Expense`:

- [x] `id`
- [x] `name`
- [x] `amount`
- [x] `date`
- [x] `ownership`
- [x] `category`
- [x] `assignedUserId`
- [x] `dueDate`
- [x] `frequency`
- [x] `tagIds`

Campos minimos de `Budget`:

- [x] `id`
- [x] `name`
- [x] `amount`
- [x] `period`
- [x] `ownership`
- [x] `category`
- [x] `assignedUserId`
- [x] `dueDate`
- [x] `frequency`
- [x] `tagIds`

Campos minimos de `Income`:

- [x] `id`
- [x] `name`
- [x] `amount`
- [x] `date`
- [x] `category`
- [x] `frequency`
- [x] `tagIds`

## 4. Preparar data local y utilidades

- [x] Crear seed data temporal en `data.ts`:
  - [x] `createSeedExpenses(today)`
  - [x] `createSeedBudgets(today)`
  - [x] `createSeedIncome(today)`
  - [x] `seedFinanceUsers`
  - [x] `seedFinanceTags`

- [x] Crear utilidades de formato:
  - [x] `formatCurrency(amount)`
  - [x] `formatDate(date)`

- [x] Crear utilidades de periodo:
  - [x] `getPeriodRange(period, anchorDate)`
  - [x] `movePeriod(period, anchorDate, direction)`
  - [x] `isWithinPeriod(date, range)`
  - [x] Weekly debe ser lunes a domingo.
  - [x] Biweekly debe ser periodo de 14 dias empezando lunes.
  - [x] Monthly debe ser mes calendario.

- [x] Crear utilidades financieras:
  - [x] `sumExpenses(expenses)`
  - [x] `sumIncome(income)`
  - [x] `calculateNetSavings(incomeTotal, expenseTotal)`
  - [x] `getNextOccurrence(dueDate, frequency)`

## 5. Preparar persistencia MVP

Decision recomendada: React state + `localStorage`, igual que Calendar.

- [x] Crear `storage.ts`.
- [x] Definir keys de `localStorage`:
  - [x] expenses
  - [x] budgets
  - [x] income
  - [x] tags

- [x] Crear helpers de lectura con fallback a seed data.
- [x] Crear helpers de escritura por entidad.
- [x] Evitar backend, auth, sync e integraciones en este bloque.

## 6. Implementar US-01 - Add new expense

Archivo de referencia:

```text
docs/user_stories/finance/us-01-add-new-expense.md
```

- [x] Leer la historia completa y sus Acceptance Criteria.
- [x] Crear `ExpenseForm`.
- [x] Crear accion clara `Add expense` en Finance.
- [x] Abrir modal o panel al seleccionar `Add expense`.
- [x] Campos requeridos:
  - [x] Expense name
  - [x] Amount
  - [x] Date

- [x] Campos opcionales en este primer pase:
  - [x] Category
  - [x] Tags no se implementan hasta US-08.

- [x] Agregar acciones del modal:
  - [x] `Add expense`
  - [x] `Cancel`

- [x] Validar campos requeridos.
- [x] Crear expense en estado local.
- [x] Guardar expense en `localStorage` si storage ya esta activo.
- [x] Limpiar formulario despues de guardar.
- [x] Cancelar debe cerrar y descartar datos.
- [x] Crear `ConfirmDeleteDialog`.
- [x] Permitir eliminar expense existente.
- [x] Pedir confirmacion antes de eliminar.
- [x] Confirmar que eliminar remueve el expense del contexto correspondiente.
- [x] Confirmar que no se implementan bancos, imports, recurring, income ni budgets en esta historia.
- [x] Correr:

```bash
npm run lint
npm run build
```

- [x] Commit:

```bash
git add .
git commit -m "feat(finance): create local expenses"
```

## 7. Implementar US-03 - View expenses history

Archivo de referencia:

```text
docs/user_stories/finance/us-03-view-expenses-history.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Crear `ExpenseHistory`.
- [ ] Crear `ExpenseRow`.
- [ ] Crear `ExpenseDetail`.
- [ ] Crear `FinancePeriodSelector`.
- [ ] Mostrar seccion clara de expense history.
- [ ] Mostrar expenses en orden cronologico.
- [ ] Mostrar por expense:
  - [ ] Name
  - [ ] Amount
  - [ ] Date

- [ ] Agregar selector:
  - [ ] Weekly
  - [ ] Biweekly
  - [ ] Monthly

- [ ] Setear `Monthly` como default.
- [ ] Mostrar date range seleccionado.
- [ ] Agregar previous period control.
- [ ] Agregar next period control.
- [ ] Actualizar lista al cambiar periodo.
- [ ] Mostrar total spent del periodo.
- [ ] Permitir seleccionar expense para ver detalles disponibles.
- [ ] Mostrar empty state si no hay expenses en el periodo.
- [ ] Confirmar que expenses eliminados no aparecen.
- [ ] Confirmar que no se implementa custom date range, imports, analytics ni receipt scanning.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): show expense history"
```

## 8. Implementar US-04 - View expenses by ownership

Archivo de referencia:

```text
docs/user_stories/finance/us-04-view-expenses-by-ownership.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Agregar `Ownership` al form de expense.
- [ ] Opciones:
  - [ ] Personal
  - [ ] Couple

- [ ] Setear `Personal` como default.
- [ ] Requerir ownership para crear expense.
- [ ] Guardar ownership en expense.
- [ ] Mostrar ownership en expense row o detail.
- [ ] Crear `OwnershipFilter`.
- [ ] Agregar filtro:
  - [ ] All
  - [ ] Personal
  - [ ] Couple

- [ ] Filtrar history por ownership.
- [ ] Actualizar total spent segun periodo y ownership seleccionado.
- [ ] Permitir editar ownership de un expense existente.
- [ ] Confirmar que cambiar ownership actualiza vistas y totales.
- [ ] Confirmar que no se implementa split, reimbursement ni partner sync.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): filter expenses by ownership"
```

## 9. Implementar US-02 - Add new budget

Archivo de referencia:

```text
docs/user_stories/finance/us-02-add-new-budget.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Crear `BudgetForm`.
- [ ] Crear `BudgetList`.
- [ ] Crear `BudgetRow`.
- [ ] Crear accion clara `Add budget`.
- [ ] Abrir modal o panel al seleccionar `Add budget`.
- [ ] Campos requeridos:
  - [ ] Budget name
  - [ ] Amount
  - [ ] Budget period

- [ ] Campos opcionales:
  - [ ] Category
  - [ ] Tags, si ya existe soporte simple

- [ ] Agregar acciones:
  - [ ] `Create budget`
  - [ ] `Cancel`

- [ ] Crear budget en estado local.
- [ ] Guardar budget en `localStorage`.
- [ ] Mostrar expenses en relacion al budget aplicable.
- [ ] Permitir eliminar budget.
- [ ] Pedir confirmacion antes de eliminar.
- [ ] Confirmar que eliminar budget no elimina expenses.
- [ ] Confirmar que no se implementan recommendations, alerts ni bank integrations.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): create budgets"
```

## 10. Implementar US-05 - Assign expenses and budgets to a user

Archivo de referencia:

```text
docs/user_stories/finance/us-05-assign-expenses-and-budgets-to-a-user.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Definir usuarios disponibles en seed data.
- [ ] Agregar selector de user en `ExpenseForm`.
- [ ] Agregar selector de user en `BudgetForm`.
- [ ] Permitir crear expenses sin assigned user.
- [ ] Permitir crear budgets sin assigned user.
- [ ] Mostrar assigned user en expense.
- [ ] Mostrar assigned user en budget.
- [ ] Permitir cambiar assignment.
- [ ] Permitir remover assignment.
- [ ] Confirmar que cambiar assignment no cambia amount, date ni otros datos financieros.
- [ ] Confirmar que no se implementa account management, permissions, splits ni sync.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): assign finance items to users"
```

## 11. Implementar US-06 - Set due date and frequency for expenses and budgets

Archivo de referencia:

```text
docs/user_stories/finance/us-06-set-due-date-and-frequency-for-expenses-and-budgets.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Agregar due date a `ExpenseForm`.
- [ ] Agregar due date a `BudgetForm`.
- [ ] Agregar frequency a `ExpenseForm`.
- [ ] Agregar frequency a `BudgetForm`.
- [ ] Opciones:
  - [ ] One-time
  - [ ] Weekly
  - [ ] Monthly
  - [ ] Yearly

- [ ] Mostrar due date y frequency al ver expense.
- [ ] Mostrar due date y frequency al ver budget.
- [ ] Permitir cambiar due date.
- [ ] Permitir remover due date.
- [ ] Permitir cambiar frequency.
- [ ] Permitir remover frequency si aplica.
- [ ] Calcular next applicable occurrence para recurring items.
- [ ] Confirmar que one-time no genera otra occurrence.
- [ ] Confirmar que no se implementan automatic payments, reminders, bank sync ni advanced recurrence.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): add finance due dates"
```

## 12. Implementar US-07 - Add and edit income

Archivo de referencia:

```text
docs/user_stories/finance/us-07-add-and-edit-income.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Crear `IncomeForm`.
- [ ] Crear `IncomeList`.
- [ ] Crear accion clara `Add income`.
- [ ] Abrir modal o panel al seleccionar `Add income`.
- [ ] Campos requeridos:
  - [ ] Income name
  - [ ] Amount
  - [ ] Date

- [ ] Campos opcionales:
  - [ ] Category
  - [ ] Frequency
  - [ ] Tags, si ya existe soporte simple

- [ ] Agregar acciones:
  - [ ] `Add income`
  - [ ] `Cancel`

- [ ] Crear income en estado local.
- [ ] Guardar income en `localStorage`.
- [ ] Permitir seleccionar income existente.
- [ ] Permitir editar income existente.
- [ ] Guardar edicion actualizando el registro, no creando duplicado.
- [ ] Cancelar edicion debe descartar cambios.
- [ ] Confirmar que no se implementa payroll, taxes, bank imports ni forecasting.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): create and edit income"
```

## 13. Implementar US-08 - Add tags to expenses and budgets

Archivo de referencia:

```text
docs/user_stories/finance/us-08-add-tags-to-expenses-and-budgets.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Crear `TagInput`.
- [ ] Mostrar tags disponibles al crear expense.
- [ ] Mostrar tags disponibles al editar expense.
- [ ] Mostrar tags disponibles al crear budget.
- [ ] Mostrar tags disponibles al editar budget.
- [ ] Permitir crear tag nuevo desde el flujo de asignacion.
- [ ] Permitir asignar uno o mas tags a expense.
- [ ] Permitir asignar uno o mas tags a budget.
- [ ] Mostrar tags en expense.
- [ ] Mostrar tags en budget.
- [ ] Permitir remover tags despues de creacion.
- [ ] Confirmar que tags son opcionales.
- [ ] Confirmar que remover tag no elimina ni modifica expense/budget.
- [ ] Confirmar que el mismo tag puede usarse en varios items.
- [ ] Confirmar que no se implementa auto-categorization, hierarchies ni tag analytics.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): tag finance items"
```

## 14. Implementar US-09 - View income, expenses, and net savings

Archivo de referencia:

```text
docs/user_stories/finance/us-09-view-income-expenses-and-net-savings.md
```

- [ ] Leer la historia completa y sus Acceptance Criteria.
- [ ] Crear `FinanceSummary`.
- [ ] Crear `FinanceChart`.
- [ ] Reutilizar `FinancePeriodSelector`.
- [ ] Mostrar total Income del periodo.
- [ ] Mostrar total Expenses del periodo.
- [ ] Mostrar total Net Savings del periodo.
- [ ] Calcular Net Savings como Income minus Expenses.
- [ ] Mostrar los tres valores como summary values separados.
- [ ] Agregar grafica simple con Income, Expenses y Net Savings.
- [ ] Setear Monthly como default.
- [ ] Permitir navegar previous/next period.
- [ ] Actualizar summary y grafica al cambiar periodo.
- [ ] Actualizar summary y grafica al agregar, editar o eliminar income/expense.
- [ ] Comunicar datos insuficientes sin fingir que faltantes son cero.
- [ ] Confirmar que no se implementa forecasting, investments, exports ni advanced analytics.
- [ ] Correr:

```bash
npm run lint
npm run build
```

- [ ] Commit:

```bash
git add .
git commit -m "feat(finance): show financial overview"
```

## 15. Definition of Done por cada historia

Cada user story se considera lista solo si:

- [ ] Cumple todos sus Acceptance Criteria.
- [ ] No incluye features fuera de scope.
- [ ] Se ve bien en desktop.
- [ ] Se ve bien en mobile.
- [ ] No rompe navegacion del app shell.
- [ ] Usa componentes existentes cuando aplican.
- [ ] Tiene tipos claros.
- [ ] La logica de calculos vive en `utils.ts` cuando aplica.
- [ ] Los datos locales se guardan y cargan consistentemente si la historia usa storage.
- [ ] `npm run lint` pasa.
- [ ] `npm run build` pasa.
- [ ] Tiene commit propio o un commit pequeno y explicable.

## 16. Orden recomendado de historias

- [ ] US-01 - Add new expense
- [ ] US-03 - View expenses history
- [ ] US-04 - View expenses by ownership
- [ ] US-02 - Add new budget
- [ ] US-05 - Assign expenses and budgets to a user
- [ ] US-06 - Set due date and frequency for expenses and budgets
- [ ] US-07 - Add and edit income
- [ ] US-08 - Add tags to expenses and budgets
- [ ] US-09 - View income, expenses, and net savings

## 17. Checklist diaria de trabajo

Antes de empezar:

- [ ] Revisar `git status`.
- [ ] Confirmar branch activa.
- [ ] Leer la user story del dia.
- [ ] Leer Acceptance Criteria.
- [ ] Abrir `/finance` localmente.

Durante:

- [ ] Trabajar en cambios pequenos.
- [ ] Probar visualmente despues de cada bloque importante.
- [ ] No mezclar dos historias grandes en el mismo commit.
- [ ] Anotar decisiones abiertas si aparecen.

Antes de cerrar:

- [ ] Correr lint.
- [ ] Correr build.
- [ ] Revisar `git diff`.
- [ ] Commit.
- [ ] Push si ya esta estable.
- [ ] Anotar siguiente paso.

## 18. Decisiones abiertas

- [ ] Moneda default para amounts.
- [ ] Si `category` sera texto libre o selector cerrado.
- [ ] Si overview e history comparten el mismo period state.
- [ ] Si income tambien tendra ownership en MVP.
- [ ] Si tags se guardan como entidad separada o strings simples en el primer pase.
- [ ] Si editar expenses y budgets requiere historias nuevas separadas.
- [ ] Como conectar grocery shopping run totals con Finance sin duplicados.

## 19. Primer bloque recomendado

Duracion sugerida: 60 a 90 minutos.

- [ ] Revisar `git status`.
- [ ] Crear branch `codex/finance-us-01-add-expense`.
- [ ] Leer `US-01`.
- [ ] Crear `src/features/finance/types.ts`.
- [ ] Crear `src/features/finance/data.ts`.
- [ ] Crear `src/features/finance/utils.ts`.
- [ ] Crear `src/features/finance/storage.ts`.
- [ ] Crear `src/features/finance/components/finance-workspace.tsx`.
- [ ] Cambiar `src/app/finance/page.tsx`.
- [ ] Renderizar pantalla Finance real con acciones y seed expenses.
- [ ] Implementar modal Add expense.
- [ ] Implementar remove expense con confirmacion.
- [ ] Correr `npm run lint`.
- [ ] Correr `npm run build`.
- [ ] Revisar diff.
- [ ] Commit.
