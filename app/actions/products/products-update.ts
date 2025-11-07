"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ProductEdit {
    id : string
    product : string,
    description: string;
}

export async function TableUpdate({ id, product, description }: ProductEdit) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ product, description })
    .eq("id", id);

  if (error) {
    console.error("Error in SA of TableUpdate: " + error);
    throw new Error(error.message);
  }

  revalidatePath("/products");
}
