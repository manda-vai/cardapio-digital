import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface-container to-background">
        <div className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container text-on-primary-container rounded-radius-full text-label-sm font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-radius-full bg-primary" aria-hidden="true" />
            Grátis para começar
          </div>

          <h1 className="text-display-md sm:text-display-lg text-on-background font-extrabold leading-tight text-balance">
            Cardápio Digital grátis
            <br />
            <span className="text-primary">com pedidos via WhatsApp</span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4 mb-8">
            Crie o cardápio do seu restaurante em minutos. Seus clientes montam
            o pedido e enviam diretamente pelo WhatsApp. Sem taxa, sem complicação.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/admin">
              <Button variant="primary" size="xl">
                Criar Cardápio Grátis
              </Button>
            </Link>
            <Link href="/cardapio/burger-do-ze">
              <Button variant="secondary" size="xl">
                Ver Exemplo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-headline-md text-on-background font-bold text-center mb-10">
          Tudo que você precisa
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
            title="Cardápio Online"
            description="Seu cardápio disponível 24h. Clientes acessam pelo celular sem precisar baixar app."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
            title="Pedidos via WhatsApp"
            description="Cliente monta o pedido e envia direto para seu WhatsApp. Você recebe e gerencia."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
            title="Painel Admin"
            description="Gerencie seu cardápio, veja pedidos, edite preços e personalize tudo."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            }
            title="Modificadores"
            description="Adicione opções como ponto da carne, borda da pizza, tamanhos e adicionais."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            }
            title="QR Code"
            description="Gere um QR Code para seus clientes escanearem e acessarem o cardápio."
          />
          <FeatureCard
            icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            title="Personalizável"
            description="Cada loja tem sua própria cor, logo e identidade visual."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Card variant="filled" className="p-8 sm:p-12">
          <h2 className="text-headline-md text-on-surface font-bold mb-3">
            Pronto para começar?
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto mb-6">
            Crie seu cardápio digital grátis em menos de 5 minutos. Sem cadastro
            complexo, sem taxas escondidas.
          </p>
          <Link href="/admin">
            <Button variant="primary" size="xl">
              Criar Cardápio Agora
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-body-sm text-on-surface-variant">
          <p>&copy; {new Date().getFullYear()} Manda-Vai. Cardápio Digital.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card variant="elevated" className="p-5">
      <div className="h-10 w-10 rounded-radius-md bg-primary-container text-primary flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-title-md text-on-surface font-semibold mb-1">
        {title}
      </h3>
      <p className="text-body-md text-on-surface-variant">{description}</p>
    </Card>
  );
}
