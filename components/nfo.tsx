
const FIELDS = [
  ["release", "neo-portfolio"],
  ["group", "WIRED // Neotoxic-off"],
  ["type", "self-updating · live from github api"],
  ["langs", "rust · c# · python · typescript"],
  ["protection", "none — source open, copies encouraged"],
  ["supplied", "the wired · refreshed hourly"],
];

export function Nfo() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="layer-label">// layer 03 :: .nfo</p>

      <div className="rise mt-5 overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-card)]/50 backdrop-blur-sm">
        <div className="overflow-x-auto px-6 py-7 font-mono text-[var(--color-muted-foreground)] sm:px-8">
          <div className="crt select-none text-lg lowercase tracking-[0.6em] text-[var(--color-accent-soft)]">
            n e o
          </div>

          <div className="rule-ascii mt-5 opacity-60" />

          <dl className="mt-5 grid gap-1.5 text-xs sm:text-sm">
            {FIELDS.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-24 shrink-0 uppercase tracking-widest text-[var(--color-accent-soft)]/70">
                  {k}
                </dt>
                <dt className="select-none text-[var(--color-border)]">
                  {".".repeat(20)}
                </dt>
                <dd className="text-[var(--color-foreground)]/85">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="rule-ascii mt-5 opacity-60" />

          <p className="mt-5 text-xs text-[var(--color-muted-foreground)]/70">
            <span className="text-[var(--color-accent-soft)]/70">greetz:</span>{" "}
            everyone still reverse-engineering at 3am · the scene · the wired ·
            present day, present time
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]/50">
            ─ this is not a crack. it rebuilds itself from the github api. ─
          </p>
        </div>
      </div>
    </section>
  );
}
