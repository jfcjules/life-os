import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-action-primary)] text-[var(--text-primary)] shadow-[0_16px_34px_rgba(95,128,212,0.20)]",
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
      className={`min-h-11 rounded-[14px] px-5 text-[12px] font-medium transition hover:-translate-y-0.5 ${buttonVariants[variant]} ${className}`}
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
      className={`grid size-11 place-items-center rounded-[14px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-xs font-medium text-[var(--text-primary)] shadow-[0_10px_22px_rgba(8,17,32,0.04)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
