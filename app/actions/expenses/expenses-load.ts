'use server';

import { createClient } from "@/lib/supabase/server";
import { Expense } from '@/lib/types'

export async function ExpenseLoad(): Promise<Expense[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('expenses')
    .select('*')

    if (error) {
        console.log('Error in server action ExpenseLoad: ' + error);
        throw new Error
    }

    return data ?? []
}