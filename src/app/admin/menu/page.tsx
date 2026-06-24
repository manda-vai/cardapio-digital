import { getStores, getCategoriesByStore, getItemsByStore } from "@/lib/db";
import { MenuEditor } from "@/components/organisms/menu-editor";
import { notFound } from "next/navigation";

export default async function AdminMenuPage() {
  const stores = getStores();
  const mainStore = stores[0];
  if (!mainStore) notFound();

  const categories = getCategoriesByStore(mainStore.id);
  const items = getItemsByStore(mainStore.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md text-on-background font-bold">
          Cardápio
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Gerencie os itens do cardápio de {mainStore.name}
        </p>
      </div>

      <MenuEditor
        categories={categories}
        items={items}
        storeId={mainStore.id}
      />
    </div>
  );
}
