import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import ComicPanel from '@/components/ComicPanel'
import Link from 'next/link'

export async function generateStaticParams() {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  return entries.filter(e => e.isDirectory()).map(e => ({ slug: e.name }))
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  const slugs = entries.filter(e => e.isDirectory()).map(e => e.name).sort()
  const currentIndex = slugs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null
  const storyDir = path.join(storiesDir, slug)
  const source = await fs.promises.readFile(path.join(storyDir, 'story.mdx'), 'utf8')
  interface ArchiveEntry {
    panel: number
    citation: string
  }

  const archive: ArchiveEntry[] = JSON.parse(await fs.promises.readFile(path.join(storyDir, 'archive.json'), 'utf8'))

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
      return <ComicPanel {...props} history={historyEntry?.citation ?? ''} />
    }
  }

  const { content } = await compileMDX({ source, components, options: { parseFrontmatter: true } })
  return (
    <main className="prose mx-auto px-4 pt-8 text-center flex flex-col items-center">
      {content}
      <nav className="mt-8 w-full max-w-3xl flex justify-between">
        {prevSlug ? (
          <Link href={`/stories/${prevSlug}`} className="underline">
            Previous
          </Link>
        ) : (
          <span />
        )}
        {nextSlug ? (
          <Link href={`/stories/${nextSlug}`} className="underline">
            Next
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
