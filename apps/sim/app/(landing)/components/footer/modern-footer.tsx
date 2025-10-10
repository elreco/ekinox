'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Mail,
  MessageCircle,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Heart
} from 'lucide-react'
import Link from 'next/link'

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '/api' },
      { name: 'Integrations', href: '#integrations' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/help' },
      { name: 'Status', href: '/status' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' }
    ]
  }
]

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com/ekinox', name: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ekinox', name: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/ekinox', name: 'GitHub' },
  { icon: MessageCircle, href: '/discord', name: 'Discord' }
]

export default function ModernFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 backdrop-blur-sm bg-white/5 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-white/90 font-medium text-sm">Stay Updated</span>
              </div>

              <h3 className="text-4xl font-bold text-white mb-4">
                Get the Latest in AI Automation
              </h3>

              <p className="text-white/70 mb-8 text-lg">
                Join our community of innovators. Get exclusive tips, feature updates,
                and automation strategies delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30" />
                    <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">Ekinox</span>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  Empowering businesses with intelligent AI automation.
                  Build, deploy, and scale your workflows visually.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 backdrop-blur-sm bg-white/10 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 text-white/70 hover:text-white"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            {FOOTER_LINKS.map((column, columnIndex) => (
              <div key={columnIndex}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: columnIndex * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-6 text-lg">
                    {column.title}
                  </h4>
                  <ul className="space-y-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                        >
                          {link.name}
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-white/50 text-sm flex items-center gap-2">
              © 2025 Ekinox. Built with
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              for automation enthusiasts.
            </div>

            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/terms" className="hover:text-white/80 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white/80 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white/80 transition-colors">
                Cookies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
