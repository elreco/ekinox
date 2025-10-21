'use client'

import React from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Zap, Plus, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'
import * as Icons from '@/components/icons'

const workflows = [
  {
    title: 'Generate personalized outreach emails from spreadsheet',
    description:
      'Read prospect data from Google Sheets, use AI to research each company and generate personalized email content, then send customized outreach emails via Gmail at scale.',
    longDescription: 'Perfect for sales teams who need to send personalized outreach at scale. The AI researches each prospect and writes tailored messages that feel human.',
    integrations: [
      { icon: Icons.GoogleSheetsIcon, name: 'Google Sheets' },
      { icon: Icons.SerperIcon, name: 'Web Search' },
      { icon: Icons.GmailIcon, name: 'Gmail' },
    ],
    slug: 'personalized-email-outreach',
    category: 'Email Automation',
    steps: [
      'Read prospect list from Google Sheets',
      'AI researches each company online',
      'Generates personalized email content',
      'Sends tailored emails via Gmail'
    ]
  },
  {
    title: 'Auto-qualify leads and send follow-up sequences',
    description:
      'Monitor new leads in your CRM, use AI to research company fit and buying signals, score lead quality, then automatically trigger personalized email sequences via Gmail based on qualification tier.',
    longDescription: 'Automate your lead qualification process. AI evaluates company size, funding, tech stack, and buying intent to prioritize hot leads and nurture cold ones with appropriate messaging.',
    integrations: [
      { icon: Icons.AirtableIcon, name: 'CRM' },
      { icon: Icons.SerperIcon, name: 'Web Search' },
      { icon: Icons.GmailIcon, name: 'Gmail' },
    ],
    slug: 'lead-qualification-followup',
    category: 'Sales Automation',
    steps: [
      'New lead detected in CRM',
      'AI researches company and buying signals',
      'Scores and qualifies lead tier',
      'Sends appropriate email sequence via Gmail'
    ]
  },
  {
    title: 'Enrich leads with AI web research',
    description:
      'Automatically enrich new CRM leads by performing web searches, extracting company information, social profiles, funding data, and technology stack, then update the lead record.',
    longDescription: 'Save hours of manual research. The AI gathers firmographic data, finds decision makers, and scores lead quality before your sales team even sees them.',
    integrations: [
      { icon: Icons.AirtableIcon, name: 'Database' },
      { icon: Icons.SerperIcon, name: 'Web Search' },
    ],
    slug: 'lead-enrichment',
    category: 'Sales Automation',
    steps: [
      'New lead enters database',
      'AI searches web for company data',
      'Extracts firmographics and signals',
      'Updates CRM with enriched data'
    ]
  },
  {
    title: 'Auto-triage support tickets with AI',
    description:
      'Analyze incoming support tickets, categorize by urgency and topic, suggest answers from your knowledge base, and route to the right team or create Slack alerts for critical issues.',
    longDescription: 'Reduce response times and improve customer satisfaction. AI understands context, detects sentiment, and can even auto-respond to common questions.',
    integrations: [
      { icon: Icons.MailIcon, name: 'Support' },
      { icon: Icons.SlackIcon, name: 'Slack' },
      { icon: Icons.NotionIcon, name: 'Notion' },
    ],
    slug: 'support-triage',
    category: 'Customer Support',
    steps: [
      'New ticket arrives',
      'AI categorizes and detects urgency',
      'Searches knowledge base for answers',
      'Routes to team or auto-responds'
    ]
  },
  {
    title: 'Generate weekly business reports',
    description:
      'Pull data from Google Sheets, databases, and analytics tools, then use AI to analyze trends, create visualizations, write executive summaries, and send formatted reports via email or Slack.',
    longDescription: 'Turn scattered data into actionable insights. The AI identifies trends, flags anomalies, and writes clear summaries that executives actually read.',
    integrations: [
      { icon: Icons.GoogleSheetsIcon, name: 'Google Sheets' },
      { icon: Icons.SlackIcon, name: 'Slack' },
      { icon: Icons.GmailIcon, name: 'Gmail' },
    ],
    slug: 'weekly-reporting',
    category: 'Analytics',
    steps: [
      'Scheduled trigger every Monday',
      'Collect data from multiple sources',
      'AI analyzes trends and anomalies',
      'Generates report and sends to team'
    ]
  },
  {
    title: 'Generate financial reports and send alerts',
    description:
      'Pull transaction data from Stripe and accounting databases, use AI to analyze spending patterns, detect anomalies, categorize expenses, then generate formatted reports and send alerts via Gmail for urgent items.',
    longDescription: 'Automate your financial monitoring. AI identifies unusual transactions, tracks budget compliance, and generates executive summaries with actionable insights.',
    integrations: [
      { icon: Icons.StripeIcon, name: 'Stripe' },
      { icon: Icons.GoogleSheetsIcon, name: 'Google Sheets' },
      { icon: Icons.GmailIcon, name: 'Gmail' },
    ],
    slug: 'financial-monitoring-alerts',
    category: 'Finance Automation',
    steps: [
      'Collect transaction data from Stripe',
      'AI analyzes spending and detects anomalies',
      'Categorizes expenses and validates budgets',
      'Sends formatted reports and alerts via Gmail'
    ]
  },
  {
    title: 'Analyze calendar patterns and optimize scheduling',
    description:
      'Monitor your Google Calendar to identify scheduling patterns, detect optimal meeting times, and generate weekly productivity reports with AI insights about your time allocation and meeting efficiency.',
    longDescription: 'Transform your calendar data into productivity insights. AI analyzes meeting patterns, identifies time blocks for deep work, and suggests optimizations for better work-life balance.',
    integrations: [
      { icon: Icons.GoogleCalendarIcon, name: 'Google Calendar' },
      { icon: Icons.NotionIcon, name: 'Notion' },
    ],
    slug: 'calendar-productivity-insights',
    category: 'Productivity',
    steps: [
      'Analyze calendar patterns weekly',
      'AI identifies optimal focus times',
      'Detects meeting efficiency metrics',
      'Generates productivity insights report'
    ]
  },
  {
    title: 'Summarize daily Slack messages into reports',
    description:
      'Collect important messages from specific Slack channels, categorize by project or priority, and generate daily digest reports sent to your email or saved to Notion.',
    longDescription: 'Stay on top of team communications without constant monitoring. AI filters noise, identifies action items, and creates structured summaries.',
    integrations: [
      { icon: Icons.SlackIcon, name: 'Slack' },
      { icon: Icons.NotionIcon, name: 'Notion' },
      { icon: Icons.GmailIcon, name: 'Gmail' },
    ],
    slug: 'slack-daily-digest',
    category: 'Productivity',
    steps: [
      'Collect messages from key channels',
      'AI categorizes by importance',
      'Identifies action items and decisions',
      'Generates structured daily report'
    ]
  },
  {
    title: 'Track social media mentions and sentiment',
    description:
      'Monitor Twitter, LinkedIn, and Reddit for brand mentions, analyze sentiment using AI, categorize feedback, and alert your team about important conversations or PR opportunities.',
    longDescription: 'Never miss important brand conversations. AI analyzes sentiment, identifies influencers, and flags urgent issues that need immediate attention.',
    integrations: [
      { icon: Icons.xIcon, name: 'Twitter' },
      { icon: Icons.LinkedInIcon, name: 'LinkedIn' },
      { icon: Icons.SlackIcon, name: 'Slack' },
    ],
    slug: 'social-media-monitoring',
    category: 'Marketing',
    steps: [
      'Scan social platforms for mentions',
      'AI analyzes sentiment and context',
      'Categorizes by urgency and type',
      'Alerts team via Slack for urgent items'
    ]
  },
]

