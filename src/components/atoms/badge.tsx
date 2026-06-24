import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary-container text-on-primary-container",
  secondary:
    "bg-secondary-container text-on-secondary-container",
  error:
    "bg-error-container text-on-error-container",
  success:
    "bg-success-container text-on-success-container",
  outline:
    "bg-transparent border border-outline text-on-surface-variant",
  warning:
    "bg-warning-container text-on-warning-container",
  neutral:
    "bg-surface-container-high text-on-surface-variant",
  whatsapp:
    "bg-whatsapp-container text-on-whatsapp-container",
} as const;

const sizes = {
  sm: "px-2 py-0.5 text-label-sm",
  md: "px-2.5 py-1 text-label-md",
  lg: "px-3 py-1.5 text-label-md",
} as const;

type BadgeVariant = keyof typeof variants;
type BadgeSize = keyof typeof sizes;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  as?: ElementType;
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "neutral",
      size = "md",
      as: Component = "span",
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-radius-full font-medium leading-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
            aria-hidden="true"
          />
        )}
        {children}
      </Component>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize };
