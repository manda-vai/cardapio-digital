"use client";

import { memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { PriceDisplay } from "@/components/molecules/price-display";
import type { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
  onViewDetails?: (item: MenuItem) => void;
  className?: string;
}

export const MenuItemCard = memo(function MenuItemCard({
  item,
  onAdd,
  onViewDetails,
  className,
}: MenuItemCardProps) {
  const hasModifiers = (item.modifier_groups?.length ?? 0) > 0;
  const isOnSale =
    item.promotional_price != null && item.promotional_price < item.price;

  const handleClick = useCallback(() => {
    if (hasModifiers && onViewDetails) {
      onViewDetails(item);
    } else if (onAdd) {
      onAdd(item);
    }
  }, [hasModifiers, item, onAdd, onViewDetails]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <Card
      variant="elevated"
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-level-2",
        !item.is_available && "opacity-55 pointer-events-none",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={item.is_available ? 0 : -1}
      role="button"
      aria-label={`${item.name} - ${formatPrice(item.price)}${
        isOnSale ? ` (promoção: ${formatPrice(item.promotional_price!)})` : ""
      }${!item.is_available ? " - Indisponível" : ""}`}
      aria-disabled={!item.is_available}
    >
      <div className="flex gap-3">
        {/* Image */}
        {item.image_url ? (
          <div className="w-20 h-20 shrink-0 rounded-radius-md overflow-hidden bg-surface-container-high">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-20 h-20 shrink-0 rounded-radius-md bg-surface-container-high flex items-center justify-center">
            <svg
              className="h-8 w-8 text-on-surface-variant/40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-1.5">
              <h3 className="text-title-md text-on-surface font-semibold truncate">
                {item.name}
              </h3>
              {isOnSale && (
                <Badge variant="error" size="sm" className="shrink-0">
                  OFERTA
                </Badge>
              )}
            </div>
            <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <PriceDisplay
              price={item.price}
              promotionalPrice={item.promotional_price}
              size="sm"
            />

            {/* Dietary tags */}
            {item.dietary_tags.length > 0 && (
              <div className="flex gap-1 flex-wrap justify-end">
                {item.dietary_tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Unavailable badge */}
          {!item.is_available && (
            <Badge variant="error" size="sm" className="mt-1 self-start">
              Indisponível
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
});

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
