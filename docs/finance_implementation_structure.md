# Finance Implementation Structure

Fecha de arranque sugerida: viernes 14 de agosto de 2026.

Objetivo: convertir las user stories de Finance en funcionalidades reales, trabajando por bloques pequenos, verificables y alineados con el patron ya usado en Calendar.

## 0. Punto de partida

- `src/app/finance/page.tsx` actualmente solo muestra `EmptyWorkspace`.
- Las historias base viven en `docs/user_stories/finance/`.
- Calendar ya establece un patron tecnico util:
  - `src/features/<feature>/types.ts`
  - `src/features/<feature>/data.ts`
  - `src/features/<feature>/utils.ts`
  - `src/features/<feature>/components/`
  - `src/app/<route>/page.tsx` como composicion de alto nivel.
- Finance debe empezar como MVP local antes de tomar decisiones de backend, login, sincronizacion, cuentas bancarias o integraciones externas.

## 1. Estructura recomendada de archivos

```text
src/
  app/
    finance/
      page.tsx

  features/
    finance/
      types.ts
      data.ts
      utils.ts
      storage.ts
      components/
        finance-workspace.tsx
        finance-period-selector.tsx
        finance-summary.tsx
        expense-form.tsx
        expense-history.tsx
        expense-row.tsx
        expense-detail.tsx
        budget-form.tsx
        budget-list.tsx
        budget-row.tsx
        income-form.tsx
        income-list.tsx
        ownership-filter.tsx
        tag-input.tsx
        confirm-delete-dialog.tsx
        finance-chart.tsx
```

Regla: `page.tsx` solo debe importar y renderizar `FinanceWorkspace`, igual que Calendar renderiza `CalendarWorkspace`.

## 2. Modelo de datos MVP

Crear `src/features/finance/types.ts` con tipos explicitos y faciles de leer:

```ts
export type FinanceSpace = "Personal" | "Couple";

export type FinanceOwnershipFilter = "All" | FinanceSpace;

export type FinancePeriod = "Weekly" | "Biweekly" | "Monthly";

export type FinanceFrequency = "One-time" | "Weekly" | "Monthly" | "Yearly";

export type FinanceUser = {
  id: string;
  name: string;
};

export type FinanceTag = {
  id: string;
  label: string;
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string;
  ownership: FinanceSpace;
  category?: string;
  assignedUserId?: string;
  dueDate?: string;
  frequency: FinanceFrequency;
  tagIds: string[];
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  period: FinancePeriod;
  ownership: FinanceSpace;
  category?: string;
  assignedUserId?: string;
  dueDate?: string;
  frequency: FinanceFrequency;
  tagIds: string[];
};

export type Income = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  frequency?: FinanceFrequency;
  tagIds: string[];
};
```

Decisiones MVP:

- Usar `Personal` y `Couple` como valores explicitos seleccionados por el usuario.
- No calcular splits, reembolsos, saldos entre personas ni sincronizacion de pareja.
- Usar `number` para amounts en el UI local; si luego entra backend/pagos, revisar precision y moneda.
- Mantener `tagIds` como arreglo simple, sin jerarquias ni taxonomia financiera.
- Mantener `assignedUserId` opcional para permitir items sin asignacion.

## 3. Utilidades compartidas

Crear `src/features/finance/utils.ts` para evitar logica duplicada en componentes:

- `formatCurrency(amount: number)`.
- `formatDate(date: string)`.
- `getPeriodRange(period, anchorDate)`.
- `movePeriod(period, anchorDate, direction)`.
- `isWithinPeriod(date, range)`.
- `sortByDateDesc(items)`.
- `sumExpenses(expenses)`.
- `sumIncome(income)`.
- `calculateNetSavings(incomeTotal, expenseTotal)`.
- `getNextOccurrence(dueDate, frequency)`.

Regla: la logica de periodos debe vivir en `utils.ts`, no dentro de componentes.

## 4. Data y persistencia MVP

Crear `src/features/finance/data.ts`:

- `createSeedExpenses(today)`.
- `createSeedBudgets(today)`.
- `createSeedIncome(today)`.
- `seedFinanceUsers`.
- `seedFinanceTags`.

