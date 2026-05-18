import type { Metadata } from "next";
import "./globals.css";
import { WiredTrace } from "@/components/wired-trace";
import { WiredBoot } from "@/components/wired-boot";

export const metadata: Metadata = {
  title: "neo — Portfolio",
  description:
    "Data engineer by day & Reverse engineer by night. Open-source projects across TypeScript, Rust, C#, Python and more.",
  metadataBase: new URL("https://neotoxic.dev"),
  openGraph: {
    title: "neo — Portfolio",
    description: "Data engineer by day & Reverse engineer by night.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="aurora" aria-hidden />
        <div className="rasters fixed inset-0 -z-10 h-[70vh]" aria-hidden />
        <WiredTrace />

        <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)]/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-soft)] backdrop-blur-sm">
          <span className="flicker">● navi // connected</span>
          <span className="hidden sm:inline">layer: wired</span>
          <span>present day · present time</span>
        </div>

        {children}
        <div className="scanlines" aria-hidden />
        <div className="grain" aria-hidden />
        <WiredBoot />
      </body>
    </html>
  );
}
