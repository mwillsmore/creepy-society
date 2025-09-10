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
  const PANEL_WIDTH = 800
  const scaledHeight = Math.round((height / width) * PANEL_WIDTH)

  return (
    <div className="not-prose">
      <div
        className="cursor-pointer [perspective:1000px] block m-4 relative"
        style={{ width: PANEL_WIDTH, height: scaledHeight }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="[backface-visibility:hidden] absolute inset-0 w-full h-full">
            <Image
              src={src}
              alt={alt}
              width={PANEL_WIDTH}
              height={scaledHeight}
              priority
              className="object-contain"
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
