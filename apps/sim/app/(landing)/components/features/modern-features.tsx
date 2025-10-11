'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Blocks,
  Sparkles,
  Shield,
  Zap,
  Users,
  Cloud,
  Brain,
  Workflow,
  Globe,
  Lock,
  TrendingUp,
  Layers
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const FEATURES = [
  {
    icon: Brain,
    title: 'Intelligent Automation',
    description: 'AI-powered decision making that learns from your workflows and optimizes performance automatically.',
    color: 'from-cyan-500 to-blue-500',
    delay: 0.1
  },
  {
    icon: Blocks,
    title: 'Visual Canvas',
    description: 'Intuitive drag-and-drop interface that transforms complex logic into simple visual connections.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast execution with real-time collaboration and instant feedback loops.',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.3
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC2 compliance, and advanced access controls for peace of mind.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    icon: Globe,
    title: 'Global Integrations',
    description: 'Connect to 100+ services worldwide with pre-built connectors and custom API support.',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.5
  },
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'Deep insights into workflow performance, cost optimization, and predictive scaling.',
    color: 'from-rose-500 to-red-500',
    delay: 0.6
  }
]

export default function ModernFeatures() {
  const router = useRouter()

  return (
    <section id="features" className="relative py-32 bg-white overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 mb-8 shadow-sm"
          >
            <svg
              width={20}
              height={14}
              viewBox='0 0 48 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id="logogram">
                <path
                  d="M15.4992 0H36.5808L21.0816 22.9729H0L15.4992 0Z"
                  fill="#0066CC"
                />
                <path
                  d="M16.4224 25.102L10.4192 34H32.5008L48 11.0271H31.7024L22.2064 25.102H16.4224Z"
                  fill="#00407F"
                />
              </g>
            </svg>
            <span>Features</span>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need to
            <br />
            <span style={{ color: 'var(--brand-accent-hex)' }}>
              Automate Intelligently
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From simple task automation to complex AI orchestration,
            Ekinox provides all the tools you need in one unified platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              {/* Simple Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg border" style={{
                  borderColor: 'var(--brand-accent-hex)',
                  color: 'var(--brand-accent-hex)'
                }}>
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <button
            onClick={() => router.push('/signup')}
            className="px-12 py-4 rounded-lg text-white font-semibold border transition-all duration-300"
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
            Experience Ekinox Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
