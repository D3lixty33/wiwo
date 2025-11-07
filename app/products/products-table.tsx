"use client";

import { useTheme } from "next-themes";
import { Product } from "@/lib/types";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { TableAdd } from "../actions/products/products-add";
import { TableLoad } from "../actions/products/products-load";
import { TableDelete } from "../actions/products/specific-product";
import { TableUpdate } from "../actions/products/products-update";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDel] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPricing, setNewPricing] = useState<number | "">("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editProduct, setEditProd] = useState<Product | null>(null);
  const [addInExpenses, setAddInExpenses] = useState(false);
  const [errors, setErrors] = useState<{
    product?: boolean;
    description?: boolean;
    pricing?: boolean;
  }>({});

  useEffect(() => setMounted(true), []);

  // Add it here — above the return!
  useEffect(() => {
    if (editProduct) {
      setNewProduct(editProduct.product ?? "");
      setNewDescription(editProduct.description ?? "");
    }
  }, [editProduct]);

  if (!mounted) return null;

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = {
      product: !newProduct.trim(),
      description: !newDescription.trim(),
      pricing: newPricing === "" || isNaN(Number(newPricing)),
    };
    setErrors(validation);

    const addExpense = addInExpenses;

    if (!validation.product && !validation.description && !validation.pricing) {
      await TableAdd({ product: newProduct, description: newDescription, pricing: Number(newPricing), addExpenses: addExpense});
      setNewProduct("");
      setNewDescription("");
      setModalOpen(false);
    }
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await TableDelete(selectedProduct.id); // or TableDelete(selectedProduct.id)
      setModalDel(false);
      setSelectedProduct(null);

      // optionally reload the table:
      await TableLoad();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editProduct) return; // make sure something is selected

    const validation = {
      product: !newProduct.trim(),
      description: !newDescription.trim(),
    };
    setErrors(validation);

    if (validation.product || validation.description) return;

    try {
      await TableUpdate({
        id: editProduct.id, // directly use editProduct.id
        product: newProduct,
        description: newDescription,
      });

      // cleanup
      setEditProd(null);
      setModalEdit(false);
      setNewProduct("");
      setNewDescription("");

      await TableLoad();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Products
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <label className="relative">
            <input
              type="search"
              placeholder="Search products..."
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

      {/* Table */}
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
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-slate-500 dark:text-slate-400 py-8 text-sm"
                  >
                    No products found.
                  </td>
                </tr>
              )}

              {products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold">
                        {p.product?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {p.product}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          ID: {p.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-300 max-w-xl truncate">
                      {p.description}
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(p.created_at).toISOString().split("T")[0]}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        className="text-sm px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                        onClick={() => {
                          setEditProd(p);
                          setModalEdit(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/50"
                        onClick={() => {
                          setSelectedProduct(p);
                          setModalDel(true);
                        }}
                      >
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

      {/* Floating Modal Form */}
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
              Add Product
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
                  setNewPricing(e.target.value === "" ? "" : Number(e.target.value))
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

            {/* Add in expenses checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                id="add-expense"
                checked={addInExpenses}
                onCheckedChange={(checked) => setAddInExpenses(!!checked)}
              />

              <label
                htmlFor="add-expense"
                className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300 cursor-pointer select-none"
              >
                Add in expenses
              </label>
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

      {/* Floating delete form */}
      {modalDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalDel(false)}
          />
          <form
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-80 max-w-full z-10 flex flex-col gap-4 transition-all"
            onSubmit={handleRemove}
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Remove product
            </h2>
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Are you sure you want to remove this product ?
              {selectedProduct?.product ? (
                <span>{selectedProduct.product}</span>
              ) : (
                "not found"
              )}
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalDel(false)} // close delete modal only
                className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>

              {/* Confirm deletion */}
              <button
                type="submit" // this submits the form and calls handleRemove
                className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal edit form */}
      {modalEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalEdit(false)}
          />
          <form
            onSubmit={handleEdit}
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-80 max-w-full z-10 flex flex-col gap-4 transition-all"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Add Product
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

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalEdit(false)}
                className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
