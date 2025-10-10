import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { StructuredData } from '@/app/(landing)/components'

// Import minimalist hero
const MinimalistHero = dynamic(() => import('@/app/(landing)/components/hero/minimalist-hero'), {
  loading: () => (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse bg-slate-50 rounded-2xl p-12 w-96 h-64 border border-gray-200" />
    </div>
  ),
})

const ModernFeatures = dynamic(() => import('@/app/(landing)/components/features/modern-features'), {
  loading: () => (
    <div className="h-[600px] bg-white flex items-center justify-center">
      <div className="animate-pulse bg-slate-50 rounded-2xl p-8 w-96 h-48 border border-gray-200" />
    </div>
  ),
})

const ModernIntegrations = dynamic(() => import('@/app/(landing)/components/integrations/modern-integrations'), {
  loading: () => (
    <div className="h-[600px] bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse bg-white rounded-2xl p-8 w-80 h-64 border border-gray-200" />
    </div>
  ),
})

const GlassPricing = dynamic(() => import('@/app/(landing)/components/pricing/glass-pricing'), {
  loading: () => (
    <div className="h-[600px] bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse bg-white rounded-2xl p-8 w-80 h-96 border border-gray-200" />
    </div>
  ),
})

const DemoSection = dynamic(() => import('@/app/(landing)/components/demo-section/demo-section'), {
  loading: () => (
    <div className="h-[600px] bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse bg-white rounded-2xl p-8 w-96 h-64 border border-gray-200" />
    </div>
  ),
})

const ModernTestimonials = dynamic(() => import('@/app/(landing)/components/testimonials/modern-testimonials'), {
  loading: () => (
    <div className="h-[600px] bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse bg-gray-800 rounded-2xl p-8 w-80 h-64 border border-gray-700" />
    </div>
  ),
})

const ModernNav = dynamic(() => import('@/app/(landing)/components/nav/modern-nav'), {
  loading: () => (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-sm" />
  ),
})

const ModernFooter = dynamic(() => import('@/app/(landing)/components/footer/modern-footer'), {
  loading: () => (
    <div className="h-40 bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse bg-gray-800 rounded-2xl p-4 w-64 h-16 border border-gray-700" />
    </div>
  ),
})

export default function Landing() {
  return (
    <>
      <StructuredData />

      {/* Navigation */}
      <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent" />}>
        <ModernNav />
      </Suspense>

      <main className="relative">
        {/* Hero Section */}
        <Suspense
          fallback={
            <div className="h-screen bg-white flex items-center justify-center">
              <div className="animate-pulse bg-slate-50 rounded-2xl p-12 w-96 h-64 border border-gray-200" />
            </div>
          }
        >
          <MinimalistHero />
        </Suspense>

        {/* Demo Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-slate-50 flex items-center justify-center">
              <div className="animate-pulse bg-white rounded-2xl p-8 w-96 h-64 border border-gray-200" />
            </div>
          }
        >
          <DemoSection />
        </Suspense>

        {/* Features Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-white flex items-center justify-center">
              <div className="animate-pulse bg-slate-50 rounded-2xl p-8 w-96 h-48 border border-gray-200" />
            </div>
          }
        >
          <ModernFeatures />
        </Suspense>

        {/* Integrations Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-slate-50 flex items-center justify-center">
              <div className="animate-pulse bg-white rounded-2xl p-8 w-80 h-64 border border-gray-200" />
            </div>
          }
        >
          <ModernIntegrations />
        </Suspense>

        {/* Pricing Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-slate-50 flex items-center justify-center">
              <div className="animate-pulse bg-white rounded-2xl p-8 w-80 h-96 border border-gray-200" />
            </div>
          }
        >
          <GlassPricing />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-gray-900 flex items-center justify-center">
              <div className="animate-pulse bg-gray-800 rounded-2xl p-8 w-80 h-64 border border-gray-700" />
            </div>
          }
        >
          <ModernTestimonials />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense
        fallback={
          <div className="h-40 bg-gray-900 flex items-center justify-center">
            <div className="animate-pulse bg-gray-800 rounded-2xl p-4 w-64 h-16 border border-gray-700" />
          </div>
        }
      >
        <ModernFooter />
      </Suspense>
    </>
  )
}
