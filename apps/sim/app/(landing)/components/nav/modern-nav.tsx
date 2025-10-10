'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  {
    name: 'Features',
    href: '#features'
  },
  {
    name: 'Integrations',
    href: '#integrations'
  },
  {
    name: 'Pricing',
    href: '#pricing'
  },
  {
    name: 'Docs',
    href: 'https://docs.ekinox.app',
    external: true
  }
]

export default function ModernNav() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
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
              <div key={index} className="relative">
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
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
              className="lg:hidden mt-4 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="py-4">
                {NAV_ITEMS.map((item, index) => (
                  <div key={index}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}

                <div className="px-6 py-4 border-t border-white/10 mt-4">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      className="text-center py-3 text-white/80 hover:text-white transition-colors"
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
                        backgroundColor: 'var(--brand-primary-hex)',
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
