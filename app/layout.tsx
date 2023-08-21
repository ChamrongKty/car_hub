import { Footer, NavBar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}
