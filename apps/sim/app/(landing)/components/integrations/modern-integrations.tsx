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
    <section id="integrations" className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl" />
      </div>

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
            <span style={{ color: 'var(--brand-primary-hex)' }}>
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

          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {modelProviderIcons.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/40 transition-all cursor-pointer group"
                >
                  <integration.icon className="w-8 h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {integration.label}
                  </span>
                </motion.div>
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

          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {communicationIcons.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/40 transition-all cursor-pointer group"
                >
                  <integration.icon className="w-8 h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors text-center">
                    {integration.label}
                  </span>
                </motion.div>
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

          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {dataStorageIcons.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/40 transition-all cursor-pointer group"
                >
                  <integration.icon className="w-8 h-8 text-gray-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {integration.label}
                  </span>
                </motion.div>
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
          <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-8 border border-white/30 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Tool?
            </h3>
            <p className="text-gray-600 mb-6">
              Connect any service with our flexible API integration builder
              or request a custom connector.
            </p>
            <button
              className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
              Request Integration
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
