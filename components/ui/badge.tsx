import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-muted)]/40 px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors",
        className,
      )}
      {...props}
    />
  );
}
