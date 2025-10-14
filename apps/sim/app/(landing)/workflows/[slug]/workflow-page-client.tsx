'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ArrowLeft, Sparkles } from 'lucide-react'
import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'
import * as Icons from '@/components/icons'

interface WorkflowPageClientProps {
  workflow: {
    title: string
    description: string
    longDescription: string
    integrations: Array<{
      iconName: string
      name: string
    }>
    slug: string
    category: string
    steps: Array<{
      title: string
      description: string
    }>
    benefits: string[]
    useCases: string[]
  }
}

export default function WorkflowPageClient({ workflow }: WorkflowPageClientProps) {
  const router = useRouter()

  return (
    <>
      <ModernNav />

      <main className="pt-20">
        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <Link href="/workflows" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to all workflows
            </Link>

            <div className="mb-6">
              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                {workflow.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {workflow.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              {workflow.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              {workflow.integrations.map((int, idx) => {
                const IconComponent = (Icons as any)[int.iconName]
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
                      {IconComponent ? (
                        <IconComponent className="w-7 h-7 text-gray-700" />
                      ) : (
                        <div className="w-7 h-7 bg-gray-300 rounded"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{int.name}</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => router.push(`/signup?redirect=/workspace`)}
              className="px-8 py-4 rounded-lg text-white font-semibold border transition-all duration-300 inline-flex items-center gap-2 mb-12"
              style={{
                backgroundColor: 'var(--brand-accent-hex)',
                borderColor: 'var(--brand-accent-hex)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-accent-hover-hex)'
                e.currentTarget.style.borderColor = 'var(--brand-accent-hover-hex)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-accent-hex)'
                e.currentTarget.style.borderColor = 'var(--brand-accent-hex)'
              }}
            >
              Get started with this workflow
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>

            <div className="space-y-6">
              {workflow.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--brand-accent-hex)' }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Benefits</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflow.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-gray-200">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-accent-hex)' }} />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Use Cases</h2>

            <div className="space-y-3">
              {workflow.useCases.map((useCase, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200">
                  <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-accent-hex)' }} />
                  <span className="text-sm text-gray-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start with this template and customize it to fit your exact needs. No coding required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push(`/signup?redirect=/workspace`)}
                className="px-8 py-4 rounded-lg text-white font-semibold border transition-all duration-300 inline-flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--brand-accent-hex)',
                  borderColor: 'var(--brand-accent-hex)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--brand-accent-hover-hex)'
                  e.currentTarget.style.borderColor = 'var(--brand-accent-hover-hex)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--brand-accent-hex)'
                  e.currentTarget.style.borderColor = 'var(--brand-accent-hex)'
                }}
              >
                Get started with this workflow
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/workflows"
                className="px-8 py-4 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all inline-flex items-center gap-2"
              >
                Browse more workflows
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </>
  )
}
