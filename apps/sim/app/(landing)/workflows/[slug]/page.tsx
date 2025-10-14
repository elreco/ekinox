import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WorkflowPageClient from './workflow-page-client.tsx'
import * as Icons from '@/components/icons'

export { generateMetadata } from './metadata'

const workflows = [
  {
    title: 'Summarize Gmail emails and log to Google Sheets',
    description:
      'Automatically read new emails, extract key information like sender, subject, action items, and deadlines, then append structured summaries to a Google Sheet for easy tracking.',
    longDescription: 'Perfect for busy professionals who need to track important communications without manual data entry. The AI extracts relevant details and organizes them automatically.',
    integrations: [
      { iconName: 'GmailIcon', name: 'Gmail' },
      { iconName: 'GoogleSheetsIcon', name: 'Google Sheets' },
    ],
    slug: 'gmail-to-sheets-summary',
    category: 'Email Automation',
    steps: [
      { title: 'New email arrives in Gmail', description: 'Workflow triggers when an email matching your filters arrives in your inbox.' },
      { title: 'AI extracts sender, subject, urgency', description: 'GPT-4 analyzes the email content and extracts key metadata including priority level.' },
      { title: 'Identifies action items and deadlines', description: 'Natural language processing detects tasks, owners, and due dates mentioned in the email.' },
      { title: 'Appends row to Google Sheets', description: 'Structured data is written to your spreadsheet with timestamp and categorization.' }
    ],
    benefits: [
      'Never miss important action items buried in email threads',
      'Automatic categorization and priority scoring',
      'Searchable archive of all communications',
      'Team visibility into pending tasks'
    ],
    useCases: [
      'Customer support teams tracking incoming requests',
      'Sales teams managing leads from email',
      'Project managers monitoring stakeholder communications',
      'Executive assistants organizing calendar and tasks'
    ]
  },
  {
    title: 'Analyze Gmail patterns and update CRM insights',
    description:
      'Monitor Gmail for incoming emails from prospects, analyze communication patterns and engagement levels, then automatically update your CRM with AI-generated insights about lead quality and next best actions.',
    longDescription: 'Transform email interactions into actionable sales intelligence. AI analyzes response times, email content, and engagement patterns to score leads and suggest optimal follow-up strategies.',
    integrations: [
      { iconName: 'GmailIcon', name: 'Gmail' },
      { iconName: 'AirtableIcon', name: 'CRM' },
    ],
    slug: 'gmail-crm-insights',
    category: 'Sales Automation',
    steps: [
      { title: 'Monitor Gmail for prospect emails', description: 'System tracks incoming emails from leads and prospects in your pipeline.' },
      { title: 'AI analyzes engagement patterns', description: 'Machine learning evaluates response times, email frequency, and content sentiment.' },
      { title: 'Scores lead quality and interest level', description: 'Algorithm assigns engagement scores based on communication behavior patterns.' },
      { title: 'Updates CRM with actionable insights', description: 'Automatically adds lead scores, next actions, and engagement notes to your CRM.' }
    ],
    benefits: [
      'Automatic lead scoring based on email engagement',
      'Identify hot prospects without manual analysis',
      'Data-driven insights for sales prioritization',
      'Improved conversion rates through better targeting'
    ],
    useCases: [
      'Sales teams prioritizing follow-up activities',
      'Account managers tracking client engagement',
      'Partnership teams reaching out to potential collaborators',
      'Recruiters contacting qualified candidates'
    ]
  },
  {
    title: 'Enrich leads with AI web research',
    description:
      'Automatically enrich new CRM leads by performing web searches, extracting company information, social profiles, funding data, and technology stack, then update the lead record.',
    longDescription: 'Save hours of manual research. The AI gathers firmographic data, finds decision makers, and scores lead quality before your sales team even sees them.',
    integrations: [
      { iconName: 'NotionIcon', name: 'Salesforce' },
      { iconName: 'SerperIcon', name: 'Web Search' },
    ],
    slug: 'lead-enrichment',
    category: 'Sales Automation',
    steps: [
      { title: 'New lead enters Salesforce', description: 'Workflow activates when a lead record is created or updated.' },
      { title: 'AI searches web for company data', description: 'Performs targeted searches across LinkedIn, Crunchbase, company websites, and news.' },
      { title: 'Extracts firmographics and signals', description: 'Parses search results to extract employee count, funding, tech stack, and buying signals.' },
      { title: 'Updates CRM with enriched data', description: 'Writes structured data back to Salesforce custom fields with confidence scores.' }
    ],
    benefits: [
      'Complete lead profiles without manual research',
      'Accurate lead scoring based on real signals',
      'Prioritization of high-intent prospects',
      'Reduced time to first meaningful conversation'
    ],
    useCases: [
      'Enterprise sales teams qualifying inbound leads',
      'Growth teams building ideal customer profiles',
      'Marketing ops enriching form submissions',
      'RevOps maintaining data hygiene'
    ]
  },
  {
    title: 'Auto-triage support tickets with AI',
    description:
      'Analyze incoming support tickets, categorize by urgency and topic, suggest answers from your knowledge base, and route to the right team or create Slack alerts for critical issues.',
    longDescription: 'Reduce response times and improve customer satisfaction. AI understands context, detects sentiment, and can even auto-respond to common questions.',
    integrations: [
      { iconName: 'NotionIcon', name: 'Zendesk' },
      { iconName: 'SlackIcon', name: 'Slack' },
      { iconName: 'NotionIcon', name: 'Notion' },
    ],
    slug: 'support-triage',
    category: 'Customer Support',
    steps: [
      { title: 'New ticket arrives', description: 'Trigger captures incoming support requests from email, chat, or web forms.' },
      { title: 'AI categorizes and detects urgency', description: 'Analyzes content, sentiment, and keywords to assign priority and category.' },
      { title: 'Searches knowledge base for answers', description: 'Vector search finds relevant documentation and past resolutions.' },
      { title: 'Routes to team or auto-responds', description: 'Assigns to appropriate agent or sends templated response for common issues.' }
    ],
    benefits: [
      'Instant categorization and routing',
      'Reduced first response time',
      'Self-service resolution for common questions',
      'Escalation paths for VIP or critical issues'
    ],
    useCases: [
      'SaaS companies managing high ticket volume',
      'E-commerce support during peak seasons',
      'Technical support teams with specialized expertise',
      'Customer success teams monitoring health scores'
    ]
  },
  {
    title: 'Generate weekly business reports',
    description:
      'Pull data from Google Sheets, databases, and analytics tools, then use AI to analyze trends, create visualizations, write executive summaries, and send formatted reports via email or Slack.',
    longDescription: 'Turn scattered data into actionable insights. The AI identifies trends, flags anomalies, and writes clear summaries that executives actually read.',
    integrations: [
      { iconName: 'GoogleSheetsIcon', name: 'Google Sheets' },
      { iconName: 'SlackIcon', name: 'Slack' },
      { iconName: 'GmailIcon', name: 'Gmail' },
    ],
    slug: 'weekly-reporting',
    category: 'Analytics',
    steps: [
      { title: 'Scheduled trigger every Monday', description: 'Cron schedule initiates the workflow at a specific time each week.' },
      { title: 'Collect data from multiple sources', description: 'Fetches metrics from Sheets, SQL databases, analytics APIs in parallel.' },
      { title: 'AI analyzes trends and anomalies', description: 'Statistical analysis identifies week-over-week changes and outliers.' },
      { title: 'Generates report and sends to team', description: 'Creates formatted HTML report with charts and narrative, distributes via Slack and email.' }
    ],
    benefits: [
      'Consistent reporting cadence without manual work',
      'Proactive identification of issues',
      'Executive-ready narrative insights',
      'Historical trend tracking'
    ],
    useCases: [
      'Finance teams producing weekly KPI dashboards',
      'Marketing ops reporting on campaign performance',
      'Product teams monitoring usage metrics',
      'Operations leaders tracking efficiency'
    ]
  },
  {
    title: 'Process invoices and extract data',
    description:
      'Automatically extract invoice details from PDF attachments in email, validate totals, detect duplicates, categorize expenses, and post entries to your accounting system with audit logs.',
    longDescription: 'Eliminate manual data entry errors. The AI reads PDFs, extracts line items, validates calculations, and can even flag suspicious invoices for review.',
    integrations: [
      { iconName: 'GmailIcon', name: 'Gmail' },
      { iconName: 'GoogleSheetsIcon', name: 'Google Sheets' },
      { iconName: 'NotionIcon', name: 'QuickBooks' },
    ],
    slug: 'invoice-processing',
    category: 'Finance Automation',
    steps: [
      { title: 'Invoice PDF received via email', description: 'Email trigger monitors specific inbox for invoices with PDF attachments.' },
      { title: 'AI extracts fields and line items', description: 'OCR and NLP parse vendor, amount, date, line items, and payment terms.' },
      { title: 'Validates totals and checks duplicates', description: 'Cross-references extracted data against existing records and recalculates totals.' },
      { title: 'Posts to accounting system', description: 'Creates journal entries in QuickBooks or writes to approval queue in Sheets.' }
    ],
    benefits: [
      '10x faster invoice processing',
      'Reduced data entry errors',
      'Automatic duplicate detection',
      'Audit trail for compliance'
    ],
    useCases: [
      'Accounts payable teams at scaling companies',
      'Finance ops automating month-end close',
      'Controllers enforcing expense policies',
      'Accounting firms serving multiple clients'
    ]
  },
  {
    title: 'Analyze calendar patterns and optimize scheduling',
    description:
      'Monitor your Google Calendar to identify scheduling patterns, detect optimal meeting times, and generate weekly productivity reports with AI insights about your time allocation and meeting efficiency.',
    longDescription: 'Transform your calendar data into productivity insights. AI analyzes meeting patterns, identifies time blocks for deep work, and suggests optimizations for better work-life balance.',
    integrations: [
      { iconName: 'GoogleCalendarIcon', name: 'Google Calendar' },
      { iconName: 'NotionIcon', name: 'Notion' },
    ],
    slug: 'calendar-productivity-insights',
    category: 'Productivity',
    steps: [
      { title: 'Analyze calendar patterns weekly', description: 'System reviews your calendar data to identify meeting patterns and time allocation trends.' },
      { title: 'AI identifies optimal focus times', description: 'Machine learning detects when you\'re most productive and suggests protected time blocks.' },
      { title: 'Detects meeting efficiency metrics', description: 'Analyzes meeting duration, frequency, and participant patterns to identify optimization opportunities.' },
      { title: 'Generates productivity insights report', description: 'Creates detailed reports with recommendations for better time management and work-life balance.' }
    ],
    benefits: [
      'Data-driven insights into your time allocation',
      'Identify and protect your most productive hours',
      'Optimize meeting schedules for better efficiency',
      'Improve work-life balance through better planning'
    ],
    useCases: [
      'Executives optimizing their daily schedules',
      'Remote workers managing time zones effectively',
      'Project managers balancing team coordination',
      'Consultants maximizing billable hour efficiency'
    ]
  },
  {
    title: 'Summarize daily Slack messages into reports',
    description:
      'Collect important messages from specific Slack channels, categorize by project or priority, and generate daily digest reports sent to your email or saved to Notion.',
    longDescription: 'Stay on top of team communications without constant monitoring. AI filters noise, identifies action items, and creates structured summaries.',
    integrations: [
      { iconName: 'SlackIcon', name: 'Slack' },
      { iconName: 'NotionIcon', name: 'Notion' },
      { iconName: 'GmailIcon', name: 'Gmail' },
    ],
    slug: 'slack-daily-digest',
    category: 'Productivity',
    steps: [
      { title: 'Collect messages from key channels', description: 'Monitors specified Slack channels and gathers all messages from the past 24 hours.' },
      { title: 'AI categorizes by importance', description: 'Machine learning algorithms analyze content to identify urgent items, decisions, and action items.' },
      { title: 'Identifies action items and decisions', description: 'Natural language processing extracts tasks, assignments, and key decisions made.' },
      { title: 'Generates structured daily report', description: 'Creates organized summary with categories, priorities, and next steps for easy review.' }
    ],
    benefits: [
      'Never miss important team communications',
      'Reduce time spent scrolling through Slack',
      'Clear visibility into team decisions and actions',
      'Structured documentation of daily activities'
    ],
    useCases: [
      'Remote teams with multiple time zones',
      'Project managers tracking team progress',
      'Executives staying informed without constant monitoring',
      'Teams with high-volume communication channels'
    ]
  },
  {
    title: 'Track social media mentions and sentiment',
    description:
      'Monitor Twitter, LinkedIn, and Reddit for brand mentions, analyze sentiment using AI, categorize feedback, and alert your team about important conversations or PR opportunities.',
    longDescription: 'Never miss important brand conversations. AI analyzes sentiment, identifies influencers, and flags urgent issues that need immediate attention.',
    integrations: [
      { iconName: 'xIcon', name: 'Twitter' },
      { iconName: 'LinkedInIcon', name: 'LinkedIn' },
      { iconName: 'SlackIcon', name: 'Slack' },
    ],
    slug: 'social-media-monitoring',
    category: 'Marketing',
    steps: [
      { title: 'Scan social platforms for mentions', description: 'Continuously monitors Twitter, LinkedIn, and Reddit for your brand name, products, and key personnel.' },
      { title: 'AI analyzes sentiment and context', description: 'Advanced sentiment analysis determines if mentions are positive, negative, or neutral with context.' },
      { title: 'Categorizes by urgency and type', description: 'Classifies mentions as customer service issues, PR opportunities, or general feedback.' },
      { title: 'Alerts team via Slack for urgent items', description: 'Immediate notifications sent to appropriate team members for time-sensitive issues.' }
    ],
    benefits: [
      'Real-time brand reputation monitoring',
      'Early detection of PR crises',
      'Identify influencers and brand advocates',
      'Competitive intelligence gathering'
    ],
    useCases: [
      'Marketing teams managing brand reputation',
      'Customer service teams handling social complaints',
      'PR agencies monitoring client mentions',
      'Startups tracking product feedback'
    ]
  },
]

interface WorkflowPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params
  const workflow = workflows.find(w => w.slug === slug)

  if (!workflow) {
    notFound()
  }

  return <WorkflowPageClient workflow={workflow} />
}

export async function generateStaticParams() {
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }))
}

