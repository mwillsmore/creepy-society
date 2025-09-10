'use client'

import { useState } from 'react'

interface ComicPanelProps {
  src: string
  alt: string
  history: string
}

export default function ComicPanel({ src, alt, history }: ComicPanelProps) {
  const [flipped, setFlipped] = useState(false)
  const [imgHeight, setImgHeight] = useState<number | null>(null)

  return (
    <div className="not-prose">
      <div
        className="cursor-pointer [perspective:1000px] block m-4 w-full max-w-[800px] mx-auto"
        onClick={() => setFlipped(f => !f)}
      >
        {/* The flipping container's height is set dynamically
            to exactly match the rendered image height */}
        <div
          className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
          style={imgHeight ? { height: imgHeight } : undefined}
        >
          {/* Front */}
          <div className="[backface-visibility:hidden]">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto block"
              onLoad={e => setImgHeight((e.target as HTMLImageElement).offsetHeight)}
            />
          </div>
          {/* Back */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4 text-center text-black overflow-auto [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="font-comic m-0">{history}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

