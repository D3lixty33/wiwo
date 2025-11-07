// app/products/page.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { ProductsTable } from "./products-table"; // client component
import { Product } from "@/lib/types";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  const products: Product[] = data ?? [];

  if (error) console.error("Error loading products:", error);

  return (
    <SidebarProvider>
      <main className="flex-1 min-h-screen p-4 md:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <ProductsTable products={products} />
      </main>
    </SidebarProvider>
  );
}
