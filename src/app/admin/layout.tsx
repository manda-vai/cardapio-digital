import type { Metadata } from "next";
import { AdminSidebar, AdminMobileNav } from "@/components/organisms/admin-sidebar";
import { Header } from "@/components/organisms/header";
import { isSupabaseConfigured, createSupabaseServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If Supabase is not configured, show admin without auth (dev mode)
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header variant="admin" />
          <main
            id="main-content"
            className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 max-w-5xl w-full mx-auto"
          >
            {children}
          </main>
        </div>
        <AdminMobileNav />
      </div>
    );
  }

  // Check authentication
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  if (!supabase) {
    redirect("/admin/login");
  }

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  // Get user profile with store_id
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // If no profile, redirect to onboarding
  if (!profile || !profile.store_id) {
    redirect("/admin/cadastro");
  }

  // Get store slug
  const { data: store } = await supabase
    .from("stores")
    .select("slug, name")
    .eq("id", profile.store_id)
    .single();

  return (
    <div className="min-h-screen flex">
      <AdminSidebar storeSlug={store?.slug} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header variant="admin" user={user} storeName={store?.name || profile.name || user.email} />
        <main
          id="main-content"
          className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 max-w-5xl w-full mx-auto"
        >
          {children}
        </main>
      </div>
      <AdminMobileNav storeSlug={store?.slug} />
    </div>
  );
}