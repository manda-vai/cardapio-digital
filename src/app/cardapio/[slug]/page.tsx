import { notFound } from "next/navigation";
import { getStoreBySlug, getStores, getCategoriesByStore, getItemsByStore } from "@/lib/db";
import { PublicMenuPageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getStores().map((store) => ({
    slug: store.slug,
  }));
}

export default async function CardapioPage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  const categories = getCategoriesByStore(store.id);
  const items = getItemsByStore(store.id);

  return (
    <PublicMenuPageClient
      store={store}
      categories={categories}
      items={items}
    />
  );
}
