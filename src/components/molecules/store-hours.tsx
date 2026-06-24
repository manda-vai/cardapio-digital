"use client";

import { cn } from "@/lib/utils";
import type { OpeningHours } from "@/types";

interface StoreHoursProps {
  hours: OpeningHours;
  className?: string;
}

const DAY_LABELS: Record<string, string> = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
};

const DAY_ORDER = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

export function StoreHours({ hours, className }: StoreHoursProps) {
  const today = getTodayKey();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isOpenNow = (() => {
    const todayHours = hours[today];
    if (!todayHours?.is_open) return false;
    const [openH, openM] = todayHours.open.split(":").map(Number);
    const [closeH, closeM] = todayHours.close.split(":").map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  })();

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-radius-full",
            isOpenNow ? "bg-success" : "bg-error"
          )}
          aria-hidden="true"
        />
        <span className="text-body-sm font-medium text-on-surface">
          {isOpenNow ? "Aberto agora" : "Fechado agora"}
        </span>
      </div>

      <div className="space-y-1" role="list" aria-label="Horários de funcionamento">
        {DAY_ORDER.map((day) => {
          const info = hours[day];
          const isToday = day === today;

          return (
            <div
              key={day}
              role="listitem"
              className={cn(
                "flex items-center justify-between text-body-sm py-0.5",
                isToday
                  ? "text-on-surface font-medium"
                  : "text-on-surface-variant"
              )}
            >
              <span>
                {DAY_LABELS[day]}
                {isToday && (
                  <span className="sr-only"> (hoje)</span>
                )}
              </span>
              <span>
                {info?.is_open
                  ? `${info.open} - ${info.close}`
                  : "Fechado"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTodayKey(): string {
  const dayMap: Record<number, string> = {
    0: "domingo",
    1: "segunda",
    2: "terca",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sabado",
  };
  return dayMap[new Date().getDay()];
}
