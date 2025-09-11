import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Creepy Society',
  description: 'Static comic demo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-foreground flex flex-col text-center">
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
