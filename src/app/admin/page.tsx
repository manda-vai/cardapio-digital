import { getStores } from "@/lib/db";
import { AdminDashboardClient } from "./client";

export default function AdminDashboardPage() {
  const stores = getStores();

  return <AdminDashboardClient stores={stores} />;
}
