import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  promotionalPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  promotionalPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const priceClasses = {
    sm: "text-label-md",
    md: "text-title-md",
    lg: "text-headline-sm",
  };

  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      {promotionalPrice && promotionalPrice < price ? (
        <>
          <span
            className={cn(
              "font-semibold text-primary",
              priceClasses[size]
            )}
          >
            {formatPrice(promotionalPrice)}
          </span>
          <span
            className={cn(
              "text-on-surface-variant line-through",
              size === "sm"
                ? "text-label-sm"
                : size === "md"
                ? "text-body-sm"
                : "text-body-md"
            )}
            aria-label={`De ${formatPrice(price)}`}
          >
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span
          className={cn(
            "font-semibold text-on-surface",
            priceClasses[size]
          )}
        >
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

PriceDisplay.displayName = "PriceDisplay";

export { formatPrice };
