import type { Metadata } from 'next'

const workflows = [
  {
    title: 'Summarize Gmail emails and log to Google Sheets',
    description:
      'Automatically read new emails, extract key information like sender, subject, action items, and deadlines, then append structured summaries to a Google Sheet for easy tracking.',
    slug: 'gmail-to-sheets-summary',
    category: 'Email Automation',
  },
  {
    title: 'Analyze Gmail patterns and update CRM insights',
    description:
      'Monitor Gmail for incoming emails from prospects, analyze communication patterns and engagement levels, then automatically update your CRM with AI-generated insights about lead quality and next best actions.',
    slug: 'gmail-crm-insights',
    category: 'Sales Automation',
  },
  {
    title: 'Enrich leads with AI web research',
    description:
      'Automatically enrich new CRM leads by performing web searches, extracting company information, social profiles, funding data, and technology stack, then update the lead record.',
    slug: 'lead-enrichment',
    category: 'Sales Automation',
  },
  {
    title: 'Auto-triage support tickets with AI',
    description:
      'Analyze incoming support tickets, categorize by urgency and topic, suggest answers from your knowledge base, and route to the right team or create Slack alerts for critical issues.',
    slug: 'support-triage',
    category: 'Customer Support',
  },
  {
    title: 'Generate weekly business reports',
    description:
      'Pull data from Google Sheets, databases, and analytics tools, then use AI to analyze trends, create visualizations, write executive summaries, and send formatted reports via email or Slack.',
    slug: 'weekly-reporting',
    category: 'Analytics',
  },
  {
    title: 'Process invoices and extract data',
    description:
      'Automatically extract invoice details from PDF attachments in email, validate totals, detect duplicates, categorize expenses, and post entries to your accounting system with audit logs.',
    slug: 'invoice-processing',
    category: 'Finance Automation',
  },
  {
    title: 'Analyze calendar patterns and optimize scheduling',
    description:
      'Monitor your Google Calendar to identify scheduling patterns, detect optimal meeting times, and generate weekly productivity reports with AI insights about your time allocation and meeting efficiency.',
    slug: 'calendar-productivity-insights',
    category: 'Productivity',
  },
  {
    title: 'Summarize daily Slack messages into reports',
    description:
      'Collect important messages from specific Slack channels, categorize by project or priority, and generate daily digest reports sent to your email or saved to Notion.',
    slug: 'slack-daily-digest',
    category: 'Productivity',
  },
  {
    title: 'Track social media mentions and sentiment',
    description:
      'Monitor Twitter, LinkedIn, and Reddit for brand mentions, analyze sentiment using AI, categorize feedback, and alert your team about important conversations or PR opportunities.',
    slug: 'social-media-monitoring',
    category: 'Marketing',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const workflow = workflows.find(w => w.slug === slug)

  if (!workflow) {
    return {
      title: 'Workflow Not Found',
      description: 'The requested workflow could not be found.',
    }
  }

  return {
    title: `${workflow.title} | AI Workflow Template - Ekinox`,
    description: workflow.description,
    alternates: {
      canonical: `/workflows/${workflow.slug}`,
    },
    openGraph: {
      title: `${workflow.title} | Ekinox`,
      description: workflow.description,
      type: 'article',
      url: `https://www.ekinox.app/workflows/${workflow.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${workflow.title} | Ekinox`,
      description: workflow.description,
    },
  }
}

