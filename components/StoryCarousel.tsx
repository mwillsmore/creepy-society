import Image from 'next/image'
import Link from 'next/link'

export type Story = {
  slug: string
  title: string
  cover: string
}

export default function StoryCarousel({ stories }: { stories: Story[] }) {
  return (
    <div className="overflow-x-auto">
      <ul className="flex space-x-4 snap-x snap-mandatory">
        {stories.map(({ slug, title, cover }) => (
          <li
            key={slug}
            className="relative w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 flex-shrink-0 snap-start"
          >
            <Link href={`/stories/${slug}`} className="block w-full h-full">
              <Image
                src={`/stories/${slug}/${cover}`}
                alt={title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority
              />
              <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-center text-sm md:text-base p-1">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
