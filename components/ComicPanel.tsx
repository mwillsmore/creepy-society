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
    <div className="w-fit cursor-pointer [perspective:1000px]" onClick={() => setFlipped(f => !f)}>
      <div className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div className="[backface-visibility:hidden]">
          <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p>{history}</p>
        </div>
      </div>
    </div>
  )
}
