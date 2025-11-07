import { ExpensesRender } from "./expense-render";
import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/lib/types";

export default async function Expenses() {
  const supabase = await createClient();
  const { data } = await supabase.from("expenses").select("*");

  const expenses: Expense[] = data ?? [];

  return (
    <main className="flex-1 min-h-screen p-4 md:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ExpensesRender expenses={expenses}></ExpensesRender>
    </main>
  );
}
