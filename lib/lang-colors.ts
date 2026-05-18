// Muted, no-green language accents — tuned for the dark Wired palette.
const COLORS: Record<string, string> = {
  TypeScript: "#6c8cd5",
  JavaScript: "#c9a94a",
  Python: "#5f7aa3",
  Rust: "#c98a6a",
  "C#": "#a06cc0",
  "C++": "#c2607d",
  C: "#6b6b75",
  Shell: "#8a7fb5",
  Lua: "#5a5fa5",
  Makefile: "#9070a0",
  Go: "#4a93b0",
  HTML: "#c2603a",
  CSS: "#7d5da8",
};

export function langColor(lang: string | null): string {
  if (!lang) return "#6b6b78";
  return COLORS[lang] ?? "#8f7ab8";
}
