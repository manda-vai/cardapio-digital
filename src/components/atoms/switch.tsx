"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const switchId = id || `switch-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group",
          className
        )}
      >
        <div className="relative inline-flex h-6 w-11 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            role="switch"
            className="sr-only peer"
            aria-checked={props.checked}
            {...props}
          />
          <div
            className={cn(
              "absolute inset-0 rounded-radius-full transition-colors duration-200",
              "bg-surface-variant border border-outline",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
              "group-hover:bg-surface-container-high peer-checked:group-hover:brightness-110",
              "peer-disabled:opacity-38 peer-disabled:cursor-not-allowed"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute top-0.5 left-0.5 h-5 w-5 rounded-radius-full bg-on-primary shadow-level-1 transition-transform duration-200",
              "peer-checked:translate-x-5",
              "peer-checked:bg-on-primary"
            )}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-body-md text-on-surface font-medium">
            {label}
          </span>
          {description && (
            <span className="text-body-sm text-on-surface-variant">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, type SwitchProps };
