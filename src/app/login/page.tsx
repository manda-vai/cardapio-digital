"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-md p-8 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--elevation-2)]">
        <h1 className="text-[var(--font-headline-lg)] font-bold text-[var(--color-on-surface)] mb-8 text-center">
          Entrar na sua loja
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="admin@example.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[var(--font-label-lg)] text-[var(--color-on-surface-variant)] mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[var(--font-body-md)] text-[var(--color-on-surface-variant)]">
            Sua loja ainda não tem conta?{" "}
            <Link
              href="/cadastro"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}