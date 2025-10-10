'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Edge, type Node, Position } from 'reactflow'
import {
  AgentIcon,
  AirtableIcon,
  DiscordIcon,
  GmailIcon,
  GoogleDriveIcon,
  GoogleSheetsIcon,
  JiraIcon,
  LinearIcon,
  NotionIcon,
  OpenAIIcon,
  OutlookIcon,
  PackageSearchIcon,
  PineconeIcon,
  ScheduleIcon,
  SlackIcon,
  StripeIcon,
  SupabaseIcon,
} from '@/components/icons'
import { soehne } from '@/app/fonts/soehne/soehne'
import { LandingPromptStorage } from '@/lib/browser-storage'
import {
  CARD_WIDTH,
  IconButton,
  LandingCanvas,
  type LandingGroupData,
  type LandingManualBlock,
  type LandingViewportApi,
} from '../hero/components'

const FLOATING_ELEMENTS = [
  { icon: Brain, delay: 0, x: 20, y: 30 },
  { icon: Zap, delay: 0.5, x: -30, y: 50 },
  { icon: Workflow, delay: 1, x: 40, y: -20 },
  { icon: Sparkles, delay: 1.5, x: -20, y: -40 },
]

const GRADIENT_STOPS = [
  { color: 'from-blue-600/20', position: '0%' },
  { color: 'via-purple-600/20', position: '50%' },
  { color: 'to-cyan-600/20', position: '100%' },
]

export default function NewHero() {
  const router = useRouter()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,69,244,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {FLOATING_ELEMENTS.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [element.x, element.x + 20, element.x],
              y: [element.y, element.y - 10, element.y]
            }}
            transition={{
              delay: element.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
          >
            <element.icon size={32} />
          </motion.div>
        ))}
      </div>

      {/* Mouse Follower Glass Effect */}
      <motion.div
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        {/* Main Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-50 blur-xl" />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Powered by Advanced AI Technology
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${soehne.className} text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight`}
            >
              Build AI Agents
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Visually
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create powerful AI workflows without writing a single line of code.
              Connect, automate, and scale your business intelligence with our
              intuitive drag-and-drop platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/signup')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  Start Building Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="group flex items-center gap-3 px-8 py-4 backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  <Play className="w-5 h-5 relative z-10" />
                </div>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              {[
                { number: '100+', label: 'AI Integrations' },
                { number: '50k+', label: 'Workflows Created' },
                { number: '< 5min', label: 'Setup Time' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Brain,
              title: 'AI-Powered',
              description: 'Advanced machine learning algorithms'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Deploy workflows in seconds'
            },
            {
              icon: Workflow,
              title: 'Visual Builder',
              description: 'Drag, drop, and connect with ease'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/40 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/40 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
