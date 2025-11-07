"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function TableDelete(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id); // filter by the id column

  if (error) {
    console.error("Error deleting product:", error.message);
    throw new Error(error.message);
  }

  revalidatePath('/products');

  console.log(`Product with id ${id} deleted successfully.`);
}
