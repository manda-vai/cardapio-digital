"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { StatsCard } from "@/components/organisms/stats-card";
import { Badge } from "@/components/atoms/badge";
import type { Store } from "@/types";

interface AdminDashboardClientProps {
  stores: Store[];
}

export function AdminDashboardClient({ stores }: AdminDashboardClientProps) {
  const mainStore = stores[0];

  // Mock stats
  const stats = {
    todayOrders: 12,
    todayRevenue: 456.8,
    activeItems: 30,
    avgPreparation: 14,
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Carlos Silva",
      items: 3,
      total: 74.5,
      status: "preparing" as const,
      time: "5 min atrás",
    },
    {
      id: "ORD-002",
      customer: "Maria Santos",
      items: 2,
      total: 42.0,
      status: "received" as const,
      time: "12 min atrás",
    },
    {
      id: "ORD-003",
      customer: "João Oliveira",
      items: 1,
      total: 28.9,
      status: "ready" as const,
      time: "25 min atrás",
    },
    {
      id: "ORD-004",
      customer: "Ana Costa",
      items: 4,
      total: 95.0,
      status: "delivered" as const,
      time: "1h atrás",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-headline-md text-on-background font-bold">
            Dashboard
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Bem-vindo de volta{mainStore ? `, ${mainStore.name}` : ""}!
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/menu">
            <Button variant="primary" size="md">
              Gerenciar Cardápio
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Pedidos Hoje"
          value={stats.todayOrders}
          trend={{ value: "+20% que ontem", positive: true }}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          }
        />
        <StatsCard
          title="Faturamento"
          value={`R$ ${stats.todayRevenue.toFixed(0)}`}
          description={`${stats.todayOrders} pedidos`}
          variant="success"
          trend={{ value: "+35%", positive: true }}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <StatsCard
          title="Itens Ativos"
          value={stats.activeItems}
          description="No cardápio"
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V6" />
              <path d="M4 22h16" />
            </svg>
          }
        />
        <StatsCard
          title="Tempo Médio"
          value={`${stats.avgPreparation} min`}
          description="De preparo"
          variant="warning"
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <Card variant="filled">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-title-md text-on-surface font-semibold">
            Ações Rápidas
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Link href="/admin/menu">
            <Button variant="secondary" size="sm" className="w-full">
              Editar Cardápio
            </Button>
          </Link>
          <Link href="/admin/store">
            <Button variant="secondary" size="sm" className="w-full">
              Config. Loja
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="secondary" size="sm" className="w-full">
              Ver Pedidos
            </Button>
          </Link>
          {mainStore && (
            <Link href={`/cardapio/${mainStore.slug}`} target="_blank">
              <Button variant="secondary" size="sm" className="w-full">
                Ver Cardápio
              </Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Recent Orders */}
      <div>
        <h2 className="text-title-md text-on-surface font-semibold mb-3">
          Pedidos Recentes
        </h2>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <Card key={order.id} variant="outlined" className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <p className="text-title-sm text-on-surface font-medium truncate">
                      {order.customer}
                    </p>
                    <p className="text-label-sm text-on-surface-variant">
                      {order.items} itens • {order.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={
                      order.status === "received"
                        ? "neutral"
                        : order.status === "preparing"
                        ? "warning"
                        : order.status === "ready"
                        ? "success"
                        : "neutral"
                    }
                    size="sm"
                    dot
                  >
                    {order.status === "received"
                      ? "Recebido"
                      : order.status === "preparing"
                      ? "Preparando"
                      : order.status === "ready"
                      ? "Pronto"
                      : "Entregue"}
                  </Badge>
                  <span className="text-title-sm text-on-surface font-semibold">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Store links */}
      {mainStore && (
        <Card variant="filled">
          <h2 className="text-title-md text-on-surface font-semibold mb-2">
            Links da Sua Loja
          </h2>
          <div className="space-y-2 text-body-sm">
            <p>
              <span className="text-on-surface-variant">Cardápio:</span>{" "}
              <a
                href={`/cardapio/${mainStore.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                cardapio.digital/{mainStore.slug}
              </a>
            </p>
            <p>
              <span className="text-on-surface-variant">Pedido:</span>{" "}
              <a
                href={`/pedido/${mainStore.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                cardapio.digital/pedido/{mainStore.slug}
              </a>
            </p>
          </div>
        </Card>
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
