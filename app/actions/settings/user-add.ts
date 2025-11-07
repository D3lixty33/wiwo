"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { UserLoad } from "./user-load";

interface UserProps {
  fullName: string;
  email: string;
}

export async function UserAddAction({ fullName, email }: UserProps) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
    .from("sub_users")
    .insert([{ fullName, email }]);

    if (error) {
      console.error("Error inserting into profiles:", error);
      throw new Error(error.message);
    }
    await UserLoad()
    revalidatePath('/settings');
    return { success: true };
  } catch (e: any) {
    console.error("Error in launching the insert:", e);
    return { success: false, message: e.message || "Unknown error" };
  }
}
