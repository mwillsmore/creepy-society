import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/content/logo.png'

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
      <Image src={logo} alt="Site logo" className="mb-4" />
      <h1>Stories</h1>
      <ul>
        {stories.map(slug => {
          const title = slug === 's-w' ? 'S&W' : slug
          return (
            <li key={slug}>
              <Link href={`/stories/${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
