import Image from "next/image";
import { Github, MapPin, Users, Terminal, Moon } from "lucide-react";
import type { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-16 text-center">
      <div className="rise float" style={{ animationDelay: "0ms" }}>
        <div className="relative mx-auto h-28 w-28">
          <div className="glow-pulse absolute inset-0 rounded-full bg-[var(--color-accent)] blur-2xl" />
          <div className="absolute -inset-2 rounded-full border border-[var(--color-accent)]/30" />
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={112}
            height={112}
            priority
            className="relative rounded-full border-2 border-[var(--color-accent)]/70 shadow-[0_0_40px_-8px_var(--color-accent)]"
          />
        </div>
      </div>

      <div
        className="rise mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-1.5 font-mono text-xs text-[var(--color-accent-soft)] backdrop-blur-sm"
        style={{ animationDelay: "80ms" }}
      >
        <Terminal className="h-3.5 w-3.5" />
        <span>reverse-engineer@wired</span>
        <span className="flicker">▋</span>
      </div>

      <h1
        className="shimmer-text rise mt-6 text-5xl font-bold tracking-tight sm:text-7xl"
        style={{ animationDelay: "140ms" }}
      >
        {profile.name}
      </h1>

      <p
        className="rise mt-5 max-w-xl text-balance text-lg text-[var(--color-muted-foreground)]"
        style={{ animationDelay: "200ms" }}
      >
        {profile.bio}
      </p>

      <div
        className="rise mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-[var(--color-accent-soft)]/80"
        style={{ animationDelay: "240ms" }}
      >
        <Moon className="h-3.5 w-3.5" />
        Between the real and the imagined
      </div>

      <div
        className="rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-muted-foreground)]"
        style={{ animationDelay: "280ms" }}
      >
        {profile.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[var(--color-accent)]" />{" "}
            {profile.location}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-[var(--color-accent)]" />{" "}
          {profile.followers} followers
        </span>
      </div>

      <div
        className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "340ms" }}
      >
        <a href={profile.url} target="_blank" rel="noreferrer">
          <Button>
            <Github className="h-4 w-4" /> GitHub Profile
          </Button>
        </a>
        <a href="#projects">
          <Button variant="outline">Explore Projects</Button>
        </a>
      </div>
    </section>
  );
}
