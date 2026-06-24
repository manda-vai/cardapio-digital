"use client";

import { memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/atoms/icon-button";
import { formatPrice } from "@/components/molecules/price-display";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemIndex: number, delta: number) => void;
  onRemove: (itemIndex: number) => void;
  index: number;
}

export const CartItemRow = memo(function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  index,
}: CartItemRowProps) {
  const modifierSummary = Object.values(item.selected_modifiers || {})
    .flat()
    .join(", ");

  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 border-b border-outline-variant/50 last:border-0"
      )}
      role="group"
      aria-label={`${item.item.name} - ${item.quantity}x - ${formatPrice(item.total_price)}`}
    >
      {/* Item info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-body-md text-on-surface font-medium truncate">
            {item.item.name}
          </h4>
          <span className="text-body-md text-on-surface font-semibold ml-2 shrink-0">
            {formatPrice(item.total_price)}
          </span>
        </div>
        {modifierSummary && (
          <p className="text-label-sm text-on-surface-variant mt-0.5 truncate">
            {modifierSummary}
          </p>
        )}
        {item.notes && (
          <p className="text-label-sm text-on-surface-variant italic mt-0.5 truncate">
            Obs: {item.notes}
          </p>
        )}
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1 shrink-0" role="group" aria-label={`Quantidade de ${item.item.name}`}>
        <IconButton
          aria-label={`Diminuir quantidade de ${item.item.name}`}
          size="sm"
          variant="outlined"
          onClick={() => {
            if (item.quantity <= 1) {
              onRemove(index);
            } else {
              onUpdateQuantity(index, -1);
            }
          }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </IconButton>
        <span
          className="w-8 text-center text-body-md font-medium text-on-surface tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {item.quantity}
        </span>
        <IconButton
          aria-label={`Aumentar quantidade de ${item.item.name}`}
          size="sm"
          variant="outlined"
          onClick={() => onUpdateQuantity(index, 1)}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </IconButton>
        <IconButton
          aria-label={`Remover ${item.item.name} do carrinho`}
          size="sm"
          variant="standard"
          onClick={() => onRemove(index)}
          className="text-on-surface-variant/50 hover:text-error"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
});
