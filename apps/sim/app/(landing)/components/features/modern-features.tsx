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
  return (
    <section id="features" className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

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
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-medium text-sm">Next-Generation Platform</span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
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
              {/* Glass Card */}
              <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
                {/* Gradient Glow on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
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
          <div className="relative inline-block">
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139,69,244,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-8 rounded-full blur-2xl"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/signup')}
              className="relative px-12 py-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Experience Ekinox Today
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
