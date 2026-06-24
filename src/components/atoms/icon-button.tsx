import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string; // required for accessibility
  size?: "sm" | "md" | "lg";
  variant?: "standard" | "filled" | "tonal" | "outlined";
}

const variantStyles = {
  standard:
    "text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant",
  filled:
    "bg-surface-container-high text-on-surface hover:brightness-95 active:brightness-90",
  tonal:
    "bg-secondary-container text-on-secondary-container hover:brightness-95 active:brightness-90",
  outlined:
    "border border-outline text-on-surface-variant hover:bg-surface-container-high",
} as const;

const sizeStyles = {
  sm: "h-8 w-8",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = "md",
      variant = "standard",
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-radius-full transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "disabled:opacity-38 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, type IconButtonProps };
