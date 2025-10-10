'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { StructuredData } from '@/app/(landing)/components'

// Import new modern components
const NewHero = dynamic(() => import('@/app/(landing)/components/hero/new-hero'), {
  loading: () => (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-3xl p-12 w-96 h-64" />
    </div>
  ),
})

const ModernFeatures = dynamic(() => import('@/app/(landing)/components/features/modern-features'), {
  loading: () => (
    <div className="h-[800px] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="animate-pulse backdrop-blur-xl bg-white/60 rounded-3xl p-8 w-96 h-48" />
    </div>
  ),
})

const GlassPricing = dynamic(() => import('@/app/(landing)/components/pricing/glass-pricing'), {
  loading: () => (
    <div className="h-[600px] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="animate-pulse backdrop-blur-xl bg-white/60 rounded-3xl p-8 w-80 h-96" />
    </div>
  ),
})

const ModernTestimonials = dynamic(() => import('@/app/(landing)/components/testimonials/modern-testimonials'), {
  loading: () => (
    <div className="h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-3xl p-8 w-80 h-64" />
    </div>
  ),
})

const ModernNav = dynamic(() => import('@/app/(landing)/components/nav/modern-nav'), {
  loading: () => (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent" />
  ),
})

// Modern Footer with Glass Effect
const ModernFooter = dynamic(() => import('@/app/(landing)/components/footer/modern-footer'), {
  loading: () => (
    <div className="h-40 bg-slate-900 flex items-center justify-center">
      <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-2xl p-4 w-64 h-16" />
    </div>
  ),
})

export default function ModernLanding() {
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
            <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-3xl p-12 w-96 h-64" />
            </div>
          }
        >
          <NewHero />
        </Suspense>

        {/* Features Section */}
        <Suspense
          fallback={
            <div className="h-[800px] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
              <div className="animate-pulse backdrop-blur-xl bg-white/60 rounded-3xl p-8 w-96 h-48" />
            </div>
          }
        >
          <ModernFeatures />
        </Suspense>

        {/* Pricing Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
              <div className="animate-pulse backdrop-blur-xl bg-white/60 rounded-3xl p-8 w-80 h-96" />
            </div>
          }
        >
          <GlassPricing />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense
          fallback={
            <div className="h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-3xl p-8 w-80 h-64" />
            </div>
          }
        >
          <ModernTestimonials />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense
        fallback={
          <div className="h-40 bg-slate-900 flex items-center justify-center">
            <div className="animate-pulse backdrop-blur-xl bg-white/5 rounded-2xl p-4 w-64 h-16" />
          </div>
        }
      >
        <ModernFooter />
      </Suspense>
    </>
  )
}
