import { notFound } from "next/navigation";
import { getStoreBySlug, getStores, getCategoriesByStore, getItemsByStore } from "@/lib/db";
import { OrderPageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stores = await getStores();
  return stores.map((store) => ({
    slug: store.slug,
  }));
}

export default async function PedidoPage({ params }: PageProps) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  const categories = await getCategoriesByStore(store.id);
  const items = await getItemsByStore(store.id);

  return (
    <OrderPageClient
      store={store}
      categories={categories}
      items={items}
    />
  );
}