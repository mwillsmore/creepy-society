import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
  return entries.filter(e => e.isDirectory()).map(e => ({ slug: e.name }))
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const storyDir = path.join(process.cwd(), 'content', 'stories', slug)
  const source = await fs.promises.readFile(path.join(storyDir, 'story.mdx'), 'utf8')
  const { content } = await compileMDX({ source, options: { parseFrontmatter: true } })
  const archive = JSON.parse(await fs.promises.readFile(path.join(storyDir, 'archive.json'), 'utf8'))
  return (
    <main className="prose mx-auto p-4">
      {content}
      <h2 className="mt-8">Archive</h2>
      <pre>{JSON.stringify(archive, null, 2)}</pre>
    </main>
  )
}
