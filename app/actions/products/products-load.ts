"use server";

import { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export async function TableLoad(): Promise<Product[]> {
  const supabase = await createClient(); // should be sync, not awaited

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Table load error:", error);
    return [];
  }

  return data ?? [];
}
