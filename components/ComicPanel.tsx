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
  const scaledWidth = width * 2
  const scaledHeight = height * 2
  return (
    <div
      className="cursor-pointer [perspective:1000px] mx-auto"
      style={{ width: scaledWidth, height: scaledHeight }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        <div className="[backface-visibility:hidden] absolute inset-0">
          <Image
            src={src}
            alt={alt}
            width={scaledWidth}
            height={scaledHeight}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4 text-center text-black overflow-auto [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="font-comic">{history}</p>
        </div>
      </div>
    </div>
  )
}
