import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import ComicPanel from '@/components/ComicPanel'
import Link from 'next/link'
import Image from 'next/image'
import type { JSX } from 'react'

async function getPageNumbers(storyDir: string): Promise<number[]> {
  const files = await fs.promises.readdir(storyDir)
  const pages = files
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      if (f === 'story.mdx') return 1
      const match = f.match(/(\d+)/)
      return match ? Number(match[1]) : NaN
    })
    .filter(n => !Number.isNaN(n))
  return Array.from(new Set(pages)).sort((a, b) => a - b)
}

async function getPageFile(storyDir: string, page: number): Promise<string> {
  const candidates = [`page-${page}.mdx`, `page${page}.mdx`, `${page}.mdx`]
  if (page === 1) candidates.push('story.mdx')
  for (const name of candidates) {
    const full = path.join(storyDir, name)
    try {
      await fs.promises.access(full)
      return full
    } catch {}
  }
  throw new Error(`Page file for page ${page} not found`)
}

export async function generateStaticParams() {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  const params: { slug: string; page: string }[] = []
  for (const entry of entries.filter(e => e.isDirectory())) {
    const storyDir = path.join(storiesDir, entry.name)
    const pages = await getPageNumbers(storyDir)
    if (pages.length === 0) {
      params.push({ slug: entry.name, page: '1' })
    } else {
      params.push(...pages.map(p => ({ slug: entry.name, page: p.toString() })))
    }
  }
  return params
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  const slugs = entries.filter(e => e.isDirectory()).map(e => e.name).sort()
  const currentSlugIndex = slugs.indexOf(slug)
  const prevSlug = currentSlugIndex > 0 ? slugs[currentSlugIndex - 1] : null
  const nextSlug = currentSlugIndex < slugs.length - 1 ? slugs[currentSlugIndex + 1] : null

  const storyDir = path.join(storiesDir, slug)
  const pageNum = Number(page)
  const pages = await getPageNumbers(storyDir)
  const currentPageIndex = pages.indexOf(pageNum)
  const prevPage = currentPageIndex > 0 ? pages[currentPageIndex - 1] : null
  const nextPage = currentPageIndex < pages.length - 1 ? pages[currentPageIndex + 1] : null

  let prevLink: string | null = null
  if (prevPage !== null) {
    prevLink = `/stories/${slug}/${prevPage}`
  } else if (prevSlug) {
    const prevPages = await getPageNumbers(path.join(storiesDir, prevSlug))
    const lastPage = prevPages[prevPages.length - 1] || 1
    prevLink = `/stories/${prevSlug}/${lastPage}`
  }

  let nextLink: string | null = null
  if (nextPage !== null) {
    nextLink = `/stories/${slug}/${nextPage}`
  } else if (nextSlug) {
    const nextPages = await getPageNumbers(path.join(storiesDir, nextSlug))
    const firstPage = nextPages[0] || 1
    nextLink = `/stories/${nextSlug}/${firstPage}`
  }

  const pageFile = await getPageFile(storyDir, pageNum)
  const source = await fs.promises.readFile(pageFile, 'utf8')

  interface ArchiveEntry {
    panel: number
    title: string
    citation: string
  }
  const archive: ArchiveEntry[] = JSON.parse(
    await fs.promises.readFile(path.join(storyDir, 'archive.json'), 'utf8')
  )

  interface WrapperProps {
    panel: number
    src: string
    alt: string
    width: number
    height: number
  }

  const components = {
    ComicPanel: (props: WrapperProps) => {
      const historyEntry = archive.find(entry => entry.panel === Number(props.panel))
      return (
        <ComicPanel
          {...props}
          title={historyEntry?.title ?? ''}
          history={historyEntry?.citation ?? ''}
        />
      )
    },
    h1: (props: JSX.IntrinsicElements['h1']) => (
      <h1 {...props} className={`text-center text-5xl ${props.className ?? ''}`} />
    )
  }

  const { content } = await compileMDX({ source, components, options: { parseFrontmatter: true } })
  return (
    <main className="prose mx-auto px-4 pt-8 flex flex-col">
      <Link href="/" className="fixed top-4 left-4">
        <Image src="/home.png" alt="Home" width={424} height={467} className="h-10 w-auto" />
      </Link>
      {content}
      <nav className="mt-8 w-full flex justify-between">
        {prevLink ? (
          <Link href={prevLink}>
            <Image src="/previous.png" alt="Previous" width={454} height={454} className="h-10 w-auto" />
          </Link>
        ) : (
          <span />
        )}
        {nextLink ? (
          <Link href={nextLink}>
            <Image src="/next.png" alt="Next" width={482} height={437} className="h-10 w-auto" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}

