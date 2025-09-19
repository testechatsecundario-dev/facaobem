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
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        {/* Cabeçalho fixo em todas as páginas */}
        <header className="border-b border-gray-200">
          <div className="container mx-auto py-4 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Fundação Faça o Bem"
              width={56}
              height={56}
              className="rounded"
              priority
            />
            <span className="font-bold text-xl">Fundação Faça o Bem</span>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="container mx-auto flex-1 py-8">
          {children}
        </main>

        {/* Rodapé padrão */}
        <footer className="container mx-auto py-10 text-sm text-gray-500 text-center space-y-2 border-t border-gray-200">
          <p>100% dos valores arrecadados são direcionados para essa causa.</p>
          <p>
            Fundação Faça o Bem — CNPJ 19.542.668/0001-99 <br />
            R. Konoi Endo, 33 - Vila Bela Vista, Suzano - SP, 08674-320
          </p>
        </footer>
      </body>
    </html>
  )
}
