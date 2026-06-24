"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Select } from "@/components/atoms/select";
import { Textarea } from "@/components/atoms/textarea";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { IconButton } from "@/components/atoms/icon-button";
import { Dialog } from "@/components/atoms/dialog";
import { formatPrice } from "@/components/molecules/price-display";
import type { Category, MenuItem } from "@/types";

interface MenuEditorProps {
  categories: Category[];
  items: MenuItem[];
  storeId: string;
  className?: string;
}

export function MenuEditor({
  categories,
  items,
  storeId,
  className,
}: MenuEditorProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showNewItem, setShowNewItem] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category_id === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAvailability = (item: MenuItem) => {
    // In production, this would call Supabase
    item.is_available = !item.is_available;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-xs">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar itens..."
            aria-label="Buscar itens do cardápio"
            className="w-full px-3 py-2 bg-surface-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-radius-full border-0 focus-visible:border-primary focus-visible:outline-none"
          />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowNewItem(true)}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Item
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-3 py-1.5 text-label-md font-medium whitespace-nowrap rounded-radius-full transition-colors",
            activeCategory === "all"
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          Todos ({items.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-3 py-1.5 text-label-md font-medium whitespace-nowrap rounded-radius-full transition-colors",
              activeCategory === cat.id
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            {cat.icon} {cat.name} ({items.filter((i) => i.category_id === cat.id).length})
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="space-y-2" role="list" aria-label="Itens do cardápio">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            variant="outlined"
            role="listitem"
            className={cn(
              "flex items-center gap-3 p-3",
              !item.is_available && "opacity-55"
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-title-sm text-on-surface font-medium truncate">
                  {item.name}
                </h3>
                {!item.is_available && (
                  <Badge variant="error" size="sm">
                    Indisponível
                  </Badge>
                )}
                {item.promotional_price && (
                  <Badge variant="error" size="sm">
                    OFERTA
                  </Badge>
                )}
              </div>
              <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-label-md text-on-surface font-medium">
                  {formatPrice(item.price)}
                </span>
                {item.modifier_groups && item.modifier_groups.length > 0 && (
                  <Badge variant="neutral" size="sm">
                    {item.modifier_groups.length} grupo(s)
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <IconButton
                aria-label={item.is_available ? "Marcar como indisponível" : "Marcar como disponível"}
                size="sm"
                variant="standard"
                onClick={() => toggleAvailability(item)}
                className={item.is_available ? "text-success" : "text-on-surface-variant"}
              >
                {item.is_available ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </IconButton>
              <IconButton
                aria-label={`Editar ${item.name}`}
                size="sm"
                variant="standard"
                onClick={() => setEditingItem(item)}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </IconButton>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body-md text-on-surface-variant">
            Nenhum item encontrado.
          </p>
        </div>
      )}

      {/* Edit Item Dialog */}
      <Dialog
        open={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={`Editar: ${editingItem?.name}`}
      >
        {editingItem && (
          <div className="space-y-4">
            <Input
              label="Nome"
              defaultValue={editingItem.name}
              placeholder="Nome do item"
            />
            <Textarea
              label="Descrição"
              defaultValue={editingItem.description}
              placeholder="Descrição do item"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Preço (R$)"
                type="number"
                step="0.01"
                defaultValue={editingItem.price}
              />
              <Input
                label="Preço Promocional"
                type="number"
                step="0.01"
                defaultValue={editingItem.promotional_price || ""}
                placeholder="Opcional"
              />
            </div>
            <Select
              label="Categoria"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              defaultValue={editingItem.category_id}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setEditingItem(null)}>
                Cancelar
              </Button>
              <Button variant="primary">Salvar</Button>
            </div>
          </div>
        )}
      </Dialog>

      {/* New Item Dialog */}
      <Dialog
        open={showNewItem}
        onClose={() => setShowNewItem(false)}
        title="Novo Item"
      >
        <div className="space-y-4">
          <Input label="Nome" placeholder="Nome do item" required />
          <Textarea label="Descrição" placeholder="Descrição do item" />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              required
            />
            <Input
              label="Preço Promocional"
              type="number"
              step="0.01"
              placeholder="Opcional"
            />
          </div>
          <Select
            label="Categoria"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            defaultValue={categories[0]?.id}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowNewItem(false)}>
              Cancelar
            </Button>
            <Button variant="primary">Criar Item</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
