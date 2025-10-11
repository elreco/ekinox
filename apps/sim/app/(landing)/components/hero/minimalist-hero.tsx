'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
import type { LandingViewportApi } from '../hero/components'
import {
  CARD_WIDTH,
  IconButton,
  LandingCanvas,
  type LandingManualBlock,
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

// Different workflow examples with proper LandingManualBlock format
const WORKFLOW_EXAMPLES = [
  {
    name: 'Email Automation',
    description: 'Gmail to Slack summaries',
    blocks: [
      {
        id: 'gmail-trigger',
        name: 'Gmail',
        color: '#EA4335',
        icon: <GmailIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 80, y: 200 },
          tablet: { x: 150, y: 180 },
          desktop: { x: 180, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'New Email' }
        ],
      },
      {
        id: 'ai-summarizer',
        name: 'AI Agent',
        color: 'var(--brand-accent-hex)',
        icon: <AgentIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 300, y: 200 },
          tablet: { x: 420, y: 180 },
          desktop: { x: 520, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'GPT-4' }
        ],
      },
      {
        id: 'slack-sender',
        name: 'Slack',
        color: '#4A154B',
        icon: <SlackIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 520, y: 200 },
          tablet: { x: 690, y: 180 },
          desktop: { x: 860, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Send DM' }
        ],
      },
    ],
    edges: [
      { id: 'gmail-ai', from: 'gmail-trigger', to: 'ai-summarizer' },
      { id: 'ai-slack', from: 'ai-summarizer', to: 'slack-sender' },
    ]
  },
  {
    name: 'Data Analysis',
    description: 'Automated insights',
    blocks: [
      {
        id: 'schedule-daily',
        name: 'Schedule',
        color: '#7B68EE',
        icon: <ScheduleIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 80, y: 200 },
          tablet: { x: 150, y: 180 },
          desktop: { x: 180, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Daily 9AM' }
        ],
      },
      {
        id: 'database-query',
        name: 'Airtable',
        color: '#FFBF00',
        icon: <AirtableIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 300, y: 200 },
          tablet: { x: 420, y: 180 },
          desktop: { x: 520, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Query Data' }
        ],
      },
      {
        id: 'ai-insights',
        name: 'AI Agent',
        color: 'var(--brand-accent-hex)',
        icon: <AgentIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 520, y: 200 },
          tablet: { x: 690, y: 180 },
          desktop: { x: 860, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Generate Insights' }
        ],
      },
    ],
    edges: [
      { id: 'schedule-db', from: 'schedule-daily', to: 'database-query' },
      { id: 'db-ai', from: 'database-query', to: 'ai-insights' },
    ]
  },
  {
    name: 'Support Automation',
    description: 'Smart ticket routing',
    blocks: [
      {
        id: 'webhook-tickets',
        name: 'Webhook',
        color: '#8B5CF6',
        icon: <div className='h-4 w-4 rounded-full bg-current' />,
        positions: {
          mobile: { x: 80, y: 200 },
          tablet: { x: 150, y: 180 },
          desktop: { x: 180, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'New Ticket' }
        ],
      },
      {
        id: 'ai-classifier',
        name: 'AI Agent',
        color: 'var(--brand-accent-hex)',
        icon: <AgentIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 300, y: 200 },
          tablet: { x: 420, y: 180 },
          desktop: { x: 520, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Classify Priority' }
        ],
      },
      {
        id: 'notion-create',
        name: 'Notion',
        color: '#000000',
        icon: <NotionIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 520, y: 200 },
          tablet: { x: 690, y: 180 },
          desktop: { x: 860, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Create Ticket' }
        ],
      },
    ],
    edges: [
      { id: 'webhook-ai', from: 'webhook-tickets', to: 'ai-classifier' },
      { id: 'ai-notion', from: 'ai-classifier', to: 'notion-create' },
    ]
  }
]


