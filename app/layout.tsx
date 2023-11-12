import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Records',
  description: 'My Records',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className='bg-gray-200'>{children}</body>
    </html>
  )
}
