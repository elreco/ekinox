'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { type Edge, type Node, Position } from 'reactflow'
import {
  AgentIcon,
  AirtableIcon,
  GmailIcon,
  NotionIcon,
  SlackIcon,
} from '@/components/icons'
import { LandingPromptStorage } from '@/lib/browser-storage'
import type { LandingViewportApi } from '../hero/components'
import {
  CARD_WIDTH,
  LandingCanvas,
  type LandingManualBlock,
} from '../hero/components'

const SERVICE_TEMPLATES = {
  gmail: 'Alert agent that flags important Gmail messages in my inbox',
  airtable: 'Alert agent that validates each new record in a table and prepares a weekly report',
  notion: 'Support agent that appends new support tickets to my Notion workspace',
} as const

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
      { id: 'e1', from: 'gmail-trigger', to: 'ai-summarizer' },
      { id: 'e2', from: 'ai-summarizer', to: 'slack-sender' },
    ],
  },
  {
    name: 'Data Analysis',
    description: 'Airtable data analysis',
    blocks: [
      {
        id: 'airtable-trigger',
        name: 'Airtable',
        color: '#FCB400',
        icon: <AirtableIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 80, y: 200 },
          tablet: { x: 150, y: 180 },
          desktop: { x: 180, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'New Record' }
        ],
      },
      {
        id: 'ai-analyzer',
        name: 'AI Agent',
        color: 'var(--brand-accent-hex)',
        icon: <AgentIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 300, y: 200 },
          tablet: { x: 420, y: 180 },
          desktop: { x: 520, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Claude' }
        ],
      },
      {
        id: 'slack-report',
        name: 'Slack',
        color: '#4A154B',
        icon: <SlackIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 520, y: 200 },
          tablet: { x: 690, y: 180 },
          desktop: { x: 860, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Report' }
        ],
      },
    ],
    edges: [
      { id: 'e1', from: 'airtable-trigger', to: 'ai-analyzer' },
      { id: 'e2', from: 'ai-analyzer', to: 'slack-report' },
    ],
  },
  {
    name: 'Support Automation',
    description: 'Notion support tickets',
    blocks: [
      {
        id: 'gmail-support',
        name: 'Gmail',
        color: '#EA4335',
        icon: <GmailIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 80, y: 200 },
          tablet: { x: 150, y: 180 },
          desktop: { x: 180, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Support Email' }
        ],
      },
      {
        id: 'ai-triage',
        name: 'AI Agent',
        color: 'var(--brand-accent-hex)',
        icon: <AgentIcon className='h-4 w-4 text-white' />,
        positions: {
          mobile: { x: 300, y: 200 },
          tablet: { x: 420, y: 180 },
          desktop: { x: 520, y: 200 },
        },
        tags: [
          { icon: <div className='h-3 w-3 rounded-full bg-current' />, label: 'Triage' }
        ],
      },
      {
        id: 'notion-ticket',
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
      { id: 'e1', from: 'gmail-support', to: 'ai-triage' },
      { id: 'e2', from: 'ai-triage', to: 'notion-ticket' },
    ],
  },
]

export default function InteractiveDemo() {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)
  const [rfNodes, setRfNodes] = useState<Node[]>([])
  const [rfEdges, setRfEdges] = useState<Edge[]>([])
  const [worldWidth, setWorldWidth] = useState(1000)
  const viewportApiRef = useRef<LandingViewportApi | null>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

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
      type: 'landing',
      animated: true,
      selectable: false,
      focusable: false,
    }))

    setRfNodes(nodes)
    setRfEdges(rfEdges)

    const maxX = Math.max(...nodes.map((n) => n.position.x))
    setWorldWidth(Math.min(maxX + 280 + 100, 1200))
  }, [activeWorkflowIndex, isMobile])

  if (isMobile) return null

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 mb-8 shadow-sm"
          >
            <svg
              width={20}
              height={14}
              viewBox='0 0 48 34'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id="logogram">
                <path
                  d="M15.4992 0H36.5808L21.0816 22.9729H0L15.4992 0Z"
                  fill="#0066CC"
                />
                <path
                  d="M16.4224 25.102L10.4192 34H32.5008L48 11.0271H31.7024L22.2064 25.102H16.4224Z"
                  fill="#00407F"
                />
              </g>
            </svg>
            <span>Workflow Examples</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Workflow Examples
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See real-world automation patterns in action
          </p>
        </motion.div>

        {/* Navigation tabs */}
        <div className="flex items-center justify-center gap-1 mb-12">
          {WORKFLOW_EXAMPLES.map((workflow, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveWorkflowIndex(index)
                const templates = {
                  0: SERVICE_TEMPLATES.gmail,
                  1: SERVICE_TEMPLATES.airtable,
                  2: SERVICE_TEMPLATES.notion,
                }
                const template = templates[index as keyof typeof templates]
                if (template) {
                  LandingPromptStorage.store(template)
                }
              }}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                index === activeWorkflowIndex
                  ? 'text-white border-transparent'
                  : 'text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
              }`}
              style={index === activeWorkflowIndex ? {
                backgroundColor: 'var(--brand-accent-hex)',
              } : {}}
            >
              {workflow.name}
            </button>
          ))}
        </div>

        {/* Active Workflow Canvas */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Canvas Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-2 text-sm text-gray-600 font-medium">
                {WORKFLOW_EXAMPLES[activeWorkflowIndex].description}
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="h-[500px] bg-gradient-to-br from-gray-50 to-white">
            <LandingCanvas
              nodes={rfNodes}
              edges={rfEdges}
              viewportApiRef={viewportApiRef}
              worldWidth={worldWidth}
              groupBox={null}
            />
          </div>
        </div>
      </div>
    </section>
  )
}



