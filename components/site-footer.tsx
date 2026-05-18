import { Github, Heart } from "lucide-react";
import type { Profile } from "@/lib/types";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-sm text-[var(--color-muted-foreground)] sm:flex-row sm:justify-between">
        <p className="inline-flex items-center gap-1.5">
          Built with <Heart className="h-3.5 w-3.5 text-[var(--color-accent)]" />{" "}
          Next.js · TypeScript · Tailwind · shadcn
        </p>
        <a
          href={profile.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-foreground)]"
        >
          <Github className="h-4 w-4" /> @{profile.login}
        </a>
      </div>
    </footer>
  );
}
