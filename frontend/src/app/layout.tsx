import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vendra SaaS - Atendimento Inteligente",
  description: "Plataforma de atendimento automatizado via WhatsApp e WebChat com IA",
  keywords: ["WhatsApp", "Atendimento", "IA", "Chatbot", "Automação"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
