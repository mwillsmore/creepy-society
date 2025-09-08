import fs from 'fs'
import path from 'path'
import Link from 'next/link'

async function getStories() {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  try {
    const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
    return entries.filter(e => e.isDirectory()).map(e => e.name)
  } catch {
    return []
  }
}

export default async function Home() {
  const stories = await getStories()
  return (
    <main className="p-4 prose">
      <h1>Stories</h1>
      <ul>
        {stories.map(slug => (
          <li key={slug}>
            <Link href={`/stories/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
