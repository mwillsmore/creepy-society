import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Creepy Society',
  description: 'Static comic demo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
