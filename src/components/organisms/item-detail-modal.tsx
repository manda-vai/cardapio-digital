"use client";

import { useState, useCallback } from "react";
import { Dialog } from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { PriceDisplay } from "@/components/molecules/price-display";
import { ModifierSelector } from "@/components/molecules/modifier-selector";
import type { MenuItem, CartItem } from "@/types";

interface ItemDetailModalProps {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export function ItemDetailModal({
  item,
  open,
  onClose,
  onAddToCart,
}: ItemDetailModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<string, string[]>
  >({});
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Reset state when modal opens with a new item
  const handleClose = useCallback(() => {
    setSelectedModifiers({});
    setNotes("");
    setQuantity(1);
    onClose();
  }, [onClose]);

  if (!item) return null;

  const extraPrice = Object.entries(selectedModifiers).reduce((total, [, optionIds]) => {
    const group = item.modifier_groups?.find((g) =>
      optionIds.some((oid) => g.options.some((o) => o.id === oid))
    );
    if (!group) return total;
    return (
      total +
      optionIds.reduce((sum, oid) => {
        const opt = group.options.find((o) => o.id === oid);
        return sum + (opt?.price_adjustment || 0);
      }, 0)
    );
  }, 0);

  const unitPrice = (item.promotional_price ?? item.price) + extraPrice;
  const totalPrice = unitPrice * quantity;

  const canAdd =
    !item.modifier_groups?.length ||
    item.modifier_groups.every((group) => {
      if (!group.is_required) return true;
      return (selectedModifiers[group.id]?.length ?? 0) >= group.min_options;
    });

  const handleAdd = () => {
    if (!canAdd) return;
    onAddToCart({
      item,
      quantity,
      selected_modifiers: selectedModifiers,
      notes,
      unit_price: unitPrice,
      total_price: totalPrice,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} title={item.name}>
      <div className="space-y-4">
        {/* Image */}
        {item.image_url && (
          <div className="w-full h-48 rounded-radius-md overflow-hidden bg-surface-container-high">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-body-md text-on-surface-variant">
          {item.description}
        </p>

        {/* Price */}
        <PriceDisplay
          price={item.price}
          promotionalPrice={item.promotional_price}
          size="lg"
        />

        {/* Dietary tags */}
        {item.dietary_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.dietary_tags.map((tag) => (
              <Badge key={tag} variant="neutral" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Preparation time */}
        {item.preparation_time && (
          <p className="text-body-sm text-on-surface-variant flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Tempo de preparo: ~{item.preparation_time} min
          </p>
        )}

        {/* Modifiers */}
        {item.modifier_groups?.map((group) => (
          <ModifierSelector
            key={group.id}
            group={group}
            selectedOptions={selectedModifiers[group.id] || []}
            onSelectionChange={(groupId, optionIds) => {
              setSelectedModifiers((prev) => ({
                ...prev,
                [groupId]: optionIds,
              }));
            }}
          />
        ))}

        {/* Notes */}
        <div>
          <label
            htmlFor="item-notes"
            className="text-label-md text-on-surface-variant font-medium block mb-1"
          >
            Alguma observação?
          </label>
          <textarea
            id="item-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: ponto da carne, sem cebola..."
            rows={2}
            className="w-full px-3 py-2 bg-surface-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-radius-sm border-0 focus-visible:border-primary focus-visible:outline-none resize-none"
          />
        </div>

        {/* Quantity + Add */}
        <div className="flex items-center gap-3 pt-2">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Quantidade"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Diminuir quantidade"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Button>
            <span
              className="w-10 text-center text-title-md font-semibold tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Aumentar quantidade"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Button>
          </div>

          <div className="flex-1" />

          <Button
            variant="primary"
            size="lg"
            onClick={handleAdd}
            disabled={!canAdd}
            className="flex-1 sm:flex-none"
          >
            Adicionar • {formatPrice(totalPrice)}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
