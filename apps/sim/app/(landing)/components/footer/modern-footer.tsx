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
      { name: 'Integrations', href: '#integrations' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: 'https://docs.ekinox.app' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Contact', href: `mailto:alexandrelecorre.pro@gmail.com` }
    ]
  }
]

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/in/alexandre-le-corre', name: 'LinkedIn' },
]

export default function ModernFooter() {

  return (
    <footer className="relative bg-gray-900 overflow-hidden">

      <div className="relative z-10">
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
                  <img
                    src="/logo/426-240/primary/primary.svg"
                    alt="Ekinox"
                    className="h-12 w-auto"
                  />
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
