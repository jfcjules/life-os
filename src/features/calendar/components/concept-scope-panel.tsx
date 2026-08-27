import { Panel, SectionHeader } from "@/components/design-system";

export function ConceptScopePanel() {
  return (
    <Panel>
      <SectionHeader title="Concept scope" action="Draft" />

      <div className="mt-5 grid gap-3">
        <ScopeRow label="Now" value="Today and Week views" />
        <ScopeRow label="Spaces" value="All, Personal, Couple" />
        <ScopeRow label="Later" value="Month, Agenda, sync, alerts" />
      </div>
    </Panel>
  );
}

function ScopeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 rounded-[var(--radius-action)] bg-[var(--surface-raised)] px-4 py-3 text-[11px] leading-5">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
