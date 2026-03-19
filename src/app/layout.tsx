"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";
import { ThemeProvider } from "./themeprovider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize dark mode from localStorage (or system preference) on mount.
   */
  useEffect(() => {
    // Initialize dark mode on mount
    const saved = localStorage.getItem("darkMode");
    const isDark = saved !== null ? saved === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
    setMounted(true);
  }, []);

  /**
   * Apply the `dark` class to the document element and persist preference.
   */
  useEffect(() => {
    if (!mounted) return;
    
    // Apply dark mode class
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save preference
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode, mounted]);

  /**
   * Listen for cross-component theme changes (via `CustomEvent`).
   */
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<boolean>;
      setDarkMode(Boolean(ev.detail));
    };
    window.addEventListener("dark-mode-changed", handler as EventListener);
    return () => window.removeEventListener("dark-mode-changed", handler as EventListener);
  }, []);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth scroll-mt`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
