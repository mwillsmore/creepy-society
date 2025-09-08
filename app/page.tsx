import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import logo from '@/content/logo.png'
import StoryCarousel, { Story } from '@/components/StoryCarousel'

async function getStories(): Promise<Story[]> {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  try {
    const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
    return entries
      .filter(e => e.isDirectory())
      .map(e => {
        const slug = e.name
        const title = slug === 's-w' ? 'S&W' : slug
        const cover = slug === 's-w' ? 's_and_w.jpg' : 'cover.jpg'
        return { slug, title, cover }
      })
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
      <StoryCarousel stories={stories} />
    </main>
  )
}
