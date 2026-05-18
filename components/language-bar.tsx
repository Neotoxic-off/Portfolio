import type { PortfolioData } from "@/lib/types";
import { langColor } from "@/lib/lang-colors";

export function LanguageBar({ data }: { data: PortfolioData }) {
  const total = data.languages.reduce((s, l) => s + l.count, 0);
  const top = data.languages.slice(0, 8);

  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-6 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-[var(--color-muted-foreground)]">
          Language Distribution
        </h2>
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full ring-1 ring-[var(--color-border)]">
          {top.map((l) => (
            <div
              key={l.name}
              title={`${l.name} · ${l.count}`}
              className="transition-all duration-300 hover:brightness-125"
              style={{
                width: `${(l.count / total) * 100}%`,
                background: langColor(l.name),
                boxShadow: `0 0 12px -2px ${langColor(l.name)}`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {top.map((l) => (
            <span key={l.name} className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: langColor(l.name) }}
              />
              {l.name}
              <span className="text-[var(--color-muted-foreground)]">
                {l.count}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
