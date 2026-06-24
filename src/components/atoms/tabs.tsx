"use client";

import {
  forwardRef,
  useCallback,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function Tabs({
  value,
  onValueChange,
  children,
  className,
  orientation = "horizontal",
}: TabsProps) {
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row overflow-x-auto gap-1" : "flex-col gap-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

Tabs.displayName = "Tabs";

interface TabTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  currentValue?: string;
  onValueChange?: (value: string) => void;
  badge?: number | string;
}

const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  (
    {
      value,
      currentValue,
      onValueChange,
      badge,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isActive = value === currentValue;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onValueChange?.(value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            const tabs = e.currentTarget
              .closest('[role="tablist"]')
              ?.querySelectorAll<HTMLElement>('[role="tab"]');
            if (!tabs) return;
            const currentIndex = Array.from(tabs).indexOf(e.currentTarget);
            const nextIndex =
              e.key === "ArrowRight"
                ? Math.min(currentIndex + 1, tabs.length - 1)
                : Math.max(currentIndex - 1, 0);
            tabs[nextIndex]?.focus();
            tabs[nextIndex]?.click();
          }
        }}
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-2 text-label-md font-medium rounded-radius-full transition-all duration-200 whitespace-nowrap",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          isActive
            ? "bg-secondary-container text-on-secondary-container shadow-level-1"
            : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
          className
        )}
        {...props}
      >
        {children}
        {badge !== undefined && (
          <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 text-label-sm rounded-radius-full bg-primary text-on-primary">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

TabTrigger.displayName = "TabTrigger";

interface TabContentProps {
  value: string;
  currentValue?: string;
  children: ReactNode;
  className?: string;
}

function TabContent({ value, currentValue, children, className }: TabContentProps) {
  if (value !== currentValue) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn("focus-visible:outline-none", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

TabContent.displayName = "TabContent";

export { Tabs, TabTrigger, TabContent, type TabsProps, type TabTriggerProps, type TabContentProps };
