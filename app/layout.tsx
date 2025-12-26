import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube Channel Agent',
  description: 'AI-powered assistant for your YouTube channel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
