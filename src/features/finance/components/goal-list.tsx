import { Button, Panel, SectionHeader } from "@/components/design-system";

import type { Expense, Goal } from "../types";
import { GoalRow } from "./goal-row";

export function GoalList({
  expenses,
  goals,
  selectedGoalId,
  onAddSavingForPlannedItem,
  onAddGoal,
  onSelectGoal,
}: {
  expenses: Expense[];
  goals: Goal[];
  selectedGoalId: string | null;
  onAddSavingForPlannedItem: (goalId: string, plannedItemId: string) => void;
  onAddGoal: () => void;
  onSelectGoal: (goalId: string) => void;
}) {
  return (
    <Panel>
      <SectionHeader action={`${goals.length} goals`} />

      {goals.length > 0 ? (
        <div className="mt-5 space-y-3">
          {goals.map((goal) => (
            <GoalRow
              key={goal.id}
              expenses={expenses}
              goal={goal}
              isSelected={selectedGoalId === goal.id}
              onAddSavingForPlannedItem={onAddSavingForPlannedItem}
              onSelect={() => onSelectGoal(goal.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
          <p className="text-[13px] font-medium leading-5">No goals yet.</p>
          <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
            Create a goal for savings, planned purchases, or special funding.
          </p>
          <div className="mt-5">
            <Button variant="secondary" onClick={onAddGoal}>
              Add goal
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}
