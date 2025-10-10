'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
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

const SERVICE_TEMPLATES = {
  slack: 'Summarizer agent that summarizes each new message in #general and sends me a DM',
  gmail: 'Alert agent that flags important Gmail messages in my inbox',
  outlook: 'Auto-forwarding agent that classifies each new Outlook email and forwards to separate inboxes',
  pinecone: 'RAG chat agent that uses memories stored in Pinecone',
  supabase: 'Natural language to SQL agent to query and update data in Supabase',
  linear: 'Agent that uses Linear to triage issues, assign owners, and draft updates',
  discord: 'Moderator agent that responds back to users in my Discord server',
  airtable: 'Alert agent that validates each new record in a table and prepares a weekly report',
  stripe: 'Agent that analyzes Stripe payment history to spot churn risks',
  notion: 'Support agent that appends new support tickets to my Notion workspace',
  googleSheets: 'Data science agent that analyzes Google Sheets data and generates insights',
  googleDrive: 'Drive reader agent that summarizes content in my Google Drive',
  jira: 'Engineering manager agent that uses Jira to update ticket statuses and generate reports',
} as const

const LANDING_BLOCKS: LandingManualBlock[] = [
  {
    id: 'schedule',
    name: 'Schedule',
    color: '#7B68EE',
    icon: <ScheduleIcon className='h-4 w-4' />,
    positions: {
      mobile: { x: 8, y: 60 },
      tablet: { x: 40, y: 120 },
      desktop: { x: 60, y: 180 },
    },
    tags: [
      { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: '09:00AM Daily' },
    ],
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    color: '#00B0B0',
    icon: <PackageSearchIcon className='h-4 w-4' />,
    positions: {
      mobile: { x: 120, y: 140 },
      tablet: { x: 220, y: 200 },
      desktop: { x: 420, y: 241 },
    },
    tags: [
      { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Product DB' },
    ],
  },
  {
    id: 'agent',
    name: 'Agent',
    color: 'var(--brand-primary-hex)',
    icon: <AgentIcon className='h-4 w-4' />,
    positions: {
      mobile: { x: 240, y: 100 },
      tablet: { x: 340, y: 160 },
      desktop: { x: 880, y: 142 },
    },
    tags: [
      { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'GPT-4' },
    ],
  },
  {
    id: 'function',
    name: 'Function',
    color: '#FF6B35',
    icon: <div className='h-4 w-4 rounded bg-current' />,
    positions: {
      mobile: { x: 240, y: 200 },
      tablet: { x: 340, y: 280 },
      desktop: { x: 880, y: 340 },
    },
    tags: [
      { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Send Email' },
    ],
  },
]

const SAMPLE_WORKFLOW_EDGES = [
  { id: 'schedule-knowledge', from: 'schedule', to: 'knowledge' },
  { id: 'knowledge-agent', from: 'knowledge', to: 'agent' },
  { id: 'agent-function', from: 'agent', to: 'function' },
]

export default function ImprovedHero() {
  const router = useRouter()
  const viewportApiRef = useRef<LandingViewportApi | null>(null)
  const [textValue, setTextValue] = useState('')
  const [rfNodes, setRfNodes] = useState<Node[]>([])
  const [rfEdges, setRfEdges] = useState<Edge[]>([])
  const [worldWidth, setWorldWidth] = useState(1000)
  const [isUserHovering, setIsUserHovering] = useState(false)
  const [autoHoverIndex, setAutoHoverIndex] = useState(0)
  const [lastHoveredIndex, setLastHoveredIndex] = useState(0)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isEmpty = textValue.trim() === ''

  // Service icons for integration buttons
  const serviceIcons = [
    { icon: SlackIcon, label: 'Slack', key: 'slack' },
    { icon: GmailIcon, label: 'Gmail', key: 'gmail' },
    { icon: OutlookIcon, label: 'Outlook', key: 'outlook' },
    { icon: NotionIcon, label: 'Notion', key: 'notion' },
    { icon: LinearIcon, label: 'Linear', key: 'linear' },
    { icon: DiscordIcon, label: 'Discord', key: 'discord' },
    { icon: AirtableIcon, label: 'Airtable', key: 'airtable' },
    { icon: StripeIcon, label: 'Stripe', key: 'stripe' },
    { icon: GoogleSheetsIcon, label: 'Google Sheets', key: 'googleSheets' },
    { icon: GoogleDriveIcon, label: 'Google Drive', key: 'googleDrive' },
    { icon: JiraIcon, label: 'Jira', key: 'jira' },
    { icon: SupabaseIcon, label: 'Supabase', key: 'supabase' },
    { icon: PineconeIcon, label: 'Pinecone', key: 'pinecone' },
  ]

  const handleServiceClick = (serviceKey: keyof typeof SERVICE_TEMPLATES) => {
    const template = SERVICE_TEMPLATES[serviceKey]
    setTextValue(template)
    LandingPromptStorage.set(template)
  }

  const handleSubmit = () => {
    if (!isEmpty) {
      LandingPromptStorage.set(textValue)
      router.push('/signup')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-hover effect for service icons
  useEffect(() => {
    if (isUserHovering) return

    const interval = setInterval(() => {
      setAutoHoverIndex((prev) => (prev + 1) % serviceIcons.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isUserHovering, serviceIcons.length])

  // Setup canvas nodes and edges
  useEffect(() => {
    const breakpoint = typeof window !== 'undefined' && window.innerWidth < 768
      ? 'mobile'
      : typeof window !== 'undefined' && window.innerWidth < 1024
        ? 'tablet'
        : 'desktop'

    const nodes: Node[] = [
      {
        id: 'loop',
        type: 'group',
        position: { x: 720, y: 20 },
        data: { label: 'Loop' },
        draggable: false,
        selectable: false,
        style: {
          width: 1198,
          height: 528,
          backgroundColor: 'transparent',
          border: 'none',
        },
      },
      ...LANDING_BLOCKS.map((block, index) => {
        const isLoopChild = block.id === 'agent' || block.id === 'function'
        const baseNode = {
          id: block.id,
          type: 'landing',
          position: isLoopChild
            ? {
                x: block.id === 'agent' ? 160 : 160,
                y: block.id === 'agent' ? 122 : 320,
              }
            : block.positions[breakpoint],
          data: {
            icon: block.icon,
            color: block.color,
            name: block.name,
            tags: block.tags,
            delay: index * 0.18,
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        }

        if (isLoopChild) {
          return {
            ...baseNode,
            parentId: 'loop',
            extent: 'parent',
          }
        }

        return baseNode
      }),
    ]

    const rfEdges: Edge[] = SAMPLE_WORKFLOW_EDGES.map((e) => ({
      id: e.id,
      source: e.from,
      target: e.to,
      type: 'landingEdge',
      animated: false,
      data: { delay: 0.6 },
    }))

    setRfNodes(nodes)
    setRfEdges(rfEdges)

    const maxX = Math.max(...nodes.map((n) => n.position.x))
    setWorldWidth(maxX + CARD_WIDTH + 32)
  }, [])

  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`${soehne.className} text-5xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight`}>
            AI Workflows
            <br />
            <span style={{ color: 'var(--brand-primary-hex)' }}>
              Made Visual
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Build and deploy AI agent workflows with our intuitive visual builder
          </p>
        </motion.div>

        {/* Service Integration Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8 flex-wrap"
          onMouseEnter={() => setIsUserHovering(true)}
          onMouseLeave={() => setIsUserHovering(false)}
        >
          {serviceIcons.slice(0, 12).map((service, index) => (
            <IconButton
              key={service.key}
              aria-label={service.label}
              onClick={() => handleServiceClick(service.key as keyof typeof SERVICE_TEMPLATES)}
              onMouseEnter={() => setLastHoveredIndex(index)}
              isAutoHovered={!isUserHovering && index === autoHoverIndex}
              className="hover:scale-110 transition-transform duration-200"
            >
              <service.icon className='h-5 w-5 sm:h-6 sm:w-6' />
            </IconButton>
          ))}
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex w-full items-center justify-center px-4 mb-16"
        >
          <div className="relative w-full max-w-2xl">
            <label htmlFor="agent-description" className="sr-only">
              Describe the AI agent you want to build
            </label>
            <div className="relative backdrop-blur-sm bg-white/70 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <textarea
                id="agent-description"
                placeholder={
                  isMobile ? 'Build an AI agent...' : 'Ask Ekinox to build an agent to read my emails and send summaries...'
                }
                className="w-full h-24 sm:h-28 resize-none px-4 py-3 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-base rounded-2xl"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                aria-label="Submit description"
                className="absolute right-3 bottom-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-200"
                disabled={isEmpty}
                onClick={handleSubmit}
                style={{
                  backgroundColor: isEmpty ? '#E5E5E5' : 'var(--brand-primary-hex)',
                  cursor: isEmpty ? 'not-allowed' : 'pointer',
                }}
              >
                <ArrowUp size={18} className="sm:w-5 sm:h-5" color={isEmpty ? '#999999' : '#FFFFFF'} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Canvas Playground - Desktop only */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-[1308px] mx-auto"
          >
            <div className="relative backdrop-blur-sm bg-white/40 rounded-3xl p-8 border border-white/30 shadow-xl">
              <LandingCanvas
                nodes={rfNodes}
                edges={rfEdges}
                groupBox={{
                  x: 720,
                  y: 20,
                  width: 1198,
                  height: 528,
                }}
                worldWidth={worldWidth}
                viewportApiRef={viewportApiRef}
              />
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push('/signup')}
            className="px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: 'var(--brand-primary-hex)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-primary-hover-hex)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-primary-hex)'
            }}
          >
            Start Building Free
          </button>

          <button
            onClick={() => router.push('/login')}
            className="px-8 py-4 backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-white/80 transition-all duration-300"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    </section>
  )
}
