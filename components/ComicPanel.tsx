'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ComicPanelProps {
  src: string
  alt: string
  width: number
  height: number
  history: string
}

export default function ComicPanel({ src, alt, width, height, history }: ComicPanelProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="not-prose">
      <div
        className="cursor-pointer [perspective:1000px] block m-4 w-full max-w-[800px] relative"
        style={{ aspectRatio: `${width} / ${height}` }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="[backface-visibility:hidden] absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 800px) 100vw, 800px"
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
