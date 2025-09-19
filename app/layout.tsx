import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Fundação Faça o Bem',
  description: 'Doações transparentes para pessoas e animais em situação de vulnerabilidade.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Cabeçalho simplificado */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto py-4 flex items-center gap-3">
            <Image src="/logo.png" alt="Fundação Faça o Bem" width={48} height={48} />
            <span className="font-bold text-lg">Fundação Faça o Bem</span>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="container mx-auto py-8">{children}</main>

        {/* Rodapé refinado */}
        <footer className="container mx-auto py-10 text-sm text-gray-500 text-center space-y-2">
          <p>100% dos valores arrecadados são direcionados para essa causa.</p>
          <p>
            Fundação Faça o Bem — CNPJ 00.000.000/0001-00 <br />
            Rua Exemplo, 123 — São Paulo/SP
          </p>
        </footer>
      </body>
    </html>
  )
}