export default function MinimalistHero() {
  const router = useRouter()
  const [textValue, setTextValue] = useState('')
  const [isUserHovering, setIsUserHovering] = useState(false)
  const [autoHoverIndex, setAutoHoverIndex] = useState(0)
  const [lastHoveredIndex, setLastHoveredIndex] = useState(0)
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)
  const [nodePositions, setNodePositions] = useState<Record<string, {x: number, y: number}>>({})

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isEmpty = textValue.trim() === ''

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  const [rfNodes, setRfNodes] = useState<Node[]>([])
  const [rfEdges, setRfEdges] = useState<Edge[]>([])
  const [worldWidth, setWorldWidth] = useState(1000)
  const viewportApiRef = useRef<LandingViewportApi | null>(null)

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
    { icon: PineconeIcon, label: 'Pinecone', key: 'pinecone' },
  ]

  const handleServiceClick = (serviceKey: keyof typeof SERVICE_TEMPLATES) => {
    const template = SERVICE_TEMPLATES[serviceKey]
    setTextValue(template)
    LandingPromptStorage.store(template)
  }

  const handleSubmit = () => {
    if (!isEmpty) {
      LandingPromptStorage.store(textValue)
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

  // Setup canvas nodes and edges - Only when workflow changes
  useEffect(() => {
    const workflow = WORKFLOW_EXAMPLES[activeWorkflowIndex]
    const breakpoint = isMobile ? 'mobile' : typeof window !== 'undefined' && window.innerWidth < 1024 ? 'tablet' : 'desktop'

    const nodes: Node[] = workflow.blocks.map((block, index) => ({
      id: block.id,
      type: 'landing',
      position: block.positions[breakpoint],
      data: {
        icon: block.icon,
        color: block.color,
        name: block.name,
        tags: block.tags,
        delay: index * 0.18,
        hideTargetHandle: index === 0,
        hideSourceHandle: index === workflow.blocks.length - 1,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: true,
      selectable: true,
      focusable: true,
      connectable: false,
    }))

    const rfEdges: Edge[] = workflow.edges.map((edge) => ({
      id: edge.id,
      source: edge.from,
      target: edge.to,
      type: 'landingEdge',
      animated: false,
      data: { delay: 0.6 },
    }))

    setRfNodes(nodes)
    setRfEdges(rfEdges)

    // Calculate world width - keep it reasonable for viewport
    const maxX = Math.max(...nodes.map((n) => n.position.x))
    setWorldWidth(Math.min(maxX + 280 + 100, 1200)) // Cap at 1200px for visibility
  }, [activeWorkflowIndex, isMobile])

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-24 pb-16">
      {/* Stylized background pattern - Hero section only */}
      <svg
        aria-hidden='true'
        className='pointer-events-none absolute top-0 left-0 w-full opacity-40'
        style={{ zIndex: 1, height: '100%' }}
        viewBox='0 0 1880 960'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMidYMid slice'
      >
        {/* Right side organic curves */}
        <path
          d='M1393.53 42.8889C1545.99 173.087 1688.28 339.75 1878.44 817.6'
          stroke='#E7E4EF'
          strokeWidth='2'
        />
        <path d='M1624.21 960L1625.78 0' stroke='#E7E4EF' strokeWidth='2' />
        <path d='M1832.67 715.81L1880 716.031' stroke='#E7E4EF' strokeWidth='2' />
        <path d='M1393.4 40V0' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='1393.03' cy='40.0186' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='1625.28' cy='303.147' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='1837.37' cy='715.81' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />

        {/* Left side organic curves */}
        <path
          d='M160 157.764C319.811 136.451 417.278 102.619 552.39 0'
          stroke='#E7E4EF'
          strokeWidth='2'
        />
        <path d='M310.22 803.025V0' stroke='#E7E4EF' strokeWidth='2' />
        <path
          d='M160 530.184C256.142 655.353 308.338 749.141 348.382 960'
          stroke='#E7E4EF'
          strokeWidth='2'
        />
        <path d='M160 157.764V960' stroke='#E7E4EF' strokeWidth='2' />
        <path d='M-50 157.764L160 157.764' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='160' cy='157.764' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='310.22' cy='803.025' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />
        <circle cx='160' cy='530.184' r='8.07846' fill='white' stroke='#E7E4EF' strokeWidth='2' />

        {/* Additional flowing curves for landing page */}
        <path
          d='M400 200C600 350 800 450 1200 600'
          stroke='#E7E4EF'
          strokeWidth='1.5'
          opacity='0.6'
        />
        <path
          d='M200 600C450 500 700 400 1000 200'
          stroke='#E7E4EF'
          strokeWidth='1.5'
          opacity='0.6'
        />

        {/* Subtle connecting nodes */}
        <circle cx='600' cy='350' r='4' fill='white' stroke='#E7E4EF' strokeWidth='1.5' opacity='0.7' />
        <circle cx='800' cy='450' r='4' fill='white' stroke='#E7E4EF' strokeWidth='1.5' opacity='0.7' />
        <circle cx='450' cy='500' r='4' fill='white' stroke='#E7E4EF' strokeWidth='1.5' opacity='0.7' />
        <circle cx='700' cy='400' r='4' fill='white' stroke='#E7E4EF' strokeWidth='1.5' opacity='0.7' />
      </svg>

      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center justify-between min-h-[calc(100vh-6rem)] max-w-7xl mx-auto px-6"
      >
        {/* Main Content Container */}
        <div className="text-center space-y-4 w-full pt-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 mb-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand-accent-hex)' }} />
              Visual AI Automation Platform
            </motion.div>

            <h1 className={`${soehne.className} text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight`}>
              Build AI Workflows
              <br />
              <span style={{ color: 'var(--brand-accent-hex)' }} className="relative">
                Visually
                {/* Underline effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-2 left-0 right-0 h-1 rounded-full origin-left"
                  style={{ backgroundColor: 'var(--brand-accent-hex)', opacity: 0.3 }}
                />
              </span>
            </h1>

            <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Create powerful AI automation without writing code. Connect your favorite tools,
              design intelligent workflows, and deploy them in minutes.
            </p>
          </motion.div>

          {/* Service Integration Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 flex-wrap max-w-4xl mx-auto mb-8"
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
          >
            {serviceIcons.slice(0, 12).map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <IconButton
                  aria-label={service.label}
                  onClick={() => handleServiceClick(service.key as keyof typeof SERVICE_TEMPLATES)}
                  onMouseEnter={() => setLastHoveredIndex(index)}
                  isAutoHovered={!isUserHovering && index === autoHoverIndex}
                >
                  <service.icon className='h-5 w-5 sm:h-6 sm:w-6' />
                </IconButton>
              </motion.div>
            ))}
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative bg-white rounded-2xl border border-gray-300 hover:border-gray-400 transition-all duration-300 focus-within:border-gray-500">
              <label htmlFor="agent-description" className="sr-only">
                Describe the AI agent you want to build
              </label>
              <textarea
                id="agent-description"
                placeholder={
                  isMobile ? 'Build an AI agent...' : 'Ask Ekinox to build an agent to read my emails and send summaries to Slack...'
                }
                className="w-full h-32 sm:h-36 resize-none px-6 py-4 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-lg rounded-2xl"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <motion.button
                type="button"
                aria-label="Submit description"
                className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 transition-all duration-200"
                disabled={isEmpty}
                onClick={handleSubmit}
                style={{
                  backgroundColor: isEmpty ? '#F8F9FA' : 'var(--brand-accent-hex)',
                  borderColor: isEmpty ? '#E5E7EB' : 'var(--brand-accent-hex)',
                  cursor: isEmpty ? 'not-allowed' : 'pointer',
                }}
                whileHover={!isEmpty ? { scale: 1.05 } : {}}
                whileTap={!isEmpty ? { scale: 0.95 } : {}}
              >
                <ArrowUp size={20} color={isEmpty ? '#9CA3AF' : '#FFFFFF'} />
              </motion.button>
            </div>
          </motion.div>
        </div>


        {/* CTA & Stats Section - Separate container */}
        <div className="text-center space-y-8 w-full mt-16">
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <button
              onClick={() => router.push('/signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg text-white font-semibold border-2 transition-all duration-300 hover:scale-[1.02]"
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
              Start Building Free
            </button>

            <button
              onClick={() => router.push('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-white rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02]"
            >
              Sign In
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-200 max-w-2xl mx-auto"
          >
            {[
              { number: '100+', label: 'AI Integrations' },
              { number: '50k+', label: 'Workflows Created' },
              { number: '< 5min', label: 'Setup Time' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
