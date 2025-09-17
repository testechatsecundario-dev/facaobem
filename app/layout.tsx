import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faça o Bem',
  description: 'Doações transparentes para pessoas e animais em situação de vulnerabilidade.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <header className="border-b border-white/10">
          <div className="container py-4 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-tight">Faça o Bem</a>
            <nav className="text-sm text-[color:var(--muted)]">
              <a href="/" className="hover:text-white transition-colors">Sobre nós</a>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-sm text-[color:var(--muted)]">
          <p>100% dos valores arrecadados vão para as causas citadas.</p>
        </footer>
      </body>
    </html>
  )
}
