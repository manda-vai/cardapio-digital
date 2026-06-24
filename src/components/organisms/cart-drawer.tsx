"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { IconButton } from "@/components/atoms/icon-button";
import { Separator } from "@/components/atoms/separator";
import { CartItemRow } from "@/components/molecules/cart-item-row";
import { formatPrice } from "@/components/molecules/price-display";
import { WhatsAppButton } from "@/components/molecules/whatsapp-button";
import type { CartItem, Store } from "@/types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  store: Store | null;
  customerName: string;
  customerNotes: string;
  onCustomerNameChange: (name: string) => void;
  onCustomerNotesChange: (notes: string) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  store,
  customerName,
  customerNotes,
  onCustomerNameChange,
  onCustomerNotesChange,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Build WhatsApp message
  const buildWhatsAppMessage = useCallback(() => {
    if (!store) return "";

    let message = `🛵 *Pedido - ${store.name}*\n\n`;
    message += `*Cliente:* ${customerName || "Não informado"}\n\n`;
    message += `*Itens do Pedido:*\n`;

    let total = 0;
    items.forEach((cartItem, i) => {
      const modifiers = Object.values(cartItem.selected_modifiers || {})
        .flat()
        .join(", ");
      message += `${i + 1}. ${cartItem.quantity}x ${cartItem.item.name}`;
      if (modifiers) message += ` (${modifiers})`;
      message += ` - ${formatPrice(cartItem.total_price)}\n`;
      if (cartItem.notes) message += `   📝 Obs: ${cartItem.notes}\n`;
      total += cartItem.total_price;
    });

    message += `\n*Total: ${formatPrice(total)}*\n`;

    if (store.delivery_fee > 0) {
      message += `*Taxa de entrega:* ${formatPrice(store.delivery_fee)}\n`;
      message += `*Total com entrega:* ${formatPrice(total + store.delivery_fee)}\n`;
    }

    if (customerNotes) {
      message += `\n📝 *Observações:* ${customerNotes}\n`;
    }

    message += `\nObrigado! 🎉`;
    return message;
  }, [items, store, customerName, customerNotes]);

  const totalAmount = items.reduce((sum, item) => sum + item.total_price, 0);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/32 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-radius-xl shadow-level-4",
          "max-h-[85vh] flex flex-col",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Seu Pedido
          </h2>
          <IconButton
            aria-label="Fechar carrinho"
            size="sm"
            variant="standard"
            onClick={onClose}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </IconButton>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="h-12 w-12 text-on-surface-variant/40 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <p className="text-body-md text-on-surface-variant">
                Seu carrinho está vazio
              </p>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Adicione itens do cardápio para começar
              </p>
            </div>
          ) : (
            <div role="list" aria-label="Itens no carrinho">
              {items.map((item, index) => (
                <CartItemRow
                  key={`${item.item.id}-${index}`}
                  item={item}
                  index={index}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Customer info & submit */}
        {items.length > 0 && (
          <div className="shrink-0 px-4 pb-4 pt-2 border-t border-outline-variant">
            {/* Customer name */}
            <div className="mb-3">
              <label
                htmlFor="cart-customer-name"
                className="text-label-md text-on-surface-variant font-medium block mb-1"
              >
                Seu nome <span className="text-error">*</span>
              </label>
              <input
                id="cart-customer-name"
                type="text"
                value={customerName}
                onChange={(e) => onCustomerNameChange(e.target.value)}
                placeholder="Digite seu nome"
                required
                className="w-full px-3 py-2 bg-surface-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-radius-sm border-0 focus-visible:border-primary focus-visible:outline-none"
              />
            </div>

            {/* Notes */}
            <div className="mb-3">
              <label
                htmlFor="cart-notes"
                className="text-label-md text-on-surface-variant font-medium block mb-1"
              >
                Observações
              </label>
              <textarea
                id="cart-notes"
                value={customerNotes}
                onChange={(e) => onCustomerNotesChange(e.target.value)}
                placeholder="Alguma observação? Ex: ponto da carne, sem cebola..."
                rows={2}
                className="w-full px-3 py-2 bg-surface-variant text-on-surface placeholder:text-on-surface-variant/60 rounded-radius-sm border-0 focus-visible:border-primary focus-visible:outline-none resize-none"
              />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-title-md text-on-surface font-semibold">
                Total
              </span>
              <span className="text-headline-sm text-primary font-bold">
                {formatPrice(totalAmount)}
              </span>
            </div>

            {/* WhatsApp button */}
            <WhatsAppButton
              phone={store?.whatsapp || ""}
              message={buildWhatsAppMessage()}
              size="lg"
              fullWidth
              disabled={!customerName.trim()}
              aria-label="Enviar pedido por WhatsApp"
            >
              Enviar Pedido via WhatsApp
            </WhatsAppButton>
          </div>
        )}
      </div>
    </>
  );
}
