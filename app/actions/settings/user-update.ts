'use server';

import { createClient } from "@/lib/supabase/server";
//import { User } from "@/lib/types";

interface UserUpdateProps {
    id : string
    full_name? : string,
    email? : string,
    password? : string
}

export async function UserUpdate({id, full_name, email, password} : UserUpdateProps) {

    console.log(id ?? 'nullsA')

    const supabase = await createClient();
    const { error } = await supabase
    .from('profiles')
    .update({full_name, email, password})
    .eq("id", id)

    if (error) {
        console.log('Error in UserUpdate: ' + error.message);
        throw new Error(error.message);
    }        

}