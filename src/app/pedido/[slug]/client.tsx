"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { SearchBar } from "@/components/molecules/search-bar";
import { CategoryTabs } from "@/components/molecules/category-tabs";
import { MenuSection } from "@/components/organisms/menu-section";
import { ItemDetailModal } from "@/components/organisms/item-detail-modal";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { StoreHours } from "@/components/molecules/store-hours";
import { formatPrice } from "@/components/molecules/price-display";
import type { Store, Category, MenuItem, CartItem } from "@/types";

interface OrderPageClientProps {
  store: Store;
  categories: Category[];
  items: MenuItem[];
}

export function OrderPageClient({
  store,
  categories,
  items,
}: OrderPageClientProps) {
  const router = useRouter();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id || ""
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Filter
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const totalWithDelivery = cartTotal + (store.delivery_fee || 0);

  // Handlers
  const handleAddItem = (item: MenuItem) => {
    if (item.modifier_groups && item.modifier_groups.length > 0) {
      setSelectedItem(item);
      return;
    }
    setCart((prev) => {
      const existing = prev.find(
        (c) =>
          c.item.id === item.id &&
          Object.keys(c.selected_modifiers).length === 0
      );
      if (existing) {
        return prev.map((c) =>
          c === existing
            ? {
                ...c,
                quantity: c.quantity + 1,
                total_price: (c.quantity + 1) * c.unit_price,
              }
            : c
        );
      }
      return [
        ...prev,
        {
          item,
          quantity: 1,
          selected_modifiers: {},
          notes: "",
          unit_price: item.promotional_price ?? item.price,
          total_price: item.promotional_price ?? item.price,
        },
      ];
    });
  };

  const handleAddCustomItem = (cartItem: CartItem) => {
    setCart((prev) => [...prev, cartItem]);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev.map((c, i) =>
        i === index
          ? {
              ...c,
              quantity: c.quantity + delta,
              total_price: (c.quantity + delta) * c.unit_price,
            }
          : c
      )
    );
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header store={store} variant="public" />

      <main
        id="main-content"
        className="flex-1 max-w-4xl mx-auto w-full px-4 pt-4 pb-32"
      >
        {/* Back link */}
        <Link
          href={`/cardapio/${store.slug}`}
          className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Voltar ao cardápio
        </Link>

        {/* Store header */}
        <div className="mb-6">
          <h1 className="text-display-sm text-on-background font-bold">
            Fazer Pedido
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Monte seu pedido em {store.name}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {store.has_delivery && (
              <Badge variant="success" size="sm" dot>
                Delivery
              </Badge>
            )}
            {store.has_takeout && (
              <Badge variant="neutral" size="sm" dot>
                Retirada
              </Badge>
            )}
            {store.delivery_min_order > 0 && (
              <Badge variant="neutral" size="sm">
                Pedido mínimo: {formatPrice(store.delivery_min_order)}
              </Badge>
            )}
          </div>
        </div>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          className="mb-4"
        />

        {/* Categories */}
        {!searchQuery && (
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            className="mb-4"
          />
        )}

        {/* Menu items */}
        {searchQuery ? (
          <div className="space-y-3">
            <h2 className="text-title-md text-on-surface-variant font-medium">
              Resultados para &ldquo;{searchQuery}&rdquo;
            </h2>
            <div role="list" aria-label="Resultados da busca">
              {filteredItems.map((item) => (
                <div key={item.id} className="mb-3" role="listitem">
                  <div
                    onClick={() => handleAddItem(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleAddItem(item);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={item.name}
                    className="bg-surface rounded-radius-lg p-3 shadow-level-1 hover:shadow-level-2 transition-shadow cursor-pointer"
                  >
                    <h3 className="text-title-sm font-medium text-on-surface">
                      {item.name}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      {formatPrice(item.promotional_price ?? item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          categories.map((cat) => (
            <MenuSection
              key={cat.id}
              category={cat}
              items={filteredItems.filter(
                (i) => i.category_id === cat.id
              )}
              onAddItem={handleAddItem}
              onViewDetails={setSelectedItem}
              isActive={!searchQuery && cat.id === activeCategory}
            />
          ))
        )}
      </main>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setCartOpen(true)}
            className="shadow-level-3 hover:shadow-level-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            Ver Pedido ({cart.length}) • {formatPrice(cartTotal)}
          </Button>
        </div>
      )}

      {/* Item detail modal */}
      <ItemDetailModal
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddCustomItem}
      />

      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        store={store}
        customerName={customerName}
        customerNotes={customerNotes}
        onCustomerNameChange={setCustomerName}
        onCustomerNotesChange={setCustomerNotes}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
