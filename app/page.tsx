import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import logo from '@/content/logo.png'
import StoryCarousel, { Story } from '@/components/StoryCarousel'

async function getStories(): Promise<Story[]> {
  const storiesDir = path.join(process.cwd(), 'content', 'stories')
  try {
    const entries = await fs.promises.readdir(storiesDir, { withFileTypes: true })
    return await Promise.all(
      entries
        .filter(e => e.isDirectory())
        .map(async e => {
          const slug = e.name
          const storyPath = path.join(storiesDir, slug, 'story.mdx')
          let title = slug
          let cover = 'cover.jpg'
          try {
            const source = await fs.promises.readFile(storyPath, 'utf8')
            const { data } = matter(source)
            if (typeof data.title === 'string') title = data.title
            if (typeof data.cover === 'string') cover = data.cover
          } catch {}
          return { slug, title, cover }
        })
    )
  } catch {
    return []
  }
}

export default async function Home() {
  const stories = await getStories()
  return (
    <main className="p-4 text-center flex flex-col items-center font-comic">
      <Image src={logo} alt="Site logo" className="mb-4 mx-auto" />
      <section className="mb-8 text-left max-w-3xl mx-auto">
        <p className="text-xl text-[#d9cfb5]">
          Creepy Society is a haunted rummage through time, dressed up like a comic strip
          and soaked in a bath of dread. Each story’s a grubby little relic — part horror
          tale, part social history lesson told by a drunk aunt with a twitch and a thousand
          yard stare. Expect ghosts, curses, and things that lurk in the corner of your eye.
          But none of it’s just for show — there’s bone beneath the rot. Every tale’s
          pinned to a real place, real events, or the kind of shared memory that clings to
          your insides like turning trifle. Read the comic first. Let it fester a bit. Let
          it crawl under your skin and whisper to your nerves. Then flip it over, like a
          gravestone in the mud, and find the archive: photos, documents, witness
          accounts. The murky truth behind the monstrous fiction. This isn’t just about a
          cheap scare. It’s about dragging the past into the present by the ankles. Because
          some ghosts don’t know they’re dead. Remember: not all hauntings come with
          chains and moans — some of them smell like bonfires, wet blankets, and sour
          milk.
        </p>
      </section>
      <h1 className="text-3xl font-bold mb-4">Stories</h1>
      <StoryCarousel stories={stories} />
    </main>
  )
}
