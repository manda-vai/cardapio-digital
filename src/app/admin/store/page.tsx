import { getStoreById } from "@/lib/db";
import { getUserStoreId } from "@/lib/admin";
import { StoreSettingsForm } from "@/components/organisms/store-settings-form";
import { notFound } from "next/navigation";

export default async function AdminStorePage() {
  const storeId = await getUserStoreId();

  if (!storeId) {
    notFound();
  }

  const store = await getStoreById(storeId);

  if (!store) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md text-on-background font-bold">
          Configurações da Loja
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Personalize as informações do seu restaurante
        </p>
      </div>

      <StoreSettingsForm store={store} />
    </div>
  );
}