'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Users, Building2, Sparkles, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for exploring AI automation',
    icon: Star,
    features: [
      '10 workflows per month',
      '100 AI operations',
      'Basic integrations',
      'Community support',
      '7 days of logs'
    ],
    cta: 'Start Free',
    popular: false,
    color: 'from-slate-600 to-gray-700',
    glow: 'group-hover:shadow-slate-500/25'
  },
  {
    name: 'Professional',
    price: '29',
    period: '/month',
    description: 'Ideal for growing businesses and professionals',
    icon: Zap,
    features: [
      'Unlimited workflows',
      '1000 AI operations/month',
      'All integrations',
      'Priority support',
      '30 days of logs',
      'Advanced analytics',
      'Custom webhooks'
    ],
    cta: 'Start Pro Trial',
    popular: true,
    color: 'from-blue-600 to-purple-600',
    glow: 'group-hover:shadow-blue-500/25'
  },
  {
    name: 'Enterprise',
    price: '199',
    period: '/month',
    description: 'Advanced features for large organizations',
    icon: Crown,
    features: [
      'Everything in Pro',
      '10,000+ AI operations',
      'SSO & SAML',
      'Dedicated support',
      'Unlimited logs retention',
      'White-label options',
      'Custom SLA',
      'On-premise deployment'
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'from-purple-600 to-pink-600',
    glow: 'group-hover:shadow-purple-500/25'
  }
]

export default function GlassPricing() {
  const router = useRouter()

  return (
    <section id="pricing" className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 rounded-full border border-blue-200">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--brand-primary-hex)' }} />
            <span className="font-medium text-sm" style={{ color: 'var(--brand-primary-hex)' }}>
              Transparent Pricing
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <br />
            <span style={{ color: 'var(--brand-primary-hex)' }}>
              Plan
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scale your AI automation needs with flexible plans designed
            to grow with your business ambitions.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: tier.popular ? 0.1 : tier.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative ${tier.popular ? 'lg:-mt-8 lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Glass Card */}
              <div className={`relative backdrop-blur-2xl bg-white/60 rounded-3xl p-8 border border-white/30 shadow-2xl ${tier.glow} transition-all duration-500 h-full`}>
                {/* Gradient Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${tier.color} shadow-lg`}>
                      <tier.icon className="w-6 h-6 text-white" />
                    </div>
                    {tier.popular && (
                      <div className="text-blue-600">
                        <Crown className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      {tier.price === 'Free' ? (
                        <span className="text-4xl font-bold text-gray-900">Free</span>
                      ) : (
                        <>
                          <span className="text-sm text-gray-500">€</span>
                          <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                          <span className="text-gray-500">{tier.period}</span>
                        </>
                      )}
                    </div>
                    {tier.price !== 'Free' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed monthly, cancel anytime
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (tier.cta === 'Contact Sales') {
                        window.location.href = 'mailto:sales@ekinox.app'
                      } else {
                        router.push('/signup')
                      }
                    }}
                    className={`
                      w-full py-4 px-6 rounded-2xl font-semibold text-sm transition-all duration-300
                      ${tier.popular
                        ? 'text-white shadow-lg hover:shadow-xl'
                        : 'bg-white/80 text-gray-900 border border-gray-200 hover:bg-white hover:border-gray-300'
                      }
                    `}
                    style={tier.popular ? {
                      backgroundColor: 'var(--brand-primary-hex)',
                    } : {}}
                    onMouseEnter={tier.popular ? (e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover-hex)'
                    } : undefined}
                    onMouseLeave={tier.popular ? (e) => {
                      e.currentTarget.style.backgroundColor = 'var(--brand-primary-hex)'
                    } : undefined}
                  >
                    {tier.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            All plans include SSL encryption, automatic backups, and 99.9% uptime SLA.
            <br />
            <span className="text-blue-600 font-medium">Start your 14-day free trial</span> • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
