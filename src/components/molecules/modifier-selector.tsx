"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ModifierGroup } from "@/types";

interface ModifierSelectorProps {
  group: ModifierGroup;
  selectedOptions: string[];
  onSelectionChange: (groupId: string, optionIds: string[]) => void;
  className?: string;
}

export function ModifierSelector({
  group,
  selectedOptions,
  onSelectionChange,
  className,
}: ModifierSelectorProps) {
  const isSingle = group.type === "single";

  const handleOptionToggle = useCallback(
    (optionId: string) => {
      if (isSingle) {
        onSelectionChange(group.id, [optionId]);
      } else {
        const isSelected = selectedOptions.includes(optionId);
        if (isSelected) {
          onSelectionChange(
            group.id,
            selectedOptions.filter((id) => id !== optionId)
          );
        } else {
          if (selectedOptions.length >= group.max_options) return;
          onSelectionChange(group.id, [...selectedOptions, optionId]);
        }
      }
    },
    [isSingle, group.id, group.max_options, selectedOptions, onSelectionChange]
  );

  return (
    <fieldset className={cn("space-y-2", className)}>
      <legend className="text-title-sm text-on-surface font-semibold mb-2">
        {group.name}
        {group.is_required && (
          <span className="text-error ml-1 text-label-md" aria-hidden="true">
            *
          </span>
        )}
        {group.is_required && (
          <span className="sr-only">(Obrigatório)</span>
        )}
        {!isSingle && (
          <span className="text-label-sm text-on-surface-variant font-normal ml-2">
            ({group.min_options > 0
              ? `Mín: ${group.min_options}, `
              : ""}
            Máx: {group.max_options})
          </span>
        )}
      </legend>

      <div
        className="space-y-1.5"
        role={isSingle ? "radiogroup" : "group"}
        aria-label={group.name}
      >
        {group.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isDisabled =
            !isSingle &&
            !isSelected &&
            selectedOptions.length >= group.max_options;

          return (
            <label
              key={option.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-radius-md cursor-pointer transition-all duration-150",
                "border border-outline-variant",
                isSelected
                  ? "bg-primary-container border-primary"
                  : "hover:bg-surface-container-high",
                isDisabled && "opacity-38 cursor-not-allowed",
                "focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-primary"
              )}
            >
              <input
                type={isSingle ? "radio" : "checkbox"}
                name={group.id}
                value={option.id}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleOptionToggle(option.id)}
                className={cn(
                  "h-4 w-4 accent-primary",
                  isSingle
                    ? "rounded-radius-full"
                    : "rounded-radius-xs"
                )}
                aria-label={`${option.name}${option.price_adjustment ? `: ${option.price_adjustment > 0 ? "+" : ""}R$ ${option.price_adjustment.toFixed(2)}` : ""}`}
              />
              <span className="flex-1 text-body-md text-on-surface">
                {option.name}
              </span>
              {option.price_adjustment !== 0 && (
                <span className="text-label-sm text-on-surface-variant shrink-0">
                  {option.price_adjustment > 0 ? "+" : ""}R${" "}
                  {option.price_adjustment.toFixed(2)}
                </span>
              )}
            </label>
          );
        })}
      </div>

      {group.is_required && selectedOptions.length === 0 && (
        <p className="text-label-sm text-error" role="alert">
          Selecione pelo menos uma opção
        </p>
      )}
    </fieldset>
  );
}
