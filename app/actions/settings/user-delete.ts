"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function UserDelete(id : string) {
    const supabase = await createClient();

    const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id)

    if (error) {
        console.log('Error in UserDelete server action: ' + error.message);
        throw new Error
    }

    revalidatePath('/settings');
}