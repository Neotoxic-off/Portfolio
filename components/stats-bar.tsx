import { Star, GitFork, FolderGit2, Code2 } from "lucide-react";
import type { PortfolioData } from "@/lib/types";

export function StatsBar({ data }: { data: PortfolioData }) {
  const items = [
    { icon: FolderGit2, label: "Repositories", value: data.repos.length },
    { icon: Star, label: "Total Stars", value: data.totalStars },
    {
      icon: GitFork,
      label: "Forks",
      value: data.repos.reduce((s, r) => s + r.forks, 0),
    },
    { icon: Code2, label: "Languages", value: data.languages.length },
  ];

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-6 sm:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.label}
          className="rise card-surface group rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-5 text-center backdrop-blur-sm"
          style={{ animationDelay: `${360 + i * 60}ms` }}
        >
          <it.icon className="mx-auto h-5 w-5 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110" />
          <div className="mt-2 bg-gradient-to-b from-[var(--color-foreground)] to-[var(--color-accent-soft)] bg-clip-text text-2xl font-bold tabular-nums text-transparent">
            {it.value}
          </div>
          <div className="text-xs text-[var(--color-muted-foreground)]">
            {it.label}
          </div>
        </div>
      ))}
    </section>
  );
}
