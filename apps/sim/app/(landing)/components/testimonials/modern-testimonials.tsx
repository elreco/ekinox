'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Operations Manager',
    initials: 'SC',
    avatar: null,
    content: 'Ekinox transformed our workflow automation. What used to take our team hours now happens automatically in minutes. The visual interface makes complex AI workflows surprisingly intuitive.',
    rating: 5,
    highlight: 'hours → minutes'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    initials: 'MR',
    avatar: null,
    content: 'The no-code approach means our entire team can build AI agents, not just developers. We\'ve automated customer support, data analysis, and content creation seamlessly.',
    rating: 5,
    highlight: 'entire team can build'
  },
  {
    name: 'Emma Thompson',
    role: 'Digital Innovation Lead',
    initials: 'ET',
    avatar: null,
    content: 'The real-time collaboration feature is a game-changer. Our distributed team can work on the same workflows simultaneously. It\'s like having a shared brain for AI automation.',
    rating: 5,
    highlight: 'real-time collaboration'
  }
]


export default function ModernTestimonials() {
  const router = useRouter()
  return (
    <section className="relative py-32 bg-gray-900 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 backdrop-blur-sm bg-white/5 rounded-full border border-white/10">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 font-medium text-sm">Trusted by Teams</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Loved by Teams
            <br />
            <span style={{ color: 'var(--brand-accent-hex)' }}>
              Worldwide
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover how teams are transforming their workflows
            with Ekinox's visual AI automation platform.
          </p>
        </motion.div>


        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              {/* Simple Card */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-white/90 leading-relaxed mb-6 text-base">
                  "{testimonial.content}"
                </blockquote>

                {/* Highlight */}
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/10 mb-6">
                  <span className="text-cyan-400 text-xs font-medium">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-50" />
                    <div className="relative w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-semibold text-sm"
                         style={{
                           backgroundColor: index === 0 ? '#b6e3f4' : index === 1 ? '#4f46e5' : '#059669',
                           color: '#ffffff'
                         }}>
                      {testimonial.initials}
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-sm">
                      {testimonial.role}
                    </div>
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
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/signup')}
            className="group inline-flex items-center gap-3 px-8 py-4 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Start Building Today
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
