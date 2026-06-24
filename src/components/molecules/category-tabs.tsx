"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      if (
        activeRect.left < containerRect.left ||
        activeRect.right > containerRect.right
      ) {
        active.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const tabs = Array.from(
        e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]'
        ) || []
      );
      const currentIndex = tabs.indexOf(e.currentTarget as HTMLButtonElement);

      let nextIndex = -1;
      if (e.key === "ArrowRight") {
        nextIndex = Math.min(currentIndex + 1, tabs.length - 1);
      } else if (e.key === "ArrowLeft") {
        nextIndex = Math.max(currentIndex - 1, 0);
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex >= 0 && nextIndex < tabs.length) {
        e.preventDefault();
        tabs[nextIndex]?.click();
        tabs[nextIndex]?.focus();
      }
    },
    []
  );

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-none pb-1",
        className
      )}
      role="tablist"
      aria-label="Categorias do cardápio"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          ref={cat.id === activeCategory ? activeRef : undefined}
          role="tab"
          aria-selected={cat.id === activeCategory}
          aria-controls={`panel-${cat.id}`}
          id={`tab-${cat.id}`}
          tabIndex={cat.id === activeCategory ? 0 : -1}
          onClick={() => onCategoryChange(cat.id)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-label-md font-medium whitespace-nowrap rounded-radius-full transition-all duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            cat.id === activeCategory
              ? "bg-secondary-container text-on-secondary-container shadow-level-1"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          {cat.icon && (
            <span className="text-base" role="img" aria-label="">
              {cat.icon}
            </span>
          )}
          {cat.name}
        </button>
      ))}
    </div>
  );
}
