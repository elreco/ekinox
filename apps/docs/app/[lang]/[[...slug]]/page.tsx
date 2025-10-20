import { findNeighbour } from 'fumadocs-core/server'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StructuredData } from '@/components/structured-data'
import { CodeBlock } from '@/components/ui/code-block'
import { source } from '@/lib/source'

export const dynamic = 'force-dynamic'

export default async function Page(props: { params: Promise<{ slug?: string[]; lang: string }> }) {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const MDX = page.data.body
  const baseUrl = 'https://docs.ekinox.app'

  const pageTreeRecord = source.pageTree as Record<string, any>
  const pageTree =
    pageTreeRecord[params.lang] ?? pageTreeRecord.en ?? Object.values(pageTreeRecord)[0]
  const neighbours = pageTree ? findNeighbour(pageTree, page.url) : null

  const generateBreadcrumbs = () => {
    const breadcrumbs: Array<{ name: string; url: string }> = [
      {
        name: 'Home',
        url: baseUrl,
      },
    ]

    const urlParts = page.url.split('/').filter(Boolean)
    let currentPath = ''

    urlParts.forEach((part, index) => {
      if (index === 0 && ['en', 'es', 'fr', 'de', 'ja', 'zh'].includes(part)) {
        currentPath = `/${part}`
        return
      }

      currentPath += `/${part}`

      const name = part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      if (index === urlParts.length - 1) {
        breadcrumbs.push({
          name: page.data.title,
          url: `${baseUrl}${page.url}`,
        })
      } else {
        breadcrumbs.push({
          name: name,
          url: `${baseUrl}${currentPath}`,
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  const CustomFooter = () => (
    <div className='mt-12'>
      {/* Navigation links */}
      <div className='flex items-center justify-between py-8'>
        {neighbours?.previous ? (
          <Link
            href={neighbours.previous.url}
            className='group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground'
          >
            <ChevronLeft className='group-hover:-translate-x-1 h-4 w-4 transition-transform' />
            <span className='font-medium'>{neighbours.previous.name}</span>
          </Link>
        ) : (
          <div />
        )}

        {neighbours?.next ? (
          <Link
            href={neighbours.next.url}
            className='group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground'
          >
            <span className='font-medium'>{neighbours.next.name}</span>
            <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Divider line */}
      <div className='border-border border-t' />

      {/* Social icons */}
      <div className='flex items-center gap-4 py-6'>
        <Link
          href='https://x.com/ekinoxapp'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='X (Twitter)'
        >
          <div
            className='h-5 w-5 bg-gray-400 transition-colors hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400'
            style={{
              maskImage:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z%22/%3E%3C/svg%3E')",
              maskRepeat: 'no-repeat',
              maskPosition: 'center center',
              WebkitMaskImage:
                "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z%22/%3E%3C/svg%3E')",
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center center',
            }}
          />
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <StructuredData
        title={page.data.title}
        description={page.data.description || ''}
        url={`${baseUrl}${page.url}`}
        lang={params.lang}
        breadcrumb={breadcrumbs}
      />
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        tableOfContent={{
          style: 'clerk',
          enabled: true,
          header: <div className='mb-2 font-medium text-sm'>On this page</div>,
          single: false,
        }}
        article={{
          className: 'scroll-smooth max-sm:pb-16',
        }}
        tableOfContentPopover={{
          style: 'clerk',
          enabled: true,
        }}
        footer={{
          enabled: true,
          component: <CustomFooter />,
        }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              CodeBlock,
            }}
          />
        </DocsBody>
      </DocsPage>
    </>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; lang: string }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const baseUrl = 'https://docs.ekinox.app'
  const fullUrl = `${baseUrl}${page.url}`

  return {
    title: page.data.title,
    description:
      page.data.description || 'Ekinox visual workflow builder for AI applications documentation',
    keywords: [
      'AI workflow builder',
      'visual workflow editor',
      'AI automation',
      'workflow automation',
      'AI agents',
      'no-code AI',
      'drag and drop workflows',
      page.data.title?.toLowerCase().split(' '),
    ]
      .flat()
      .filter(Boolean),
    authors: [{ name: 'Ekinox Team' }],
    category: 'Developer Tools',
    openGraph: {
      title: page.data.title,
      description:
        page.data.description || 'Ekinox visual workflow builder for AI applications documentation',
      url: fullUrl,
      siteName: 'Ekinox Documentation',
      type: 'article',
      locale: params.lang === 'en' ? 'en_US' : `${params.lang}_${params.lang.toUpperCase()}`,
      alternateLocale: ['en', 'es', 'fr', 'de']
        .filter((lang) => lang !== params.lang)
        .map((lang) => (lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`)),
    },
    twitter: {
      card: 'summary',
      title: page.data.title,
      description:
        page.data.description || 'Ekinox visual workflow builder for AI applications documentation',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    canonical: fullUrl,
    alternates: {
      canonical: fullUrl,
      languages: {
        'x-default': `${baseUrl}${page.url.replace(`/${params.lang}`, '')}`,
        en: `${baseUrl}${page.url.replace(`/${params.lang}`, '')}`,
        es: `${baseUrl}/es${page.url.replace(`/${params.lang}`, '')}`,
        fr: `${baseUrl}/fr${page.url.replace(`/${params.lang}`, '')}`,
        de: `${baseUrl}/de${page.url.replace(`/${params.lang}`, '')}`,
        ja: `${baseUrl}/ja${page.url.replace(`/${params.lang}`, '')}`,
        zh: `${baseUrl}/zh${page.url.replace(`/${params.lang}`, '')}`,
      },
    },
  }
}
