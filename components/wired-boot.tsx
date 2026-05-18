"use client";

import { useEffect, useState } from "react";

const SEQ = [
  "establishing carrier ............ ok",
  "protocol 7 negotiating ......... ok",
  "resolving node :: tachibana .... ok",
  "psyche layer ................... bypassed",
];

// Short Lain-style "connecting to the Wired" screen. Shows once per
// browser session, then fades + blurs out.
export function WiredBoot() {
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("wired-seen")) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("wired-seen", "1");

    const ticks = SEQ.map((_, i) =>
      setTimeout(() => setN(i + 1), 260 + i * 360),
    );
    const fade = setTimeout(() => setDone(true), 2100);
    const gone = setTimeout(() => setShow(false), 2900);

    return () => {
      ticks.forEach(clearTimeout);
      clearTimeout(fade);
      clearTimeout(gone);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`wired-boot ${done ? "done" : ""}`} aria-hidden>
      <div className="crt text-sm uppercase tracking-[0.5em]">
        connecting to the wired
      </div>

      <div className="mt-4 min-h-[5.5rem] w-[min(420px,80vw)] text-left text-[11px] text-[var(--color-muted-foreground)]">
        {SEQ.slice(0, n).map((line, i) => (
          <div
            key={i}
            style={{ animation: "bootline 0.25s ease both" }}
          >
            <span className="text-[var(--color-accent-soft)]">{">"}</span>{" "}
            {line}
          </div>
        ))}
        {n >= SEQ.length && (
          <div className="mt-1 text-[var(--color-accent-soft)]">
            present day. present time.
          </div>
        )}
      </div>

      <div className="bar">
        <span />
      </div>
    </div>
  );
}
