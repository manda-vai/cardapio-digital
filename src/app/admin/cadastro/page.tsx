"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CadastroPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [storeSlug, setStoreSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleStoreNameChange(value: string) {
    setStoreName(value);
    setStoreSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!storeSlug || storeSlug.length < 3) {
      setError("O slug da loja deve ter pelo menos 3 caracteres");
      return;
    }

    setLoading(true);

    const { error: authError } = await signUp(email, password, storeName, storeSlug);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-md p-8 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--elevation-2)]">
        <div className="text-center mb-8">
          <h1 className="text-[var(--font-headline-lg)] font-bold text-[var(--color-on-surface)] mb-2">
            Crie sua loja
          </h1>
          <p className="text-[var(--font-body-md)] text-[var(--color-on-surface-variant)]">
            Cadastre seu restaurante e comece a receber pedidos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="storeName"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Nome da Loja
            </label>
            <Input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(e) => handleStoreNameChange(e.target.value)}
              placeholder="Burger do Zé"
              required
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="storeSlug"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Link do cardápio
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[var(--font-body-md)] text-[var(--color-on-surface-variant)] whitespace-nowrap">
                /cardapio/
              </span>
              <Input
                id="storeSlug"
                type="text"
                value={storeSlug}
                onChange={(e) => setStoreSlug(slugify(e.target.value))}
                placeholder="burger-do-ze"
                required
                className="flex-1"
              />
            </div>
            <p className="mt-1 text-[var(--font-body-sm)] text-[var(--color-on-surface-variant)]">
              Seu cardápio ficará acessível em: cardapio-digital.vercel.app/cardapio/{storeSlug || "sua-loja"}
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Confirmar senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full"
            />
          </div>

          {error && (
            <div className="p-3 bg-[var(--color-error-container)] text-[var(--color-on-error-container)] rounded-[var(--radius-sm)] text-[var(--font-body-md)]">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary-container)] hover:text-[var(--color-primary)]"
          >
            {loading ? "Criando conta..." : "Criar minha loja"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[var(--font-body-md)] text-[var(--color-on-surface-variant)]">
            Já tem uma conta?{" "}
            <Link
              href="/admin/login"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}