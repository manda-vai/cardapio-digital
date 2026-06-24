import { notFound } from "next/navigation";
import { getStoreBySlug, getStores, getCategoriesByStore, getItemsByStore } from "@/lib/db";
import { OrderPageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getStores().map((store) => ({
    slug: store.slug,
  }));
}

export default async function PedidoPage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  const categories = getCategoriesByStore(store.id);
  const items = getItemsByStore(store.id);

  return (
    <OrderPageClient
      store={store}
      categories={categories}
      items={items}
    />
  );
}
