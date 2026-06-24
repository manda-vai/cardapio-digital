"use client";

import { cn } from "@/lib/utils";
import { MenuItemCard } from "@/components/molecules/menu-item-card";
import type { Category, MenuItem } from "@/types";

interface MenuSectionProps {
  category: Category;
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
  isActive: boolean;
  className?: string;
}

export function MenuSection({
  category,
  items,
  onAddItem,
  onViewDetails,
  isActive,
  className,
}: MenuSectionProps) {
  if (!isActive) return null;

  return (
    <section
      id={`panel-${category.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${category.id}`}
      className={cn("space-y-3", className)}
    >
      {category.description && (
        <p className="text-body-md text-on-surface-variant px-0.5">
          {category.description}
        </p>
      )}

      <div className="space-y-3" role="list" aria-label={`Itens de ${category.name}`}>
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <MenuItemCard
              item={item}
              onAdd={onAddItem}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body-md text-on-surface-variant">
            Nenhum item nesta categoria ainda.
          </p>
        </div>
      )}
    </section>
  );
}
