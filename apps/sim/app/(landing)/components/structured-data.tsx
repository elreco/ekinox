export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.ekinox.app/#organization',
        name: 'Ekinox',
        alternateName: 'Ekinox Studio',
        description:
          'Visual AI agent workflow builder trusted by businesses from startups to Fortune 500 companies',
        url: 'https://www.ekinox.app',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://www.ekinox.app/#logo',
          url: 'https://www.ekinox.app/logo/b&w/text/b&w.svg',
          contentUrl: 'https://www.ekinox.app/logo/b&w/text/b&w.svg',
          width: 49.78314,
          height: 24.276,
          caption: 'Ekinox Logo',
        },
        image: { '@id': 'https://www.ekinox.app/#logo' },
        sameAs: [
          'https://docs.ekinox.app',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['en'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.ekinox.app/#website',
        url: 'https://www.ekinox.app',
        name: 'Ekinox - AI Agent Workflow Builder',
        description:
          'Visual AI agent workflow builder. Build and deploy intelligent workflows with drag-and-drop simplicity. Enterprise-grade security and compliance.',
        publisher: {
          '@id': 'https://www.ekinox.app/#organization',
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            '@id': 'https://www.ekinox.app/#searchaction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.ekinox.app/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.ekinox.app/#webpage',
        url: 'https://www.ekinox.app',
        name: 'Ekinox - Workflows for LLMs | Build AI Agent Workflows',
        isPartOf: {
          '@id': 'https://www.ekinox.app/#website',
        },
        about: {
          '@id': 'https://www.ekinox.app/#software',
        },
        datePublished: '2024-01-01T00:00:00+00:00',
        dateModified: new Date().toISOString(),
        description:
          'Build and deploy AI agent workflows with Ekinox. Visual drag-and-drop interface for creating powerful LLM-powered automations.',
        breadcrumb: {
          '@id': 'https://www.ekinox.app/#breadcrumb',
        },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: ['https://www.ekinox.app'],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.ekinox.app/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.ekinox.app',
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.ekinox.app/#software',
        name: 'Ekinox - AI Agent Workflow Builder',
        description:
          'Professional AI agent workflow builder for businesses and teams. Build intelligent workflows with visual drag-and-drop interface. Enterprise-grade security with SOC2 and HIPAA compliance. Integrate with 100+ apps.',
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'AI Development Tools',
        operatingSystem: 'Web, Windows, macOS, Linux',
        softwareVersion: '1.0',
        offers: [
          {
            '@type': 'Offer',
            '@id': 'https://www.ekinox.app/#offer-free',
            name: 'Community Plan',
            price: '0',
            priceCurrency: 'USD',
            priceValidUntil: '2025-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://www.ekinox.app/#organization',
            },
            eligibleRegion: {
              '@type': 'Place',
              name: 'Worldwide',
            },
          },
          {
            '@type': 'Offer',
            '@id': 'https://www.ekinox.app/#offer-pro',
            name: 'Pro Plan',
            price: '20',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '20',
              priceCurrency: 'USD',
              unitText: 'MONTH',
              billingIncrement: 1,
            },
            priceValidUntil: '2025-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://www.ekinox.app/#organization',
            },
          },
          {
            '@type': 'Offer',
            '@id': 'https://www.ekinox.app/#offer-team',
            name: 'Team Plan',
            price: '40',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '40',
              priceCurrency: 'USD',
              unitText: 'MONTH',
              billingIncrement: 1,
            },
            priceValidUntil: '2025-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://www.ekinox.app/#organization',
            },
          },
        ],
        featureList: [
          'Visual workflow builder',
          'Drag-and-drop interface',
          '100+ integrations',
          'AI model support (OpenAI, Anthropic, Google)',
          'Real-time collaboration',
          'Version control',
          'API access',
          'Custom functions',
          'Scheduled workflows',
          'Event triggers',
        ],
        screenshot: [
          {
            '@type': 'ImageObject',
            url: 'https://www.ekinox.app/screenshots/workflow-builder.png',
            caption: 'Ekinox workflow builder interface',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.ekinox.app/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Ekinox?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ekinox is a professional AI agent workflow builder trusted by businesses from startups to Fortune 500 companies. It provides a visual drag-and-drop interface for building and deploying intelligent workflows. Ekinox is SOC2 and HIPAA compliant with enterprise-grade security.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which AI models does Ekinox support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ekinox supports all major AI models including OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), Mistral, Perplexity, and many more. You can also connect to open-source models via Ollama.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need coding skills to use Ekinox?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No coding skills are required! Ekinox features a visual drag-and-drop interface that makes it easy to build AI workflows. However, developers can also use custom functions and our API for advanced use cases.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* LLM-friendly semantic HTML comments */}
      {/* About: Ekinox is a visual workflow builder for AI agents and large language models (LLMs) */}
      {/* Purpose: Enable users to create AI-powered automations without coding */}
      {/* Features: Drag-and-drop interface, 100+ integrations, multi-model support */}
      {/* Use cases: Email automation, chatbots, data analysis, content generation */}
    </>
  )
}
