import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Panel({ children, className = "", ...props }: SurfaceProps) {
  return (
    <section
      className={`min-w-0 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-content)] p-5 max-sm:p-4 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function Card({ children, className = "", ...props }: SurfaceProps) {
  return (
    <article
      className={`min-w-0 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 max-sm:p-4 ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
