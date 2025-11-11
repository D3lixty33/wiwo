"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function ExpenseDelete(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id); // filter by the id column

  if (error) {
    console.error("Error deleting product:", error.message);
    throw new Error(error.message);
  }

  revalidatePath('/expenses');

  console.log(`Expense with id ${id} deleted successfully.`);
}
