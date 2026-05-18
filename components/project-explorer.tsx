"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioData, Repo } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { langColor } from "@/lib/lang-colors";

type Sort = "stars" | "recent";

export function ProjectExplorer({ data }: { data: PortfolioData }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("stars");
  const [page, setPage] = useState(0);

  const PER_PAGE = 9;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: Repo[] = data.repos.filter((r) => {
      if (lang && r.language !== lang) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.includes(q))
      );
    });
    list = [...list].sort((a, b) =>
      sort === "stars"
        ? b.stars - a.stars
        : new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
    );
    return list;
  }, [data.repos, query, lang, sort]);

  // Any filter change resets to the first page.
  useEffect(() => setPage(0), [query, lang, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  const paged = filtered.slice(
    current * PER_PAGE,
    current * PER_PAGE + PER_PAGE,
  );

  const langs = data.languages.slice(0, 9);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col gap-2">
        <p className="layer-label">// layer 02 :: projects</p>
        <h2 className="crt text-3xl font-bold tracking-tight">Projects</h2>
        <p className="font-mono text-xs text-[var(--color-muted-foreground)]">
          live from github · refreshed hourly · {data.repos.length} repositories
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, topics, descriptions…"
            className="w-full rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 py-3 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)]/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={!lang} onClick={() => setLang(null)}>
            All
          </FilterChip>
          {langs.map((l) => (
            <FilterChip
              key={l.name}
              active={lang === l.name}
              onClick={() => setLang(lang === l.name ? null : l.name)}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: langColor(l.name) }}
              />
              {l.name}
            </FilterChip>
          ))}
          <div className="ml-auto flex items-center gap-1 text-xs">
            {(["stars", "recent"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                  sort === s
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((r) => (
          <ProjectCard key={r.id} repo={r} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-[var(--color-muted-foreground)]">
          No projects match your filters.
        </p>
      )}

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 font-mono text-xs">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-foreground)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-7 w-7 rounded-full tabular-nums transition-colors ${
                i === current
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                  : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={current === pageCount - 1}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-foreground)] disabled:pointer-events-none disabled:opacity-40"
          >
            next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <p className="mt-5 text-center font-mono text-[11px] text-[var(--color-muted-foreground)]/60">
          page {current + 1} / {pageCount} · {filtered.length} repos
        </p>
      )}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
        active
          ? "border-[var(--color-accent)]/60 bg-[var(--color-accent)]/15 text-[var(--color-foreground)]"
          : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40"
      }`}
    >
      {children}
    </button>
  );
}
