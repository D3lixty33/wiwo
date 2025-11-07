"use client";

import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import React, { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a neutral fallback to prevent SSR mismatch
    return (
      <main className="flex flex-col min-h-screen w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main
      className={`flex flex-col min-h-screen w-full transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="w-full flex flex-col flex-1 items-center px-6 py-10">
        {/* Main content container (matches tables’ cards) */}
        <div className="flex flex-col flex-1 w-full max-w-6xl rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 gap-12 transition-colors">
          {children}
        </div>

        {/* Footer */}
        <footer className="mt-10 w-full flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 py-6 border-t border-slate-200 dark:border-slate-800">
          <p className="flex items-center gap-1">
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-semibold hover:underline text-indigo-600 dark:text-indigo-400"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <div className="ml-6">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  );
}
