import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ekinox.app'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-white"
      style={{
        '--background': '0 0% 100%',
        '--foreground': '0 0% 3.9%',
        background: 'white'
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