const categories = [
  { name: 'All Workflows', slug: 'all' },
  { name: 'Email Automation', slug: 'Email Automation' },
  { name: 'Sales Automation', slug: 'Sales Automation' },
  { name: 'Customer Support', slug: 'Customer Support' },
  { name: 'Analytics', slug: 'Analytics' },
  { name: 'Finance Automation', slug: 'Finance Automation' },
  { name: 'Productivity', slug: 'Productivity' },
  { name: 'Marketing', slug: 'Marketing' },
]

export default function WorkflowsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = React.useState('all')

  const filteredWorkflows = activeCategory === 'all'
    ? workflows
    : workflows.filter(w => w.category === activeCategory)

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: workflows.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: w.title,
      url: `https://www.ekinox.app/workflows#${w.slug}`,
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI workflow in Ekinox?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'An AI workflow in Ekinox is an automated process that uses artificial intelligence to read, analyze, transform, and act on data across your tools. It combines triggers, AI reasoning, integrations, and actions to handle complex tasks without manual work.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to code to build these workflows?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'No coding required! Ekinox provides a visual drag-and-drop canvas where you connect pre-built blocks for AI models, integrations, and logic. Start from templates and customize with clicks, not code.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which AI models and apps are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ekinox supports all major AI models including OpenAI GPT-4, Anthropic Claude, Google Gemini, Mistral, and more. We integrate with 100+ apps including Gmail, Slack, HubSpot, Salesforce, Google Sheets, Linear, Notion, and many others.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I review AI outputs before they take action?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes! You can add human-in-the-loop approval steps to any workflow. The AI will generate drafts, predictions, or recommendations and wait for your approval before sending emails, updating records, or taking other actions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do these workflows cost to run?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ekinox includes AI credits with each plan. Usage depends on which AI models you use and workflow complexity. You can monitor costs in real-time and set budgets to control spending. Most workflows cost just cents per execution.',
        },
      },
    ],
  }

  return (
    <>
      <Script id="workflows-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Script id="workflows-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <ModernNav />

      {/* Background video that extends under navbar */}
      <div className="fixed inset-0 z-0">
        <img
          src="/static/demo.gif"
          alt="Ekinox platform demo"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
      </div>

      <main className="relative z-10">

        <section className="relative z-10 px-6 md:px-10 lg:px-16 xl:px-24 py-24 md:pt-44 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-6"
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--brand-accent-hex)' }} />
              <span>AI-Powered Workflows</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Connect Your Apps with
              <br />
              <span style={{ color: 'var(--brand-accent-hex)' }}>
                Intelligent Automation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
              Discover ready-to-use AI workflow templates that automate email, sales, support, analytics, and more.
              Start from a template and customize to fit your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => router.push('/signup')}
                className="px-8 py-4 rounded-lg text-white font-semibold border transition-all duration-300 inline-flex items-center gap-2"
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
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="#workflows"
                className="px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                Browse Workflows
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="workflows" className="relative z-10 px-6 md:px-10 lg:px-16 xl:px-24 py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? 'text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    activeCategory === cat.slug
                      ? { backgroundColor: 'var(--brand-accent-hex)' }
                      : {}
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow, index) => (
                <motion.div
                  key={workflow.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      {workflow.integrations.map((int, idx) => {
                        const IconComponent = int.icon
                        return (
                          <div key={idx} className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200" title={int.name}>
                            {IconComponent ? (
                              <IconComponent className="w-6 h-6 text-gray-700" />
                            ) : (
                              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs">?</div>
                            )}
                          </div>
                        )
                      })}
                      <Plus className="w-4 h-4 text-gray-400" />
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <Sparkles className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {workflow.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                      {workflow.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      {workflow.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {workflow.steps.slice(0, 3).map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                          <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-accent-hex)' }} />
                          <span>{step}</span>
                        </div>
                      ))}
                      {workflow.steps.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{workflow.steps.length - 3} more steps
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/workflows/${workflow.slug}`}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                      style={{ color: 'var(--brand-accent-hex)' }}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Teams Choose Ekinox
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The most powerful and flexible platform for AI workflow automation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visual Builder</h3>
                <p className="text-sm text-gray-600">
                  Drag-and-drop interface for complex workflows. No coding required.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Model AI</h3>
                <p className="text-sm text-gray-600">
                  Choose the best AI model for each task. GPT-4, Claude, Gemini, and more.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Human-in-Loop</h3>
                <p className="text-sm text-gray-600">
                  Add approval steps to review AI outputs before actions are taken.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise Ready</h3>
                <p className="text-sm text-gray-600">
                  SOC 2 compliant with audit logs, RBAC, and dedicated support.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/integrations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                View All Integrations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faq.mainEntity.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Ready to automate your workflows?</p>
              <button
                onClick={() => router.push('/signup')}
                className="px-8 py-4 rounded-lg text-white font-semibold border transition-all duration-300 inline-flex items-center gap-2"
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
                Start Building for Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <ModernFooter />
      </div>
    </>
  )
}
