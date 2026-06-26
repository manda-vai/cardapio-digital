import { getStoreById } from "@/lib/db";
import { getUserStoreId } from "@/lib/admin";
import { AdminDashboardClient } from "./client";
import { notFound } from "next/navigation";

export default async function AdminDashboardPage() {
  const storeId = await getUserStoreId();

  if (!storeId) {
    notFound();
  }

  const store = await getStoreById(storeId);

  if (!store) {
    notFound();
  }

  return <AdminDashboardClient store={store} />;
}