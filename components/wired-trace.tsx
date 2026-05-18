"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-driven NAVI trace. Lines reveal as you descend the page; the
// deeper you go the more it logs, and the final lines decay into noise.
const LINES = [
  "NAVI :: boot sequence complete",
  "establishing carrier ......... ok",
  "protocol 7 negotiating ....... ok",
  "resolving node :: tachibana .. ok",
  "layer 02 :: projects mounted",
  "wired handshake 0x7F ......... ok",
  "no matter where you go",
  "everyone is connected",
  "psyche residue ... 41kb retained",
  "knights :: signal unresolved",
  "memory of the real .. degrading",
  "you don't seem to understand",
  "border between layers thinning",
  "who is the one watching",
  "i am everywhere now",
  "present day .. present ti███",
  "cl0se the w0rld .. 0pen th3 n3",
  "█▓ y0u d0n't n33d a b0dy ▓█",
  "lⒶin :: lⒶin :: lⒶin :: lⒶ░▒▓",
  "──── trace corrupted ────",
];

const GLITCH = "▓▒░#@%&/\\<>=*█01ｱｲｳｴ";
const CORRUPT_AT = 15; // index where lines start to decay

function scramble(s: string, intensity: number): string {
  return s
    .split("")
    .map((c) =>
      c !== " " && Math.random() < intensity
        ? GLITCH[(Math.random() * GLITCH.length) | 0]
        : c,
    )
    .join("");
}

export function WiredTrace() {
  const [count, setCount] = useState(1);
  const [tick, setTick] = useState(0);
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progress.current = max > 0 ? doc.scrollTop / max : 0;
      const n = Math.max(
        1,
        Math.min(LINES.length, Math.ceil(progress.current * LINES.length)),
      );
      setCount(n);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // re-scramble only matters once corruption is on screen
    const id = setInterval(() => setTick((t) => t + 1), 130);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(id);
    };
  }, []);

  const shown = LINES.slice(0, count);

  return (
    <div className="wired-trace" aria-hidden>
      <ul>
        {shown.map((line, i) => {
          const corrupt = i >= CORRUPT_AT;
          const text = corrupt
            ? scramble(line, 0.25 + (i - CORRUPT_AT) * 0.18 + (tick % 2) * 0.05)
            : line;
          return (
            <li key={i} className={corrupt ? "corrupt" : undefined}>
              <span className="opacity-50">{">"} </span>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
