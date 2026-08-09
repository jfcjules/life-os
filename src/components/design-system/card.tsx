import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Panel({ children, className = "", ...props }: SurfaceProps) {
  return (
    <section
      className={`rounded-[28px] border border-[var(--border-subtle)] bg-[rgba(227,233,247,0.72)] p-5 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function Card({ children, className = "", ...props }: SurfaceProps) {
  return (
    <article
      className={`rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
