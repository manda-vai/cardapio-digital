import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cardápio Digital — Peça pelo WhatsApp",
    template: "%s | Cardápio Digital",
  },
  description:
    "Plataforma gratuita de cardápio digital com pedidos via WhatsApp. Crie o cardápio do seu restaurante em minutos.",
  keywords: [
    "cardápio digital",
    "menu online",
    "pedidos whatsapp",
    "restaurante",
    "lanchonete",
    "delivery",
  ],
  authors: [{ name: "Manda-Vai" }],
  creator: "Manda-Vai",
  publisher: "Manda-Vai",
  manifest: "/cardapio-digital/manifest.json",
  icons: {
    icon: [
      { url: "/cardapio-digital/favicon.ico", sizes: "48x48" },
      { url: "/cardapio-digital/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/cardapio-digital/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/cardapio-digital/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D45200" },
    { media: "(prefers-color-scheme: dark)", color: "#1A120E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-md focus:shadow-level-3"
        >
          Pular para o conteúdo principal
        </a>
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            duration: 4000,
            className: "rounded-radius-md",
          }}
        />
      </body>
    </html>
  );
}
