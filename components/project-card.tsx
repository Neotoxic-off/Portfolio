import {
  Star,
  GitFork,
  ExternalLink,
  ArrowUpRight,
  Archive,
  Clock,
} from "lucide-react";
import type { Repo } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { langColor } from "@/lib/lang-colors";
import { timeAgo } from "@/lib/utils";

export function ProjectCard({ repo }: { repo: Repo }) {
  const color = langColor(repo.language);

  return (
    <Card className="flex flex-col p-5">
      {/* faint violet bloom that ignites on hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[var(--color-accent)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-15" />

      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-mono text-[15px] font-semibold tracking-tight transition-colors group-hover:text-[var(--color-accent-soft)]"
        >
          {repo.name}
          <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </a>
        <div className="flex shrink-0 items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]" />{" "}
              {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" /> {repo.forks}
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm text-[var(--color-muted-foreground)]">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <Badge
              key={t}
              className="group-hover:border-[var(--color-accent)]/40 group-hover:text-[var(--color-accent-soft)]"
            >
              {t}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 text-xs">
        <div className="flex items-center gap-3 text-[var(--color-muted-foreground)]">
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full ring-2 ring-transparent transition-all group-hover:ring-[color:var(--ring-c)]"
                style={
                  {
                    background: color,
                    "--ring-c": `color-mix(in oklch, ${color} 35%, transparent)`,
                  } as React.CSSProperties
                }
              />
              {repo.language}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 opacity-70">
            <Clock className="h-3 w-3" /> {timeAgo(repo.pushedAt)}
          </span>
          {repo.archived && (
            <span className="inline-flex items-center gap-1 text-[var(--color-muted-foreground)]/70">
              <Archive className="h-3 w-3" /> archived
            </span>
          )}
        </div>
        {repo.homepage && (
          <a
            href={
              repo.homepage.startsWith("http")
                ? repo.homepage
                : `https://${repo.homepage}`
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[var(--color-accent-soft)] hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </a>
        )}
      </div>
    </Card>
  );
}
