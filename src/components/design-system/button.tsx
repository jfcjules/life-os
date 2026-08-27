import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-action-primary)] text-[var(--text-primary)] shadow-[var(--shadow-action)]",
  secondary:
    "bg-[var(--color-action-secondary)] text-[var(--text-primary)]",
  ghost: "bg-[var(--surface-raised)] text-[var(--text-primary)]",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`min-h-11 rounded-[var(--radius-action)] px-5 text-[12px] font-medium transition hover:-translate-y-0.5 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({
  label,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`grid size-11 place-items-center rounded-[var(--radius-action)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-xs font-medium text-[var(--text-primary)] shadow-[var(--shadow-surface)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
