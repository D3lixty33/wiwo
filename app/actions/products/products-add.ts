"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ProductInput {
  product: string;
  description: string;
  pricing: number;
  addExpenses: boolean;
}

export async function TableAdd({
  product,
  description,
  pricing,
  addExpenses,
}: ProductInput) {
  const supabase = await createClient();

  // Insert into products and return the new row (including its id)
  const { data: productData, error: productsAddErr } = await supabase
    .from("products")
    .insert([{ product, description, pricing }])
    .select("id, product, description, pricing") // tell Supabase to return these columns
    .single(); // get only one object instead of an array

  if (productsAddErr) {
    console.error("Error inserting product:", productsAddErr);
    throw productsAddErr;
  }

  // Now productData contains the inserted row, including its id
  console.log("Inserted product:", productData);

  // If addExpenses is true, insert also in expenses
  if (addExpenses && productData) {
    const { error: expenseAddErr } = await supabase
      .from("expenses")
      .insert([
        {
          product: productData.product,
          description: productData.description,
          pricing: productData.pricing,
          product_id: productData.id, // optional: link expense to product
        },
      ]);

    if (expenseAddErr) {
      console.error("Error inserting expense:", expenseAddErr);
      throw expenseAddErr;
    }
  }

  revalidatePath("/products");
}
