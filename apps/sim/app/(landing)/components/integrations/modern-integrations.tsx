'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Plus, Sparkles } from 'lucide-react'

// Import the actual integration icons
import * as Icons from '@/components/icons'

// AI models and providers
const modelProviderIcons = [
  { icon: Icons.OpenAIIcon, label: 'OpenAI' },
  { icon: Icons.AnthropicIcon, label: 'Anthropic' },
  { icon: Icons.GeminiIcon, label: 'Gemini' },
  { icon: Icons.MistralIcon, label: 'Mistral' },
  { icon: Icons.GroqIcon, label: 'Groq' },
  { icon: Icons.HuggingFaceIcon, label: 'HuggingFace' },
  { icon: Icons.OllamaIcon, label: 'Ollama' },
  { icon: Icons.ElevenLabsIcon, label: 'ElevenLabs' },
]

// Communication and productivity tools
const communicationIcons = [
  { icon: Icons.SlackIcon, label: 'Slack' },
  { icon: Icons.GmailIcon, label: 'Gmail' },
  { icon: Icons.OutlookIcon, label: 'Outlook' },
  { icon: Icons.DiscordIcon, label: 'Discord' },
  { icon: Icons.LinearIcon, label: 'Linear' },
  { icon: Icons.NotionIcon, label: 'Notion' },
  { icon: Icons.JiraIcon, label: 'Jira' },
  { icon: Icons.TelegramIcon, label: 'Telegram' },
  { icon: Icons.GoogleSheetsIcon, label: 'Google Sheets' },
  { icon: Icons.GoogleDriveIcon, label: 'Google Drive' },
  { icon: Icons.AirtableIcon, label: 'Airtable' },
]

// Data and storage services
const dataStorageIcons = [
  { icon: Icons.PineconeIcon, label: 'Pinecone' },
  { icon: Icons.SupabaseIcon, label: 'Supabase' },
  { icon: Icons.PostgresIcon, label: 'PostgreSQL' },
  { icon: Icons.MySQLIcon, label: 'MySQL' },
  { icon: Icons.StripeIcon, label: 'Stripe' },
  { icon: Icons.SerperIcon, label: 'Serper' },
]

export default function ModernIntegrations() {
  const allIntegrations = [
    ...modelProviderIcons,
    ...communicationIcons,
    ...dataStorageIcons,
  ]

  return (
    <section id="integrations" className="relative py-24 bg-slate-50 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Connect With
            <br />
            <span style={{ color: 'var(--brand-accent-hex)' }}>
              Your Favorite Tools
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            100+ integrations ready to use. Connect AI models, productivity tools,
            databases, and communication platforms in minutes.
          </p>
        </motion.div>

        {/* AI Models Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-800 mb-8 text-center"
          >
            AI Models & Providers
          </motion.h3>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {modelProviderIcons.map((integration, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-transform duration-200 cursor-pointer border border-transparent hover:border-gray-200 hover:scale-[1.05]"
                >
                  <integration.icon className="w-8 h-8 text-gray-700" />
                  <span className="text-sm font-medium text-gray-600">
                    {integration.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Communication & Productivity */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-800 mb-8 text-center"
          >
            Communication & Productivity
          </motion.h3>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {communicationIcons.map((integration, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-transform duration-200 cursor-pointer border border-transparent hover:border-gray-200 hover:scale-[1.05]"
                >
                  <integration.icon className="w-8 h-8 text-gray-700" />
                  <span className="text-xs font-medium text-gray-600 text-center">
                    {integration.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-800 mb-8 text-center"
          >
            Data & Storage
          </motion.h3>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {dataStorageIcons.map((integration, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-transform duration-200 cursor-pointer border border-transparent hover:border-gray-200 hover:scale-[1.05]"
                >
                  <integration.icon className="w-8 h-8 text-gray-700" />
                  <span className="text-sm font-medium text-gray-600">
                    {integration.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Tool?
            </h3>
            <p className="text-gray-600 mb-6">
              Connect any service with our flexible API integration builder
              or request a custom connector.
            </p>
            <button
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
              Request Integration
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
