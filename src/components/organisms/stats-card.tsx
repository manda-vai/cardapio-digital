"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/atoms/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  const dotColors = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <Card variant="elevated" className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-label-md text-on-surface-variant font-medium">
            {title}
          </p>
          <p className="text-display-sm text-on-surface font-bold">
            {value}
          </p>
          {description && (
            <p className="text-body-sm text-on-surface-variant">
              {description}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                "text-label-sm font-medium flex items-center gap-1",
                trend.positive ? "text-success" : "text-error"
              )}
            >
              <svg
                className={cn(
                  "h-3.5 w-3.5",
                  !trend.positive && "rotate-180"
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "h-10 w-10 rounded-radius-md flex items-center justify-center",
              "bg-surface-container-high text-on-surface-variant"
            )}
          >
            {icon}
          </div>
        )}
      </div>
      {/* Accent dot */}
      <span
        className={cn(
          "absolute top-0 right-0 h-1 w-16 rounded-bl-radius-full",
          dotColors[variant]
        )}
        aria-hidden="true"
      />
    </Card>
  );
}
