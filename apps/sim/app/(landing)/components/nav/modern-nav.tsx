'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as Icons from '@/components/icons'

const WORKFLOWS = [
  { name: 'Gmail to Sheets', href: '/workflows/gmail-to-sheets-summary', description: 'Extract email insights', icons: ['GmailIcon', 'GoogleSheetsIcon'] },
  { name: 'Gmail CRM Insights', href: '/workflows/gmail-crm-insights', description: 'Analyze engagement patterns', icons: ['GmailIcon', 'AirtableIcon'] },
  { name: 'Lead Enrichment', href: '/workflows/lead-enrichment', description: 'AI web research', icons: ['AirtableIcon', 'SerperIcon'] },
  { name: 'Support Triage', href: '/workflows/support-triage', description: 'Auto-categorize tickets', icons: ['MailIcon', 'SlackIcon'] },
  { name: 'Weekly Reports', href: '/workflows/weekly-reporting', description: 'Automated insights', icons: ['GoogleSheetsIcon', 'SlackIcon'] },
  { name: 'Invoice Processing', href: '/workflows/invoice-processing', description: 'Extract invoice data', icons: ['GmailIcon', 'StripeIcon'] },
  { name: 'Calendar Insights', href: '/workflows/calendar-productivity-insights', description: 'Optimize schedule', icons: ['GoogleCalendarIcon', 'NotionIcon'] },
  { name: 'Slack Digest', href: '/workflows/slack-daily-digest', description: 'Team communications', icons: ['SlackIcon', 'NotionIcon'] },
  { name: 'Social Monitoring', href: '/workflows/social-media-monitoring', description: 'Brand mentions', icons: ['xIcon', 'LinkedInIcon'] }
]

const NAV_ITEMS = [
  {
    name: 'Features',
    href: '#features',
    anchor: true
  },
  {
    name: 'Workflows',
    href: '/workflows',
    hasDropdown: true,
    dropdownItems: WORKFLOWS
  },
  {
    name: 'Integrations',
    href: '#integrations',
    anchor: true
  },
  {
    name: 'Pricing',
    href: '#pricing',
    anchor: true
  },
  {
    name: 'Docs',
    href: 'https://docs.ekinox.app',
    external: true
  },
  {
    name: 'Blog',
    href: '/blog'
  }
]

export default function ModernNav() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleNavClick = (item: any) => {
    if (item.anchor) {
      // Si on est sur une page autre que l'accueil, rediriger vers l'accueil avec l'ancre
      if (window.location.pathname !== '/') {
        router.push(`/${item.href}`)
      } else {
        // Si on est déjà sur l'accueil, juste scroller vers l'ancre
        const element = document.querySelector(item.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/b&w/text/b&w.svg"
                alt="Ekinox - Visual AI Workflow Builder"
                width={120}
                height={28}
                priority
                className="h-7 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ) : item.anchor ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                ) : item.hasDropdown ? (
                  <div>
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium inline-flex items-center gap-1"
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-[600px] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-50"
                        >
                          <div className="p-6">
                            <div className="grid grid-cols-3 gap-4">
                              {item.dropdownItems?.map((workflow, workflowIndex) => (
                                <Link
                                  key={workflowIndex}
                                  href={workflow.href}
                                  className="block p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    {workflow.icons?.map((iconName, iconIndex) => {
                                      const IconComponent = (Icons as any)[iconName]
                                      return IconComponent ? (
                                        <div key={iconIndex} className="w-6 h-6 flex items-center justify-center">
                                          <IconComponent className="w-5 h-5 text-gray-600" />
                                        </div>
                                      ) : null
                                    })}
                                    <Sparkles className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <div className="font-medium text-gray-900 transition-colors group-hover:opacity-80 text-sm">
                                    {workflow.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {workflow.description}
                                  </div>
                                </Link>
                              ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <Link
                                href="/workflows"
                                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                                style={{ color: 'var(--brand-accent-hex)' }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'var(--brand-accent-hover-hex)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'var(--brand-accent-hex)'
                                }}
                                onClick={() => setActiveDropdown(null)}
                              >
                                View all workflows
                                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>

            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-3 rounded-lg text-white font-semibold border transition-all duration-300"
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
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 backdrop-blur-xl bg-white/95 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="py-4">
                {NAV_ITEMS.map((item, index) => (
                  <div key={index}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : item.anchor ? (
                      <button
                        onClick={() => handleNavClick(item)}
                        className="block w-full text-left px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                      >
                        {item.name}
                      </button>
                    ) : item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-gray-50 border-t border-gray-200"
                            >
                              {item.dropdownItems?.map((workflow, workflowIndex) => (
                                <div key={workflowIndex} className="px-6 py-2">
                                  <Link
                                    href={workflow.href}
                                    className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      {workflow.icons?.slice(0, 2).map((iconName, iconIndex) => {
                                        const IconComponent = (Icons as any)[iconName]
                                        return IconComponent ? (
                                          <IconComponent key={iconIndex} className="w-4 h-4 text-gray-500" />
                                        ) : null
                                      })}
                                    </div>
                                    <div>
                                      <div className="font-medium">{workflow.name}</div>
                                      <div className="text-xs text-gray-500">{workflow.description}</div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                              <div className="px-6 py-3 border-t border-gray-200">
                                <Link
                                  href="/workflows"
                                  className="text-sm font-medium transition-colors"
                                  style={{ color: 'var(--brand-accent-hex)' }}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setActiveDropdown(null)
                                  }}
                                >
                                  View all workflows →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="px-6 py-4 border-t border-gray-200 mt-4">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      className="text-center py-3 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={() => {
                        router.push('/signup')
                        setIsMobileMenuOpen(false)
                      }}
                      className="py-3 px-6 rounded-xl text-white font-semibold shadow-lg"
                      style={{
                        backgroundColor: 'var(--brand-accent-hex)',
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
