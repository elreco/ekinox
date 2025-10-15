import type { Metadata } from 'next'
import ModernFeatures from '@/app/(landing)/components/features/modern-features'
import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'

export const metadata: Metadata = {
  title: 'Features - Visual AI Workflow Automation',
  description:
    'Discover Ekinox powerful features: intelligent automation, visual canvas, real-time processing, enterprise security, global integrations, and smart analytics. Build AI workflows without code.',
  keywords:
    'AI workflow features, visual automation, drag-and-drop builder, enterprise security, workflow analytics, real-time processing, AI integrations',
  openGraph: {
    title: 'Ekinox Features - AI Workflow Automation Platform',
    description:
      'Visual canvas, intelligent automation, enterprise security, 100+ integrations. Build powerful AI workflows without coding.',
    type: 'website',
    url: 'https://www.ekinox.app/features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekinox Features - AI Workflow Platform',
    description:
      'Visual canvas, intelligent automation, enterprise security. Build AI workflows without code.',
    site: '@ekinoxapp',
  },
  alternates: {
    canonical: 'https://www.ekinox.app/features',
  },
}

export default function FeaturesPage() {
  return (
    <>
      <ModernNav />
      <main className="min-h-screen">
        <ModernFeatures />
      </main>
      <ModernFooter />
    </>
  )
}

