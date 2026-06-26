import { getCategoriesByStore, getItemsByStore } from "@/lib/db";
import { getUserStoreId } from "@/lib/admin";
import { MenuEditor } from "@/components/organisms/menu-editor";
import { notFound } from "next/navigation";

export default async function AdminMenuPage() {
  const storeId = await getUserStoreId();

  if (!storeId) {
    notFound();
  }

  const categories = await getCategoriesByStore(storeId);
  const items = await getItemsByStore(storeId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md text-on-background font-bold">
          Cardápio
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Gerencie os itens do seu cardápio
        </p>
      </div>

      <MenuEditor
        categories={categories}
        items={items}
        storeId={storeId}
      />
    </div>
  );
}