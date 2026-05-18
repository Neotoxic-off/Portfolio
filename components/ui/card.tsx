import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "card-surface group relative overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/60 backdrop-blur-sm",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--color-accent)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-80",
        className,
      )}
      {...props}
    />
  );
}
