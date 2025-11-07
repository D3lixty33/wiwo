"use client";

import { UserAddAction } from "../actions/settings/user-add";
import { useState } from "react";
import { User } from "@/lib/types";

interface UserAddProps {
  modalAdd: boolean;
  setModalAdd: (value: boolean) => void;
}

export function UserAdd({ modalAdd, setModalAdd }: UserAddProps) {
  const [fullName, setFullName] = useState("");
  const [email, setNewEmail] = useState("");

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/user-add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email }),
    });

    const data = await res.json();
    console.log("Result:", data);
    setModalAdd(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setModalAdd(false)} // close modal on backdrop click
      />

      <form
        onSubmit={handleAdd}
        className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-80 max-w-full z-10 flex flex-col gap-4 transition-all"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Add User
        </h2>

        {/* Full name input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
          </label>
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-indigo-300 focus:outline-none focus:ring-1 transition-colors dark:bg-slate-800 dark:text-slate-100 text-sm"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-indigo-300 focus:outline-none focus:ring-1 transition-colors dark:bg-slate-800 dark:text-slate-100 text-sm"
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setModalAdd(false)} // close modal
            className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