Crear `src/features/finance/storage.ts`:

- Claves de `localStorage` por entidad.
- Lectura con fallback a seed data.
- Guardado despues de crear, editar o eliminar.
- Validacion defensiva simple al leer storage.

Decision recomendada: empezar con React state + `localStorage`, como Calendar. Posponer backend hasta que esten claras auth, usuarios reales, sync y modelo de base de datos.

## 5. Orden recomendado de historias

### Bloque 1 - Base funcional de gastos

1. `US-01 - Add new expense`
   - Crea estructura de feature, tipos, seed data, workspace y modal de gasto.
   - Implementa crear y eliminar gastos.
   - Usa `localStorage` si se quiere conservar informacion al refrescar.

2. `US-03 - View expenses history`
   - Muestra historial cronologico.
   - Agrega selector `Weekly / Biweekly / Monthly`.
   - Monthly debe ser el default.
   - Agrega total del periodo.

3. `US-04 - View expenses by ownership`
   - Agrega ownership `Personal / Couple` al formulario.
   - Agrega filtro `All / Personal / Couple` al historial.
   - Actualiza totales segun ownership.

Razon: estos tres pasos crean el nucleo de Finance sin presupuestos, income ni graficas todavia.

### Bloque 2 - Presupuestos

4. `US-02 - Add new budget`
   - Agrega presupuestos con nombre, monto y periodo.
   - Muestra gastos aplicables contra presupuesto.
   - Permite eliminar presupuesto sin eliminar gastos.

5. `US-05 - Assign expenses and budgets to a user`
   - Agrega asignacion opcional a gastos y presupuestos.
   - Usa usuarios seed hasta que exista gestion real de usuarios.

6. `US-06 - Set due date and frequency for expenses and budgets`
   - Agrega due date y frequency a gastos y presupuestos.
   - Calcula proxima ocurrencia solo para mostrarla.
   - No crea transacciones automaticas.

Razon: budgets comparten campos con expenses; conviene estabilizar ambos antes de tags y overview.

### Bloque 3 - Income y organizacion

7. `US-07 - Add and edit income`
   - Agrega income con crear y editar.
   - Mantiene el flujo atomico, sin drafts ni autosaves.

8. `US-08 - Add tags to expenses and budgets`
   - Agrega tags opcionales a gastos y presupuestos.
   - Permite crear tags simples desde el flujo de asignacion.

Razon: income desbloquea el overview; tags puede ir despues porque no debe ser requerido para crear items.

### Bloque 4 - Overview financiero

9. `US-09 - View income, expenses, and net savings`
   - Reutiliza el mismo period selector de expense history.
   - Muestra Income, Expenses y Net Savings.
   - Agrega una grafica simple.
   - Usa los datos ya registrados en Finance.

Razon: esta historia depende de tener expenses, income y periodos funcionando.

## 6. Composicion de la pantalla

`FinanceWorkspace` debe organizar la experiencia en zonas claras:

```text
FinanceWorkspace
  Header / primary actions
    Add expense
    Add budget
    Add income

  Financial overview
    Period selector
    Income total
    Expenses total
    Net savings total
    Simple graph

  Expense history
    Period selector or shared period state
    Ownership filter
    Expense list
    Expense detail

  Budgets
    Budget list
    Budget progress against applicable expenses

  Income
    Income list
```

### 6.1 Expenses redesign direction

La seccion `Expenses` debe seguir la direccion documentada en:

```text
docs/finance/expenses.md
```

Decisiones cerradas para Expenses:

- Usar una composicion desktop de dos columnas:
  - Panel principal para filtros, sorting y expense history.
  - Rail derecho para `Period spent` y el detail del expense seleccionado.
- El detail del expense seleccionado debe vivir debajo de `Period spent`.
- Los filtros de expenses son `Category`, `Goal` y `Tag`.
- El filtro `Tag` usa `tagIds` internamente, pero nunca debe llamarse `Tag ID` en el UI.
- `Sort by` tiene dos grupos: `Amount` y `Date`.
- `Amount` ofrece `Highest` y `Lowest`.
- `Date` ofrece `Newest` y `Oldest`.
- El sort default debe ser `Date -> Newest`.
- Cada row de expense debe mostrar acciones junto al amount:
  - Edit con icono generico de lapiz.
  - Remove con icono generico de trash o close.
