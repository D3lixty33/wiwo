'use server';

import { createClient } from "@/lib/supabase/server";
import { User } from "@/lib/types";

export async function UserLoad(): Promise<User[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("Error in UserLoad server function: ", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
