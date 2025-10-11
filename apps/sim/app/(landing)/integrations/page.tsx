import type { Metadata } from 'next'
import ModernIntegrations from '@/app/(landing)/components/integrations/modern-integrations'
import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'

export const metadata: Metadata = {
  title: 'Integrations - Connect 100+ Apps & Services',
  description:
    'Connect Ekinox with 100+ popular apps and services. Integrate with Slack, Gmail, OpenAI, Anthropic, Google, Notion, Airtable, Stripe, and more. Pre-built connectors for seamless automation.',
  keywords:
    'AI integrations, workflow connectors, Slack integration, Gmail automation, OpenAI connector, API integrations, app connections, automation integrations, workflow apps',
  openGraph: {
    title: 'Ekinox Integrations - 100+ App Connectors',
    description:
      'Connect with Slack, Gmail, OpenAI, Anthropic, Notion, Airtable, Stripe, and 100+ more apps. Pre-built connectors for powerful automation.',
    type: 'website',
    url: 'https://www.ekinox.app/integrations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekinox Integrations - 100+ Apps',
    description:
      'Connect with Slack, Gmail, OpenAI, Notion, and 100+ apps. Pre-built connectors for automation.',
  },
  alternates: {
    canonical: 'https://www.ekinox.app/integrations',
  },
}

export default function IntegrationsPage() {
  return (
    <>
      <ModernNav />
      <main className="min-h-screen">
        <ModernIntegrations />
      </main>
      <ModernFooter />
    </>
  )
}

