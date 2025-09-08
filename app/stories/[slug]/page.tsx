import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import ComicPanel from '@/components/ComicPanel'

export async function generateStaticParams() {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  return entries.filter(e => e.isDirectory()).map(e => ({ slug: e.name }))
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const storyDir = path.join(process.cwd(), 'content', 'stories', slug)
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
    <main className="prose mx-auto p-4 text-center flex flex-col items-center">
      {content}
    </main>
  )
}
