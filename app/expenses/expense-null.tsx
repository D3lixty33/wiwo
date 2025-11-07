"use client";

import { cn } from "@/lib/utils";
import { ReactElement, ReactNode } from "react";

interface ExpenseNullProps extends ReactElement {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className: string;
}

export function ExpenseNull({
  children,
  variant = "primary",
  className,
  ...props
}: ExpenseNullProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  };
  return (
    <>
      <p className={cn(baseStyles, variants[variant], className)}>{children}</p>
    </>
  );
}
