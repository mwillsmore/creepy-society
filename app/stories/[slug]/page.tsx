export { generateStaticParams } from './[page]/page'
import { redirect } from 'next/navigation'

export default async function StorySlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/stories/${slug}/1`)
}
