"use client";

import { Expense } from "@/lib/types";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { ExpenseAdd } from "../actions/expenses/expenses-add";
import CardData from "@/components/ui/card-custom";

interface ExpenseProps {
  expenses: Expense[];
}

export function ExpensesRender({ expenses }: ExpenseProps) {
  const { theme, setTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [newProduct, setNewProduct] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPricing, setNewPricing] = useState<number | "">("");

  const [errors, setErrors] = useState<{
    product?: boolean;
    description?: boolean;
    pricing?: boolean;
  }>({});

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isEmpty = expenses.length === 0;
  const productSupply = expenses.map((exp) => exp.product_id);
  const isNullProd = productSupply.some((id) => id == null);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = {
      product: !newProduct.trim(),
      description: !newDescription.trim(),
      pricing: newPricing === "" || isNaN(Number(newPricing)),
    };
    setErrors(validation);

    if (!validation.product && !validation.description && !validation.pricing) {
      await ExpenseAdd({
        product: newProduct,
        description: newDescription,
        pricing: Number(newPricing),
      });
      setNewProduct("");
      setNewDescription("");
      setNewPricing("");
      setModalOpen(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Expenses
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <label className="relative">
            <input
              type="search"
              placeholder="Search expenses..."
              className="w-full sm:w-72 pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-colors"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
              />
            </svg>
          </label>

          {/* Add Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            + New
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                  Pricing
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
              {isEmpty && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-slate-500 dark:text-slate-400 py-8 text-sm"
                  >
                    No expenses found.
                  </td>
                </tr>
              )}

              {expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold">
                        {exp.product?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {exp.product}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          ID: {exp.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-300 max-w-xl truncate">
                      {exp.description}
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {isNullProd ? "GENERIC" : exp.product_id}
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {exp.pricing}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="text-sm px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                        Edit
                      </button>
                      <button className="text-sm px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <form
            onSubmit={handleAdd}
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-80 max-w-full z-10 flex flex-col gap-4 transition-all"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Add Expense
            </h2>

            {/* Product */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Product
              </label>
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  errors.product
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-indigo-300"
                } focus:outline-none focus:ring-1 transition-colors dark:bg-slate-800 dark:text-slate-100 text-xs`}
                placeholder="Enter product name"
              />
              {errors.product && (
                <span className="text-xs text-red-500">
                  Product is required
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className={`px-3 py-2 rounded-lg border resize-none ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-indigo-300"
                } focus:outline-none focus:ring-1 transition-colors dark:bg-slate-800 dark:text-slate-100 text-xs`}
                placeholder="Enter description"
                rows={3}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  Description is required
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Pricing
              </label>
              <input
                type="number"
                value={newPricing}
                onChange={(e) =>
                  setNewPricing(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className={`px-3 py-2 rounded-lg border ${
                  errors.pricing
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-indigo-300"
                } focus:outline-none focus:ring-1 transition-colors dark:bg-slate-800 dark:text-slate-100 text-xs`}
                placeholder="Enter pricing"
              />
              {errors.pricing && (
                <span className="text-xs text-red-500">
                  Pricing is required
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
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
      )}
      <div className="flex w-auto h-auto flex-row gap-6 justify-between">
        <div>
          <CardData></CardData>
        </div>
        <div>
          <CardData></CardData>
        </div>
        <div>
          <CardData></CardData>
        </div>
      </div>
    </div>
  );
}
