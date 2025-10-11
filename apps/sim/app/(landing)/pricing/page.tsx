import type { Metadata } from 'next'
import GlassPricing from '@/app/(landing)/components/pricing/glass-pricing'
import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'

export const metadata: Metadata = {
  title: 'Pricing - Flexible Plans for Every Business',
  description:
    'Transparent pricing for Ekinox AI workflow automation. Free plan available. Pro at €30/month. Team at €100/month. Enterprise at €500/month. 14-day free trial, no credit card required. SOC2 compliant.',
  keywords:
    'AI automation pricing, workflow builder cost, SaaS pricing, free AI tools, enterprise pricing, team collaboration pricing, automation costs, pay-as-you-go',
  openGraph: {
    title: 'Ekinox Pricing - Plans Starting Free',
    description:
      'Free plan available. Pro €30/mo, Team €100/mo, Enterprise €500/mo. 14-day trial. SOC2 compliant. Cancel anytime.',
    type: 'website',
    url: 'https://www.ekinox.app/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekinox Pricing - Free to Enterprise',
    description:
      'Free plan available. Pro €30/mo, Team €100/mo, Enterprise €500/mo. Start your 14-day free trial.',
  },
  alternates: {
    canonical: 'https://www.ekinox.app/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <ModernNav />
      <main className="min-h-screen">
        <GlassPricing />
      </main>
      <ModernFooter />
    </>
  )
}

