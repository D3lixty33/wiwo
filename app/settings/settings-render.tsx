"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Plus } from "lucide-react";

import { User } from "@/lib/types";
import { UserSettingsCard } from "./user-setting";
import { UserAdd } from "./user-add";

interface UserProps {
  user: User[];
}

export default function SettingsWrapper({ user }: UserProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => setMounted(true), []);

  const isAllowed = user.map((u) => u.privileges)[0] === "A";

  if (!mounted) return null;

  return (
    <motion.main
      className={`min-h-screen w-full flex flex-col items-center justify-start transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 px-6 py-10">
        <div className="flex flex-col flex-1 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-sm p-8 gap-8 transition-colors">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Settings
            </h1>

            <div className="flex flex-row items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {/* Add user button */}
              {isAllowed && (
                <button
                  onClick={() => setModalAdd(true)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* User Settings Cards */}
          <div className="space-y-6">
            {user.length > 0 ? (
              user.map((u) => <UserSettingsCard key={u.id} user={u} />)
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No users found.
              </p>
            )}
          </div>
        </div>

        {/* Add User Modal */}
        {modalAdd && (
          <UserAdd modalAdd={modalAdd} setModalAdd={setModalAdd} />
        )}
      </div>
    </motion.main>
  );
}
