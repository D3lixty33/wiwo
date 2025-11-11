"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ExpenseEdit {
    id : string
    product : string,
    description: string;
}

export async function ExpenseUpdate({ id, product, description }: ExpenseEdit) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ product, description })
    .eq("id", id);

  if (error) {
    console.error("Error in SA of ExpenseUpdate: " + error);
    throw new Error(error.message);
  }

  revalidatePath("/expenses");
}
