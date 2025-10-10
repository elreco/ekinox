import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}

export const metadata = {
  metadataBase: new URL('https://docs.ekinox.app'),
  title: {
    default: 'Ekinox Documentation - Visual Workflow Builder for AI Applications',
    template: '%s',
  },
  description:
    'Comprehensive documentation for Ekinox - the visual workflow builder for AI applications. Create powerful AI agents, automation workflows, and data processing pipelines by connecting blocks on a canvas—no coding required.',
  keywords: [
    'AI workflow builder',
    'visual workflow editor',
    'AI automation',
    'workflow automation',
    'AI agents',
    'no-code AI',
    'drag and drop workflows',
    'AI integrations',
    'workflow canvas',
    'AI development platform',
  ],
  authors: [{ name: 'Ekinox Team', url: 'https://www.ekinox.app' }],
  category: 'Developer Tools',
  classification: 'Developer Documentation',
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ekinox Docs',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'de_DE'],
    url: 'https://docs.ekinox.app',
    siteName: 'Ekinox Documentation',
    title: 'Ekinox Documentation - Visual Workflow Builder for AI Applications',
    description:
      'Comprehensive documentation for Ekinox - the visual workflow builder for AI applications. Create powerful AI agents, automation workflows, and data processing pipelines.',
  },
  twitter: {
    card: 'summary',
    title: 'Ekinox Documentation - Visual Workflow Builder for AI Applications',
    description:
      'Comprehensive documentation for Ekinox - the visual workflow builder for AI applications.',
    creator: '@ekinox',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://docs.ekinox.app',
    languages: {
      en: '/en',
      fr: '/fr',
      zh: '/zh',
    },
  },
}
