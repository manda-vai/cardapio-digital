"use client";

import { useState } from "react";
import { OrderCard } from "@/components/organisms/order-card";
import { Tabs, TabTrigger, TabContent } from "@/components/atoms/tabs";
import { toast } from "sonner";
import type { Order } from "@/types";

// Mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    store_id: "store-001",
    customer_name: "Carlos Silva",
    customer_phone: "(85) 99876-5432",
    customer_notes: "Sem cebola, por favor",
    items: [
      {
        item_id: "item-001",
        item_name: "Classic Burger",
        quantity: 2,
        unit_price: 24.9,
        total_price: 49.8,
        modifiers: ["Ao ponto", "Bacon"],
        notes: "",
      },
      {
        item_id: "item-010",
        item_name: "Batata Frita",
        quantity: 1,
        unit_price: 14.9,
        total_price: 14.9,
        modifiers: ["Grande (2 pessoas)"],
        notes: "",
      },
      {
        item_id: "item-020",
        item_name: "Coca-Cola Lata",
        quantity: 2,
        unit_price: 6.0,
        total_price: 12.0,
        modifiers: [],
        notes: "",
      },
    ],
    total_amount: 76.7,
    status: "received",
    source: "whatsapp",
    created_at: "2026-06-24T19:30:00Z",
    updated_at: "2026-06-24T19:30:00Z",
  },
  {
    id: "ord-002",
    store_id: "store-001",
    customer_name: "Maria Santos",
    customer_phone: "(85) 98765-4321",
    customer_notes: "",
    items: [
      {
        item_id: "item-002",
        item_name: "Smash Burger",
        quantity: 1,
        unit_price: 34.9,
        total_price: 34.9,
        modifiers: ["Jalapeño"],
        notes: "",
      },
      {
        item_id: "item-021",
        item_name: "Guaraná Antarctica",
        quantity: 1,
        unit_price: 5.5,
        total_price: 5.5,
        modifiers: [],
        notes: "",
      },
    ],
    total_amount: 40.4,
    status: "preparing",
    source: "whatsapp",
    created_at: "2026-06-24T19:15:00Z",
    updated_at: "2026-06-24T19:18:00Z",
  },
  {
    id: "ord-003",
    store_id: "store-001",
    customer_name: "João Oliveira",
    customer_phone: "(85) 97654-3210",
    customer_notes: "Quero bem passado",
    items: [
      {
        item_id: "item-001",
        item_name: "Classic Burger",
        quantity: 1,
        unit_price: 24.9,
        total_price: 24.9,
        modifiers: ["Bem passado", "Cheddar extra"],
        notes: "",
      },
    ],
    total_amount: 27.9,
    status: "ready",
    source: "whatsapp",
    created_at: "2026-06-24T18:50:00Z",
    updated_at: "2026-06-24T19:05:00Z",
  },
  {
    id: "ord-004",
    store_id: "store-001",
    customer_name: "Ana Costa",
    customer_phone: "(85) 96543-2109",
    customer_notes: "",
    items: [
      {
        item_id: "item-040",
        item_name: "Combo Casal",
        quantity: 1,
        unit_price: 64.9,
        total_price: 64.9,
        modifiers: [],
        notes: "",
      },
      {
        item_id: "item-030",
        item_name: "Petit Gateau",
        quantity: 2,
        unit_price: 22.9,
        total_price: 45.8,
        modifiers: [],
        notes: "",
      },
    ],
    total_amount: 110.7,
    status: "delivered",
    source: "whatsapp",
    created_at: "2026-06-24T17:30:00Z",
    updated_at: "2026-06-24T18:00:00Z",
  },
];

const TABS = [
  { value: "all", label: "Todos", count: MOCK_ORDERS.length },
  {
    value: "received",
    label: "Recebidos",
    count: MOCK_ORDERS.filter((o) => o.status === "received").length,
  },
  {
    value: "preparing",
    label: "Preparando",
    count: MOCK_ORDERS.filter((o) => o.status === "preparing").length,
  },
  {
    value: "ready",
    label: "Pronto",
    count: MOCK_ORDERS.filter((o) => o.status === "ready").length,
  },
  {
    value: "delivered",
    label: "Entregue",
    count: MOCK_ORDERS.filter((o) => o.status === "delivered").length,
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status === activeTab);

  const handleUpdateStatus = (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
    toast.success(`Pedido atualizado para "${getStatusLabel(newStatus)}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md text-on-background font-bold">
          Pedidos
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Acompanhe e gerencie os pedidos recebidos
        </p>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto scrollbar-none">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {TABS.map((tab) => (
            <TabTrigger
              key={tab.value}
              value={tab.value}
              currentValue={activeTab}
              onValueChange={setActiveTab}
              badge={tab.count}
            >
              {tab.label}
            </TabTrigger>
          ))}
        </Tabs>
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body-md text-on-surface-variant">
              Nenhum pedido encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusLabel(status: Order["status"]): string {
  const labels: Record<string, string> = {
    received: "Recebido",
    preparing: "Preparando",
    ready: "Pronto",
    delivered: "Entregue",
    cancelled: "Cancelado",
  };
  return labels[status] || status;
}
