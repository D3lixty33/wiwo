// app/(protected)/layout.tsx or wherever your layout is
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeWrapper } from "./theme-wrapper"; // 👈 client wrapper

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full h-full gap-8 ">
      <SidebarProvider className="w-32">
        <AppSidebar />
        {/*<ThemeWrapper>{children}</ThemeWrapper>*/}
      </SidebarProvider>
      <div className="flex w-full h-auto">
        Test
      </div>
    </main>
  );
}
