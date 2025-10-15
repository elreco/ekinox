import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { StructuredData } from '@/app/(landing)/components'

const MinimalistHero = dynamic(() => import('@/app/(landing)/components/hero/minimalist-hero'), {
  ssr: true,
  loading: () => <div className="h-screen bg-white" />,
})

const ModernFeatures = dynamic(() => import('@/app/(landing)/components/features/modern-features'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-white" />,
})

const ModernIntegrations = dynamic(() => import('@/app/(landing)/components/integrations/modern-integrations'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-slate-50" />,
})

const GlassPricing = dynamic(() => import('@/app/(landing)/components/pricing/glass-pricing'), {
  ssr: true,
  loading: () => <div className="min-h-[500px] bg-slate-50" />,
})

const DemoSection = dynamic(() => import('@/app/(landing)/components/demo-section/demo-section'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-slate-50" />,
})

const InteractiveDemo = dynamic(() => import('@/app/(landing)/components/interactive-demo/interactive-demo'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-white" />,
})

const ModernTestimonials = dynamic(() => import('@/app/(landing)/components/testimonials/modern-testimonials'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-gray-900" />,
})

const ModernNav = dynamic(() => import('@/app/(landing)/components/nav/modern-nav'), {
  ssr: true,
  loading: () => <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-sm" />,
})

const ModernFooter = dynamic(() => import('@/app/(landing)/components/footer/modern-footer'), {
  ssr: true,
  loading: () => <div className="min-h-[200px] bg-gray-900" />,
})

export default function Landing() {
  return (
    <>
      <StructuredData />

      <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-sm" />}>
        <ModernNav />
      </Suspense>

      <main className="relative">
        <Suspense fallback={<div className="h-screen bg-white" />}>
          <MinimalistHero />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-slate-50" />}>
          <DemoSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
          <InteractiveDemo />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
          <ModernFeatures />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-slate-50" />}>
          <ModernIntegrations />
        </Suspense>

        <Suspense fallback={<div className="min-h-[500px] bg-slate-50" />}>
          <GlassPricing />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-gray-900" />}>
          <ModernTestimonials />
        </Suspense>
      </main>

      <Suspense fallback={<div className="min-h-[200px] bg-gray-900" />}>
        <ModernFooter />
      </Suspense>
    </>
  )
}