- Reusar el comportamiento existente de remove.
- La accion de edit requiere comportamiento de edicion de expense en el pase de implementacion o una historia explicita.

MVP visual:

- Evitar un dashboard demasiado denso.
- Priorizar acciones claras y listas legibles.
- Usar componentes existentes de `src/components/design-system/` cuando apliquen.
- No prometer bancos, automatizaciones, predicciones o analytics avanzados en el UI.

## 7. Estado local recomendado

`FinanceWorkspace` puede tener el estado principal al inicio:

```ts
const [expenses, setExpenses] = useState<Expense[]>([]);
const [budgets, setBudgets] = useState<Budget[]>([]);
const [income, setIncome] = useState<Income[]>([]);
const [tags, setTags] = useState<FinanceTag[]>([]);
const [users] = useState<FinanceUser[]>(seedFinanceUsers);
const [period, setPeriod] = useState<FinancePeriod>("Monthly");
const [anchorDate, setAnchorDate] = useState(new Date());
const [ownershipFilter, setOwnershipFilter] =
  useState<FinanceOwnershipFilter>("All");
```

No introducir `Context`, reducers o stores externos hasta que el estado se vuelva dificil de mantener.

## 8. Commit strategy

Crear branch:

```bash
git switch -c codex/finance-us-01-add-expense
```

Commits sugeridos:

```bash
feat(finance): add finance feature structure
feat(finance): create local expenses
feat(finance): show expense history
feat(finance): filter expenses by ownership
feat(finance): create budgets
feat(finance): assign finance items to users
feat(finance): add finance due dates
feat(finance): create and edit income
feat(finance): tag finance items
feat(finance): show financial overview
```

Regla: no mezclar dos historias grandes en el mismo commit si se puede evitar.

## 9. Definition of Done por historia

Cada historia se considera lista solo si:

- Cumple todos sus Acceptance Criteria.
- No incluye features fuera de scope.
- La ruta `/finance` sigue cargando correctamente.
- Se ve bien en desktop y mobile.
- Usa tipos claros y nombres legibles.
- Los calculos de periodos, totales y filtros viven en utilidades testeables o faciles de revisar.
- `npm run lint` pasa.
- `npm run build` pasa.
- El cambio queda trazado en un commit propio o en un commit pequeno y explicable.

## 10. Decisiones abiertas

- Moneda default para mostrar amounts.
- Si `category` debe ser texto libre o selector cerrado.
- Si el period selector de overview e history debe ser compartido o independiente.
- Si income tambien debe tener ownership desde el MVP o quedarse personal hasta una historia explicita.
- Si tags deben existir como entidad separada desde el inicio o solo como strings en el primer pase.
- Si editar budgets entra dentro de estas historias o se separa en historias nuevas.
- Como se conectara una grocery shopping run completada con Finance sin crear duplicados.

## 11. Primer bloque recomendado de implementacion

Duracion sugerida: 60 a 90 minutos.

- [ ] Revisar `git status`.
- [ ] Crear branch `codex/finance-us-01-add-expense`.
- [ ] Leer `docs/user_stories/finance/us-01-add-new-expense.md`.
- [ ] Crear `src/features/finance/types.ts`.
- [ ] Crear `src/features/finance/data.ts`.
- [ ] Crear `src/features/finance/utils.ts`.
- [ ] Crear `src/features/finance/components/finance-workspace.tsx`.
- [ ] Cambiar `src/app/finance/page.tsx` para renderizar `FinanceWorkspace`.
- [ ] Renderizar una pantalla Finance real con acciones y seed expenses.
- [ ] Implementar modal Add expense.
- [ ] Implementar eliminar expense con confirmacion.
- [ ] Correr `npm run lint`.
- [ ] Correr `npm run build`.
- [ ] Revisar diff.
- [ ] Commit.
