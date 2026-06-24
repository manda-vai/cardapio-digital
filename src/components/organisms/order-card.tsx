"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import type { Order } from "@/types";

interface OrderCardProps {
  order: Order;
  onUpdateStatus?: (orderId: string, newStatus: Order["status"]) => void;
  className?: string;
}

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; variant: "neutral" | "warning" | "success" | "error"; nextStatus?: Order["status"] }
> = {
  received: {
    label: "Recebido",
    variant: "neutral",
    nextStatus: "preparing",
  },
  preparing: {
    label: "Preparando",
    variant: "warning",
    nextStatus: "ready",
  },
  ready: {
    label: "Pronto",
    variant: "success",
    nextStatus: "delivered",
  },
  delivered: {
    label: "Entregue",
    variant: "success",
  },
  cancelled: {
    label: "Cancelado",
    variant: "error",
  },
};

export function OrderCard({ order, onUpdateStatus, className }: OrderCardProps) {
  const status = STATUS_CONFIG[order.status];
  const createdAt = new Date(order.created_at);
  const timeAgo = getTimeAgo(createdAt);

  return (
    <Card variant="outlined" className={cn("", className)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-on-surface font-semibold">
              Pedido #{order.id.slice(-6).toUpperCase()}
            </h3>
            <Badge variant={status.variant} size="sm" dot>
              {status.label}
            </Badge>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            {createdAt.toLocaleString("pt-BR")} ({timeAgo})
          </p>
        </div>
        <span className="text-title-md text-primary font-bold shrink-0">
          {formatPrice(order.total_amount)}
        </span>
      </div>

      {/* Customer info */}
      <div className="bg-surface-container-high rounded-radius-md p-3 mb-3">
        <p className="text-body-md text-on-surface font-medium">
          {order.customer_name}
        </p>
        {order.customer_phone && (
          <p className="text-body-sm text-on-surface-variant">
            {order.customer_phone}
          </p>
        )}
        {order.customer_notes && (
          <p className="text-body-sm text-on-surface-variant mt-1 italic">
            Obs: {order.customer_notes}
          </p>
        )}
      </div>

      {/* Items */}
      <div className="space-y-1.5 mb-3" role="list" aria-label="Itens do pedido">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            role="listitem"
            className="flex items-center justify-between text-body-sm"
          >
            <span className="text-on-surface truncate">
              <span className="text-on-surface-variant">{item.quantity}x</span>{" "}
              {item.item_name}
              {item.modifiers.length > 0 && (
                <span className="text-on-surface-variant">
                  {" "}
                  ({item.modifiers.join(", ")})
                </span>
              )}
            </span>
            <span className="text-on-surface font-medium shrink-0 ml-2">
              {formatPrice(item.total_price)}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {status.nextStatus && onUpdateStatus && (
        <div className="flex gap-2 pt-2 border-t border-outline-variant">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onUpdateStatus(order.id, status.nextStatus!)}
            className="flex-1"
          >
            Avançar para {STATUS_CONFIG[status.nextStatus].label}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdateStatus(order.id, "cancelled")}
            className="text-error"
          >
            Cancelar
          </Button>
        </div>
      )}
    </Card>
  );
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin}min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `há ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `há ${diffDays}d`;
}
