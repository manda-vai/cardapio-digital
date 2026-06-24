import type { Metadata } from "next";
import { AdminSidebar, AdminMobileNav } from "@/components/organisms/admin-sidebar";
import { Header } from "@/components/organisms/header";

export const metadata: Metadata = {
  title: {
    default: "Admin | Cardápio Digital",
    template: "%s | Admin | Cardápio Digital",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <Header variant="admin" />

        <main
          id="main-content"
          className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 max-w-5xl w-full mx-auto"
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <AdminMobileNav />
    </div>
  );
}
