'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DemoSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            <span>Demo</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            See Ekinox in
            <span className="block" style={{ color: 'var(--brand-accent-hex)' }}>
              Action
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch how easy it is to build powerful AI workflows with our visual interface.
            No coding required, just drag, connect, and deploy.
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Demo Frame */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser-like header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-4 h-4 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-600 font-medium">www.ekinox.app</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs text-gray-500">Demo</span>
              </div>
            </div>

            {/* Demo GIF Container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="/static/demo.gif"
                  alt="Ekinox platform demo showing visual AI workflow creation"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {/* Overlay gradient for smooth edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Demo Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-gray-600">Building workflow...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-gray-600">AI processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-lg"
          >
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to build your own AI workflows?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg text-white font-semibold border-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: 'var(--brand-accent-hex)',
              borderColor: 'var(--brand-accent-hex)',
            }}
            onClick={() => window.location.href = '/signup'}
          >
            Start Building Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
