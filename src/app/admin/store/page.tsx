import { getStores } from "@/lib/db";
import { StoreSettingsForm } from "@/components/organisms/store-settings-form";
import { notFound } from "next/navigation";

export default async function AdminStorePage() {
  const stores = getStores();
  const mainStore = stores[0];
  if (!mainStore) notFound();

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

      <StoreSettingsForm store={mainStore} />
    </div>
  );
}
