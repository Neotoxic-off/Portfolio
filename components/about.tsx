import { Cpu, ShieldHalf, KeyRound, Workflow } from "lucide-react";

const FOCUS = [
  {
    icon: ShieldHalf,
    title: "Reverse Engineering",
    body: ".NET IL manipulation, DLL hooking, kernel drivers, game internals — a long-running line of work from AbstractIL and Cloak to the Dead by Daylight tooling suite.",
    tags: ["AbstractIL", "Cloak", "lockpick", "Kataana"],
  },
  {
    icon: KeyRound,
    title: "Cryptography from scratch",
    body: "Hand-rolled ciphers and codecs instead of importing them — polymorphic XOR, rotor machines, asymmetric compression, custom hashing.",
    tags: ["XA3E", "chacrypt", "Idol", "Clutter"],
  },
  {
    icon: Cpu,
    title: "Systems in Rust",
    body: "Recent work lives here: self-hosted object storage, container tooling, disk verification, fast scanners — small, sharp, modular.",
    tags: ["Stash", "harbour", "flod", "Encodra"],
  },
  {
    icon: Workflow,
    title: "Automation & scrapers",
    body: "Media pipelines, link extractors, schedulers and dev-ergonomics tools — the day-job data-engineer reflex applied to everything.",
    tags: ["Makima", "Juice", "sob", "nea"],
  },
];

export function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="layer-label">// layer 01 :: whoami</p>

      <div className="rise mt-5 overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 backdrop-blur-sm">
        {/* terminal title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-muted)]/30 px-4 py-2 font-mono text-[11px] text-[var(--color-muted-foreground)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-muted)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-muted)]" />
          <span className="ml-2">neo@wired: ~ — cat whoami.txt</span>
        </div>

        <div className="space-y-4 p-6 font-mono text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:p-8">
          <p>
            <span className="text-[var(--color-accent)] crt">$</span>{" "}
            <span className="text-[var(--color-foreground)]">whoami</span>
          </p>
          <p>
            <span className="text-[var(--color-accent-soft)]">Data engineer</span>{" "}
            by day, <span className="text-[var(--color-accent-soft)]">reverse
            engineer</span> by night, music producer when the terminal sleeps.
            108 public repositories — most of them tools built to answer a single
            question and then left running.
          </p>
          <p>
            The work is consistent even when the languages change: take something
            closed, understand it completely, rebuild it cleaner. That goes for
            .NET binaries, game engines, AWS GameLift sessions, encrypted blobs
            and save files alike. Lately it&apos;s mostly{" "}
            <span className="text-[var(--color-accent-soft)]">Rust</span>, with a
            deep back-catalogue in C#/.NET and Python.
          </p>
          <p className="text-[var(--color-muted-foreground)]/70">
            Naming things after anime characters. Operating, as the profile says,
            between the real and the imagined.
          </p>
          <p>
            <span className="text-[var(--color-accent)] crt">$</span>{" "}
            <span className="flicker">▋</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FOCUS.map((f, i) => (
          <div
            key={f.title}
            className="rise card-surface group rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-5 backdrop-blur-sm"
            style={{ animationDelay: `${120 + i * 80}ms` }}
          >
            <div className="flex items-center gap-2.5">
              <f.icon className="h-4 w-4 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-mono text-sm font-semibold tracking-tight text-[var(--color-foreground)]">
                {f.title}
              </h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {f.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-[var(--color-accent-soft)]/80">
              {f.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
