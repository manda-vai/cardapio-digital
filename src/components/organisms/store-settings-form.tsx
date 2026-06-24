"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Switch } from "@/components/atoms/switch";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import type { Store } from "@/types";

interface StoreSettingsFormProps {
  store: Store;
  onSave?: (data: Partial<Store>) => void;
  className?: string;
}

export function StoreSettingsForm({
  store,
  onSave,
  className,
}: StoreSettingsFormProps) {
  const [formData, setFormData] = useState({
    name: store.name,
    description: store.description,
    slug: store.slug,
    whatsapp: store.whatsapp,
    phone: store.phone,
    instagram: store.instagram || "",
    address: store.address,
    delivery_info: store.delivery_info,
    delivery_fee: store.delivery_fee,
    delivery_min_order: store.delivery_min_order,
    theme_primary_color: store.theme_primary_color,
    has_delivery: store.has_delivery,
    has_takeout: store.has_takeout,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    onSave?.(formData);
    setSaving(false);
  };

  const handleChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Store Info */}
      <Card variant="outlined">
        <div className="space-y-4">
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Informações da Loja
          </h2>

          <Input
            label="Nome da Loja"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <Textarea
            label="Descrição"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Descreva seu restaurante..."
          />

          <Input
            label="URL (slug)"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            helperText="Ex: burger-do-ze → cardapio.digital/burger-do-ze"
          />
        </div>
      </Card>

      {/* Contact */}
      <Card variant="outlined">
        <div className="space-y-4">
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Contato & Redes
          </h2>

          <Input
            label="WhatsApp"
            value={formData.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            placeholder="5585987654321"
            helperText="Número com código do país, sem + ou espaços"
            required
          />

          <Input
            label="Telefone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(85) 3234-5678"
          />

          <Input
            label="Instagram"
            value={formData.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
            placeholder="@seurestaurante"
          />
        </div>
      </Card>

      {/* Address & Delivery */}
      <Card variant="outlined">
        <div className="space-y-4">
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Endereço & Delivery
          </h2>

          <Textarea
            label="Endereço"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Rua, número, bairro, cidade - UF"
          />

          <Textarea
            label="Informações de Entrega"
            value={formData.delivery_info}
            onChange={(e) => handleChange("delivery_info", e.target.value)}
            placeholder="Taxa, áreas atendidas, tempo médio..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Taxa de Entrega (R$)"
              type="number"
              step="0.01"
              value={formData.delivery_fee}
              onChange={(e) =>
                handleChange("delivery_fee", parseFloat(e.target.value) || 0)
              }
            />
            <Input
              label="Pedido Mínimo (R$)"
              type="number"
              step="0.01"
              value={formData.delivery_min_order}
              onChange={(e) =>
                handleChange(
                  "delivery_min_order",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-3 pt-2">
            <Switch
              label="Delivery ativo"
              description="Aceitar pedidos para entrega"
              checked={formData.has_delivery}
              onChange={(e) =>
                handleChange("has_delivery", e.target.checked)
              }
            />
            <Switch
              label="Retirada no local"
              description="Cliente pode retirar o pedido"
              checked={formData.has_takeout}
              onChange={(e) =>
                handleChange("has_takeout", e.target.checked)
              }
            />
          </div>
        </div>
      </Card>

      {/* Theme */}
      <Card variant="outlined">
        <div className="space-y-4">
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Personalização
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-on-surface-variant font-medium">
                Cor Principal
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.theme_primary_color}
                  onChange={(e) =>
                    handleChange("theme_primary_color", e.target.value)
                  }
                  className="h-10 w-10 rounded-radius-md border border-outline cursor-pointer bg-transparent"
                  aria-label="Cor principal da loja"
                />
                <span className="text-body-sm text-on-surface-variant font-mono">
                  {formData.theme_primary_color}
                </span>
              </div>
            </div>
            <Badge variant="neutral" size="md">
              A cor aparece nos botões e destaques
            </Badge>
          </div>
        </div>
      </Card>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost">Cancelar</Button>
        <Button
          variant="primary"
          onClick={handleSave}
          loading={saving}
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
