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
    <SidebarProvider>
      <AppSidebar />
      <ThemeWrapper>{children}</ThemeWrapper>
    </SidebarProvider>
  );
}
