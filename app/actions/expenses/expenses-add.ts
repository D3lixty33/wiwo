'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ProductInput {
  product: string;
  description: string;
  pricing: number;
}

export async function ExpenseAdd({ product, description, pricing }: ProductInput) {
  const supabase = await createClient();

  const parsedPricing = Number(pricing);
  if (isNaN(parsedPricing)) throw new Error("Invalid pricing value");

  const { error } = await supabase
    .from("expenses")
    .insert([{ product, description, pricing }]); // must be an array of objects

  if (error) {
    console.error("Error inserting product:", error);
    throw error;
  }

  revalidatePath('/expenses');
}
