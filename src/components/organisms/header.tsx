"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";
import type { Store } from "@/types";
import type { User } from "@supabase/supabase-js";

interface HeaderProps {
  store?: Store | null;
  variant?: "public" | "admin";
  user?: User | null;
  storeName?: string;
  className?: string;
}

export function Header({ store, variant = "public", user, storeName, className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (variant === "admin") {
    return (
      <header
        className={cn(
          "sticky top-0 z-40 bg-surface border-b border-outline-variant",
          className
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-title-md font-semibold text-on-surface"
          >
            <svg
              className="h-6 w-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Admin
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-body-sm text-on-surface-variant hidden sm:block">
                {storeName || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-radius-md transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant",
        className
      )}
      role="banner"
    >
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href={store ? `/cardapio/${store.slug}` : "/"}
          className="flex items-center gap-2 min-w-0"
          aria-label={store ? `Cardápio do ${store.name}` : "Cardápio Digital"}
        >
          {store?.logo_url && (
            <img
              src={store.logo_url}
              alt={store.name}
              className="h-8 w-8 rounded-radius-full object-cover"
            />
          )}
          <span className="text-title-md font-semibold text-on-surface truncate">
            {store?.name || "Cardápio Digital"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Navegação">
          {store && (
            <Link
              href={`/pedido/${store.slug}`}
              className="px-3 py-2 text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-radius-full transition-colors"
            >
              Fazer Pedido
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 rounded-radius-full hover:bg-surface-container-high transition-colors"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && store && (
        <nav
          className="sm:hidden border-t border-outline-variant bg-surface px-4 py-2"
          aria-label="Navegação mobile"
        >
          <Link
            href={`/pedido/${store.slug}`}
            className="block px-3 py-2 text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-radius-md transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Fazer Pedido
          </Link>
        </nav>
      )}
    </header>
  );
}
