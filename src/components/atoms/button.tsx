"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-on-primary hover:brightness-110 active:brightness-90 shadow-level-1 hover:shadow-level-2",
  secondary:
    "bg-transparent text-primary border-2 border-outline hover:bg-primary-container hover:border-primary active:bg-primary-container-high",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant",
  whatsapp:
    "bg-whatsapp text-on-whatsapp hover:brightness-110 active:brightness-90 shadow-level-2 hover:shadow-level-3",
  destructive:
    "bg-error text-on-error hover:brightness-110 active:brightness-90",
  outline:
    "bg-transparent text-primary border border-outline hover:bg-primary-container active:bg-primary-container-high",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-label-md h-9",
  md: "px-5 py-2.5 text-label-lg h-11",
  lg: "px-7 py-3.5 text-label-lg h-13",
  xl: "px-8 py-4 text-label-lg h-14",
  icon: "p-2.5 h-11 w-11",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-radius-md font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "disabled:opacity-38 disabled:pointer-events-none disabled:shadow-none",
          "select-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
