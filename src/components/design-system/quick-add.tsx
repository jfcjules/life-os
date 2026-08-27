"use client";

import { useMemo, useState } from "react";
import { Button } from "./button";
import type { QuickAddAction, QuickAddType } from "./types";

export const quickAddActions: QuickAddAction[] = [
  {
    id: "expense",
    key: "$",
    label: "Expense",
    detail: "Capture amount, category, and space.",
  },
  {
    id: "reminder",
    key: "R",
    label: "Reminder",
    detail: "Create a calm nudge for later.",
  },
  {
    id: "event",
    key: "E",
    label: "Event",
    detail: "Block time on the shared calendar.",
  },
  {
    id: "grocery",
    key: "G",
    label: "Grocery",
    detail: "Add an item to the shared list.",
  },
];

const quickAddForms = {
  expense: {
    title: "Add expense",
    helper: "Keep money capture simple; organize details only when needed.",
    fields: [
      { label: "Amount", placeholder: "$0.00" },
      { label: "Description", placeholder: "Groceries, dinner, coffee..." },
      { label: "Category", placeholder: "Food, home, pet care..." },
      { label: "Space", placeholder: "Personal or Couple" },
    ],
  },
  reminder: {
    title: "Add reminder",
    helper: "A small nudge, connected to the right part of life.",
    fields: [
      { label: "Reminder", placeholder: "Walk Whisky, pay rent..." },
      { label: "Due", placeholder: "Today, tomorrow, Friday..." },
      { label: "Time", placeholder: "6:00 PM" },
      { label: "Space", placeholder: "Personal or Couple" },
    ],
  },
  event: {
    title: "Add event",
    helper: "Capture the plan now; details can become richer later.",
    fields: [
      { label: "Title", placeholder: "Vet appointment, game night..." },
      { label: "Date", placeholder: "August 9" },
      { label: "Time", placeholder: "7:30 PM" },
      { label: "Space", placeholder: "Personal or Couple" },
    ],
  },
  grocery: {
    title: "Add grocery",
    helper: "Fast shared list entry with just enough structure.",
    fields: [
      { label: "Item", placeholder: "Milk, yogurt, lettuce..." },
      { label: "Quantity", placeholder: "1, 2 packs, 500g..." },
      { label: "Category", placeholder: "Dairy, produce, pantry..." },
      { label: "Added by", placeholder: "Jules" },
    ],
  },
} satisfies Record<
  QuickAddType,
  {
    title: string;
    helper: string;
    fields: { label: string; placeholder: string }[];
  }
>;

const savedCopy = {
  expense: "Expense saved",
  reminder: "Reminder saved",
  event: "Event saved",
  grocery: "Grocery item saved",
} satisfies Record<QuickAddType, string>;

const flowSteps = ["Choose type", "Add details", "Saved"];

export function QuickActionTile({
  action,
  onClick,
}: {
  action: QuickAddAction;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[92px] flex-col justify-between rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--action-hover-border)]"
    >
      <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-action-secondary)] text-[11px] font-medium text-[var(--text-muted)]">
        {action.key}
      </span>
      <span className="text-[13px] font-medium leading-5 text-[var(--text-primary)]">
        {action.label}
      </span>
    </button>
  );
}

export function QuickAddModal({
  isOpen,
  selectedType,
  onClose,
  onChooseType,
  onBack,
}: {
  isOpen: boolean;
  selectedType: QuickAddType | null;
  onClose: () => void;
  onChooseType: (type: QuickAddType) => void;
  onBack: () => void;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const activeAction = quickAddActions.find(
    (action) => action.id === selectedType,
  );
  const activeForm = selectedType ? quickAddForms[selectedType] : null;
  const activeStep = useMemo(() => {
    if (isSaved) return "Saved";
    if (selectedType) return "Add details";
    return "Choose type";
  }, [isSaved, selectedType]);

  if (!isOpen) return null;

  function handleClose() {
    setIsSaved(false);
    onClose();
  }

  function handleChooseType(type: QuickAddType) {
    setIsSaved(false);
    onChooseType(type);
  }

  function handleBack() {
    setIsSaved(false);
    onBack();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--overlay-scrim)] px-4 py-8 backdrop-blur-[10px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-add-title"
        className="flex max-h-[min(760px,calc(100vh-48px))] w-full max-w-[520px] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] shadow-[var(--shadow-dialog)]"
      >
        <div className="flex items-start justify-between gap-5 border-b border-[var(--border-subtle)] px-6 py-5">
          <div>
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">
              Quick add
            </p>
            <h2
              id="quick-add-title"
              className="mt-2 text-[20px] font-medium leading-7 text-[var(--text-primary)]"
            >
              {isSaved
                ? selectedType
                  ? savedCopy[selectedType]
                  : "Saved"
                : activeForm?.title ?? "What are we adding?"}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close quick add"
            onClick={handleClose}
            className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-action)] bg-[var(--surface-raised)] text-[14px]"
          >
            x
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 pt-5">
          {flowSteps.map((step) => (
            <span
              key={step}
              className={`rounded-full px-3 py-2 text-[10px] leading-3 ${
                step === activeStep
                  ? "bg-[var(--color-action-primary)] text-[var(--text-primary)]"
                  : "bg-[var(--surface-raised)] text-[var(--text-muted)]"
              }`}
            >
              {step}
            </span>
          ))}
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {isSaved ? (
            <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
              <div className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--color-action-secondary)] text-[18px] font-medium">
                {activeAction?.key ?? "+"}
              </div>
              <h3 className="mt-6 text-[18px] font-medium leading-6">
                Added to Life OS
              </h3>
              <p className="mt-3 text-[12px] leading-5 text-[var(--text-muted)]">
                This prototype confirms the capture pattern. Later this will
                save to the right module and connect related items
                automatically.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Add another
                </Button>
                <Button type="button" onClick={handleClose}>
                  Done
                </Button>
              </div>
            </div>
          ) : selectedType && activeForm && activeAction ? (
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSaved(true);
              }}
            >
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-[var(--radius-action)] bg-[var(--color-action-secondary)] text-[13px] font-medium">
                    {activeAction.key}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium leading-5">
                      {activeAction.label}
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">
                      {activeForm.helper}
                    </p>
                  </div>
                </div>
              </div>

              {activeForm.fields.map((field) => (
                <label key={field.label} className="grid gap-2">
                  <span className="text-[11px] leading-4 text-[var(--text-muted)]">
                    {field.label}
                  </span>
                  <input
                    className="min-h-12 rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 text-[12px] text-[var(--text-primary)] outline-none placeholder:text-[var(--placeholder-muted)] focus:border-[var(--color-action-primary)]"
                    placeholder={field.placeholder}
                  />
                </label>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit">
                  Save {activeAction.label.toLowerCase()}
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid gap-3">
              {quickAddActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleChooseType(action.id)}
                  className="flex min-h-[96px] items-center gap-5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--action-hover-border)]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-[var(--radius-action)] bg-[var(--color-action-secondary)] text-[13px] font-medium">
                    {action.key}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium leading-5">
                      {action.label}
                    </span>
                    <span className="mt-2 block text-[11px] leading-4 text-[var(--text-muted)]">
                      {action.detail}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
