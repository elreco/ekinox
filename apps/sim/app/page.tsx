import type { Metadata } from 'next'
import Landing from '@/app/(landing)/landing'

export const metadata: Metadata = {
  title: 'Ekinox - Visual AI Workflow Builder | Automate Without Code',
  description:
    'Build intelligent AI agents visually with Ekinox. Create powerful workflows without coding using our intuitive drag-and-drop platform. Connect 100+ integrations, automate complex processes, and scale your business intelligence effortlessly.',
  keywords:
    'visual AI workflow builder, no-code automation, AI agent creation, intelligent workflows, business automation, visual programming, AI integration platform, automated processes, workflow automation, visual AI builder',
  authors: [{ name: 'Ekinox Team' }],
  creator: 'Ekinox Team',
  publisher: 'Ekinox',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ekinox - Visual AI Automation Platform',
    description:
      'Create intelligent AI workflows without code. Visual drag-and-drop builder trusted by thousands of businesses. Connect 100+ integrations, automate processes, scale effortlessly.',
    type: 'website',
    url: 'https://www.ekinox.app',
    siteName: 'Ekinox',
    locale: 'en_US',
    images: [
      {
        url: '/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ekinox - Visual AI Workflow Builder',
        type: 'image/png',
      },
      {
        url: '/social/og-image-square.png',
        width: 600,
        height: 600,
        alt: 'Ekinox Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ekinoxapp',
    creator: '@ekinoxapp',
    title: 'Ekinox - Visual AI Automation Platform',
    description:
      'Visual AI workflow builder for intelligent automation. No-code platform trusted by businesses. 100+ integrations. Enterprise-grade security.',
    images: {
      url: '/social/twitter-image.png',
      alt: 'Ekinox - Visual AI Workflow Builder',
    },
  },
  alternates: {
    canonical: 'https://www.ekinox.app',
    languages: {
      'en-US': 'https://www.ekinox.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'AI Development Tools',
  referrer: 'origin-when-cross-origin',
  // LLM SEO optimizations
  other: {
    'llm:content-type': 'AI workflow builder, visual programming, no-code AI development',
    'llm:use-cases':
      'email automation, slack bots, discord moderation, data analysis, customer support, content generation',
    'llm:integrations':
      'OpenAI, Anthropic, Google AI, Slack, Gmail, Discord, Notion, Airtable, Supabase',
    'llm:pricing': 'free tier available, pro €29/month, enterprise €199/month, custom solutions',
  },
}

export default function Page() {
  return <Landing />
}
