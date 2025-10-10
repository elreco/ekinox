'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Head of Operations',
    company: 'TechFlow Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'Ekinox transformed our workflow automation. What used to take our team hours now happens automatically in minutes. The visual interface makes complex AI workflows surprisingly intuitive.',
    rating: 5,
    highlight: 'hours → minutes'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'DataForge Inc',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'The no-code approach means our entire team can build AI agents, not just developers. We\'ve automated customer support, data analysis, and content creation seamlessly.',
    rating: 5,
    highlight: 'entire team can build'
  },
  {
    name: 'Emma Thompson',
    role: 'Digital Innovation Lead',
    company: 'StreamlineHQ',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The real-time collaboration feature is a game-changer. Our distributed team can work on the same workflows simultaneously. It\'s like having a shared brain for AI automation.',
    rating: 5,
    highlight: 'real-time collaboration'
  }
]

const COMPANY_LOGOS = [
  { name: 'Microsoft', width: 120 },
  { name: 'Google', width: 100 },
  { name: 'Stripe', width: 80 },
  { name: 'Slack', width: 90 },
  { name: 'OpenAI', width: 110 },
]

export default function ModernTestimonials() {
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
            <span className="text-white/90 font-medium text-sm">Trusted by Industry Leaders</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Loved by Teams
            <br />
            <span style={{ color: 'var(--brand-accent-hex)' }}>
              Worldwide
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Join thousands of teams who've revolutionized their workflows
            with Ekinox's intelligent automation platform.
          </p>
        </motion.div>

        {/* Company Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <p className="text-center text-white/60 text-sm mb-6">
            Powering automation for teams at
          </p>
          <div className="flex items-center justify-center gap-12 opacity-60">
            {COMPANY_LOGOS.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-white/40 font-semibold"
                style={{ width: logo.width }}
              >
                {logo.name}
              </motion.div>
            ))}
          </div>
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
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="relative rounded-full border-2 border-white/20"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-white/40 text-xs">
                      {testimonial.company}
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
            Join These Amazing Teams
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
