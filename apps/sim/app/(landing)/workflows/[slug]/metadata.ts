import type { Metadata } from 'next'

const workflows = [
  {
    title: 'Generate personalized outreach emails from spreadsheet',
    description:
      'Read prospect data from Google Sheets, use AI to research each company and generate personalized email content, then send customized outreach emails via Gmail at scale.',
    slug: 'personalized-email-outreach',
    category: 'Email Automation',
  },
  {
    title: 'Auto-qualify leads and send follow-up sequences',
    description:
      'Monitor new leads in your CRM, use AI to research company fit and buying signals, score lead quality, then automatically trigger personalized email sequences via Gmail based on qualification tier.',
    slug: 'lead-qualification-followup',
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
    title: 'Generate financial reports and send alerts',
    description:
      'Pull transaction data from Stripe and accounting databases, use AI to analyze spending patterns, detect anomalies, categorize expenses, then generate formatted reports and send alerts via Gmail for urgent items.',
    slug: 'financial-monitoring-alerts',
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
      site: '@ekinoxapp',
    },
  }
}

