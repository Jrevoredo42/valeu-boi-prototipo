import type { Metadata } from 'next'
import '../styles/globals.css'
import '../index.css'

export const metadata: Metadata = {
  title: 'Valeu o Boi - Senhas para Vaquejadas',
  description: 'Compre suas senhas online de forma rápida e segura. Participe das melhores competições de vaquejada do país.',
  keywords: ['vaquejada', 'senhas', 'competição', 'vaqueiros', 'eventos'],
  authors: [{ name: 'Valeu o Boi' }],
  openGraph: {
    title: 'Valeu o Boi - Senhas para Vaquejadas',
    description: 'Compre suas senhas online de forma rápida e segura.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
